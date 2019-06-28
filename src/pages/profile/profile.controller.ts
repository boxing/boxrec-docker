import {Controller, Get, Param, Req, Res} from '@nestjs/common';
import {Boxrec as boxrec} from 'boxrec';
import {Response} from 'express';
import {CustomRequest} from '../../middleware/check-if-logged-in.middleware';

/**
 * Controller for all profiles, we use profile.middleware.ts to catch the requests and manipulate it so we can get the person/role that we want
 */
@Controller('profile')
export class ProfileController {

    @Get(':id')
    async findOne(@Req() req: CustomRequest, @Res() res: Response, @Param() params: { id: number }): Promise<any> {
        const output = await boxrec.getPersonById(req.boxrecCustom.cookieJar, params.id, req.boxrecCustom.profile);
        res.send(output.output);
    }

}
