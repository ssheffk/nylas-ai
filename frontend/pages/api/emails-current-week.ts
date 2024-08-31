import { aiAgentForEmails } from '@/lib/groqFunctions';
import nylas from '../../lib/nylasClient';
import { envConfig } from "./config";
import { emailsDataManipulation } from '@/lib/utils';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  startOfWeek.setHours(0, 0, 0, 0);
  
  try {
    const identifier = envConfig.identifier;
    const messages = await nylas.messages.list({
      identifier,
      queryParams: {
        receivedAfter: Math.floor(startOfWeek.getTime() / 1000)
      }
    });


    const data = emailsDataManipulation(messages);
    const summary  = await aiAgentForEmails(data, req.body.text)

    res.json({summary});
  } catch (error) {
    console.error("Error fetching unread emails:", error);
    res.status(500).send("Error fetching emails");
  }
}


