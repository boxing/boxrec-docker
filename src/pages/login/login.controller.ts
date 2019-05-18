import {Body, Controller, Post, BadRequestException, HttpCode} from '@nestjs/common';
import {Boxrec} from 'boxrec';
import {CookieJar} from 'request';
import {LoginDto} from './login.dto';

@Controller('login')
export class LoginController {

    @Post()
    @HttpCode(200)
    async login(@Body() body: LoginDto): Promise<any> {
        try {
            const cookieJar: CookieJar = await Boxrec.login(body.username, body.password);
            return cookieJar.getCookies('http://boxrec.com');
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

}
