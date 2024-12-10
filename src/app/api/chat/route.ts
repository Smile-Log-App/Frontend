// pages/api/chat.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const initialMessage = [
    {
      role: "system",
      content: `당신은 감정 탐구를 돕는 챗봇입니다. 
      사용자와 이전에 나눈 대화를 기억하며 감정에 대한 지속적인 탐구를 돕고, 사용자가 자신의 감정을 더 깊이 이해할 수 있도록 유도하세요. 
      어조는 따뜻하고 공감적이어야 하며, 사용자가 편안하게 자신의 감정을 표현할 수 있도록 도와야 합니다.
      - 첫 질문은 사용자가 표현한 가장 두드러진 감정에 대한 질문이어야합니다. 
      - 이후에는 사용자의 답변을 기반으로 구체적인 질문을 추가로 던지되, 한 번에 한 가지만 질문해주세요.
      - 사용자가 편안하게 답변할 수 있도록 여유를 주고, 적극적으로 공감하는 표현을 사용하세요.
      - 필요하다면 질문 대신 정보 제공이나 피드백으로 대화를 이끌어가세요.
      다음은 대화의 흐름을 위한 가이드입니다:
      
      1. 감정 파악 및 탐구: 사용자가 표현한 주요 감정을 파악하고, "무엇이 당신을 이렇게 느끼게 만들었나요?"와 같은 질문을 통해 감정의 원인을 탐구합니다.
      2. 공감적 반응: 사용자가 감정을 표현하면 공감하며 따뜻하게 반응합니다.
      3. 자기 성찰 유도: 사용자가 자신의 감정을 성찰하도록 "어떤 점이 이런 감정을 느끼게 했을까요?"와 같은 개방형 질문을 던집니다.
      4. 감정의 양면성 탐구: 감정의 긍정적, 부정적 측면을 모두 탐구할 수 있도록 질문을 던집니다. 예: "이 경험에서 긍정적인 부분은 무엇이었나요?"
      5. 감정 대처 방안 제안: 사용자가 감정을 다룰 수 있도록 "이 상황에서 나아지기 위해 무엇이 도움이 될까요?"와 같은 질문을 합니다.
      6. 대화 연속성 유지: 이전 대화 내용을 기억하며, 자연스러운 흐름으로 사용자가 감정을 탐구하도록 돕습니다.
      `,
    },
  ];

  // 전체 메시지 배열을 API 요청에 포함하여 연속성을 유지합니다
  const apiMessages = [
    ...initialMessage,
    ...messages.map((msg: any) => ({
      role: msg.isBot ? "assistant" : "user",
      content: msg.text,
    })),
  ];

  try {
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: apiMessages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      },
    );

    const chatResponse = openaiResponse.data.choices[0].message.content;
    return NextResponse.json({ message: chatResponse }); // 응답 메시지만 반환
  } catch (error) {
    console.error("GPT API 요청 오류: ", error);
    return NextResponse.json(
      { error: "Failed to generate chatbot response" },
      { status: 500 },
    );
  }
}
