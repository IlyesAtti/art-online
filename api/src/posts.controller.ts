import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  UseInterceptors,
  UploadedFile,
  UnauthorizedException
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './upload.config';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AppService } from './app.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly jwtService: JwtService,
    private readonly appService: AppService,
  ) {}

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get('my-posts')
  async findMyPosts(@Req() request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException('User not authenticated');
    }

    const user = await this.appService.findOneUser(data['id']);

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.postsService.findByUser(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Req() request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException('User not authenticated');
    }

    const user = await this.appService.findOneUser(data['id']);

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.postsService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage }))
  async create(
    @Body() postData,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException('User not authenticated');
    }

    const user = await this.appService.findOneUser(data['id']);

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const createData = {
      title: postData.title,
      description: postData.description,
      image: file ? `/uploads/images/${file.filename}`  : postData.imageLink,
      link: postData.link,
      status: postData.status !== undefined ? postData.status : true,
    };

    return this.postsService.create(createData, user);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async update(
    @Param('id') id: number,
    @Body() postData,
    @UploadedFile() file: Express.Multer.File,
    @Req() request: Request,
  ) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException('User not authenticated');
    }

    const user = await this.appService.findOneUser(data['id']);

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const updateData = {
      title: postData.title,
      description: postData.description,
      image: file ? `/uploads/images/${file.filename}`  : postData.imageLink,
      link: postData.link,
      status: postData.status === 'true',
    };

    return this.postsService.update(id, updateData, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException('User not authenticated');
    }

    const user = await this.appService.findOneUser(data['id']);

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    return this.postsService.remove(id, user);
  }
}
