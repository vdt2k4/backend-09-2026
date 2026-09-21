// Bài tập 1: Quản lý học sinh
// Tạo một lớp Student với các thuộc tính:
// - name(string)
// - age(number)
// - grade(string)
// Viết một phương thức để hiện thị thông tin của học sinh

class Student {
    private name: string;
    private age: number;
    private grade: string;
    constructor(name: string, age: number, grade: string) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
    inforStudent(): void {
        console.log(`Thông tin học sinh: ${this.name}, ${this.age}, ${this.grade}`)
    }
}

const student = new Student("Alice", 25, "Typescript");
student.inforStudent();

// Bài tập 2: Hệ thống ngân hàng
// Tạo lớp BankAccount với các thuộc tính accountNumber, balance.
// Tạo các phương thức deposit(amount) và withdraw(amount) để cập nhật số dư.
// Tạo lớp SavingAccount kế thừa BankAccount, thêm thuộc tính interestRate và phương thức calculateInterest(). 

class BankAccount {
    private accountNumber: number;
    private balance: number;
    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    deposit(amount: number): number {
        return this.balance += amount;
    }
    withdraw(amount: number): number {
        if (amount <= this.balance) {
            return this.balance -= amount;
        } else {
            console.log("Số dư không đủ !!!");
        }
        return this.balance

    }
    getBalance(): number {
        return this.balance;
    }
}

class SavingAccount extends BankAccount {
    private interestRate: number;
    constructor(accountNumber: number, balance: number, interestRate: number) {
        super(accountNumber, balance);
        this.interestRate = interestRate;
    }
    calculateInterest(): number {
        return this.getBalance() * (this.interestRate / 100);
    }
}

const mySavings = new SavingAccount(123, 1000, 5);
console.log(mySavings.deposit(50));
console.log(mySavings.withdraw(150));
console.log(mySavings.getBalance());
console.log("Tiền lãi nhận được:", mySavings.calculateInterest());


// Bài Tập 3: Quản lý thư viện
// Tạo lớp Book với các thuộc tính title, author, ISBN.
// Tạo lớp Library có danh sách các cuốn sách (books) và các phương thức:
//  + addBook(book: Book): Thêm sách.
//  + removeBook(ISBN: string): Xóa sách theo ISBN.
//  + ﬁndBook(title: string): Tìm sách theo tên. 

class Book {
    title: string;
    author: string;
    ISBN: string;
    constructor(title: string, author: string, ISBN: string) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
    }
}

class Library {
    private books: Book[] = [];
    addBook(book: Book): void {
        this.books.push(book);
    }
    removeBook(ISBN: string): void {
        this.books = this.books.filter(item => item.ISBN !== ISBN);
    }
    ﬁndBook(title: string): Book | undefined {
        return this.books.find(item => item.title === title);
    }
}

const myLibrary = new Library();
const book1 = new Book("JavaScript Cơ Bản", "Erik", "ISBN-001");
const book2 = new Book("TypeScript Cơ Bản", "Alice", "ISBN-002");
myLibrary.addBook(book1);
myLibrary.addBook(book2);
console.log("Tìm thấy sách: ", myLibrary.ﬁndBook("JavaScript Cơ Bản"));
myLibrary.removeBook("ISBN-001");
console.log(myLibrary);

// Bài Tập 4: Hình học
// Tạo lớp Shape (trừu tượng) với phương thức calculateArea().
// Tạo lớp Rectangle và Circle kế thừa từ Shape, triển khai calculateArea() tương ứng.
// Viết chương trình tính diện tích các hình và hiển thị kết quả.

abstract class Shape {
    abstract calculateArea(): number;
}

class Rectangle extends Shape {
    private length: number;
    private width: number;
    constructor(length: number, width: number) {
        super();
        this.length = length;
        this.width = width;
    }
    calculateArea(): number {
        return this.length * this.width;
    }
}

class Circle extends Shape {
    private radius: number;
    constructor(radius: number) {
        super();
        this.radius = radius;
    }
    calculateArea(): number {
        return this.radius * this.radius * Math.PI;
    }
}

const AreaRectangle = new Rectangle(2, 5);
console.log("Diện tích hình chữ nhật là: ", AreaRectangle.calculateArea());
const AreaCircle = new Circle(5);
console.log("Diện tích hình tròn là: ", AreaCircle.calculateArea());


// Bài Tập 5: Quản lý nhân viên
// Tạo lớp Employee với các thuộc tính: name, position, salary
// Kế thừa lớp Employee thành các lớp Manager và Developer, thêm phương thức getDetails().
// Tạo danh sách nhân viên và in thông tin chi tiết.

class Employee {
    name: string;
    position: string;
    salary: number;

    constructor(name: string, position: string, salary: number) {
        this.name = name;
        this.position = position;
        this.salary = salary;
    }
}

class Manager extends Employee {

    constructor(name: string, position: string, salary: number) {
        super(name, position, salary);
    }
    getDetails(): void {
        console.log(`Thông tin Manager:${this.name},${this.position},${this.salary}`);
    }
}


class Developer extends Employee {

    constructor(name: string, position: string, salary: number) {
        super(name, position, salary);
    }
    getDetails(): void {
        console.log(`Thông tin Developer:${this.name},${this.position},${this.salary}`);
    }
}

const employee1 = new Manager("David", "BIM", 1000);
employee1.getDetails();
const empployee2 = new Developer("Erik", "SE", 500);
empployee2.getDetails();