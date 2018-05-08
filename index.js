const Discord = require("discord.js")
const bot = new Discord.Client()
const fs = require('fs');

const modules = require('./modules/index.js')

const profiles = require("./profiles.json")

const {app, BrowserWindow} = require('electron')
  const path = require('path')
  const url = require('url')
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let loadingwin
  let appwin
  
  function createWindow () {
    // Create the browser window.
    appwin = new BrowserWindow({width: 290, height: 1000})
    loadingwin = new BrowserWindow({width: 174, height: 100, frame: false})
    
    loadingwin.show()
    console.log("created windows")
    appwin.hide()
  
    // and load the index.html of the app.
    loadingwin.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))
    console.log("yeah its suppoused to happen")
setInterval(checkEval, 200)
  
    // Emitted when the window is closed.
    loadingwin.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      loadingwin = null
    })
    appwin.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        appwin = null
        bot.destroy()
      })
  }
  
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (appwin === null) {
      createWindow()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.

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

setTimeout(function() {
    if(!bot.ready) {
        console.log("socket doesnt seem to respond..")
        errwin = new BrowserWindow({width: 500, height: 400})
        loadingwin.close()
        errwin.loadURL(url.format({
            pathname: path.join(__dirname, 'error.html'),
            protocol: 'file:',
            slashes: true
          }))
        errwin.webContents.executeJavaScript("document.getElementById('errorwhat').innerHTML = 'The socket isn\\'t responding! Try restarting the app. (Or get better internet.)'");
    }
}, 5000)

bot.on("ready", async function() {
    console.log("O. K.!")
    bot.user.setPresence({ game: { name: "Splatoon 2 but its banned by Roskomnadzor"} })
    await refreshStats()
    await updateStats(timstats[0],timstats[1],timstats[2])
    console.log("updated everything")
    loadingwin.close()
    appwin.show()
    appwin.loadURL(url.format({
        pathname: path.join(__dirname, 'data.html'),
        protocol: 'file:',
        slashes: true
      }))
    bot["ready"] = true
})

function electronlog(data) {
    appwin.webContents.executeJavaScript("document.getElementById('logs').innerHTML = '"+data+"<br>'+document.getElementById('logs').innerHTML");
}

async function updateStats(timstats0, timstats1, timstats2) {
    timmessages = [,,]
    if(timstats0 !== null) {
        bot.channels.get("436618450585255964").fetchMessage("436884425771319321").then(m => {
            m.edit("**TimStats**\nVersion: "+timstats0.version+"\nPing (may be inaccurate): "+bot.ping+"ms\nProfiles made: "+timstats0.profilessize+"\nBattle accounts made: "+timstats0.battleprofilessize+"\nhe does it!")
            appwin.webContents.executeJavaScript("document.getElementById('timstats').innerHTML = '<h2>TimStats</h2>Version: "+timstats0.version+"<br>Ping (may be inaccurate): "+bot.ping+"ms<br>Profiles made: "+timstats0.profilessize+"<br>Battle accounts made: "+timstats0.battleprofilessize+"'");
        })
    }
    if(timstats1 !== null) {
        bot.channels.get("436618450585255964").fetchMessage("436884469530624010").then(m => {
            m.edit("**Server Stats**\nMembers: "+timstats1.members+"\nhe does it!")
            appwin.webContents.executeJavaScript("document.getElementById('serverstats').innerHTML = '<h2>ServStats</h2>Members: "+timstats1.members+"'");
        })
    }
    if(timstats2 !== null) {
        bot.channels.get("436618450585255964").fetchMessage("436884523813175306").then(m => {
            m.edit("**Splat Stats**\nhe... doesn't do it yet (WIP)")
            appwin.webContents.executeJavaScript("document.getElementById('splatstats').innerHTML = '<h2>SplatStats</h2><center><div class=\"tooltip\">wip<span class=\"tooltiptext\">getting stats from splatoon isnt as easy as it sounds</span></div></center>'");
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

async function refreshStats() {
    timstats = [{version:"ElectronGUI.6 Alpha",profilessize:Object.size(profiles)-1,battleprofilessize:Object.size(profiles.battles)},{members: bot.guilds.get("433670865817829387").members.array().length},{avaivable: false}]
}

function checkEval() {
    appwin.webContents.executeJavaScript("evalCheck()", function(result) {
        if(result[0] === true) {
        console.log("result YES!")
        appwin.webContents.executeJavaScript("evalAvailable = false")
        try {
            appwin.webContents.executeJavaScript("document.getElementById('output').innerText = '"+eval(result[1])+"'")
            console.log("sent change")
            console.log(evaldata)
        } catch(err) {
            appwin.webContents.executeJavaScript("document.getElementById('output').innerText = '"+err+"")
            console.log("sent change except aah my leg hurts")
        }
    } else {
        console.log("result NO!")
    }
    });
}

bot.on("message", msg => {
    let params = msg.content.split(" ").splice(1);

if(msg.content.startsWith("splat ")) {
    electronlog(msg.content)
}



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
refreshStats()
updateStats(timstats[0],timstats[1],timstats[2])
})

bot.on("guildMemberRemove", bember => {
    refreshStats()
    updateStats(timstats[0],timstats[1],timstats[2])
})

//aaa i keep having errors with this
bot.login(require("./token.json"))