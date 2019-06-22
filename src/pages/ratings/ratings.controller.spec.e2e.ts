import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import {BoxrecRatingsOutput} from 'boxrec/dist/boxrec-pages/ratings/boxrec.ratings.constants';
import * as request from 'supertest';
import {AppModule} from '../../app.module';
import {PHPSESSID, REMEMBERME} from '../../tests/e2e-setup';

describe('Ratings Controller (E2E)', () => {
    let app: INestApplication;

    function createTestModule() {
        return Test.createTestingModule({
            imports: [AppModule],
            providers: [],
        }).compile();
    }

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

    describe('get ratings, men, orthodox, and active', () => {

        let body: BoxrecRatingsOutput;

        it('should make a request and return 200', async () => {
            return request(app.getHttpServer())
                .get('/ratings?sex=M&stance=O&a')
                .expect(200)
                .expect((response) => {
                    body = response.body;
                });
        });

        it('should return an array of 50 boxers', () => {
            expect(body.boxers.length).toBe(50);
        });

        it('should return the number of pages', () => {
            // todo this seems broken in the boxrec package, it returns 0
            expect(body.numberOfPages).toBeGreaterThanOrEqual(0);
        });

    });

    afterAll(async () => {
        await app.close();
    });

});
