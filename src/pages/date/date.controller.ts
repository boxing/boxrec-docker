import {Controller, Get, Param, Query, Req, Res} from '@nestjs/common';
import {Boxrec as boxrec} from 'boxrec';
import {BoxrecResultsParams} from 'boxrec/dist/boxrec-pages/results/boxrec.results.constants';
import {Response} from 'express';
import {CustomRequest} from '../../middleware/check-if-logged-in.middleware';

@Controller('date')
export class DateController {

    @Get()
    async findOne(@Req() req: CustomRequest, @Query() query: BoxrecResultsParams, @Res() res: Response, @Param() params): Promise<any> {
        const {year, month, day} = params;
        const dateObject = `${year}-${month}-${day}`;
        const output = await boxrec.getDate(req.boxrecCustom.cookieJar, dateObject);
        res.send(output.output);
    }

}
