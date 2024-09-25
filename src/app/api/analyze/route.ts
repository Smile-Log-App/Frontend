// pages/api/analyze.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// POST 메서드 처리
export async function POST(req: NextRequest) {
  const { entry } = await req.json();

  try {
    // OpenAI API 호출
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You're a mental health counselor analyzing diary entries.`,
          },
          {
            role: "user",
            content: `다음 텍스트의 감정을 기쁨, 슬픔, 불안/걱정, 짜증/화남, 평온함/중립, 피곤함/지침 총 6가지 카테고리로 퍼센트 분석해줘: ${entry}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // 환경 변수로 API 키 설정
        },
      },
    );

    const analysis = openaiResponse.data.choices[0].message.content;
    return NextResponse.json({ analysis }); // 성공적인 응답
  } catch (error) {
    console.error("GPT API 요청 오류: ", error);
    return NextResponse.json({ error: "감정 분석 실패" }, { status: 500 }); // 실패 시 500 에러 반환
  }
}
