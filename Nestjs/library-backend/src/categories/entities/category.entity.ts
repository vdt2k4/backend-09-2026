import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../../books/entities/book.entity.js";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    name: string;

    @Column()
    createAt: Date;

    @Column()
    updateAt: Date;

    @OneToMany(() => Book, (book) => book.category)
    books: any[];
}
