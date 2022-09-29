require('dotenv').config()
const Telegraf = require("telegraf").Telegraf

const bot = new Telegraf(process.env.BOT_TOKEN);
let store = {};
let date_server="";
let flag = "stats";

function getCurrentDate(){
    var today=new Date();
    var today_day = String(today.getDate()).padStart(2,'0');
    var today_month = String(today.getMonth()+1).padStart(2,'0');
    var today_year = today.getFullYear();
    today = today_year + "-" + today_month + "-" + today_day;
    console.log(today);
    console.log(date_server);
    return today;
}
function getDataFromServer(forceFetch = false){
    if(!forceFetch){
        return;
    }
    return fetch("https://russianwarship.rip/api/v1/statistics/latest",
            {
                method: "get",
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                store = data;
                date_server = store.data.date;
                console.log("Go to server")
            })
}

bot.start(ctx => {
    ctx.replyWithHTML( "Вітаю, шановне панство!)" , {
        reply_markup : {
            inline_keyboard: [
                [{text : "Resource", url: "https://russianwarship.rip/"}],
                [{text : "Get all by day", callback_data: "getAllByDay"}],
                [{text : "Get all", callback_data: "getAll"}],
            ]
        }
    });

})

bot.action("getAllByDay", ctx => {
    flag = "increase";
    ctx.reply("Get all by day");
})
bot.action("getAll", ctx => {
    flag = "stats";
    ctx.reply("Get all");
})

bot.hears(/Привіт+/i, ctx => {
    ctx.reply("Файно балакаєш, мені це до вподоби" + "\u{1F970}")
})

bot.hears(/[A-Z]+/i, async ctx => {
    let message = ctx.message.text;
    await getDataFromServer(date_server!=getCurrentDate());
    ctx.reply(message + ": " + store.data[flag][message]);
});

bot.launch();