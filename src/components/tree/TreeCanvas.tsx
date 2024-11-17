import { useEffect, useRef } from "react";

// 가지 클래스
class Branch {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  lineWidth: number;
  colorStart: string;
  colorMid: string;
  colorEnd?: string;
  frame: number;
  cntFrame: number;
  gapX: number;
  gapY: number;
  currentX: number;
  currentY: number;
  color: string;

  constructor(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    lineWidth: number,
    colorStart: string,
    colorMid: string,
    colorEnd?: string,
  ) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.lineWidth = lineWidth;
    this.colorStart = colorStart;
    this.colorMid = colorMid;
    this.colorEnd = colorEnd;

    this.frame = 15;
    this.cntFrame = 0;
    this.gapX = (this.endX - this.startX) / this.frame;
    this.gapY = (this.endY - this.startY) / this.frame;

    this.currentX = this.startX;
    this.currentY = this.startY;

    this.color = this.calculateColor();
  }

  // hex 색상을 블렌딩하는 함수
  hexBlend(start: string, end: string, ratio: number): string {
    const s = parseInt(start.slice(1), 16);
    const e = parseInt(end.slice(1), 16);
    const r = Math.round((e >> 16) * ratio + (s >> 16) * (1 - ratio));
    const g = Math.round(
      ((e >> 8) & 0xff) * ratio + ((s >> 8) & 0xff) * (1 - ratio),
    );
    const b = Math.round((e & 0xff) * ratio + (s & 0xff) * (1 - ratio));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  calculateColor(): string {
    const ratio = this.lineWidth / 12; // 0 ~ 1 사이의 비율
    let blendedColor: string;

    // colorEnd가 존재하지 않는 경우 (2가지 색상, 즉 colorStart와 colorMid만 존재하는 경우)
    if (!this.colorEnd) {
      // colorStart와 colorMid를 반반으로 블렌딩
      const segmentRatio = ratio; // 0 ~ 1 사이 비율로 변환
      blendedColor = this.hexBlend(
        this.colorStart,
        this.colorMid,
        segmentRatio,
      );
    } else {
      // colorStart, colorMid, colorEnd 모두 존재하는 경우
      if (ratio <= 0.5) {
        // 첫 번째 구간: colorStart에서 colorMid로 전환 (50% 길이)
        const segmentRatio = ratio / 0.5; // 0~0.5 비율을 0~1로 변환
        blendedColor = this.hexBlend(
          this.colorStart,
          this.colorMid,
          segmentRatio,
        );
      } else if (ratio <= 0.8) {
        // 두 번째 구간: colorMid에서 colorEnd로 전환 (30% 길이)
        const segmentRatio = (ratio - 0.5) / 0.3; // 0.5~0.8 비율을 0~1로 변환
        blendedColor = this.hexBlend(
          this.colorMid,
          this.colorEnd,
          segmentRatio,
        );
      } else {
        // 세 번째 구간: colorEnd에서 약간 더 밝은 색으로 전환 (20% 길이)
        const segmentRatio = (ratio - 0.8) / 0.2; // 0.8~1 비율을 0~1로 변환
        blendedColor = this.hexBlend(this.colorEnd, "#FFFFFF", segmentRatio); // 흰색으로 부드럽게 전환
      }
    }
    return blendedColor;
  }

  draw(ctx: CanvasRenderingContext2D): boolean {
    if (this.cntFrame === this.frame) return true;

    ctx.beginPath();

    this.currentX += this.gapX;
    this.currentY += this.gapY;

    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.currentX, this.currentY);

    if (this.lineWidth < 3) {
      ctx.lineWidth = 1.5;
    } else if (this.lineWidth < 7) {
      ctx.lineWidth = this.lineWidth * 0.7;
    } else if (this.lineWidth < 10) {
      ctx.lineWidth = this.lineWidth * 1.1;
    } else {
      ctx.lineWidth = this.lineWidth;
    }

    ctx.strokeStyle = this.color;

    ctx.stroke();
    ctx.closePath();

    this.cntFrame++;

    return false;
  }
}

