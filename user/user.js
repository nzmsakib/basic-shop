$(document).ready(function() {
    // Login Form Live Validation starts
    $("#Email").on('input', validateEmail);
    $("#Password").on('input', validatePassword);
        // Login Form Live Validation ends
});

function validateEmail() {
    if (this.value == "") {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
        document.getElementById("emailInvalidText").innerHTML = "Email should not be empty.";
    } else {
        var email = this.value;
        var separator = email.match(/[@]/g);
        if (!separator || (separator && separator.length != 1)) {
            this.classList.remove("is-valid");
            this.classList.add("is-invalid");
            document.getElementById("emailInvalidText").innerHTML = "Invalid Email Format.";
        } else if (separator && separator.length == 1) {
            var sepIdx = email.indexOf("@");
            var fullstopIdx = email.lastIndexOf(".");
            if (sepIdx == 0 || sepIdx > fullstopIdx || fullstopIdx == email.length - 1 || sepIdx + 1 == fullstopIdx) {
                this.classList.remove("is-valid");
                this.classList.add("is-invalid");
                document.getElementById("emailInvalidText").innerHTML = "Invalid Email Format.";
            } else {
                this.classList.remove("is-invalid");
                this.classList.add("is-valid");
            }
        }
    }
}

function validatePassword() {
    if (this.value == "") {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
        document.getElementById("passwordInvalidText").innerHTML = "Password should not be empty.";
    } else if (this.value.length < 4) {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
        document.getElementById("passwordInvalidText").innerHTML = "Password should be at least 4 characters.";
    } else if (!(/[0-9]/.test(this.value) && /[a-z]|[A-Z]/.test(this.value))) {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
        document.getElementById("passwordInvalidText").innerHTML = "Password should contain at least one digit and one letter.";
    } else {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    }
}

function submitLoginForm() {

}