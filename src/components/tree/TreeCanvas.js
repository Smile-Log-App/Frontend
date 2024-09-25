import { useEffect, useRef } from "react";

// 가지 클래스
class Branch {
  constructor(
    startX,
    startY,
    endX,
    endY,
    lineWidth,
    colorStart,
    colorMid,
    colorEnd
  ) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.lineWidth = lineWidth;
    // 기본 색상 설정
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

  calculateColor() {
    const ratio = this.lineWidth / 12; // 0 ~ 1 사이의 비율
    let blendedColor;

    if (ratio <= 0.6) {
      // 첫 번째 구간: colorStart에서 colorMid로 전환 (60% 길이)
      const segmentRatio = ratio / 0.6; // 0~0.6 비율을 0~1로 변환
      blendedColor = this.hexBlend(
        this.colorStart,
        this.colorMid,
        segmentRatio
      );
    } else if (ratio <= 0.8) {
      // 두 번째 구간: colorMid에서 colorEnd로 전환 (20% 길이)
      const segmentRatio = (ratio - 0.6) / 0.2; // 0.6~0.8 비율을 0~1로 변환
      blendedColor = this.hexBlend(this.colorMid, this.colorEnd, segmentRatio);
    } else {
      // 세 번째 구간: colorEnd에서 약간 더 밝은 색으로 전환 (20% 길이)
      const segmentRatio = (ratio - 0.8) / 0.2; // 0.8~1 비율을 0~1로 변환
      blendedColor = this.hexBlend(this.colorMid, this.colorEnd, segmentRatio); // 흰색으로 부드럽게 전환
    }

    return blendedColor;
  }

  calculateColor() {
    const ratio = this.lineWidth / 12; // 0 ~ 1 사이의 비율
    let blendedColor;

    if (ratio <= 0.5) {
      // 첫 번째 구간: colorStart에서 colorMid로 전환 (50% 길이)
      const segmentRatio = ratio / 0.5; // 0~0.5 비율을 0~1로 변환
      blendedColor = this.hexBlend(
        this.colorStart,
        this.colorMid,
        segmentRatio
      );
    } else if (ratio <= 0.8) {
      // 두 번째 구간: colorMid에서 colorEnd로 전환 (30% 길이)
      const segmentRatio = (ratio - 0.5) / 0.3; // 0.5~0.8 비율을 0~1로 변환
      blendedColor = this.hexBlend(this.colorMid, this.colorEnd, segmentRatio);
    } else {
      // 세 번째 구간: colorEnd에서 약간 더 밝은 색으로 전환 (20% 길이)
      const segmentRatio = (ratio - 0.8) / 0.2; // 0.8~1 비율을 0~1로 변환
      blendedColor = this.hexBlend(this.colorEnd, "#FFFFFF", segmentRatio); // 흰색으로 부드럽게 전환
    }

    return blendedColor;
  }

  // hex 색상을 블렌딩하는 함수
  hexBlend(start, end, ratio) {
    const s = parseInt(start.slice(1), 16);
    const e = parseInt(end.slice(1), 16);
    const r = Math.round((e >> 16) * ratio + (s >> 16) * (1 - ratio));
    const g = Math.round(
      ((e >> 8) & 0xff) * ratio + ((s >> 8) & 0xff) * (1 - ratio)
    );
    const b = Math.round((e & 0xff) * ratio + (s & 0xff) * (1 - ratio));
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  draw(ctx) {
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
  constructor(ctx, posX, posY, day, hp, colorStart, colorMid, colorEnd) {
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

  calculateDepth(hp) {
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

    this.branches[depth].push(
      new Branch(
        startX,
        startY,
        endX,
        endY,
        this.depth - depth,
        this.colorStart,
        this.colorMid,
        this.colorEnd
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

const TreeCanvas = ({ hp, day, widthRatio, colors }) => {
  // 기본값 설정
  const canvasRef = useRef(null);

  console.log(colors);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    const fixedHeight = 100;
    const stageWidth = window.innerWidth * widthRatio; // 화면 너비의 비율을 적용
    const stageHeight = Math.max(window.innerHeight, fixedHeight);

    canvas.width = stageWidth * pixelRatio;
    canvas.height = stageHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    const treeBaseY = stageHeight - 0;

    // `colors` prop이 없을 경우 기본값으로 설정된 색상 배열 사용
    const selectedColors = colors;

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

    tree.draw(); // 나무 그리기

    return () => {}; // 컴포넌트 언마운트 시 정리 작업
  }, [hp, day, widthRatio, colors]);

  return <canvas ref={canvasRef}></canvas>;
};

export default TreeCanvas;
