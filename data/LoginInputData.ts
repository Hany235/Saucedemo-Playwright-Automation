export interface LoginTestData {
    description: string;
    username: string;
    password: string;
    errorMessage?: string;
}

export const validUser: LoginTestData = {
    description: 'valid credentials',
    username: 'standard_user',
    password: 'secret_sauce',
};

export const invalidLoginCases: LoginTestData[] = [
    {
        description: 'wrong username',
        username: 'invalid_user',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        description: 'wrong password',
        username: 'standard_user',
        password: 'invalid_password',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        description: 'wrong username and password',
        username: 'invalid_user',
        password: 'invalid_password',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        description: 'space in username',
        username: ' ',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        description: 'space in password',
        username: 'standard_user',
        password: ' ',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        description: 'space in both username and password',
        username: ' ',
        password: ' ',
        errorMessage: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
        description: 'blank username',
        username: '',
        password: 'secret_sauce',
        errorMessage: 'Epic sadface: Username is required',
    },
    {
        description: 'blank password',
        username: 'standard_user',
        password: '',
        errorMessage: 'Epic sadface: Password is required',
    },
    {
        description: 'blank username and password',
        username: '',
        password: '',
        errorMessage: 'Epic sadface: Username is required',
    },
];
