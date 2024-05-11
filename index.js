const TelegramApi = require("node-telegram-bot-api");
const token = "7178204911:AAGwOBbXon16Ur2EplDjsIJUfEGB8BHq6qE";
const path = require('path')
const bot = new TelegramApi(token, {polling: true})
const sleep = require(path.join(__dirname, "src/utils/sleep.js"))
const {isWin} = require("./src/utils/isWin");

bot.setMyCommands([
  {command: "/start", description: "Начальное приветствие"},
  {command: "/info", description: "Информация"},
])

bot.on("message", async msg => {
  const text = msg.text, chatId = msg.chat.id;

  const win = async (text, url) => {
    await bot.sendSticker(chatId, path.join(__dirname, url))
    await bot.sendMessage(chatId, text)
    await bot.sendSticker(chatId, path.join(__dirname, 'assets/stickers/win.tgs'))
  }

  const lose = async (text, url) => {
    await bot.sendSticker(chatId, path.join(__dirname, url))
    await bot.sendMessage(chatId, text)
    await bot.sendSticker(chatId, path.join(__dirname, 'assets/stickers/lose.tgs'))
  }

  if (text === "/start") {
    await bot.sendMessage(chatId, `Выберите Орёл или Решка`, {
      reply_markup: {
        keyboard: [
          ['⭐️ Орёл', '⭐️ Решка'],
          ['❌ Закрыть меню']
        ],
        resize_keyboard: true
      }
    })

    return bot.sendMessage(chatId, "Добро пожаловать в монетку")
  }
  if (text === "/info") {
    return bot.sendMessage(chatId, `Ваши инициалы: ${msg.from.first_name}`)
  }

  if (text == '⭐️ Орёл') {
    await bot.sendSticker(chatId, path.join(__dirname, 'assets/stickers/st1.tgs'))
    await bot.sendMessage(chatId, "Вы загадали Орла, идёт бросок монетки, ждите")

    if (isWin(99)) {
      await win("Вы победили, ВЫПАЛ ОРЁЛ!!!", 'assets/stickers/9.png')
    } else {
      await lose("Решка, Попробуйте снова :(", 'assets/stickers/10.png')
    }
    return;
  }

  if (text == '⭐️ Решка') {
    await bot.sendSticker(chatId, path.join(__dirname, 'assets/stickers/st1.tgs'))
    await bot.sendMessage(chatId, "Вы загадали Решку, идёт бросок монетки, ждите")

    if (isWin(99)) {
      await win("Вы победили, ВЫПАЛА РЕШКА!!!", 'assets/stickers/10.png')
    } else {
      await lose("Орёл, Попробуйте снова :(", 'assets/stickers/9.png')
    }

    return;
  }

  if (msg.text == '❌ Закрыть меню') {
    return await bot.sendMessage(chatId, 'Меню закрыто', {
      reply_markup: {
        keyboard: [
          ['Открыть меню']
        ],
        resize_keyboard: true
      }
    })
  }

  if (text === "Открыть меню") {
    return await bot.sendMessage(chatId, `Выберите Орёл или Решка`, {
      reply_markup: {
        keyboard: [
          ['⭐️ Орёл', '⭐️ Решка'],
          ['❌ Закрыть меню']
        ],
        resize_keyboard: true
      }
    })
  }

  bot.sendMessage(chatId, "Я тебя не понимаю")
})