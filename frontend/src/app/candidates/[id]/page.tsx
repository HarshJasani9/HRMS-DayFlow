"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/app-shell";
import { ProtectedPage } from "@/components/protected-page";
import { getApiErrorMessage, getCandidate, updateApplicationStatus } from "@/lib/api";
import { formatDate, getEmployeeName } from "@/lib/employee-format";
import { hasEveryPermission } from "@/lib/permissions";
import {
  applicationStatusLabels,
  getCandidateName,
  interviewStatusLabels,
  offerStatusLabels
} from "@/lib/recruitment-format";
import { formatDateTime } from "@/lib/time-format";
import type { ApplicationStatus, AuthUser } from "@/types";

type CandidateDetailContentProps = {
  user: AuthUser;
  token: string;
};

const applicationStatuses: ApplicationStatus[] = [
  "APPLIED",
  "SCREENING",
  "INTERVIEW",
  "OFFERED",
  "HIRED",
  "REJECTED"
];

function CandidateDetailContent({ user, token }: CandidateDetailContentProps) {
  const params = useParams<{ id: string }>();
  const canManageRecruitment = hasEveryPermission(user, ["recruitment:manage"]);
  const [error, setError] = useState<string | null>(null);
  const candidateQuery = useQuery({
    queryKey: ["candidate", token, params.id],
    queryFn: () => getCandidate(token, params.id),
    retry: false
  });
  const candidate = candidateQuery.data?.success ? candidateQuery.data.data.candidate : null;

  async function updateStatus(applicationId: string, status: ApplicationStatus) {
    setError(null);
    const response = await updateApplicationStatus(token, applicationId, {
      status,
      notes: null
    }).catch(() => null);

    if (!response) {
      setError("Unable to reach the API");
      return;
    }

    if (!response.success) {
      setError(getApiErrorMessage(response));
      return;
    }

    await candidateQuery.refetch();
  }

  return (
    <AppShell user={user} token={token}>
      <div className="space-y-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-brand-50 text-brand-700">
            <Users size={22} aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-brand-700">Recruitment</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-normal text-heading">
              {candidate ? getCandidateName(candidate) : "Candidate Profile"}
            </h1>
          </div>
        </div>

        {candidate ? (
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
              <p className="text-sm text-text-muted">Email</p>
              <p className="mt-2 font-semibold text-heading">{candidate.email}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
              <p className="text-sm text-text-muted">Phone</p>
              <p className="mt-2 font-semibold text-heading">{candidate.phone ?? "Not set"}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
              <p className="text-sm text-text-muted">Current role</p>
              <p className="mt-2 font-semibold text-heading">
                {candidate.currentTitle ?? "Not set"}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
              <p className="text-sm text-text-muted">Source</p>
              <p className="mt-2 font-semibold text-heading">{candidate.source ?? "Not set"}</p>
            </div>
          </section>
        ) : null}

        <section className="rounded-lg border border-border bg-card p-5 shadow-soft">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-lg font-semibold tracking-normal">Applications</h2>
            {error ? <p className="text-sm text-error-text">{error}</p> : null}
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="border-b border-border bg-hover text-xs uppercase text-text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold">Job</th>
                  <th className="px-4 py-3 font-semibold">Applied</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(candidate?.applications ?? []).map((application) => (
                  <tr key={application.id}>
                    <td className="px-4 py-4">
                      <Link
                        className="font-medium text-brand-700 hover:underline"
                        href={`/jobs/${application.job.id}`}
                      >
                        {application.job.title}
                      </Link>
                      <div className="mt-1 text-xs text-text-muted">
                        {application.job.department?.name ?? "Unassigned"}
                      </div>
                    </td>
                    <td className="px-4 py-4">{formatDate(application.appliedAt)}</td>
                    <td className="px-4 py-4">
                      <select
                        className="h-9 rounded-md border border-border bg-card px-2 text-sm outline-none"
                        defaultValue={application.status}
                        disabled={!canManageRecruitment}
                        onChange={(event) =>
                          updateStatus(application.id, event.target.value as ApplicationStatus)
                        }
                      >
                        {applicationStatuses.map((status) => (
                          <option key={status} value={status}>
                            {applicationStatusLabels[status]}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
            <h2 className="text-lg font-semibold tracking-normal">Interviews</h2>
            <div className="mt-5 divide-y divide-border">
              {(candidate?.interviews ?? []).map((interview) => (
                <div key={interview.id} className="py-4">
                  <p className="font-medium text-heading">
                    {formatDateTime(interview.scheduledAt)}
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    {interviewStatusLabels[interview.status]} with{" "}
                    {interview.interviewer ? getEmployeeName(interview.interviewer) : "Unassigned"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5 shadow-soft">
            <h2 className="text-lg font-semibold tracking-normal">Offers</h2>
            <div className="mt-5 divide-y divide-border">
              {(candidate?.offers ?? []).map((offer) => (
                <div key={offer.id} className="py-4">
                  <p className="font-medium text-heading">{offer.job.title}</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    {offerStatusLabels[offer.status]} | {offer.offeredSalary ?? "Salary not set"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

export default function CandidateDetailPage() {
  return (
    <ProtectedPage requiredPermissions={["recruitment:read"]}>
      {({ user, token }) => <CandidateDetailContent user={user} token={token} />}
    </ProtectedPage>
  );
}
