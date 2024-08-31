import React, { useEffect, useRef, useState } from "react";
import "./NoInternet.css";

export function NoInternet() {
  const canvasRef = useRef(null);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 150;

    let player = {
      x: 50,
      y: 100,
      width: 20,
      height: 20,
      dy: 0,
      gravity: 0.5,
      jumpPower: -10,
      color: "blue",
    };

    const jump = () => {
      if (!isJumping) {
        player.dy = player.jumpPower;
        setIsJumping(true);
      }
    };

    const handleKeyDown = (event) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        jump();
      }
    };

    const update = () => {
      player.dy += player.gravity;
      player.y += player.dy;

      if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        setIsJumping(false);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);

      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isJumping]);

  const checkConnection = () => {
    if (navigator.onLine) {
      alert("You are online!");
      // Redirect or refresh to load the online content
    } else {
      alert("Still offline. Try again later.");
    }
  };

  return (
    <div className="offline-container">
      <div className="h3">No Internet</div>
      <canvas ref={canvasRef}></canvas>
      <button onClick={checkConnection}>Retry</button>
    </div>
  );
}
