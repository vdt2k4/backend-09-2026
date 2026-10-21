import {CanActivate, ExecutionContext, ForbiddenException, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {  
        const request = context.switchToHttp().getRequest();
        const isValid =  request.headers.authorization === 'valid_token';
        if (!isValid) {
            throw new ForbiddenException('Bạn không có quyền chỉnh sửa!');
        }
        return true;
    }
}