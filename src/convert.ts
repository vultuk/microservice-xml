import {Response} from 'express';
import converter from 'jsontoxml';

import {Options} from '.';

export const convert = (response: Response) => async (data: any, options?: Options): Promise<void> => {
  const convertedData = converter(data, options);

  // response.header('Content-Type', 'application/xml');
  response.send(convertedData);
};
