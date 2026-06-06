import { createAlibaba } from '@ai-sdk/alibaba';
import { convertToModelMessages, streamText, UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const alibaba = createAlibaba({
    apiKey: process.env.ALIBABA_API_KEY,
    baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
  });

  const result = streamText({
    model: alibaba('qwen3.7-max'),
    messages: await convertToModelMessages(messages),
  });



  return result.toUIMessageStreamResponse();
}



