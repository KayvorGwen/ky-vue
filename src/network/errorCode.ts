
interface ErrorCode {
    [index: number]: string;
    [index: string]: string;
}

// tslint:disable-next-line:no-angle-bracket-type-assertion
const errorCode = <ErrorCode> {
    0: '操作成功',
    99: '操作失败',
    1: '参数不对',
    2: '非法请求'
};


export default errorCode;
