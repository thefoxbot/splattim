exports.cmds = function(msg, params, bot) {

    //COMMANDS N HELP N SHIT
    if(msg.content.startsWith("splat help") || msg.content.startsWith("splat commands")) {
        if(params[1] === undefined) {
            msg.channel.sendMessage("Do `splat help [module]` to get all the commands for that specific module!\nModules:\nCore\nDebug\nCommands that aren't categorized:\nsplat profile ((field)) (new value) - See, edit, or view a specific field of your profile.\nsplat timgame - Shows a random tim game.\nsplat battles [mode] - Starts a new Splatoon battle.\nIf you don't like doing commands to get commands, a website is currently in development: http://splattim.rf.gd/ (you cant use it yet though!)")
        } else {
            switch(params[1].toLowerCase()) {
                case "core":
                    msg.channel.sendMessage("Commands for module **Core**:\nsplat ping - Checks the api and auth latency.\nsplat invite - Shows an invite.\nsplat [help|commands] (module) - Shows the list of commands.")
                break;
                case "debug":
                if(msg.author.id !== "209765088196821012") {
                    msg.channel.sendMessage("Commands for module **Debug** are owner-only. Sorry!")
                } else {
                    msg.channel.sendMessage("Commands for module **Debug**:\nsplat clearcooldown (userid) - clears a user's battle cooldown\nsplat debug [code] - evals the code\nsplat updatestats - update all the stats and save all stats")
                }
                break;
            }
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
        msg.reply("https://discordapp.com/oauth2/authorize?client_id=436605783380328468&scope=bot&permissions=268438528")
    }
}