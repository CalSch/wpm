import chalk from "chalk";
import termSize from "term-size";
import stringLength from "string-length";
function print(lt,rt) {
	return (
		lt +
		" ".repeat(termSize().columns-stringLength(lt)-stringLength(rt)) +
		rt
	);
}

function info(str) {
	// console.log(chalk.blueBright("ℹ INFO")+chalk.dim.bgBlue(`: ${str}`));
	let leftText=`${chalk.blueBright("▎ ℹ INFO")}: ${str}`;
	let rightText=``;
	console.log(chalk.bgRgb(0,36,60)(print(leftText,rightText)));
}
function get(str) {
	let leftText=`${chalk.greenBright("▎ ↓ GET")} ${str}`;
	let rightText=``;
	console.log(chalk.bgRgb(0,30,0)(print(leftText,rightText)));
}
function post(str) {
	let leftText=`${chalk.magentaBright("▎ ↑ POST")} ${str}`;
	let rightText=``;
	console.log(chalk.bgRgb(35,0,60)(print(leftText,rightText)));
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

export {info,get,post,err,warn};