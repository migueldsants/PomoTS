import figlet from "figlet";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";


async function startup(): Promise<void> {
    console.clear();
    await title();
    await showBanner();
}

export default startup;

const sleep = (ms: number = 2000): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

async function title(): Promise<void> {
    const title = "🍅 Pomodoro CLI\n";

    const anim = chalkAnimation.rainbow(title);
    await sleep();
    anim.stop();

    console.clear();

    console.log(chalk.green(title));
}

export function showBanner(): Promise<void> {
    return new Promise((resolve, reject) => {
        const msg = `pomots`;

        figlet.text(
            msg,
            { font: "ANSI Shadow" },
            (err: Error | null, data?: string) => {
                if (err || !data) {
                    reject(err);
                    return;
                }

                console.log(chalk.red(data));
                resolve();
            }
        );
    });
}