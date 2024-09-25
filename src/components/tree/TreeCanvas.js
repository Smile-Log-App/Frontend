import { useEffect, useRef } from "react";

// 가지 클래스
class Branch {
  constructor(startX, startY, endX, endY, lineWidth, colorStart, colorEnd) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.lineWidth = lineWidth;
    // 기본 색상 설정
    this.colorStart = colorStart || "#000000";
    this.colorEnd = colorEnd || "#000000";

    this.frame = 10;
    this.cntFrame = 0;
    this.gapX = (this.endX - this.startX) / this.frame;
    this.gapY = (this.endY - this.startY) / this.frame;

    this.currentX = this.startX;
    this.currentY = this.startY;

    this.color = this.calculateColor();
  }

  calculateColor() {
    const ratio = this.lineWidth / 12;
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

    // 기본 색상으로 "#000000"을 설정
    return hex(this.colorStart || "#000000", this.colorEnd || "#000000");
  }

  draw(ctx) {
    if (this.cntFrame === this.frame) return true;

    ctx.beginPath();

    this.currentX += this.gapX;
    this.currentY += this.gapY;

    // 그라데이션 생성
    const gradient = ctx.createLinearGradient(
      this.startX,
      this.startY,
      this.endX,
      this.endY
    );
    gradient.addColorStop(0, this.colorStart); // 시작 색상
    gradient.addColorStop(1, this.colorEnd); // 끝 색상

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
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = gradient; // 그라데이션 적용

    ctx.stroke();
    ctx.closePath();

    this.cntFrame++;

    return false;
  }
}

// 나무 클래스
class Tree {
  constructor(
    ctx,
    posX,
    posY,
    day,
    hp,
    color1 = "#000000",
    color2 = "#000000",
    color3 = "#000000"
  ) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.branches = [];
    this.depth = this.calculateDepth(hp);
    this.day = day;
    this.hp = hp;

    this.colors = [color1, color2, color3];
    this.cntDepth = 0;
    this.animation = null;
    this.maxDepth = this.depth;
    this.init();
  }

  calculateDepth(hp) {
    if (hp <= 10) return 3;
    if (hp <= 30) return 5;
    if (hp <= 50) return 7;
    if (hp <= 70) return 9;
    if (hp <= 90) return 11;
    return 14;
  }

  init() {
    for (let i = 0; i < this.depth; i++) {
      this.branches.push([]);
    }

    this.createBranch(this.posX, this.posY, -90, 0);
    this.draw();
  }

  // `depth`에 따라 가지의 색상 그라데이션 결정
  getGradientColorsForDepth(depth) {
    const thirdDepth = Math.ceil(this.depth / 3); // 깊이를 3등분

    if (depth < thirdDepth) {
      return [this.colors[2], this.colors[1]]; // 아래쪽에서 중간으로 그라데이션
    } else if (depth < thirdDepth * 2) {
      return [this.colors[1], this.colors[0]]; // 중간에서 위쪽으로 그라데이션
    } else {
      return [this.colors[0], this.colors[0]]; // 위쪽은 마지막 색상으로 유지
    }
  }

  createBranch(startX, startY, angle, depth) {
    if (depth === this.depth) return;

    const len = depth === 0 ? this.random(10, 11) : this.random(0, 12);

    // 마지막 가지의 개수를 줄이기 위해 depth에 따라 조건을 조정합니다.
    if (depth === this.depth - 1) {
      // 마지막 깊이에서 가지 생성 수를 조정합니다.
      if (Math.random() > 0.5) return;
    }

    const endX = startX + this.cos(angle) * len * (this.depth - depth);
    const endY = startY + this.sin(angle) * len * (this.depth - depth);

    const [colorStart, colorEnd] = this.getGradientColorsForDepth(depth);

    this.branches[depth].push(
      new Branch(
        startX,
        startY,
        endX,
        endY,
        this.depth - depth,
        colorStart,
        colorEnd
      )
    );

    if (depth < this.depth - 1) {
      this.createBranch(endX, endY, angle - this.random(15, 23), depth + 1);
      this.createBranch(endX, endY, angle + this.random(15, 23), depth + 1);
    }
  }

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

const TreeCanvas = ({
  hp,
  day,
  widthRatio,
  colors = ["#000000", "#000000", "#000000"],
  emotionRatios = [1, 0, 0], // 감정 비율을 추가
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    const fixedHeight = 100;
    const stageWidth = window.innerWidth * widthRatio;
    const stageHeight = Math.max(window.innerHeight, fixedHeight);

    canvas.width = stageWidth * pixelRatio;
    canvas.height = stageHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    const treeBaseY = stageHeight - 0;

    const selectedColors = colors.map((color, index) => {
      return emotionRatios[index] === 0 ? "#000000" : color; // 0%는 검정색 처리
    });

    const tree = new Tree(
      ctx,
      stageWidth / 2,
      treeBaseY,
      day,
      hp,
      selectedColors[0],
      selectedColors[1],
      selectedColors[2]
    );

    tree.draw();

    return () => {}; // 컴포넌트 언마운트 시 정리 작업
  }, [hp, day, widthRatio, colors, emotionRatios]);

  return <canvas ref={canvasRef}></canvas>;
};

export default TreeCanvas;
