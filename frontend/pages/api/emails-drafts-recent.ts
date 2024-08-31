import nylas from "@/lib/nylasClient";
import { envConfig } from "./config";
import { aiAgentForEmails } from "@/lib/groqFunctions";
import type { NextApiRequest, NextApiResponse } from 'next'
import { emailsDataManipulation } from "@/lib/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const identifier = envConfig.identifier;
    const drafts = await nylas.drafts.list({
      identifier,
      queryParams: {
        limit: 20,
      }
    })
    const data = emailsDataManipulation(drafts);
    const summary  = await aiAgentForEmails(data, req.body.text)


    res.json({summary});

  } catch (error) {
    console.error("Error fetching unread emails:", error);
    res.status(500).send("Error fetching emails");
  }
}