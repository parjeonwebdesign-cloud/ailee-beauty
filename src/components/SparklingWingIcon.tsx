import React from 'react';

interface SparklingWingIconProps {
  className?: string;
  size?: number;
}

export const SparklingWingIcon: React.FC<SparklingWingIconProps> = ({
  className = "w-6 h-6 text-[#E86C78]",
  size
}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Left Wing */}
      <path
        d="M 23 25 C 21 20, 15 12, 6 11 C 4 10.8, 4 13, 5.5 14 C 10 17, 15 21, 17 27 C 12 24, 7 23, 4 24 C 2.8 24.4, 3.2 26, 4.5 26.2 C 9 27, 14 30, 17.5 34 C 13.5 33, 9 33.5, 7 35 C 6.2 35.6, 6.8 37, 8 37 C 12 37, 17 37.5, 21.5 32 C 22.8 30.4, 23.2 27.5, 23 25 Z"
        fill="currentColor"
      />

      {/* Right Wing */}
      <path
        d="M 25 25 C 27 20, 33 12, 42 11 C 44 10.8, 44 13, 42.5 14 C 38 17, 33 21, 31 27 C 36 24, 41 23, 44 24 C 45.2 24.4, 44.8 26, 43.5 26.2 C 39 27, 34 30, 30.5 34 C 34.5 33, 39 33.5, 41 35 C 41.8 35.6, 41.2 37, 40 37 C 36 37, 31 37.5, 26.5 32 C 25.2 30.4, 24.8 27.5, 25 25 Z"
        fill="currentColor"
      />

      {/* Center Sparkling Diamond / Gem */}
      <path
        d="M 24 21 L 26 25 L 24 29 L 22 25 Z"
        fill="currentColor"
      />

      {/* Center Top Sparkle Star */}
      <path
        d="M 24 2 L 25.2 7.8 L 31 9 L 25.2 10.2 L 24 16 L 22.8 10.2 L 17 9 L 22.8 7.8 Z"
        fill="currentColor"
      />

      {/* Left Top Sparkle */}
      <path
        d="M 10 4 L 10.7 7.3 L 14 8 L 10.7 8.7 L 10 12 L 9.3 8.7 L 6 8 L 9.3 7.3 Z"
        fill="currentColor"
        opacity="0.85"
      />

      {/* Right Top Sparkle */}
      <path
        d="M 38 4 L 38.7 7.3 L 42 8 L 38.7 8.7 L 38 12 L 37.3 8.7 L 34 8 L 37.3 7.3 Z"
        fill="currentColor"
        opacity="0.85"
      />

      {/* Accent Little Sparkles */}
      <circle cx="16" cy="5" r="1" fill="currentColor" />
      <circle cx="32" cy="5" r="1" fill="currentColor" />
      <circle cx="24" cy="41" r="1.2" fill="currentColor" />
      <circle cx="4" cy="18" r="0.8" fill="currentColor" />
      <circle cx="44" cy="18" r="0.8" fill="currentColor" />
    </svg>
  );
};
