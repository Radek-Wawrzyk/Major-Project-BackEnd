import { Request } from 'express';
import { AuthTokenedUserDto } from 'src/modules/auth/auth.dto';

interface AppRequest extends Request {
  user?: AuthTokenedUserDto;
}

export { AppRequest };
