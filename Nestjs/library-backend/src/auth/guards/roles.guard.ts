import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Role } from "../../common/enums/role.enum.js";
import { ROLE_KEY } from "../decorators/roles.decarator.js";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {

    }
    canActivate(context: ExecutionContext): boolean {
        // B1: Lấy role  trong Token trong Controller
        // const controllerRole = this.reflector.get<Role[]>(ROLE_KEY, context.getHandler());

        const controllerRole = this.reflector.getAllAndOverride(
            ROLE_KEY,
            [
                context.getHandler(),
                context.getClass(),
            ]
        );

        // Nếu controller không cần Roles, thì cho phép truy cập
        if (!controllerRole) {
            return true;
        }

        // Bước 2: Lấy role của user trong Token
        const request = context.switchToHttp().getRequest();
        const user = request.user; // Payload trong JWT

        // Kiểm tra không có user, hoặc role nào
        if (!user || !user.role) {
            return false;
        }

        // Bước 3: Kiểm tra user có quyền truy cập vào controller không
        // user.role là string, controllerRole là array
        return controllerRole.includes(user.role);



    }

}