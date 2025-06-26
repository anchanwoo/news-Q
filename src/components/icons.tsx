import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fill="currentColor"
        className="font-jp"
      >
        Q
      </text>
    </svg>
  );
}

export function WordmarkLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 400 80"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <style>
        {`.wordmark { font: 800 80px "M PLUS Rounded 1c", sans-serif; }`}
      </style>
      <text
        x="0"
        y="65"
        className="wordmark"
        fill="currentColor"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="6"
        paintOrder="stroke"
        strokeLinejoin="round"
      >
        ニュースQ
      </text>
    </svg>
  );
}
