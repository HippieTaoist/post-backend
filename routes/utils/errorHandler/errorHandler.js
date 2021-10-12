function errorHandler(err) {
    let message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = parsedErrorMessage(err);
                break;
            default:
                message = "something went wrong, please contact support"
        }
    } else if (err.message) {
        return err.message;
    }

    return message;
}


module.exports = errorHandler