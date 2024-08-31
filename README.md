# **Intelligent Automation**

## **Overview**

This project is an intelligent automation tool designed to manage and analyze emails and events using Nylas APIs. Users can select specific data contexts—such as emails from the current week or upcoming events—and engage with an AI model to generate insights, summaries, and answers to queries based on the selected context.

## **Features**

- **Dynamic Context Selection**: Choose from various email and event categories to set the context for AI interactions.
- **Context-Aware AI**: Interact with the AI to generate summaries, counts, and other insights based on the selected data.
- **Real-Time Data Retrieval**: Access and analyze the most up-to-date information from your Gmail account.
- **Extensible Architecture**: Easily extend the application to cover all available Nylas APIs.

## **Tech Stack**

- **Frontend**:
  - Next.js
  - Tailwind CSS
  - Shadcn
- **Backend**:
  - Nylas API:
    - `emails-current-week`
    - `emails-recent`
    - `emails-recent-unread`
    - `emails-drafts-recent`
    - `events-today`
    - `events-current-week`
    - `events-current-month`
- **AI Integration**:
  - LLaMA 3 (8B model) via Groq

## **Setup Instructions**

### **1. Clone the Repository**

````bash
git clone https://github.com/your-repo-link.git
cd frontend


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
npm install
# or
yarn install
# or
pnpm install


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
