import { useEffect, useRef } from "react";

// 나무 색상 배열
const COLOR_ARR = [
  "#FF0000", // 빨간색
  "#00FF00", // 초록색
  "#0000FF", // 파란색
  "#FFFF00", // 노란색
  "#FF00FF", // 분홍색
  "#00FFFF", // 청록색
];

// 가지 클래스
class Branch {
  constructor(startX, startY, endX, endY, lineWidth, colorStart, colorEnd) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.colorStart = colorStart;
    this.colorEnd = colorEnd;
    this.lineWidth = lineWidth;

    this.frame = 10; // 가지가 자라나는 프레임 수
    this.cntFrame = 0; // 현재 프레임
    this.gapX = (this.endX - this.startX) / this.frame; // x축 이동 간격
    this.gapY = (this.endY - this.startY) / this.frame; // y축 이동 간격

    this.currentX = this.startX;
    this.currentY = this.startY;

    this.color = this.calculateColor();
  }

  // 두 색상 사이의 중간 색상을 계산하는 메서드
  calculateColor() {
    const ratio = this.lineWidth / 12; // 가지의 굵기에 따른 비율 계산 (0에서 1 사이)
    const hex = (start, end) => {
      const s = parseInt(start.slice(1), 16);
      const e = parseInt(end.slice(1), 16);
      const r = Math.round((e >> 16) * ratio + (s >> 16) * (1 - ratio));
      const g = Math.round(
        ((e >> 8) & 0xff) * ratio + ((s >> 8) & 0xff) * (1 - ratio)
      );
      const b = Math.round((e & 0xff) * ratio + (s & 0xff) * (1 - ratio));
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    return hex(this.colorStart, this.colorEnd);
  }

  // 가지를 그리는 메서드
  draw(ctx) {
    if (this.cntFrame === this.frame) return true;

    ctx.beginPath();

    this.currentX += this.gapX;
    this.currentY += this.gapY;

    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.currentX, this.currentY);

    if (this.lineWidth < 3) {
      ctx.lineWidth = 0.5;
    } else if (this.lineWidth < 7) {
      ctx.lineWidth = this.lineWidth * 0.7;
    } else if (this.lineWidth < 10) {
      ctx.lineWidth = this.lineWidth * 0.9;
    } else {
      ctx.lineWidth = this.lineWidth;
    }

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    ctx.stroke();
    ctx.closePath();

    this.cntFrame++;

    return false;
  }

  // 가지의 색상을 설정하는 메서드
  setColor() {
    if (this.color !== "#000000") {
      if (this.lineWidth >= 10) {
        this.color = "#FFFFFF";
      } else {
        let num = Math.floor((this.lineWidth / 10) * 15).toString(16);
        this.color = this.color.replace(/0/gi, num);
      }
    }
  }
}

// 나무 클래스
class Tree {
  constructor(ctx, posX, posY, day, hp) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.branches = [];
    this.depth = this.calculateDepth(hp); // 나무의 깊이 설정
    this.day = day;
    this.hp = hp;

    if (this.day) {
      this.colorStart = "#000000";
      this.colorEnd = "#666666";
    } else {
      this.colorStart = "#FF0000";
      this.colorEnd = "#0000FF";
    }

    this.cntDepth = 0;
    this.animation = null;

    this.init();
  }

  // HP에 따른 나무의 깊이 계산
  calculateDepth(hp) {
    if (hp <= 10) {
      return 3;
    } else if (hp <= 30) {
      return 4;
    } else if (hp <= 50) {
      return 7;
    } else if (hp <= 70) {
      return 10;
    } else if (hp <= 90) {
      return 12;
    } else {
      return 14;
    }
  }

  // 나무 초기화
  init() {
    for (let i = 0; i < this.depth; i++) {
      this.branches.push([]);
    }

    this.createBranch(this.posX, this.posY, -90, 0);
    this.draw();
  }

  // 가지 생성
  createBranch(startX, startY, angle, depth) {
    if (depth === this.depth) return;

    const len = depth === 0 ? this.random(10, 13) : this.random(0, 11);

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
        this.colorEnd
      )
    );

    if (depth < this.depth - 1) {
      this.createBranch(endX, endY, angle - this.random(15, 23), depth + 1);
      this.createBranch(endX, endY, angle + this.random(15, 23), depth + 1);
    }
  }

  // 나무를 그리는 메서드
  draw() {
    if (this.cntDepth === this.depth) {
      cancelAnimationFrame(this.animation);
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

  cos(angle) {
    return Math.cos(this.degToRad(angle));
  }
  sin(angle) {
    return Math.sin(this.degToRad(angle));
  }
  degToRad(angle) {
    return (angle / 180.0) * Math.PI;
  }

  random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}

// TreeCanvas 컴포넌트
const TreeCanvas = ({ hp, day }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    // 고정된 캔버스 높이 설정
    const fixedHeight = 200; // 최대 나무 크기에 따라 조정
    const stageWidth = window.innerWidth;
    const stageHeight = Math.max(window.innerHeight, fixedHeight);

    canvas.width = stageWidth * pixelRatio;
    canvas.height = stageHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    // 나무가 화면 상단에서 시작하지 않도록 설정
    const treeBaseY = stageHeight - 50; // 나무가 화면 하단에서 시작하도록 설정

    const tree = new Tree(ctx, stageWidth / 2, treeBaseY, day, hp);
    tree.draw();

    return () => {};
  }, [hp, day]);

  return <canvas ref={canvasRef}></canvas>;
};

export default TreeCanvas;
