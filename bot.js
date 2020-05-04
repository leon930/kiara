const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client()
client.prefix = config.prefix;

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)){
        return message.reply("Olá meu prefixo é `l!`")}
    if(!message.content.startsWith(config.prefix)) return;

let args = message.content.split(" ").slice(1);
let command = message.content.split(" ")[0];
command = command.slice(config.prefix.length);
  try {
      let commandFile = require(`./commands/${command}.js`);
      delete require.cache[require.resolve(`./commands/${command}.js`)];
      return commandFile.run(client, message, args);
  } catch (err) {
        console.error("Erro:" + err)
  }
})

client.on("ready", () => {
    console.log(`Bot foi iniciado com, ${client.users.size} usuários, ${client.guilds.size} servidores, ${client.channels.size} canais.`)

    let messages = [`Use l!ajuda`,
                    `Loja de websites e templates`,
                    `lunardevelopers.ga`,]

    setInterval(() => {
        let randomMessages = Math.floor(Math.random() * (messages.length - 1) + 1)
        client.user.setActivity(messages[randomMessages])
    }, 10000)

    //0 = Jogando
    //1 = Transmitindo
    //2 = Ouvindo
    //3 = Assistindo
})

client.on('guildMemberAdd', member => {
    if (member.guild.id !== "705426608139272243") return;
    let avatar = member.user.avatarURL
    let embed = new Discord.RichEmbed()
        .setColor('#660066')
        .setThumbnail(avatar)
        .setTitle("**Bem Vindo**")
        .addField('Bem vindo(a)!', `Bem vindo(a) ${member} Ao servidor :)`)
        .setFooter(`Membro que entrou no server: ${member}`)
        .addField('Você é o membro de numero:', member.guild.memberCount)
        .setDescription("Espero Que Se Divirta-Se!")
        .setTimestamp()
    client.channels.get('705426608139272246').send(embed)
});

client.on("guildMemberAdd", member =>{
    var role = member.guild.roles.find("id", "705433438437638224");
    member.addRole(role);
  })

client.login(config.token)