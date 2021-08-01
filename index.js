const telegramAPI = require('node-telegram-bot-api')
const {againOption, gameOption} = require('./options')
const token = '1941065195:AAGMT0mUt4CUWjiCDkCiYxah5SHhzjC33g4'

const bot = new telegramAPI(token, {polling: true})



bot.setMyCommands([
    {command: '/start', description: 'Начальное приветсвие'},
    {command: '/game', description: 'Начать игру'}
])

chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 1 до 9')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber
    console.log(randomNumber)
    await bot.sendMessage(chatId, 'Отгадывай',gameOption)
}
const start = () => {
    bot.on('message', async msg => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === ('/start')) {
            return bot.sendMessage(chatId, `Привет, тебя зовут ${msg.from.first_name}`)
        }
        if (text === ('/game')) {
            return startGame(chatId)
        }
    })
    bot.on('callback_query',  async msg => {
        console.log(msg)
        const chatId = msg.message.chat.id
        const data = msg.data

        if (data === ('/again')) {
            return startGame(chatId)
        }
        if (data == chats[chatId]) {
            return  await bot.sendMessage(chatId,'Верно',againOption)
         }
       return bot.sendMessage(chatId,`Не верно, бот загадал ${chats[chatId]}`,againOption)
    })
}

start()