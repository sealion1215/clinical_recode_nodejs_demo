create database clinical_db;
create user 'clinic_admin'@'%' identified with mysql_native_password by 'clinic';
grant all on clincal_db.* to 'clinic_admin'@'%';
flush privileges;
use clinical_db;

create table consultation_record(
    record_id int not null auto_increment,
    clinic varchar(100) not null,
    doctor_name varchar(30) not null,
    patient_name varchar(30) not null,
    diagnosis varchar(50) not null,
    medication varchar(30),
    consultation_fee int not null,
    date datetime not null,
    follow_up boolean not null default false,
    primary key (record_id)
);

create table clinic_account(
    account_id int not null auto_increment,
    email varchar(50) unique not null,
    password varchar(50) not null,
    phone_number varchar(20) not null,
    address varchar(100) not null,
    primary key (account_id)
);