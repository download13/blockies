import Koa from 'koa';
import koaStatic from 'koa-static';

const app = new Koa;

app.use(koaStatic('./'));

app.listen(8080, () => console.log('Listening on 8080'));