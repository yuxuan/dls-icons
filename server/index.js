import Koa from 'koa';
import Router from 'koa-router';
import body from 'koa-body';
import logger from 'koa-logger';
import cp from 'child_process';
import axios from 'axios';

const main = async () => {
    const app = new Koa();
    app.use(logger());
    app.use(body());

    const index = new Router();
    index.post(
        '/buildIcons',
        async context => {
            console.log('start building icons...');

            cp.exec(`yarn buildIcons`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                console.log('done building icons');
            });
            context.body = { succeed: true };
        }
    )

    app.use(index.routes()).use(index.allowedMethods());

    app.listen(
        parseInt(process.env.PORT || '3001', 10) || 3000,
        () => {
            // eslint-disable-next-line no-console
            console.log(`http://localhost:${process.env.PORT || 3001}`);
        }
    );
};

main();
