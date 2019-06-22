import {Test} from '@nestjs/testing';
import {AppModule} from './app.module';

jest.setTimeout(30000);

function createTestModule() {
    return Test.createTestingModule({
        imports: [AppModule],
        providers: [],
    }).compile();
}

export {
    createTestModule,
};
