"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import "../components/login.css";
import VeggieBackground from "../components/floatingVeggies";
type FormMode = "login" | "register";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

type FormInput = LoginInput | RegisterInput;

export default function AuthPage() {
  const [mode, setMode] = useState<FormMode>("login");
  const [isFlipping, setIsFlipping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = mode === "login";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>();

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setMode((prev) => (prev === "login" ? "register" : "login"));
      reset();
      setIsFlipping(false);
    }, 300);
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(`http://localhost:5001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        showToast(
          json.error || json.message || "Something went wrong",
          "error",
        );
      } else {
        showToast(
          isLogin ? "Welcome back, Chef!" : "Account created! Let's cook!",
          "success",
        );
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      showToast("Network error. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="auth-root">
        <div className="bg-lines" />

        <VeggieBackground />

        <div className="card-wrap">
          <div className={`card ${isFlipping ? "flipping" : ""}`}>
            {/* Binding holes */}
            <div className="holes">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="hole" />
              ))}
            </div>

            {/* Header */}
            <div className="card-header">
              <div className="brand">FridgeChef</div>
              <div className="divider" />
              <div className="card-title">
                {isLogin ? "Welcome back, Chef" : "Join the Kitchen"}
              </div>
              <div className="card-subtitle">
                {isLogin
                  ? "Your recipes are waiting for you"
                  : "Start turning ingredients into magic"}
              </div>
            </div>

            {/* Form */}
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              {!isLogin && (
                <div className="field">
                  <label className="field-label">Your Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Gordon Ramsay..."
                    className="field-input"
                    autoComplete="off"
                  />
                  {(errors as any).name && (
                    <span className="field-error">
                      {(errors as any).name.message}
                    </span>
                  )}
                </div>
              )}

              <div className="field">
                <label className="field-label">Email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email",
                    },
                  })}
                  placeholder="chef@kitchen.com"
                  className="field-input"
                  autoComplete="email"
                />
                {(errors as any).email && (
                  <span className="field-error">
                    {(errors as any).email.message}
                  </span>
                )}
              </div>

              <div className="field">
                <label className="field-label">Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Min 6 characters" },
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Your secret recipe..."
                    className="field-input"
                    style={{ paddingRight: "36px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#9a8570",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {showPassword ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {(errors as any).password && (
                  <span className="field-error">
                    {(errors as any).password.message}
                  </span>
                )}
              </div>

              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="spinner" />
                ) : isLogin ? (
                  "Open Recipe Box"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="toggle-btn">
              {isLogin ? "New here? " : "Already a chef? "}
              <button type="button" onClick={handleFlip}>
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </div>

            <div className="deco-text">Grandma's secret...</div>
          </div>
        </div>

        {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
      </div>
    </>
  );
}
