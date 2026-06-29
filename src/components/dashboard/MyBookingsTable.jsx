"use client";

import { useState } from "react";
import { formatCurrency } from "@/utils/helpers";
import CancelBookingModal from "./CancelBookingModal";

export function MyBookingsTable({ bookings = [], onRefresh }) {
  const [selectedBooking, setSelectedBooking] = useState(null);

  return (
    <div className="bg-content1 border border-divider rounded-2xl overflow-hidden shadow-sm animate-fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-divider bg-content2/50 text-default-500 font-semibold text-xs uppercase tracking-wider">
              <th className="p-4">Tutor Profile ID</th>
              <th className="p-4">Booked At</th>
              <th className="p-4">Fee Paid</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-divider/60">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-default-400 font-normal">
                  No active session reservations found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-content2/20 transition-colors">
                  <td className="p-4 font-medium text-foreground truncate max-w-[150px]">{booking.tutorId}</td>
                  <td className="p-4 text-default-500">
                    {new Date(booking.bookedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="p-4 text-foreground/80 font-medium">{formatCurrency(booking.feePaid)}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
                      booking.status === "cancelled" ? "bg-danger/10 text-danger" : "bg-emerald-500/10 text-emerald-500"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {booking.status !== "cancelled" && (
                      <button
                        type="button"
                        onClick={() => setSelectedBooking(booking)}
                        className="text-xs font-bold text-danger hover:underline focus:outline-none cursor-pointer"
                      >
                        Cancel Slot
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <CancelBookingModal
          bookingId={selectedBooking._id}
          onClose={() => setSelectedBooking(null)}
          onSuccess={() => {
            setSelectedBooking(null);
            onRefresh();
          }}
        />
      )}
    </div>
  );
}

export default MyBookingsTable;
