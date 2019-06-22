import {Controller, Get, Param, Query, Req, Res} from '@nestjs/common';
import {Boxrec as boxrec} from 'boxrec';
import {BoxrecRatingsParams} from 'boxrec/dist/boxrec-pages/ratings/boxrec.ratings.constants';
import {Response} from 'express';
import {CustomRequest} from '../../middleware/check-if-logged-in.middleware';

@Controller('ratings')
export class RatingsController {

    @Get()
    async findOne(@Req() req: CustomRequest, @Query() query: BoxrecRatingsParams, @Res() res: Response, @Param() params): Promise<any> {
        const output = await boxrec.getRatings(req.boxrecCustom.cookieJar, query);
        res.send(output.output);
    }

}
