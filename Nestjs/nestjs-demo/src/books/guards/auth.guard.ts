// import { Injectable, CanActivate, ExecutionContext, ForbiddenException, NotFoundException } from '@nestjs/common';
// import { BooksService } from '../../app.service.js';
// @Injectable()
// export class AuthorGuard implements CanActivate {
//     constructor(private readonly booksService: BooksService) { }
//     canActivate(context: ExecutionContext): boolean {
//         const request = context.switchToHttp().getRequest();
//         const bookId = parseInt(request.params.id, 10);

//         return true;
//     }
// }