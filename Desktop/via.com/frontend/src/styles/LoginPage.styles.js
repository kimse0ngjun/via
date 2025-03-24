// src/components/LoginPage.styles.js
import { css } from '@emotion/react';

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  flex-direction: column;
`;

export const label = css`
  font-weight: bold;
  width: 60px;
`;

export const input = css`
  width: 250px;
  border: none;
  border-bottom: 1px solid #a06baf;
  border-radius: 0;
  padding: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    box-shadow: none;
    border-bottom: 2px solid #a06baf;
  }
`;

export const loginButton = css`
  margin-top: 20px;
  width: 100%;
  background-color: #8809FF33;
  color: black;
  border: none;
  border: 1px solid black;
  border-radius: 20px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;

  &:hover {
    background-color: #8809FF80;
  }
`;

export const passwordReset = css`
  margin-top: 10px;
  text-align: center;
  
`;

export const passwordLink = css`
  color: black;
  text-decoration: none;
  &:hover{
    color : #8809FF80;
  }
  `;