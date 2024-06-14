import { RedisModule } from '@nestjs-modules/ioredis'
import { Module } from '@nestjs/common'

/*modules*/
import { NewsModule } from './news/news.module'

@Module({
  imports: [
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://redis:6379',
    }),
    NewsModule,
  ],
})
export class AppModule {}
