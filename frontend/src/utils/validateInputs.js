const USERNAME_REGEX = /^[A-Za-z0-9_]+$/;

function validateInputs(username, password) {

    if (!username || !password) {
        return {status: false, error: 'All the fields are mandatory'};
    }

    if (!USERNAME_REGEX.test(username)) {
        return {status: false, error: 'Username only contains letter(A-z), number(1-9) and underscore(_)'};
    }

    if (password.length <= 4) {
        return {status: false, error: 'Password must be maximum that 4 characters'};
    }

    return {status: true};
}

export default validateInputs;