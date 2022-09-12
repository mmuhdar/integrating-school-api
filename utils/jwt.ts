import * as jwt from 'jsonwebtoken';
import { TokenPayload } from 'shared/interface/token-payload.interface';

export const createToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};