// 나무 클래스
class Tree {
  ctx: CanvasRenderingContext2D;
  posX: number;
  posY: number;
  branches: Branch[][];
  depth: number;
  day: number;
  hp: number;
  colorStart: string;
  colorMid: string;
  colorEnd?: string;
  cntDepth: number;
  animation: number | null;
  maxDepth: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    posX: number,
    posY: number,
    day: number,
    hp: number,
    colorStart: string,
    colorMid: string,
    colorEnd?: string,
  ) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.branches = [];
    this.depth = this.calculateDepth(hp);
    this.day = day;
    this.hp = hp;

    this.colorStart = colorStart;
    this.colorMid = colorMid;
    this.colorEnd = colorEnd;

    this.cntDepth = 0;
    this.animation = null;
    this.maxDepth = this.depth;
    this.init();
  }

  calculateDepth(hp: number): number {
    if (hp <= 10) {
      return 3;
    } else if (hp <= 30) {
      return 5;
    } else if (hp <= 50) {
      return 7;
    } else if (hp <= 70) {
      return 9;
    } else if (hp <= 90) {
      return 11;
    } else {
      return 14;
    }
  }

  init() {
    for (let i = 0; i < this.depth; i++) {
      this.branches.push([]);
    }

    this.createBranch(this.posX, this.posY, -90, 0);
    this.draw();
  }

  createBranch(startX: number, startY: number, angle: number, depth: number) {
    if (depth === this.depth) return;

    const len = depth === 0 ? this.random(10, 11) : this.random(0, 12);

    // 마지막 가지의 개수를 줄이기 위해 depth에 따라 조건을 조정합니다.
    if (depth === this.depth - 1) {
      // 마지막 깊이에서 가지 생성 수를 조정합니다.
      if (Math.random() > 0.5) return;
    }

    const endX = startX + this.cos(angle) * len * (this.depth - depth);
    const endY = startY + this.sin(angle) * len * (this.depth - depth);

    this.branches[depth].push(
      new Branch(
        startX,
        startY,
        endX,
        endY,
        this.depth - depth,
        this.colorStart,
        this.colorMid,
        this.colorEnd,
      ),
    );

    if (depth < this.depth - 1) {
      this.createBranch(endX, endY, angle - this.random(15, 23), depth + 1);
      this.createBranch(endX, endY, angle + this.random(15, 23), depth + 1);
    }
  }

  draw() {
    if (this.cntDepth === this.depth) {
      if (this.animation) {
        cancelAnimationFrame(this.animation);
      }
    }

    for (let i = this.cntDepth; i < this.branches.length; i++) {
      let pass = true;

      for (let j = 0; j < this.branches[i].length; j++) {
        pass = this.branches[i][j].draw(this.ctx);
      }

      if (!pass) break;
      this.cntDepth++;
    }

    this.animation = requestAnimationFrame(this.draw.bind(this));
  }

  cos(angle: number): number {
    return Math.cos(this.degToRad(angle));
  }
  sin(angle: number): number {
    return Math.sin(this.degToRad(angle));
  }
  degToRad(angle: number): number {
    return (angle / 180.0) * Math.PI;
  }

  random(min: number, max: number): number {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}

interface TreeCanvasProps {
  hp: number;
  day: number;
  widthRatio: number;
  colors: string[];
}
interface TreeCanvasProps {
  hp: number;
  day: number;
  widthRatio: number;
  colors: string[];
}

const TreeCanvas = ({ hp, day, widthRatio, colors }: TreeCanvasProps) => {
  if (colors.length === 0) return null;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    // 부모 div 크기를 기준으로 canvas 크기를 설정
    const parent = canvas.parentElement;
    if (!parent) return;

    const stageWidth = parent.clientWidth; // 부모 요소의 너비에 맞추기
    const stageHeight = parent.clientHeight; // 부모 요소의 높이에 맞추기

    // 캔버스 크기 설정
    canvas.width = stageWidth * pixelRatio;
    canvas.height = stageHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    // treeBaseY 값을 stageHeight * 0.7으로 설정하여 위쪽으로 이동
    const treeBaseY = stageHeight;

    const tree = new Tree(
      ctx,
      stageWidth / 2,
      treeBaseY, // 위쪽에 위치하도록 조정된 Y 좌표
      day,
      hp,
      colors[0],
      colors[1],
      colors[2] ? colors[2] : undefined,
    );

    tree.draw(); // 나무 그리기

    return () => {
      if (tree.animation) {
        cancelAnimationFrame(tree.animation);
      }
    };
  }, [hp, day, widthRatio, colors]);

  return (
    <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
  );
};

export default TreeCanvas;
