require("dotenv").config();
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.commands = new Collection();

function loadCommands(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) loadCommands(full);
    else if (entry.name.endsWith(".js")) {
      const command = require(full);
      client.commands.set(command.data.name, command);
    }
  }
}
loadCommands(path.join(__dirname, "commands"));

for (const file of fs.readdirSync(path.join(__dirname, "events")).filter(f => f.endsWith(".js"))) {
  const event = require(path.join(__dirname, "events", file));
  if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
  else client.on(event.name, (...args) => event.execute(...args, client));
}

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connecté");
  client.login(process.env.TOKEN);
}).catch(console.error);
