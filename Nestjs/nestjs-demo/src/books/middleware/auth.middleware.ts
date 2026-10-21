import {ForbiddenException, Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import {Request, Response,NextFunction} from "express";
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if (token !== 'valid_token') {
            throw new ForbiddenException('Middleware từ chối: Token không hợp lệ!');
        }
        next();
    }
    
}