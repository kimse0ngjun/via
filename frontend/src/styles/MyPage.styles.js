/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const container = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
`;

export const card = css`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

export const profileContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const username = css`
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
`;

export const email = css`
  font-size: 16px;
  color: #888;
  margin: 5px 0;
`;

export const editButton = css`
  margin-top: 10px;
  width: 100%;
`;

export const logoutButton = css`
  margin-top: 10px;
  width: 100%;
  background-color: #ff4d4f;
  color: white;
  &:hover {
    background-color: #ff7875;
  }
`;

export const activityCard = css`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

export const activityList = css`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const activityItem = css`
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
`;
