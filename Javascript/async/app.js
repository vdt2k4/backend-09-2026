const usersDB = [
    { id: 1, name: "Nguyen Van A", email: "a@gmail.com" },
    { id: 2, name: "Tran Thi B", email: "b@gmail.com" }
];


// 🟢 Bài 1: Quản lý User bằng Callback (Cơ bản)
// Mục tiêu: Hiểu quy tắc thiết kế hàm bất đồng bộ sử dụng Callback kiểu Node.js (Error-first callback).

// 1. Viết một hàm tên là getUserByIdCallback(id, callback) 
// 2. Hàm này sử dụng setTimeout để giả lập thời gian phản hồi từ Database là 1 giây (1000ms).
// 3. Sau 1 giây, hãy tìm user trong mảng usersDB theo id:
//  + Nếu tìm thấy user, hãy gọi hàm callback với tham số: callback(null, user) .
//  + Nếu không tìm thấy user, hãy gọi hàm callback  với tham số: callback("Không tìm thấy user!", null) .
function getUserByIdCallback(id, callback) {
    setTimeout(() => {
        const user = usersDB.find((user) => {
            return user.id === id;
        });
        user ? callback(null, user) : callback("Không tìm thấy user!", null);
    }, 1000)
}


// Test case 1: Tìm ID có thật
getUserByIdCallback(1, (error, user) => {
    if (error) {
        console.error("Lỗi:", error);
    } else {
        console.log("Bài 1 - Tìm thấy user:", user);
    }
});
// Test case 2: Tìm ID không tồn tại
getUserByIdCallback(99, (error, user) => {
    if (error) {
        console.error("Bài 1 - Kết quả mong muốn (Báo lỗi):", error);
    } else {
        console.log("User:", user);
    }
});



// 🟡 Bài 2: Nâng cấp hàm lên Promise (Trung bình)
// Mục tiêu: Học cách bọc một tác vụ bất đồng bộ cũ bằng Promise để chuẩn bị cho các cú pháp hiện đại hơn.
// Yêu cầu:
// 1. Viết một hàm mới tên là getUserByIdPromise(id). Hàm này không nhận vào tham số callback nữa, mà sẽ trả về một new Promise((resolve, reject) => { ... }).
// 2. Bên trong Promise, sử dụng setTimeout tạo độ trễ 1 giây để quét mảng usersDB .
// 3. Kiểm tra kết quả tìm kiếm:
//  + Nếu tìm thấy user, hãy kích hoạt hành động thành công bằng cách gọi: resolve(user) 
//  + Nếu không tìm thấy, hãy kích hoạt hành động thất bại bằng cách gọi: reject("Không tìm thấy user!") .
function getUserByIdPromise(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = usersDB.find((user) => {
                return user.id === id;
            });
            user ? resolve(user) : reject("Không tìm thấy user!");
        }, 1000);
    });
}

// Test case 1: Tìm ID đúng
getUserByIdPromise(2)
    .then((user) => console.log("Bài 2 - Tìm thấy user:", user))
    .catch((error) => console.error("Lỗi:", error));
// Test case 2: Tìm ID sai
getUserByIdPromise(404)
    .then((user) => console.log("User:", user))
    .catch((error) => console.error("Bài 2 - Kết quả mong muốn (Báo lỗi):", error));


// 🔵 Bài 3: Tối ưu cú pháp gọn gàng với Async / Await (Hiện đại)
// Mục tiêu: Sử dụng cú pháp async/await kết hợp try...catch để viết code bất đồng bộ trông giống như code đồng bộ. Ðây là cách viết phổ biến nhất trong Node.js thực tế.
// Yêu cầu:
// 1. Viết một hàm tên là runApp(userId). Hãy đánh dấu hàm này là một hàm bất đồng bộ bằng từ khóa async.
// 2. Bên trong hàm, sử dụng từ khóa await để gọi và lấy trực tiếp kết quả từ hàm getUserByIdPromise(userId) đã viết ở Bài 2.
// 3.Bọc toàn bộ quá trình thực thi trong khối lệnh try...catch  để xử lý lỗi một cách an toàn nếu Promise bị reject 

async function runApp(userId) {
    try {
        console.log(`--- Đang tìm kiếm user có ID: ${userId} ---`);
        const user = await getUserByIdPromise(userId);
        console.log("Bài 3 - Kết quả tìm thấy:", user);
    } catch (error) {
        console.error("Bài 3 - Bắt được lỗi hệ thống:", error);
    }
}

runApp(1);
runApp(55);