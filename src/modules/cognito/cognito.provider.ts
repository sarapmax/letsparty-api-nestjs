import { Provider } from '@nestjs/common';
import { ICOGNITO_SERVICE_PROVIDER } from '../../constants';
import { CognitoService } from './cognito.service';

export const cognitoServiceProvider: Provider = {
  provide: ICOGNITO_SERVICE_PROVIDER,
  useClass: CognitoService,
};
