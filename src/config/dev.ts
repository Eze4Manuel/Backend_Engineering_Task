
if (!require("dotenv").config({ path: ".env" })) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  appName: process.env.APP_NAME,
  port: process.env.PORT,
  dbURI: process.env.MONGODB_URI,
  NODE_ENV: process.env.NODE_ENV,
  jwtSecret: process.env.TOKEN_KEYPHRASE,
  clientBaseUrl: process.env.BASE_URL,
  server_base_url: process.env.SERVER_BASE_URL,
  secondary_client_base_url: process.env.SECONDARY_CLIENT_BASE_URL,
  email: {
    mail: process.env.MAIL_EMAIL,
    password: process.env.MAIL_PASSWORD
  },
};
