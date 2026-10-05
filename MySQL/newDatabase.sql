# Bài 1: Tạo và thao tác với bảng

# Tạo 1 bảng Employees với các cột:
# EmployeeID (INT, Khoá chính)
# Name (VARCHAR(100))
# Age (INT)
# Department(VARCHAR(50))
# Salary (DECIMAL(10,2))

CREATE DATABASE new_dataBase;
USE new_dataBase;
CREATE TABLE Employees(
EmployeeID INT PRIMARY KEY,
Name VARCHAR(100),
Age INT,
Department VARCHAR(50),
Salary DECIMAL(10,2)
);

# Thêm 5 nhân viên với thông tin bất kỳ

INSERT INTO Employees(EmployeeID,Name,Age,Department,Salary)
VALUES
(1,'Nguyen Ky Duyen',28,'IT',1500),
(2,'Phan Cao Man',24,'R&D',900),
(3,'Vo Duc Thien',25,'IT',1000),
(4,'Bui Minh Tri',23,'IT',2000),
(5,'Do Ky Duyen',27,'Engineering',1500);


# Lấy tất cả thông tin của nhân viên thuộc phòng ban "IT"

SELECT *
FROM new_dataBase.Employees e 
WHERE e.Department = 'IT';


# Cập nhật lương của nhân viên có EmployeeID = 2 thành 8500

UPDATE new_dataBase.Employees
SET Salary = 8500
WHERE EmployeeID = 2;

# Xoá nhân viên có EmployeeID = 4

DELETE FROM new_dataBase.Employees 
WHERE EmployeeID = 4;


# Bài 2: Sử dụng các hàm tích hợp
# Tạo bảng Sales với các cột
# 	SaleID(INT,khoá chính)
# 	EmployeeID(INT,khoá ngoại tham chiếu đến bảng Employees.EmployeeID)
# 	SaleAmount(DECIMAL(10,2))
# 	SaleDate(DATE)

CREATE TABLE Sales(
SaleID INT PRIMARY KEY,
EmployeeID INT,
SaleAmount DECIMAL(10,2),
SaleDate DATE,
FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);


# Thêm dữ liệu giả lập

# 5 Bản ghi bán hàng với EmployeeID trùng với Employees
INSERT INTO Sales(SaleID,EmployeeID,SaleAmount,SaleDate)
VALUES
(1,2,300,'2026-05-01'),
(2,1,500,'2026-05-07'),
(3,3,250,'2026-05-08'),
(4,5,450,'2026-05-03'),
(5,1,550,'2026-05-09');


# Thực hiện các truy vấn
# Tính tổng doanh thu từ tất cả các giao dịch.

SELECT SUM(SaleAmount) AS Total
FROM Sales


# Tính doanh thu trung bình của cá nhân trong phòng ban "IT"
SELECT AVG(SaleAmount) AS Average
FROM Employees e 
INNER JOIN Sales s ON s.EmployeeID = e.EmployeeID 
WHERE e.Department ='IT';


# Liệt kê tất cả các nhân viên chưa thực hiện giao dịch nào
SELECT e.*
FROM Employees e
LEFT JOIN Sales s ON e.EmployeeID = s.EmployeeID
WHERE s.SaleID IS NULL;


# Bài 3: Thao tác với khóa ngoại và JOIN
# Tạo bảng Projects với các cột: 
#	- ProjectID (INT, khóa chính) 
#	- ProjectName (VARCHAR(100)) 
#	- Department (VARCHAR(50)) 

CREATE TABLE Projects(
ProjectID INT PRIMARY KEY,
ProjectName VARCHAR(100),
Department VARCHAR(50)
);


# Tạo bảng Assignments với các cột: 
# 	- AssignmentID (INT, khóa chính) 
# 	- EmployeeID (INT, khóa ngoại tham chiếu Employees.EmployeeID) 
# 	- ProjectID (INT, khóa ngoại tham chiếu Projects.ProjectID) 

CREATE TABLE Assignments(
AssignmentID INT PRIMARY KEY,
EmployeeID INT ,
ProjectID INT,
FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID)
);

# Thêm dữ liệu: 
# 	- 3 dự án cho bảng Projects. 

INSERT INTO Projects(ProjectID,ProjectName,Department)
VALUES 
(1,'To-Do List App','R&D'),
(2,'Weather App','IT'),
(3,'AI Chatbot','Engineering');


# 	- 5 bản ghi vào bảng Assignments. 

INSERT INTO Assignments(AssignmentID,EmployeeID,ProjectID)
VALUES 
(1,2,1),
(2,1,2),
(3,3,2),
(4,3,2),
(5,5,3);

# Thực hiện các truy vấn: 
# 	- Lấy danh sách nhân viên và dự án mà họ tham gia. 

SELECT s.Name, p.ProjectName
FROM Employees s
INNER JOIN Assignments a ON a.EmployeeID = s.EmployeeID
INNER JOIN Projects p ON p.ProjectID = a.ProjectID;


# 	- Liệt kê các nhân viên không tham gia dự án nào.

INSERT INTO Employees(EmployeeID,Name,Age,Department,Salary)
VALUES
(6,'Nguyen Van Nam',27,'Engineering',1350);
SELECT *
FROM Employees s
LEFT JOIN Assignments a ON a.EmployeeID = s.EmployeeID
WHERE  a.AssignmentID IS NULL;


# 	- Tìm số lượng nhân viên trong mỗi dự án.

SELECT p.ProjectID, p.ProjectName, COUNT(a.ProjectID) as CountEmployee
FROM Employees e
INNER JOIN Assignments a ON a.EmployeeID = e.EmployeeID
INNER JOIN Projects p ON p.ProjectID = a.ProjectID
GROUP BY p.ProjectID, p.ProjectName


# Bài 4: Sắp xếp và lọc dữ liệu
# Với bảng Employees, thực hiện:
#	- Lấy thông tin nhân viên có lương cao nhất
SELECT *
FROM Employees e
ORDER BY e.Salary DESC   
LIMIT 1;

#	- Lấy danh sách nhân viên thuộc phòng ban "IT" sắp xếp theo tuổi giảm dần.
SELECT *
FROM Employees e
WHERE e.Department = 'IT'
ORDER BY e.Age DESC ;

#	- Tìm nhân viên có lương nằm trong khoảng từ 900 đến 1400
SELECT *
FROM Employees e
WHERE e.Salary >= 900 AND e.Salary <= 1400;

# Với bảng Sales, thực hiện:
#	- Lấy 3 giao dịch có giá trị cao nhất.
SELECT *
FROM Sales s
ORDER BY s.SaleAmount DESC 
LIMIT 3;
#	- Tìm tất cả các giao dịch được thực hiện trong tháng hiện tại.
SELECT *
FROM Sales s
WHERE MONTH(s.SaleDate) = MONTH(CURDATE());

