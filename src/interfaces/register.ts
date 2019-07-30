interface RegisterConfig {
    username: string;
    password: string;
}

interface RegisterResult {
    userId: string;
    token: string;
}

export {
    RegisterConfig,
    RegisterResult,
};
