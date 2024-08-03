import { useEffect, useRef } from "react";

// 나무 색상 배열
const COLOR_ARR = [
  "#FF0000", // 빨간색
  "#00FF00", // 초록색
  "#0000FF", // 파란색
  "#FFFF00", // 노란색
  "#FF00FF", // 분홍색
  "#00FFFF", // 청록색
  "#FFA500", // 주황색
];

// 가지 클래스
class Branch {
  constructor(startX, startY, endX, endY, lineWidth, colorStart, colorEnd) {
    this.startX = startX; // 가지의 시작 X 좌표
    this.startY = startY; // 가지의 시작 Y 좌표
    this.endX = endX; // 가지의 끝 X 좌표
    this.endY = endY; // 가지의 끝 Y 좌표
    this.colorStart = colorStart; // 가지 색상의 시작 색상
    this.colorEnd = colorEnd; // 가지 색상의 끝 색상
    this.lineWidth = lineWidth; // 가지의 두께

    this.frame = 10; // 가지가 자라나는 프레임 수
    this.cntFrame = 0; // 현재 프레임 카운트
    this.gapX = (this.endX - this.startX) / this.frame; // x축 이동 간격
    this.gapY = (this.endY - this.startY) / this.frame; // y축 이동 간격

    this.currentX = this.startX; // 현재 x 위치
    this.currentY = this.startY; // 현재 y 위치

    this.color = this.calculateColor(); // 가지의 색상 계산
  }

