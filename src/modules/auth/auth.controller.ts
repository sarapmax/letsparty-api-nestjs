import { Controller, UseGuards, Post, Request, HttpStatus, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDataReqDto } from './dto/requests/login-user-data-req.dto';
import { CheckUserAuthResDto } from './dto/responses/check-user-auth-res.dto';
import { User } from '../users/user.model';
import { LoginSuccessResDto } from './dto/responses/login-success-res.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Log-in user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Log-in with user email and password', type: [LoginSuccessResDto] })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  public async login(@Request() req: LoginUserDataReqDto): Promise<LoginSuccessResDto> {
    const loggedInUser: LoginSuccessResDto = await this.authService.login(req.user);

    return new LoginSuccessResDto(loggedInUser);
  }

  @ApiOperation({ summary: 'Check user authentication' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Check if token is valid and return the current user' })
  @UseGuards(AuthGuard('jwt'))
  @Get('/check')
  public async checkUser(@Request() req: LoginUserDataReqDto): Promise<CheckUserAuthResDto> {
    const loggedInUser: User = await this.authService.check(req.user);

    return new CheckUserAuthResDto(loggedInUser);
  }
}

