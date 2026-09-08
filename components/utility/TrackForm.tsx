"use client";

import { useState } from "react";
import { fieldInput } from "./UtilityShell";

export function TrackForm() {
  const [id, setId] = useState("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = id.trim();
          if (trimmed) setResult(trimmed);
        }}
        className="rounded-[24px] border border-teal/20 bg-white p-[34px]"
      >
        <span className="eyebrow text-teal2">Case lookup</span>
        <h2 className="mb-2 mt-3 text-[2rem] font-medium leading-[1.15] text-teal">
          Enter your case ID
        </h2>
        <p className="text-[#315f5a]">Use the reference from your submission confirmation.</p>

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <input
            aria-label="Case ID"
            required
            placeholder="e.g. ID-2026-00124"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className={`${fieldInput} flex-1 rounded-full px-[18px] py-3.5`}
          />
          <button
            type="submit"
            className="rounded-full bg-teal px-[22px] py-3.5 text-[.85rem] font-semibold text-white transition hover:bg-deep"
          >
            Check status
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#"
            className="rounded-full bg-aqua px-[22px] py-3 text-[.85rem] font-semibold text-deep transition hover:brightness-105"
          >
            Open Iconic Connect
          </a>
        </div>
        <p className="mt-3.5 text-[.78rem] text-[#52706d]">
          For urgent assistance, call +1 209 751 0975.
        </p>
      </form>

      {result && (
        <div className="mt-[22px] rounded-[24px] border border-teal/20 bg-white p-[34px]">
          <span className="inline-flex rounded-full bg-aqua px-3 py-1.5 text-[.72rem] font-semibold text-deep">
            Lookup received
          </span>
          <h2 className="mb-2 mt-3 text-[2rem] font-medium leading-[1.15] text-teal">
            Case {result}
          </h2>
          <p className="text-[#315f5a]">
            Your reference has been entered. Connect with the Iconic team or open Iconic Connect to
            view authenticated production updates.
          </p>
        </div>
      )}
    </div>
  );
}
