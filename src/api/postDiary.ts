import { instance } from "@/api/axiosInstance";

interface Confidence {
  negative: number;
  positive: number;
  neutral: number;
}

interface Highlight {
  offset: number;
  length: number;
}

interface Sentence {
  content: string;
  offset: number;
  length: number;
  sentiment: string;
  confidence: Confidence;
  highlights: Highlight[];
}

interface Document {
  sentiment: string;
  confidence: Confidence;
}

export interface ResponseData {
  document: Document;
  sentences: Sentence[];
}
export const postDiary = async (content: string): Promise<ResponseData> => {
  return await instance.post("/diary", {
    content,
  });
};
