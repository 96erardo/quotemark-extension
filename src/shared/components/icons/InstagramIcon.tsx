import * as React from "react";

export const InstagramIcon: React.FC<Props> = ({ size, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M28.3475 34.9917L11.6808 35.0075C8.01417 35.0108 5.01167 32.0142 5.0075 28.3475L4.99167 11.6808C4.98834 8.01417 7.985 5.01167 11.6517 5.0075L28.3183 4.99167C31.985 4.98834 34.9875 7.985 34.9917 11.6517L35.0075 28.3183C35.0117 31.9858 32.0142 34.9883 28.3475 34.9917Z"
      fill="url(#paint0_radial_144_381)"
    />
    <path
      d="M28.3475 34.9917L11.6808 35.0075C8.01417 35.0108 5.01167 32.0142 5.0075 28.3475L4.99167 11.6808C4.98834 8.01417 7.985 5.01167 11.6517 5.0075L28.3183 4.99167C31.985 4.98834 34.9875 7.985 34.9917 11.6517L35.0075 28.3183C35.0117 31.9858 32.0142 34.9883 28.3475 34.9917Z"
      fill="url(#paint1_radial_144_381)"
    />
    <path
      d="M20 25.8334C16.7842 25.8334 14.1667 23.2167 14.1667 20C14.1667 16.7834 16.7842 14.1667 20 14.1667C23.2158 14.1667 25.8333 16.7834 25.8333 20C25.8333 23.2167 23.2158 25.8334 20 25.8334ZM20 15.8334C17.7025 15.8334 15.8333 17.7025 15.8333 20C15.8333 22.2975 17.7025 24.1667 20 24.1667C22.2975 24.1667 24.1667 22.2975 24.1667 20C24.1667 17.7025 22.2975 15.8334 20 15.8334Z"
      fill="white"
    />
    <path
      d="M26.25 15C26.9403 15 27.5 14.4404 27.5 13.75C27.5 13.0596 26.9403 12.5 26.25 12.5C25.5596 12.5 25 13.0596 25 13.75C25 14.4404 25.5596 15 26.25 15Z"
      fill="white"
    />
    <path
      d="M25 30.8333H15C11.7842 30.8333 9.16667 28.2167 9.16667 25V15C9.16667 11.7833 11.7842 9.16666 15 9.16666H25C28.2158 9.16666 30.8333 11.7833 30.8333 15V25C30.8333 28.2167 28.2158 30.8333 25 30.8333ZM15 10.8333C12.7025 10.8333 10.8333 12.7025 10.8333 15V25C10.8333 27.2975 12.7025 29.1667 15 29.1667H25C27.2975 29.1667 29.1667 27.2975 29.1667 25V15C29.1667 12.7025 27.2975 10.8333 25 10.8333H15Z"
      fill="white"
    />
    <defs>
      <radialGradient
        id="paint0_radial_144_381"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(16.15 35.0292) scale(37.4158)"
      >
        <stop stopColor="#FFDD55" />
        <stop offset={0.328} stopColor="#FF543F" />
        <stop offset={0.348} stopColor="#FC5245" />
        <stop offset={0.504} stopColor="#E64771" />
        <stop offset={0.643} stopColor="#D53E91" />
        <stop offset={0.761} stopColor="#CC39A4" />
        <stop offset={0.841} stopColor="#C837AB" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_144_381"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(9.82167 4.61692) scale(24.8442)"
      >
        <stop stopColor="#4168C9" />
        <stop offset={0.999} stopColor="#4168C9" stopOpacity={0} />
      </radialGradient>
    </defs>
  </svg>
);

type Props = {
  size?: number
}

InstagramIcon.defaultProps = {
  size: 40
}