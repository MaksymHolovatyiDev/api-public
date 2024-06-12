import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'

/*files*/
import { DeleteNewsDto } from './dto/delete-news.dto'

@Injectable()
export class NewService {
  constructor(@Inject('NEWS_SERVICE') private readonly client: ClientProxy) {}

  async getAllNews(searchTerm: string, publishedBefore: string, publishedAfter: string, page: number, limit: number) {
    const ObservableResponse = this.client.send('get-all-news', {
      searchTerm,
      publishedBefore,
      publishedAfter,
      page,
      limit,
    })
    const res = await lastValueFrom(ObservableResponse)

    if (res?.driverError?.name) throw new HttpException('Failed to update item', HttpStatus.UNPROCESSABLE_ENTITY)

    return res.items
  }

  async getItemById(id: string) {
    const getItem = this.client.send('get-item', { id })

    const result = await lastValueFrom(getItem)

    if (result?.driverError?.name) throw new HttpException('Failed to get item', HttpStatus.UNPROCESSABLE_ENTITY)
    if (!result) throw new NotFoundException()

    return result
  }

  async createItem(author: string, content: string, title: string, published: boolean) {
    const createdItem = this.client.send('create-item', {
      author,
      content,
      title,
      published,
    })

    const result = await lastValueFrom(createdItem)

    if (result?.driverError?.name) throw new HttpException('Failed to create item', HttpStatus.UNPROCESSABLE_ENTITY)

    return result
  }

  async updateItem(id: number, author: string, content: string, title: string, published: boolean) {
    const updatedItem = this.client.send('update-item', {
      id,
      data: {
        author,
        content,
        title,
        published,
      },
    })

    const result = await lastValueFrom(updatedItem)

    if (result?.driverError?.name) throw new HttpException('Failed to update item', HttpStatus.UNPROCESSABLE_ENTITY)
    if (!result) throw new NotFoundException()

    return result
  }

  async deleteItem({ id }: DeleteNewsDto) {
    const ObservableResponse = this.client.send('delete-item', { id })
    const res = await lastValueFrom(ObservableResponse)

    if (res?.driverError?.name) throw new HttpException('Failed to delete item', HttpStatus.UNPROCESSABLE_ENTITY)
    if (!res?.affected) throw new NotFoundException()

    return
  }
}
