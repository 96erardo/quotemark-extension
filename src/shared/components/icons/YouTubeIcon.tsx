import * as React from "react";

export const YouTubeIcon: React.FC<Props> = ({ size, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M36 28.25C35.6667 30 34.25 31.3333 32.5 31.5833C29.75 32 25.1667 32.5 20 32.5C14.9167 32.5 10.3333 32 7.5 31.5833C5.75 31.3333 4.33333 30 4 28.25C3.66667 26.3333 3.33333 23.5 3.33333 20C3.33333 16.5 3.66666 13.6667 4 11.75C4.33333 10 5.75 8.66667 7.5 8.41667C10.25 8 14.8333 7.5 20 7.5C25.1667 7.5 29.6667 8 32.5 8.41667C34.25 8.66667 35.6667 10 36 11.75C36.3333 13.6667 36.75 16.5 36.75 20C36.6667 23.5 36.3333 26.3333 36 28.25V28.25Z"
      fill="#FF3D00"
    />
    <path
      d="M16.6667 25.8333V14.1667L26.6667 20L16.6667 25.8333Z"
      fill="white"
    />
  </svg>
);

type Props = {
  size?: number
}

YouTubeIcon.defaultProps = {
  size: 40
}