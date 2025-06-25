// app/providers.tsx
"use client";

import { AuthProvider } from "@/context/Authcontext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
