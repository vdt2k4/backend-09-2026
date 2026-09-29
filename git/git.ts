// I. Các câu lệnh Git cơ bản

    // 1.Khởi tạo Repository
    //   $ git init
    // Khởi tạo một repository git trong thư mục hiện tại.

    // 2. Kiểm tra trạng thái
    // $ git status
    // Hiển thị trạng thái của Repository (các file đã thay đổi, đang trong staging hay chưa).

    // 3. Thêm file vào Staging Area
    // $ git add <file>
    // Thêm 1 file cụ thể vào staging area

    // 4. Tạo commit
    // $ git commit -m "<message>"
    // Tạo 1 commit với thông điệp cụ thể (message)

    // 5.Liên kết với Remote repository
    // $ git remote add origin <url>
    // Liên kết repository local với repository remote

    // 6. Push thay đổi lên Remote
    // $ git push
    // Đẩy thay đổi từ local repository lên remote repository

    // 7. Clone Repository
    // $ git clone <url>
    // Sao chép 1 repository từ remote về local.

    // 8. Pull thay đổi từ Remote
    // $ git pull
    // Lấy các thay đổi từ remote repository về và gộp với branch hiện tại

    // 9. Kiểm tra lịch sử commit
    // $ git log
    // Hiển thị các lịch sử các commit

    // 10. Tạo ra Branch mới
    // $ git branch <branch-name>
    // Tạo ra nhánh mới

    // 11. Chuyển sang Branch khác
    // $ git checkout <branch-name>
    // Chuyển sang 1 nhánh cụ thể

    // 12. Xóa 1 Branch
    // $ git branch -d <branch-name>
    // $ git branch -D <branch-name>
    // Xóa 1 nhanh đã gộp

// II. Các câu lệnh Git nâng cao

    // 1. Xem sự khác biệt giữa các phiên bản
    // $ git diff
    // So sánh sự khác biệt giữa các file chưa commit hoặc giữa các commit

    // 2. Undo Commit
    // $ git reset --soft <commit-hash>

    // 3. Thay đổi commit cuối cùng
    // $ git commit --amend

    // 4. Làm việc với stash
    // $ git stash
    // $ git stash pop
    // Lưu tạm thời các thay đổi mà không commit

    // 5.Đồng bộ code
    // # git merge & git rebase

    // 6. Xử lý conflict