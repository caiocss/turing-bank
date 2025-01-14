import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { TransactionsController } from './transactions/transactions.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import {MongooseModule} from '@nestjs/mongoose'
import config from './config/keys';
@Module({
  imports: [UsersModule,MongooseModule.forRoot(config.mongoURI)],
  controllers: [AppController,  TransactionsController],
  providers: [AppService],
})
export class AppModule {}
