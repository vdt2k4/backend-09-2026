// Bài 1:
// cho mảng a và b
//   const a = ["A", "B", "C"];
//   const b = [1, 2, 3];
//   từ mảng a và b tạo ra mảng c có dạng như sau:
//       let c = [
//         { value: "A1", id: 1 },
//         { value: "B2", id: 2 },
//         { value: "C3", id: 3 },
//       ];
// *

const a = ["A", "B", "C"];
const b = [1, 2, 3];
const c = a.map((value, index) => {
    return { value: value + b[index], id: b[index] };
})
console.log("let c =", c);

//----------------------------------------------------

/**
 * Bài 2: cho mảng users sau
 * const users = [
  {
    id: 1,
    name: "A",
    gender: "nam",
  },
  {
    id: 2,
    name: "B",
    gender: "nữ",
  },
  {
    id: 3,
    name: "C",
    gender: "nam",
  },
  {
    id: 4,
    name: "D",
    gender: "nam",
  },
];

hãy tạo ra mảng mới newUsers
   const newUsers = [
      {human:"A1",gender:"nam"},
      {human:"C3",gender:"nam"},
      {human:"D4",gender:"nam"}
   ]
 */

const users = [
    {
        id: 1,
        name: "A",
        gender: "nam",
    },
    {
        id: 2,
        name: "B",
        gender: "nữ",
    },
    {
        id: 3,
        name: "C",
        gender: "nam",
    },
    {
        id: 4,
        name: "D",
        gender: "nam",
    },
];

const newUsers = users.reduce((result, user) => {
    if (user.gender === "nam") {
        result.push({ human: user.name + user.id, gender: user.gender });
    }
    return result;
}, []);
console.log("newUsers =", newUsers);

//----------------------------------------------------

/**
 * Bài 3: const number = [2, -5, 6, -7, -4, 7, -1, -1];
        a: tính trung bình cộng số âm
        b: in ra danh sách các số âm lớn hơn giá trị tính ở ý a
        c: tìm số âm lớn nhất trong mảng
 */

const numbers = [2, -5, 6, -7, -4, 7, -1, -1];
// a: tính trung bình cộng số âm, viết function tính trung bình cộng số âm
function averageNegative(arr) {
    const negativeNumbers = arr.filter(num => num < 0);
    const average = negativeNumbers.reduce((sum, num) => sum + num, 0) / negativeNumbers.length;
    return average;
}
const average = averageNegative(numbers);
console.log("Trung bình cộng số âm:", average);

// b: in ra danh sách các số âm lớn hơn giá trị tính ở ý a, viết function in ra danh sách các số âm lớn hơn giá trị tính ở ý a
function negativeGreaterThanAverage(arr, avg) {
    const negativeNumbers = arr.filter(num => num < 0);
    const result = negativeNumbers.filter(num => num > avg);
    return result;
}
const negativeGreater = negativeGreaterThanAverage(numbers, average);
console.log("Danh sách số âm lớn hơn trung bình cộng:", negativeGreater);

// c: tìm số âm lớn nhất trong mảng, viết function tìm số âm lớn nhất trong mảng
function maxNegative(arr) {
    const sortedDescending = arr.sort((a, b) => b - a);
    const maxNeg = sortedDescending.find(num => num < 0);
    return maxNeg;
}

const maxNeg = maxNegative(numbers);
console.log("Số âm lớn nhất:", maxNeg);

//----------------------------------------------------

/**
 *  Bài 4: Loại bỏ các phần tử trùng lặp trong mảng let numbers = [1, 2, 3, 4, 2, 5, 6, 1, 3]; tìm hiểu includes hoặc indexOF hoặc ko dùng 2 hàm đó
 */

let numbers2 = [1, 2, 3, 4, 2, 5, 6, 1, 3];

let uniqueNumber3 = new Set(numbers2);
console.log("Mảng không có phần tử trùng lặp:", Array.from(uniqueNumber3));

//----------------------------------------------------

