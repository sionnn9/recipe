// components/VeggieBackground.tsx
export default function VeggieBackground() {
  return (
    <div className="bg-deco">
      {/* Floating veggie decorations */}
      <div className="bg-deco">
        {/* Tomato - top left */}
        <svg
          className="float-1"
          style={{ top: "6%", left: "4%", width: 110, height: 110 }}
          viewBox="0 0 100 100"
        >
          <ellipse cx="50" cy="58" rx="36" ry="34" fill="#e63946" />
          <path
            d="M50 24 C50 24 44 12 37 16 C41 20 44 24 50 24Z"
            fill="#52b788"
          />
          <path
            d="M50 24 C50 24 56 12 63 16 C59 20 56 24 50 24Z"
            fill="#52b788"
          />
          <path
            d="M50 24 L50 8"
            stroke="#52b788"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse
            cx="40"
            cy="50"
            rx="8"
            ry="6"
            fill="rgba(255,255,255,0.15)"
            transform="rotate(-30 40 50)"
          />
        </svg>

        {/* Carrot - top right */}
        <svg
          className="float-2"
          style={{ top: "2%", right: "5%", width: 75, height: 125 }}
          viewBox="0 0 60 110"
        >
          <path
            d="M30 105 C18 80 14 55 20 28 Q30 12 40 28 C46 55 42 80 30 105Z"
            fill="#f4a261"
          />
          <path d="M20 28 C20 28 8 8 14 3 C17 10 19 20 20 28Z" fill="#52b788" />
          <path
            d="M30 14 L30 0"
            stroke="#52b788"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M40 28 C40 28 52 8 46 3 C43 10 41 20 40 28Z"
            fill="#52b788"
          />
          <path
            d="M22 52 Q30 47 38 52"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M21 68 Q30 63 39 68"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        {/* Broccoli - bottom left */}
        <svg
          className="float-3"
          style={{ bottom: "6%", left: "2%", width: 125, height: 125 }}
          viewBox="0 0 100 100"
        >
          <rect x="43" y="62" width="14" height="28" rx="4" fill="#6b9e4e" />
          <circle cx="50" cy="48" r="20" fill="#52b788" />
          <circle cx="34" cy="55" r="15" fill="#52b788" />
          <circle cx="66" cy="55" r="15" fill="#52b788" />
          <circle cx="50" cy="33" r="13" fill="#74c69d" />
          <circle cx="35" cy="44" r="11" fill="#74c69d" />
          <circle cx="65" cy="44" r="11" fill="#74c69d" />
          <circle cx="50" cy="46" r="8" fill="#95d5b2" />
        </svg>

        {/* Lemon - bottom right */}
        <svg
          className="float-4"
          style={{ bottom: "4%", right: "4%", width: 105, height: 105 }}
          viewBox="0 0 100 100"
        >
          <ellipse cx="50" cy="54" rx="34" ry="28" fill="#f9c74f" />
          <path
            d="M18 47 Q13 30 24 19"
            stroke="#f3d03f"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M82 47 Q87 30 76 19"
            stroke="#f3d03f"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cx="39"
            cy="47"
            rx="9"
            ry="7"
            fill="rgba(255,255,255,0.2)"
            transform="rotate(-20 39 47)"
          />
        </svg>

        {/* Garlic - middle left */}
        <svg
          className="float-5"
          style={{ top: "42%", left: "1%", width: 90, height: 90 }}
          viewBox="0 0 80 80"
        >
          <ellipse cx="40" cy="50" rx="22" ry="20" fill="#f5ebe0" />
          <ellipse
            cx="28"
            cy="48"
            rx="10"
            ry="14"
            fill="#ede0d4"
            transform="rotate(-10 28 48)"
          />
          <ellipse cx="40" cy="44" rx="10" ry="15" fill="#f5ebe0" />
          <ellipse
            cx="52"
            cy="48"
            rx="10"
            ry="14"
            fill="#ede0d4"
            transform="rotate(10 52 48)"
          />
          <path
            d="M40 28 C40 28 37 15 39 10 C41 8 43 10 40 28Z"
            fill="#a8c694"
          />
          <path
            d="M40 28 C40 28 33 22 31 17 C35 15 40 28 40 28Z"
            fill="#a8c694"
          />
          <path
            d="M40 28 C40 28 47 22 49 17 C45 15 40 28 40 28Z"
            fill="#a8c694"
          />
        </svg>

        {/* Avocado - middle right */}
        <svg
          className="float-6"
          style={{ top: "33%", right: "2%", width: 90, height: 115 }}
          viewBox="0 0 75 105"
        >
          <path
            d="M37 98 C18 98 8 78 8 58 C8 28 22 8 37 4 C52 8 66 28 66 58 C66 78 56 98 37 98Z"
            fill="#52b788"
          />
          <path
            d="M37 90 C22 90 15 73 15 58 C15 32 27 14 37 11 C47 14 59 32 59 58 C59 73 52 90 37 90Z"
            fill="#95d5b2"
          />
          <ellipse cx="37" cy="60" rx="15" ry="19" fill="#c9a84c" />
        </svg>

        {/* Chili - top center */}
        <svg
          className="float-7"
          style={{
            top: "10%",
            left: "22%",
            width: 65,
            height: 85,
            transform: "rotate(-30deg)",
          }}
          viewBox="0 0 50 75"
        >
          <path
            d="M25 70 C14 55 12 38 17 18 C21 8 29 7 31 18 C35 38 34 55 25 70Z"
            fill="#e63946"
          />
          <path d="M29 11 C29 11 35 4 32 1 C30 4 28 9 29 11Z" fill="#52b788" />
          <path
            d="M25 7 L25 0"
            stroke="#52b788"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M18 48 Q25 43 32 48"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        {/* Onion - bottom center */}
        <svg
          className="float-8"
          style={{ bottom: "10%", right: "20%", width: 95, height: 95 }}
          viewBox="0 0 90 90"
        >
          <ellipse
            cx="45"
            cy="54"
            rx="30"
            ry="26"
            fill="#c77dff"
            opacity="0.8"
          />
          <path
            d="M29 54 Q45 36 61 54"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M25 61 Q45 42 65 61"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="2"
            fill="none"
          />
          <path d="M45 26 C45 26 42 13 44 9 C46 7 48 9 45 26Z" fill="#52b788" />
          <path
            d="M45 26 C45 26 37 19 35 13 C39 11 45 26 45 26Z"
            fill="#52b788"
          />
        </svg>
      </div>
    </div>
  );
}
