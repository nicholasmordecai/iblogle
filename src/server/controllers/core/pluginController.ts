import { BaseController } from './../baseController';

export class Plugin extends BaseController {
    protected foo() {
        console.log('foo');
    }
}