/**
 * Bài 5: Viết 1 hàm nhận vào 1 mảng và 1 số nguyên dương n
 * sau đó trả về mảng mới chứa các mảng con có kích thước n.
 * let mangSo = [1,2,3,4,5,6,7,8,9]
 * kích thước n = 3
 * viết 1 hàm tachMangCao(mangSo,3)
 * kết quả: [[1,2,3],[4,5,6],[7,8,9]]
 */
let mangSo = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function tachMangCao(arr, n) {
    if (n > arr.length) {
        return "Kích thước n lớn hơn độ dài mảng";
    }
    else {
        const result = [];
        for (let i = 0; i < arr.length; i += n) {
            result.push(arr.slice(i, i + n));
        }
        return result;
    }
};

const result = tachMangCao(mangSo, 3);
console.log("Kết quả:", result);

//----------------------------------------------------

/**
 * Bài 6: đếm số lượng phần tử trong mảng
 * const lang = ["php","js","c++","java","php","js","php"]
 * output 
 *  {
 *    php:3,
 *    js:2,
 *    java:1,
 *    c++:1
 *  }
 */
const lang = ["php", "js", "c++", "java", "php", "js", "php"];
const countLang = lang.reduce((acc, lan) => {
    acc[lan] = (acc[lan] ?? 0) + 1;
    return acc;
}, {});
console.log("Số lượng phần tử trong mảng:", countLang);

//----------------------------------------------------

/**
 *  Bài 7: Lấy tên từ danh sách user
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
const userName = userList.map(user => user.name);
console.log("Danh sách tên user:", userName);

//----------------------------------------------------

/**
 *  Bài 8: Tìm số âm đầu tiên
 * [5, 2, -3, -8] -> -3
 */

const numbers3 = [5, 2, -3, -8];
const firstNegative = numbers3.find(num => num < 0);
console.log("Số âm đầu tiên:", firstNegative);

//----------------------------------------------------

/**
 * Bài 9: const orders = [
  { id: 1, user: "An", total: 200 },
  { id: 2, user: "Bình", total: 500 },
  { id: 3, user: "An", total: 300 }
];

- Tính tổng tiền mỗi user
    Kết quả: {
                An: 500,
                Bình: 500
              }

- Tìm user chi nhiều tiền nhất
- Tính tổng toàn bộ orders của user "An"
 */

// - Tính tổng tiền mỗi user
const orders = [
    { id: 1, user: "An", total: 200 },
    { id: 2, user: "Bình", total: 500 },
    { id: 3, user: "An", total: 300 }
];

function calculateTotalByUsers(orders) {
    return orders.reduce((totals, order) => {
        totals[order.user] = (totals[order.user] ?? 0) + order.total;
        return totals;
    }, {});
};
const calculateTotalByUsersResult = calculateTotalByUsers(orders);
console.log("Tổng tiền mỗi user:", calculateTotalByUsersResult);

// - Tìm user chi nhiều tiền nhất
function findUserWithMaxTotal(totals) {
    let maxUser = null;
    let maxTotal = -Infinity;
    for (const user in totals) {
        if (totals[user] > maxTotal) {
            maxTotal = totals[user];
            maxUser = user;
        };
    }
    return maxUser;
}
const userWithMaxTotal = findUserWithMaxTotal(calculateTotalByUsersResult);
console.log("User chi nhiều tiền nhất:", userWithMaxTotal);

// - Tính tổng toàn bộ orders của user "An"
function calculateTotalForUser(orders, userName) {
    return orders
        .filter(order => order.user === userName)
        .reduce((total, order) => total + order.total, 0);
}
const username = "An";
const totalForUser = calculateTotalForUser(orders, username);
console.log(`Tổng tiền của user '${username}':`, totalForUser);

//----------------------------------------------------

