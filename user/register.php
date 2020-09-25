<?php
    if (!isset($_POST['reg'])) {

    } else {
        $email = $_POST['email'];
        $pwd = $_POST['password'];
        $name = $_POST['name'];
        $vnd = $_POST['vendor'];

        require '../inc/db.php';
        $stmt = mysqli_stmt_init($conn);
        $sql = "INSERT INTO users (email, password, name, is_vendor) VALUES (?, ?, ?, ?)";
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            echo '{"status": 0, "reply": "'.mysqli_stmt_error($stmt).'"}';
            exit();
        } else {
            $pwdhash = password_hash($pwd, PASSWORD_DEFAULT);
            mysqli_stmt_bind_param($stmt, 'sssi', $email, $pwdhash, $name, $vnd);
            mysqli_execute($stmt);

            if (!empty(mysqli_stmt_error($stmt))) {
                echo '{"status": 0, "reply": "'.mysqli_stmt_error($stmt).'"}';
                exit();
            } else {
                echo '{"status": 1, "reply": "Registration Successful."}';
            }
        }
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    }

?>