import { Options } from './options';

export type toXML = (data: any, fileName: string, appendTimestamp?: boolean, options?: Options) => Promise<void>;
