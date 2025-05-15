import React, { useEffect, useRef } from 'react';

const MyAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      console.log("Canvas ready:", canvasRef.current);
      // 🧠 Place your animation setup logic here
    }
  }, []);

  return (
    <div>
      <h2>My 2D Animation</h2>
      <canvas
        ref={canvasRef}
        id="animationCanvas"
        width="800"
        height="600"
        style={{ border: '1px solid black' }}
      ></canvas>
    </div>
  );
};

export default MyAnimation;