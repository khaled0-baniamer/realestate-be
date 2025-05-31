import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity'; // Adjust the import based on your file structure
import { CreateUserDto } from './dto/create-user.dto'; // Create a DTO for creating users
import { UpdateUserDto } from './dto/update-user.dto'; // Create a DTO for updating users

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private userRepository: typeof User,
  ) {}

  // Find all users
  async findAll() {
    return this.userRepository.findAll();
  }

  // Find one user by ID
  async findOne(id: number) {
    const user = await this.userRepository.findByPk(id, { raw: true });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  }

  // Create a new user
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({ ...createUserDto });
    return user;
  }

  // Update an existing user
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id); // Check if the user exists
    await user.update(updateUserDto); // Update the user's data
    return user;
  }

  // Delete a user
  async remove(id: number) {
    const user = await this.findOne(id); // Check if the user exists
    await user.destroy(); // Delete the user
    return { message: 'User deleted successfully' };
  }
}
