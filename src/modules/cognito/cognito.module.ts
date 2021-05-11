import { Module } from '@nestjs/common';
import { ConfigModule } from '@scgwedotech/nestjs-config';
import { cognitoServiceProvider } from './cognito.provider';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    cognitoServiceProvider,
  ],
  controllers: [
  ],
  exports: [
    cognitoServiceProvider,
  ],
})
export class CognitoModule {}
