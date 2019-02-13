import {Injectable, NestMiddleware} from '@nestjs/common';
import {Request, Response} from 'express';
import {CookieJar} from 'request';

// returns the session and rememberme token
export function getCookies(req: Request): { PHPSESSID: string, REMEMBERME: string } {
    const {REMEMBERME, PHPSESSID} = req.cookies;

    return {
        PHPSESSID,
        REMEMBERME,
    };
}

/**
 * Checks to see if the required BoxRec cookies are set
 */
@Injectable()
export class IsLoggedInMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        const {PHPSESSID, REMEMBERME} = getCookies(req);

        // continue on if logging in
        if (req.baseUrl === '/login') {
            next();
            return;
        }

        if (!PHPSESSID) {
            res.status(403).send('required cookie PHPSESSID is missing');
            return;
        }

        if (!REMEMBERME) {
            res.status(403).send('required cookie REMEMBERME is missing');
            return;
        }

        next();
    }
}

// extends the Request with custom values
export interface CustomRequest extends Request {
    boxrecCustom: {
        cookieJar: CookieJar,
    };
}
