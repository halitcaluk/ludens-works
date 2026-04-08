"use client";

import { useEffect, useRef } from "react";

interface GridNode {
  wx: number;
  wz: number;
  sx: number;
  sy: number;
  depth: number;
  yPhase: number;
  ySpeed: number;
}

interface ExtraLink {
  from: number;
  to: number;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<GridNode[]>([]);
  const extraLinksRef = useRef<ExtraLink[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLS = 30;
    const ROWS = 14;
    const HOVER_RADIUS = 120; // pixel radius for mouse effect

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      const nodes: GridNode[] = [];
      const spacingX = 1.6;
      const spacingZ = 1.4;
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const baseX = (col - COLS / 2) * spacingX + (row % 2 === 1 ? spacingX * 0.5 : 0);
          const baseZ = row * spacingZ;
          const seed = row * COLS + col;
          const offsetX = (seededRandom(seed * 3 + 1) - 0.5) * spacingX * 0.6;
          const offsetZ = (seededRandom(seed * 7 + 2) - 0.5) * spacingZ * 0.5;
          nodes.push({
            wx: baseX + offsetX,
            wz: baseZ + offsetZ,
            sx: 0, sy: 0, depth: 0,
            yPhase: Math.random() * Math.PI * 2,
            ySpeed: 0.5 + Math.random() * 0.6,
          });
        }
      }
      nodesRef.current = nodes;
    }

    function initExtraLinks() {
      const links: ExtraLink[] = [];
      const nodes = nodesRef.current;
      const maxWorldDist = 4.5;

      for (let i = 0; i < nodes.length; i++) {
        const seed = seededRandom(i * 7 + 3);
        if (seed > 0.25) continue;

        const count = seed < 0.08 ? 2 : 1;
        let added = 0;

        for (let j = i + 1; j < nodes.length && added < count; j++) {
          const dx = nodes[i].wx - nodes[j].wx;
          const dz = nodes[i].wz - nodes[j].wz;
          const dist = Math.sqrt(dx * dx + dz * dz);

          if (dist < 2.0 || dist > maxWorldDist) continue;

          if (seededRandom(i * 131 + j * 97) < 0.15) {
            links.push({ from: i, to: j });
            added++;
          }
        }
      }
      extraLinksRef.current = links;
    }

    // Softer bounce — smooth but with distinct up/down character
    function softBounce(time: number, speed: number, phase: number): number {
      const t = time * speed + phase;
      // Combine two sine waves for a less uniform, organic feel
      return Math.sin(t) * 0.6 + Math.sin(t * 1.7 + 0.5) * 0.4;
    }

    function project(node: GridNode, w: number, h: number, time: number) {
      const x = node.wx;
      const z = node.wz;

      const bounce = softBounce(time, node.ySpeed, node.yPhase) * 16;

      const maxZ = ROWS * 1.4;
      const t = z / maxZ;

      const horizonY = h * 0.15;
      const bottomY = h * 1.5;
      const baseY = horizonY + (bottomY - horizonY) * Math.pow(1 - t, 1.5);
      const depthScale = Math.pow(1 - t, 0.8);
      const sy = baseY + bounce * depthScale;

      const spread = 60 + (1 - t) * 80;
      const sx = w / 2 + x * spread * Math.pow(1 - t * 0.5, 1.1);

      const depth = Math.pow(1 - t, 1.3);

      node.sx = sx;
      node.sy = sy;
      node.depth = depth;
    }

    // How close is a node to the mouse (0 = far, 1 = directly on it)
    function getHoverIntensity(node: GridNode): number {
      if (!mouseRef.current.active) return 0;
      const dx = node.sx - mouseRef.current.x;
      const dy = node.sy - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > HOVER_RADIUS) return 0;
      return Math.pow(1 - dist / HOVER_RADIUS, 2);
    }

    function getNeighbors(row: number, col: number): number[] {
      const indices: number[] = [];
      const isOddRow = row % 2 === 1;

      if (col + 1 < COLS) indices.push(row * COLS + col + 1);
      if (row + 1 < ROWS) {
        indices.push((row + 1) * COLS + col);
        if (isOddRow) {
          if (col + 1 < COLS) indices.push((row + 1) * COLS + col + 1);
        } else {
          if (col - 1 >= 0) indices.push((row + 1) * COLS + col - 1);
        }
      }
      return indices;
    }

    function draw() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      const nodes = nodesRef.current;
      timeRef.current += 0.016;
      const time = timeRef.current;

      ctx!.clearRect(0, 0, w, h);

      for (const node of nodes) {
        project(node, w, h, time);
      }

      // Draw base grid connections
      for (let row = ROWS - 1; row >= 0; row--) {
        for (let col = 0; col < COLS; col++) {
          const idx = row * COLS + col;
          const node = nodes[idx];
          const neighbors = getNeighbors(row, col);

          for (const nIdx of neighbors) {
            const neighbor = nodes[nIdx];
            const avgDepth = (node.depth + neighbor.depth) / 2;
            const hoverA = Math.max(getHoverIntensity(node), getHoverIntensity(neighbor));
            const alpha = avgDepth * (0.4 + hoverA * 0.5);
            if (alpha < 0.008) continue;

            ctx!.beginPath();
            ctx!.moveTo(node.sx, node.sy);
            ctx!.lineTo(neighbor.sx, neighbor.sy);
            ctx!.strokeStyle = hoverA > 0.1
              ? `rgba(80, 220, 255, ${alpha})`
              : `rgba(35, 183, 231, ${alpha})`;
            ctx!.lineWidth = 0.4 + avgDepth * 1.5 + hoverA * 1.0;
            ctx!.stroke();
          }
        }
      }

      // Draw extra cross-connections
      for (const link of extraLinksRef.current) {
        const a = nodes[link.from];
        const b = nodes[link.to];
        const avgDepth = (a.depth + b.depth) / 2;
        const hoverA = Math.max(getHoverIntensity(a), getHoverIntensity(b));
        const alpha = avgDepth * (0.25 + hoverA * 0.4);
        if (alpha < 0.008) continue;

        ctx!.beginPath();
        ctx!.moveTo(a.sx, a.sy);
        ctx!.lineTo(b.sx, b.sy);
        ctx!.strokeStyle = hoverA > 0.1
          ? `rgba(100, 230, 255, ${alpha})`
          : `rgba(60, 200, 245, ${alpha})`;
        ctx!.lineWidth = 0.3 + avgDepth * 0.8 + hoverA * 0.8;
        ctx!.stroke();
      }

      // Draw nodes
      const sorted = [...nodes].sort((a, b) => a.depth - b.depth);
      for (const node of sorted) {
        if (node.depth < 0.02) continue;

        const hover = getHoverIntensity(node);
        const radiusBase = 1 + node.depth * 3.5;
        const radius = radiusBase + hover * 4; // grow on hover
        const brightness = node.depth + hover * 0.5;

        // Outer glow — bigger on hover
        const glowR = radius * (7 + hover * 5);
        const grad = ctx!.createRadialGradient(
          node.sx, node.sy, 0,
          node.sx, node.sy, glowR
        );
        const glowAlpha = Math.min(1, brightness * 0.55 + hover * 0.4);
        grad.addColorStop(0, `rgba(35, 183, 231, ${glowAlpha})`);
        grad.addColorStop(0.3, `rgba(35, 183, 231, ${glowAlpha * 0.3})`);
        grad.addColorStop(1, "rgba(35, 183, 231, 0)");
        ctx!.beginPath();
        ctx!.arc(node.sx, node.sy, glowR, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();

        // Core dot — brighter on hover
        ctx!.beginPath();
        ctx!.arc(node.sx, node.sy, radius, 0, Math.PI * 2);
        const coreAlpha = Math.min(1, brightness * 1.1);
        ctx!.fillStyle = hover > 0.1
          ? `rgba(120, 230, 255, ${coreAlpha})`
          : `rgba(50, 200, 245, ${coreAlpha})`;
        ctx!.fill();

        // White-hot center
        if (brightness > 0.35) {
          ctx!.beginPath();
          ctx!.arc(node.sx, node.sy, radius * 0.4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(220, 245, 255, ${Math.min(1, (brightness - 0.35) * 1.2 + hover * 0.6)})`;
          ctx!.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    // Mouse tracking — listen on the parent section so overlays don't block events
    const section = canvas.closest("section");
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    }
    function onMouseLeave() {
      mouseRef.current.active = false;
    }

    resize();
    initNodes();
    initExtraLinks();
    draw();

    const target = section || canvas;
    target.addEventListener("mousemove", onMouseMove as EventListener);
    target.addEventListener("mouseleave", onMouseLeave as EventListener);
    window.addEventListener("resize", resize);
    return () => {
      target.removeEventListener("mousemove", onMouseMove as EventListener);
      target.removeEventListener("mouseleave", onMouseLeave as EventListener);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
