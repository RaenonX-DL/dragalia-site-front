import {IncomingMessage, ServerResponse} from 'http';
import {UrlWithParsedQuery} from 'url';


export type Server = {
  QueryString: {},
  Headers: {}
}

export type ServerHasLang = Server & {
  Params: {lang: string},
}

export type NextHandler = (req: IncomingMessage, res: ServerResponse, parsedUrl: UrlWithParsedQuery) => Promise<any>
