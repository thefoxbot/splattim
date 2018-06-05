exports.cmds = function(msg, params, bot, profiles, Object) {
//VARIABITCHES
const fs = require("fs")
vcReady = true
var opus = require('opusscript')

//FUNCTIONS
function makeProfile(id) {
    //i copied this from a site:tm:
    const getCircularReplacer = () => {
        const seen = new WeakSet;
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };
//copied end
profiles[id] = {"name":bot.users.get(id).username,"ranks":{"dontbecircular":true}}
fs.writeFile("./profiles.json", JSON.stringify(profiles, getCircularReplacer()))
}

function makeChallengeProfile(id) {
    //i copied this from a site:tm:
    const getCircularReplacer = () => {
        const seen = new WeakSet;
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };
//copied end
profiles[id] = {"name":bot.users.get(id).username,"points":0}
fs.writeFile("./profiles.json", JSON.stringify(profiles, getCircularReplacer()))
}

function makeBattleProfile(id) {
    //i copied this from a site:tm:
    const getCircularReplacer = () => {
        const seen = new WeakSet;
        return (key, value) => {
          if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
              return;
            }
            seen.add(value);
          }
          return value;
        };
      };
//copied end
//username, level, ranked
profiles.battles[id] = {"username":bot.users.get(id).username,"level":1,"xp":0,"ranked":"N/A","coins":0,"id":id}
fs.writeFile("./profiles.json", JSON.stringify(profiles, getCircularReplacer()))
}

function getTimeLeft(timeout) {
    return Math.abs(Math.ceil((process.uptime()*1000-timeout._idleStart-timeout._idleTimeout)/1000))
}

function updateProfiles() {
        //i copied this from a site:tm:
        const getCircularReplacer = () => {
            const seen = new WeakSet;
            return (key, value) => {
              if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                  return;
                }
                seen.add(value);
              }
              return value;
            };
          };
    //copied end
    fs.writeFile("./profiles.json", JSON.stringify(profiles))
}

function undeString(stringthing) {
    if(stringthing === undefined) {
        return "None (yet)"
    } else {
        return stringthing
    }
}

function cooldownStop(id) {
    profiles.battles[id]["onCooldown"] = false
    profiles.battles[id]["cooldown"] = null
}

