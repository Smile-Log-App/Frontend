import { useEffect, useRef } from "react";

const COLOR_ARR = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
];

class Branch {
  constructor(startX, startY, endX, endY, lineWidth, color) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
    this.lineWidth = lineWidth;

    this.frame = 10;
    this.cntFrame = 0;
    this.gapX = (this.endX - this.startX) / this.frame;
    this.gapY = (this.endY - this.startY) / this.frame;

    this.currentX = this.startX;
    this.currentY = this.startY;

    this.setColor();
  }

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

class Tree {
  constructor(ctx, posX, posY, day, hp) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.branches = [];
    this.depth = this.calculateDepth(hp);
    this.day = day;
    this.hp = hp;

    if (this.day) {
      this.color = "#000000";
    } else {
      this.color = COLOR_ARR[Math.floor(Math.random() * COLOR_ARR.length)];
    }

    this.cntDepth = 0;
    this.animation = null;

    this.init();
  }

  calculateDepth(hp) {
    if (hp <= 10) {
      return 1;
    } else if (hp <= 30) {
      return 2;
    } else if (hp <= 50) {
      return 3;
    } else if (hp <= 70) {
      return 7;
    } else if (hp <= 90) {
      return 9;
    } else {
      return 11;
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

    const len = depth === 0 ? this.random(10, 13) : this.random(0, 11);

    const endX = startX + this.cos(angle) * len * (this.depth - depth);
    const endY = startY + this.sin(angle) * len * (this.depth - depth);

    this.branches[depth].push(
      new Branch(startX, startY, endX, endY, this.depth - depth, this.color)
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

const TreeCanvas = ({ hp, day }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    const resize = () => {
      const stageWidth = canvas.clientWidth;
      const stageHeight = canvas.clientHeight;

      canvas.width = stageWidth * pixelRatio;
      canvas.height = stageHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);

      ctx.clearRect(0, 0, stageWidth, stageHeight);

      return { stageWidth, stageHeight };
    };

    const { stageWidth, stageHeight } = resize();

    const handleResize = () => {
      const { stageWidth, stageHeight } = resize();
      new Tree(ctx, stageWidth / 2, stageHeight, day, hp);
    };

    window.addEventListener("resize", handleResize);

    new Tree(
      ctx,
      canvas.width / 2 / pixelRatio,
      canvas.height / pixelRatio,
      day,
      hp
    );

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hp, day]);

  return <canvas ref={canvasRef} className="w-600pxr h-500pxr"></canvas>;
};

export default TreeCanvas;
