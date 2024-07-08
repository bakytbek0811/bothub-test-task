import { Document, Schema } from 'mongoose';
import { Database } from './db';

const COLLECTION_NAME = 'Book';

export interface IBook extends Document {
    title: string;
    author: string;
    publicationDate: Date;
    genres: string[];
}

const BookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publicationDate: {
            type: Date,
            required: true,
        },
        genres: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
        autoIndex: true,
        autoCreate: true,
    },
);

export const BookModel = Database.mainDatabaseConnection.model<IBook>(COLLECTION_NAME, BookSchema, COLLECTION_NAME);
