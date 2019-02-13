import {NestFactory} from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import {AppModule} from './app.module';

dotenv.load();

const {HOST, PORT} = process.env;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.use(cookieParser());
    await app.listen(PORT, HOST);
    // tslint:disable-next-line
    console.log('running on', PORT, HOST);
}

bootstrap();
