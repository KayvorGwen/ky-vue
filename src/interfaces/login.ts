interface LoginConfig {
    username: string;
    password: string;
}

interface LoginResult {
    userId: string;
    token: string;
}

export {
    LoginConfig,
    LoginResult,
};
