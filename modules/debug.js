exports.cmds = function(msg, params, bot, profiles) {
//THIS ASS FUNCTION
function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
//THIS TOO
function cooldownStop(id) {
    profiles.battles[id]["onCooldown"] = false
    profiles.battles[id]["cooldown"] = null
}

//CLEARCOOLDOWN

if(msg.content === "splat clearcooldown") {
    if (msg.author.id === "209765088196821012" || msg.author.id === "239493437089513474") {
        cooldownStop(msg.author.id)
        msg.reply("ended cooldown for "+profiles.battles[msg.author.id].username)
    }
}

if(msg.content.startsWith("splat clearcooldown ")) {
    if (msg.author.id === "209765088196821012" || msg.author.id === "239493437089513474") {
        if(profiles.battles[params[1]] !== undefined) {
            cooldownStop(params[1])
            msg.reply("ended cooldown for "+profiles.battles[params[1]].username)
        } else {
            msg.reply("the user doesnt have a battle profile though")
        }
    }
}

}