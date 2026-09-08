/**
 * Starter templates for the admin "Write Article" flow. Each seeds the content
 * editor with a ready-to-edit HTML skeleton so every article follows a
 * consistent structure. Admins can freely edit the HTML afterwards.
 */

export interface ArticleTemplate {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  /** Short structural preview shown on the picker card. */
  preview: string;
  /** HTML seeded into the content editor. */
  html: string;
}

export const ARTICLE_TEMPLATES: ArticleTemplate[] = [
  {
    id: "standard",
    name: "Standard Article",
    tagline: "General clinical or educational piece",
    icon: "📝",
    preview: "Introduction → Core Mechanism → Clinical Practice → Conclusion",
    html: `<h2>Introduction</h2>
<p>Provide a detailed introduction here. Explain the key topic, clinical significance, or overall theme of this article.</p>

<h2>The Core Mechanism</h2>
<p>Discuss the technical details, clinical procedures, or workflow parameters. Use <strong>bold text</strong>, lists, or quotes to structure the content.</p>

<h2>Clinical Practice Integration</h2>
<p>Provide recommendations for integrating this process or technology into a dental practice. Explain the benefits for the dentist, chairside team, and laboratory technicians.</p>

<blockquote>Insert a memorable key quote or technician takeaway statement here to break up the text.</blockquote>

<h2>Conclusion</h2>
<p>Wrap up the article with summary thoughts and a clear final recommendation or call to action.</p>`,
  },
  {
    id: "case-study",
    name: "Clinical Case Study",
    tagline: "Step-by-step treatment case walkthrough",
    icon: "🦷",
    preview: "Patient Presentation → Clinical Protocol → Lab Fabrication → Outcome",
    html: `<h2>Patient Presentation</h2>
<p>Describe the patient's initial condition, aesthetic or functional complaints, preparation details, and the treatment-planning decisions.</p>

<h2>Clinical Protocol</h2>
<p>Step-by-step description of the clinical phases: diagnostic scanning, tissue retraction, material selection criteria, prep design, and scanning technique.</p>

<h2>Laboratory Fabrication</h2>
<p>How the case was processed in the lab. Detail the CAD/CAM workflow, materials used (e.g. monolithic zirconia grade, sinter parameters), and final glaze and stain detailing.</p>

<h2>Restorative Outcome</h2>
<p>Describe the final delivery, insertion protocol, occlusal verification, and the final patient and dentist satisfaction results.</p>`,
  },
  {
    id: "technical-review",
    name: "Technical Review",
    tagline: "In-depth material or technology analysis",
    icon: "🔬",
    preview: "Overview & Composition → Indications → Practical Tips → Verdict",
    html: `<h2>Overview &amp; Composition</h2>
<p>Introduce the material or technology being reviewed, including its key composition, mechanical strength (MPa), and aesthetic properties.</p>

<h2>Clinical Indications</h2>
<p>List exactly where this material or technology succeeds, and where it should not be used.</p>

<h2>Practical Tips for Success</h2>
<ul>
  <li>First technical tip or scanning guideline.</li>
  <li>Second handling, bonding, or preparation guideline.</li>
  <li>Third finishing and maintenance protocol.</li>
</ul>

<h2>Lab Verdict</h2>
<p>Provide the lab's direct feedback and overall evaluation of how this affects dental workflows.</p>`,
  },
];
