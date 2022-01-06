import * as React from "react";

export const TrashIcon: React.FC<Props> = ({ color, size, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.6667 3.33333L15 5H6.66667V8.33333H8.33334V33.3333C8.33334 34.2037 8.65222 35.091 9.2806 35.7194C9.90898 36.3478 10.7963 36.6667 11.6667 36.6667H28.3333C29.2037 36.6667 30.091 36.3478 30.7194 35.7194C31.3478 35.091 31.6667 34.2037 31.6667 33.3333V8.33333H33.3333V5H25L23.3333 3.33333H16.6667ZM11.6667 8.33333H28.3333V33.3333H11.6667V8.33333ZM15 11.6667V30H18.3333V11.6667H15ZM21.6667 11.6667V30H25V11.6667H21.6667Z"
      fill={color}
    />
  </svg>
);

TrashIcon.defaultProps = {
  size: 40,
  color: '#BEBEBE',
}

type Props = {
  color?: string,
  size?: number,
}