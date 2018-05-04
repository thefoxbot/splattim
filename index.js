const Discord = require("discord.js")
const bot = new Discord.Client()
const fs = require('fs');

const modules = require('./modules/index.js')

const profiles = require("./profiles.json")
//correct format:
//{"id":USEROBJECT,"id2":USEROBJECT}
//USEROBJECT = {"name", "mainweapon", "ranks":RANKOBJECT, "level", "friendcode"}
//RANKOBJECT = {"clamblitz", "rainmaker", "splatzones", "towercontrol"}

Object.keys(profiles.battles).forEach(function(key) {
    var value = profiles.battles[key];
    value["cooldown"] = null
    value["onCooldown"] = false
    profiles.battles[value.id]
  });

timstats = [null,null,null]

bot.on("ready", async function() {
    console.log("O. K.!")
    bot.user.setPresence({ game: { name: "Splatoon 2 but its banned by Roskomnadzor"} })
    await refreshStats()
    await updateStats(timstats[0],timstats[1],timstats[2])
    console.log("updated everything")
})

async function updateStats(timstats0, timstats1, timstats2) {
    timmessages = [,,]
    if(timstats0 !== null) {
        bot.channels.get("436618450585255964").fetchMessage("436884425771319321").then(m => {
            m.edit("**TimStats**\nVersion: "+timstats0.version+"\nPing (may be inaccurate): "+bot.ping+"ms\nProfiles made: "+timstats0.profilessize+"\nBattle accounts made: "+timstats0.battleprofilessize+"\nhe does it!")
        })
    }
    if(timstats1 !== null) {
        bot.channels.get("436618450585255964").fetchMessage("436884469530624010").then(m => {
            m.edit("**Server Stats**\nMembers: "+timstats1.members+"\nhe does it!")
        })
    }
    if(timstats2 !== null) {
        bot.channels.get("436618450585255964").fetchMessage("436884523813175306").then(m => {
            m.edit("**Splat Stats**\nhe... doesn't do it yet (WIP)")
        })
    }
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

async function refreshStats() {
    timstats = [{version:"0.5 Alpha",profilessize:Object.size(profiles)-1,battleprofilessize:Object.size(profiles.battles)},{members: bot.guilds.get("433670865817829387").members.array().length},{avaivable: false}]
}

bot.on("message", msg => {
    let params = msg.content.split(" ").splice(1);

modules.core.cmds(msg, params, bot)
modules.debug.cmds(msg, params, bot, profiles)
modules.other.cmds(msg, params, bot, profiles)

//modules stuff, not putting this in a serprate module though
if(msg.content === "splat reloadmodules") {
    if(msg.author.id === "209765088196821012") {
            msg.channel.sendMessage("reloading...")
            const modules = require('./modules/index.js')
            msg.channel.sendMessage("done!")
    }
}

if(msg.content.startsWith("splat reloadmodule ")) {
    if(msg.author.id === "209765088196821012") {
        msg.channel.sendMessage("reloading "+params[1]+"...")
        modules[params[1]] = require("./modules/"+params[1]+".js")
    }
}

//this along with all stats content stays here
if(msg.content === "splat updatestats") {
    if  (msg.author.id === "209765088196821012" || msg.author.id === "239493437089513474") {
        updateProfiles()
        refreshStats()
        updateStats(timstats[0],timstats[1],timstats[2])
        msg.channel.sendMessage("done!\n(note: this command is owner only so dont try it)")
    } else {
        msg.channel.sendMessage("i JUST said its owner only, but you HAD to test it.")
    }
}

//debug stays here too as it needs to run from root
    if (msg.content.startsWith("splat debug ") === true) {
        if (msg.author.id === "209765088196821012" || msg.author.id === "239493437089513474") {
            try {
                var code = msg.content.replace("splat debug ","")
                var evaled = eval(code);

                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);

                let embed = {
                    title: "Eval",
                    color: "990000",
                    fields: [{
                            name: "Input",
                            value: "```xl\n" + code + "\n```",
                            inline: true
                        },
                        {
                            name: "Output",
                            value: "```xl\n" + clean(evaled) + "\n```",
                            inline: true
                        }
                    ],
                    description: "HE DOES IT!"
                }

                msg.channel.sendMessage("", { embed });
                msg.react("☑")
            } catch (err) {
                msg.channel.sendMessage(`:warning: \`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
            };
        } else {
            msg.channel.sendMessage("no this is owner only you cannot fool me")
        };
    }
})

bot.on("guildMemberAdd", bember => {
refreshStats()
updateStats(timstats[0],timstats[1],timstats[2])
})

bot.on("guildMemberRemove", bember => {
    refreshStats()
    updateStats(timstats[0],timstats[1],timstats[2])
})

//removed for well, em, OBVIOUS reasons.
bot.login("~/token.json")