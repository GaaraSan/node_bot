const Telegraf = require("telegraf").Telegraf,
    os = require('node:os'),
    BOT_TOKEN = "5738356050:AAEfmYGhWUJKYl-iVb3vgcyuw0Om3qABdXw";

const bot = new Telegraf(BOT_TOKEN);

bot.start(ctx => {
    // fetch("https://russianwarship.rip/api/v1/statistics/latest",
    //     {
    //         method:"get",
    //         headers:{'Content-Type': 'application/json'}
    //     })
    // .then(response => response.json())
    // .then(data => {
    // ctx.reply(message + ": " + data.data.stats[message])});
    ctx.reply("Вітаю, шановне панство!)")
})

bot.hears(/Привіт+/i, ctx => {
    ctx.reply("Файно балакаєш, мені це до вподоби"+ "\u{1F970}")
})

bot.hears(/[A-Z]+/i, (ctx) => {
    message = ctx.message.text;
    fetch("https://russianwarship.rip/api/v1/statistics/latest",
        {
            method:"get",
            headers:{'Content-Type': 'application/json'}
        })
    .then(response => response.json())
    .then(data => {
        ctx.reply(message + ": " + data.data.stats[message])})}    
);
// });

bot.launch();