  // 두 색상 사이의 중간 색상을 계산하는 메서드
  calculateColor() {
    const ratio = this.lineWidth / 12; // 가지의 굵기에 따른 비율 계산 (0에서 1 사이)
    const hex = (start, end) => {
      const s = parseInt(start.slice(1), 16); // 시작 색상을 16진수로 변환
      const e = parseInt(end.slice(1), 16); // 끝 색상을 16진수로 변환
      const r = Math.round((e >> 16) * ratio + (s >> 16) * (1 - ratio)); // 빨간색 계산
      const g = Math.round(
        ((e >> 8) & 0xff) * ratio + ((s >> 8) & 0xff) * (1 - ratio)
      ); // 초록색 계산
      const b = Math.round((e & 0xff) * ratio + (s & 0xff) * (1 - ratio)); // 파란색 계산
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`; // 최종 색상 반환
    };

    return hex(this.colorStart, this.colorEnd); // 계산된 색상 반환
  }

  // 가지를 그리는 메서드
  draw(ctx) {
    if (this.cntFrame === this.frame) return true; // 모든 프레임이 완료되면 true 반환

    ctx.beginPath(); // 새로운 경로 시작

    this.currentX += this.gapX; // x 위치 갱신
    this.currentY += this.gapY; // y 위치 갱신

    ctx.moveTo(this.startX, this.startY); // 가지의 시작점 설정
    ctx.lineTo(this.currentX, this.currentY); // 가지의 끝점 설정

    // 가지 두께에 따른 선 굵기 조정
    if (this.lineWidth < 3) {
      ctx.lineWidth = 0.5;
    } else if (this.lineWidth < 7) {
      ctx.lineWidth = this.lineWidth * 0.7;
    } else if (this.lineWidth < 10) {
      ctx.lineWidth = this.lineWidth * 0.9;
    } else {
      ctx.lineWidth = this.lineWidth;
    }

    ctx.fillStyle = this.color; // 선 색상 설정
    ctx.strokeStyle = this.color; // 선 색상 설정

    ctx.stroke(); // 선 그리기
    ctx.closePath(); // 경로 종료

    this.cntFrame++; // 프레임 카운트 증가

    return false; // 아직 그리기가 끝나지 않았음을 반환
  }

  // 가지의 색상을 설정하는 메서드
  setColor() {
    if (this.color !== "#000000") {
      // 검정색이 아닌 경우에만 설정
      if (this.lineWidth >= 10) {
        this.color = "#FFFFFF"; // 두께가 10 이상인 경우 흰색으로 설정
      } else {
        let num = Math.floor((this.lineWidth / 10) * 15).toString(16); // 두께에 따른 색상 값 계산
        this.color = this.color.replace(/0/gi, num); // 색상 값 갱신
      }
    }
  }
}

// 나무 클래스
class Tree {
  constructor(ctx, posX, posY, day, hp, colorStart, colorEnd) {
    this.ctx = ctx; // 캔버스 컨텍스트
    this.posX = posX; // 나무의 시작 X 좌표
    this.posY = posY; // 나무의 시작 Y 좌표
    this.branches = []; // 가지 배열 초기화
    this.depth = this.calculateDepth(hp); // 나무의 깊이 설정
    this.day = day; // 나무의 성장 일수
    this.hp = hp; // 나무의 건강 상태 (HP)

    this.colorStart = colorStart; // 시작 색상
    this.colorEnd = colorEnd; // 끝 색상

    this.cntDepth = 0; // 현재 깊이
    this.animation = null; // 애니메이션 ID

    this.init(); // 나무 초기화
  }

  // HP에 따른 나무의 깊이 계산
  calculateDepth(hp) {
    if (hp <= 10) {
      return 3; // HP가 10 이하인 경우 깊이 3
    } else if (hp <= 30) {
      return 4; // HP가 30 이하인 경우 깊이 4
    } else if (hp <= 50) {
      return 7; // HP가 50 이하인 경우 깊이 7
    } else if (hp <= 70) {
      return 9; // HP가 70 이하인 경우 깊이 9
    } else if (hp <= 90) {
      return 11; // HP가 90 이하인 경우 깊이 11
    } else {
      return 13; // 그 외의 경우 깊이 13
    }
  }

  // 나무 초기화
  init() {
    for (let i = 0; i < this.depth; i++) {
      this.branches.push([]); // 각 깊이 레벨에 대한 가지 배열 초기화
    }

    this.createBranch(this.posX, this.posY, -90, 0); // 첫 번째 가지 생성
    this.draw(); // 나무 그리기 시작
  }

  // 가지 생성
  createBranch(startX, startY, angle, depth) {
    if (depth === this.depth) return; // 최대 깊이에 도달하면 가지 생성 종료

    const len = depth === 0 ? this.random(10, 13) : this.random(0, 11); // 가지 길이 설정

    const endX = startX + this.cos(angle) * len * (this.depth - depth); // 끝 X 좌표 계산
    const endY = startY + this.sin(angle) * len * (this.depth - depth); // 끝 Y 좌표 계산

    this.branches[depth].push(
      new Branch(
        startX,
        startY,
        endX,
        endY,
        this.depth - depth, // 가지의 두께
        this.colorStart,
        this.colorEnd
      )
    );

    if (depth < this.depth - 1) {
      this.createBranch(endX, endY, angle - this.random(15, 23), depth + 1); // 왼쪽 가지 생성
      this.createBranch(endX, endY, angle + this.random(15, 23), depth + 1); // 오른쪽 가지 생성
    }
  }

  // 나무를 그리는 메서드
  draw() {
    if (this.cntDepth === this.depth) {
      cancelAnimationFrame(this.animation); // 최대 깊이에 도달하면 애니메이션 중지
    }

    for (let i = this.cntDepth; i < this.branches.length; i++) {
      let pass = true;

      for (let j = 0; j < this.branches[i].length; j++) {
        pass = this.branches[i][j].draw(this.ctx); // 가지를 그리며 완료 여부 체크
      }

      if (!pass) break; // 현재 깊이에서 가지가 완전히 그려지지 않으면 중단
      this.cntDepth++;
    }

    this.animation = requestAnimationFrame(this.draw.bind(this)); // 다음 프레임 요청
  }

  cos(angle) {
    return Math.cos(this.degToRad(angle)); // 각도를 라디안으로 변환한 후 코사인 값 반환
  }
  sin(angle) {
    return Math.sin(this.degToRad(angle)); // 각도를 라디안으로 변환한 후 사인 값 반환
  }
  degToRad(angle) {
    return (angle / 180.0) * Math.PI; // 각도를 라디안으로 변환
  }

  random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1)); // 최소값과 최대값 사이의 랜덤 값 반환
  }
}

// TreeCanvas 컴포넌트
const TreeCanvas = ({ hp, day }) => {
  const canvasRef = useRef(null); // 캔버스 요소 참조

  useEffect(() => {
    const canvas = canvasRef.current; // 캔버스 요소 가져오기
    const ctx = canvas.getContext("2d"); // 2D 컨텍스트 가져오기
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1; // 고해상도 디스플레이 지원

    // 고정된 캔버스 높이 설정
    const fixedHeight = 200; // 최대 나무 크기에 따라 조정
    const stageWidth = window.innerWidth;
    const stageHeight = Math.max(window.innerHeight, fixedHeight);

    canvas.width = stageWidth * pixelRatio;
    canvas.height = stageHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio); // 캔버스 크기와 비율 조정

    // 나무가 화면 상단에서 시작하지 않도록 설정
    const treeBaseY = stageHeight - 50; // 나무가 화면 하단에서 시작하도록 설정

    // 색상 배열에서 3개의 색상을 무작위로 선택
    const selectedColors = COLOR_ARR.sort(() => Math.random() - 0.5).slice(
      0,
      3
    );

    // Tree 인스턴스 생성 및 그리기 시작
    const tree = new Tree(
      ctx,
      stageWidth / 2,
      treeBaseY,
      day,
      hp,
      selectedColors[0], // 시작 색상
      selectedColors[1] // 끝 색상
    );
    tree.draw(); // 나무 그리기

    return () => {}; // 컴포넌트 언마운트 시 정리 작업 (필요 시 추가 가능)
  }, [hp, day]); // hp와 day가 변경될 때마다 useEffect 실행

  return <canvas ref={canvasRef}></canvas>; // 캔버스 요소 반환
};

export default TreeCanvas; // TreeCanvas 컴포넌트 내보내기
