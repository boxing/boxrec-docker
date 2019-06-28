import {Injectable, NestMiddleware} from '@nestjs/common';
import {BoxrecRole} from 'boxrec/dist/boxrec-pages/search/boxrec.search.constants';
import {Response} from 'express';
import {CustomRequest} from './check-if-logged-in.middleware';

/**
 * Certain endpoints will be redirected to the proper controller (boxer, judge, manager, etc.)
 */
@Injectable()
export class ProfileMiddleware implements NestMiddleware {
    use(req: CustomRequest, res: Response, next: () => void) {
        const {url} = req;
        const urlMatches: RegExpMatchArray = url.match(/(\w+)\/(\d+)$/);
        const roleValues: string[] = Object.values(BoxrecRole);

        if (urlMatches) {
            const role: BoxrecRole | null = roleValues.find(item => item === urlMatches[1]) as BoxrecRole;

            if (role) {
                // assigns this value for what kind of profile to retrieve
                req.url = `/profile/${urlMatches[2]}`;
                req.boxrecCustom.profile = role;
                next();
            } else {
                throw new Error('Could not parse role');
            }

        } else {
            throw new Error('Could not parse URL');
        }
    }
}