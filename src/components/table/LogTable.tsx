import { format } from 'date-fns';
import React, { useState, useEffect, useRef, useCallback } from 'react';

import { Checkbox } from '@/components/Checkbox/Checkbox';
import {
  CustomizeButton,
  DateTd,
  DateTh,
  MessageContentTd,
  MessageTh,
  PlusSign,
  RowMarkerTd,
  ScrollableTableWrapper,
  SeverityTd,
  SeverityTh,
  StyledTable,
  StyledTh,
  StyledThead,
  StyledTr,
  TableContainer,
  TableHeaderSection,
  Title,
  LoadingIndicator,
  CustomizeDropdown,
  DropdownTitle,
} from '@/components/table/table.styled';

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

interface LogTableProps {
  logData: LogEntry[];
}

export const LogTable: React.FC<LogTableProps> = ({ logData }) => {
  const [displayedLogs, setDisplayedLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [dateVisible, setDateVisible] = useState(() => {
    const saved = localStorage.getItem('logTable_dateVisible');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [severityVisible, setSeverityVisible] = useState(() => {
    const saved = localStorage.getItem('logTable_severityVisible');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [messageVisible, setMessageVisible] = useState(() => {
    const saved = localStorage.getItem('logTable_messageVisible');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const loadLogs = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const { entries: newLogs, hasMore: moreAvailable } = await fetchSimulatedLogEntries(
        currentPage,
        100,
        logData,
      );
      if (currentPage === 1) {
        setDisplayedLogs(newLogs);
      } else {
        setDisplayedLogs((prev) => [...prev, ...newLogs]);
      }
      setCurrentPage(currentPage + 1);
      setHasMore(moreAvailable);
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, logData]);
  useEffect(() => {
    setCurrentPage(1);
    setTimeout(() => loadLogs(), 0);
  }, [logData]);
  useEffect(() => {
    if (!hasMore) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loading) {
          loadLogs().then((result) => result);
        }
      },
      { rootMargin: '0px 0px 100px 0px' },
    );
    const currentElement = observerRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    return () => {
      observer.disconnect();
    };
  }, [loadLogs, hasMore, loading]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isCustomizeOpen && !target.closest('[data-customize-container]')) {
        setIsCustomizeOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (isCustomizeOpen && event.key === 'Escape') {
        setIsCustomizeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isCustomizeOpen]);

  const toggleDateVisible = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isVisible = e.target.checked;
    setDateVisible(isVisible);
    localStorage.setItem('logTable_dateVisible', JSON.stringify(isVisible));
  };

  const toggleSeverityVisible = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isVisible = e.target.checked;
    setSeverityVisible(isVisible);
    localStorage.setItem('logTable_severityVisible', JSON.stringify(isVisible));
  };

  const toggleMessageVisible = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isVisible = e.target.checked;
    setMessageVisible(isVisible);
    localStorage.setItem('logTable_messageVisible', JSON.stringify(isVisible));
  };

  return (
    <TableContainer>
      <TableHeaderSection>
        <Title>Live Tail</Title>
        <div style={{ position: 'relative' }} data-customize-container="">
          <CustomizeButton onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}>
            <span role="img" aria-label="customize icon">
              📊
            </span>
            Customize
          </CustomizeButton>

          {isCustomizeOpen && (
            <CustomizeDropdown>
              <DropdownTitle>Toggle Visibility</DropdownTitle>
              <Checkbox
                isChecked={dateVisible}
                onChange={toggleDateVisible}
                checkboxId={'date-column'}
              />
              <Checkbox
                isChecked={severityVisible}
                onChange={toggleSeverityVisible}
                checkboxId={'severity-column'}
              />
              <Checkbox
                isChecked={messageVisible}
                onChange={toggleMessageVisible}
                checkboxId={'message-column'}
              />
            </CustomizeDropdown>
          )}
        </div>
      </TableHeaderSection>

      <ScrollableTableWrapper>
        <StyledTable>
          <StyledThead>
            <StyledTr>
              <StyledTh style={{ width: '10px' }}></StyledTh>
              {dateVisible && <DateTh>Date ▼</DateTh>}
              {severityVisible && <SeverityTh>Severity</SeverityTh>}
              {messageVisible && <MessageTh>Message</MessageTh>}
            </StyledTr>
          </StyledThead>
          <tbody>
            {displayedLogs.map((log, index) => (
              <StyledTr key={log.id ?? `log-${index}`}>
                <RowMarkerTd />
                {dateVisible && (
                  <DateTd>{format(parseInt(log.timestamp), 'dd MMM HH:mm:ss')}</DateTd>
                )}
                {severityVisible && <SeverityTd>{log.severity}</SeverityTd>}
                {messageVisible && (
                  <MessageContentTd>
                    <PlusSign>+</PlusSign>
                    {log.body}
                  </MessageContentTd>
                )}
              </StyledTr>
            ))}

            {hasMore && (
              <tr>
                <td
                  colSpan={
                    1 + (dateVisible ? 1 : 0) + (severityVisible ? 1 : 0) + (messageVisible ? 1 : 0)
                  }
                  style={{ padding: '10px 0', backgroundColor: '#f5f5f5' }}
                >
                  <div
                    ref={observerRef}
                    style={{
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: '#999',
                    }}
                  >
                    Loading more...
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>

        {loading && <LoadingIndicator>Loading more logs...</LoadingIndicator>}

        {!loading && !hasMore && displayedLogs.length > 0 && (
          <LoadingIndicator>End of logs.</LoadingIndicator>
        )}
      </ScrollableTableWrapper>
    </TableContainer>
  );
};
