import {Injectable, NestMiddleware} from '@nestjs/common';
import {Response} from 'express';
import {Cookie, CookieJar} from 'request';
import * as rp from 'request-promise';
import {CustomRequest} from './check-if-logged-in.middleware';

/**
 * Takes the request cookies and creates a cookie jar
 */
@Injectable()
export class BuildCookieJarMiddleware implements NestMiddleware {
    use(req: CustomRequest, res: Response, next: () => void) {
        const {PHPSESSID, REMEMBERME} = req.cookies;

        if (!req.boxrecCustom) {
            req.boxrecCustom = {
                cookieJar: null,
            };
        }

        const rawCookies: string = `PHPSESSID=${PHPSESSID};`;
        const rawCookies2: string = `REMEMBERME=${REMEMBERME}`;

        const cookie: Cookie | undefined = rp.cookie(rawCookies);
        const cookie2: Cookie | undefined = rp.cookie(rawCookies2);

        const jar: CookieJar = rp.jar();
        jar.setCookie(cookie, 'http://boxrec.com');
        jar.setCookie(cookie2, 'http://boxrec.com');

        req.boxrecCustom.cookieJar = jar;
        next();
    }
}
