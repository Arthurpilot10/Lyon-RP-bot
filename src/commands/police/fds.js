const { SlashCommandBuilder } = require("discord.js");
const { getUser } = require("../../utils/users");
function format(ms) { const h = Math.floor(ms/3600000); const m = Math.floor((ms%3600000)/60000); return `${h}h${String(m).padStart(2,"0")}`; }
module.exports = {
  data: new SlashCommandBuilder().setName("fds").setDescription("Finir son service"),
  async execute(interaction) {
    const user = await getUser(interaction.user.id);
    if (!user.onDuty || !user.dutyStartedAt) return interaction.reply({ content: "Tu n'es pas en service.", ephemeral: true });
    const started = user.dutyStartedAt, ended = new Date(), duration = ended - started;
    user.onDuty = false; user.dutyStartedAt = null; user.dutyHistory.push({ startedAt: started, endedAt: ended, durationMs: duration });
    await user.save();
    await interaction.reply(`${interaction.user} a fini son service. Durée : ${format(duration)}.`);
  }
};
