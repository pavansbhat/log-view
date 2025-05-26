import type { LogEntry } from '@/types';

export const fetchSimulatedLogEntries = async (
  page: number,
  pageSize: number = 100,
  allLogs: LogEntry[] = [],
): Promise<{ entries: LogEntry[]; hasMore: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const paginatedLogs = allLogs.slice(start, end);

      const hasMoreLogs = end < allLogs.length;

      resolve({
        entries: paginatedLogs,
        hasMore: hasMoreLogs,
      });
    }, 500);
  });
};
