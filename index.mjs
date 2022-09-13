#!/usr/bin/env node
import { Command, Argument } from "commander";
import fs from "fs";
import path from "path";
import chalk from "chalk";
import ansi from "ansi-styles";
import 'ejs';
import 'child_process';
import stringLength from "string-length"; "string-length";
import term from "term-size";
import { exec } from "child_process";
const app=new Command();

function print(lt,rt) {
	return (
		lt +
		" ".repeat(term().columns-stringLength(lt)-stringLength(rt)) +
		rt
	);
}

function info(str) {
	// console.log(chalk.blueBright("ℹ INFO")+chalk.dim.bgBlue(`: ${str}`));
	let leftText=`${chalk.blueBright("▎ ℹ INFO")}: ${str}`;
	let rightText=``;
	console.log(chalk.bgRgb(0,36,60)(print(leftText,rightText)));
}
function success(str) {
	let leftText=`${chalk.greenBright("▎ ✓ SUCCESS")}: ${str}`;
	let rightText=``;
	console.log(chalk.bgRgb(0,60,0)(print(leftText,rightText)));
}
function warn(str) {
	let leftText=`${chalk.yellowBright("▎ ⚠ WARN")}: ${str}`;
	let rightText=``;
	console.log(chalk.bgRgb(60,36,0)(print(leftText,rightText)));
}
function err(str) {
	let leftText=`${chalk.redBright("▎ ⨯ ERR")}: ${str}`;
	let rightText=``;
	console.log(chalk.bgRgb(60,0,0)(print(leftText,rightText)));
}

// success("success test");
// info("info test");
// warn("warn test");
// err("err test");

app
.name("Wep Project Maker")
.version('1.0.0');

app.command('init')
.addArgument(new Argument('[name]','The name of the project').default(undefined,'the current directory'))
.addArgument(new Argument('[config_file]','The config file'))
.description('Initialize a new project.')
.action(async (name,config_file)=>{
	if (name) {
		fs.mkdirSync(name);
		process.chdir(name);
		info(`Made and moved to directory ${name}`);
	}

	fs.cpSync(`${__dirname}/template/*`,`.`);
	fs.writeFileSync('./package.json',await ejs.renderFile('./package.json',{name}));
})


app.parse(process.argv);