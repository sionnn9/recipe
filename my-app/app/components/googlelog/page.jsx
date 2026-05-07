"use client";

export default function GoogleLoginButton({ isLogin }) {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

  return (
    <button type="button" onClick={handleGoogleLogin} className="google-btn">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width={18}
        height={18}
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.5 3.1 29.6 1 24 1 14.9 1 7.1 6.5 3.6 14.3l7 5.4C12.4 13.6 17.7 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-16.9z"
        />
        <path
          fill="#FBBC05"
          d="M10.6 28.3A14.7 14.7 0 0 1 9.5 24c0-1.5.3-2.9.7-4.3l-7-5.4A23.8 23.8 0 0 0 .5 24c0 3.8.9 7.4 2.6 10.6l7.5-6.3z"
        />
        <path
          fill="#34A853"
          d="M24 47c5.5 0 10.2-1.8 13.6-4.9l-7.4-5.7c-1.8 1.2-4.1 2-6.2 2-6.3 0-11.6-4.2-13.5-9.9l-7.5 6.3C7.1 41.5 14.9 47 24 47z"
        />
      </svg>
      {isLogin ? "Sign in with Google" : "Join with Google"}
    </button>
  );
}
