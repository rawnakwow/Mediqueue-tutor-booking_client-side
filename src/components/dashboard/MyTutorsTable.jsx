"use client";

import { useState } from "react";
import UpdateTutorModal from "./UpdateTutorModal";
import DeleteModal from "./DeleteModal";

export function MyTutorsTable({ tutors = [], onRefresh }) {
  const [editingTutor, setEditingTutor] = useState(null);
  const [deletingTutorId, setDeletingTutorId] = useState(null);

  return (
    <div className="bg-content1 border border-divider rounded-2xl overflow-hidden shadow-sm animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-divider bg-content2/50 text-default-500 font-semibold text-xs uppercase tracking-wider">
              <th className="p-4">Subject Track</th>
              <th className="p-4">Rate / Hour</th>
              <th className="p-4">Remaining Slots</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-divider/60">
            {tutors.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-default-400 font-normal">
                  You have not listed any tutor profiles yet.
                </td>
              </tr>
            ) : (
              tutors.map((tutor) => (
                <tr key={tutor._id} className="hover:bg-content2/20 transition-colors">
                  <td className="p-4 font-medium text-foreground">{tutor.subject}</td>
                  <td className="p-4 text-default-500">${tutor.hourlyFee} USD</td>
                  <td className="p-4 text-foreground/80 font-semibold">{tutor.totalSlot}</td>
                  <td className="p-4 text-right space-x-4">
                    <button
                      type="button"
                      onClick={() => setEditingTutor(tutor)}
                      className="text-xs font-bold text-primary hover:underline focus:outline-none cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingTutorId(tutor._id)}
                      className="text-xs font-bold text-danger hover:underline focus:outline-none cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingTutor && (
        <UpdateTutorModal
          tutor={editingTutor}
          onClose={() => setEditingTutor(null)}
          onSuccess={() => {
            setEditingTutor(null);
            onRefresh();
          }}
        />
      )}

      {deletingTutorId && (
        <DeleteModal
          endpoint={`http://localhost:5000/tutors/${deletingTutorId}`}
          onClose={() => setDeletingTutorId(null)}
          onSuccess={() => {
            setDeletingTutorId(null);
            onRefresh();
          }}
        />
      )}
    </div>
  );
}

export default MyTutorsTable;
