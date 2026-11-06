import { SetMetadata } from "@nestjs/common";
import { Role } from "../../common/enums/role.enum.js";

export const ROLE_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);