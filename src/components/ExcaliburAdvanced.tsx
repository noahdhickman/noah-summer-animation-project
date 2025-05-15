import { Label, FontUnit } from 'excalibur';
import React, { useEffect, useRef, useState } from 'react';
import {
  Engine,
  Scene,
  Actor,
  Vector,
  ImageSource,
  Color,
  Font,
  Label as ExLabel,
  Keys
} from 'excalibur';

const mapImage = new ImageSource('/assets/diagram.svg');
const dadImage = new ImageSource('/assets/dad.png');
const nodeLabels = ['Arrival', 'Register', 'Triage', 'LowAcuity A', 'LowAcuity B', 'Exit'];

class AdvancedScene extends Scene {
  declare engine: Engine;
  private frames = 0;
  private lastTime = Date.now();
  private fps = 0;
  public movementSpeed = 100; // Default speed
  public path: Vector[] = [];
  private zoomingToNode = false;

  async onInitialize(engine: Engine): Promise<void> {
    this.engine = engine;

    await mapImage.load();
    await dadImage.load();

    const sprite = mapImage.toSprite();
    sprite.scale = new Vector(800 / sprite.width, 600 / sprite.height);

    const bg = new Actor({
      pos: new Vector(400, 300),
      anchor: new Vector(0.5, 0.5),
      width: 800,
      height: 600
    });
    bg.graphics.use(sprite);
    this.add(bg);

    const fpsLabel = new ExLabel();
    fpsLabel.text = 'FPS: 0';
    fpsLabel.pos = new Vector(700, 20);
    fpsLabel.font = new Font({
      size: 16,
      unit: FontUnit.Px,
      color: Color.White
    });
    fpsLabel.z = 100;
    this.add(fpsLabel);

    this.onPostUpdate = () => {
      this.frames++;
      const now = Date.now();
      if (now - this.lastTime >= 1000) {
        this.fps = this.frames;
        this.frames = 0;
        this.lastTime = now;
        fpsLabel.text = `FPS: ${this.fps}`;
      }

      if (!this.zoomingToNode) {
        const moveAmount = 5;
        const cam = this.engine.currentScene.camera;
        const input = this.engine.input.keyboard;
        if (input.isHeld(Keys.D)) cam.pos.x += moveAmount;
        if (input.isHeld(Keys.A)) cam.pos.x -= moveAmount;
        if (input.isHeld(Keys.S)) cam.pos.y += moveAmount;
        if (input.isHeld(Keys.W)) cam.pos.y -= moveAmount;
      }
    };

    this.path = [
      new Vector(100, 350),
      new Vector(250, 350),
      new Vector(360, 350),
      new Vector(360, 280),
      new Vector(615, 280),
      new Vector(615, 350)
    ];

    const mover = new Actor({
      pos: this.path[0],
      anchor: new Vector(0.5, 0.5)
    });

    const dadSprite = dadImage.toSprite();
    dadSprite.scale = new Vector(0.04, 0.04);
    mover.graphics.use(dadSprite);
    this.add(mover);

    const animateMover = () => {
      mover.actions.clearActions();

      let closestIndex = 0;
      let minDist = Infinity;
      for (let i = 0; i < this.path.length; i++) {
        const dist = mover.pos.distance(this.path[i]);
        if (dist < minDist) {
          minDist = dist;
          closestIndex = i;
        }
      }

      mover.actions.repeatForever((ctx) => {
        for (let i = closestIndex + 1; i < this.path.length; i++) {
          ctx.moveTo(this.path[i], this.movementSpeed);
        }
        ctx.delay(500);
        ctx.callMethod(() => {
          mover.pos = this.path[0];
        });
        closestIndex = 0;
      });
    };

    animateMover();

    this.updateSpeed = (speed: number) => {
      this.movementSpeed = speed;
      animateMover();
    };

    this.zoomToNode = (index: number) => {
      const camera = this.engine.currentScene.camera;
      const target = this.path[index];
      this.zoomingToNode = true;
      camera.pos = target.clone();
      camera.zoom = 2;
      setTimeout(() => {
        this.zoomingToNode = false;
      }, 500); // Delay for 0.5s to avoid interference
    };
  }

  public updateSpeed(speed: number) {}
  public zoomToNode(index: number) {}
}

const ExcaliburAdvanced: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  const [speed, setSpeed] = useState(100);
  const [selectedNode, setSelectedNode] = useState<number>(-1);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine({
      canvasElement: canvasRef.current,
      width: 800,
      height: 600,
      backgroundColor: Color.Black
    });

    const scene = new AdvancedScene();
    engine.addScene('advanced', scene);
    engine.goToScene('advanced');
    engine.start();

    engineRef.current = engine;

    return () => engine.stop();
  }, []);

  const toggleEngine = () => {
    if (!engineRef.current) return;
    if (isRunning) {
      engineRef.current.stop();
    } else {
      engineRef.current.start();
    }
    setIsRunning(!isRunning);
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Number(e.target.value);
    setSpeed(newSpeed);
    const scene = engineRef.current?.scenes['advanced'] as AdvancedScene;
    scene?.updateSpeed(newSpeed);
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    setSelectedNode(index);
    const scene = engineRef.current?.scenes['advanced'] as AdvancedScene;
    if (!isNaN(index)) scene?.zoomToNode(index);
  };

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={canvasRef} />
      <button
        onClick={toggleEngine}
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          padding: '8px 12px',
          fontSize: '14px',
          zIndex: 10
        }}
      >
        {isRunning ? 'Pause' : 'Play'}
      </button>
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 10,
          padding: '4px 8px',
          zIndex: 10,
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white'
        }}
      >
        <label>
          Speed: {speed}
          <input
            type="range"
            min="50"
            max="300"
            step="10"
            value={speed}
            onChange={handleSpeedChange}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <br />
        <label style={{ marginTop: '10px', display: 'inline-block' }}>
          Jump to:
          <select
            value={selectedNode}
            onChange={handleZoomChange}
            style={{ marginLeft: '10px' }}
          >
            <option value={-1}>-- Select Node --</option>
            {nodeLabels.map((label, index) => (
              <option key={index} value={index}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default ExcaliburAdvanced;