import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/userEntity.entity';
import { CreateUserDto } from './dto/createUserDto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByUsername(createUserDto.username);
    if (existingUser) {
      return null;
    }
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.getUserById(id);
    user.username = updateUserDto.username;
    user.role = updateUserDto.role;
    user.online = updateUserDto.online;
    return await this.userRepository.save(user);
  }

  async findAllUsers(id: string): Promise<UserEntity[]> {
    const allUsers = await this.userRepository.find();

    const usersWithoutPassword = allUsers
      .filter(user => user.id !== id) 
      .map(user => {
        user.removePassword(); 
        return user;
      });
  
    return usersWithoutPassword;
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  //@TODO
  async findByUsername(username: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    return user || null;
  }

  async getUserRoleById(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user.role;
  }

  //@deprecated: rm
  async setUserOnlineById(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    user.online = true;
    await this.userRepository.save(user);
  }
  //@deprecated: rm
  async setUserOfflineById(id: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    user.online = false;
    await this.userRepository.save(user);
  }

  async updateUserOnlineStatus(id: string, status: boolean) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    user.online = status;
    await this.userRepository.save(user);
  }

  async getOnlineUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({ where: { online: true } });
  }
}
