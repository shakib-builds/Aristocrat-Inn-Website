"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Reads ?checkin=&checkout=&guests=&room= and hands them to the booking form.
 * Renders nothing; wrap in <Suspense> (search params are only known on the client).
 */
export default function UrlPrefill({ onPrefill }: { onPrefill: (query: string) => void }) {
  const query = useSearchParams().toString();
  useEffect(() => {
    onPrefill(query);
  }, [query, onPrefill]);
  return null;
}
