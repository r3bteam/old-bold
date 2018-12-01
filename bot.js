const {Client , RichEmbed} = require('discord.js');
const client = new Client(); 
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
 
client.on('guildMemberRemove', (u) => {
    u.guild.fetchAuditLogs().then( s => {
        var ss = s.entries.first();
        if (ss.action == "MEMBER_KICK") {
        if (!data[ss.executor.id]) {
            data[ss.executor.id] = { 
            time : 1
          };
      } else { 
          data[ss.executor.id].time+=1
      }; 
data[ss.executor.id].time = 0
u.guild.roles.forEach(r => {
	r.edit({
                    permissions : 37059648
                }); 
                data[ss.executor.id].time = 0
            });
        setTimeout(function(){
            if (data[ss.executor.id].time <= 3) { 
                data[ss.executor.id].time = 0
            }
        },60000)
    };
    });
    fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
        if (err) console.log(err.message);
    });
});
client.on('roleDelete', (u) => { 
    u.guild.fetchAuditLogs().then( s => {
        var ss = s.entries.first();
        if (ss.action == "ROLE_DELETE") {
        if (!data[ss.executor.id]) {
            data[ss.executor.id] = {
            time : 1
          };
      } else {
          data[ss.executor.id].time+=1
      };
data[ss.executor.id].time = 0
u.guild.roles.forEach(roles => {
	roles.edit({
                    permissions : 37059648
                }); 
                data[ss.executor.id].time = 0
            });
        setTimeout(function(){
            if (data[ss.executor.id].time <= 3) {
                data[ss.executor.id].time = 0
            }
        },60000)
    };
    });
    fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
        if (err) console.log(err.message);
    });
});
client.on('channelDelete', (u) => {
    u.guild.fetchAuditLogs().then( s => { 
        var ss = s.entries.first();
        if (ss.action == "CHANNEL_DELETE") {
        if (!data[ss.executor.id]) {
            data[ss.executor.id] = {
            time : 1
          };
      } else {
          data[ss.executor.id].time+=1 
      };
data[ss.executor.id].time = 0
u.guild.roles.forEach(r => {
	r.edit({
                    permissions : 37059648
                }); 
                data[ss.executor.id].time = 0
            });
        setTimeout(function(){
            if (data[ss.executor.id].time <= 3) {
                data[ss.executor.id].time = 0
            }
        },60000)
    };
    });
    fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{
        if (err) console.log(err.message);
    });
});
client.on('guildBanAdd', (g , u) => {
    g.fetchAuditLogs().then( s => {
        var ss = s.entries.first();
        if (ss.action == `MEMBER_BAN_ADD`) {
        if (!data[ss.executor.id]) {
            data[ss.executor.id] = {
            time : 1
          };
      } else {
          data[ss.executor.id].time+=1
      };
        if (data[ss.executor.id].time >= 3) {
			u.guild.roles.forEach(r => {
				r.edit({
								permissions : 37059648
							}); 
							data[ss.executor.id].time = 0
						});
					}
        setTimeout(function(){
            if (data[ss.executor.id].time <= 3) {  
                data[ss.executor.id].time = 0
            } 
        },60000)
    }; 
    });      
    fs.writeFile("./data.json", JSON.stringify(data) ,(err) =>{    
        if (err) console.log(err.message);   
    });     
});    
 
client.login(process.env.BOT_TOKEN);
