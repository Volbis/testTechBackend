import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

/** Contrôleur pour la gestion des utilisateurs */
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** Crée un utilisateur (POST /users) */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /** Récupère tous les utilisateurs avec leurs transactions (GET /users) */
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  /** Récupère un utilisateur par ID (GET /users/:id) */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
