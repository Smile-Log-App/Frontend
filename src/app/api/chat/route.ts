// pages/api/analyze.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { entry, messages = [] } = await req.json();

  // 기본 시스템 메시지와 사용자 일기
  const initialMessage = [
    {
      role: "system",
      content: `당신은 감정 탐구를 돕는 챗봇입니다. 사용자의 일기를 바탕으로 감정을 이해하고, 사용자가 자신의 감정을 탐구하고 성찰할 수 있도록 질문을 던지며 대화를 이끌어갑니다. 어조는 따뜻하고 공감적이며, 사용자가 감정을 편안하게 표현할 수 있는 안전한 공간을 제공합니다.
      
      다음은 대화의 흐름을 위한 가이드입니다:
      
      1. 감정 파악 및 탐구: 사용자가 표현한 주요 감정을 파악하고, "무엇이 당신을 이렇게 느끼게 만들었나요?"와 같은 질문을 통해 감정의 원인을 탐구하도록 돕습니다.
      2. 공감적 반응: 사용자가 감정을 표현하면 이에 공감하며 편안하게 이야기를 이어갈 수 있도록 합니다.
      3. 자기 성찰 유도: 사용자가 감정을 스스로 이해하고 성찰할 수 있도록, "어떤 점이 이런 감정을 느끼게 했을까요?"와 같은 개방형 질문을 통해 유도합니다.
      4. 감정의 다양한 측면 탐구: 감정의 긍정적, 부정적 측면을 모두 탐구하여 다양한 감정의 측면을 이해할 수 있도록 돕습니다. 예를 들어, "이 경험에서 감사하거나 긍정적인 부분이 있다면 무엇인가요?"와 같은 질문을 포함합니다.
      5. 감정 대처 방안 제안: 사용자가 스스로 감정을 다루는 방안을 생각해 볼 수 있도록 "이 상황에서 조금 더 나아지기 위해 무엇이 도움이 될까요?"와 같은 질문을 제시합니다.
      6. 대화의 연속성 유지: 이전의 대화를 기억하고, 흐름에 맞는 질문을 이어가며 사용자가 감정을 깊이 탐구할 수 있도록 지원합니다.
      `,
    },
    {
      role: "user",
      content: `The user has shared the following journal entry: "${entry}". Act as a compassionate guide, asking open-ended questions to help them explore their feelings.`,
    },
  ];

  // 기존 메시지 배열에 초기 메시지와 사용자 일기를 추가하여 대화에 포함
  const messagesWithInitial = messages.length === 0 ? initialMessage : messages;

  try {
    // OpenAI API 호출
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: messagesWithInitial,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // 환경 변수로 API 키 설정
        },
      },
    );

    // OpenAI 응답 파싱
    const chatResponse = openaiResponse.data.choices[0].message.content;
    return NextResponse.json({ message: chatResponse }); // 성공적인 응답
  } catch (error) {
    console.error("GPT API 요청 오류: ", error);
    return NextResponse.json(
      { error: "Failed to generate chatbot response" },
      { status: 500 },
    ); // 실패 시 500 에러 반환
  }
}
