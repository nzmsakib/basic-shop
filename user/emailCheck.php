<?php
    if (!isset($_POST['check'])) {

    } else {
        $email = $_POST['email'];

        require '../inc/db.php';
        $stmt = mysqli_stmt_init($conn);
        $sql = "SELECT id, name, propic FROM users WHERE email = ?";
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
                if (mysqli_num_rows($result) !== 1) {
                    echo '{"status": 1, "reply": 0}';
                    exit();
                } else {
                    $row = mysqli_fetch_assoc($result);
                    echo '{"status": 1, "reply": 1, "id": '.$row['id'].', "name": "'.$row['name'].'", "propic": "'.$row['propic'].'"}';
                }
            }
        }
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    }

?>