
import { Toast } from 'vant';
import code from './errorCode';


const errorHandlers = {
    // tslint:disable-next-line:object-literal-key-quotes
    ['106']() {
        Toast(code['106']);
    },
    // tslint:disable-next-line:no-empty
    ['5001']() {

    },
    default(code: number|string , msg: string) {
        // tslint:disable-next-line:no-console
        console.log(`unknown error:${msg}`);
        Toast(msg);
    },
    abort(msg: string) {
        Toast(msg);
    }
};



export default errorHandlers;
