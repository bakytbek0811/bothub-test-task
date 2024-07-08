import { Types } from 'mongoose';
import { BookModel, IBook } from '../db/book';

export type SaveBookType = {};

export type FindOneBookType = {
    _id: Types.ObjectId;
};

export type UpdateBookType = {
    title?: string;
    author?: string;
    publicationDate?: Date;
    genre?: string[];
};

export class BookData {
    public static async save(data: SaveBookType): Promise<IBook> {
        return BookModel.create(data);
    }

    public static async findOne(findOne: FindOneBookType): Promise<IBook | null> {
        return BookModel.findOne(findOne);
    }

    public static async find(): Promise<IBook[]> {
        return BookModel.find();
    }

    public static async count(): Promise<number> {
        return BookModel.countDocuments();
    }

    public static async updateOne(findOne: FindOneBookType, data: UpdateBookType): Promise<void> {
        await BookModel.updateOne(findOne, data);
    }

    public static async deleteOne(findOne: FindOneBookType): Promise<void> {
        await BookModel.deleteOne(findOne);
    }
}
