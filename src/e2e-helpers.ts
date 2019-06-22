import {Test} from '@nestjs/testing';
import {AppModule} from './app.module';

function createTestModule() {
    return Test.createTestingModule({
        imports: [AppModule],
        providers: [],
    }).compile();
}

export {
    createTestModule,
};
