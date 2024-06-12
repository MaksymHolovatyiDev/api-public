import { IsInt, IsNotEmpty, MinLength } from 'class-validator'

// Dto
import { CreateNewsDto } from './create-news.dto'

export class UpdateNewsDto extends CreateNewsDto {
  @IsNotEmpty()
  @IsInt()
  id: number
}
