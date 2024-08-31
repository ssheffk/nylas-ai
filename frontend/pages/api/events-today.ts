import nylas from "@/lib/nylasClient";
import { envConfig } from "./config";
import type { NextApiRequest, NextApiResponse } from 'next'
import { eventsDataManipulation } from "@/lib/utils";
import { aiAgentForEvents } from "@/lib/groqFunctions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0); 
  
  const endOfToday = new Date()
  endOfToday.setHours(23, 59, 59, 999); 
  
  
  const startUnix = Math.floor(startOfToday.getTime() / 1000).toString(); 
  const endUnix = Math.floor(endOfToday.getTime() / 1000).toString();
  try {
    const identifier = envConfig.identifier;
    const calendarId = envConfig.calendar_id;
    const events = await nylas.events.list({
      identifier,
      queryParams: {
        calendarId,
        start: startUnix,
        end: endUnix,
      }
  })

  const data = eventsDataManipulation(events);
  const summary = await aiAgentForEvents(data, req.body.text);

  res.json({summary});
  } catch (error) {
    console.error("Error fetching events today:", error);
    res.status(500).send("Error fetching events");
  }
}
