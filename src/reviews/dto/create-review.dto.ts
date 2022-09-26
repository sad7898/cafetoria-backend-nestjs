import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateReviewDto {
    @ApiProperty({type: String})
    @IsString()
    text: string
    @ApiProperty({type: Number})
    @IsNumber()
    @Min(0)
    @Max(10)
    rate: number
    
    
}
