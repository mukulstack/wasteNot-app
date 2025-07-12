// auth.controller.js

async function signup(req, res, next) {
    res.send("signup controller + router");
}

async function login(req, res, next) {
    res.send("login controller + router");
}


async function logout(req, res, next) {
    res.send("logout controller + router");
}

export { signup, login, logout };