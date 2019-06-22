import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {createTestModule} from '../../e2e-helpers';
import {PHPSESSID, REMEMBERME} from '../../tests/e2e-setup';

describe('Boxer Controller (E2E)', () => {
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
                expect(body.bouts[49].secondBoxer.name).toBe('Conor McGregor');
            });
    });

    afterAll(async () => {
        await app.close();
    });

});
