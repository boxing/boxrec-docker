import {Controller, Get, Param, Req, Res} from '@nestjs/common';
import {Boxrec as boxrec} from 'boxrec';
import {Response} from 'express';
import {CustomRequest} from '../../middleware/check-if-logged-in.middleware';

@Controller('boxer')
export class BoxerController {

    @Get(':id')
    async findOne(@Req() req: CustomRequest, @Res() res: Response, @Param() params: { id: number }): Promise<any> {
        const output = await boxrec.getPersonById(req.boxrecCustom.cookieJar, params.id);
        res.send(output.output);
    }

}
