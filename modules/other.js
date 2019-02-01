exports.cmds = function(msg, params, bot, profiles, vcReady) {
//VARIABITCHES
const fs = require("fs")
var opus = require('opusscript')
var request = require('request')
var minesweeper = require('minesweeper')
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
fs.writeFile("./profiles.json", JSON.stringify(profiles), function() {return true})
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
fs.writeFile("./profiles.json", JSON.stringify(profiles), function() {return true})
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
fs.writeFile("./profiles.json", JSON.stringify(profiles), function() {return true})
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
    fs.writeFile("./profiles.json", JSON.stringify(profiles), function() {return true})
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

function decimalToNumber(num) {
    switch(num) {
        case 1: return "one"; break;
        case 2: return "two"; break;
        case 3: return "three"; break;
        case 4: return "four"; break;
        case 5: return "five"; break;
        case 6: return "six"; break;
        case 7: return "seven"; break;
        case 8: return "eight"; break;
        case 9: return "nine"; break;
        case 0: return "zero"; break;
    }
}

function convertToSpoilerField(grid) {
    var endmsg = new String()
    grid.forEach(x => {
        x.forEach(y => {
            var tile = ":"+decimalToNumber(y.numAdjacentMines)+":"
            if(y.isMine) tile = ":bomb:"
            endmsg += " ||" + tile + "||"
        })
        endmsg += "\n"
    })
    return endmsg
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
                if(msg.member.voiceChannel === undefined) {
                    msg.reply("you aren't in a vc!")
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
                } else {
                    msg.reply("im already playing a voiceclip!! wait a bit")
                }
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
            msg.channel.sendMessage("Usage:\n`splat color (color)`\nList of colors currently avaivable: https://cdn.discordapp.com/attachments/433670866304237579/436247145692135434/Screen_Shot_2018-04-18_at_19.30.59.png\nRemove colors with `splat color remove`\nThere may or may not be some secret colors.") 
        } else {
            var roles = {
                "orange": "436230156164661248",
                "blue": "436230747603468288",
                "blurple": "442759219591249931",
                "pink": "436230047355895808",
                "neonpink": "436231651165470720",
                "limegreen": "436230302256463873",
                "skyblue": "436230591185289242",
                "emeraldgreen": "436230360188321803",
                "mulberry": "436231996386181123",
                "canaryyellow": "436230222250115072",
                "ocean": "436231330431238165",
                "lemon": "436231063019454464",
                "violet": "436230824510095381",
                "cerulean": "436231463348994058",
                "bloodorange": "436230951358562314",
                "indigo": "436231570010013736",
                "greenapple": "436231205537579018",
                "neongreen": "436231723588517889",
                "seafoam": "436231129389989889",
                "remove": "0"
            }
            var memberColorRoles = []
                    msg.member.roles.array().forEach(val => {
                        if(Object.keys(roles).includes(val.name.toLowerCase().replace(" ",""))) {
                            memberColorRoles.push(val)
                        }
                    })
            if(memberColorRoles.length < 1 || params[1] === 'remove') {
                if(roles[params[1].replace(" ","").toLowerCase()] === undefined) {
                    msg.channel.send("Invalid color!")
                } else if (params[1] === 'remove') {
                    if (memberColorRoles.length > 0) {
                        msg.channel.send("Removing color roles...")
                        memberColorRoles.forEach(cr => {
                            msg.member.removeRole(cr.id)
                            msg.channel.send("Removed "+cr.name)
                        })
                        msg.channel.send("Done.")
                    } else {
                        msg.channel.send("No color roles to remove!")
                    }
                } else {
                    msg.channel.send("Adding "+msg.guild.roles.get(roles[params[1].replace(" ","").toLowerCase()]).name+"...")
                    msg.member.addRole(roles[params[1].replace(" ","").toLowerCase()])
                    msg.channel.send("Done.")
                }
        } else {
            msg.reply("You already have a color role! Remove it with `splat color remove`")
        }
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

if(msg.content === "splat inspirobot") {
    request('http://inspirobot.me/api?generate=true',function(err,response,body) {
        msg.channel.send({files: [body]})
    })
}

if(msg.content === "splat minesweeper") {
    var board = new minesweeper.Board(
        minesweeper.generateMineArray({
            rows: 10,
            cols: 10,
            mines: Math.floor(Math.random()*5+13)
        })
    )
    var grid = board.grid()
    msg.channel.send(convertToSpoilerField(grid))
}

/*if(msg.content.startsWith("splat points")) {
    msg.channel.sendMessage(Object.values(profiles.points).map(u => "\n"+u.username+" - "+u.points))
}*/

//UPDATE THOSE BITCHES
global.profiles = profiles
global.vcReady = vcReady
}