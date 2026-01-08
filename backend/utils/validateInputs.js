const USERNAME_REGEX = /^[A-Za-z0-9_]+$/;

function validateInputs(inputs) {
    for (const inputName in inputs) {
        if ( !(inputs[inputName])  || !(inputs[inputName].replaceAll(' ', '')) ) {
            return { status: false, statusCode: 422, error: 'All the fields are mandatory' };
        }
    }

    if (!USERNAME_REGEX.test(inputs.username)) {
        return {status: false, statusCode: 400, error: 'Username only contains letter(A-z), number(1-9) and underscore(_)'};
    }

    if ( inputs.password.length < 5 ) {
        return { status: false, statusCode: 422, msg: 'Password must be maximum than 4 characters' };
    }

    return { status : true };

}

module.exports = { validateInputs };