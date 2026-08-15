type IllustrationProps = {
  className?: string;
};

/** Soft Go Solo illustrations — gold, taupe, mist, rose, summer blue */

export function AutonomyIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 180"
      role="img"
      aria-label="Soft illustration of a solitary path toward a warm gold horizon"
    >
      <defs>
        <linearGradient id="autoSky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4E9D8" />
          <stop offset="100%" stopColor="#E9E6E3" />
        </linearGradient>
        <linearGradient id="autoPath" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E7CFA9" />
          <stop offset="100%" stopColor="#C9B08A" />
        </linearGradient>
      </defs>
      <rect width="240" height="180" rx="14" fill="url(#autoSky)" />
      <circle cx="168" cy="58" r="28" fill="#E7CFA9" opacity="0.95" />
      <path
        d="M0 128 C48 108 78 142 120 124 C162 106 186 138 240 120 L240 180 L0 180 Z"
        fill="#C7B8AE"
        opacity="0.75"
      />
      <path
        d="M108 180 C118 140 122 110 126 78 C128 96 138 120 152 180"
        fill="url(#autoPath)"
        opacity="0.9"
      />
      <circle cx="126" cy="70" r="8" fill="#FFFCFA" />
      <path
        d="M126 78 C118 92 116 108 118 122"
        fill="none"
        stroke="#3A3A3C"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function ConnectionIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 180"
      role="img"
      aria-label="Soft illustration of two figures gently connected"
    >
      <rect width="240" height="180" rx="14" fill="#E9E6E3" />
      <circle cx="88" cy="78" r="46" fill="#E4EBF0" />
      <circle cx="156" cy="86" r="40" fill="#F4E9D8" />
      <circle cx="92" cy="72" r="14" fill="#C7B8AE" />
      <circle cx="152" cy="78" r="12" fill="#E7CFA9" />
      <path
        d="M70 120 C78 100 106 98 114 118"
        fill="none"
        stroke="#8FA6B8"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M134 122 C142 104 168 104 176 122"
        fill="none"
        stroke="#C9B08A"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M108 108 C120 98 130 98 140 108"
        fill="none"
        stroke="#D9A5A0"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="120" cy="132" r="5" fill="#FFFCFA" />
    </svg>
  );
}

export function SustainabilityIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 180"
      role="img"
      aria-label="Soft illustration of a leaf and cycling path"
    >
      <rect width="240" height="180" rx="14" fill="#F4E9D8" />
      <ellipse cx="120" cy="128" rx="70" ry="18" fill="#C7B8AE" opacity="0.7" />
      <path
        d="M78 118 C96 70 150 58 172 92 C140 86 110 98 96 122 Z"
        fill="#8FA6B8"
        opacity="0.85"
      />
      <path
        d="M96 122 C112 96 140 84 160 90"
        fill="none"
        stroke="#FFFCFA"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="64"
        cy="74"
        r="18"
        fill="none"
        stroke="#E7CFA9"
        strokeWidth="4"
        strokeDasharray="8 6"
      />
      <circle
        cx="186"
        cy="70"
        r="14"
        fill="none"
        stroke="#D9A5A0"
        strokeWidth="3"
        strokeDasharray="6 5"
      />
      <path
        d="M52 108 C70 96 86 112 104 104"
        fill="none"
        stroke="#3A3A3C"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

export function ResilienceIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 180"
      role="img"
      aria-label="Soft illustration of a calm heart held by soft light"
    >
      <rect width="240" height="180" rx="14" fill="#F3E4E1" />
      <circle cx="120" cy="92" r="54" fill="#FFFCFA" opacity="0.55" />
      <path
        d="M120 138 C86 114 74 92 74 76 C74 60 86 50 100 50 C110 50 117 56 120 64 C123 56 130 50 140 50 C154 50 166 60 166 76 C166 92 154 114 120 138 Z"
        fill="#D9A5A0"
      />
      <path
        d="M98 78 C106 70 116 72 120 80"
        fill="none"
        stroke="#FFFCFA"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="168" cy="48" r="8" fill="#E7CFA9" opacity="0.9" />
      <circle cx="64" cy="54" r="6" fill="#8FA6B8" opacity="0.8" />
      <path
        d="M40 140 C72 128 100 148 120 136 C140 124 170 138 200 130"
        fill="none"
        stroke="#C7B8AE"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
