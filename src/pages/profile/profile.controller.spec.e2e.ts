import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {createTestModule} from '../../e2e-helpers';
import {PHPSESSID, REMEMBERME} from '../../tests/e2e-setup';

describe('Profile Controller (E2E)', () => {
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

    it('GET boxer/:id', async () => {
        return request(app.getHttpServer())
            .get('/boxer/352')
            .expect(200)
            .expect(response => {
                const {body} = response;
                expect(body.name).toBe('Floyd Mayweather Jr');
                // the following ensures that the bouts are properly turned into JSON
                // todo for the rest of the roles, this is important to do
                expect(body.bouts[49].secondBoxer.name).toBe('Conor McGregor');
            });
    });

    it('GET doctor/:id', async () => {
        return request(app.getHttpServer())
            .get('/doctor/412083')
            .expect(200)
            .expect(response => {
                const {body} = response;
                expect(body.name).toBe('Michael MacKay');
            });
    });

    it('GET inspector/:id', async () => {
        return request(app.getHttpServer())
            .get('/inspector/477735')
            .expect(200)
            .expect(response => {
                const {body} = response;
                expect(body.name).toBe('Michael Mange');
            });
    });

    it('GET judge/:id', async () => {
        return request(app.getHttpServer())
            .get('/judge/407560')
            .expect(200)
            .expect(response => {
                const {body} = response;
                expect(body.name).toBe('Buchato Michael');
            });
    });

    it('GET manager/:id', async () => {
        return request(app.getHttpServer())
            .get('/manager/666942')
            .expect(200)
            .expect(response => {
                const {body} = response;
                expect(body.name).toBe('Jim Claude Manangquil');
            });
    });

    it('GET promoter/:id', async () => {
        return request(app.getHttpServer())
            .get('/promoter/32644')
            .expect(200)
            .expect(response => {
                const {body} = response;
                expect(body.name).toBe('Barry Michael');
            });
    });

    it('GET referee/:id', async () => {
        return request(app.getHttpServer())
            .get('/referee/643518')
            .expect(200)
            .expect(response => {
                const {body} = response;
                expect(body.name).toBe('Amos Michael');
            });
    });

    it('GET supervisor/:id', async () => {
        return request(app.getHttpServer())
            .get('/supervisor/403095')
            .expect(200)
            .expect(response => {
                const {body} = response;
                expect(body.name).toBe('Dave McCullough');
            });
    });

    afterAll(async () => {
        await app.close();
    });

});
