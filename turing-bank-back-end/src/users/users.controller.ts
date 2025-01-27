import { Controller,Get, Post,Put,Delete, Body,Req,Res,Param } from '@nestjs/common';
import {Request,Response} from 'express'
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';


@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}
    @Get()
    async findAll(@Req() req:Request,@Res() res:Response): Promise<Response>{
       console.log(req.url)
       const users = await this.userService.findAll()
       return res.json(users);
    }
    @Get(':id')
    async findOne(@Param('id') id) : Promise<User>{
        return this.userService.findOne(id)
    }
    @Post()
    async create(@Body() createItemDto :CreateUserDto): Promise<User>{
        return this.userService.create(createItemDto)
    }
    @Put(':id')
    async update(@Param('id') id, @Body() updateUserDto : CreateUserDto){
        return this.userService.update(updateUserDto,id)
    }
    @Delete(':id')
    async delete(@Param('id') id){
        return this.userService.remove(id)
    }

}
