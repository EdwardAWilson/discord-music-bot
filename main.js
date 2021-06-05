const Discord = require("discord.js");
require('dotenv').config();
const ytdl = require ('ytdl-core');
const client = new Discord.Client();

const botConnection = {
	channelConnection: null,
}

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
})

client.on("message", msg => {
	if (msg.content.startsWith('!play') && msg.member.voice.channel) {
		let url = msg.content.split(' ', 2)[1];

		if (client.voice.connections.size === 0)
		{
			joinChannel(msg.member.voice.channel);
		}

		try{
			playSong(url).then(r => {
				msg.reply("Aight mate I've added the song for ya.");
			});
		}
		catch(e)
		{
			msg.reply("Sorry mate something's gone wrong.")
		}

	}
	else if(msg.content.startsWith('!play') && !msg.member.voice.channel)
	{
		msg.reply('Please connect to a voice channel to play something!');
	}
})

async function joinChannel(channel)
{
	botConnection.channelConnection = await channel.join()
}

async function playSong(songUrl)
{
	botConnection.channelConnection.play(ytdl(songUrl), { filter: 'audioonly' });
}

client.login(process.env.TOKEN);