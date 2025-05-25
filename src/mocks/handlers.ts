import { http, HttpResponse, delay } from 'msw';
import allLogsData from './data/logs.json';

const ALL_LOGS_API_URL = '/api/v1/logs';

// Let MSW infer the correct types from the http methods
export const handlers = [
  http.get(ALL_LOGS_API_URL, async () => {
    await delay(500);
    return HttpResponse.json(allLogsData);
  }),
];
