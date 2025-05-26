import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  min-width: calc(20% - 100px);
  width: 10em;
  padding: 16px;
  border-right: 1px solid #eee;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  height: calc(100vh - 60px);
`;

export const SidebarHeader = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;
