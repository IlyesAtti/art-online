import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as cookieParser from "cookie-parser";
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(join(__dirname, '..', 'uploads'));

    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:5173',
        credentials: true
    })

    await app.listen(3001);
}

bootstrap();