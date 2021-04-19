import { NextFunction, Request, Response } from 'express';

import { convert } from './convert';
import { toXML } from './Types/toXML';

export { Options } from './Types/options';

declare global {
  namespace Express {
    interface Response {
      toXML: toXML;
    }
  }
}

export default (req: Request, res: Response, next: NextFunction) => {
  res.toXML = convert(res);

  next();
};
