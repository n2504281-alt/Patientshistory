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
                    "hospital_id" => "HOSP-1001",
                    "name" => "Al-Shifa General Hospital",
                    "slug" => "alshifa.medicore.os",
                    "city" => "Lahore",
                    "admin_name" => "Farhan Iqbal",
                    "admin_email" => "farhan@alshifa.org",
                    "admin_password" => "AlShifaPass@1001",
                    "doctor_count" => 34,
                    "patient_count" => 5210,
                    "join_date" => "2026-01-15",
                    "beds" => "450 Beds",
                    "status" => "Active"
                ],
                [
                    "hospital_id" => "HOSP-1002",
                    "name" => "City Care Medical Complex",
                    "slug" => "citycare.medicore.os",
                    "city" => "Karachi",
                    "admin_name" => "Sana Malik",
                    "admin_email" => "sana@citycare.org",
                    "admin_password" => "CityCarePass@1002",
                    "doctor_count" => 21,
                    "patient_count" => 3110,
                    "join_date" => "2026-02-01",
                    "beds" => "320 Beds",
                    "status" => "Active"
                ],
                [
                    "hospital_id" => "HOSP-1003",
                    "name" => "Green Valley Hospital",
                    "slug" => "greenvalley.medicore.os",
                    "city" => "Islamabad",
                    "admin_name" => "Bilal Ahmed",
                    "admin_email" => "bilal@greenvalley.org",
                    "admin_password" => "GreenValley@1003",
                    "doctor_count" => 9,
                    "patient_count" => 940,
                    "join_date" => "2026-08-10",
                    "beds" => "150 Beds",
                    "status" => "Trial"
                ],
                [
                    "hospital_id" => "HOSP-1004",
                    "name" => "Al-Noor Clinic Network",
                    "slug" => "alnoor.medicore.os",
                    "city" => "Faisalabad",
                    "admin_name" => "Ayesha Raza",
                    "admin_email" => "ayesha@alnoor.org",
                    "admin_password" => "AlNoorPass@1004",
                    "doctor_count" => 6,
                    "patient_count" => 480,
                    "join_date" => "2026-03-20",
                    "beds" => "80 Beds",
                    "status" => "Suspended"
                ],
                [
                    "hospital_id" => "HOSP-1005",
                    "name" => "Sunrise Children's Hospital",
                    "slug" => "sunrise.medicore.os",
                    "city" => "Multan",
                    "admin_name" => "Usman Tariq",
                    "admin_email" => "usman@sunrise.org",
                    "admin_password" => "SunrisePass@1005",
                    "doctor_count" => 14,
                    "patient_count" => 2075,
                    "join_date" => "2026-04-05",
                    "beds" => "200 Beds",
                    "status" => "Active"
                ],
                [
                    "hospital_id" => "HOSP-1006",
                    "name" => "Metro Care Hospital",
                    "slug" => "metrocare.medicore.os",
                    "city" => "Rawalpindi",
                    "admin_name" => "Dr. Tariq Shah",
                    "admin_email" => "tariq@metrocare.org",
                    "admin_password" => "MetroPass@1006",
                    "doctor_count" => 10,
                    "patient_count" => 1200,
                    "join_date" => "2026-05-12",
                    "beds" => "180 Beds",
                    "status" => "Active"
                ],
                [
                    "hospital_id" => "HOSP-1007",
                    "name" => "Apex Heart Institute",
                    "slug" => "apexheart.medicore.os",
                    "city" => "Peshawar",
                    "admin_name" => "Dr. Zaid Khan",
                    "admin_email" => "zaid@apexheart.org",
                    "admin_password" => "ApexPass@1007",
                    "doctor_count" => 6,
                    "patient_count" => 435,
                    "join_date" => "2026-08-02",
                    "beds" => "100 Beds",
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

    $hospital_id = !empty($input['hospital_id']) ? $input['hospital_id'] : 'HOSP-' . rand(1000, 9999);
    $name = $input['name'];
    $slug = strtolower(preg_replace('/[^a-z0-9]/', '', $name)) . '.medicore.os';
    $city = !empty($input['city']) ? $input['city'] : 'Central Region';
    $admin_name = !empty($input['admin_name']) ? $input['admin_name'] : 'Dr. Admin';
    $admin_email = !empty($input['admin_email']) ? $input['admin_email'] : 'admin@' . strtolower(preg_replace('/[^a-z0-9]/', '', $name)) . '.org';
    $admin_password = !empty($input['admin_password']) ? $input['admin_password'] : 'Pass@' . rand(1000, 9999);
    $doctor_count = !empty($input['doctor_count']) ? (int)$input['doctor_count'] : 15;
    $patient_count = !empty($input['patient_count']) ? (int)$input['patient_count'] : 150;
    $join_date = date('Y-m-d');
    $beds = !empty($input['beds']) ? $input['beds'] : '200 Beds';
    $status = !empty($input['status']) ? $input['status'] : 'Active';

    if ($pdo) {
        $stmt = $pdo->prepare("INSERT INTO hospitals (hospital_id, name, slug, city, admin_name, admin_email, admin_password, doctor_count, patient_count, join_date, beds, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$hospital_id, $name, $slug, $city, $admin_name, $admin_email, $admin_password, $doctor_count, $patient_count, $join_date, $beds, $status]);
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
            "beds" => $beds,
            "status" => $status
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
