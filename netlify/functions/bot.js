const Telegraf = require('telegraf');
const { Chatbot } = require('edgegptjs');

const bot = new Telegraf(process.env.BOT_TOKEN);
const edgebot = new Chatbot("./cookies.json");

bot.start((ctx) => {
  ctx.reply("Hi, I'm the EdgeGPT chatbot. Send me a message and I'll respond with something interesting!");
});

bot.command('bots', (ctx) => {
  const keyboard = Telegraf.Markup.inlineKeyboard([
    Telegraf.Markup.urlButton('More bots here!', 'https://t.me/PatrizioTheDevbot')
  ]);
  ctx.reply('To check on the other bots select the button', keyboard);
});

bot.on('text', async (ctx) => {
  const user_input = ctx.message.text;
  const response = await edgebot.ask(user_input);
  
  ctx.reply(response);
});


module.exports.handler = async (event, context) => {
    try {
      await bot.handleUpdate(JSON.parse(event.body));
      return { statusCode: 200 };
    } catch (error) {
      console.error(error);
      return { statusCode: 400 };
    }
  };