"use client";

import { Save, X } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import type { EmployeeInput } from "@/lib/api";
import { employmentStatusLabels } from "@/lib/employee-format";
import type { Department, Designation, Employee, EmploymentStatus } from "@/types";

export type EmployeeFormValues = {
  employeeCode: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  personalEmail: string;
  phone: string;
  dateOfBirth: string;
  dateOfJoining: string;
  dateOfExit: string;
  status: EmploymentStatus;
  location: string;
  departmentId: string;
  designationId: string;
  managerId: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  emergencyContactEmail: string;
};

type EmployeeFormProps = {
  departments: Department[];
  designations: Designation[];
  managers: Employee[];
  initialValues: EmployeeFormValues;
  submitLabel: string;
  cancelHref: string;
  error: string | null;
  onSubmit: (input: EmployeeInput) => Promise<void>;
};

const statuses: EmploymentStatus[] = [
  "ONBOARDING",
  "ACTIVE",
  "PROBATION",
  "INACTIVE",
  "TERMINATED"
];

export const emptyEmployeeFormValues: EmployeeFormValues = {
  employeeCode: "",
  firstName: "",
  lastName: "",
  workEmail: "",
  personalEmail: "",
  phone: "",
  dateOfBirth: "",
  dateOfJoining: new Date().toISOString().slice(0, 10),
  dateOfExit: "",
  status: "ACTIVE",
  location: "",
  departmentId: "",
  designationId: "",
  managerId: "",
  emergencyContactName: "",
  emergencyContactRelationship: "",
  emergencyContactPhone: "",
  emergencyContactEmail: ""
};

function emptyToNull(value: string): string | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  return trimmedValue;
}

function toEmployeeInput(values: EmployeeFormValues): EmployeeInput {
  const emergencyContacts =
    values.emergencyContactName.trim() && values.emergencyContactPhone.trim()
      ? [
          {
            name: values.emergencyContactName.trim(),
            relationship: values.emergencyContactRelationship.trim(),
            phone: values.emergencyContactPhone.trim(),
            email: emptyToNull(values.emergencyContactEmail),
            isPrimary: true
          }
        ]
      : [];

  return {
    employeeCode: values.employeeCode.trim(),
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    workEmail: values.workEmail.trim().toLowerCase(),
    personalEmail: emptyToNull(values.personalEmail),
    phone: emptyToNull(values.phone),
    dateOfBirth: values.dateOfBirth || null,
    dateOfJoining: values.dateOfJoining,
    dateOfExit: values.dateOfExit || null,
    status: values.status,
    location: emptyToNull(values.location),
    departmentId: values.departmentId || null,
    designationId: values.designationId || null,
    managerId: values.managerId || null,
    emergencyContacts
  };
}

export function EmployeeForm({
  departments,
  designations,
  managers,
  initialValues,
  submitLabel,
  cancelHref,
  error,
  onSubmit
}: EmployeeFormProps) {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    watch
  } = useForm<EmployeeFormValues>({
    defaultValues: initialValues
  });
  const selectedDepartmentId = watch("departmentId");
  const filteredDesignations = useMemo(() => {
    if (!selectedDepartmentId) {
      return designations;
    }

    return designations.filter(
      (designation) => designation.departmentId === selectedDepartmentId
    );
  }, [designations, selectedDepartmentId]);

  async function submit(values: EmployeeFormValues) {
    await onSubmit(toEmployeeInput(values));
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(submit)}>
      {error ? (
        <div className="rounded-md border border-red-200 dark:border-red-800 bg-error-bg px-3 py-2 text-sm text-error-text">
          {error}
        </div>
      ) : null}

      <section className="rounded-lg border border-border bg-card p-5 shadow-card">
        <h2 className="text-lg font-semibold tracking-normal">Employee</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <label className="block text-sm font-medium text-text-secondary">
            Employee code
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("employeeCode", { required: true })}
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            First name
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("firstName", { required: true })}
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Last name
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("lastName", { required: true })}
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Work email
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              type="email"
              {...register("workEmail", { required: true })}
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Personal email
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              type="email"
              {...register("personalEmail")}
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Phone
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("phone")}
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-5 shadow-card">
        <h2 className="text-lg font-semibold tracking-normal">Employment</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <label className="block text-sm font-medium text-text-secondary">
            Department
            <select
              className="mt-2 h-11 w-full rounded-md border border-border bg-card px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("departmentId")}
            >
              <option value="">Unassigned</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Designation
            <select
              className="mt-2 h-11 w-full rounded-md border border-border bg-card px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("designationId")}
            >
              <option value="">Unassigned</option>
              {filteredDesignations.map((designation) => (
                <option key={designation.id} value={designation.id}>
                  {designation.title}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Manager
            <select
              className="mt-2 h-11 w-full rounded-md border border-border bg-card px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("managerId")}
            >
              <option value="">Unassigned</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.firstName} {manager.lastName}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Status
            <select
              className="mt-2 h-11 w-full rounded-md border border-border bg-card px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("status")}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {employmentStatusLabels[status]}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Joining date
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              type="date"
              {...register("dateOfJoining", { required: true })}
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Exit date
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              type="date"
              {...register("dateOfExit")}
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Date of birth
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              type="date"
              {...register("dateOfBirth")}
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary xl:col-span-2">
            Location
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("location")}
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-5 shadow-card">
        <h2 className="text-lg font-semibold tracking-normal">Emergency Contact</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="block text-sm font-medium text-text-secondary">
            Name
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("emergencyContactName")}
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Relationship
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("emergencyContactRelationship")}
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Phone
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              {...register("emergencyContactPhone")}
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Email
            <input
              className="mt-2 h-11 w-full rounded-md border border-border px-3 text-sm outline-none transition focus:border-brand-600"
              type="email"
              {...register("emergencyContactEmail")}
            />
          </label>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border bg-card px-4 text-sm font-semibold text-text-secondary transition hover:bg-hover"
          href={cancelHref}
        >
          <X size={17} aria-hidden="true" />
          Cancel
        </Link>
        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand-600 px-4 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          disabled={isSubmitting}
        >
          <Save size={17} aria-hidden="true" />
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
