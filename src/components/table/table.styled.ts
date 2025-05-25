import styled from 'styled-components';

export const TableContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #ffffff;
  margin: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #333;
  font-size: 13px;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  perspective: 1000px;
  position: relative;
`;

export const TableHeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0;
  background-color: #ffffff;
`;

export const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #333;
`;

export const CustomizeButton = styled.button`
  background-color: #f8f9fa;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const ScrollableTableWrapper = styled.div`
  overflow-y: auto;
  flex: 1;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-overflow-scrolling: touch;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const StyledThead = styled.thead`
  background-color: #f9fafb;
  position: sticky;
  top: 0;
  z-index: 10;
  will-change: transform;
  transform: translateZ(0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: #e0e0e0;
  }
`;

export const StyledTr = styled.tr`
  border-bottom: 1px solid #e8e8e8;
  &:last-child {
    border-bottom: none;
  }
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform;
  transition: background-color 0.1s ease;
`;

export const StyledTh = styled.th`
  text-align: left;
  padding: 10px 12px;
  font-weight: 500;
  color: #555;
  border-right: 1px solid #e8e8e8;
  background-color: #f9fafb;

  &:last-child {
    border-right: none;
  }
`;

export const DateTh = styled(StyledTh)`
  width: 140px;
  white-space: nowrap;
`;

export const SeverityTh = styled(StyledTh)`
  width: 80px;
  white-space: nowrap;
`;

export const MessageTh = styled(StyledTh)``;

export const StyledTd = styled.td`
  padding: 9px 12px;
  vertical-align: top;
  line-height: 1.5;
`;

export const RowMarkerTd = styled(StyledTd)`
  width: 10px;
  padding: 9px 0px 9px 0px;
  border-left: 2px solid #4a90e2;
`;

export const DateTd = styled(StyledTd)`
  width: 140px;
  white-space: nowrap;
  color: #555;
`;

export const SeverityTd = styled(StyledTd)`
  width: 80px;
  white-space: nowrap;
  color: #555;
`;

export const MessageContentTd = styled(StyledTd)`
  word-break: break-all;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  color: #333;
`;

export const PlusSign = styled.span`
  color: #999;
  margin-right: 8px;
  display: inline-block;
  user-select: none;
`;

export const LoadingIndicator = styled.div`
  padding: 20px;
  text-align: center;
  color: #777;
  font-style: italic;
`;

export const CustomizeDropdown = styled.div`
  position: absolute;
  top: 45px;
  right: 16px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 200px;
`;

export const DropdownTitle = styled.h3`
  font-size: 14px;
  margin: 0 0 10px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
`;
