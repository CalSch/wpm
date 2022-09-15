#!/usr/bin/env node
import { Command, Argument } from "commander";
import fs from "fs-extra";
import ejs from 'ejs';
import 'child_process';
import { exec } from "child_process";
import {err,info,success,warn} from './logs.mjs';
import inquirer from "inquirer";
const app=new Command();

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let questions=[
	{
		type: 'input',
		name: 'proj_name',
		message: "What's your project name?",
	},	
]


app
.name("Wep Project Maker")
.version('1.0.0');

app.command('init')
.addArgument(new Argument('[name]','The name of the project').default(undefined,'the current directory'))
.addArgument(new Argument('[config_file]','The config file'))
.description('Initialize a new project.')
.action(async (name,config_file)=>{
	if (name) {
		if (!fs.existsSync(name)) fs.mkdirSync(name);
		process.chdir(name);
		info(`Made and moved to directory ${name}`);
	} else {
		await inquirer.prompt(questions).then((answers)=>{
			console.dir(answers)
			name=answers.proj_name;
		}).catch((error) => {
			if (error.isTtyError) {
				err("Could not render prompt")
			} else {
				err("Error")
				console.dir(error);
			}
		});
	}

	fs.copySync(`${__dirname}/template`,`${process.cwd()}`,{overwrite:true});
	fs.writeFileSync('./package.json',await ejs.renderFile('./package.json',{name}));
})


app.parse(process.argv);