// pages/api/chat.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const initialMessage = [
    {
      role: "system",
      content: `You are a compassionate chatbot designed to help users explore their emotions based on their journal entries. You will be given journal text as input and should ask simple, open-ended questions to help the user reflect on their feelings.
      
      - Messages contain only the following properties:
        - text: the message content
        - isBot: indicates if the message is from the bot (your messages should not include this flag when responding)
        
      Based on the journal entry, begin with a supportive question that helps the user reflect on their emotions.`,
    },
    {
      role: "user",
      content: messages[0].text, // 첫 번째 메시지로 일기 내용을 전송
    },
  ];

  try {
    const openaiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: initialMessage,
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
