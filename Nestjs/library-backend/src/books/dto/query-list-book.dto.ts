import { IsNotEmpty } from "class-validator";

export class QueryListBookDto {
    @IsOptional()
    @Min(1)
    @IsInt()
    @Type(()=>Number)
    page?:number = 1;

    @IsOptional()
    @Min(1)
    @IsInt()
    @Type(()=>Number)
    limit?:number= 10;
}
