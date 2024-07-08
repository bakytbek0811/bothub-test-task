import { Request, Response, Router } from 'express';
import { Controller } from '.';
import { verifyAccessToken } from '../middlewares/verify-access-token';
import { validationUserAccess } from '../middlewares/validation-user-access';
import { UserRoleEnum } from '../domains/user';
import { Book } from '../domains/book';
import { Types } from 'mongoose';
import { validateCreateBookData } from '../middlewares/book';

const apiTag = 'books';

export class BookController implements Controller {
    router: Router;

    constructor() {
        this.router = Router();

        this.router.post(
            `/${apiTag}`,
            verifyAccessToken,
            validationUserAccess([UserRoleEnum.ADMIN]),
            validateCreateBookData,
            this.create,
        );
        this.router.get(`/${apiTag}`, this.get);
        this.router.get(`/${apiTag}/:id`, this.getBook);
        this.router.put(`/${apiTag}/:id`, verifyAccessToken, validationUserAccess([UserRoleEnum.ADMIN]), this.update);
        this.router.delete(
            `/${apiTag}/:id`,
            verifyAccessToken,
            validationUserAccess([UserRoleEnum.ADMIN]),
            this.delete,
        );
    }

    private async create(req: Request, res: Response) {
        const result = await Book.createBook(req.body);

        res.status(201).json(result);
    }

    private async get(req: Request, res: Response) {
        const result = await Book.getBooks();

        res.status(200).json(result);
    }

    private async update(req: Request, res: Response) {
        const result = await Book.updateBook(new Types.ObjectId(req.params.id), req.body);

        res.status(200).json(result);
    }

    private async delete(req: Request, res: Response) {
        await Book.deleteBook(new Types.ObjectId(req.params.id));

        res.status(204).send();
    }

    private async getBook(req: Request, res: Response) {
        const result = await Book.getBook(new Types.ObjectId(req.params.id));

        res.status(200).json(result);
    }
}
