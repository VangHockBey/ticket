const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
	message.delete({ timeout: 5000 })
    if(message.channel.id !== "881997576138788914") return message.reply('bu komut sadece destek kanalında çalışır.').then(message => { message.delete({ timeout: 5000 })})
   if (message.guild.channels.cache.get(db.fetch(`destek_${message.author.id}`))) return false || message.channel.send('Şu anda mevcut bir talebin var.').then(message => { message.delete({ timeout: 5000 })})
      
    let kullanici = message.author
    let yetkili = message.guild.roles.cache.find(x => x.id == "878666766040051743") // YETKİLİ ROL İD
    let herkes = message.guild.roles.cache.find(x => x.name == "@everyone")
    message.guild.channels.create(`ticket-${message.author.username}`, "text").then(async c => {
        db.set(`destek_${message.author.id}`, c.id)
        const category = message.guild.channels.cache.get('881997024759787642') // Kategori id
        c.setParent(category.id)
        c.send(`Hey , Hoşgeldin Dostum Sıkıntırını/Sorularını <@&878666766040051743> Yetkililerine İletmeniz Yeterlidir. ${kullanici} Destek ekibi seninle buradan ilgilenecek.`)
        c.send(`\`Talebi kapatmak icin =ticket-kapat\``)
        c.overwritePermissions([
            {
                id: kullanici.id,
                allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES'],
            },
            {
                id: yetkili.id,
                allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES'],
            },
            {
                id: herkes.id,
                deny: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','SEND_MESSAGES'],
            },
        ]);
})



};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'new'
};