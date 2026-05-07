// components/GoogleLoginButton.jsx
"use client";
export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50"
    >
      <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
      Continue with Google
    </button>
  );
}
