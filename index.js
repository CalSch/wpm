#!/usr/bin/env node
const { Command } = require('commander');
const fs=require('fs');
const app=new Command();

app
.version('1.0.0')

fs.readdirSync('./commands').forEach((file)=>{
	let cmd=require(`./commands/${file}`);
	app
	.command(cmd.str)
	.description(cmd.desc)
	.action(cmd.action);
})

app.parse(process.argv);