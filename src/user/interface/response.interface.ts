import { Prisma } from '@prisma/client';
import { GlobalStatus } from 'shared/enum/global-status.enum';

export interface ResponseUser {
  status: GlobalStatus;
  message: string;
  data: Prisma.UserCreateInput;
}
