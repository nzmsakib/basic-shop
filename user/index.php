<?php
    include '../inc/header.php';
?>

<div class="space-v"></div>
<main id="userBody">
    <div class="container">
        <div class="login-reg-form-container mx-auto">
            <form id="loginForm" name="loginForm" onsubmit="return false" novalidate>
                <div class="form-group">
                    <input class="form-control" type="text" name="Email" id="Email" placeholder="Email Address">
                    <div class="invalid-feedback" id="emailInvalidText"></div>
                </div>
                <div class="form-group">
                    <input class="form-control" type="password" name="Password" id="Password" placeholder="Password">
                    <div class="invalid-feedback" id="passwordInvalidText"></div>
                </div>
                <button onclick="submitLoginForm()" class="btn btns-primary">
                    Login or Register
                </button>
            </form>
        </div>
    </div>
</main>
<div class="space-v"></div>

<?php
    include '../inc/footer.php';
?>