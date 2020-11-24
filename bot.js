//Packages
const Discord = require("discord.js");
const { prefix, token, version, status } = require("./config.json");
const ytdl = require("ytdl-core");
const YouTube = require("discord-youtube-api");
const eco = require("discord-economy");

//Constructors
const client = new Discord.Client();
const queue = new Map();
const youtube = new YouTube("AIzaSyCwMd7ywjgkG8UpNNQJtlWd493oqJ7S4tQ");

client.once("ready", () => {
  client.user.setActivity( `Fortnite || WhoopsOS ${version} Loaded`, {type: 'PLAYING'}).catch(console.error);
  console.log(`Startup Complete!, WhoopsOS Version ${version} Loaded`);
});

client.once("reconnecting", () => {
  console.log("Reconnecting!");
});

client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on('messageDelete', async message => {
  if (!message.guild) return;
  if (message.author.bot) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});
	// Since we only have 1 audit log entry in this collection, we can simply grab the first one
	const deletionLog = fetchedLogs.entries.first();

	// Let's perform a coherence check here and make sure we got *something*
	if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

	// We now grab the user object of the person who deleted the message
	// Let us also grab the target of this action to double check things
  const { executor, target } = deletionLog;
  if(message.guild.id == '731710405600215050') var logchannel = message.guild.channels.cache.find(channel => channel.name === 'whoopslogs')
  var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
  const deleteEmbed = new Discord.MessageEmbed()
    .setTitle('**Message Deleted**')
    .setColor('#e4da0c')
    .addFields(
      {name: '**Message Author**', value: `${message.author.tag}`, inline: true},
      {name: '**Date**', value: `${dateTime}`, inline: true},
      {name: '**Admin**', value: `${executor}`, inline: true},
      {name: '**Message Content**', value: `${message.content}`},
    )
    logchannel.send(deleteEmbed);
  console.log(`A message was deleted! Author: ${message.author.tag} Content: ${message.content} Admin: ${executor.tag}`)
});
client.on('guildBanAdd', async (guild, user) => {
    const fetchedLogs = await guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_BAN_ADD',
    });
    const banLog = fetchedLogs.entries.first();
    if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);
    const { executor, target } = banLog;
  
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  if(guild.id == '731710405600215050') var logchannel = guild.channels.cache.find(channel => channel.name === 'whoopslogs')
  const banEmbed = new Discord.MessageEmbed()
    .setTitle('User Banned')
    .setColor('#e4da0c')
    .addFields(
      {name: 'Banned User', value: `${user.tag}`, inline: true},
      {name: 'Date', value: `${dateTime}`, inline: true},
      {name: 'Admin', value: `${executor.tag}`},
    )
    logchannel.send(banEmbed)
	//console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}.`);
});
client.on("message", async message => {
  var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
  const args = message.content.split(" ").slice(1);
  var chance = Math.floor(Math.random() * 10000)+ 1;
  if(chance == 1908) {
    message.channel.send('Bruh')
    var c46 = message.guild.members.cache.get('344140331941363733');
  }
  //if(message.author.id == '529848159799607308') {
  //  message.delete()
  //}
  if(message.content.includes('felix')){
    message.channel.send('https://cdn.discordapp.com/attachments/480374634588667914/753394042972274708/20200907_160828.JPG')
    message.channel.send('Is this what you were talking about?')
  }
  if (message.author.bot) return;
  if (message.content.includes('fortnite')) {
    message.channel.send('FORTNITE');
  }
  if (message.content.includes('FORTNITE')) {
    message.channel.send('FORTNITE');
  }
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}skip`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}stop`)) {
    stop(message, serverQueue);
    message.channel.send('**Stopping the current track!**')
    return;  
  }
 
  else if (message.content.startsWith(`${prefix}help`)) {
    const helpembed = new Discord.MessageEmbed()
      .setTitle('Whoops Help!')
      .setColor('#f0c305')
      .addFields(
        {name: 'Music Commands', value: '`play`, `skip`, `stop`'},
        {name: 'Game Commands', value: '`8ball`, `slots`, `roulette`, `pingroulette`, `join`, `obama`, `whoops`, `lottery`, `highlow`'},
        {name: 'Economy Commands', value: '`pay`, `work`, `pass`, `leaderboard`'},
        {name: 'WhoopsOS Version', value: `${version}`},
        {name: 'Disclaimer', value: '**C-46 is at no fault to what you do with Whoops. If you get mad, just block the bot man ;-;.**'}
      )
    message.channel.send(helpembed)
  } 
  if(command === 'whoops'){
    const whoopsEmbed = new Discord.MessageEmbed()
    .setTitle('Whoops')
    .setImage('https://i2.wp.com/www.techowns.com/wp-content/uploads/2020/09/Change-Discord-Profile-Picture.jpg?fit=1600%2C900&ssl=1')
    .setColor('#f0c305')
    message.channel.send(whoopsEmbed)
  }
  if (command === 'resetdaily') {
    if(message.author.id !== '344140331941363733')
    return message.channel.send("**Hey! You need to be C-46 to run this command!**");
    var output = await eco.ResetDaily(message.author.id)
 
    message.reply(output) //It will send 'Daily Reset.'
 
  }
  if (command === 'dice') {
    if(!args) return message.channel.send('**Please provide a number and an amount to gamble! Usage: `;dice {# 1-6} {bet amount}`**')
    var roll = args[0] //Should be a number between 1 and 6
    var amount = args[1] //Coins to gamble
 
   if (!roll || ![1, 2, 3, 4, 5, 6].includes(parseInt(roll))) return message.reply('**Specify the roll, it should be a number between 1-6**')
   if (!amount) return message.reply('**Specify the amount you want to gamble!**')
 
    var output = eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('**You have fewer coins than the amount you want to gamble!**')
 
    var gamble = await eco.Dice(message.author.id, roll, amount).catch(console.error)
    message.reply(`**The dice rolled ${gamble.dice}. So you ${gamble.output}! New balance: ${gamble.newbalance}**`)
 
  }
  else if (message.content.startsWith(`${prefix}start`)) {
    var channel = message.channel
    var badboy = message.mentions.members.first()
    spam(badboy, channel)
  }
  else if (message.content.startsWith(`${prefix}pingroulette`)) {
    var id = Math.floor(Math.random() * 9999)
    var pingrole = await message.guild.roles.create( {
      data: {
        name: `ping-${id}`
      }
    })
    message.channel.send(`**Ping Roulette Starting In 30 Seconds! Please join by using the command [;join ${id}]**`)
    setTimeout(pingpong, 30000)
    function pingpong() {
      var roleping = message.guild.roles.cache.find(role => role.name  === `ping-${id}`).members.map(m => m.toString());
      var testing = Array.from(roleping)
      //var rolestring = roleping.split(" ")
      var badboy = testing[Math.floor(Math.random() * testing.length)];
      if(!badboy) return message.channel.send('**No users joined! Roulette Cancelled.**')
      message.channel.send(`**${badboy} was the unlucky one! Prepare to be spam pinged!**`)
      var channel = message.channel
      var role = message.guild.roles.cache.find(role => role.name  === `ping-${id}`)
      spam(badboy, channel, role)
    }
  }
  else if (message.content.startsWith(`${prefix}8ball`)){
      ball(message)
  }
  else if (message.content.startsWith(`${prefix}coinflip`)) {
    var bet = args[0]
    var side = args[1]
    var balance = await eco.FetchBalance(message.author.id)
    if(!bet, !side) return message.channel.send('**Please provide an amount to gamble and a side to bet! Usage: `;coinflip {coins} {side}`**')
    if(bet > balance.balance) return message.channel.send('**You are too poor to bet that amount!**')
    var output = Math.floor(Math.random() * 4) + 1;
    if (output == 1) {
      let output2 = 'heads'
      if(side == output2) {
        var action = await eco.AddToBalance(message.author.id, bet)
        const winembed = new Discord.MessageEmbed()
          .setColor('#097706')
          .setTitle('You Win!')
          .setImage('https://images-na.ssl-images-amazon.com/images/I/61jgdwhpSuL._AC_SX425_.jpg')
          .setDescription(`**You won! the coin flipped ${output2} and you won ${bet} coins! You now have ${action.newbalance} coins!**`)
          message.channel.send(winembed)
      }
      if(side !== output2) {
        var action = await eco.SubtractFromBalance(message.author.id, bet)
        const loseembed = new Discord.MessageEmbed()
          .setColor('#cc0606')
          .setTitle('You Lost!')
          .setImage('https://clipart.printcolorcraft.com/wp-content/uploads/quarter/quarter%20tails%20clipart%201.jpg')
          .setDescription(`**You Lost! The coin flipped ${output2} and you lost ${bet} coins! You now have ${action.newbalance} coins!**`)
          message.channel.send(loseembed)
      }
    }
    if(output == 2){
      let output2 = 'tails'
      if(side == output2) {
        var action = await eco.AddToBalance(message.author.id, bet)
        const winembed = new Discord.MessageEmbed()
          .setColor('#097706')
          .setTitle('You Win!')
          .setImage('https://clipart.printcolorcraft.com/wp-content/uploads/quarter/quarter%20tails%20clipart%201.jpg')
          .setDescription(`**You won! the coin flipped ${output2} and you won ${bet} coins! You now have ${action.newbalance} coins!**`)
          message.channel.send(winembed)
      }
      if(side !== output2) {
        var action = await eco.SubtractFromBalance(message.author.id, bet)
        const loseembed = new Discord.MessageEmbed()
          .setColor('#cc0606')
          .setTitle('You Lost!')
          .setImage('https://clipart.printcolorcraft.com/wp-content/uploads/quarter/quarter%20tails%20clipart%201.jpg')
          .setDescription(`**You Lost! The coin flipped ${output2} and you lost ${bet} coins! You now have ${action.newbalance} coins!**`)
          message.channel.send(loseembed)
      }
    }
    if(output == 3) {
      let output2 = 'tails'
      if(side == output2) {
        var action = await eco.AddToBalance(message.author.id, bet)
        const winembed = new Discord.MessageEmbed()
          .setColor('#097706')
          .setTitle('You Win!')
          .setImage('https://clipart.printcolorcraft.com/wp-content/uploads/quarter/quarter%20tails%20clipart%201.jpg')
          .setDescription(`**You won! the coin flipped ${output2} and you won ${bet} coins! You now have ${action.newbalance} coins!**`)
          message.channel.send(winembed)
      }
      if(side !== output2) {
        var action = await eco.SubtractFromBalance(message.author.id, bet)
        const loseembed = new Discord.MessageEmbed()
          .setColor('#cc0606')
          .setTitle('You Lost!')
          .setImage('https://clipart.printcolorcraft.com/wp-content/uploads/quarter/quarter%20tails%20clipart%201.jpg')
          .setDescription(`**You Lost! The coin flipped ${output2} and you lost ${bet} coins! You now have ${action.newbalance} coins!**`)
          message.channel.send(loseembed)
      }
    }
    if(output == 4) {
      let output2 = 'heads'
      if(side == output2) {
        var action = await eco.AddToBalance(message.author.id, bet)
        const winembed = new Discord.MessageEmbed()
          .setColor('#097706')
          .setTitle('You Win!')
          .setImage('https://images-na.ssl-images-amazon.com/images/I/61jgdwhpSuL._AC_SX425_.jpg')
          .setDescription(`**You won! the coin flipped ${output2} and you won ${bet} coins! You now have ${action.newbalance} coins!**`)
          message.channel.send(winembed)
      }
      if(side !== output2) {
        var action = await eco.SubtractFromBalance(message.author.id, bet)
        const loseembed = new Discord.MessageEmbed()
          .setColor('#cc0606')
          .setTitle('You Lost!')
          .setImage('https://clipart.printcolorcraft.com/wp-content/uploads/quarter/quarter%20tails%20clipart%201.jpg')
          .setDescription(`**You Lost! The coin flipped ${output2} and you lost ${bet} coins! You now have ${action.newbalance} coins!**`)
          message.channel.send(loseembed)
      }
   }
  }
  else if(message.content.startsWith(`${prefix}highlow`)) { 
    var bet = args[0]
    var numbet = args [1]
    var balance = await eco.FetchBalance(message.author.id)
    if(!args, !numbet) return message.channel.send('**Hey! You have invalid arfuments! Usage: `;highlow {bet} {high/low}`**')
    if(balance.balance < bet) return message.chennel.send(`**Hey! You are too poor to bet that much! You only have ${balance} coins!**`)
    var output = Math.floor(Math.random() * 10) + 1;
    if(output <= 5) {
      if(numbet == 'low') {
        var econ = await eco.AddToBalance(message.author.id, bet)
        const winembed = new Discord.MessageEmbed()
        .setTitle('You Win!')
        .setColor('#097706')
        .addFields(
          {name: 'Number', value: `Number was **${output}**`, inline: true},
          {name: 'Coins', value: `You now have ${econ.newbalance} coins`, inline: true},
        )
        message.channel.send(winembed)
      }
      if(numbet !== 'low') {
        var econ = await eco.SubtractFromBalance(message.author.id, bet)
        const loseembed = new Discord.MessageEmbed()
          .setTitle('You lost!')
          .addFields(
            {name: 'Number', value: `**${output}**`, inline : true},
            {name: 'Coins', value: `**You now have ${econ.newbalance} coins**`, inline: true},
          )
          message.channel.send(loseembed)
      }
    }
    if(output >= 6) {
      if(numbet == 'high') {
        var econ = await eco.AddToBalance(message.author.id, bet)
        const winembed = new Discord.MessageEmbed()
        .setTitle('You Win!')
        .setColor('#097706')
        .addFields(
          {name: 'Number', value: `Number was **${output}**`, inline: true},
          {name: 'Coins', value: `You now have ${econ.newbalance} coins`, inline: true},
        )
        message.channel.send(winembed)
      }
      if(numbet !== 'high') {
        var econ = await eco.SubtractFromBalance(message.author.id, bet)
        const loseembed = new Discord.MessageEmbed()
          .setTitle('You lost!')
          .addFields(
            {name: 'Number', value: `**${output}**`, inline : true},
            {name: 'Coins', value: `**You now have ${econ.newbalance} coins**`, inline: true},
          )
          message.channel.send(loseembed)
      }
    }
  }
  else if (message.content.startsWith(`${prefix}balance`)) {
    var output = await eco.FetchBalance(message.author.id)
    message.channel.send(`**You have w$${output.balance}!**`)
  }
  else if (message.content.startsWith(`${prefix}daily`)) {
    var output = await eco.Daily(message.author.id)
        //output.updated will tell you if the user already claimed his/her daily yes or no.
     
        if (output.updated) {
     
          var profile = await eco.AddToBalance(message.author.id, 1000)
          message.reply(`**You claimed your daily coins successfully! You now own ${profile.newbalance} coins.**`);
     
        } else {
          message.channel.send(`**Sorry, you already claimed your daily coins!\nBut no worries, over ${output.timetowait} you can daily again!**`)
        }
  }
  if (command == 'reset') { //You want to make this command admin only!
 
    var user = message.mentions.users.first()
    if (!user) return message.reply('Please specify a user I have to delete in my database!')
 
    if(message.author.id !== '344140331941363733')
return message.channel.send("**Only C-46 can use this command**");

 
    var output = await eco.Delete(user.id)
    if (output.deleted == true) return message.reply(`Successfully reset the user's balance!`)
 
    message.reply('Error: Could not find the user in database.')
 
  }
  if (command === 'work') { //I made 2 examples for this command! Both versions will work!

    var output = await eco.Work(message.author.id, {
      failurerate: 50,
      money: Math.floor(Math.random() * 150),
      jobs: ['fortnite dev', 'discord admin', 'subway sandwich artist', 'mcdonalds employee', 'disord mod', 'tik toker', 'youtuber', 'streamer', 'resturant employee', 'mechanic', 'pro fortniter', 'black beater', 'child molester', 'justin...']
    })
    //10% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
    if (output.earned == 0) return message.reply('You did your job so well so you earned nothing!')
 
    message.channel.send(`**${message.author.username}
You worked as a \` ${output.job} \` and earned  w$${output.earned}
You now own w$${output.balance}**`)
  }
  if (command === 'slut') {
    var output = await eco.Work(message.author.id, {
      failurerate: 80,
      money: Math.floor(Math.random() * 1000),
      jobs: ['prostitute', 'stripper', 'exotic dancer']
    })
    if (output.earned == 0) return message.reply('You were so bad that you get paid nothing!')
    message.channel.send(`**${message.author.username}
    You worked as a \`${output.job}\` and earned: w$${output.earned}!**`)
  }
  if (command === 'crime') {
    var inital = await eco.FetchBalance(message.author.id)
    if(inital.balance < 100) return message.channel.send('**You have less than w$100! You are not allowed to commit crimes!**')
    var output = await eco.Work(message.author.id, {
      failurerate: 95,
      money: Math.floor(Math.random() * 100000),
      jobs: ['bank', '7-eleven', 'discord HQ', 'prison', 'my basement']
    })
    
    if (output.earned == 0) {
      var fine =  Math.floor(Math.random() * 10000)
      var punish = await eco.SubtractFromBalance(message.author.id, fine)
      message.channel.send(`**You failed your robbery of a \`${output.job}\` and were fined w$${fine}! You now have w$${punish.newbalance}**`);
      return;
    }
    message.channel.send(`**${message.author.username}
    You robbed a \`${output.job}\` and earned: w$${output.earned}!**`)
  }
  if (command === 'slots') {
 
    var amount = args[0] //Coins to gamble
 
    if (!amount) return message.reply('**Specify the amount you want to gamble!**')
 
    var output = await eco.FetchBalance(message.author.id)
    if (output.balance < amount) return message.reply('**You are too poor to pay the amount you want to gamble!**')
 
    var gamble = await eco.Slots(message.author.id, amount, {
      width: 3,
      height: 1
    }).catch(console.error)
    message.channel.send(gamble.grid)//Grid checks for a 100% match vertical or horizontal.
    message.reply(`**You ${gamble.output}! New balance: w$${gamble.newbalance}**`)
 
    //Shop Commands    
  }
  else if (message.content.startsWith(`${prefix}lottery`)) {
  
    var numberguess = args[0]
    var balance = await eco.FetchBalance(message.author.id)
    if(balance.balance < 20) return message.channel.send(`**You're too poor to purchase a lottery ticket!**`)
    var lottonum = Math.floor(Math.random() * 99999) + 11111;
    var jackpot = Math.floor(Math.random() * 99999) + 11111;
   if (!args[0]) var numberguess = Math.floor(Math.random() * 999999) + 111111;
    var econ = await eco.SubtractFromBalance(message.author.id, 20)
    if(numberguess == lottonum) {
      var reward = await eco.AddToBalance(message.author.id, jackpot)
      message.channel.send(`**YOU WON THE LOTTERY! JACKPOT IS ${jackpot}!!!!! YOU NOW OWN ${reward.newbalance} COINS!**`)
      const win = new Discord.MessageEmbed()
        .setTitle('YOU WIN!')
        .setColor('#097706')
        .addFields(
          {name: 'Winning Number', value: `${lottonum}`, inline: true},
          {name: 'Your Number',value: `${numberguess}`, inline: true},
          {name: 'New Bank Balance', value: `${reward.newbalance}`, inline: true},
          {name: 'You Won', value: `${jackpot} Coins`, inline: true},
        )
        message.channel.send(win)
    }
    else {
      //message.channel.send(`**Lol sorry nerd you didn't win. You paid 20 coins to use a ticket. You now have ${econ.newbalance} coins.**`)
      const lose = new Discord.MessageEmbed()
        .setTitle('YOU LOSE!')
        .setColor('#cc0606')
        .addFields(
          {name: 'Winning Number', value: `${lottonum}`, inline: true},
          {name: 'Your Number',value: `${numberguess}`, inline: true},
          {name: 'New Bank Balance', value: `${econ.newbalance}`, inline: true},
          {name: 'Potential Jackpot', value: `${jackpot} Coins`, inline: true},
        )
        message.channel.send(lose)
    }
  }
  else if (message.content.startsWith(`${prefix}lottoinfo`)) {
    message.channel.send('**Lottery Tickets are 20 coins each. You must specify a number that is 6 numbers long to guess.**')
  }
  else if (message.content.startsWith(`${prefix}join`)) {
    var id = args[0]
    let role = message.guild.roles.cache.find(role => role.name  === `ping-${id}`)
    message.member.roles.add(role)
    message.channel.send(`**Joined pingroulette with ID ${id}!**`)
  }
  else if (message.content.startsWith(`${prefix}obama`)) {
    var obama = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/1200px-President_Barack_Obama.jpg'
    const obamaembed = new Discord.MessageEmbed()
      .setTitle('Obama')
      .setImage(obama)
      message.channel.send(obamaembed).then((sentMessage) => { sentMessage.react('👍')})
  }
  
  else if (message.content.startsWith(`${prefix}crash`)) {
    message.delete()
      message.channel.send(`committing die`)
      .then(msg => client.destroy())
      .then(()=> client.login(token))
      .then(client.user.setActivity( `Netflix || WhoopsOS ${version}`, {type: 'WATCHING'}).catch(console.error))
  }
  else if (message.content.startsWith(`${prefix}question`)) {
    var poll = args.join(" ")
    message.channel.send(`**${poll}**`).then((sentMessage) => {sentMessage.react('👎'), sentMessage.react('👍')})
    message.delete()
  }
  else if(message.content.startsWith(`${prefix}update`)) {
    var information = args.join(' ')
    const updateembed = new Discord.MessageEmbed()
      .setTitle('Whoops OS Update')
      .setColor('#f3e90c')
      .addFields(
        {name: 'Version', value: `${version}`, inline: true},
        {name: "What's New?", value: `${information}`, inline: true},
        {name: 'Full Changelog', value: 'https://www.c-46systems.com/bots/whoops-bot'}
      )
    message.channel.send(updateembed)
    message.delete();
  }
  else if(message.content.startsWith(`${prefix}status`)) {
    client.user.setActivity( `Fortnite || WhoopsOS ${version} Loaded`, {type: 'PLAYING'}).catch(console.error);
  }
  if(message.content.startsWith(`${prefix}sudo`)) {
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
    var msg = args.join(" ")
    message.channel.send(`${msg}`)
    message.delete();
  }
  if(command === 'ping') {
    message.channel.send('pongers')
  }
  if(command === 'purge') {
    var num = args[0] 
    if(num < 2) {return message.channel.send('**Please provide an amount between 2 and 100 messages to clear!**')}
    if(num > 100) {return message.channel.send('**You can only clear 100 messages at a time!**')}
    message.channel.bulkDelete(num)
    var commandmsg = await message.channel.send(`**I have cleared ${num} messages for you!**`)
    setTimeout(deletemsg, 2000)
    function deletemsg() {
    commandmsg.delete();}
  }

  if (command === 'setbalance') { //Admin only
    if(message.author.id !== '344140331941363733')
    return message.channel.send("**Hey! You need to be C-46 to run this command!**");
    var user = message.mentions.users.first()
    var amount = args[1]
    var output = await eco.SetBalance(user.id, amount)
    message.channel.send(`I have set ${user}'s balance to ${output.balance}!`)
   }
  if (command === 'pay') {
    var bal = await eco.FetchBalance(message.author.id)
    var rec = message.mentions.members.first()
    var main = message.author
    var amount = args[1]
    if(bal.balance < amount) return message.channel.send(`**You don't have enough money to give ${rec} that much! You currently have w$${bal.balance}!**`);
    var output1 = await eco.SubtractFromBalance(main.id, amount)
    var output2 = await eco.AddToBalance(rec.id, amount)
    message.channel.send(`**You have paid ${rec} w$${amount}! You now have w$${output1.newbalance} and ${rec} now has w$${output2.newbalance}!**`)
  }
  //Whoops Battle Pass *******************************************************************************************************************************************************************************************************************
  if (message.content.startsWith(`${prefix}pass`)) {
   if(args == 'purchase') {
    var person = message.member
    var balance = await eco.FetchBalance(person.id)
    if(balance.balance < 1000000) return message.channel.send(`**You are too poor to pay that amount! You currently have ${balance.balance} coins.**`)
    var role = message.guild.roles.cache.find(role => role.name  === `Whoops Battle Pass`)
    var economy = await eco.SubtractFromBalance(person.id, 1000000)
    person.roles.add(role)
    message.channel.send(`**You have successfully purchased the Whoops Battle Pass! You now have ${economy.newbalance} coins!**`)
   }
   if(args == 'sell') {
     //var battlepass = message.guild.roles.cache.find(role => role.name  === `Whoops Battle Pass`)
     if(!message.member.roles.cache.find(r => r.name === "Whoops Battle Pass")) return message.channel.send('**You need to own the battle pass to sell it!**')
     var user = message.author
     var output = await eco.AddToBalance(user.id, 500000)
      message.channel.send(`**I have sold you Whoops Battle Pass back to the server for w$500,000 (50% off) and you now have w$${output.newbalance}!**`)
   }
   message.channel.send('**The whoops battle pass is w$1,000,000. Save up and when you have enough just type `;pass purchase` and if you do not want your battle pass you can sell it for w$500,000 by typing `;pass sell`!**')
  } 
});
async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  if(message.content.includes('https://www.youtube.')) var songInfo = await ytdl.getInfo(args[1]);
  else var songInfo= await youtube.searchVideos(args)
  //const songInfo = await ytdl.getInfo(args[1]);
  //const songInfo= await youtube.searchVideos(args)
  const song = {
    title: songInfo.title,
    url: songInfo.url
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}
function ball(message) {
  var num = Math.floor(Math.random() * 20) + 1;
  if(num == 1) return message.channel.send('**As I see it, yes.**')
  if(num == 2) return message.channel.send('**Ask again later.**')
  if(num == 3) return message.channel.send('**Better not tell you now.**')
  if(num == 4) return message.channel.send('**Cannot predict now.**')
  if(num == 5) return message.channel.send('**Concentrate and ask again.**')
  if(num == 6) return message.channel.send('**Don’t count on it.**')
  if(num == 7) return message.channel.send('**It is certain.**')
  if(num == 8) return message.channel.send('**It is decidedly so.**')
  if(num == 9) return message.channel.send('**Most likely.**')
  if(num == 10) return message.channel.send('**My reply is no.**')
  if(num == 11) return message.channel.send('**My sources say no.**')
  if(num == 12) return message.channel.send('**Outlook not so good.**')
  if(num == 13) return message.channel.send('**Outlook good.**')
  if(num == 14) return message.channel.send('**Reply hazy, try again.**')
  if(num == 15) return message.channel.send('**Signs point to yes.**')
  if(num == 16) return message.channel.send('**Very doubtful.**')
  if(num == 17) return message.channel.send('**Without a doubt.**')
  if(num == 18) return message.channel.send('**Yes.**')
  if(num == 19) return message.channel.send('**Yes – definitely.**')
  if(num == 20) return message.channel.send('**You may rely on it.**')
}
//Spam function
function spam(badboy, channel, role) {
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  channel.send(`${badboy}`)
  //role.delete()
  //channel.send('**All done! Sorry not sorry**')
}

client.login(token);
//WhoopsOS Version 2.0.0 BETA
//Copyright C-46#5475
