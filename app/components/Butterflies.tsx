"use client";

export default function Butterflies({
  contained = false,
}: {
  contained?: boolean;
}) {
  return (
    <div
      className={
        contained
          ? "recipient-butterflies butterflies-contained"
          : "recipient-butterflies"
      }
      aria-hidden="true"
    >
      {[0, 1, 2].map((index) => (
        <div className={`flying-butterfly flight-${index}`} key={index}>
          <svg viewBox="0 0 80 64" fill="none">
            <g className="butterfly-left-wing">
              <path
                d="M40 34C16 -9 -9 9 9 31C-4 54 23 68 40 34Z"
                fill="currentColor"
              />
              <path
                d="M36 32L14 16M35 38L17 48"
                stroke="#fff4ee"
                strokeWidth="2"
              />
            </g>
            <g className="butterfly-right-wing">
              <path
                d="M40 34C64 -9 89 9 71 31C84 54 57 68 40 34Z"
                fill="currentColor"
              />
              <path
                d="M44 32L66 16M45 38L63 48"
                stroke="#fff4ee"
                strokeWidth="2"
              />
            </g>
            <path
              d="M40 23V46M40 25L34 17M40 25L46 17"
              stroke="#705366"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
