import {INestApplication} from '@nestjs/common';
import {BoxrecScheduleOutput} from 'boxrec/dist/boxrec-pages/schedule/boxrec.page.schedule.constants';
import * as request from 'supertest';
import {createTestModule} from '../../e2e-helpers';
import {PHPSESSID, REMEMBERME} from '../../tests/e2e-setup';

describe('Results Controller (E2E)', () => {
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

    describe('get results for worldwide, all divisions', () => {

        let body: BoxrecScheduleOutput;

        it('should make a request and return 200', async () => {
            return request(app.getHttpServer())
                .get('/results?countryCode=&division=')
                .expect(200)
                .expect((response) => {
                    body = response.body;
                });
        });

        it('should return an array of events', () => {
            expect(body.events.length).toBe(20);
        });

        it('should return the number of pages', () => {
            // if this breaks, something has changed.  Last checked 2019-06-22
            expect(body.numberOfPages).toBeGreaterThanOrEqual(237);
        });

    });

    afterAll(async () => {
        await app.close();
    });

});
