function Validation(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;


    // Log the email value
    console.log("Email value:", values.email);

    if (values.email === "") {
        error.email = "Email should not be empty";
    } else {
        // Log the result of the email regex test
        console.log("Email pattern test result:", email_pattern.test(values.email));
        
        if (!email_pattern.test(values.email)) {
            error.email = "Email did not match the pattern";
        } else {
            error.email = "";
        }
    }

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password did not match the pattern";
    } else {
        error.password = "";
    }

    return error;
}

export default Validation;
