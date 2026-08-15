<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM hospitals ORDER BY created_at DESC");
        $hospitals = $stmt->fetchAll();
        echo json_encode(["status" => "success", "data" => $hospitals]);
    } else {
        // Fallback default mock data if DB not connected yet
        echo json_encode([
            "status" => "success",
            "data" => [
                [
                    "hospital_id" => "HOSP-8921",
                    "name" => "St. Jude Medical Center",
                    "slug" => "stjude.medipulse.org",
                    "city" => "New York, NY",
                    "admin_email" => "admin@stjude.org",
                    "admin_password" => "StJudeAdmin@8921",
                    "plan" => "Enterprise",
                    "beds" => "450 Beds",
                    "status" => "Active"
                ],
                [
                    "hospital_id" => "HOSP-4410",
                    "name" => "City Care Trauma Institute",
                    "slug" => "citycare.medipulse.org",
                    "city" => "Chicago, IL",
                    "admin_email" => "admin@citycare.org",
                    "admin_password" => "CityCarePass@4410",
                    "plan" => "Premium",
                    "beds" => "280 Beds",
                    "status" => "Active"
                ]
            ]
        ]);
    }
} elseif ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (empty($input['name'])) {
        echo json_encode(["status" => "error", "message" => "Hospital name is required."]);
        exit();
    }

    $hospital_id = !empty($input['unique_id']) ? $input['unique_id'] : 'HOSP-' . rand(1000, 9999);
    $name = $input['name'];
    $slug = strtolower(preg_replace('/[^a-z0-9]/', '', $name)) . '.medipulse.org';
    $city = !empty($input['city']) ? $input['city'] : 'Central Region';
    $admin_email = !empty($input['admin_email']) ? $input['admin_email'] : 'admin@' . strtolower(preg_replace('/[^a-z0-9]/', '', $name)) . '.org';
    $admin_password = !empty($input['admin_password']) ? $input['admin_password'] : 'HospAdmin@' . rand(1000, 9999);
    $plan = !empty($input['plan']) ? $input['plan'] : 'Enterprise';
    $beds = !empty($input['beds']) ? $input['beds'] : '200 Beds';
    $license_key = 'MP-' . str_replace('HOSP-', '', $hospital_id) . '-KEY';

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO hospitals (hospital_id, name, slug, city, admin_email, admin_password, plan, beds, license_key, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')");
        $stmt->execute([$hospital_id, $name, $slug, $city, $admin_email, $admin_password, $plan, $beds, $license_key]);
    }

    echo json_encode([
        "status" => "success",
        "message" => "Hospital created successfully!",
        "data" => [
            "hospital_id" => $hospital_id,
            "name" => $name,
            "slug" => $slug,
            "city" => $city,
            "admin_email" => $admin_email,
            "admin_password" => $admin_password,
            "plan" => $plan,
            "beds" => $beds,
            "license_key" => $license_key,
            "status" => "Active"
        ]
    ]);
}
?>
