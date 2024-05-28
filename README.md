# 일기 작성 및 감정 분석 애플리케이션 

이 프로젝트는 Next.js와 TypeScript를 사용하여 개발된 일기 작성 및 감정 분석 애플리케이션의 프론트엔드 레포지토리입니다. 사용자는 일기를 작성하고 제출하면, 감정 분석 결과를 나무로 시각화하여 확인할 수 있습니다.

## 목차

1. [프로젝트 개요](#프로젝트-개요)
2. [사용 기술](#사용-기술)
3. [설치 방법](#설치-방법)
4. [폴더 구조](#폴더-구조)
5. [주요 컴포넌트](#주요-컴포넌트)


## 프로젝트 개요

이 프로젝트는 사용자가 일기를 작성하고 감정 분석 결과를 받을 수 있는 애플리케이션의 프론트엔드 부분입니다. 프론트엔드는 Node.js 백엔드 서버와 통신하여 일기 내용을 전송하고 감정 분석 결과를 수신합니다.

## 사용 기술

- Next.js (App Router)
- TypeScript
- Axios
- ReactQuill

## 설치 방법

1. **레포지토리 클론**
   ```sh
   git clone https://github.com/Smile-Log-App/Frontend.git
   cd frontend
   
2. **의존성 설치 및 개발 서버 시작**
   ```sh
   npm install
   npm run dev
   
## 폴더 구조
```bash
📦src
 ┣ 📂api
 ┃ ┣ 📜axiosInstance.ts
 ┃ ┗ 📜postDiary.ts
 ┣ 📂app
 ┃ ┣ 📜ReactQueryProvider.tsx
 ┃ ┣ 📜error.tsx
 ┃ ┣ 📜global-error.tsx
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜not-found.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📂Home
 ┃ ┃ ┗ 📜TextEditor.tsx
 ┃ ┗ 📂tree
 ┃ ┃ ┗ 📜TreeCanvas.js
 ┣ 📂hooks
 ┣ 📂js
 ┃ ┣ 📜app.js
 ┃ ┣ 📜branch.js
 ┃ ┗ 📜tree.js
 ┣ 📂types
 ┃ ┗ 📜svgr.d.ts
 ┗ 📂utils

```
## 주요 컴포넌트

### HomePage 컴포넌트

`HomePage` 컴포넌트는 일기 작성과 감정 분석 기능을 제공하며, 감정 분석 결과를 바탕으로 나무의 HP(Health Points)를 관리합니다.

## 주요 기능

1. **일기 작성**
   - `TextEditor` 컴포넌트를 사용하여 사용자가 일기를 작성할 수 있습니다.
   - `ReactQuill` 라이브러리를 사용하여 리치 텍스트 에디터를 제공합니다.

2. **감정 분석**
   - 작성된 일기를 `postDiary` 함수를 통해 백엔드 서버로 전송합니다.
   - 백엔드에서 Naver Sentiment API를 사용하여 감정 분석을 수행하고 결과를 반환합니다.

3. **나무 HP 관리**
   - 감정 분석 결과에 따라 나무의 HP를 업데이트합니다.
   - HP는 로컬 스토리지에 저장되어 페이지 새로고침 시에도 유지됩니다.
   - "초기화하기" 버튼을 통해 나무의 HP를 기본값(50)으로 재설정할 수 있습니다.

4. **시각화**
   - `TreeCanvas` 컴포넌트를 사용하여 나무의 HP를 시각화합니다.
   - 감정 분석 결과에 따라 나무의 상태가 변화합니다.

