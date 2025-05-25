import React, { useEffect, useState } from 'react';
import { LogTable } from '@/components/table/LogTable';

import type { LogEntry } from '@/types';

const App: React.FC = () => {
  const [allLogs, setAllLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const fetchAllLogsData = async () => {
      try {
        const response = await fetch('/api/v1/logs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: LogEntry[] = await response.json();

        const sortedData = data.sort((a, b) => {
          const tsA = a.numericTimestamp ?? parseInt(a.timestamp, 10);
          const tsB = b.numericTimestamp ?? parseInt(b.timestamp, 10);
          return tsB - tsA;
        });
        const dataWithIds = sortedData.map((log, index) => ({
          ...log,
          id: log.id ?? `log-${index}-${new Date(parseInt(log.timestamp, 10)).getTime()}`,
        }));

        setAllLogs(dataWithIds);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error('Failed to fetch all logs:', e.message);
        } else {
          console.error('Failed to fetch all logs:', e);
        }
      }
    };

    fetchAllLogsData()
      .then((res) => res)
      .catch((err) => err);
  }, []);

  return (
    <div>
      <LogTable logData={allLogs} />
    </div>
  );
};

export default App;
