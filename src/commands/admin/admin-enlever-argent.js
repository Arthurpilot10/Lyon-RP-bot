const { SlashCommandBuilder } = require("discord.js");
const { getUser } = require("../../utils/users");
const { isMoneyAdmin } = require("../../utils/permissions");
const config = require("../../config");
module.exports = {
  data: new SlashCommandBuilder().setName("admin-enlever-argent").setDescription("Enlever de l'argent")
    .addUserOption(o => o.setName("utilisateur").setDescription("Joueur").setRequired(true))
    .addIntegerOption(o => o.setName("montant").setDescription("Montant").setRequired(true).setMinValue(1)),
  async execute(interaction) {
    if (!isMoneyAdmin(interaction.member)) return interaction.reply({ content: "Permission refusée.", ephemeral: true });
    const target = interaction.options.getUser("utilisateur"), amount = interaction.options.getInteger("montant");
    const user = await getUser(target.id); user.balance -= amount; await user.save();
    await interaction.reply(`${amount}${config.currency} enlevés à ${target}. Solde : ${user.balance}${config.currency}.`);
  }
};
