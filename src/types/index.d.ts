export interface LogEntry {
  id?: string | number;
  timestamp: string;
  severity: string;
  body?: string;
  numericTimestamp?: number;
}
