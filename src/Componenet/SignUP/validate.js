const validator = require("validator");

const validateSignUpForm = payload => {
    const errors = {};
    let message = "";
    let isFormValid = true;

    if (
        !payload ||
        typeof payload.FirstName !== "string" ||
        payload.FirstName.trim().length === 0
    ) {
        isFormValid = false;
        errors.FirstName = "Please provide a First name.";
    }
    if (
        !payload ||
        typeof payload.LastName !== "string" ||
        payload.LastName.trim().length === 0
    ) {
        isFormValid = false;
        errors.LastName = "Please provide a Last name.";
    }

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
        payload.Password.trim().length < 8
    ) {
        isFormValid = false;
        errors.Password = "Password must have at least 8 characters.";
    }

    if (!payload || payload.ConfirmPassword !== payload.Password) {
        isFormValid = false;
        errors.ConfirmPassword = "Password confirmation doesn't match.";
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
     export default validateSignUpForm;



