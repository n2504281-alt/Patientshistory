<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $email = !empty($input['email']) ? trim($input['email']) : '';
    $password = !empty($input['password']) ? trim($input['password']) : '';

    if (empty($email) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Email and password are required."]);
        exit();
    }

    if ($pdo) {
        $stmt = $pdo->prepare("SELECT * FROM hospitals WHERE admin_email = ? AND admin_password = ?");
        $stmt->execute([$email, $password]);
        $hospital = $stmt->fetch();

        if ($hospital) {
            echo json_encode([
                "status" => "success",
                "role" => "hospital_admin",
                "data" => $hospital
            ]);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid admin credentials or Hospital ID."]);
        }
    } else {
        // Fallback demo authentication response
        echo json_encode([
            "status" => "success",
            "role" => "hospital_admin",
            "data" => [
                "hospital_id" => "HOSP-8921",
                "name" => "St. Jude Medical Center",
                "admin_email" => $email
            ]
        ]);
    }
}
?>
