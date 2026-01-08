
function setCookie(res, token, maxAge = 15 * 24 * 60 * 60 * 1000) {
    res.cookie('token', token, {
        maxAge,
        httpOnly: true,
        sameSite: "Strict",
    })

    return true;
}

module.exports = { setCookie };