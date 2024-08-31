
export  const envConfig = {
  identifier: process.env.USER_GRANT_ID || "should add your user_grant_id",
  nylas_api_url: process.env.NYLAS_API_URI || "should add your nylas api url",
  nylas_api_key: process.env.NYLAS_API_KEY || "should add your nylas api key",
  groq_api_key: process.env.GROQ_API_KEY || "should add your groq api key",
  calendar_id: process.env.CALENDAR_ID || "should add your calendar id",
}