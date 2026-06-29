"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/shared/loader";

export function UpdateTutorModal({ tutor, onClose, onSuccess }) {
  const { session } = useAuth();
  const [fee, setFee] = useState(tutor.hourlyFee || "");
  const [slots, setSlots] = useState(tutor.totalSlot || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await fetch(`http://localhost:5000/tutors/${tutor._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token || ""}`,
        },
        body: JSON.stringify({
          ...tutor,
          hourlyFee: parseFloat(fee),
          totalSlot: parseInt(slots),
        }),
      });

      if (!response.ok) throw new Error("Update metrics adjustment failed.");

      toast.success("Tutor listing modified successfully.");
      onSuccess();
    } catch (err) {
      toast.error(err.message || "Failed to update profile statistics.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <form onSubmit={handleUpdateSubmit} className="w-full max-w-sm bg-content1 border border-divider rounded-2xl p-6 shadow-xl space-y-4 animate-scale-up">
        <h3 className="text-lg font-bold text-foreground">Modify Listing Parameters</h3>
        
        <div className="space-y-1">
          <label className="text-xs font-bold text-default-400">Hourly Cost Rate ($)</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            required
            min="0"
            className="w-full h-10 px-3 bg-content2 border border-divider rounded-xl text-sm text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-default-400">Total Available Slots</label>
          <input
            type="number"
            value={slots}
            onChange={(e) => setSlots(e.target.value)}
            required
            min="0"
            className="w-full h-10 px-3 bg-content2 border border-divider rounded-xl text-sm text-foreground focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="h-9 px-4 text-xs font-semibold bg-content2 rounded-xl border border-divider cursor-pointer">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="h-9 px-4 text-xs font-semibold bg-primary text-primary-foreground rounded-xl flex items-center gap-1 cursor-pointer">
            {isSubmitting && <Loader className="w-3 h-3 text-current" />} Save Updates
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateTutorModal;
