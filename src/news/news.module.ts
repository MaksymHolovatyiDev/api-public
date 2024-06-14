import { Module } from '@nestjs/common'
import { ClientsModule, Transport } from '@nestjs/microservices'

/*controller*/
import { NewsController } from './news.controller'

/*services*/
import { NewService } from './news.service'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NEWS_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'redis',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [NewsController],
  providers: [NewService],
})
export class NewsModule {}
