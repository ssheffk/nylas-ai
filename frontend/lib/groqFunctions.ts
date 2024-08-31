import groq from "./groqClient";


const emailFields = "'subject', 'email from', 'unread', 'date'";
const EMAIL = "email";

const eventFields = "'title', 'participants', 'resources', 'status', 'object', 'startTime', 'endTime', 'startTimeZone'";
const EVENT = "event";

function preDefinedContent (data: string, fields: string, flag: string)  {
  return `You are an AI assistant. Your task is to answer questions or provide information based on the following context, which includes email data. The ${flag} data consists of objects representing individual ${flag}s, each containing fields such as ${fields}.
            When answering:
            1. Focus on the content of the ${flag}s to extract relevant information.
            2. If asked to summarize, provide a brief overview of the key points from the ${flag}s.
            3. If a specific ${flag} is referenced, prioritize information from that ${flag}.
            4. Use the context of the ${flag}s to provide accurate and relevant responses.
            Here is the provided context:
            ${data}`
} 

export async function aiAgentForEmails(data: string, question: string) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "system",
          "content": preDefinedContent(data, emailFields, EMAIL)
        },
        {
          "role": "user",
          "content": question
        }
      ],
      "model": "llama3-8b-8192",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": true,
      "stop": null
    });

    let summary = '';

    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || '';
      summary += content;
    }

    return summary;  
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
}

export async function aiAgentForEvents(data: string, question: string) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      "messages": [
        {
          "role": "system",
          "content": preDefinedContent(data, eventFields, EVENT)
        },
        {
          "role": "user",
          "content": question
        }
      ],
      "model": "llama3-8b-8192",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": true,
      "stop": null
    });

    let summary = '';


    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || '';
      summary += content;
    }

    return summary;  
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
}
