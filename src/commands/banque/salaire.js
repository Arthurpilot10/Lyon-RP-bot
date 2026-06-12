const { SlashCommandBuilder } = require("discord.js");
const { getUser } = require("../../utils/users");
const { getSalary } = require("../../utils/salary");
const config = require("../../config");
module.exports = {
  data: new SlashCommandBuilder().setName("salaire").setDescription("Recevoir son salaire tous les 15 jours"),
  async execute(interaction) {
    const user = await getUser(interaction.user.id);
    const cooldown = config.salaryCooldownDays * 24 * 60 * 60 * 1000;
    if (user.lastSalary && Date.now() - user.lastSalary.getTime() < cooldown) {
      const next = new Date(user.lastSalary.getTime() + cooldown);
      return interaction.reply({ content: `Prochain salaire disponible le ${next.toLocaleString("fr-FR")}.`, ephemeral: true });
    }
    const salary = getSalary(interaction.member);
    user.balance += salary.amount; user.lastSalary = new Date(); await user.save();
    await interaction.reply(`Salaire reçu : ${salary.amount}${config.currency}. Rôle : ${salary.role}. Solde : ${user.balance}${config.currency}.`);
  }
};
