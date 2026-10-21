import { Injectable, NotFoundException } from '@nestjs/common';
import {Book} from "./books/interface/interface.book.js";
import {CreateBookDto} from "./books/dto/create.book.dto.js";
import {UpdateBookDto} from "./books/dto/update.book.dto.js";

@Injectable()
export class BooksService {
    // Khởi tạo danh sách Book
    private   books:Book[] = [];
    // Khởi tạo biến đếm ++
    private index = 1;
    
    // Thêm danh sách mới
    createBook(createBookDto: CreateBookDto) {
        const newBook:Book = {
            id:this.index++,
            ...createBookDto,
        }
        this.books.push(newBook);
        return newBook;
    }
    
    // Lấy ra tất cả danh sách book
    findAll() {
        return this.books;
    }
    
    // Lấy ra thông tin chi tiết một cuốn sách theo id
    findOne(id:number){
        // Nếu không tồn tại id đó thì trả ra không có bất kỳ cuốn sách đó
        const book = this.books.find(b => b.id === id);
        if(!book){
            throw new NotFoundException(`Không tìm thấy sách với ID: ${id}`);
        }
        return book;
    }

    // Cập nhật thông tin theo sách id.
    updateBook(id:number,updateBookDto:UpdateBookDto):Book {
        const book = this.findOne(id);
        const updateBook = {...book,...updateBookDto};
        this.books = this.books.map(b=>b.id ===id?updateBook:b);
        return updateBook;
    }
    
    // Xoá một cuốn sách theo id.
    deleteBook(id:number){
        const findIndex = this.books.findIndex(b=>b.id === id);
        if(findIndex === -1){
            throw new NotFoundException(`Không tìm thấy sách với ID ${id}`);
        }
        return this.books.splice(findIndex, 1);
    }
}
