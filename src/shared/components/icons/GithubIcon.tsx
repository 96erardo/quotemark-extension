import * as React from "react";

export const GithubIcon: React.FC<Props> = ({ size, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.2328 37.4688C14.8016 37.224 15.2 36.6584 15.2 36V31.68C15.2 31.5224 15.2128 31.3584 15.2328 31.192C15.2216 31.1952 15.2112 31.1976 15.2 31.2C15.2 31.2 12.8 31.2 12.32 31.2C11.12 31.2 10.08 30.72 9.59999 29.76C9.03999 28.72 8.79999 26.96 7.35999 26C7.11999 25.84 7.27999 25.6 7.75999 25.6C8.23999 25.68 9.27999 26.32 9.91999 27.2C10.64 28.08 11.36 28.8 12.64 28.8C14.6296 28.8 15.696 28.7 16.3376 28.356C17.0848 27.2448 18.1192 26.4 19.2 26.4V26.38C14.6656 26.2344 11.7688 24.7272 10.42 22.4C7.48799 22.4336 4.93519 22.724 3.47839 22.9656C3.43199 22.704 3.39199 22.4408 3.35759 22.176C4.79519 21.9392 7.23199 21.6584 10.0336 21.6048C9.94399 21.384 9.86639 21.1576 9.80079 20.9256C6.99199 20.7832 4.56799 20.8944 3.25119 21.0032C3.23519 20.7376 3.21359 20.4728 3.21039 20.204C4.52959 20.096 6.88799 19.988 9.62479 20.1152C9.56159 19.7152 9.52079 19.3064 9.52079 18.8808C9.52079 17.5208 10.0008 16.0808 10.8808 14.8808C10.4808 13.5208 9.92079 10.6408 11.0408 9.60079C13.2008 9.60079 14.7208 10.6408 15.4408 11.2808C16.8 10.72 18.32 10.4 20 10.4C21.68 10.4 23.2 10.72 24.48 11.28C25.2 10.64 26.72 9.59999 28.88 9.59999C30.08 10.72 29.44 13.6 29.04 14.88C29.92 16.08 30.4 17.44 30.32 18.88C30.32 19.2672 30.284 19.6408 30.232 20.0072C33.0312 19.8696 35.4536 19.98 36.7952 20.0888C36.7936 20.3584 36.7688 20.6216 36.7544 20.888C35.4176 20.7776 32.9344 20.664 30.0672 20.8168C29.996 21.0856 29.9096 21.3472 29.8072 21.6008C32.644 21.6376 35.1392 21.912 36.6456 22.152C36.6112 22.4176 36.5712 22.6808 36.5248 22.9416C34.9952 22.6968 32.388 22.4104 29.4216 22.396C28.0896 24.6984 25.2456 26.2 20.8 26.3752V26.4C22.88 26.4 24.8 29.52 24.8 31.68V36C24.8 36.6584 25.1984 37.224 25.7672 37.4688C33.096 35.0432 38.4 28.1312 38.4 20C38.4 9.85439 30.1464 1.59999 20 1.59999C9.85359 1.59999 1.59999 9.85439 1.59999 20C1.59999 28.1312 6.90399 35.0432 14.2328 37.4688Z"
      fill="black"
    />
  </svg>
);

type Props = {
  size?: number
}

GithubIcon.defaultProps = {
  size: 40
}