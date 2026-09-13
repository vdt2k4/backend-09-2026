// Bài 1 Tìm học sinh có điểm cao nhất trong mảng.
// const students = [ { name: "Hùng", score: 75 }, { name: "Mai", score: 85 }, { name: "Lan", score: 90 } ];

const students = [
    { name: "Hùng", score: 75 },
    { name: "Mai", score: 85 },
    { name: "Lan", score: 90 }];

const maxScore = students.reduce((max, student) => (student.score > max.score ? student : max));

//----------------------------------------------------

// Bài 2: Viết một chương trình quản lý danh sách sản phẩm với các chức năng:
// - Thêm sản phẩm mới vào danh sách.
// - Hiển thị danh sách sản phẩm.
// - Tìm kiếm sản phẩm theo tên.
// - Tính tổng giá trị các sản phẩm.
// let products = [ { name: "Laptop", price: 1500 }, { name: "Phone", price: 800 }, { name: "Tablet", price: 400 } ];

let products = [{ name: "Laptop", price: 1500 },
{ name: "Phone", price: 800 },
{ name: "Tablet", price: 400 }];

// Thêm sản phẩm mới vào danh sách
products.push({ name: "Iphone", price: 2000 });

// Hiển thị danh sách sản phẩm
console.log("Danh sách sản phẩm:");
products.forEach((item, index) => {
    console.log(`${index + 1}. ${item.name} - $${item.price}`);
});

// Tìm kiếm sản phẩm theo tên
const searchName = "Phone";
const foundProduct = products.find(product => product.name.toLowerCase() === searchName.toLowerCase());
if (foundProduct) {
    console.log(`Sản phẩm tìm thấy: ${foundProduct.name} - $${foundProduct.price}`);
} else {
    console.log(`Không tìm thấy sản phẩm có tên: ${searchName}`);
};

// Tính tổng giá trị các sản phẩm
const totalValue = products.reduce((sum, product) => sum + product.price, 0);
console.log(`Tổng giá trị các sản phẩm: $${totalValue}`);

//----------------------------------------------------

// Bài 3: Đếm số user đang hoạt động;
// const users = [
//     { name: "A", active: true },
//     { name: "B", active: false },
//     { name: "C", active: true }
// ];

const users = [
    { name: "A", active: true },
    { name: "B", active: false },
    { name: "C", active: true }
];

const activeUsersCount = users.filter(user => user.active).length;
console.log(`Số user đang hoạt động: ${activeUsersCount}`);
//----------------------------------------------------
/**
 *  Bài 4: Lấy tên từ danh sách user
 * [
    {name: "An", age: 20},
    {name: "Bình", age: 25}
   ]
    → ["An", "Bình"]
 */

const userList = [
    { name: "An", age: 20 },
    { name: "Bình", age: 25 }
];

const userNames = userList.map(user => user.name);
console.log("Danh sách tên user:", userNames);
//----------------------------------------------------
/**
 * Bài 5: const number = [2, -5, 6, -7, -4, 7, -1, -1];
        a: tính trung bình cộng số âm
        b: in ra danh sách các số âm lớn hơn giá trị tính ở ý a
        c: tìm số âm lớn nhất trong mảng
 */

const numbers = [2, -5, 6, -7, -4, 7, -1, -1];
// a: tính trung bình cộng số âm
const negativeNumbers = numbers.filter(num => num < 0);
const averageNegative = negativeNumbers.reduce((sum, num) => sum + num) / negativeNumbers.length;
console.log("Trung bình cộng số âm:", averageNegative);
// b: in ra danh sách các số âm lớn hơn giá trị tính ở ý a
const negativeGreaterThanAverage = negativeNumbers.filter(num => num > averageNegative);
console.log("Danh sách số âm lớn hơn trung bình cộng:", negativeGreaterThanAverage);
// c: tìm số âm lớn nhất trong mảng
const sortedNegativeNumbers = numbers.sort((a, b) => b - a);
const maxNegative = sortedNegativeNumbers.find(num => num < 0);
console.log("Số âm lớn nhất trong mảng:", maxNegative);

//----------------------------------------------------
// Bài 6: Đếm số đơn hàng theo trạng thái
// const orders = [
//     { status: "pending" },
//     { status: "completed" },
//     { status: "pending" },
//     { status: "cancelled" }
// ];
// kết quả: {
//     pending: 2,
//     completed: 1,
//     cancelled: 1
// }

const orders = [
    { status: "pending" },
    { status: "completed" },
    { status: "pending" },
    { status: "cancelled" }
];

const orderCountByStatus = orders.reduce((count, order) => {
    const status = order.status;
    count[status] = (count[status] ?? 0) + 1;
    return count;
}, {});
console.log("Số đơn hàng theo trạng thái:", orderCountByStatus);
//----------------------------------------------------
// Bài 7: Tìm đơn hàng có giá trị cao nhất

// const orders2 = [
//     { id: 1, total: 500 },
//     { id: 2, total: 1200 },
//     { id: 3, total: 800 }
// ];
// Kết quả: { id: 2, total: 1200 }

const orders1 = [
    { id: 1, total: 500 },
    { id: 2, total: 1200 },
    { id: 3, total: 800 }
];

const maxOrder = orders1.reduce((max, order) => (order.total > max.total ? order : max));
console.log("Đơn hàng có giá trị cao nhất:", maxOrder);

//----------------------------------------------------
/**
 * Bài 8: const sales = [
  { user: "An", product: "Áo", price: 100, qty: 2 },
  { user: "Bình", product: "Giày", price: 300, qty: 1 },
  { user: "An", product: "Quần", price: 200, qty: 1 },
  { user: "Chi", product: "Áo", price: 100, qty: 5 }
];
- Lấy danh sách sản phẩm không trùng => ["Áo", "Giày", "Quần"]
- Tính tổng số lượng bán ra của từng sản phẩm
kết quả: 
        {
            Áo: 7,
            Giày: 1,
            Quần: 1
        }
- Lọc các đơn hàng có tổng tiền > 200 -> lấy tên user
 */

const sales = [
    { user: "An", product: "Áo", price: 100, qty: 2 },
    { user: "Bình", product: "Giày", price: 300, qty: 1 },
    { user: "An", product: "Quần", price: 200, qty: 1 },
    { user: "Chi", product: "Áo", price: 100, qty: 5 }
];

// Lấy danh sách sản phẩm không trùng
const uniqueProducts = sales.reduce((product, sale) => {
    if (!product.includes(sale.product)) {
        product.push(sale.product);
    }
    return product;
}, []);
console.log("Danh sách sản phẩm không trùng:", uniqueProducts);

// Tính tổng số lượng bán ra của từng sản phẩm
const totalQtyByProduct = sales.reduce((total, sale) => {
    total[sale.product] = (total[sale.product] ?? 0) + sale.qty;
    return total;
}, {});
console.log("Tổng số lượng bán ra của từng sản phẩm:", totalQtyByProduct);

// Lọc các đơn hàng có tổng tiền > 200 -> lấy tên user
const usersWithHighTotal = sales.filter(sale => sale.price * sale.qty > 200).map(sale => sale.user);
console.log("Người dùng có đơn hàng tổng tiền > 200:", usersWithHighTotal);