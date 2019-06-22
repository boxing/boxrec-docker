import {Controller, Get, Param, Query, Req, Res} from '@nestjs/common';
import {Boxrec as boxrec} from 'boxrec';
import {BoxrecScheduleParams} from 'boxrec/dist/boxrec-pages/schedule/boxrec.schedule.constants';
import {Response} from 'express';
import {CustomRequest} from '../../middleware/check-if-logged-in.middleware';

@Controller('schedule')
export class ScheduleController {

    @Get()
    async findOne(@Req() req: CustomRequest, @Query() query: BoxrecScheduleParams, @Res() res: Response, @Param() params): Promise<any> {
        const output = await boxrec.getSchedule(req.boxrecCustom.cookieJar, query);
        res.send(output.output);
    }

}
