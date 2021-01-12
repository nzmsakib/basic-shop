<?php
    include '../inc/header.php';
?>

<div class="space-v"></div>
<main id="userBody">
    <div class="container">
        <div class="login-reg-form-container mx-auto bg-light">
            <div class="propic-far">
                <div class="propic-close centre-vh">
                    <img id="propic" class="centre-vh" src="<?php echo BASE_URL; ?>/assets/img/user_default.png" alt="">
                </div>
                <h5 id="userGreeting">Welcome! <strong id="username">Guest</strong></h5>
            </div>
            <form id="loginForm" name="loginForm" onsubmit="return false" novalidate autocomplete="off">
                <div class="form-group">
                    <input class="form-control" type="text" name="Email" id="Email" 
                            placeholder="Email Address">
                    <div class="invalid-feedback" id="emailInvalidText"></div>
                </div>
                <div id="forLogin">
                    <div class="form-group">
                        <input class="form-control" type="password" name="Password" id="Password"
                            placeholder="Password">
                        <div class="invalid-feedback" id="passwordInvalidText"></div>
                    </div>
                </div>
                <div id="forRegister">
                    <div class="form-group">
                        <input class="form-control" type="password" name="rPassword" id="rPassword"
                            placeholder="Repeat Password">
                        <div class="invalid-feedback" id="rPasswordInvalidText"></div>
                    </div>
                    <div class="form-group">
                        <input class="form-control" type="text" name="Name" id="Name" placeholder="Name">
                        <div class="invalid-feedback" id="nameInvalidText"></div>
                    </div>
                    <div class="custom-control custom-switch mb-2">
                        <input type="checkbox" class="custom-control-input" id="Usertype" name="Usertype">
                        <label class="custom-control-label" for="Usertype">I want to be a vendor.</label>
                    </div>
                </div>
                <button onclick="checkEmail()" class="btn btn-primary d-block mx-auto" id="submit">
                    Next
                </button>
            </form>
        </div>
    </div>
</main>

<?php
    include '../inc/footer.php';
?>