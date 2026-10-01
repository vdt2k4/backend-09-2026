CREATE DATABASE my_Database;

use my_Database;

CREATE TABLE students (
	student_id INT PRIMARY KEY,
	name VARCHAR(100),
	age INT,
	major VARCHAR(50)
);

INSERT INTO students (student_id, name, age, major)
VALUES
(1,'Nguyen Van A',18,'Computer Science'),
(2,'Le Thi Cho',19,'Electrical Engineering'),
(3,'Lam Van B',18,'Mechanical Engineering'),
(4,'Nguyen Thanh Huy',20,'Civil Engineering'),
(5,'Le Hoang Phuog',18,'Computer Engineering'),
(6,'Nguyen Hong Khuyen',18,'Automotive Engineering'),
(7,'Nguyen Ky Duyen',18,'Chemical Engineering'),
(8,'Do Hung Phi',18,'Computer Science'),
(9,'Bui Minh Tri',19,'Electrical Engineering'),
(10,'Lam Thuy Ngan',21,'Computer Science');

DELETE FROM my_Database.students WHERE student_id = 1;

DELETE FROM my_Database.students WHERE student_id = 2;

INSERT INTO students (student_id, name, age, major)
VALUES
(1,'Chua Dai Bi',23,'Computer Science'),
(2,'Dong Van Cong',24,'Electrical Engineering');

UPDATE my_Database.students SET age = 22, name = 'Le Hoang Phuong' WHERE student_id = 5;

UPDATE my_Database.students s SET major = 'Fashion Design' WHERE s.student_id = 10;

SELECT student_id, name, age, major FROM students WHERE age < 19;