splattimgames = [
    {
      "name": "Splat Tim Party",
      "description": "Do it with your friends!\nPlay in this minigame-based board game with friends as Splat Tim and his friends!",
      "file": "./splattimposter.png"
    },
    {
      "name": "Splat Tim Paradise",
      "description": "This Splat Tim game is all about relaxing, but wait.. There's trouble at the beach! Splat Tim now has to save the beach from being destroyed!",
      "file": "./splattimposter2.png"
    },
    {
      "name": "Splat Tim Reloaded",
      "description": "The Splat Tim trilogy, but revisited, with new content everywhere and better graphics! It's time for Splat Tim to do it again!",
      "file": "./splattimposter3.png"
    },
    {
      "name": "Splat Tim",
      "description": "He does it! Splat Tim is the freshest kid-squid in town, ready for adventure! It's time for his adventure to begin in a far-away land from Inkopolis.",
      "file": "./splattimposter4.png"
    },
    {
      "name": "Splat Tim in Space",
      "description": "He does it in space! Splat Tim has decided to leave Earth for a space adventure, saving a far-away planet from destruction!",
      "file": "./splattimposter5.png"
    }
  ]

    //TIM GAMES
    if(msg.content==="splat timgame") {
        var splattimgame = splattimgames[Math.floor(Math.random() * splattimgames.length)]
        msg.channel.send("**"+splattimgame.name+"**\n"+splattimgame.description, {files: [{
            attachment: splattimgame.file,
            name: 'hedoesit.png'
         }]})
    }

    //WOOMY
    /*if(msg.content === "splat woomy" && vcReady) {
        if(msg.member.voiceChannel === undefined) {
            msg.reply("you aren't in a vc!")
        } else {
            vcReady = false
            var voiceChannel = msg.member.voiceChannel
            voiceChannel.join().then(connection => {
                const dispatcher = connection.playFile('./woomy.mp3')
                dispatcher.on("end", end => {
                    voiceChannel.leave()
                    vcReady = true
                })
            }).catch(err => console.log(err))
        }
    }
    */

    //voiceclips
    if(msg.content.startsWith("splat vclips")) {
        if(params[1] === undefined) {
            msg.channel.send("Current available voiceclips:\n```\nblj\nwoomy\nngyes\nbup\noatmeal\n```\nUse a voiceclip with `splat vclips [name]`")
        } else {
            switch(params[1]) {
                case "blj":
                var file = './blj.mp3'
                break;
                case "woomy":
                var file = './woomy.mp3'
                break;
                case "ngyes":
                var file = './ngyes.mp3'
                break;
                case "bup":
                var file = './bup.mp3'
                break;
                case "oatmeal":
                var file = './oatmeal.mp3'
                break;
                default:
                var file = null
            }
            if(file === null) {
                msg.channel.send("That's not an available voice clip!")
            } else {
                if(vcReady) {
                    vcReady = false
                    var voiceChannel = msg.member.voiceChannel
                    voiceChannel.join().then(connection => {
                        const dispatcher = connection.playFile(file)
                        dispatcher.on("end", end => {
                            voiceChannel.leave()
                            vcReady = true
                        })
                    }).catch(err => console.log(err))
                }
            }
        }
    }

    //purge
    if(msg.content.startsWith("splat purge ")) {
        if (msg.channel.permissionsFor(msg.author).hasPermission("MANAGE_MESSAGES")) {
            if(isNaN(Number(params[1]))) {msg.channel.sendMessage(params[1]+" is not a number, BOI")} else {
                msg.channel.bulkDelete(Number(params[1])).then(function(){
                    msg.channel.createWebhook("LOOKS LIKE ITS SWEEPING TIME", "https://vignette.wikia.nocookie.net/baldis-basics-in-education-and-learning/images/2/26/Broom.png/revision/latest?cb=20180517012544", "webhook for purge announcement -- messages purged by "+msg.author.username+"#"+msg.author.discriminator)
                    .then(function(webhook) {webhook.send("GOTTA SWEEP SWEEP SWEEP")
                    .then(function(){webhook.delete("success; deleting webhook -- messages purged by "+msg.author.username+"#"+msg.author.discriminator);})})
                })
            }
        } else {
            msg.channel.sendMessage("you dont have the permissions to <:purge:436592645502926848>, kthxbye")
        }
    }

    //PROFILES N SHIT
    if(msg.content.startsWith("splat profile")) {
        if(profiles[msg.author.id] === undefined) {
            makeProfile(msg.author.id)
            msg.channel.send("Made new account!")
        }
        if(params[1] === undefined && params[2] === undefined) {
            msg.channel.send('Profile',{embed: {
                  thumbnail: {
                       url: 'attachment://avatar.jpg'
                    },
                    title: "Profile for "+profiles[msg.author.id].name,
                    description: "Do splat profile [field (without spaces)] [value] to define one of these!",
                    fields: [
                        {
                            name: 'Bio',
                            value: undeString(profiles[msg.author.id].bio)
                        },
                        {
                            name: 'Level',
                            value: undeString(profiles[msg.author.id].level)
                        },
                        {
                            name: 'Main Weapon',
                            value: undeString(profiles[msg.author.id].mainweapon)
                        },
                        {
                            name:'Switch FC',
                            value: undeString(profiles[msg.author.id].friendcode)
                        },

                        {
                            name:'Rainmaker',
                            value: undeString(profiles[msg.author.id].ranks.rainmaker),
                            inline: true
                        },
                        {
                            name:'Clam Blitz',
                            value: undeString(profiles[msg.author.id].ranks.clamblitz),
                            inline: true
                        },
                        {
                            name:'Tower Control',
                            value: undeString(profiles[msg.author.id].ranks.towercontrol),
                            inline: true
                        },
                        {
                            name:'Splat Zones',
                            value: undeString(profiles[msg.author.id].ranks.splatzones),
                            inline: true
                        },
                        {
                            name:'Salmon Run Rank',
                            value: undeString(profiles[msg.author.id].salmonrun)
                        },
                        {
                          name:'Splatoon 2 Play Time',
                          value: undeString(profiles[msg.author.id].playtime)
                        }
                    ]
                 },
                 files: [{
                    attachment: msg.author.avatarURL,
                    name: 'avatar.jpg'
                 }]}
                )
        } else if(params[1] !== undefined && params[2] === undefined) {
            var profile = profiles[msg.author.id]
            switch(params[1].toLowerCase()) {
                case "level":
                msg.channel.send(profile.name+" is level "+undeString(profile.level))
                break;
                case "mainweapon":
                msg.channel.send(profile.name+"'s main weapon is "+undeString(profile.mainweapon))
                break;
                case "switchfc":
                msg.channel.send(profile.name+"'s Switch friend code is "+undeString(profile.friendcode))
                break;
                case "rainmaker":
                if(profile.ranks.rainmaker === "|") {
                    msg.channel.send(profile.name+" decided to instead use the ranking fields for loss.")
                } else {
                    msg.channel.send(profile.name+"'s rank in Rainmaker is "+undeString(profile.ranks.rainmaker))
                }
                break;
                case "clamblitz":
                if(profile.ranks.clamblitz === "| |") {
                    msg.channel.send(profile.name+" decided to instead use the ranking fields for loss.")
                } else {
                    msg.channel.send(profile.name+"'s rank in Clam Blitz is "+undeString(profile.ranks.clamblitz))
                }
                break;
                case "splatzones":
                if(profile.ranks.splatzones === "| _") {
                    msg.channel.send(profile.name+" decided to instead use the ranking fields for loss.")
                } else {
                    msg.channel.send(profile.name+"'s rank in Splat Zones is "+undeString(profile.ranks.splatzones))
                }
                break;
                case "towercontrol":
                if(profile.ranks.towercontrol === "| |") {
                    msg.channel.send(profile.name+" decided to instead use the ranking fields for loss.")
                } else {
                    msg.channel.send(profile.name+"'s rank in Tower Control is "+undeString(profile.ranks.towercontrol))
                }
                break;
                case "bio":
                msg.channel.send(profile.name+"'s bio is: ```\n"+undeString(profile.bio)+"\n```")
                break;
                case "splatoon2playtime":
                msg.channel.send(profile.name+"'s Splatoon 2 play time is ```\n"+undeString(profile.playtime)+"\n```")
                break;
                case "salmonrunrank":
                msg.channel.send(profile.name+"'s Salmon Run rank is ```\n"+undeString(profile.salmonrun)+"\n```")
                break;
                case "loss":
                msg.reply("found")
                profiles[msg.author.id].ranks["rainmaker"] = "|"
                profiles[msg.author.id].ranks["clamblitz"] = "| |"
                profiles[msg.author.id].ranks["splatzones"] = "| _"
                profiles[msg.author.id].ranks["towercontrol"] = "| |"
                profiles[msg.author.id].bio = "i like loss"
                updateProfiles()
                break;
                default:
                msg.reply("That isn't a valid field...")
            }
        } else {

            var rankpattern = new RegExp("([SABCX])([+-\s])?([\d]+|[\s])?")
            var levelpattern = new RegExp("([*]{0,5})([1-9](\d){0,1})")
            var salmonpattern = new RegExp("(Intern|Apprentice|Part-Timer|Go-Getter|Overachiever|Profreshional(\d00)?|Hazard)")
            var fcpattern = new RegExp("(SW-)?(\d{4}-){2}\d{4}")
            var playtimepattern = new RegExp("\d+\s?([hH](our(s)?)?)?")

            var replyProfile = true
            switch(params[1].toLowerCase()) {
                case "level":
                if(levelpattern.test(params[2])) {
                    profiles[msg.author.id]["level"] = params[2]
                } else {
                    msg.reply("Not a level...")
                }
                break;
                case "mainweapon":
                profiles[msg.author.id]["mainweapon"] = params[2]
                break;
                case "switchfc":
                if(/*fcpattern.test(params[2])*/true) {
                    profiles[msg.author.id]["friendcode"] = params[2]
                } else {
                    msg.reply("Not a valid FC...")
                }
                break;
                case "rainmaker":
                if(rankpattern.test(params[2])) {
                    profiles[msg.author.id].ranks["rainmaker"] = params[2]
                } else {
                    msg.reply("Not a rank...")
                }
                break;
                case "clamblitz":
                if(rankpattern.test(params[2])) {
                    profiles[msg.author.id].ranks["clamblitz"] = params[2]
                } else {
                    msg.reply("Not a rank...")
                }
                break;
                case "splatzones":
                if(rankpattern.test(params[2])) {
                    profiles[msg.author.id].ranks["splatzones"] = params[2]
                } else {
                    msg.reply("Not a rank...")
                }
                break;
                case "towercontrol":
                if(rankpattern.test(params[2])) {
                    profiles[msg.author.id].ranks["towercontrol"] = params[2]
                } else {
                    msg.reply("Not a rank...")
                }
                break;
                case "bio":
                profiles[msg.author.id]["bio"] = msg.content.replace("splat profile bio ","")
                break;
                case "splatoon2playtime":
                if(/*playtimepattern.test(params[2])*/true) {
                    profiles[msg.author.id]["playtime"] = params[2]
                } else {
                    msg.reply("Not valid playtime...")
                }
                break;
                case "salmonrunrank":
                if(salmonpattern.test(params[2])) {
                    profiles[msg.author.id]["salmonrun"] = params[2]
                } else {
                    msg.reply("Not a rank...")
                }
                break;
                default:
                msg.reply("That isn't a valid field... Make sure to type it without spaces!")
                var replyProfile = false
            }
            if(replyProfile) {
            updateProfiles()
            msg.channel.send('Here\'s your new profile!',{embed: {
                thumbnail: {
                     url: 'attachment://avatar.jpg'
                  },
                  title: "Profile for "+profiles[msg.author.id].name,
                  description: "Updated!",
                  fields: [
                    {
                        name: 'Bio',
                        value: undeString(profiles[msg.author.id].bio)
                    },
                    {
                          name: 'Level',
                          value: undeString(profiles[msg.author.id].level)
                      },
                      {
                          name:'Main Weapon',
                          value: undeString(profiles[msg.author.id].mainweapon)
                      },
                      {
                          name:'Switch FC',
                          value: undeString(profiles[msg.author.id].friendcode)
                      },

                      {
                          name:'Rainmaker',
                          value: undeString(profiles[msg.author.id].ranks.rainmaker),
                          inline: true
                      },
                      {
                          name:'Clam Blitz',
                          value: undeString(profiles[msg.author.id].ranks.clamblitz),
                          inline: true
                      },
                      {
                          name:'Tower Control',
                          value: undeString(profiles[msg.author.id].ranks.towercontrol),
                          inline: true
                      },
                      {
                          name:'Splat Zones',
                          value: undeString(profiles[msg.author.id].ranks.splatzones),
                          inline: true
                      },
                      {
                          name:'Salmon Run Rank',
                          value: undeString(profiles[msg.author.id].salmonrun)
                      },
                      {
                        name:'Splatoon 2 Play Time',
                        value: undeString(profiles[msg.author.id].playtime)
                      }
                  ]
               },
               files: [{
                  attachment: msg.author.avatarURL,
                  name: 'avatar.jpg'
               }]}
              )
            }
        }
    }

    if(msg.guild !== null) {
        if(msg.guild.id === "433670865817829387") {
    if(msg.content.startsWith("splat color")) {
        if(params[1] === undefined) {
            msg.channel.sendMessage("Usage:\n`splat color (color)`\nList of colors currently avaivable: https://cdn.discordapp.com/attachments/433670866304237579/436247145692135434/Screen_Shot_2018-04-18_at_19.30.59.png\n**EXTRA COLOR UNTILL 13TH OF MAY:** Blurple, to celebrate Discord's Birthday!\nRemove colors with `splat color remove`\n**Note: type colors without spaces. Tim does not know what a space is.**") 
        } else {
            if(msg.member.colorRole === null || params[1].toLowerCase() === "remove") {
            switch(params[1].toLowerCase()) {
                case "pink":
                msg.member.addRole('436230047355895808')
                msg.reply("Success!")
                break;
                case "orange":
                msg.member.addRole('436230156164661248')
                msg.reply("Success!")
                break;
                case "canaryyellow":
                msg.member.addRole('436230222250115072')
                msg.reply("Success!")
                break;
                case "limegreen":
                msg.member.addRole('436230302256463873')
                msg.reply("Success!")
                break;
                case "emeraldgreen":
                msg.member.addRole('436230360188321803')
                msg.reply("Success!")
                break;
                case "skyblue":
                msg.member.addRole('436230591185289242')
                msg.reply("Success!")
                break;
                case "blue":
                msg.member.addRole('436230747603468288')
                msg.reply("Success!")
                break;
                case "violet":
                msg.member.addRole('436230824510095381')
                msg.reply("Success!")
                break;
                case "bloodorange":
                msg.member.addRole('436230951358562314')
                msg.reply("Success!")
                break;
                case "lemon":
                msg.member.addRole('436231063019454464')
                msg.reply("Success!")
                break;
                case "seafoam":
                msg.member.addRole('436231129389989889')
                msg.reply("Success!")
                break;
                case "greenapple":
                msg.member.addRole('436231205537579018')
                msg.reply("Success!")
                break;
                case "ocean":
                msg.member.addRole('436231330431238165')
                msg.reply("Success!")
                break;
                case "cerulean":
                msg.member.addRole('436231463348994058')
                msg.reply("Success!")
                break;
                case "indigo":
                msg.member.addRole('436231570010013736')
                msg.reply("Success!")
                break;
                case "neonpink":
                msg.member.addRole('436231651165470720')
                msg.reply("Success!")
                break;
                case "neongreen":
                msg.member.addRole('436231723588517889')
                msg.reply("Success!")
                break;
                case "mulberry":
                msg.member.addRole('436231996386181123')
                msg.reply("Success!")
                break;
                case "blurple": 
                msg.member.addRole('442759219591249931') 
                msg.reply("Success!") 
                break;
                case "remove":
                msg.member.removeRole(msg.member.colorRole.id)
                msg.reply("Removed color role")
                break;
                default:
                msg.reply("Color role not found. Make sure that you type it without spaces!")
                break;
            }
        } else {
            msg.reply("You already have a color role! Remove it with `splat color remove`")
        }

/*
Pink - 436230047355895808
Orange - 436230156164661248
Canary Yellow - 436230222250115072
Lime Green - 436230302256463873
Emerald Green - 436230360188321803
Sky Blue - 436230591185289242
Blue - 436230747603468288
Violet - 436230824510095381
Blood Orange - 436230951358562314
Lemon - 436231063019454464
Seafoam - 436231129389989889
Green Apple - 436231205537579018
Ocean - 436231330431238165
Cerulean - 436231463348994058
Indigo - 436231570010013736
Neon Pink - 436231651165470720
Neon Green - 436231723588517889
Mulberry - 436231996386181123
*/
        }
    }
}}

