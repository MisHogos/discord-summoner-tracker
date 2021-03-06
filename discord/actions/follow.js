const { addJob: addObserverQueueJob } = require("../../queues/addObserverQueue");
const { addJob: addRemoveObserverQueueJob } = require("../../queues/removeObserverQueue");
const { addJob: addTrackSummonerJob } = require("../../queues/trackSummonerQueue");

async function startFollowCommand(interaction) {
  await interaction.reply(`Started tracking the progress of ${interaction.options.data[0].value}`);
  addObserverQueueJob({
    channelId: interaction.channelId,
    summonerName: interaction.options.data[0].value,
  });
}

async function stopFollowCommand(interaction) {
  await interaction.reply(`Stopped tracking the progress of ${interaction.options.data[0].value}`);
  addRemoveObserverQueueJob({
    channelId: interaction.channelId,
    summonerName: interaction.options.data[0].value,
  });
}

async function startFollow(msg) {
  const name = msg.content.replace("!follow_summoner ", "");
  await msg.reply(`Started tracking the progress of ${name}`);
  addObserverQueueJob({ channelId: msg.channelId, summonerName: name });
}

async function stopFollow(msg) {
  const name = msg.content.replace("!unfollow_summoner ", "");
  await msg.reply(`Stopped tracking the progress of ${name}`);
  addRemoveObserverQueueJob({ channelId: msg.channelId, summonerName: name });
}

async function updateOnce(msg) {
  const name = msg.content.replace("!update_summoner ", "");
  await msg.reply(`Updated the progress of ${name}`);
  addTrackSummonerJob({ summonerName: name, repeat: false });
}

module.exports = {
  startFollowCommand,
  stopFollowCommand,
  startFollow,
  stopFollow,
  updateOnce,
};
