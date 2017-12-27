import chalk from 'chalk';

/**
 * @param options
 */
const log = (options) => {
    const title = `${options.title.toUpperCase()}`;

    if (typeof options.message === 'object') {
        Object.assign(options, {
            message: JSON.stringify(options.message),
        });
    }

    const level = options.level || 'info';
    const msg = `==> ${title} -> ${options.message}`;
    const date = new Date();
    const ts = `${date.toDateString()} ${date.toLocaleTimeString()}`;

    switch (level) {
        case 'warn':
            // eslint-disable-next-line no-console
            console.log(chalk.yellowBright(`=> [WARN] [${ts}] ${msg}`));
            break;
        case 'error':
            // eslint-disable-next-line no-console
            console.log(chalk.bgRed.white.bold(`=> [ERROR] [${ts}] ${msg}`));
            break;
        case 'special':
            // eslint-disable-next-line no-console
            console.log(chalk.cyanBright(`=> [SPECIAL] [${ts}] ${msg}`));
            break;

        case 'info':
            // eslint-disable-next-line no-console
            console.log(chalk.gray(`=> [INFO] [${ts}] ${msg}`));
            break;
        default:
            // eslint-disable-next-line no-console
            console.log(chalk.green(`=> [LOG] [${ts}] ${msg}`));
    }
};

export default log