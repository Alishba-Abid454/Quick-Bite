// src/styles/helpers.styles.js

import styled, { css } from "styled-components";

/* Reusable CSS Mixins */

export const Centered = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FlexBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* Flex Component */

export const Flex = styled.div`
  display: flex;

  flex-direction: ${({ direction }) => direction || "row"};

  justify-content: ${({ justify }) =>
    justify || "flex-start"};

  align-items: ${({ align }) =>
    align || "stretch"};

  flex-wrap: ${({ nowrap }) =>
    (nowrap ? "nowrap" : "wrap")};

  gap: ${({ gap }) => gap || "0"};

  width: ${({ width }) => width || "100%"};

  ${({ center }) =>
    center &&
    css`
      justify-content: center;
      align-items: center;
    `}
`;

/*  Grid Component */

export const Grid = styled.div`
  display: grid;

  grid-template-columns: ${({ cols = 3 }) =>
    `repeat(${cols}, minmax(0, 1fr))`};

  gap: ${({ gap }) => gap || "20px"};

  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

/* Container */

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 0 20px;
`;

/* Wrapper */

export const Wrapper = styled.div`
  width: 100%;
  padding: ${({ padding }) => padding || "0"};
`;

/* Section */

export const Section = styled.section`
  padding: ${({ padding }) => padding || "80px 0"};
`;

/* Card */

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: ${({ padding }) => padding || "24px"};

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.12);
  }
`;

/*  Button */

export const Button = styled.button`
  padding: ${({ padding }) => padding || "12px 24px"};

  background: ${({ secondary }) =>
    secondary ? "#ffffff" : "var(--primary)"};

  color: ${({ secondary }) =>
    secondary ? "var(--primary)" : "#ffffff"};

  border: ${({ secondary }) =>
    secondary
      ? "2px solid var(--primary)"
      : "none"};

  border-radius: 10px;

  cursor: pointer;

  font-size: 16px;
  font-weight: 600;

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);

    background: ${({ secondary }) =>
      secondary
        ? "var(--primary)"
        : "var(--primary-dark)"};

    color: white;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/*  Image */

export const Image = styled.img`
  width: ${({ width }) => width || "100%"};

  height: ${({ height }) => height || "auto"};

  object-fit: ${({ fit }) => fit || "cover"};

  border-radius: ${({ radius }) => radius || "0"};
`;

/*  Form */

export const StyledFormGroup = styled.div`
  width: 100%;
  margin-bottom: ${({ noMargin }) =>
    noMargin ? "0" : "20px"};
`;

export const InputHolder = styled.div`
  position: relative;
`;

/* Divider */

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: var(--border);
  margin: 20px 0;
`;

/* Badge */

export const Badge = styled.span`
  display: inline-block;

  padding: 6px 12px;

  border-radius: 999px;

  font-size: 12px;
  font-weight: 600;

  background: ${({ type }) => {
    switch (type) {
      case "success":
        return "var(--success)";
      case "warning":
        return "var(--warning)";
      case "danger":
        return "var(--danger)";
      default:
        return "var(--primary)";
    }
  }};

  color: white;
`;

/*  Text */

export const Text = styled.p`
  color: ${({ muted }) =>
    muted ? "var(--text-muted)" : "var(--text)"};

  font-size: ${({ size }) => size || "16px"};

  font-weight: ${({ weight }) => weight || 400};

  text-align: ${({ align }) => align || "left"};

  line-height: 1.6;
`;