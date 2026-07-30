import { useEffect, useRef } from "react";

/** Pixel-art endless runner — the reward for running out of copilot messages. */
export default function DinoGame({ onScoreUpdate }) {
  const canvasRef = useRef(null);
  const st = useRef({
    running: false,
    started: false,
    gameOver: false,
    dino: { x: 40, y: 0, vy: 0, onGround: true, w: 20, h: 24 },
    cacti: [],
    score: 0,
    speed: 3.5,
    frame: 0,
    raf: null,
    groundY: 28,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const s = st.current;

    s.dino.y = H - s.groundY - s.dino.h;
    s.running = true;

    const spawn = () => {
      const h = 16 + Math.random() * 18;
      const w = 10 + Math.random() * 8;
      s.cacti.push({ x: W, y: H - s.groundY - h, w, h });
    };

    const jump = () => {
      if (s.gameOver) {
        s.gameOver = false;
        s.started = true;
        s.score = 0;
        return;
      }
      if (!s.started) s.started = true;
      if (s.dino.onGround) {
        s.dino.vy = -12;
        s.dino.onGround = false;
      }
    };

    const onKey = (e) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };
    const onClick = () => jump();
    canvas.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);

    const px = (x, y, w, h, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w, h);
    };

    const drawDino = (x, y, frame) => {
      const C = "#e8e8e8";
      const leg = frame % 2;
      px(x + 4, y, 12, 4, C);
      px(x + 2, y + 4, 16, 4, C);
      px(x, y + 8, 18, 4, C);
      px(x + 2, y + 12, 14, 4, C);
      px(x + 4, y + 16, 10, 4, C);
      px(x + 14, y + 2, 3, 3, "#1a1a2e");
      px(x - 4, y + 8, 6, 3, C);
      px(x - 6, y + 11, 4, 3, C);
      if (leg === 0) {
        px(x + 4, y + 20, 4, 4, C);
        px(x + 10, y + 20, 4, 4, C);
        px(x + 4, y + 24, 4, 2, C);
        px(x + 12, y + 20, 4, 2, C);
      } else {
        px(x + 4, y + 20, 4, 2, C);
        px(x + 10, y + 20, 4, 4, C);
        px(x + 6, y + 20, 4, 4, C);
        px(x + 10, y + 24, 4, 2, C);
      }
    };

    const drawCactus = (x, y, w, h) => {
      const C = "#4ec9b0";
      px(x + w / 2 - 3, y, 6, h, C);
      px(x, y + h * 0.3, w, 6, C);
      px(x, y + h * 0.3, 4, h * 0.3, C);
      px(x + w - 4, y + h * 0.4, 4, h * 0.25, C);
    };

    const loop = () => {
      if (!s.running) return;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#9f9a9aa9";
      ctx.fillRect(0, H - s.groundY, W, 2);
      ctx.fillStyle = "rgba(190, 174, 174, 0.69)";
      [
        [20, 15],
        [60, 8],
        [110, 20],
        [150, 5],
        [200, 18],
        [250, 10],
        [290, 22],
        [320, 7],
      ].forEach(([x, y]) => ctx.fillRect(x, y, 2, 2));

      if (s.started) {
        s.frame++;
        s.score += 0.05;
        s.speed = 3.5 + s.score * 0.008;
        onScoreUpdate?.(Math.floor(s.score));
        s.dino.vy += 0.72;
        s.dino.y += s.dino.vy;

        const ground = H - s.groundY - s.dino.h;
        if (s.dino.y >= ground) {
          s.dino.y = ground;
          s.dino.vy = 0;
          s.dino.onGround = true;
        }

        if (s.frame % Math.max(60, 110 - Math.floor(s.score * 0.5)) === 0) spawn();
        s.cacti = s.cacti.filter((c) => c.x + c.w > 0);
        s.cacti.forEach((c) => {
          c.x -= s.speed;
        });

        const d = s.dino;
        for (const c of s.cacti) {
          if (
            d.x + d.w - 4 > c.x + 2 &&
            d.x + 4 < c.x + c.w - 2 &&
            d.y + d.h - 2 > c.y + 2 &&
            d.y + 2 < c.y + c.h
          ) {
            const final = Math.floor(s.score);
            s.started = false;
            s.gameOver = true;
            s.speed = 3.5;
            s.cacti = [];
            s.frame = 0;
            s.dino.y = H - s.groundY - s.dino.h;
            s.dino.vy = 0;
            s.dino.onGround = true;
            onScoreUpdate?.(final);
            s.raf = requestAnimationFrame(loop);
            return;
          }
        }

        s.cacti.forEach((c) => drawCactus(c.x, c.y, c.w, c.h));
        drawDino(s.dino.x, s.dino.y, s.dino.onGround ? Math.floor(s.frame / 8) : 0);

        ctx.fillStyle = "rgba(255,255,255,0.4)";
        ctx.font = '7px "Press Start 2P", monospace';
        ctx.textAlign = "right";
        ctx.fillText(String(Math.floor(s.score)).padStart(5, "0"), W - 8, 16);
      } else {
        drawDino(s.dino.x, H - s.groundY - s.dino.h, 0);
        if (s.gameOver) {
          ctx.fillStyle = "rgba(244,71,71,0.12)";
          ctx.fillRect(0, 0, W, H);
          ctx.fillStyle = "#f44747";
          ctx.font = '8px "Press Start 2P", monospace';
          ctx.textAlign = "center";
          ctx.fillText("GAME OVER", W / 2, H / 2 - 18);
          ctx.fillStyle = "rgba(255,255,255,0.35)";
          ctx.font = '6px "Press Start 2P", monospace';
          ctx.fillText(
            `SCORE: ${String(Math.floor(s.score)).padStart(5, "0")}`,
            W / 2,
            H / 2 - 4,
          );
          ctx.fillStyle = "rgba(180,180,180,0.6)";
          ctx.fillText("[ RETRY ]", W / 2, H / 2 + 12);
          ctx.fillStyle = "rgba(120,120,120,0.4)";
          ctx.font = '5px "Press Start 2P", monospace';
          ctx.fillText("click or space to restart", W / 2, H / 2 + 26);
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          ctx.font = '7px "Press Start 2P", monospace';
          ctx.textAlign = "center";
          ctx.fillText("CLICK / SPACE TO JUMP", W / 2, H / 2 + 4);
        }
      }

      s.raf = requestAnimationFrame(loop);
    };

    s.raf = requestAnimationFrame(loop);

    return () => {
      s.running = false;
      cancelAnimationFrame(s.raf);
      canvas.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <canvas
      ref={canvasRef}
      width={340}
      height={110}
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        background: "#0d0d1a",
        borderRadius: "6px",
        border: "2px solid rgba(110,64,201,0.4)",
        cursor: "pointer",
        imageRendering: "pixelated",
      }}
    />
  );
}
