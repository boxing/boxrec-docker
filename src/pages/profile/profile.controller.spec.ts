import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from '../../app.module';

const {PHPSESSID, REMEMBERME} = process.env;

describe('Profile Controller', () => {
    let app: INestApplication;

    function createTestModule() {
        return Test.createTestingModule({
            imports: [AppModule],
            providers: [],
        }).compile();
    }

    describe('missing PHPSESSID', () => {

        beforeEach(async () => {
            app = (await createTestModule()
            ).createNestApplication();
            // use middleware to update request to include cookies
            app.use(async (req, res, next) => {
                req.cookies = {
                    REMEMBERME,
                };
                next();
            });
            await app.init();
        });

        it('should receive a 403 if no PHPSESSID is sent', async () => {
            return request(app.getHttpServer())
                .get('/boxer/352')
                .expect(403);
        });

    });

    describe('missing REMEMBERME', () => {

        beforeEach(async () => {
            app = (await createTestModule()
            ).createNestApplication();
            // use middleware to update request to include cookies
            app.use(async (req, res, next) => {
                req.cookies = {
                    PHPSESSID,
                };
                next();
            });
            await app.init();
        });

        it('should receive a 403 if no REMEMBERME is sent', async () => {
            return request(app.getHttpServer())
                .get('/boxer/352')
                .expect(403);
        });

    });

    afterAll(async () => {
        await app.close();
    });

});
