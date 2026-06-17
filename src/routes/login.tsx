import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Loader2,
  AlertCircle,
  Quote,
} from "lucide-react";
import { ScoutIconMark } from "../components/scout/Logo";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

const LOGIN_BG =
  "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?auto=format&fit=crop&w=1600&q=80";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Scout · Agentic Campaign Intelligence" },
      {
        name: "description",
        content:
          "Sign in to Scout — the agentic analyst for paid search teams. Diagnose any campaign in under a minute.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    navigate({ to: "/" });
  };

  const signInWithGoogle = async () => {
    setError(null);
    setLoading(true);

    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });

    setLoading(false);

    if (result.error) {
      setError(result.error.message || "Google sign-in failed.");
      return;
    }

    if (result.redirected) {
      return;
    }

    navigate({ to: "/" });
  };

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[0.94fr_1.06fr]">
        {/* LEFT: Editorial branding */}
        <section className="relative hidden h-full overflow-hidden lg:block">
          <img
            src={LOGIN_BG}
            alt=""
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.235 0.18 268 / 0.92) 0%, oklch(0.235 0.18 268 / 0.82) 55%, oklch(0.665 0.215 36 / 0.75) 100%)",
            }}
          />
          <div className="relative flex h-full flex-col justify-between p-10 text-white">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-2 font-display text-[18px] font-semibold tracking-tight">
                <img
                  src="https://localiq.au/wp-content/uploads/2024/06/LiQ_Logo_icon.png"
                  alt="LocaliQ"
                  className="h-[35px] w-auto"
                />{" "}
                <span className="text-white/100 text-2xl">LocaliQ</span>
                <span className="text-white/60 text-2xl">/ Scout</span>
                <ScoutIconMark size={70} />
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md"
            >
              <h1 className="mt-5 font-display text-[40px] font-semibold leading-[1.02] tracking-tight">
                The forty-minute
                <br />
                investigation
                <br />
                <span className="text-white/70">just became thirty-eight seconds.</span>
              </h1>
              <p className="mt-5 text-[14px] leading-relaxed text-white/80">
                Scout reads every signal in your account the way a senior analyst would — pacing,
                change history, tracking, creative — then hands you the answer with the evidence
                attached. You decide what ships.
              </p>

              <figure className="mt-7 rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-md">
                <Quote className="h-4 w-4 text-white/60" />
                <blockquote className="mt-2 text-[13px] leading-relaxed text-white/90">
                  "Scout doesn't just flag the problem — it shows me the four things it checked and
                  the one it didn't. That's the part I trust. We've stopped guessing as a team."
                </blockquote>
                <figcaption className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/55">
                  <span className="h-px w-6 bg-white/30" /> Maya R. · Head of Paid Search, LocaliQ
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </section>

        {/* RIGHT: form */}
        <section className="flex h-full flex-col overflow-hidden">
          <div className="flex flex-1 items-center justify-center overflow-hidden px-6 py-10 sm:px-8 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <div className="flex min-h-[450px] flex-col rounded-2xl border border-border bg-card p-8 lg:p-9">
                <h2 className="font-display text-[26px] font-semibold tracking-tight">
                  Welcome back
                </h2>
                <p className="mt-1.5 text-[13px] text-muted-foreground">
                  Sign in to your workspace to keep diagnosing campaigns.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-5">
                  {error && (
                    <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-[13px] text-destructive">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="email" className="text-[12px] font-medium text-foreground">
                      Work email
                    </label>
                    <div className="relative mt-1.5">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-lg border border-input bg-background py-3.5 pl-9 pr-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-[12px] font-medium text-foreground">
                        Password
                      </label>
                      <a href="#" className="text-[12px] font-medium text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative mt-1.5">
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="password"
                        type={show ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-input bg-background py-3.5 pl-9 pr-10 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <button
                        type="button"
                        onClick={() => setShow((s) => !s)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground"
                        aria-label={show ? "Hide password" : "Show password"}
                      >
                        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-5 pt-4">
                    <label className="flex items-center gap-2 text-[13px] text-muted-foreground">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="h-4 w-4 rounded border-input text-primary focus:ring-primary/30"
                      />
                      Remember me on this device
                    </label>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-[0_10px_24px_-12px_oklch(0.665_0.215_36/0.7)] transition hover:opacity-95 disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                        </>
                      ) : (
                        <>
                          Sign in <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-5">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-[11px] uppercase tracking-widest text-muted-foreground">
                      <span className="bg-card px-2">Or continue with</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={signInWithGoogle}
                    disabled={loading}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-[14px] font-medium text-foreground transition hover:bg-accent disabled:opacity-70"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </button>
                </div>
              </div>

              <p className="mt-4 text-center text-[13px] text-muted-foreground">
                New to Scout?{" "}
                <Link to="/landing" className="font-semibold text-primary hover:underline">
                  Request access
                </Link>
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
