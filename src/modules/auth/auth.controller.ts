import { Controller, UseGuards, Post, Request, HttpStatus, Get, Body, Inject, NotFoundException, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { LoginUserDataReqDto } from './dto/requests/login-user-data-req.dto';
import { CheckUserAuthResDto } from './dto/responses/check-user-auth-res.dto';
import { CheckChangePasswordTokenResDto } from './dto/responses/check-token-change-password-res.dto';
import { UsersService } from '../users/users.service';
import { ChangedPasswordResDto } from './dto/responses/change-password-res.dto';
import { InitiateAuthResponse } from '@aws-sdk/client-cognito-identity-provider';
import { AuthUserWithPasswordResDto } from './dto/responses/auth-user-with-password-res.dto';
import {
  ICOGNITO_SERVICE_PROVIDER,RECORD_NOT_FOUND,
  // , USERNAME_FIELD, USERNAME_NOT_SAME
} from '../../constants';
import { ICognitoService } from '../cognito/intefaces/cognito-service.interface';
import { User } from '../users/user.model';
import { ChangePasswordBodyDto } from './dto/bodies/change-password-body.dto';
import { CheckPasswordResetTokenBody } from './dto/bodies/check-password-reset-token-body.dto';
import { AddPasswordResetBodyDto } from './dto/bodies/add-password-reset-body.dto';
import { ResetPasswordSuccessResDto } from './dto/responses/reset-password-success-res.dto';
import { PasswordReset } from './password-reset.model';
import { PasswordResetsService } from './services/password-resets.service';
import { LoginUserBodyDto } from './dto/bodies/login-user-body-dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private userService: UsersService,
    private passwordResetsService: PasswordResetsService,
    @Inject(ICOGNITO_SERVICE_PROVIDER) private readonly cognitoService: ICognitoService,
  ) {}

  @ApiOperation({ summary: 'Auth user with password' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return auth token', type: AuthUserWithPasswordResDto })
  @Post('/login')
  public async authUserWithPassword(@Body() body: LoginUserBodyDto): Promise<AuthUserWithPasswordResDto> {
    const authRes: InitiateAuthResponse = await this.cognitoService.signInWithPassword(body.email, body.password);
    return new AuthUserWithPasswordResDto(authRes.AuthenticationResult);
  }

  @ApiOperation({ summary: 'Check user authentication' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Check if token is valid and return the current user' })
  @UseGuards(AuthGuard('jwt'))
  @Get('/check')
  public async checkUser(@Request() req: LoginUserDataReqDto): Promise<CheckUserAuthResDto> {
    const loggedInUser: User = await this.authService.check(req.user);

    return new CheckUserAuthResDto(loggedInUser);
  }

  @ApiOperation({ summary: 'Reset Password' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Reset password by email', type: [ResetPasswordSuccessResDto] })
  @Post('forget-password')
  public async resetPassword(@Body() body: AddPasswordResetBodyDto): Promise<ResetPasswordSuccessResDto> {
    const user: User = await this.userService.findByEmail(body.email);

    if(!user) {
      throw new NotFoundException(RECORD_NOT_FOUND);
    }

    const passwordReset: PasswordReset = await this.passwordResetsService.upsert(body);
    console.log('link for reset password : ',`http:localhost:3000/changepassword?token=${passwordReset.token}`);

    return new ResetPasswordSuccessResDto(passwordReset);
  }

  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Change user password', type: [CheckChangePasswordTokenResDto] })
  @Post('change-password')
  public async changePassword(@Body() body: ChangePasswordBodyDto): Promise<ChangedPasswordResDto> {
    const passwordReset: PasswordReset = await this.passwordResetsService.findByToken(body.token);

    if (!passwordReset) {
      throw new NotFoundException(RECORD_NOT_FOUND);
    }

    await this.passwordResetsService.destroyByToken(body.token);

    return new ChangedPasswordResDto();
  }

  @ApiOperation({ summary: 'Check token before change password' })
  @ApiResponse({ status: HttpStatus.OK, description: 'check token before change password', type: [CheckChangePasswordTokenResDto] })
  @Get('check-valid-password-reset-token')
  public async checkChangePasswordToken(@Query() query: CheckPasswordResetTokenBody): Promise<CheckChangePasswordTokenResDto> {
    const passwordReset: PasswordReset = await this.passwordResetsService.checkValidToken(query);

    if (!passwordReset) {
      throw new NotFoundException(RECORD_NOT_FOUND);
    }

    return new CheckChangePasswordTokenResDto(passwordReset);
  }
}

