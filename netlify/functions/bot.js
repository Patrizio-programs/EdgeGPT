const Telegraf = require('telegraf');
const { Chatbot } = require('edgegptjs');

const bot = new Telegraf("6160231980:AAGz70x3VQqYgKnVgXGx6o3R5wZaJzdBBVs");
const edgebot = new Chatbot("./cookies.json");

bot.start((ctx) => {
  ctx.reply("Hi, I'm the EdgeGPT chatbot. Send me a message and I'll respond with something interesting!");
});

bot.command('bots', (ctx) => {

  ctx.reply('More bots here https://t.me/PatrizioTheDevbot');
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
