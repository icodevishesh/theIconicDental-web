"use client";

import { useState } from "react";
import { fieldInput, fieldLabel } from "./UtilityShell";

export function ShippingForm() {
  const [sender, setSender] = useState("");
  const [address, setAddress] = useState("");
  const [caseId, setCaseId] = useState("");
  const [label, setLabel] = useState<{ caseId: string; from: string } | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLabel({ caseId, from: `${sender}, ${address}` });
      }}
      className="rounded-[24px] border border-teal/20 bg-white p-[34px] print:border-0 print:p-0"
    >
      <span className="eyebrow text-teal2 print:hidden">Label details</span>
      <h2 className="mb-4 mt-3 text-[2rem] font-medium leading-[1.15] text-teal">
        Prepare your shipment
      </h2>
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <div className="grid gap-[7px]">
          <label className={fieldLabel} htmlFor="sl-name">
            Practice / laboratory name
          </label>
          <input
            id="sl-name"
            required
            className={fieldInput}
            value={sender}
            onChange={(e) => setSender(e.target.value)}
          />
        </div>
        <div className="grid gap-[7px]">
          <label className={fieldLabel} htmlFor="sl-contact">
            Contact number
          </label>
          <input id="sl-contact" type="tel" required className={fieldInput} />
        </div>
        <div className="grid gap-[7px] sm:col-span-2">
          <label className={fieldLabel} htmlFor="sl-address">
            Return address
          </label>
          <input
            id="sl-address"
            required
            className={fieldInput}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="grid gap-[7px]">
          <label className={fieldLabel} htmlFor="sl-case">
            Case ID
          </label>
          <input
            id="sl-case"
            required
            className={fieldInput}
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
          />
        </div>
        <div className="grid gap-[7px]">
          <label className={fieldLabel} htmlFor="sl-initials">
            Patient initials
          </label>
          <input id="sl-initials" className={fieldInput} />
        </div>
        <div className="grid gap-[7px] sm:col-span-2">
          <label className={fieldLabel} htmlFor="sl-notes">
            Package notes
          </label>
          <textarea id="sl-notes" className={`${fieldInput} min-h-[120px] resize-y`} />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        <button
          type="submit"
          className="rounded-full bg-teal px-[22px] py-3 text-[.85rem] font-semibold text-white transition hover:bg-deep"
        >
          Generate label
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full bg-aqua px-[22px] py-3 text-[.85rem] font-semibold text-deep transition hover:brightness-105"
        >
          Print label
        </button>
      </div>

      <div className="mt-6 rounded-[14px] border-2 border-dashed border-teal/20 bg-white p-[25px]">
        <span className="block text-[.85rem] text-[#52706d]">Ship to</span>
        <b className="block text-teal">Iconic Dental Designs</b>
        <span className="block text-[.85rem] text-[#52706d]">
          17131-53 Ave NW, Edmonton, AB T5T 2K1
        </span>
        <br />
        <span className="block text-[.85rem] text-[#52706d]">
          Case ID: {label?.caseId || "—"}
        </span>
        <span className="block text-[.85rem] text-[#52706d]">From: {label?.from || "—"}</span>
      </div>

      <p className="mt-3.5 text-[.78rem] text-[#52706d] print:hidden">
        Carrier pickup and postage are not booked by this form.
      </p>
    </form>
  );
}
