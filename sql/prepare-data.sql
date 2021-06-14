insert into consultation_record(
clinic, doctor_name, patient_name, diagnosis, medication,
consultation_fee, date, follow_up)
values(
'Health Clinic', 'Dr. Chan Tai Man', 'Jim Chau', 'headaches', 'neurontin',
210, str_to_date('2021-01-01 15:20:23', '%Y-%m-%d %T'), 1);

insert into consultation_record(
clinic, doctor_name, patient_name, diagnosis, medication,
consultation_fee, date, follow_up)
values(
'Clinic1', 'doctor1', 'patient1', 'cold', 'medi1',
100, str_to_date('2021-06-14 00:30:30', '%Y-%m-%d %T'), 1);

insert into consultation_record(
clinic, doctor_name, patient_name, diagnosis, medication,
consultation_fee, date, follow_up)
values(
'Clinic1', 'doctor1', 'patient2', 'flu', 'medi2',
200, str_to_date('2021-06-14 00:50:30', '%Y-%m-%d %T'), 0);

insert into consultation_record(
clinic, doctor_name, patient_name, diagnosis, medication,
consultation_fee, date, follow_up)
values(
'Clinic1', 'doctor2', 'patient3', 'sssss', 'medi3',
200, str_to_date('2021-06-14 00:50:30', '%Y-%m-%d %T'), 0);

insert into consultation_record(
clinic, doctor_name, patient_name, diagnosis, medication,
consultation_fee, date, follow_up)
values(
'Clinic1', 'doctor1', 'patient5', 'sssss', 'medi4',
200, str_to_date('2021-06-14 03:50:30', '%Y-%m-%d %T'), 1);

insert into consultation_record(
clinic, doctor_name, patient_name, diagnosis, medication,
consultation_fee, date, follow_up)
values(
'Clinic1', 'doctor1', 'patient11', 'aaa', 'medi8',
150, str_to_date('2021-06-14 11:50:30', '%Y-%m-%d %T'), 0);

insert into consultation_record(
clinic, doctor_name, patient_name, diagnosis, medication,
consultation_fee, date, follow_up)
values(
'Health Clinic', 'doctor5', 'patient17', 'ssss', 'medi5',
270, str_to_date('2021-06-14 15:20:23', '%Y-%m-%d %T'), 1);

insert into clinic_account(
email, password, phone_number, address)
values
('email@123.com', '5f4dcc3b5aa765d61d8327deb882cf99', '12345678', 'address1');