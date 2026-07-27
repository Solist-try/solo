type IllustrationProps = {
  className?: string;
};

export function AutonomyIllustration({ className }: IllustrationProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 180"
      role="img"
      aria-label="Soft illustration of a solitary path toward a warm horizon"
    >
      <defs>
        <linearGradient id="autoSky" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe4d1" />
          <stop offset="100%" stopColor="#f7ecd0" />
        </linearGradient>
        <linearGradient id="autoPath" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0a978" />
          <stop offset="100%" stopColor="#c97b4b" />
        </linearGradient>
      </defs>
      <rect width="240" height="180" rx="36" fill="url(#autoSky)" />
      <circle cx="168" cy="58" r="28" fill="#e8c56a" opacity="0.9" />
      <path
        d="M0 128 C48 108 78 142 120 124 C162 106 186 138 240 120 L240 180 L0 180 Z"
        fill="#e0d2c5"
        opacity="0.75"
      />
      <path
        d="M108 180 C118 140 122 110 126 78 C128 96 138 120 152 180"
        fill="url(#autoPath)"
        opacity="0.85"
      />
      <circle cx="126" cy="70" r="8" fill="#fffaf6" />
      <path
        d="M126 78 C118 92 116 108 118 122"
        fill="none"
        stroke="#b86a3d"
        strokeWidth="3"
        strokeLinecap="round"
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
      aria-label="Soft illustration of two warm figures gently connected"
    >
      <rect width="240" height="180" rx="36" fill="#fff4ec" />
      <circle cx="88" cy="78" r="46" fill="#ffe4d1" />
      <circle cx="156" cy="86" r="40" fill="#f7ecd0" />
      <circle cx="92" cy="72" r="14" fill="#f0a978" />
      <circle cx="152" cy="78" r="12" fill="#d4a84b" />
      <path
        d="M70 120 C78 100 106 98 114 118"
        fill="none"
        stroke="#c97b4b"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M134 122 C142 104 168 104 176 122"
        fill="none"
        stroke="#b8903a"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M108 108 C120 98 130 98 140 108"
        fill="none"
        stroke="#e08a52"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="120" cy="132" r="5" fill="#fffaf6" />
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
      <rect width="240" height="180" rx="36" fill="#f7ecd0" />
      <ellipse cx="120" cy="128" rx="70" ry="18" fill="#e0d2c5" opacity="0.7" />
      <path
        d="M78 118 C96 70 150 58 172 92 C140 86 110 98 96 122 Z"
        fill="#c97b4b"
        opacity="0.8"
      />
      <path
        d="M96 122 C112 96 140 84 160 90"
        fill="none"
        stroke="#fffaf6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="64"
        cy="74"
        r="18"
        fill="none"
        stroke="#d4a84b"
        strokeWidth="4"
        strokeDasharray="8 6"
      />
      <circle
        cx="186"
        cy="70"
        r="14"
        fill="none"
        stroke="#e08a52"
        strokeWidth="3"
        strokeDasharray="6 5"
      />
      <path
        d="M52 108 C70 96 86 112 104 104"
        fill="none"
        stroke="#8a7a6d"
        strokeWidth="3"
        strokeLinecap="round"
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
      <rect width="240" height="180" rx="36" fill="#ffe4d1" />
      <circle cx="120" cy="92" r="54" fill="#fffaf6" opacity="0.55" />
      <path
        d="M120 138 C86 114 74 92 74 76 C74 60 86 50 100 50 C110 50 117 56 120 64 C123 56 130 50 140 50 C154 50 166 60 166 76 C166 92 154 114 120 138 Z"
        fill="#e08a52"
      />
      <path
        d="M98 78 C106 70 116 72 120 80"
        fill="none"
        stroke="#fff4ec"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="168" cy="48" r="8" fill="#e8c56a" opacity="0.85" />
      <circle cx="64" cy="54" r="6" fill="#f0a978" opacity="0.8" />
      <path
        d="M40 140 C72 128 100 148 120 136 C140 124 170 138 200 130"
        fill="none"
        stroke="#c9b9aa"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
