import styled, { createGlobalStyle, css } from "styled-components";
import { ToastContainer } from "react-toastify";
import { cssVariables } from "./variables";

export const Styling = css`
  ${cssVariables}

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
  }

  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, sans-serif;
    color: var(--text);
    background: var(--background);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color var(--transition-fast);
  }

  a:hover {
    color: var(--primary);
  }

  img {
    max-width: 100%;
    display: block;
    height: auto;
  }

  ul,
  ol {
    list-style: none;
  }

  button {
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    transition: all var(--transition-fast);
  }

  input,
  textarea,
  select {
    font-family: inherit;
    outline: none;
    transition: border-color var(--transition-fast);
  }

  /* ==================== CONTAINER ==================== */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 0 20px;
  }

  /* ==================== SCROLLBAR ==================== */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--scroll-track);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--scroll-thumb);
    border-radius: var(--radius-full);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--scroll-thumb-hover);
  }

  /* ==================== UTILITY ==================== */
  .text-center {
    text-align: center;
  }

  .text-muted {
    color: var(--text-muted);
  }

  .flex {
    display: flex;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .grid {
    display: grid;
  }

  /* ==================== GLOW EFFECT ==================== */
  .glow {
    box-shadow: var(--shadow-glow);
  }

  /* ==================== RESPONSIVE ==================== */
  @media (max-width: 768px) {
    .container {
      padding: 0 16px;
    }
  }

  @media (max-width: 480px) {
    .container {
      padding: 0 12px;
    }
  }
`;

const GlobalStyles = createGlobalStyle`
  ${Styling}
`;

export default GlobalStyles;

export const Wrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

export const LayoutWrapper = styled.main`
  min-height: 100vh;
  padding-top: 80px;
  background: var(--background);
`;

export const WithoutLayoutWrapper = styled.main`
  min-height: 100vh;
`;

export const StyledToastContainer = styled(ToastContainer)`
  z-index: 9999;

  .Toastify__toast {
    border-radius: var(--radius-lg);
    font-family: inherit;
    box-shadow: var(--shadow-lg);
  }

  .Toastify__toast--success {
    background: var(--success);
  }

  .Toastify__toast--error {
    background: var(--danger);
  }

  .Toastify__toast--warning {
    background: var(--warning);
  }
`;