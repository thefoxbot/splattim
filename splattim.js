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

function updateChannelStats() {
	var channel1 = bot.channels.get("465143934851612672")
	channel1.setName("Member Count: "+channel1.guild.members.size)
	var channel2 = bot.channels.get("465144031576457216")
	channel2.setName("Users: "+channel2.guild.members.filter(m=>!m.user.bot).size)
	var channel3 = bot.channels.get("465144074996023316")
	channel3.setName("Bots: "+channel3.guild.members.filter(m=>m.user.bot).size)
}
function updateChannelStats2() {
	var channel1 = bot.channels.get("484433681193369616")
	channel1.setName("Member Count: "+channel1.guild.members.size)
	var channel2 = bot.channels.get("484433712000532511")
	channel2.setName("Users: "+channel2.guild.members.filter(m=>!m.user.bot).size)
	var channel3 = bot.channels.get("484433738285973504")
	channel3.setName("Bots: "+channel3.guild.members.filter(m=>m.user.bot).size)
}

bot.on("ready", async function() {
    console.log("O. K.!")
    bot.user.setPresence({ game: { name: "h"} })
    await refreshStats()
    await updateStats(timstats[0],timstats[1],timstats[2])
	updateChannelStats()
    await refreshStats(1)
    await updateStats2(timstats[0],timstats[1],timstats[2])
	updateChannelStats2()
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

async function updateStats2(timstats0, timstats1, timstats2) {
    timmessages = [,,]
    if(timstats0 !== null) {
        bot.channels.get("484389619798900738").fetchMessage("484434434691432468").then(m => {
            m.edit("**TimStats**\nVersion: "+timstats0.version+"\nPing (may be inaccurate): "+bot.ping+"ms\nProfiles made: "+timstats0.profilessize+"\nBattle accounts made: "+timstats0.battleprofilessize+"\nhe does it!")
        })
    }
    if(timstats1 !== null) {
        bot.channels.get("484389619798900738").fetchMessage("484434455017029633").then(m => {
            m.edit("**Server Stats**\nMembers: "+timstats1.members+"\nhe does it!")
        })
    }
    if(timstats2 !== null) {
        bot.channels.get("484389619798900738").fetchMessage("484434463678398467").then(m => {
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

function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

async function refreshStats(server) {
switch(server) {
case 0:
    timstats = [{version:"0.8.1 Alpha",profilessize:Object.size(profiles)-1,battleprofilessize:Object.size(profiles.battles)},{members: bot.guilds.get("433670865817829387").members.array().length},{avaivable: false}]
break;
case 1:
    timstats = [{version:"0.8.1 Alpha",profilessize:Object.size(profiles)-1,battleprofilessize:Object.size(profiles.battles)},{members: bot.guilds.get("477516073453748237").members.array().length},{avaivable: false}]
break;
}
}

bot.on("message", msg => {
    let params = msg.content.split(" ").splice(1);

modules.core.cmds(msg, params, bot)
modules.debug.cmds(msg, params, bot, profiles)
modules.other.cmds(msg, params, bot, profiles, Object)

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
if (bember.guild.id === "477516073453748237") {
	refreshStats(1)
	updateChannelStats2()
    updateStats2(timstats[0],timstats[1],timstats[2])
    bot.channels.get("478243661973553167").send("Hey, "+bember.user.username+", welcome to **Cool Cephalopods** :squid::octopus: :tada::hugging: ! Welcome aboard.")
}
})

bot.on("guildMemberRemove", bember => {
if (bember.guild.id === "477516073453748237") {
	refreshStats(1)
	updateChannelStats2()
    updateStats2(timstats[0],timstats[1],timstats[2])
    bot.channels.get("478243661973553167").send("**"+bember.user.username+"** has left on their journey.")
} else if (bember.guild.id === "433670865817829387") {
	refreshStats(0)
	updateChannelStats()
	updateStats(timstats[0],timstats[1],timstats[2])
}

	if(bember.guild.id === bot.channels.get("433670866304237579").guild.id) {
		bot.channels.get("433670866304237579").send("since dyno is lazy, i'll have to do the work for him..\n"+bember.user.username+"#"+bember.user.discriminator+" has left us. rip...")
	}
})

//aaa i keep having errors with this
bot.login(require("./token.json"))
