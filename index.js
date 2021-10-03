// Imports
const fs = require("fs");

const dotenv = require("dotenv");
const { Client, Collection, Intents } = require("discord.js");

const { PREFIX } = require("./config.json");
const chalk = require("chalk");

// Configure dotenv
dotenv.config();

// Initialize the client
const client = new Client({
  disableEveryone: true,
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  allowedMentions: {
    parse: ["users"],
  },
});
client.commands = new Collection();

// Promisify readdir
const readdir = (path) =>
  new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });

// Function for initialization
const init = async () => {
  // Load commands
  const commandFiles = await readdir("./commands/");

  // Log it
  console.log(chalk.yellow`Loading ${commandFiles.length} commands.`);

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
  }

  // Load events
  const evtFiles = fs.readdirSync("./events/");

  // Log it
  console.log(chalk.yellow`Loading ${evtFiles.length} events.`);

  // Loop through the events and load them
  for (const file of evtFiles) {
    const eventName = file.split(".")[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  }

  // Login
  client.login(process.env.TOKEN);
};

// Initialize and handle events
init();

client
  .on("disconnect", () => console.log("Bot is disconnecting"))
  .on("reconnecting", () => console.log("Bot is reconnecting"))
  .on("error", (e) => console.log(e))
  .on("warn", (info) => console.log(info));

// if there is an unhandledRejection, log them
process.on("unhandledRejection", (err) => {
  console.error(err);
});
