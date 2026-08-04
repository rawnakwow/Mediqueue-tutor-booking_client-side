"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuth } from "@/hooks/useAuth";
import { PageTitle } from "@/components/shared/PageTitle";
import { Loader } from "@/components/shared/loader";
import {
  AVAILABLE_SUBJECTS,
  TEACHING_MODES,
} from "@/utils/constants";

const inputClassName =
  "h-11 w-full rounded-xl border border-divider bg-content2 px-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60";

function getLocalDateString() {
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset() * 60_000;

  return new Date(currentDate.getTime() - timezoneOffset)
    .toISOString()
    .split("T")[0];
}

export default function AddTutorPage() {
  const router = useRouter();

  const {
    user,
    token,
    logout,
    isPending: isAuthPending,
  } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const minimumDate = useMemo(() => getLocalDateString(), []);

  useEffect(() => {
    if (isAuthPending) return;

    if (!user || !token) {
      toast.error("Please sign in to add a tutor.");
      router.replace("/signin");
    }
  }, [user, token, isAuthPending, router]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!user || !token) {
      toast.error("Your login session is missing.");
      router.replace("/signin");
      return;
    }

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const values = Object.fromEntries(formData.entries());

    if (
      !values.subject ||
      !values.institution ||
      !values.hourlyFee ||
      !values.totalSlot ||
      !values.sessionStartDate ||
      !values.photo ||
      !values.teachingMode ||
      !values.location ||
      !values.availableDays ||
      !values.timeSlot ||
      !values.experience
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    const hourlyFee = Number(values.hourlyFee);
    const totalSlot = Number(values.totalSlot);

    if (!Number.isFinite(hourlyFee) || hourlyFee <= 0) {
      toast.error("Hourly fee must be a positive number.");
      return;
    }

    if (!Number.isInteger(totalSlot) || totalSlot <= 0) {
      toast.error("Total slots must be a positive whole number.");
      return;
    }

    if (values.sessionStartDate < minimumDate) {
      toast.error("Session start date cannot be in the past.");
      return;
    }

    const payload = {
      subject: values.subject,
      institution: values.institution.trim(),
      hourlyFee,
      totalSlot,
      sessionStartDate: values.sessionStartDate,
      photo: values.photo.trim(),
      teachingMode: values.teachingMode,
      location: values.location.trim(),
      availableDays: values.availableDays.trim(),
      timeSlot: values.timeSlot.trim(),
      experience: values.experience.trim(),
    };

    try {
      setIsSubmitting(true);

      const response = await fetch("/server-api/tutors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json().catch(() => null);

      if (response.status === 401 || response.status === 403) {
        logout();

        toast.error(
          responseData?.message ||
            "Your session is invalid or expired. Please sign in again."
        );

        router.replace("/signin");
        return;
      }

      if (!response.ok) {
        throw new Error(
          responseData?.message ||
            "Failed to create the tutor profile."
        );
      }

      toast.success("Tutor listing published successfully.");

      formElement.reset();

      router.push("/my-tutors");
      router.refresh();
    } catch (error) {
      console.error("Add Tutor error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader
          className="h-12 w-12"
          text="Authenticating..."
        />
      </div>
    );
  }

  if (!user || !token) {
    return null;
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10 sm:px-6">
      <PageTitle
        title="List a Tutoring Service"
        subtitle="Fill out your credentials, schedule, and pricing information."
      />

      <form
        onSubmit={handleFormSubmit}
        className="mt-8 space-y-6 rounded-3xl border border-divider bg-content1 p-6 shadow-sm sm:p-8"
      >
        <div className="rounded-2xl border border-divider/60 bg-content2/40 p-4 text-sm">
          <span className="mb-1 block font-semibold text-default-500">
            Authenticated Account
          </span>

          <p className="font-medium text-foreground">
            {user.name || "Tutor"}
          </p>

          <p className="text-default-500">{user.email}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Teaching Subject Track" htmlFor="subject">
            <select
              id="subject"
              name="subject"
              defaultValue=""
              required
              disabled={isSubmitting}
              className={inputClassName}
            >
              <option value="" disabled>
                Select a subject
              </option>

              {AVAILABLE_SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="University / Institution"
            htmlFor="institution"
          >
            <input
              id="institution"
              name="institution"
              type="text"
              placeholder="Example: University of Dhaka"
              required
              disabled={isSubmitting}
              className={inputClassName}
            />
          </Field>

          <Field label="Hourly Rate Fee" htmlFor="hourlyFee">
            <input
              id="hourlyFee"
              name="hourlyFee"
              type="number"
              min="1"
              step="1"
              placeholder="Example: 500"
              required
              disabled={isSubmitting}
              className={inputClassName}
            />
          </Field>

          <Field
            label="Total Available Slots"
            htmlFor="totalSlot"
          >
            <input
              id="totalSlot"
              name="totalSlot"
              type="number"
              min="1"
              step="1"
              placeholder="Example: 10"
              required
              disabled={isSubmitting}
              className={inputClassName}
            />
          </Field>

          <Field
            label="Session Start Date"
            htmlFor="sessionStartDate"
          >
            <input
              id="sessionStartDate"
              name="sessionStartDate"
              type="date"
              min={minimumDate}
              required
              disabled={isSubmitting}
              className={inputClassName}
            />
          </Field>

          <Field label="Profile Photo URL" htmlFor="photo">
            <input
              id="photo"
              name="photo"
              type="url"
              placeholder="https://example.com/photo.jpg"
              required
              disabled={isSubmitting}
              className={inputClassName}
            />
          </Field>

          <Field label="Teaching Mode" htmlFor="teachingMode">
            <select
              id="teachingMode"
              name="teachingMode"
              defaultValue=""
              required
              disabled={isSubmitting}
              className={inputClassName}
            >
              <option value="" disabled>
                Select teaching mode
              </option>

              {TEACHING_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Location" htmlFor="location">
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Example: Dhaka"
              required
              disabled={isSubmitting}
              className={inputClassName}
            />
          </Field>

          <Field label="Available Days" htmlFor="availableDays">
            <input
              id="availableDays"
              name="availableDays"
              type="text"
              placeholder="Example: Saturday, Monday"
              required
              disabled={isSubmitting}
              className={inputClassName}
            />
          </Field>

          <Field label="Available Time Slot" htmlFor="timeSlot">
            <input
              id="timeSlot"
              name="timeSlot"
              type="text"
              placeholder="Example: 7:00 PM - 9:00 PM"
              required
              disabled={isSubmitting}
              className={inputClassName}
            />
          </Field>
        </div>

        <Field
          label="Professional Background"
          htmlFor="experience"
        >
          <textarea
            id="experience"
            name="experience"
            rows={4}
            placeholder="Describe your education, teaching experience, and expertise."
            required
            disabled={isSubmitting}
            className="w-full rounded-xl border border-divider bg-content2 p-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-11 w-full items-center justify-center rounded-xl bg-primary font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Publishing...
            </span>
          ) : (
            "Publish Service Profile"
          )}
        </button>
      </form>
    </main>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-sm font-medium"
      >
        {label}
      </label>

      {children}
    </div>
  );
}