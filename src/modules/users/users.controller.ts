import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Post, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserBodyDto } from './dto/bodies/add-user-body.dto';
import { UpdateUserBodyDto } from './dto/bodies/update-user-body.dto';
import { GetUserParamDto } from './dto/params/get-user-param.dto';
import { DeleteUserResDto } from './dto/responses/delete-user-res.dto';
import { GetUserResDto } from './dto/responses/get-user-res.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { SaveUserResDto } from './dto/responses/save-user-res.dto';
import { RECORD_UPDATED } from 'src/constants';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get all users from database', type: [GetUserResDto] })
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  public async findAll(): Promise<GetUserResDto[]> {
    const users: User[] = await this.usersService.findAll();
    return users.map((user: User): GetUserResDto => new GetUserResDto(user));
  }

  @ApiOperation({ summary: 'Get specific user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search user by id and return it\'s values', type: GetUserResDto })
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  public async findOne(@Param() param: GetUserParamDto): Promise<GetUserResDto> {
    const user: User = await this.usersService.findOne(param.id);

    return new GetUserResDto(user);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Add new user to database', type: SaveUserResDto })
  @Post('/')
  @UseInterceptors(FileInterceptor('avatar'))
  public async create(@UploadedFile() avatar: Express.Multer.File, @Body() body: AddUserBodyDto): Promise<SaveUserResDto> {
    const user: User = await this.usersService.create(avatar, body);
    return new SaveUserResDto(user);
  }

  @ApiOperation({ summary: 'Update user detail' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search user by id and update it\'s details', type: SaveUserResDto })
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  public async update(@Body() body: UpdateUserBodyDto, @Param() param: GetUserParamDto): Promise<SaveUserResDto> {
    const user: User = await this.usersService.update(param.id, body);
    return new SaveUserResDto(user, RECORD_UPDATED);
  }

  @ApiOperation({ summary: 'Delete specific user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search user by id and delete it', type: DeleteUserResDto })
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  public async destroy(@Param() param: GetUserParamDto): Promise<DeleteUserResDto> {
    await this.usersService.destroy(param.id);
    return new DeleteUserResDto();
  }
}
