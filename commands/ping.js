// Simple ping command for discord.js
const ping = (client, message, args) => {
  // Return latency
  message.channel.send(
    `Pong! Latency is ${message.createdTimestamp - message.createdTimestamp}ms.`
  );
};

module.exports = ping;
