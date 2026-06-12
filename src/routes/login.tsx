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
} from "lucide-react";
import { LocaliQLogo, ScoutMark } from "../components/scout/Logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Agentic Campaign Intelligence" },
      {
        name: "description",
        content:
          "Sign in to LocaliQ Agentic Campaign Intelligence — AI-powered campaign diagnostics for paid search.",
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

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate({ to: "/" });
    }, 900);
  };

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[1.05fr_1fr]">
        {/* LEFT: Branding */}
        <section
          className="relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.52 0.19 28) 0%, oklch(0.62 0.2 35) 55%, oklch(0.68 0.2 55) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full opacity-30"
            style={{
              background: "radial-gradient(closest-side, white, transparent)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 bottom-0 h-[380px] w-[380px] rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.95 0.12 80), transparent)",
            }}
          />

          <div className="relative flex items-center gap-2">
            <ScoutMark size={36} />
            <span className="font-display text-[20px] font-semibold tracking-tight text-white">
              LocaliQ
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative max-w-md"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
              <Sparkles className="h-3 w-3" /> Agentic Campaign Intelligence
            </div>
            <h1 className="mt-5 font-display text-[40px] font-semibold leading-[1.05] tracking-tight text-white">
              AI-powered campaign diagnostics for smarter decisions.
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-white/85">
              Sign in to diagnose paid search campaigns in seconds, with
              evidence-backed recommendations and human-in-the-loop guardrails.
            </p>

            {/* Mini dashboard preview */}
            <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <div className="flex items-center justify-between text-[11px] text-white/80">
                <span className="font-semibold tracking-wider">ROOT CAUSE</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">
                  92% confidence
                </span>
              </div>
              <div className="mt-2 text-[14px] font-semibold text-white">
                Negative keyword conflict capping impression share
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[92%] rounded-full bg-white" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-[11px] text-white/80">
                {[
                  { l: "CPL", v: "$42.18" },
                  { l: "CVR", v: "3.4%" },
                  { l: "Pacing", v: "73%" },
                ].map((m) => (
                  <div key={m.l} className="rounded-lg bg-white/10 p-2">
                    <div className="tracking-wider">{m.l}</div>
                    <div className="font-display text-[14px] font-semibold text-white">
                      {m.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="relative flex items-center gap-2 text-[12px] text-white/75">
            <ShieldCheck className="h-3.5 w-3.5" />
            Secure, human-in-the-loop campaign intelligence platform.
          </div>
        </section>

        {/* RIGHT: Form */}
        <section className="flex h-full flex-col overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 lg:hidden">
            <LocaliQLogo />
          </header>

          <div className="flex flex-1 items-center justify-center overflow-hidden px-6 py-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md"
            >
              <div className="rounded-2xl border border-border bg-card p-7 shadow-[0_30px_60px_-30px_oklch(0.52_0.19_28/0.2)]">
                <h2 className="font-display text-[26px] font-semibold tracking-tight">
                  Welcome back
                </h2>
                <p className="mt-1.5 text-[13px] text-muted-foreground">
                  Sign in to your workspace to continue diagnosing campaigns.
                </p>

                <form onSubmit={submit} className="mt-5 space-y-3.5">
                  {error && (
                    <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-[13px] text-destructive">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="email"
                      className="text-[12px] font-medium text-foreground"
                    >
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
                        className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-3 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="text-[12px] font-medium text-foreground"
                      >
                        Password
                      </label>
                      <a
                        href="#"
                        className="text-[12px] font-medium text-primary hover:underline"
                      >
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
                        className="w-full rounded-lg border border-input bg-background py-2.5 pl-9 pr-10 text-[14px] text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[14px] font-semibold text-primary-foreground shadow-[0_10px_24px_-12px_oklch(0.52_0.19_28/0.7)] transition hover:opacity-95 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                      </>
                    ) : (
                      <>
                        Sign In <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <p className="mt-4 text-center text-[13px] text-muted-foreground">
                New to LocaliQ?{" "}
                <a href="#" className="font-semibold text-primary hover:underline">
                  Request Access
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}