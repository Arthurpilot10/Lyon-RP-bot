const { SlashCommandBuilder } = require("discord.js");
const { getUser } = require("../../utils/users");
const { isPolice } = require("../../utils/permissions");
const config = require("../../config");
module.exports = {
  data: new SlashCommandBuilder().setName("amande-mettre").setDescription("Mettre une amende")
    .addUserOption(o => o.setName("utilisateur").setDescription("Personne").setRequired(true))
    .addIntegerOption(o => o.setName("montant").setDescription("Montant").setRequired(true).setMinValue(1))
    .addStringOption(o => o.setName("raison").setDescription("Raison").setRequired(true))
    .addStringOption(o => o.setName("date").setDescription("Date").setRequired(true)),
  async execute(interaction) {
    if (!isPolice(interaction.member)) return interaction.reply({ content: "Permission refusée.", ephemeral: true });
    const target = interaction.options.getUser("utilisateur");
    const amount = interaction.options.getInteger("montant");
    const reason = interaction.options.getString("raison");
    const date = interaction.options.getString("date");
    const user = await getUser(target.id);
    user.balance -= amount;
    user.fines.push({ reason, amount, date, officerId: interaction.user.id });
    await user.save();
    await interaction.reply(`Amende mise à ${target}. Montant : ${amount}${config.currency}. Raison : ${reason}.`);
  }
};
