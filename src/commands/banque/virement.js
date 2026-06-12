const { SlashCommandBuilder } = require("discord.js");
const { getUser } = require("../../utils/users");
const config = require("../../config");
module.exports = {
  data: new SlashCommandBuilder().setName("virement").setDescription("Envoyer de l'argent")
    .addUserOption(o => o.setName("utilisateur").setDescription("Joueur").setRequired(true))
    .addIntegerOption(o => o.setName("montant").setDescription("Montant").setRequired(true).setMinValue(1)),
  async execute(interaction) {
    const target = interaction.options.getUser("utilisateur");
    const amount = interaction.options.getInteger("montant");
    if (target.bot || target.id === interaction.user.id) return interaction.reply({ content: "Virement impossible.", ephemeral: true });
    const sender = await getUser(interaction.user.id);
    if (sender.balance < amount) return interaction.reply({ content: "Solde insuffisant.", ephemeral: true });
    const receiver = await getUser(target.id);
    sender.balance -= amount; receiver.balance += amount;
    await sender.save(); await receiver.save();
    await interaction.reply(`${interaction.user} a envoyé ${amount}${config.currency} à ${target}.`);
  }
};
