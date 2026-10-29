import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BorrowBook } from "../../borrow-book/entities/borrow-book.entity.js";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullName: string;

    @Column()
    phone: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: false })
    role: string;

    @Column({ nullable: false, default: true })
    isActive: boolean;

    @Column()
    createAt: Date;

    @Column()
    updateAt: Date;

    @OneToMany(() => BorrowBook, (borrowBook) => borrowBook.user)
    borrowBooks: BorrowBook[];
}
