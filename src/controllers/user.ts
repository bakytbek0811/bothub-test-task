import { Request, Response, Router } from 'express';
import { Controller } from '.';
import { verifyAccessToken } from '../middlewares/verify-access-token';
import { validationUserAccess } from '../middlewares/validation-user-access';
import { User, UserRoleEnum } from '../domains/user';
import { validateLoginData, validateRegistrationData } from '../middlewares/user';

const apiTag = 'users';

export class UserController implements Controller {
    router: Router;

    constructor() {
        this.router = Router();

        this.router.post(`/${apiTag}/register`, validateRegistrationData, this.register);
        this.router.post(`/${apiTag}/login`, validateLoginData, this.login);
        this.router.get(`/${apiTag}/me`, verifyAccessToken, this.getMe);
        this.router.put(
            `/${apiTag}/role`,
            verifyAccessToken,
            validationUserAccess([UserRoleEnum.ADMIN]),
            this.updateRole,
        );
    }

    private async register(req: Request, res: Response) {
        const result = await User.register(req.body);

        res.status(201).json(result);
    }

    private async getMe(req: Request, res: Response) {
        const result = await User.me(req.userData.id);

        res.status(200).json(result);
    }

    private async login(req: Request, res: Response) {
        const result = await User.login(req.body.username, req.body.password);

        res.status(200).json(result);
    }

    private async updateRole(req: Request, res: Response) {
        const result = await User.updateRole(req.userData.id, req.body);

        res.status(200).json(result);
    }
}
