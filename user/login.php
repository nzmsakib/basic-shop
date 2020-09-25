<?php
    if (!isset($_POST['log'])) {

    } else {
        $email = $_POST['email'];
        $pwd = $_POST['password'];

        require '../inc/db.php';
        $stmt = mysqli_stmt_init($conn);
        $sql = "SELECT id, password FROM users WHERE email = ?";
        if (!mysqli_stmt_prepare($stmt, $sql)) {
            echo '{"status": 0, "reply": "'.mysqli_stmt_error($stmt).'"}';
            exit();
        } else {
            mysqli_stmt_bind_param($stmt, 's', $email);
            mysqli_execute($stmt);
            if (!empty(mysqli_stmt_error($stmt))) {
                echo '{"status": 0, "reply": "'.mysqli_stmt_error($stmt).'"}';
                exit();
            } else {
                $result = mysqli_stmt_get_result($stmt);
                $row = mysqli_fetch_assoc($result);
                if (!password_verify($pwd, $row['password'])) {
                    echo '{"status": 0, "reply": "Wrong password!"}';
                    exit();
                } else {
                    echo '{"status": 1, "reply": 1, "id": '.$row['id'].'}';
                }
            }
        }
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    }

?>