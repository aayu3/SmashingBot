// function to sanitize msgs and return an array of commands and arguments
// returns 0 if the message is not a command
// i.e `!mute @jeff` becomes ['mute', 'jeff'];
const prefix = "!";

function sanitizeCommand(msg) {
    if (!msg.content.startsWith(prefix)) return 0;
    let sanitized = msg.content.replace(prefix,'');
    return sanitized.split(" ");
  }

module.exports = {
    name: 'setName',
    description : "Set bot name",
    execute(msg, client, args) {
      let messageContents = sanitizeCommand(msg);
      if (messageContents[0] == "setName") {
        if(msg.member.roles.cache.some(r=>["Admin", "Moderator", "Reddit Moderator"].includes(r.name)) ) {
          messageContents.shift();
          let name = messageContents.join(' ');
          client.user.setUsername(name);
          msg.reply("Name has been set to: " + name);
        } else {
          msg.reply("You do not have sufficient permission to use this command.")
        }
      }
    }
}