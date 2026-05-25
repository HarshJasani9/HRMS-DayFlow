"use client";

import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  forgotPassword,
  getApiErrorMessage,
  type ForgotPasswordResponse
} from "@/lib/api";

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ForgotPasswordResponse | null>(null);
  const {
    formState: { isSubmitting },
    handleSubmit,
    register
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: "admin@hrms.local"
    }
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setError(null);
    setResult(null);
    const response = await forgotPassword(values).catch(() => null);

    if (!response) {
      setError("Unable to reach the API");
      return;
    }

    if (!response.success) {
      setError(getApiErrorMessage(response));
      return;
    }

    setResult(response.data);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-hover px-5 py-10">
      <section className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-soft">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-brand-50 text-brand-700">
            <KeyRound size={21} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-normal">
              Forgot password
            </h1>
            <p className="text-sm text-text-muted">Request account recovery</p>
          </div>
        </div>

        {error ? (
          <div className="mt-5 rounded-md border border-red-200 bg-error-bg px-3 py-2 text-sm text-error-text">
            {error}
          </div>
        ) : null}

        {result ? (
          <div className="mt-5 rounded-md border border-brand-100 bg-brand-50 px-3 py-3 text-sm text-brand-700">
            <p>{result.message}</p>
            {result.resetToken ? (
              <div className="mt-3 rounded-md bg-card p-3 text-xs text-text-secondary">
                <p className="font-semibold text-heading">Development reset token</p>
                <p className="mt-2 break-all">{result.resetToken}</p>
                <Link
                  className="mt-3 inline-flex font-medium text-brand-700"
                  href="/reset-password"
                >
                  Reset password
                </Link>
              </div>
            ) : null}
          </div>
        ) : null}

        <form className="mt-7 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-sm font-medium text-text-secondary">
            Email
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              type="email"
              autoComplete="email"
              {...register("email", { required: true })}
            />
          </label>

          <button
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            <Mail size={18} aria-hidden="true" />
            Send reset token
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-text-muted">
          <Link className="font-medium text-brand-700" href="/login">
            Back to sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
