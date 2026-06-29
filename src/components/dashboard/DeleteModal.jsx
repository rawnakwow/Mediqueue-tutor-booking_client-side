"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/shared/loader";

export function DeleteModal({ endpoint, onClose, onSuccess }) {
  const { session } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteConfirm = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.token || ""}`,
        },
      });

      if (!response.ok) throw new Error("Database drop operation failed.");

      toast.success("Profile records removed permanently.");
      onSuccess();
    } catch (err) {
      toast.error(err.message || "Failed to execute database delete command.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-content1 border border-divider rounded-2xl p-6 shadow-xl animate-scale-up">
        <h3 className="text-lg font-bold text-danger">Confirm Permanent Deletion</h3>
        <p className="text-xs text-default-500 mt-2 leading-relaxed">
          Are you sure you want to drop this profile record? This entry is completely purged from our cluster. This action cannot be reversed.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" disabled={isSubmitting} onClick={onClose} className="h-9 px-4 text-xs font-semibold bg-content2 rounded-xl border border-divider cursor-pointer">Cancel</button>
          <button type="button" disabled={isSubmitting} onClick={handleDeleteConfirm} className="h-9 px-4 text-xs font-semibold bg-danger text-danger-foreground rounded-xl flex items-center gap-1 cursor-pointer">
            {isSubmitting && <Loader className="w-3 h-3 text-current" />} Delete Entry
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
