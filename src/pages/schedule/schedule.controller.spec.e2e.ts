import {INestApplication} from '@nestjs/common';
import {BoxrecScheduleOutput} from 'boxrec/dist/boxrec-pages/schedule/boxrec.page.schedule.constants';
import * as request from 'supertest';
import {createTestModule} from '../../e2e-helpers';
import {PHPSESSID, REMEMBERME} from '../../tests/e2e-setup';

describe('Schedule Controller (E2E)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        app = (await createTestModule()
        ).createNestApplication();
        // use middleware to update request to include cookies
        app.use(async (req, res, next) => {
            req.cookies = {
                PHPSESSID,
                REMEMBERME,
            };
            next();
        });
        await app.init();
    });

    describe('get schedule for worldwide, all divisions and no tv specified', () => {

        let body: BoxrecScheduleOutput;

        it('should make a request and return 200', async () => {
            return request(app.getHttpServer())
                .get('/schedule?countryCode=&division=&tv=')
                .expect(200)
                .expect((response) => {
                    body = response.body;
                });
        });

        it('should return an array of events', () => {
            expect(body.events.length).toBeGreaterThanOrEqual(1);
        });

        describe('events', () => {

            it('should return a list of bouts', () => {
                expect(body.events[0].bouts.length).toBeGreaterThanOrEqual(1);
            });

        });

        it('should return the number of pages', () => {
            expect(body.numberOfPages).toBeGreaterThanOrEqual(1);
        });

    });

    afterAll(async () => {
        await app.close();
    });

});
