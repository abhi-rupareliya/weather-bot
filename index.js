require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const { extractAndFormatWeatherData } = require("./helperFunctions");
const API_URL = process.env.API_URL;
const API_CRED = process.env.API_CRED;
const token = process.env.TELEGRAM_TOKEN;

try {
  const bot = new TelegramBot(token, { polling: true });
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;

    try {
      const api = API_URL + "?q=" + msg.text + API_CRED;
      console.log(api);
      const resp = await axios.get(api);
      console.log(resp.data);
      let respString = extractAndFormatWeatherData(resp.data);

      await bot.sendMessage(chatId, respString);
    } catch (error) {
      if (error.response.status === 404) {
        await bot.sendMessage(chatId, "City not found");
      } else {
        await bot.sendMessage(chatId, "Error getting weather data");
      }
    }
  });
} catch (error) {
  console.log(error);
}
