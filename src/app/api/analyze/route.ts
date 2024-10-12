// pages/api/analyze.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// POST 메서드 처리
export async function POST(req: NextRequest) {
  const { entry } = await req.json();
  console.log(entry);
  try {
    // OpenAI API 호출
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a mental health counselor who specializes in analyzing the emotions expressed in diary entries. Your task is to categorize the emotions into the following six categories: joy_pct, sadness_pct, anxiety_pct, anger_pct, neutrality_pct, and fatigue_pct. You should provide the analysis in the following format: 

  - joy_pct: X%
  - sadness_pct: X%
  - anxiety_pct: X%
  - anger_pct: X%
  - neutrality_pct: X%
  - fatigue_pct: X%

  Please ensure that the percentages add up to 100%. If multiple emotions are expressed, distribute the percentages accordingly. Be concise and provide the analysis in English.`,
          },
          {
            role: "user",
            content: `Analyze the emotions expressed in the following text and provide the percentage distribution for each of the six categories: ${entry}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // 환경 변수로 API 키 설정
        },
      },
    );

    // OpenAI 응답 파싱
    const analysisText = openaiResponse.data.choices[0].message.content;
    const emotionPercentages = parseEmotionAnalysis(analysisText); // 감정 분석 파싱
    console.log(emotionPercentages);
    return NextResponse.json(emotionPercentages); // 성공적인 응답
  } catch (error) {
    console.error("GPT API 요청 오류: ", error);
    return NextResponse.json(
      { error: "Failed to analyze emotions" },
      { status: 500 },
    ); // 실패 시 500 에러 반환
  }
}

// 감정 분석 결과 파싱 함수
function parseEmotionAnalysis(text: string) {
  const lines = text.split("\n");
  const emotionPercentages: Record<string, number> = {};

  lines.forEach((line) => {
    const match = line.match(/(\w+):\s*(\d+)%/);
    if (match) {
      const emotion = match[1];
      const percentage = parseInt(match[2], 10);
      emotionPercentages[emotion] = percentage;
    }
  });

  return emotionPercentages;
}
