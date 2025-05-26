import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

import { Sidebar } from '@/components/Sidebar/Sidebar';
import { LogTable } from '@/components/table/LogTable';
import { TextArea } from '@/components/textarea/TextArea';
import type { LogEntry } from '@/types';

const SEVERITIES = ['DEBUG', 'INFO', 'WARN', 'ERROR'];

const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
  margin: 10px;
`;

const StyledSidebarContainer = styled.div`
  display: flex;
  height: 100%;
`;

const StyledMainContent = styled.div`
  width: 100%;
`;

// eslint-disable-next-line max-lines-per-function
const App: React.FC = () => {
  const [allLogs, setAllLogs] = useState<LogEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverities, setSelectedSeverities] = useState<string[]>(SEVERITIES);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSeverityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const severity = e.target.value;
    setSelectedSeverities((prev) =>
      prev.includes(severity) ? prev.filter((s) => s !== severity) : [...prev, severity],
    );
  };

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSearchQuery(value);
    }, 300);
  }, []);

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
    <StyledAppContainer>
      <StyledSidebarContainer>
        <Sidebar
          sidebarTitle={'Quick filter'}
          sidebarItems={SEVERITIES}
          onChange={handleSeverityChange}
          selectedSeverities={selectedSeverities}
        />
      </StyledSidebarContainer>
      <StyledMainContent>
        <TextArea onChange={handleSearchChange} />
        <LogTable
          logData={allLogs}
          searchQuery={searchQuery}
          selectedSeverities={selectedSeverities}
        />
      </StyledMainContent>
    </StyledAppContainer>
  );
};

export default App;
