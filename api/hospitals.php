<?php
require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if ($pdo) {
        $stmt = $pdo->query("SELECT * FROM hospitals ORDER BY created_at DESC");
        $hospitals = $stmt->fetchAll();
        echo json_encode(["status" => "success", "data" => $hospitals]);
    } else {
        // Mock fallback if DB offline
        echo json_encode([
            "status" => "success",
            "data" => [
                [
                    "hospital_id" => "HOSP-8921",
                    "name" => "St. Jude Medical Center",
                    "slug" => "stjude.medipulse.org",
                    "city" => "New York, NY",
                    "admin_name" => "Dr. Sarah Jenkins",
                    "admin_email" => "admin@stjude.org",
                    "admin_password" => "StJudeAdmin@8921",
                    "doctor_count" => 48,
                    "patient_count" => 1420,
                    "join_date" => "2026-01-10",
                    "plan" => "Enterprise",
                    "beds" => "450 Beds",
                    "status" => "Active"
                ],
                [
                    "hospital_id" => "HOSP-4410",
                    "name" => "City Care Trauma Institute",
                    "slug" => "citycare.medipulse.org",
                    "city" => "Chicago, IL",
                    "admin_name" => "Dr. Marcus Brody",
                    "admin_email" => "admin@citycare.org",
                    "admin_password" => "CityCarePass@4410",
                    "doctor_count" => 32,
                    "patient_count" => 890,
                    "join_date" => "2026-02-01",
                    "plan" => "Premium",
                    "beds" => "280 Beds",
                    "status" => "Active"
                ],
                [
                    "hospital_id" => "HOSP-3109",
                    "name" => "Metro Pediatrics Hospital",
                    "slug" => "metroped.medipulse.org",
                    "city" => "Los Angeles, CA",
                    "admin_name" => "Dr. Elena Rostova",
                    "admin_email" => "admin@metroped.org",
                    "admin_password" => "MetroPass@3109",
                    "doctor_count" => 26,
                    "patient_count" => 610,
                    "join_date" => "2026-02-12",
                    "plan" => "Enterprise",
                    "beds" => "320 Beds",
                    "status" => "Active"
                ],
                [
                    "hospital_id" => "HOSP-7023",
                    "name" => "Apex Heart & Vascular Clinic",
                    "slug" => "apexheart.medipulse.org",
                    "city" => "Houston, TX",
                    "admin_name" => "Dr. Arthur Pendelton",
                    "admin_email" => "admin@apexheart.org",
                    "admin_password" => "ApexPass@7023",
                    "doctor_count" => 18,
                    "patient_count" => 340,
                    "join_date" => "2026-08-05",
                    "plan" => "Standard",
                    "beds" => "120 Beds",
                    "status" => "Suspended"
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
    $admin_name = !empty($input['admin_name']) ? $input['admin_name'] : 'Dr. Admin';
    $admin_email = !empty($input['admin_email']) ? $input['admin_email'] : 'admin@' . strtolower(preg_replace('/[^a-z0-9]/', '', $name)) . '.org';
    $admin_password = !empty($input['admin_password']) ? $input['admin_password'] : 'HospAdmin@' . rand(1000, 9999);
    $doctor_count = !empty($input['doctor_count']) ? (int)$input['doctor_count'] : 15;
    $patient_count = !empty($input['patient_count']) ? (int)$input['patient_count'] : 150;
    $join_date = date('Y-m-d');
    $plan = !empty($input['plan']) ? $input['plan'] : 'Enterprise';
    $beds = !empty($input['beds']) ? $input['beds'] : '200 Beds';

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO hospitals (hospital_id, name, slug, city, admin_name, admin_email, admin_password, doctor_count, patient_count, join_date, plan, beds, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Active')");
        $stmt->execute([$hospital_id, $name, $slug, $city, $admin_name, $admin_email, $admin_password, $doctor_count, $patient_count, $join_date, $plan, $beds]);
    }

    echo json_encode([
        "status" => "success",
        "message" => "Hospital created successfully!",
        "data" => [
            "hospital_id" => $hospital_id,
            "name" => $name,
            "slug" => $slug,
            "city" => $city,
            "admin_name" => $admin_name,
            "admin_email" => $admin_email,
            "admin_password" => $admin_password,
            "doctor_count" => $doctor_count,
            "patient_count" => $patient_count,
            "join_date" => $join_date,
            "plan" => $plan,
            "beds" => $beds,
            "status" => "Active"
        ]
    ]);
} elseif ($method === 'PUT') {
    $input = json_decode(file_get_contents('php://input'), true);
    $hospital_id = $input['hospital_id'] ?? null;
    $new_status = $input['status'] ?? null;

    if ($hospital_id && $new_status && $pdo) {
        $stmt = $pdo->prepare("UPDATE hospitals SET status = ? WHERE hospital_id = ?");
        $stmt->execute([$new_status, $hospital_id]);
    }

    echo json_encode(["status" => "success", "message" => "Hospital status updated to " . $new_status]);
}
?>
