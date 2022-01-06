import * as React from "react";

export const HouseIcon: React.FC<Props> = ({
  size = 40,
  color = '#BEBEBE',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.00016 1.22478L0.583496 7.00001H2.3335V12.25H5.25016V8.16667H8.75016V12.25H11.6668V7.00001H13.4168L11.0835 4.90023V2.33334H9.91683V3.84978L7.00016 1.22478Z"
      fill={color}
      fillOpacity={0.51}
    />
  </svg>
);

type Props = {
  size?: number,
  color?: string,
}