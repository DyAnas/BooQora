const validator = require("validator");
const validateLoginForm = payload => {
    const errors = {};
    let message = "";
    let isFormValid = true;

    if (
        !payload ||
        typeof payload.Email !== "string" ||
        !validator.isEmail(payload.Email)
    ) {
        isFormValid = false;
        errors.Email = "Please provide a correct email address.";
    }

    if (
        !payload ||
        typeof payload.Password !== "string" ||
        payload.Password.trim().length === 0
    ) {
        isFormValid = false;
        errors.Password = "Please provide your password.";
    }

    if (!isFormValid) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}


export default validateLoginForm;