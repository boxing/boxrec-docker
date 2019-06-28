import {INestApplication} from '@nestjs/common';
import {BoxrecDateOutput} from 'boxrec/dist/boxrec-pages/date/boxrec.page.date.constants';
import * as request from 'supertest';
import {createTestModule} from '../../e2e-helpers';
import {PHPSESSID, REMEMBERME} from '../../tests/e2e-setup';

describe('Date Controller (E2E)', () => {
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

    describe('get date (2018-09-15)', () => {

        let body: BoxrecDateOutput;

        it('should make a request and return 200', async () => {
            return request(app.getHttpServer())
                .get('/date?year=2018&month=09&day=15')
                .expect(200)
                .expect((response) => {
                    body = response.body;
                });
        });

        it('should return an array of events', () => {
            expect(body.events.length).toBeGreaterThanOrEqual(5);
        });

        // todo need test to go through events // this is broken

    });

    afterAll(async () => {
        await app.close();
    });

});
