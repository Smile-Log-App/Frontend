import { Branch } from "./branch.js";

const COLOR_ARR = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
];

export class Tree {
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
    } else if (hp <= 20) {
      return 2;
    } else if (hp <= 30) {
      return 3;
    } else if (hp <= 40) {
      return 4;
    } else if (hp <= 50) {
      return 5;
    } else if (hp <= 60) {
      return 6;
    } else if (hp <= 70) {
      return 7;
    } else if (hp <= 80) {
      return 8;
    } else if (hp <= 90) {
      return 9;
    } else {
      return 11; // Default value if hp is over 50
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
    
    const lengthFactor = 1.5; // 가지 길이 조정 인자
    const baseLength = 15; // 기본 가지 길이
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