//SHITFESTS AKA BATTLES
if(msg.content.startsWith("splat battle")) {
    if(profiles.battles[msg.author.id] === undefined) {
        makeBattleProfile(msg.author.id)
        msg.channel.send("Made new battle account!")
    }
    if(params[1] === undefined) {
        var dashAmount = (profiles.battles[msg.author.id].username+"'s Stats").length
        var dashString = ("-").repeat(dashAmount)
        msg.channel.send("```md\n< Turf War >\n# splat battle tw\n  The best mode for beginners. Start here!\n< Ranked Battles > \n# splat battle rk\n  Only avaivable at Level 10+. And is, well, ranked battles.\n\n#"+profiles.battles[msg.author.id].username+"'s Stats\n Level: <"+profiles.battles[msg.author.id].level+">\n Coins: <"+profiles.battles[msg.author.id].coins+">\n Rank: <"+profiles.battles[msg.author.id].ranked+">\n#"+dashString+"\n< he does it! SplatTimBattles 0.2 >```")
    } else {
        if(profiles.battles[msg.author.id].onCooldown) {
            msg.reply("⏱ Wait **"+getTimeLeft(profiles.battles[msg.author.id].cooldownTimeout)+"s** before returning to battle again. ")
        } else {
        switch(params[1]) {
            case "tw":

            profiles.battles[msg.author.id]["onCooldown"] = true
            profiles.battles[msg.author.id]["cooldownTimeout"] = setTimeout(function() {cooldownStop(msg.author.id)},180000)

            if(Math.random()>0.5) {
                var xp = Math.round((Math.random()*400)+1000)
                var coins = Math.floor(Math.random()*xp*0.9+1000)
                if((profiles.battles[msg.author.id].xp+xp)>(profiles.battles[msg.author.id].level*3000)) {
                    var newxp = (profiles.battles[msg.author.id].xp+xp)-(profiles.battles[msg.author.id].level*3000)
                    var newlevel = profiles.battles[msg.author.id].level+1
                    var newlevelachievedstring = "[Levelled Up!]"
                } else {
                    var newxp = profiles.battles[msg.author.id].xp+xp
                    var newlevel = profiles.battles[msg.author.id].level
                    var newlevelachievedstring = ""
                }
                var newcoins = profiles.battles[msg.author.id].coins+coins
                var overallinked = Math.round((Math.random()*9)+90)
                var percentage1 = Math.round((Math.random()*80)+10)
                var percentage2 = overallinked-percentage1

                var profile = profiles.battles[msg.author.id]
                profile["xp"] = newxp
                profile["level"] = newlevel
                profile["coins"] = newcoins
                profiles.battles[msg.author.id] = profile

                if(percentage1>percentage2) {
                    var formattedString="Good Guys: "+percentage1+"%\nBad Guys: "+percentage2+"%"
                } else {
                    var formattedString="Good Guys: "+percentage2+"%\nBad Guys: "+percentage1+"%"
                }
                updateProfiles()
                msg.channel.send("Battle Results",{embed: {
                    title: "Turf War",
                    description: "Please wait 3 minutes before starting another battle.",
                    fields: [
                        {
                            name: "Victory!",
                            value: "Level "+newlevel+" "+newxp+"xp/"+newlevel*3000+"xp (+"+xp+"xp) "+newlevelachievedstring+"\n"+newcoins+"c (+"+coins+"c)"
                        },
                        {
                            name: "Results",
                            value: formattedString
                        }
                    ]
                }})
            } else {
                var xp = Math.round((Math.random()*300))
                if((profiles.battles[msg.author.id].xp+xp)>(profiles.battles[msg.author.id].level*3000)) {
                    var newxp = (profiles.battles[msg.author.id].xp+xp)-(profiles.battles[msg.author.id].level*3000)
                    var newlevel = profiles.battles[msg.author.id].level+1
                    var newlevelachievedstring = "[Levelled Up!]"
                } else {
                    var newxp = profiles.battles[msg.author.id].xp+xp
                    var newlevel = profiles.battles[msg.author.id].level
                    var newlevelachievedstring = ""
                }

                var profile = profiles.battles[msg.author.id]
                profile["xp"] = newxp
                profile["level"] = newlevel

                var overallinked = Math.round((Math.random()*9)+90)
                var percentage1 = Math.round((Math.random()*80)+10)
                var percentage2 = overallinked-percentage1
                if(percentage2>percentage1) {
                    var formattedString="Good Guys: "+percentage1+"%\nBad Guys: "+percentage2+"%"
                } else {
                    var formattedString="Good Guys: "+percentage2+"%\nBad Guys: "+percentage1+"%"
                }
                msg.channel.send("Battle Results",{embed: {
                    title: "Turf War",
                    description: "Please wait 3 minutes before starting another battle.",
                    fields: [
                        {
                            name: "Loss...",
                            value: "Level "+newlevel+" "+newxp+"xp/"+newlevel*3000+"xp (+"+xp+"xp) "+newlevelachievedstring+"\n"+profiles.battles[msg.author.id].coins+"c"
                        },
                        {
                            name: "Results",
                            value: formattedString
                        }
                    ]
                }})
            }
            break;
            case "rk":
            if(profiles.battles[msg.author.id].level >= 10) {
            profiles.battles[msg.author.id]["onCooldown"] = true
            profiles.battles[msg.author.id]["cooldownTimeout"] = setTimeout(function() {cooldownStop(msg.author.id)},240000)

            if(Math.random()>0.5) {
                var xp = Math.round((Math.random()*600)+1000)
                var coins = Math.floor(Math.random()*xp*0.9+1000)
                if((profiles.battles[msg.author.id].xp+xp)>(profiles.battles[msg.author.id].level*3000)) {
                    var newxp = (profiles.battles[msg.author.id].xp+xp)-(profiles.battles[msg.author.id].level*3000)
                    var newlevel = profiles.battles[msg.author.id].level+1
                    var newlevelachievedstring = "[Levelled Up!]"
                } else {
                    var newxp = profiles.battles[msg.author.id].xp+xp
                    var newlevel = profiles.battles[msg.author.id].level
                    var newlevelachievedstring = ""
                }
                var newcoins = profiles.battles[msg.author.id].coins+coins
                var overallinked = Math.round((Math.random()*9)+90)
                var percentage1 = Math.round((Math.random()*80)+10)
                var percentage2 = overallinked-percentage1

                var profile = profiles.battles[msg.author.id]
                profile["xp"] = newxp
                profile["level"] = newlevel
                profile["coins"] = newcoins
                profiles.battles[msg.author.id] = profile

                if(percentage1>percentage2) {
                    var formattedString="Good Guys: "+percentage1+"%\nBad Guys: "+percentage2+"%"
                } else {
                    var formattedString="Good Guys: "+percentage2+"%\nBad Guys: "+percentage1+"%"
                }
                updateProfiles()
                msg.channel.send("Battle Results",{embed: {
                    title: "Ranked Battle",
                    description: "Please wait 4 minutes before starting another battle.",
                    fields: [
                        {
                            name: "Victory!",
                            value: "Level "+newlevel+" "+newxp+"xp/"+newlevel*3000+"xp (+"+xp+"xp) "+newlevelachievedstring+"\n"+newcoins+" (+"+coins+")"
                        },
                        {
                            name: "Results",
                            value: formattedString
                        }
                    ]
                }})
            } else {
                var xp = Math.round((Math.random()*500))
                if((profiles.battles[msg.author.id].xp+xp)>(profiles.battles[msg.author.id].level*3000)) {
                    var newxp = (profiles.battles[msg.author.id].xp+xp)-(profiles.battles[msg.author.id].level*3000)
                    var newlevel = profiles.battles[msg.author.id].level+1
                    var newlevelachievedstring = "[Levelled Up!]"
                } else {
                    var newxp = profiles.battles[msg.author.id].xp+xp
                    var newlevel = profiles.battles[msg.author.id].level
                    var newlevelachievedstring = ""
                }

                var profile = profiles.battles[msg.author.id]
                profile["xp"] = newxp
                profile["level"] = newlevel

                var overallinked = Math.round((Math.random()*9)+90)
                var percentage1 = Math.round((Math.random()*80)+10)
                var percentage2 = overallinked-percentage1
                if(percentage2>percentage1) {
                    var formattedString="Good Guys: "+percentage1+"%\nBad Guys: "+percentage2+"%"
                } else {
                    var formattedString="Good Guys: "+percentage2+"%\nBad Guys: "+percentage1+"%"
                }
                msg.channel.send("Battle Results",{embed: {
                    title: "Ranked Battle",
                    description: "Please wait 4 minutes before starting another battle.",
                    fields: [
                        {
                            name: "Loss...",
                            value: "Level "+newlevel+" "+newxp+"xp/"+newlevel*3000+"xp (+"+xp+"xp) "+newlevelachievedstring
                        },
                        {
                            name: "Results",
                            value: formattedString
                        }
                    ]
                }})
            }
        } else {
            msg.channel.sendMessage("you arent level 10 yet! you cant do ranked yet.")
        }
            break;
            default:
            msg.channel.send("Invalid syntax!!\n```md\n< splat battle tw >\nTurf War, the best mode for beginners. Start here!\n< splat battle rk >\nRanked, only avaivable at Level 10+. And is, well, ranked battles.\n#"+profiles.battles[msg.author.id].username+"'s Stats\nLevel: "+profiles.battles[msg.author.id].level+"\nCoins: "+profiles.battles[msg.author.id].coins+"\nRank:"+profiles.battles[msg.author.id].ranked+"\n< he does it! SplatTimBattles 0.2 >```")
            break;
        }
    }
}
}

if(profiles["points"] === undefined) {
    profiles["points"] = {}
}

//CHALLENGE POINTS
if(msg.content.startsWith("splat point")) {

    if(profiles["points"][params[1]] === undefined) {
        profiles["points"][params[1]] = {}
        profiles["points"][params[1]]["points"] = 1
        profiles["points"][params[1]]["username"] = bot.users.get(params[1]).username
    }

    if(params[0].endsWith("+")) {
        profiles["points"][params[1]].points++
        msg.channel.sendMessage("added a point to the user!")
    } else {
        profiles["points"][params[1]]--
        msg.channel.sendMessage("deleted a point from the user!")
    }

    updateProfiles()
}

/*if(msg.content.startsWith("splat points")) {
    msg.channel.sendMessage(Object.values(profiles.points).map(u => "\n"+u.username+" - "+u.points))
}*/

//UPDATE THOSE BITCHES
global.profiles = profiles
}