import { User } from "../entities/User";
import { AppDataSource } from "../data-source";
import {
  CreateUserDtoType,
  UpdateUserDtoType,
  UserResponseDto,
} from "../Dtos/User.dto";
import { ILike } from "typeorm";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser(userData: CreateUserDtoType): Promise<UserResponseDto> {
    const user = this.userRepository.create({
      ...userData,
      isVerified: userData.type === "admin",
    });
    const savedUser = await this.userRepository.save(user);
    return this.toUserDto(savedUser);
  }

  async getAllUsers(
    page: number, 
    pageSize: number, 
    sortBy: string, 
    sortOrder: 'ASC' | 'DESC'
  ): Promise<{ users: UserResponseDto[]; total: number }> {
    const [users, total] = await this.userRepository.findAndCount({
      order: {
        [sortBy]: sortOrder
      },
      skip: (page - 1) * pageSize,
      take: pageSize
    });
  
    return { 
      users: users.map(this.toUserDto), 
      total 
    };
  }
  


  async updateUser(
    id: number,
    userData: UpdateUserDtoType
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }

    Object.assign(user, userData);
    const updatedUser = await this.userRepository.save(user);
    return this.toUserDto(updatedUser);
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete(id);
    return result;
  }

  async getUserById(id: number): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findOneBy({ id });
    return user ? this.toUserDto(user) : null;
  }

  async searchUsers(query: string): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({
      where: [
        { name: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) }
      ]
    });
    return users.map(this.toUserDto);
  }

  async verifyUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }

    user.isVerified = true;
    const updatedUser = await this.userRepository.save(user);
    return this.toUserDto(updatedUser);
  }
  

  async blockUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }

    user.isBlocked = true;
    const updatedUser = await this.userRepository.save(user);
    return this.toUserDto(updatedUser);
  }

  async unblockUser(id: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error("User not found");
    }

    user.isBlocked = false;
    const updatedUser = await this.userRepository.save(user);
    return this.toUserDto(updatedUser);
  }

  private toUserDto(user: User): UserResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      type: user.type,
      isVerified: user.isVerified,
      isBlocked: user.isBlocked,
    };
  }
}
