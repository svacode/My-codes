use newdb;
INSERT INTO Doctor (dct_id, dct_name, dct_address, dct_phonenum, dct_pass, Medical_specialty_dep_id, role)
VALUES
(201, 'Doctor A', '123 Healers Lane', 123456, 1234, 1, 2),
(202, 'Doctor B', '456 Healers Lane', 234567, 2345, 2, 2),
(203, 'Doctor C', '789 Healers Lane', 345678, 3456, 3, 2),
(204, 'Doctor D', '101 Healers Lane', 456789, 4567, 4, 2),
(205, 'Doctor E', '202 Healers Lane', 567890, 5678, 5, 2);


INSERT INTO Nurse (nurse_id, nurse_name, nurse_address, nurse_phonenum, nurse_pass, Medical_specialty_dep_id, role)
VALUES
(301, 'Nurse A', '123 Caregivers Avenue', 987654, 1234, 1, 3),
(302, 'Nurse B', '456 Caregivers Avenue', 876543, 2345, 2, 3),
(303, 'Nurse C', '789 Caregivers Avenue', 765432, 3456, 3, 3),
(304, 'Nurse D', '101 Caregivers Avenue', 654321, 4567, 4, 3),
(305, 'Nurse E', '202 Caregivers Avenue', 543210, 5678, 5, 3);


INSERT INTO Patient (patient_id, patient_name, patient_soc_secnum, patient_gender, patient_adsress, patient_bloodtype, patient_height, patient_weight, patient_phonenum, patient_pass, role)
VALUES
(401, 'Patient A', 123456789, 'Male', '123 Wellness Path', 'O+', 180, 75, 123456, 1234, 4),
(402, 'Patient B', 987654321, 'Female', '456 Wellness Path', 'A-', 160, 65, 234567, 2345, 4),
(403, 'Patient C', 123123123, 'Male', '789 Wellness Path', 'B+', 170, 70, 345678, 3456, 4),
(404, 'Patient D', 321321321, 'Female', '101 Wellness Path', 'AB-', 165, 55, 456789, 4567, 4),
(405, 'Patient E', 456456456, 'Male', '202 Wellness Path', 'A+', 175, 80, 567890, 5678, 4);


INSERT INTO admins (admin_id, admin_name, admin_pass, role)
VALUES
(101, 'Admin A', 1234, 1),
(102, 'Admin B', 1212, 1);

INSERT INTO Treatment (Nurse_nurse_id, Patient_patient_id, treat_datetime, treat_details)
VALUES
(301, 401, '2023-12-01 10:30:00', 'Administered medication to patient 401'),
(302, 402, '2023-12-02 12:00:00', 'Provided wound care to patient 402'),
(303, 403, '2023-12-03 14:45:00', 'Performed physical therapy for patient 403');

INSERT INTO Examination (Doctor_dct_id, Patient_patient_id, exam_date, exam_details)
 VALUES
(201, 401, '2023-12-01 10:00:00', 'Initial examination for patient 401'),
 (201, 402, '2023-12-02 11:30:00', 'Follow-up examination for patient 402'),
(202, 403, '2023-12-03 14:15:00', 'Diagnostic examination for patient 403');

ALTER TABLE examination
DROP FOREIGN KEY fk_Doctor_has_Patient_Doctor1;

ALTER TABLE examination
ADD CONSTRAINT fk_Doctor_has_Patient_Doctor1
FOREIGN KEY (Doctor_dct_id)
REFERENCES doctor (dct_id)
ON DELETE CASCADE;