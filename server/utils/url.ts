import {ParsedUrlQuery} from 'querystring';
import {URL, UrlWithParsedQuery} from 'url';


export const urlObjectToLegacy = (urlObject: URL, additionalQuery: ParsedUrlQuery): UrlWithParsedQuery => {
  return {
    protocol: urlObject.protocol,
    slashes: true,
    auth: null,
    host: urlObject.host,
    port: urlObject.port,
    hostname: urlObject.hostname,
    hash: urlObject.hash || null,
    search: urlObject.search || null,
    query: {
      ...Object.fromEntries(urlObject.searchParams.entries()),
      ...additionalQuery,
    },
    pathname: urlObject.pathname,
    path: `${urlObject.pathname}${urlObject.search}`,
    href: urlObject.href,
  };
};
