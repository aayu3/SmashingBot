// function to sanitize msgs and return an array of commands and arguments
// returns 0 if the message is not a command
// i.e `!mute @jeff` becomes ['mute', 'jeff'];
const prefix = "!";

function sanitizeCommand(msg) {
    if (!msg.content.startsWith(prefix)) return 0;
    let sanitized = msg.content.replace(prefix,'');
    return sanitized.split(" ");
  }

// function to get a user from the client.users.cache Collection given a mention
function getUserFromMention(mention, client) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

// function to get a user from the client.users.cache Collection given a mention
function getMemberFromMention(msg, client) {
	return msg.mentions.members.first();
}

module.exports = {
    name: 'bonk',
    description : "send user to horny jail",
    execute(msg, client, args) {
      let messageContents = sanitizeCommand(msg);
      if (messageContents[0] == "bonk") {
        if(msg.member.roles.cache.some(r=>["Admin", "Moderator", "Reddit Moderator"].includes(r.name)) ) {
          if (messageContents.length <= 1) {
            msg.reply("Please specify a user to bonk");
          } else {
            let userMentioned = getUserFromMention(messageContents[1], client);
            let memberMentioned = getMemberFromMention(msg, client);
            if (!userMentioned) {
              return msg.reply('Please use a proper mention to bonk');
            } else {
              // using this as a temporary solution until i fix getMemberFromMention
              let hornyRole = msg.guild.roles.cache.find(r => r.name === "Horny");
              let memberRole = msg.guild.roles.cache.find(r => r.name === "Member");
              memberMentioned.roles.add(hornyRole);
              memberMentioned.roles.remove(memberRole);
              msg.reply(userMentioned.toString() + " has been sent to <#818313211538309130>");
              msg.channel.send({files: ["bonk.gif"]});
            }
          }
        } else {
          msg.reply("You do not have sufficient permission to use this command.");
        }
      }
      }
}