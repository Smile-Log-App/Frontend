import { instance } from "@/api/axiosInstance";

// 감정 분석 API 응답에서 사용되는 각 인터페이스 정의

// 감정 분석의 확신도를 나타내는 인터페이스
interface Confidence {
  negative: number; // 부정적인 감정 확신도
  positive: number; // 긍정적인 감정 확신도
  neutral: number; // 중립적인 감정 확신도
}

// 하이라이트 정보를 나타내는 인터페이스
interface Highlight {
  offset: number; // 하이라이트 시작 위치
  length: number; // 하이라이트 길이
}

// 각 문장을 나타내는 인터페이스
interface Sentence {
  content: string; // 문장 내용
  offset: number; // 문장 시작 위치
  length: number; // 문장 길이
  sentiment: string; // 문장의 감정 (positive, negative, neutral)
  confidence: Confidence; // 문장의 감정 확신도
  highlights: Highlight[]; // 문장에서 강조된 부분
}

// 문서 전체를 나타내는 인터페이스
interface Document {
  sentiment: string; // 문서의 전체 감정 (positive, negative, neutral)
  confidence: Confidence; // 문서의 전체 감정 확신도
}

// API 응답 데이터를 나타내는 인터페이스
export interface ResponseData {
  document: Document; // 문서 전체 정보
  sentences: Sentence[]; // 개별 문장 정보
}

// 일기 내용을 POST 요청으로 보내고 응답 데이터를 반환하는 함수
export const postDiary = async (content: string): Promise<ResponseData> => {
  return await instance.post("/diary", {
    content, // 요청 본문에 일기 내용 포함
  });
};
