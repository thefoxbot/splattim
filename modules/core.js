exports.cmds = function(msg, params, bot) {

    //COMMANDS N HELP N SHIT
    if(msg.content.startsWith("splat help") || msg.content.startsWith("splat commands")) {
            switch(params[1]) {
                case "core":
                    msg.channel.send("Commands for module **Core**:\nsplat ping - Checks the api and auth latency.\nsplat invite - Shows an invite.\nsplat [help|commands] (module) - Shows the list of commands.")
                break;
                case "debug":
                if(msg.author.id !== "209765088196821012") {
                    msg.channel.send("Commands for module **Debug** are owner-only. Sorry!")
                } else {
                    msg.channel.send("Commands for module **Debug**:\nsplat clearcooldown (userid) - clears a user's battle cooldown\nsplat debug [code] - evals the code\nsplat updatestats - update all the stats and save all stats\nsplat exec - execute a bash command")
                }
                break;
                case "fun":
                    msg.channel.send("Commands for module **Fun**:\nsplat inspirobot - get a bot-generated inspiring quote. (fetched from http://inspirobot.me/)\nsplat battle - indev splatoon-alike TOTALLY not RNG-based battles.\nsplat vclips - play a woomy in vc and annoy your friends with 1 2 oatmeal")
                break;
                case "utilities":
                    msg.channel.send("Commands for module **Utilities**:\nsplat color - TIC-only color command to choose whatever color role you like.\nsplat profile [field] [value] - let tim remember your stats for later. if field is undefined, shows your whole profile. if value is undefined, shows the field given. if value is given, sets that field to that value.\nsplat purge (n) - delete the last N amount of messages from the channel")
                //color profile purge
                break;
                default:
                msg.channel.send("Do `splat help [module]` to get all the commands for that specific module!\nModules:\n- Core\n- Debug\n- Fun\n- Utilities")
                break;
            }
    }

    //AAAAAAAAAAAAAA PING
    if(msg.content==="splat ping") {
        let date1 = Date.now()
        msg.channel.sendMessage("he does it!\nauth latency: "+bot.ping+"ms\ncalculating message send latency...").then(m => {
            m.edit("he does it!\nauth latency: "+bot.ping+"ms\nmessage send latency: "+(Date.now()-date1)+"ms")
        })
    }

    //ONE TWO THREE FUCKING INVITE
    if(msg.content==="splat invite") {
        msg.reply("https://discordapp.com/oauth2/authorize?client_id=436605783380328468&scope=bot&permissions=268438528\nNote: you must have **Server Management** permission in order to invite a bot to a server.")
    }
}