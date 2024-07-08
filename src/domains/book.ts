import { Types } from 'mongoose';
import { BookData, SaveBookType } from '../data/book';
import { serializeJson } from '../utils/json';
import { NotFoundException } from '../controllers/exceptions';

export class Book {
    public static async createBook(data: SaveBookType): Promise<void> {
        const book = await BookData.save(data);

        return serializeJson('BOOK', book);
    }

    public static async getBook(id: Types.ObjectId): Promise<void> {
        const book = await BookData.findOne({ _id: id });
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return serializeJson('BOOK', book);
    }

    public static async getBooks(): Promise<void> {
        const books = await BookData.find();

        return serializeJson('BOOK', books);
    }

    public static async deleteBook(id: Types.ObjectId): Promise<void> {
        await BookData.deleteOne({ _id: id });
    }

    public static async updateBook(id: Types.ObjectId, data: SaveBookType): Promise<void> {
        await BookData.updateOne({ _id: id }, data);

        return this.getBook(id);
    }
}
