import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common'

/*dto*/
import { CreateNewsDto } from './dto/create-news.dto'
import { UpdateNewsDto } from './dto/update-news.dto'
import { DeleteNewsDto } from './dto/delete-news.dto'

/*interface*/
import { IGetAllNewsQueryParams } from './interfaces/get-news-query.interface'

/*service*/
import { NewService } from './news.service'

@Controller('news')
export class NewsController {
  constructor(private readonly newService: NewService) {}

  @Get('list')
  getAllNews(@Query() query: IGetAllNewsQueryParams) {
    return this.newService.getAllNews(
      query.searchTerm,
      query.publishedBefore,
      query.publishedAfter,
      query.page,
      query.limit,
    )
  }

  @Get('item/:id')
  getItemById(@Param('id') id: string) {
    return this.newService.getItemById(id)
  }

  @Post('create-item')
  @HttpCode(201)
  createItem(@Body() data: CreateNewsDto) {
    return this.newService.createItem(data.author, data.content, data.title, data.published)
  }

  @Put('update-item')
  updateItem(@Body() data: UpdateNewsDto) {
    return this.newService.updateItem(data.id, data.author, data.content, data.title, data.published)
  }

  @Delete('delete-item')
  @HttpCode(204)
  deleteItem(@Body() id: DeleteNewsDto) {
    return this.newService.deleteItem(id)
  }
}