/**
 * Bài 10: const sales = [
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

// - Lấy danh sách sản phẩm không trùng => ["Áo", "Giày", "Quần"]

const uniqueProducts = new Set(sales.map(sale => sale.product));
console.log("Danh sách sản phẩm không trùng:", Array.from(uniqueProducts));
//- Tính tổng số lượng bán ra của từng sản phẩm
function calculateTotalQtyByProduct(sales) {
    return sales.reduce((totals, sale) => {
        totals[sale.product] = (totals[sale.product] ?? 0) + sale.qty;
        return totals;
    }, {})
};
const totalQtyByProduct = calculateTotalQtyByProduct(sales);
console.log("Tổng số lượng bán ra của từng sản phẩm:", totalQtyByProduct);

//- Lọc các đơn hàng có tổng tiền > 200 -> lấy tên user
function filterUsersByTotal(sales, threshold) {
    return sales
        .filter(sale => sale.price * sale.qty > threshold)
        .map(sale => sale.user);
}
const usersWithHighTotal = filterUsersByTotal(sales, 200);
console.log("Danh sách user có tổng tiền > 200:", usersWithHighTotal);


//----------------------------------------------------



// Bài 11: Tìm sản phẩm đắt nhất
// const products = [
//     { name: "A", price: 100 },
//     { name: "B", price: 300 },
//     { name: "C", price: 200 }
// ];

// Kết quả: { name: "B", price: 300 }

// Bài 12: Đếm số user đang hoạt động;
// const users = [
//     { name: "A", active: true },
//     { name: "B", active: false },
//     { name: "C", active: true }
// ];


// Bài 13: Tìm sản phẩm bán chạy nhất
// const orders = [
//     "iphone",
//     "iphone",
//     "samsung",
//     "iphone",
//     "xiaomi",
//     "xiaomi"
// ];


// Bài 14: Tìm số xuất hiện nhiều nhất
// [1, 1, 2, 2, 2, 3] -> 2


// Bài 15: Tìm đơn hàng có giá trị cao nhất

// const orders = [
//     { id: 1, total: 500 },
//     { id: 2, total: 1200 },
//     { id: 3, total: 800 }
// ];
// Kết quả: { id: 2, total: 1200 }

// Bài 16: Đếm số đơn hàng theo trạng thái
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


// Bài 17: Đếm tổng số học sinh
// const classes = [
//     {
//         name: "A",
//         students: ["An", "Bình"]
//     },
//     {
//         name: "B",
//         students: ["Cường"]
//     }
// ];

// Kết quả 3





/**
 * 1: Kiểm tra xem một số có phải là số nguyên tố lớn không. Nếu có, in ra số nguyên tố lớn nhất trong khoảng từ 1 đến
  số đó.
  Input: 20
  Output: 19
  Input: 15
  Output: 13
 */

/**
 * Bài 2: Tìm tất cả các cặp số (a, b) sao cho a và b là số nguyên tố và a + b = n, với n là số nguyên dương cho trước.
  Input: 10
  Output: (3, 7)
  Input: 20
  Output: (3, 17), (7, 13)
 */

/**
 * Bài 3: Cho một mảng nums gồm các số nguyên, hãy trả về số lượng các số trong mảng đó có số chữ số chẵn.
 *
  Đầu vào: nums = [12,345,2,6,7896]
  Đầu ra: 2
  Giải thích:
    12 có 2 chữ số (số chữ số chẵn).
    345 có 3 chữ số (số chữ số lẻ).
    2 có 1 chữ số (số chữ số lẻ).
    6 có 1 chữ số (số chữ số lẻ).
    7896 có 4 chữ số (số chữ số chẵn).
    Do đó, chỉ có 12 và 7896 có số chữ số chẵn.
 */

/**
 * Bài 4: cho mảng number: const arrNumber = [1, 4, 44, 64, 55, 24, 32, 55, 19, 17, 74, 22, 23];
nếu phần tử trong mảng chẵn thì cho vào mảng evenNumbers = [] => kết quả evenNumber = [4,44,64,24,32,74,22]
và ngược lại lấy số lẻ cho vào mảng oddNumbers
 */