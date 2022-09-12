import { RoleUser } from '../enum/role-user.enum';
import { StatusUser } from '../enum/status-user.enum';

export class RegisterUser {
  email: string;
  password: string;
  role?: RoleUser;
  status?: StatusUser;
}
