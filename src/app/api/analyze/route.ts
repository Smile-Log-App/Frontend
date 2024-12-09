// pages/api/analyze.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// POST 메서드 처리
export async function POST(req: NextRequest) {
  const { entry } = await req.json();

  try {
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `당신은 일기에서 표현된 감정을 분석하는 전문가입니다.
            사용자가 작성한 일기 내용을 기반으로 여섯 가지 감정(기쁨, 슬픔, 불안, 화남, 평온, 피로)의 비율을 퍼센트로 계산하여 제공합니다.
            분석 결과는 다음 형식 따르세요 :
            - joy_pct: X%
            - sadness_pct: X%
            - anxiety_pct: X%
            - anger_pct: X%
            - neutrality_pct: X%
            - fatigue_pct: X%
            
            각 감정의 정의는 다음과 같습니다:
            -joy: 행복, 신남, 만족감, 즐거움, 희열, 기쁨, 환희, 유쾌함, 기쁨, 황홀, 명랑, 만족
            -sadness: 슬픔, 비탄, 실망, 좌절, 우울, 무기력, 속상함, 멜랑콜리, 절망, 낙심, 마음의 상처, 비애, 외로움, 고통
            -anxiety: 스트레스, 걱정, 불안, 초조, 두려움, 긴장, 불편함, 동요, 공포, 불안감, 두려움, 불안정
            -anger: 짜증, 분노, 좌절, 분개, 원망, 짜증, 격분, 분노, 쓰라림, 성가심
            -neutrality: 차분함, 무관심, 강한 감정의 부재, 초연함, 무관심, 평온, 평정, 균형, 무감정, 절제
            -fatigue: 피로, 지침, 낮은 에너지, 피곤함, 기진맥진, 무기력, 졸림, 나른함, 소진, 권태, 의욕 저하
            
            분석할 때 단위에 구애받지 말고 다양한 숫자로 퍼센티지를 설정하세요. 
            예를 들어 3%, 7%, 12% 등 다양한 비율을 사용해 감정의 미묘한 차이를 나타낼 수 있습니다. 
            이제 일기 내용을 읽고, 각각의 감정 비율을 위 형식에 맞춰 분석하여 제공하세요. 감정의 값은 영어로 반환하세요.`,
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
