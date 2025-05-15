import React, { useEffect, useRef } from 'react';
import { Engine, Scene, Actor, Color, vec } from 'excalibur';

class DemoScene extends Scene {
  onInitialize(_engine: Engine) {
    const actor = new Actor({
      pos: vec(100, 100),
      width: 50,
      height: 50,
      color: Color.Red
    });
    this.add(actor);
  }
}

const ExcaliburGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = new Engine({
      canvasElement: canvasRef.current,
      width: 800,
      height: 600
    });

    engine.addScene('demo', new DemoScene());
    engine.goToScene('demo');
    engine.start();

    return () => engine.stop();
  }, []);

  return <canvas ref={canvasRef} />;
};

export default ExcaliburGame;
