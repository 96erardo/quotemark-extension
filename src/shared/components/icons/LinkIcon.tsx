import * as React from "react";

export const LinkIcon: React.FC<Props> = ({ size, color, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 11.6667C5.39833 11.6667 1.66667 15.3983 1.66667 20C1.66667 24.6017 5.39833 28.3333 10 28.3333H16.6667V25H10C7.23833 25 5 22.7617 5 20C5 17.2383 7.23833 15 10 15H16.6667V11.6667H10ZM23.3333 11.6667V15H30C32.7617 15 35 17.2383 35 20C35 22.7617 32.7617 25 30 25H23.3333V28.3333H30C34.6017 28.3333 38.3333 24.6017 38.3333 20C38.3333 15.3983 34.6017 11.6667 30 11.6667H23.3333ZM11.6667 18.3333V21.6667H28.3333V18.3333H11.6667Z"
      fill={color}
    />
  </svg>
);

LinkIcon.defaultProps = {
  size: 40,
  color: '#BEBEBE'
}

type Props = {
  size?: number,
  color?: string,
}
