import { IsNotEmpty, MinLength } from 'class-validator'

export class DeleteNewsDto {
  @IsNotEmpty()
  @MinLength(1)
  id: string
}
