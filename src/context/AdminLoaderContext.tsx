"use client";

import { createContext, useContext, useState } from "react";

interface AdminLoaderContextProps {
  isPending: boolean;
  setIsPending: (pending: boolean) => void;
  pendingMessage: string;
  setPendingMessage: (msg: string) => void;
}

const AdminLoaderContext = createContext<AdminLoaderContextProps | undefined>(undefined);

export function AdminLoaderProvider({ children }: { children: React.ReactNode }) {
  const [isPending, setIsPending] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("Processing request...");

  return (
    <AdminLoaderContext.Provider
      value={{ isPending, setIsPending, pendingMessage, setPendingMessage }}
    >
      {children}
      {isPending && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-navy/20 backdrop-blur-md animate-fade-in">
          <div className="bg-white border border-brand-mint/20 rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center gap-4 max-w-xs w-full text-center animate-scale-up">
            <span className="p-4 bg-brand-pink/10 text-brand-pink rounded-full">
              <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
            <div>
              <p className="text-sm font-black text-brand-navy">{pendingMessage}</p>
              <p className="text-[10px] font-semibold text-brand-navy/50 mt-1">
                Please do not close this window
              </p>
            </div>
          </div>
        </div>
      )}
    </AdminLoaderContext.Provider>
  );
}

export function useAdminLoader() {
  const context = useContext(AdminLoaderContext);
  if (!context) {
    throw new Error("useAdminLoader must be used within an AdminLoaderProvider");
  }
  return context;
}
