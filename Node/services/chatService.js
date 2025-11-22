// services/chatService.js
const {
    LexRuntimeV2Client,
    RecognizeTextCommand
  } = require("@aws-sdk/client-lex-runtime-v2");
  
  require("dotenv").config();
  
  const client = new LexRuntimeV2Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });
  
  const sendMessageToLex = async (text) => {
    const command = new RecognizeTextCommand({
      botId: process.env.LEX_BOT_ID,
      botAliasId: process.env.LEX_BOT_ALIAS_ID,
      localeId: process.env.LEX_LOCALE,
      sessionId: "user-session-1",
      text,
    });
  
    const response = await client.send(command);
    return response.messages?.[0]?.content || "Sorry, I didn't get that.";
  };
  
  module.exports = { sendMessageToLex };
  