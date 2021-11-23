import * as React from "react";

export const InfoIcon: React.FC<Props> = ({ size, color, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20 1.59999C9.83761 1.59999 1.60001 9.83759 1.60001 20C1.60001 30.1624 9.83761 38.4 20 38.4C30.1624 38.4 38.4 30.1624 38.4 20C38.4 9.83759 30.1624 1.59999 20 1.59999ZM20 8.79999C21.3256 8.79999 22.4 9.87439 22.4 11.2C22.4 12.5256 21.3256 13.6 20 13.6C18.6744 13.6 17.6 12.5256 17.6 11.2C17.6 9.87439 18.6744 8.79999 20 8.79999ZM23.2 30.4H21.6H18.4H16.8V28.8H18.4V18.4H16.8V16.8H18.4H21.6V18.4V28.8H23.2V30.4Z"
      fill={color}
    />
  </svg>
);

InfoIcon.defaultProps = {
  size: 40,
  color: '#BEBEBE',
}

type Props = {
  size?: number,
  color?: string,
}
