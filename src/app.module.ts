import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {BuildCookieJarMiddleware} from './middleware/build-cookie-jar.middleware';
import {IsLoggedInMiddleware} from './middleware/check-if-logged-in.middleware';
import {BoxerController} from './pages/boxer/boxer.controller';
import {LoginController} from './pages/login/login.controller';
import {RatingsController} from './pages/ratings/ratings.controller';

@Module({
    imports: [],
    controllers: [LoginController, BoxerController, RatingsController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(IsLoggedInMiddleware)
            .forRoutes({
                    path: '*', method: RequestMethod.ALL,
                },
            );
        consumer
            .apply(BuildCookieJarMiddleware)
            .forRoutes({
                    path: '*', method: RequestMethod.ALL,
                },
            );

        return consumer;
    }
}
