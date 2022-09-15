import chalk from "chalk";
import stringLength from "string-length";
import term from "term-size";


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

export {info,err,success,warn}