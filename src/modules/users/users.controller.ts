import { Body, Controller, Delete, Get, HttpStatus, Param, Put, Post, UseGuards, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddUserBodyDto } from './dto/bodies/add-user-body.dto';
import { UpdateUserBodyDto } from './dto/bodies/update-user-body.dto';
import { GetUserParamDto } from './dto/params/get-user-param.dto';
import { DeleteUserResDto } from './dto/responses/delete-user-res.dto';
import { GetUserResDto } from './dto/responses/get-user-res.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { GetUserQueryDto } from './dto/queries/get-user-query.dto';
import { SaveUserResDto } from './dto/responses/save-user-res.dto';
import { RECORD_UPDATED } from 'src/constants';
import { AddCognitoUserBodyDto } from './dto/bodies/add-cognito-user-body.dto';
import { AddCognitoUserResDto } from './dto/responses/add-cognito-user-res.dto';

@ApiTags('Users')
@Controller('/v1/users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Get all users from database', type: [GetUserResDto] })
  @Get('/')
  public async findAll(@Query() query: GetUserQueryDto): Promise<GetUserResDto[]> {
    const users: User[] = await this.usersService.findAll(query);
    return users.map((user: User): GetUserResDto => new GetUserResDto(user));
  }

  @ApiOperation({ summary: 'Get specific user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search user by id and return it\'s values', type: GetUserResDto })
  @Get('/:id')
  public async findOne(@Param() param: GetUserParamDto): Promise<GetUserResDto> {
    const user: User = await this.usersService.findOne(param.id);

    return new GetUserResDto(user);
  }

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Add new user to database', type: GetUserResDto })
  @Post('/')
  public async create(@Body() body: AddUserBodyDto): Promise<SaveUserResDto> {
    const user: User = await this.usersService.createUserAndCognitoUser(body);
    return new SaveUserResDto(user);
  }

  @ApiOperation({ summary: 'Create cognito user' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Add new user to AWS cognito', type: AddCognitoUserResDto })
  @Post('/cognito')
  public async addCognitoUser(@Body() body: AddCognitoUserBodyDto): Promise<AddCognitoUserResDto> {
    await this.usersService.createCognitoUser(body.email, body.password);
    return new AddCognitoUserResDto();
  }

  @ApiOperation({ summary: 'Update user detail' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search user by id and update it\'s details', type: GetUserResDto })
  @Put('/:id')
  public async update(@Body() body: UpdateUserBodyDto, @Param() param: GetUserParamDto): Promise<SaveUserResDto> {
    const user: User = await this.usersService.update(param.id, body);
    return new SaveUserResDto(user, RECORD_UPDATED);
  }

  @ApiOperation({ summary: 'Delete specific user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Search user by id and delete it', type: DeleteUserResDto })
  @Delete('/:id')
  public async destroy(@Param() param: GetUserParamDto): Promise<DeleteUserResDto> {
    await this.usersService.destroy(param.id);
    return new DeleteUserResDto();
  }

}
