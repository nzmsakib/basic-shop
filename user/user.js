$(document).ready(function() {
    // Login Form Live Validation starts
    $("#Email").on('input', validateEmail);
    $("#Password").on('input', validatePassword);
    $("#rPassword").on('input', function(){
        validateRepeatPassword.call(this, document.getElementById("Password"));
    });
    $("#Name").on('input', validateName);
    
    // Login Form Live Validation ends
});

function existingUser(name, propic) {
    var nam = document.getElementById("username");
    var pro = document.getElementById("propic");
    nam.innerHTML = name;
    pro.src = document.getElementById("BASE_URL").innerHTML + "/" + propic;
}

function invalidField(field, msg = "", msgId = "") {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
    if (msg.length > 0 && msgId.length > 0)
        document.getElementById(msgId).innerHTML = msg;
}

function validField(field, msg = "", msgId = "") {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    if (msg.length > 0 && msgId.length > 0)
        document.getElementById(msgId).innerHTML = msg;
}

function validateEmail() {
    if (this.value == "") {
        invalidField(this, "Email should not be empty.", "emailInvalidText");
    } else {
        var email = this.value;
        var separator = email.match(/[@]/g);
        if (!separator || (separator && separator.length != 1)) {
            invalidField(this, "Invalid Email Format.", "emailInvalidText");
        } else if (separator && separator.length == 1) {
            var sepIdx = email.indexOf("@");
            var fullstopIdx = email.lastIndexOf(".");
            if (sepIdx == 0 || sepIdx > fullstopIdx || fullstopIdx == email.length - 1 || sepIdx + 1 == fullstopIdx) {
                invalidField(this, "Invalid Email Format.", "emailInvalidText");
            } else {
                validField(this);
            }
        }
    }
}

function validatePassword() {
    if (this.value == "") {
        invalidField(this, "Password should not be empty.", "passwordInvalidText");
    } else if (this.value.length < 4) {
        invalidField(this, "Password should be at least 4 characters.", "passwordInvalidText");
    } else if (!(/[0-9]/.test(this.value) && /[a-z]|[A-Z]/.test(this.value))) {
        invalidField(this, "Password should contain at least one digit and one letter.", "passwordInvalidText");
    } else {
        validField(this);
    }
}

function validateRepeatPassword(previousPasswordField) {
    if (previousPasswordField.value == "") {
        invalidField(this, "Password should not be empty.", "rPasswordInvalidText");
    }else if (this.value != previousPasswordField.value) {
        invalidField(this, "Repeated Password do not match.", "rPasswordInvalidText");
    } else {
        validField(this);
    }
}

function validateName() {
    if (this.value == "") {
        invalidField(this, "Name should not be empty.", "nameInvalidText");
    } else {
        var charMatch = this.value.match(/[a-zA-Z]/g);
        var spaceMatch = this.value.match(/[ ]/g);
        var chars = charMatch ? charMatch.length : 0;
        var spaces = spaceMatch ? spaceMatch.length : 0;
        if (chars < 2) {
            invalidField(this, "Name should contain at least 2 letters.", "nameInvalidText");
        } else if (chars + spaces != this.value.length) {
            invalidField(this, "Name should contain only letters and spaces", "nameInvalidText");
        } else if (this.value.length > 25) {
            invalidField(this, "Name should be at most 25 characters.", "nameInvalidText");
        } else {
            validField(this);
        }
    }
}

function checkEmail() {
    var form = document.getElementById("loginForm");
    var email = document.getElementById("Email");
    validateEmail.call(email);
    var canSubmit = form.querySelectorAll(".is-invalid").length == 0;
    if (canSubmit) {
        var btn = document.getElementById("submit");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var respText = this.responseText.toString();
                var resp = JSON.parse(respText);

                if (resp.status == 1) {
                    if (resp.reply == 1) {
                        existingUser(resp.name, resp.propic);
                        $("#forLogin").slideDown("slow");
                        btn.innerHTML = "Login";
                        btn.onclick = loginRequest;
                    } else if (resp.reply == 0) {
                        $("#forLogin").slideDown("fast", function(){$("#forRegister").slideDown("fast");});
                        btn.innerHTML = "Register";
                        btn.onclick = registerRequest;
                    }
                } else if (resp.status == 0) {
                    alert(resp.reply)
                }
            }
        };
        xhttp.open("POST", "emailCheck.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("check=1&email=" + email.value);
    }
}

function loginRequest() {
    var form = document.getElementById("loginForm");
    var email = document.getElementById("Email");
    var password = document.getElementById("Password");
    validateEmail.call(email);
    validatePassword.call(password);
    var canSubmit = form.querySelectorAll(".is-invalid").length == 0;
    if (canSubmit) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var respText = this.responseText.toString();
                var resp = JSON.parse(respText);

                if (resp.status == 1) {
                    location.href = "dashboard/?id=" + resp.id;
                } else if (resp.status == 0) {
                    alert(resp.reply)
                }
            }
        };
        xhttp.open("POST", "login.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("log=1&email=" + email.value + "&password=" + password.value);
    }
}

function registerRequest() {
    var form = document.getElementById("loginForm");
    var email = document.getElementById("Email");
    var password = document.getElementById("Password");
    var rpassword = document.getElementById("rPassword");
    var name = document.getElementById("Name");
    var vendor = document.getElementById("Usertype");
    validateEmail.call(email);
    validatePassword.call(password);
    validateRepeatPassword.call(rpassword, document.getElementById("Password"));
    validateName.call(name);

    var canSubmit = form.querySelectorAll(".is-invalid").length == 0;
    if (canSubmit) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var respText = this.responseText.toString();
                var resp = JSON.parse(respText);

                if (resp.status == 1) {
                    alert(resp.reply);
                    location.reload();
                } else if (resp.status == 0) {
                    alert(resp.reply)
                }
            }
        };
        xhttp.open("POST", "register.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("reg=1&email=" + email.value + "&password=" + password.value + "&name=" + name.value + "&vendor=" + vendor.checked);
    }
}