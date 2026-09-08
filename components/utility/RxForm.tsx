"use client";

import { fieldInput, fieldLabel } from "./UtilityShell";

const serviceOptions = [
  "Fixed Prosthesis",
  "Implants",
  "Digital Dentures",
  "Night Guards & Splints",
  "Cosmetic Dentistry",
  "Models",
];

export function RxForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.print();
      }}
      className="rounded-[24px] border border-teal/20 bg-white p-[34px] print:border-0 print:p-0"
    >
      <span className="eyebrow text-teal2 print:hidden">Digital prescription</span>
      <h2 className="mb-4 mt-3 text-[2rem] font-medium leading-[1.15] text-teal">
        Doctor&apos;s instructions
      </h2>
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        <div className="grid gap-[7px]">
          <label className={fieldLabel} htmlFor="rx-doctor">
            Doctor / practice
          </label>
          <input id="rx-doctor" name="doctor" required className={fieldInput} />
        </div>
        <div className="grid gap-[7px]">
          <label className={fieldLabel} htmlFor="rx-phone">
            Phone number
          </label>
          <input id="rx-phone" name="phone" type="tel" required className={fieldInput} />
        </div>
        <div className="grid gap-[7px] sm:col-span-2">
          <label className={fieldLabel} htmlFor="rx-address">
            Practice address
          </label>
          <input id="rx-address" name="address" className={fieldInput} />
        </div>
        <div className="grid gap-[7px]">
          <label className={fieldLabel} htmlFor="rx-patient">
            Patient name / ID
          </label>
          <input id="rx-patient" name="patient" required className={fieldInput} />
        </div>
        <div className="grid gap-[7px]">
          <label className={fieldLabel} htmlFor="rx-return">
            Return date
          </label>
          <input id="rx-return" name="returnDate" type="date" className={fieldInput} />
        </div>
        <div className="grid gap-[7px]">
          <label className={fieldLabel} htmlFor="rx-service">
            Service category
          </label>
          <select id="rx-service" name="service" className={fieldInput}>
            {serviceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-[7px]">
          <label className={fieldLabel} htmlFor="rx-shade">
            Shade
          </label>
          <input id="rx-shade" name="shade" placeholder="e.g. A2" className={fieldInput} />
        </div>
        <div className="grid gap-[7px] sm:col-span-2">
          <label className={fieldLabel} htmlFor="rx-restoration">
            Tooth numbers / restoration details
          </label>
          <input id="rx-restoration" name="restoration" className={fieldInput} />
        </div>
        <div className="grid gap-[7px] sm:col-span-2">
          <label className={fieldLabel} htmlFor="rx-instructions">
            Clinical and design instructions
          </label>
          <textarea
            id="rx-instructions"
            name="instructions"
            className={`${fieldInput} min-h-[120px] resize-y`}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        <button
          type="submit"
          className="rounded-full bg-teal px-[22px] py-3 text-[.85rem] font-semibold text-white transition hover:bg-deep"
        >
          Print / Save PDF
        </button>
        <button
          type="reset"
          className="rounded-full bg-aqua px-[22px] py-3 text-[.85rem] font-semibold text-deep transition hover:brightness-105"
        >
          Clear form
        </button>
      </div>
      <p className="mt-3.5 text-[.78rem] text-[#52706d] print:hidden">
        Review all clinical information before sending. This page does not transmit patient data.
      </p>
    </form>
  );
}
