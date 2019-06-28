import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {BuildCookieJarMiddleware} from './middleware/build-cookie-jar.middleware';
import {IsLoggedInMiddleware} from './middleware/check-if-logged-in.middleware';
import {ProfileMiddleware} from './middleware/profile.middleware';
import {LoginController} from './pages/login/login.controller';
import {ProfileController} from './pages/profile/profile.controller';
import {RatingsController} from './pages/ratings/ratings.controller';
import {ResultsController} from './pages/results/results.controller';
import {ScheduleController} from './pages/schedule/schedule.controller';
import { DateController } from './pages/date/date.controller';

@Module({
    imports: [],
    controllers: [LoginController, RatingsController, ScheduleController, ResultsController, ProfileController, DateController],
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
        consumer
            .apply(ProfileMiddleware)
            .forRoutes(
                {
                    path: '/boxer/:id', method: RequestMethod.GET,
                },
                {
                    path: '/doctor/:id', method: RequestMethod.GET,
                },
                {
                    path: '/inspector/:id', method: RequestMethod.GET,
                },
                {
                    path: '/judge/:id', method: RequestMethod.GET,
                },
                {
                    path: '/manager/:id', method: RequestMethod.GET,
                },
                {
                    path: '/matchmaker/:id', method: RequestMethod.GET,
                },
                {
                    path: '/promoter/:id', method: RequestMethod.GET,
                },
                {
                    path: '/referee/:id', method: RequestMethod.GET,
                },
                {
                    path: '/supervisor/:id', method: RequestMethod.GET,
                },
            );

        return consumer;
    }
}
