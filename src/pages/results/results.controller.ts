import {Controller, Get, Param, Query, Req, Res} from '@nestjs/common';
import {Boxrec as boxrec} from 'boxrec';
import {BoxrecResultsParams} from 'boxrec/dist/boxrec-pages/results/boxrec.results.constants';
import {Response} from 'express';
import {CustomRequest} from '../../middleware/check-if-logged-in.middleware';

@Controller('results')
export class ResultsController {

    @Get()
    async findOne(@Req() req: CustomRequest, @Query() query: BoxrecResultsParams, @Res() res: Response, @Param() params): Promise<any> {
        const output = await boxrec.getResults(req.boxrecCustom.cookieJar, query);
        res.send(output.output);
    }

}
