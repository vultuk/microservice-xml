import {Response} from 'express';
import converter from 'jsontoxml';

import {Options} from '.';

export const convert = (response: Response) => async (
  data: any,
  fileName: string,
  appendTimestamp: boolean = true,
  options?: Options,
): Promise<void> => {
  const convertedData = converter(data, options);

  const timestamp = `${['year', 'month', 'day'].map((d) => getDateField(d)).join('')}.${['hour', 'minute']
    .map((d) => getDateField(d))
    .join('')}`;

  const filename = `${fileName}${appendTimestamp ? `.${timestamp}` : ''}.xml`;

  response.header('Content-Type', 'application/xml');
  response.attachment(filename);

  response.send(convertedData);
};

const getDateField = (field: string): string => {
  const currentDate = new Date();
  let returnDate: number = 0;

  switch (field) {
    case 'year':
      returnDate = currentDate.getFullYear();
      break;
    case 'month':
      returnDate = currentDate.getMonth();
      break;
    case 'day':
      returnDate = currentDate.getDate();
      break;
    case 'hour':
      returnDate = currentDate.getHours();
      break;
    default:
      returnDate = currentDate.getMinutes();
      break;
  }

  return `00000000000${returnDate}`.substr(field === 'year' ? -4 : -2);
};
