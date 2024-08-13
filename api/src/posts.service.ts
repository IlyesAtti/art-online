import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  async create(postData: Partial<Post>, user: User): Promise<Post> {
    const post = new Post();
    post.title = postData.title || ''; 
    post.description = postData.description || ''; 
    post.image = postData.image || ''; 
    post.link = postData.link || '';
    post.status = postData.status !== undefined ? postData.status : true;
    post.user = user; 
  
    try {
      return await this.postRepository.save(post);
    } catch (error) {
      console.error('Error saving post:', error);
      throw new Error('Failed to save post');
    }
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  async findByUser(user: User): Promise<Post[]> {
    return this.postRepository.find({ where: { user }, relations: ['user'] });
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, postData: Partial<Post>, user: User): Promise<Post> {
    const post = await this.findOne(id);
    if (!post) {
      throw new Error('Post not found');
    }
    if (post.user.id !== user.id) {
      throw new Error('You can only edit your own posts');
    }

    post.title = postData.title || post.title;
    post.description = postData.description || post.description;
    post.image = postData.image || post.image;
    post.link = postData.link || post.link;
    post.status = postData.status !== undefined ? postData.status : post.status;

    return this.postRepository.save(post);
  }

  async remove(id: number, user: User): Promise<void> {
    const post = await this.findOne(id);
    if (!post) {
      throw new Error('Post not found');
    }
    if (post.user.id !== user.id) {
      throw new Error('You can only delete your own posts');
    }
    await this.postRepository.remove(post);
  }
}
