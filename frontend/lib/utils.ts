import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function emailsDataManipulation(messages: any) {
  return messages.data.map((message: any) => (
    `{subject:${message.subject.trim()} ,email:${message.from[0].email}, unread:${message.unread}, date:${message.date}}`
      )).join('; ');
}

export function eventsDataManipulation(events: any) {
  return events.data.map((event: any) => (
    `{
      title:${event.title.trim()},
      participants:${event.participants},
      resources:${event.resources},
      status:${event.status},
      object: ${event.object},
      startTime: ${event.when.startTime},
      endTime: ${event.when.endTime},
      startTimeZone: ${event.when.startTimeZone},
      }`
      )).join('; ');
    }