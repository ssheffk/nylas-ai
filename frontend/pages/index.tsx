'use client';
import { CornerDownLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

export default function Index() {
  const [message, setMessage] = useState('');
  const [userMessages, setUserMessages] = useState<
    { text: string; sender: string; time: string }[]
  >([]);
  const [aiMessages, setAiMessages] = useState<
    { text: string; sender: string; time: string }[]
  >([]);
  const [context, setContext] = useState<string>();
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setMessage(value);
  };

  const handleSubmit = () => {
    const timestamp = new Date().toISOString();

    setUserMessages((prevState) => {
      return [...prevState, { text: message, sender: 'user', time: timestamp }];
    });
    setMessage('');
  };

  const handleAiResponse = (message: string) => {
    const timestamp = new Date().toISOString();

    setAiMessages((prevState) => {
      return [...prevState, { text: message, sender: 'ai', time: timestamp }];
    });
  };

  const handleContextChange = (context: string) => {
    setContext(context);
    setUserMessages([]);
    setAiMessages([]);
  };

  useEffect(() => {
    async function fetchDetails() {
      try {
        if (userMessages.length > 0 && context) {
          const response = await fetch(`/api/${context}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Specify that the body is JSON
            },
            body: JSON.stringify({
              text: userMessages[userMessages.length - 1].text,
            }),
          });
          const data = await response.json();
          console.log(data);
          handleAiResponse(data.summary);
        }
      } catch (error) {
        console.error('Error fetching Nylas details:', error);
      }
    }

    fetchDetails();
  }, [userMessages, context]);

  return (
    <div className="grid h-screen w-full ">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4 justify-between">
          <img src="/logo.svg" alt="logo" className="h-[60%]" />

          <Select onValueChange={(e) => handleContextChange(e)}>
            <SelectTrigger className="w-[200px] bg-[#4169E1] text-white">
              <SelectValue placeholder="Select AI helper" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="emails-current-week">
                  Email&apos;s current week
                </SelectItem>
                <SelectItem value="emails-recent">
                  Recent email&apos;s
                </SelectItem>
                <SelectItem value="emails-recent-unread">
                  Recent unread email&apos;s
                </SelectItem>
                <SelectItem value="emails-drafts-recent">
                  Recent drafts
                </SelectItem>
                <SelectItem value="events-today">Events for today</SelectItem>
                <SelectItem value="events-current-week">
                  Events for the week
                </SelectItem>
                <SelectItem value="events-current-month">
                  Events for the month
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </header>
        <main className="flex-1 gap-4 overflow-auto p-5 lg:m-5">
          <div className="relative flex h-full max-h-[90vh] flex-col rounded-xl bg-[#E0F2FE] p-4 lg:col-span-2">
            <Badge variant="outline" className="absolute right-5 top-3">
              Output
            </Badge>
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {[...userMessages, ...aiMessages]
                .sort((a, b) => {
                  const dateA = new Date(a.time as string).getTime();
                  const dateB = new Date(b.time as string).getTime();
                  return dateA - dateB;
                })
                .map((message, index) =>
                  message.sender === 'ai' ? (
                    <div
                      key={index}
                      className="flex items-start space-x-2 justify-end"
                    >
                      <div className="flex-1 max-w-[40rem] text-right">
                        <p className="text-sm font-medium">{'nylas/AI'}</p>
                        <p className="text-sm font-medium">
                          {new Date(
                            message.time as string
                          ).toLocaleTimeString()}
                        </p>

                        <ReactMarkdown className="text-sm p-2 rounded-lg text-left bg-blue-500 text-white whitespace-pre-line">
                          {message.text}
                        </ReactMarkdown>
                      </div>

                      {/* Conditional rendering for user avatar */}

                      <span className="flex h-8 w-8 rounded-full bg-green-500 text-white items-center justify-center">
                        {/* Initials or icon for user */}
                      </span>
                    </div>
                  ) : (
                    <div key={index} className="flex items-start space-x-2 ">
                      {/* Conditional rendering for avatar alignment */}

                      <span className="flex h-8 w-8 rounded-full bg-sky-500 text-white items-center justify-center">
                        {/* Initials or icon for AI */}
                      </span>

                      <div className="flex-1 max-w-[40rem] text-left">
                        <p className="text-sm font-medium">{'You'}</p>
                        <p className="text-sm font-medium">
                          {new Date(
                            message.time as string
                          ).toLocaleTimeString()}
                        </p>
                        <p className="text-sm p-2 rounded-lg text-left bg-gray-200 text-black">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  )
                )}
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder={
                  context ? 'Type a message...' : 'Select an AI helper'
                }
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                onChange={handleChange}
                value={message}
                disabled={!context}
              />
              <div className="flex items-center p-3 pt-0">
                <Button
                  type="submit"
                  size="sm"
                  className="ml-auto gap-1.5 bg-[#4169E1] hover:bg-[#4169E1]"
                  onClick={handleSubmit}
                  disabled={!context}
                >
                  Send Message
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
