import { Provider } from '@nestjs/common';
import { IUSERS_SERVICE_PROVIDER } from '../../constants';
import { UsersService } from './users.service';

export const usersServiceProvider: Provider = {
  provide: IUSERS_SERVICE_PROVIDER,
  useClass: UsersService,
};
