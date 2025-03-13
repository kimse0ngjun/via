/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const title = css`
  font-size: 24px;
  font-weight: bold;
  font-style: italic;
  margin-bottom: 30px;
`;

export const form = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const row = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const label = css`
  font-weight: bold;
  font-style: italic;
  width: 80px;
  text-align: right;
`;

export const input = css`
  width: 250px;
  border: none;
  border-bottom: 1px solid #a06baf;
  padding: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-bottom: 2px solid #a06baf;
  }
`;

export const warningText = css`
  font-size: 12px;
  color: #ff3d3d;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const signUpButton = css`
  margin-top: 20px;
  width: 100%;
  background-color: #a06baf;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  &:hover {
    background-color: #8c5a9d;
  }
`;
