import { IsBoolean, IsNotEmpty, MinLength } from 'class-validator'

export class CreateNewsDto {
  @IsNotEmpty()
  @MinLength(1)
  title: string

  @IsNotEmpty()
  @MinLength(1)
  content: string

  @IsNotEmpty()
  @MinLength(1)
  author: string

  @IsNotEmpty()
  @IsBoolean()
  published: boolean
}
