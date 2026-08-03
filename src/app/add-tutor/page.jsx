"use client";

import { useEffect, useState } from "react";
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
  "h-11 w-full rounded-xl border border-divider bg-content2 px-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function AddTutorPage() {
  const router = useRouter();

  const {
    user,
    token,
    isPending: isAuthPending,
    logout,
  } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.error("Enter a valid hourly fee.");
      return;
    }

    if (!Number.isInteger(totalSlot) || totalSlot <= 0) {
      toast.error("Total slots must be a positive whole number.");
      return;
    }

    const sessionDate = new Date(values.sessionStartDate);

    if (Number.isNaN(sessionDate.getTime())) {
      toast.error("Enter a valid session start date.");
      return;
    }

    const payload = {
      name: user.name || "Tutor",
      tutorEmail: user.email,
      subject: values.subject,
      institution: values.institution.trim(),
      hourlyFee,
      totalSlot,
      sessionStartDate: sessionDate.toISOString(),
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
            "Your login session is invalid. Please sign in again."
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
        <Loader text="Authenticating..." />
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
        subtitle="Fill out your credentials, schedule intervals and pricing."
      />

      <form
        onSubmit={handleFormSubmit}
        className="mt-8 space-y-6 rounded-3xl border border-divider bg-content1 p-6 shadow-sm sm:p-8"
      >
        <div className="rounded-2xl border border-divider/60 bg-content2/40 p-4 text-sm">
          <span className="mb-1 block font-semibold text-default-500">
            Authenticated account
          </span>

          <p className="font-medium text-foreground">
            {user.name || "Tutor"}
          </p>

          <p className="text-default-500">
            {user.email}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium"
            >
              Teaching Subject Track
            </label>

            <select
              id="subject"
              name="subject"
              required
              className={inputClassName}
            >
              {AVAILABLE_SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="institution"
              className="mb-2 block text-sm font-medium"
            >
              University / Institution
            </label>

            <input
              id="institution"
              name="institution"
              type="text"
              placeholder="Example: University of Dhaka"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="hourlyFee"
              className="mb-2 block text-sm font-medium"
            >
              Hourly Rate Fee
            </label>

            <input
              id="hourlyFee"
              name="hourlyFee"
              type="number"
              min="1"
              step="1"
              placeholder="Example: 500"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="totalSlot"
              className="mb-2 block text-sm font-medium"
            >
              Total Available Slots
            </label>

            <input
              id="totalSlot"
              name="totalSlot"
              type="number"
              min="1"
              step="1"
              placeholder="Example: 10"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="sessionStartDate"
              className="mb-2 block text-sm font-medium"
            >
              Session Start Date
            </label>

            <input
              id="sessionStartDate"
              name="sessionStartDate"
              type="date"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="photo"
              className="mb-2 block text-sm font-medium"
            >
              Profile Photo URL
            </label>

            <input
              id="photo"
              name="photo"
              type="url"
              placeholder="https://example.com/photo.jpg"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="teachingMode"
              className="mb-2 block text-sm font-medium"
            >
              Teaching Mode
            </label>

            <select
              id="teachingMode"
              name="teachingMode"
              required
              className={inputClassName}
            >
              {TEACHING_MODES.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium"
            >
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              placeholder="Example: Dhaka"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="availableDays"
              className="mb-2 block text-sm font-medium"
            >
              Available Days
            </label>

            <input
              id="availableDays"
              name="availableDays"
              type="text"
              placeholder="Example: Saturday, Monday"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label
              htmlFor="timeSlot"
              className="mb-2 block text-sm font-medium"
            >
              Available Time Slot
            </label>

            <input
              id="timeSlot"
              name="timeSlot"
              type="text"
              placeholder="Example: 7:00 PM - 9:00 PM"
              required
              className={inputClassName}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="experience"
            className="mb-2 block text-sm font-medium"
          >
            Professional Background
          </label>

          <textarea
            id="experience"
            name="experience"
            rows={4}
            placeholder="Describe education, teaching experience and expertise."
            required
            className="w-full rounded-xl border border-divider bg-content2 p-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-primary font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Publishing..."
            : "Publish Service Profile"}
        </button>
      </form>
    </main>
  );
}