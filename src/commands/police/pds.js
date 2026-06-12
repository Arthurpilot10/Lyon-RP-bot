const { SlashCommandBuilder } = require("discord.js");
const { getUser } = require("../../utils/users");
const { canUseService } = require("../../utils/permissions");
module.exports = {
  data: new SlashCommandBuilder().setName("pds").setDescription("Prendre son service"),
  async execute(interaction) {
    if (!canUseService(interaction.member)) return interaction.reply({ content: "Permission refusée.", ephemeral: true });
    const user = await getUser(interaction.user.id);
    if (user.onDuty) return interaction.reply({ content: "Tu es déjà en service.", ephemeral: true });
    user.onDuty = true; user.dutyStartedAt = new Date(); await user.save();
    await interaction.reply(`${interaction.user} a pris son service.`);
  }
};
