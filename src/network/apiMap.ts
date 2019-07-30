interface ApiMap {
    [index: string]: string;
}

// tslint:disable-next-line:no-angle-bracket-type-assertion
export default <ApiMap> {
    login: 'api/login',
    register: 'api/register',
    home: 'api/user',
    upload: 'api/upload',
    relevance: 'api/relevancePhoto',
};
