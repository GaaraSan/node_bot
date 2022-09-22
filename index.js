require('dotenv').config()
const Telegraf = require("telegraf").Telegraf

const bot = new Telegraf(process.env.BOT_TOKEN);
let store = {};
fetch("https://russianwarship.rip/api/v1/statistics/latest",
        {
            method: "get",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            store = data;
        })

bot.start(ctx => {
    ctx.reply("Вітаю, шановне панство!)")
})

bot.hears(/Привіт+/i, ctx => {
    ctx.reply("Файно балакаєш, мені це до вподоби" + "\u{1F970}")
})

bot.hears(/[A-Z]+/i, (ctx) => {
    message = ctx.message.text;
    ctx.reply(message + ": " + store.data.stats[message])
}
);
// });

bot.launch();