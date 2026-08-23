import { lesson, imageCredits } from "./content.js";

const stage = document.querySelector("#lesson-stage");
const rail = document.querySelector("#rail-list");
const modalRoot = document.querySelector("#modal-root");
const sectionLabel = document.querySelector("#section-label");
const progressLabel = document.querySelector("#progress-label");
const progressBar = document.querySelector("#progress-bar");
const progressTrack = document.querySelector(".progress-track");
const videoInput = document.querySelector("#video-input");
const languageToggle = document.querySelector("#language-toggle");

const slides = [
  { type: "overview", section: "WELCOME", rail: "Welcome" },
  { type: "opening", section: "INTRODUCTION", rail: "One ordinary day" },
  { type: "timeline", section: "TIMELINE", rail: "Five historical stages" },
  ...lesson.stages.map((stageItem) => ({ type: "stage", stageId: stageItem.id, section: stageItem.era, rail: stageItem.label })),
  { type: "social", section: "SOCIAL TRANSFORMATION", rail: "Five social changes" },
  { type: "emerging", section: "MODERN IT", rail: "Emerging technologies" },
  { type: "moore", section: "MOORE'S LAW", rail: "Moore's Law" },
  { type: "limits", section: "MOORE'S LAW", rail: "Limits and new directions" },
  { type: "facts", section: "KEY FACTS", rail: "Key Facts + Concepts" },
  { type: "exam", section: "EXAM PREP", rail: "Exam-style question" },
  { type: "practice", section: "INTERACTION", rail: "Think and investigate" },
  { type: "challenge", section: "CLOSING", rail: "Reflect + Challenge" }
];

const state = {
  index: 0,
  teacherMode: true,
  selectedStage: "eniac",
  selectedSocial: "sns",
  selectedEmerging: "autonomous",
  revealed: new Set(),
  beforeAfter: new Set(),
  videoItems: [],
  videoPreview: null,
  activity: "cashless",
  practiceTab: "worked",
  languageAr: false,
  modalOpen: false
};

const stageColors = { eniac: "blue", pc: "cyan", web: "green", mobile: "gold", cloud: "red" };
const socialIcons = { sns: "↗", ecommerce: "▣", remote: "⌂", learning: "▤", cashless: "⌁" };
const emergingIcons = { autonomous: "◉", edge: "⇄", ar: "✦", vr: "◌", quantum: "0·1" };

function esc(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function tr(english, arabic = "") {
  return state.languageAr && arabic ? arabic : english;
}

function image(src, alt, className = "") {
  return `<div class="image-frame ${className}"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" /><span class="image-caption">${esc(alt)}</span></div>`;
}

function teacherCallout(label, body, color = "cyan") {
  if (!state.teacherMode) return "";
  return `<div class="teacher-callout"><strong>${esc(label)}:</strong> ${esc(body)}</div>`;
}

function actions(buttons) {
  return `<div class="teacher-tools">${buttons.filter(Boolean).map(({ action, label, className = "", videoId = "", sectionId = "" }) => `<button class="mini-btn ${className}" data-action="${action}"${videoId ? ` data-video-id="${esc(videoId)}"` : ""}${sectionId ? ` data-section-id="${esc(sectionId)}"` : ""}>${esc(label)}</button>`).join("")}</div>`;
}

function curatedVideoFor(topic) {
  return lesson.curatedVideos?.find((video) => video.topic === topic) || null;
}

function videoAction(topic) {
  const video = curatedVideoFor(topic);
  if (!video) return null;
  return { action: "play-curated-video", videoId: video.id, label: tr("Watch this concept", "شاهد شرح المفهوم"), className: "green" };
}

function stageChip(stageItem) {
  const isActive = stageItem.id === state.selectedStage;
  const imageMarkup = stageItem.image ? `<img src="${stageItem.image}" alt="${esc(stageItem.imageAlt)}" loading="lazy" />` : `<div class="cloud-mark">CLOUD</div>`;
  return `<button type="button" class="stage-chip ${isActive ? "is-active" : ""}" data-action="select-stage" data-stage="${stageItem.id}" aria-pressed="${isActive}">
    ${imageMarkup}<span class="era">${esc(tr(stageItem.era, stageItem.eraAr))}</span><span class="stage-label">${esc(tr(stageItem.label, stageItem.labelAr))}</span><span class="impact">${esc(tr(stageItem.impact, stageItem.impactAr))}</span>
  </button>`;
}

function stageDetail() {
  const item = lesson.stages.find((entry) => entry.id === state.selectedStage) || lesson.stages[0];
  const hasBeforeAfter = state.beforeAfter.has(item.id);
  const mainImage = item.id === "mobile" ? item.modernImage : item.image;
  const mainAlt = item.id === "mobile" ? item.modernAlt : item.imageAlt;
  const visual = item.id === "cloud" ? cloudDiagram() : image(mainImage, mainAlt, "image-frame--large");
  return `<div class="timeline-detail">
    <div class="timeline-visual">${visual}</div>
    <div class="timeline-detail-copy">
      <div class="stage-eyebrow">${esc(tr(item.era, item.eraAr))}</div>
      <h2>${esc(tr(item.label, item.labelAr))}</h2>
      <h3>${esc(tr(item.technology, item.technologyAr))}</h3>
      <p class="body-copy">${esc(tr(item.significance, item.significanceAr))}</p>
      <div class="impact-line"><strong>${state.languageAr ? "التأثير على المجتمع:" : "Impact on society:"}</strong> ${esc(tr(item.impact, item.impactAr))}</div>
      ${hasBeforeAfter ? `<div class="before-after"><div><b>BEFORE</b>${esc(item.before)}</div><div><b>AFTER</b>${esc(item.after)}</div></div>` : ""}
      ${teacherCallout(state.languageAr ? "سؤال" : "Ask", tr(item.question, item.questionAr))}
      ${actions([
      { action: `example-${item.id}`, label: "Show example", className: "primary" },
      { action: `before-after-${item.id}`, label: hasBeforeAfter ? "Hide before / after" : "Show before / after", className: "gold" },
      { action: `teacher-note-${item.id}`, label: "Open teacher note" },
      videoAction(item.id),
      { action: "open-videos", label: "Open lesson videos" }
      ])}
    </div>
  </div>`;
}

function cloudDiagram() {
  return `<div class="cloud-diagram" aria-label="Cloud computing diagram">
    <div class="device-stack"><div class="device-node">Phone<span>access</span></div><div class="device-node">Laptop<span>access</span></div><div class="device-node">School<span>access</span></div></div>
    <div class="network-bridge"><span>Internet</span></div>
    <div class="cloud-shape"><div class="cloud-stack"><div class="cloud-node">Compute<span>run programs</span></div><div class="cloud-node">Storage<span>keep data</span></div><div class="cloud-node">AI + analysis<span>large-scale work</span></div></div></div>
  </div>`;
}

function socialVisual(item) {
  const visuals = {
    network: `<svg viewBox="0 0 420 180" role="img" aria-label="SNS network diagram"><title>SNS network</title><g stroke="#1ba3e6" stroke-width="4" opacity=".8"><line x1="72" y1="90" x2="210" y2="45"/><line x1="72" y1="90" x2="210" y2="135"/><line x1="210" y1="45" x2="348" y2="90"/><line x1="210" y1="135" x2="348" y2="90"/></g><g fill="#176fb5"><circle cx="72" cy="90" r="28"/><circle cx="210" cy="45" r="28"/><circle cx="210" cy="135" r="28"/><circle cx="348" cy="90" r="28"/></g><g fill="#fff" font-size="20" font-weight="800" text-anchor="middle"><text x="72" y="97">A</text><text x="210" y="52">B</text><text x="210" y="142">C</text><text x="348" y="97">D</text></g></svg>`,
    commerce: `<svg viewBox="0 0 420 180" role="img" aria-label="E-commerce flow"><title>E-commerce flow</title><g fill="#e9f3fa" stroke="#176fb5" stroke-width="2"><rect x="12" y="64" width="84" height="54" rx="12"/><rect x="116" y="64" width="84" height="54" rx="12"/><rect x="220" y="64" width="84" height="54" rx="12"/><rect x="324" y="64" width="84" height="54" rx="12"/></g><g fill="#102638" font-size="15" font-weight="800" text-anchor="middle"><text x="54" y="96">Product</text><text x="158" y="96">Checkout</text><text x="262" y="96">Payment</text><text x="366" y="96">Delivery</text></g><g fill="none" stroke="#f4b900" stroke-width="4"><path d="M96 91h20M200 91h20M304 91h20"/></g></svg>`,
    remote: `<svg viewBox="0 0 420 180" role="img" aria-label="Remote work from home"><title>Remote work</title><rect x="66" y="56" width="288" height="92" rx="18" fill="#e9f3fa" stroke="#147d69" stroke-width="3"/><circle cx="210" cy="35" r="22" fill="#147d69"/><path d="M210 57v22" stroke="#147d69" stroke-width="4"/><text x="210" y="110" text-anchor="middle" font-size="20" font-weight="800" fill="#102638">HOME / REMOTE LOCATION</text></svg>`,
    learning: `<svg viewBox="0 0 420 180" role="img" aria-label="Online learning"><title>Online learning</title><rect x="58" y="38" width="304" height="116" rx="18" fill="#071a31" stroke="#f4b900" stroke-width="4"/><text x="210" y="92" text-anchor="middle" font-size="22" font-weight="800" fill="#fff">CLASS + MATERIALS</text><text x="210" y="122" text-anchor="middle" font-size="15" fill="#f4b900">delivered through the Internet</text></svg>`,
    payment: `<svg viewBox="0 0 420 180" role="img" aria-label="Cashless payment flow"><title>Cashless payment</title><rect x="32" y="53" width="130" height="74" rx="16" fill="#e9f3fa" stroke="#147d69" stroke-width="3"/><text x="97" y="97" text-anchor="middle" font-size="18" font-weight="800" fill="#102638">card / phone / QR</text><path d="M180 90h60" stroke="#f4b900" stroke-width="7"/><path d="M230 74l25 16-25 16" fill="#f4b900"/><rect x="274" y="53" width="114" height="74" rx="16" fill="#fff8dd" stroke="#f4b900" stroke-width="3"/><text x="331" y="97" text-anchor="middle" font-size="18" font-weight="800" fill="#102638">payment</text></svg>`
  };
  return visuals[item.visual] || visuals.network;
}

function emergingVisual(item) {
  const visuals = {
    car: `<svg viewBox="0 0 420 180" role="img" aria-label="Autonomous vehicle sensors"><title>Autonomous driving</title><g stroke="#1ba3e6" stroke-width="3" opacity=".8"><line x1="190" y1="52" x2="90" y2="26"/><line x1="210" y1="52" x2="210" y2="18"/><line x1="230" y1="52" x2="330" y2="26"/></g><rect x="105" y="79" width="210" height="54" rx="18" fill="#071a31" stroke="#176fb5" stroke-width="3"/><circle cx="151" cy="136" r="25" fill="#071a31" stroke="#1ba3e6" stroke-width="4"/><circle cx="270" cy="136" r="25" fill="#071a31" stroke="#1ba3e6" stroke-width="4"/><rect x="181" y="57" width="58" height="27" rx="8" fill="#1ba3e6"/><text x="210" y="170" text-anchor="middle" font-size="17" font-weight="800" fill="#102638">cameras + sensors + AI</text></svg>`,
    edge: `<svg viewBox="0 0 420 180" role="img" aria-label="Edge computing diagram"><title>Edge computing</title><rect x="28" y="62" width="90" height="52" rx="13" fill="#e9f3fa" stroke="#176fb5" stroke-width="3"/><rect x="164" y="62" width="90" height="52" rx="13" fill="#eef9f5" stroke="#147d69" stroke-width="3"/><rect x="300" y="62" width="90" height="52" rx="13" fill="#fff2f3" stroke="#b7414c" stroke-width="3"/><g font-size="16" font-weight="800" text-anchor="middle" fill="#102638"><text x="73" y="94">Device</text><text x="209" y="94">Edge</text><text x="345" y="94">Cloud</text></g><g stroke="#f4b900" stroke-width="5"><path d="M120 88h42"/><path d="M256 88h42"/></g><text x="209" y="150" text-anchor="middle" font-size="15" font-weight="800" fill="#147d69">decide on the spot</text></svg>`,
    ar: `<svg viewBox="0 0 420 180" role="img" aria-label="Augmented reality diagram"><title>Augmented reality</title><rect x="55" y="48" width="120" height="82" rx="10" fill="#e9f3fa" stroke="#176fb5" stroke-width="3"/><circle cx="270" cy="89" r="40" fill="#f4b900"/><path d="M175 89h50" stroke="#176fb5" stroke-width="4"/><text x="115" y="151" text-anchor="middle" font-size="16" font-weight="800" fill="#102638">real world</text><text x="270" y="151" text-anchor="middle" font-size="16" font-weight="800" fill="#176fb5">digital layer</text></svg>`,
    vr: `<svg viewBox="0 0 420 180" role="img" aria-label="Virtual reality diagram"><title>Virtual reality</title><rect x="86" y="54" width="248" height="75" rx="28" fill="#071a31" stroke="#f4b900" stroke-width="4"/><ellipse cx="160" cy="91" rx="37" ry="20" fill="#f4b900"/><ellipse cx="260" cy="91" rx="37" ry="20" fill="#f4b900"/><text x="210" y="158" text-anchor="middle" font-size="16" font-weight="800" fill="#102638">computer-generated virtual space</text></svg>`,
    quantum: `<svg viewBox="0 0 420 180" role="img" aria-label="Classical bit and qubit comparison"><title>Classical bit and qubit</title><circle cx="105" cy="88" r="45" fill="#176fb5"/><circle cx="315" cy="88" r="62" fill="#f4b900"/><text x="105" y="96" text-anchor="middle" font-size="21" font-weight="800" fill="#fff">0 OR 1</text><text x="315" y="96" text-anchor="middle" font-size="17" font-weight="800" fill="#071a31">0 + 1</text><text x="105" y="154" text-anchor="middle" font-size="15" font-weight="800" fill="#102638">classical bit</text><text x="315" y="154" text-anchor="middle" font-size="15" font-weight="800" fill="#102638">qubit / superposition</text></svg>`
  };
  return visuals[item.visual] || visuals.car;
}

function pageChrome(eyebrow, title, subtitle = "") {
  return `<div class="stage-eyebrow">${esc(eyebrow)}</div><h1 class="stage-title">${esc(title)}</h1>${subtitle ? `<p class="stage-subtitle">${esc(subtitle)}</p>` : ""}<div class="accent-line"></div>`;
}

function renderOverview() {
  const stageImages = lesson.stages.map((item) => item.image ? `<img src="${item.image}" alt="${esc(item.label)}" />` : `<div class="cloud-mark">CLOUD</div>`).join("");
  return `${pageChrome("LESSON 1-1", tr(lesson.title, lesson.titleAr))}<div class="hero-grid stage-body"><div class="hero-copy"><p class="body-copy">${esc(tr("A visual journey from room-sized computers to cloud computing — and the social changes that happened at every stage.", "رحلة بصرية من الحواسيب التي كانت تملأ غرفة كاملة إلى الحوسبة السحابية، وما صاحب كل مرحلة من تحولات اجتماعية."))}</p>${state.languageAr ? "" : `<div class="small-ar">${esc(lesson.titleAr)}</div>`}${actions([{ action: "start-lesson", label: tr("Start lesson", "ابدأ الدرس"), className: "primary" }, { action: "go-timeline", label: tr("Timeline overview", "نظرة عامة على الخط الزمني"), className: "gold" }])}${teacherCallout(tr("Teaching flow", "مسار الشرح"), tr("See → Ask → Explain → Show → Interact → Connect", "شاهد ← اسأل ← اشرح ← اعرض ← تفاعل ← اربط"))}</div><div class="hero-media"><div class="image-frame image-frame--large"><img src="media/eniac.jpg" alt="ENIAC" /><span class="image-caption">1940s–60s · ENIAC</span></div><div class="image-frame image-frame--large"><img src="media/smartphone.jpg" alt="Modern smartphone" /><span class="image-caption">2000s · mobile Internet</span></div></div></div><div class="stage-strip">${stageImages}</div>`;
}

function renderOpening() {
  return `${pageChrome("INTRODUCTION", "One ordinary day", "One student — four connected services")}
    <div class="hero-grid stage-body"><div class="hero-copy"><p class="body-copy">On an ordinary day, a student in Egypt checks messages on an SNS app, pays for breakfast with a cashless app, joins a lesson through online learning, and orders a book from an e-commerce shop.</p><p class="body-copy">Twenty years ago, most of this was not possible. Information technology developed through stages — from the first computers to cloud computing — and changed how people communicate, work, learn, and pay.</p>${teacherCallout("Ask", "Which of these services did you use today? What would be harder without it?")}${actions([{ action: "go-timeline", label: "Follow the timeline", className: "primary" }, { action: "open-gallery", label: "Open visual gallery" }])}</div><div class="hero-media">${image("media/smartphone.jpg", "Modern smartphone used for connected services", "image-frame--large")}${image("media/ibm_simon.png", "IBM Simon — an early smartphone", "image-frame--large")}</div></div>`;
}

function renderTimeline() {
  return `${pageChrome("TIMELINE", "Five stages. One social story.", "Click a stage to highlight it, then explain the change")}
    <div class="stage-body"><div class="stage-strip">${lesson.stages.map(stageChip).join("")}</div>${stageDetail()}</div>`;
}

function renderStage(item) {
  const mainImage = item.id === "mobile" ? item.modernImage : item.image;
  const mainAlt = item.id === "mobile" ? item.modernAlt : item.imageAlt;
  const visual = item.id === "cloud" ? cloudDiagram() : image(mainImage, mainAlt, "image-frame--large");
  return `${pageChrome(tr(item.era, item.eraAr), tr(item.label, item.labelAr), tr(item.technology, item.technologyAr))}<div class="stage-body"><div class="split-grid"><div>${visual}</div><div class="timeline-detail-copy"><h2>${esc(tr(item.technology, item.technologyAr))}</h2><p class="body-copy">${esc(tr(item.significance, item.significanceAr))}</p><div class="impact-line"><strong>${state.languageAr ? "التأثير على المجتمع:" : "Impact on society:"}</strong> ${esc(tr(item.impact, item.impactAr))}</div>${teacherCallout(state.languageAr ? "سؤال" : "Ask", tr(item.question, item.questionAr))}${actions([{ action: `example-${item.id}`, label: tr("Show example", "اعرض المثال"), className: "primary" }, { action: `before-after-${item.id}`, label: state.beforeAfter.has(item.id) ? tr("Hide before / after", "إخفاء قبل / بعد") : tr("Show before / after", "اعرض قبل / بعد"), className: "gold" }, { action: `teacher-note-${item.id}`, label: tr("Open teacher note", "افتح ملاحظة المعلم") }, videoAction(item.id), { action: "open-videos", label: tr("Open lesson videos", "افتح فيديوهات الدرس"), sectionId: item.id }])}</div></div>${state.beforeAfter.has(item.id) ? `<div class="before-after"><div><b>${state.languageAr ? "قبل" : "BEFORE"}</b>${esc(tr(item.before, item.beforeAr))}</div><div><b>${state.languageAr ? "بعد" : "AFTER"}</b>${esc(tr(item.after, item.afterAr))}</div></div>` : ""}</div>`;
}

function renderSocial() {
  const item = lesson.socialChanges.find((entry) => entry.id === state.selectedSocial) || lesson.socialChanges[0];
  return `${pageChrome("SOCIAL TRANSFORMATION", "Technology changes daily life", "Choose a social change to see the source definition and example")}
    <div class="stage-body"><div class="social-grid">${lesson.socialChanges.map((entry) => `<button class="social-card ${entry.id === state.selectedSocial ? "is-selected" : ""}" data-action="select-social" data-social="${entry.id}" aria-pressed="${entry.id === state.selectedSocial}"><span class="social-icon">${socialIcons[entry.id]}</span><h3>${esc(entry.term)}</h3><p>${esc(tr(entry.short, entry.shortAr))}</p></button>`).join("")}</div><div class="split-grid"><div class="flow-card">${socialVisual(item)}<h3>${esc(item.term)}</h3><p>${esc(tr(item.short, item.shortAr))}</p></div><div class="selected-detail"><strong>${esc(item.title)} · ${esc(item.ar)}</strong><p>${esc(tr(item.sourceText, item.sourceTextAr))}</p><p><b>${state.languageAr ? "مثال:" : "Example:"}</b> ${esc(item.example)}</p>${teacherCallout(state.languageAr ? "سؤال" : "Ask", tr("Why did this technology change society? What became possible?", "لماذا غيّرت هذه التقنية المجتمع؟ وما الذي أصبح ممكنًا؟"))}${actions([videoAction(item.id), { action: "open-videos", label: tr("Open lesson videos", "افتح فيديوهات الدرس"), sectionId: item.id }])}</div></div></div>`;
}

function renderEmerging() {
  const item = lesson.emerging.find((entry) => entry.id === state.selectedEmerging) || lesson.emerging[0];
  return `${pageChrome("MODERN IT", "Emerging technologies", "Click a concept to connect the technology to its real-world use")}
    <div class="stage-body"><div class="emerging-grid">${lesson.emerging.map((entry) => `<button class="emerging-card ${entry.id === state.selectedEmerging ? "is-selected" : ""}" data-action="select-emerging" data-emerging="${entry.id}" aria-pressed="${entry.id === state.selectedEmerging}"><span class="emerging-icon">${emergingIcons[entry.id]}</span><h3>${esc(entry.term)}</h3><span class="ar-term">${esc(entry.ar)}</span><p>${esc(tr(entry.short, entry.shortAr))}</p></button>`).join("")}</div><div class="split-grid"><div class="flow-card">${emergingVisual(item)}<h3>${esc(item.term)}</h3><p>${esc(tr(item.detail, item.detailAr))}</p></div><div class="selected-detail"><strong>${esc(item.term)} · ${esc(item.ar)}</strong><p>${esc(tr(item.short, item.shortAr))}</p>${item.id === "autonomous" ? `<div class="impact-line"><strong>${state.languageAr ? "لماذا الحوسبة الطرفية؟" : "Why edge computing?"}</strong> ${state.languageAr ? "قد يؤثر تأخر معالجة البيانات ولو 0.1 ثانية في السلامة." : "A delay of even 0.1 seconds can lead to an accident."}</div>` : ""}${teacherCallout(state.languageAr ? "سؤال" : "Ask", item.id === "edge" ? tr("Why should this decision happen on the device instead of waiting for the cloud?", "لماذا يجب أن يحدث هذا القرار على الجهاز بدلًا من انتظار السحابة؟") : tr("Where could students see this technology in real life?", "أين يمكن للطلاب رؤية هذه التقنية في الحياة الواقعية؟"))}${actions([videoAction(item.id), { action: "open-videos", label: tr("Open lesson videos", "افتح فيديوهات الدرس"), sectionId: item.id }])}</div></div></div>`;
}

function renderMoore() {
  const revealed = state.revealed.has("moore-details");
  return `${pageChrome("MOORE'S LAW", "Moore’s Law", "A historical trend in transistor counts")}
    <div class="stage-body"><div class="moore-grid"><div class="chart-panel"><img src="media/moores_law_chart.png" alt="Moore's Law transistor count over time" /></div><div class="definition-panel"><h3>The source definition</h3><p>${esc(lesson.moore.definition)}</p><div class="small-ar">${esc(lesson.moore.ar)}</div><div class="doubling-row"><span class="doubling-step">2×</span><span class="doubling-arrow">→</span><span class="doubling-step">4×</span><span class="doubling-arrow">→</span><span class="doubling-step">8×</span></div><button class="mini-btn gold" data-action="reveal-moore">${revealed ? "Hide explanation" : "Reveal what to notice"}</button>${actions([videoAction("moore")])}</div></div>${revealed ? `<div class="selected-detail"><strong>What to notice:</strong> the plotted points rise toward much higher transistor counts. The important idea is the long-term growth, not memorizing each processor name. The chart’s vertical axis is logarithmic, so a straight-looking trend can still represent enormous growth.</div>` : ""}${teacherCallout("Teacher question", "What do you notice about transistor count as time moves from left to right?")}</div>`;
}

function renderLimits() {
  return `${pageChrome("MOORE'S LAW", "When transistors become very small", "Physical limits create new directions")}
    <div class="stage-body"><p class="body-copy">Moore’s Law remained largely accurate for many years, and computing power increased dramatically. In recent years, miniaturization has approached physical limits.</p><div class="limit-grid">${lesson.moore.limits.map((text, index) => `<div class="limit-card"><h3>${["Quantum tunneling", "Leakage current", "Design challenge"][index]}</h3><p>${esc(text)}</p></div>`).join("")}</div><div class="cause-flow"><div class="cause-node"><h3>Problem</h3><p>Smaller circuits create physical challenges.</p></div><div class="flow-arrow">→</div><div class="cause-node"><h3>Response</h3><p>Use multiple processor cores.</p></div><div class="flow-arrow">→</div><div class="cause-node"><h3>New direction</h3><p>Explore quantum computers.</p></div></div>${teacherCallout("Connect", "The story continues: when one path becomes difficult, engineers explore new architectures and new principles.")}</div>`;
}

function renderFacts() {
  return `${pageChrome("KEY FACTS + CONCEPTS", "The vocabulary of the lesson", "Click any concept to open a short explanation")}
    <div class="stage-body"><div class="key-facts"><div class="fact-hero"><h3>Key Fact</h3><p>${esc(lesson.keyFact)}</p></div><div class="concept-list">${lesson.keyConcepts.map((concept) => `<button class="concept-pill" data-action="open-concept" data-concept="${esc(concept)}">${esc(concept)}</button>`).join("")}</div></div><div class="sidebar-rack">${lesson.sidebars.map((item, index) => `<button class="sidebar-card" data-action="open-sidebar" data-sidebar-index="${index}"><strong>${esc(item.label)}</strong><span>Tap to reveal</span></button>`).join("")}</div><div class="selected-detail"><strong>Remember the lesson pattern:</strong> Information technology developed in stages, and every stage changed communication, work, learning, business, or daily life.</div></div>`;
}

function renderExam() {
  const revealed = state.revealed.has("exam");
  return `${pageChrome("EXAM PREP", "Exam-style question", "Keep the official wording visible, then reveal the thinking")}
    <div class="stage-body"><div class="exam-panel"><div class="exam-question"><div class="stage-eyebrow" style="color:#f4b900">EXAM-STYLE QUESTION</div><blockquote>${esc(lesson.exam.question)}</blockquote><span class="marks">${esc(lesson.exam.marks)}</span></div><div class="exam-side"><h3>Command word: ${esc(lesson.exam.command)}</h3><p>Do more than define. Connect the change in cloud computing to the required points.</p><button class="mini-btn primary" data-action="reveal-exam">${revealed ? "Hide answer guidance" : "Reveal answer guidance"}</button>${revealed ? `<div class="reveal-list" style="margin-top:14px">${lesson.exam.requirements.map((item) => `<div class="reveal-item"><b>Discuss:</b> ${esc(item)}</div>`).join("")}</div>` : ""}</div></div>${revealed ? `<div class="split-grid"><div class="selected-detail"><strong>Suggested structure</strong><ol>${lesson.exam.structure.map((item) => `<li>${esc(item)}</li>`).join("")}</ol></div><div class="selected-detail"><strong>Relevant evidence</strong><ul>${lesson.exam.evidence.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></div></div>` : ""}${teacherCallout("Teacher move", "Ask students to explain the relationship between cloud computing, large-scale data analysis, AI, and IT as a service before showing the guidance.")}</div>`;
}

function renderPractice() {
  const tab = state.practiceTab;
  const tabs = [["worked", "Worked example"], ["try", "Try"], ["engineer", "Think as an Engineer"], ["exercise", "Exercise"]];
  let panel = "";
  if (tab === "worked") {
    const w = lesson.workedExample;
    panel = `<div class="activity-panel"><h2>Worked Example</h2><p>${esc(w.order.prompt)}</p><div class="choice-list">${w.order.choices.map((choice) => `<div class="choice-row">${esc(choice)}</div>`).join("")}</div><button class="mini-btn primary" data-action="reveal-practice">${state.revealed.has("practice") ? "Hide solution" : "Reveal solution"}</button>${state.revealed.has("practice") ? `<div class="reveal-list"><div class="reveal-item"><b>Solution:</b> ${esc(w.order.answer)}</div><h3>True or false</h3>${w.truth.map(([letter, text, answer]) => `<div class="reveal-item"><b>${letter}</b> ${esc(text)} <span class="answer-mark">${answer}</span></div>`).join("")}<h3>Matching</h3><p>${esc(w.matching.prompt)}</p><p><b>Choices:</b> ${esc(w.matching.choices)}</p>${w.matching.rows.map(([letter, text, answer]) => `<div class="reveal-item"><b>${letter}</b> ${esc(text)} → <strong>${answer}</strong></div>`).join("")}</div>` : ""}</div>`;
  } else if (tab === "try") {
    const t = lesson.tryQuestions;
    panel = `<div class="activity-panel"><h2>Try</h2><h3>1 · Answer the following questions</h3><ol>${t.terms.map((q) => `<li>${esc(q)}</li>`).join("")}</ol><h3>2 · Classify the change</h3><p>Choose A: daily life, B: industry and economy, or C: healthcare and education.</p>${t.categories.map(([q, a]) => `<div class="question-row"><span>${esc(q)}</span><small>${state.revealed.has("practice") ? esc(a) : "Think first"}</small></div>`).join("")}<h3>3 · NOT an appropriate description</h3><div class="choice-list">${t.notEmerging.choices.map((choice) => `<div class="choice-row">${esc(choice)}</div>`).join("")}</div><button class="mini-btn primary" data-action="reveal-practice">${state.revealed.has("practice") ? "Hide key" : "Reveal key"}</button>${state.revealed.has("practice") ? `<div class="reveal-item"><b>Answer:</b> ${esc(t.notEmerging.answer)}</div>` : ""}</div>`;
  } else if (tab === "engineer") {
    const e = lesson.engineerTask;
    panel = `<div class="activity-panel"><h2>Think as an Engineer — Investigate & Decide</h2><p>${esc(e.prompt)}</p><div class="cause-flow"><div class="cause-node"><h3>1 · Collect data</h3><p>${esc(e.collect)}</p></div><div class="cause-node"><h3>2 · Analyze stakeholders</h3><p>Record one benefit and one drawback for each group.</p></div><div class="cause-node"><h3>3 · Decide</h3><p>${esc(e.decide)}</p></div></div><div class="stakeholder-table"><div><b>Group</b><b>Benefit</b><b>Drawback</b></div>${e.stakeholders.map(([group]) => `<div><span>${esc(group)}</span><span>Discuss</span><span>Discuss</span></div>`).join("")}</div><p class="teacher-callout"><strong>Stuck?</strong> ${esc(e.stuck)}</p><h3>In a New Context</h3><p>${esc(lesson.newContext)}</p></div>`;
  } else {
    const x = lesson.exercise;
    panel = `<div class="activity-panel"><h2>Exercise</h2><p>${esc(x.passage)}</p><ol><li>Fill in the blanks (a)–(c).</li><li>${esc(x.question2)}</li><li>${esc(x.question3)}</li></ol><h3>Emerging technologies</h3><p>Choose all that are emerging technologies:</p><p class="choice-row">${esc(x.emergingChoices)}</p><h3>SNS</h3><div class="choice-list">${x.snsChoices.map((choice) => `<div class="choice-row">${esc(choice)}</div>`).join("")}</div><button class="mini-btn primary" data-action="reveal-practice">${state.revealed.has("practice") ? "Hide exercise key" : "Reveal exercise key"}</button>${state.revealed.has("practice") ? `<div class="reveal-item"><b>Answers:</b> (a) ${x.blanks[0]}; (b) ${x.blanks[1]}; (c) ${x.blanks[2]}. Cloud computing; about every two years; emerging technologies B, D, E, F; SNS: A.</div>` : ""}</div>`;
  }
  return `${pageChrome("INTERACTION", "Activities and application", "Use the tabs to move from recall to investigation and decision-making")}
    <div class="stage-body"><div class="activity-tabs">${tabs.map(([id, label]) => `<button class="activity-tab ${tab === id ? "is-active" : ""}" data-action="practice-tab" data-practice-tab="${id}">${label}</button>`).join("")}</div>${panel}<div class="selected-detail"><strong>Lesson Question — Answered</strong><p>${esc(lesson.lessonAnswer)}</p></div></div>`;
}

function renderChallenge() {
  return `${pageChrome("CLOSING", "Reflect, review, challenge", "Finish by connecting the timeline to the future")}
    <div class="stage-body"><div class="hero-grid"><div class="hero-copy"><img src="media/avatar.png" alt="Teacher avatar" style="width:110px;height:140px;object-fit:contain;object-position:left bottom" /><h2 style="margin:0;color:var(--navy);font-size:32px">${esc(lesson.reflect)}</h2>${teacherCallout("Challenge", lesson.challenge)}</div><div class="flow-card"><div class="flow-icon">→</div><h3>Technology → Society</h3><div class="cause-flow"><div class="cause-node"><h3>Past</h3><p>Computers → Internet → smartphones → cloud</p></div><div class="cause-node"><h3>Future</h3><p>Choose one emerging technology, one useful application, and one risk.</p></div></div></div></div><div class="selected-detail"><strong>Key takeaway</strong><p>${esc(lesson.lessonAnswer)}</p></div></div>`;
}

function renderSlide() {
  const current = slides[state.index];
  if (current.type === "overview") return renderOverview();
  if (current.type === "opening") return renderOpening();
  if (current.type === "timeline") return renderTimeline();
  if (current.type === "stage") return renderStage(lesson.stages.find((item) => item.id === current.stageId));
  if (current.type === "social") return renderSocial();
  if (current.type === "emerging") return renderEmerging();
  if (current.type === "moore") return renderMoore();
  if (current.type === "limits") return renderLimits();
  if (current.type === "facts") return renderFacts();
  if (current.type === "exam") return renderExam();
  if (current.type === "practice") return renderPractice();
  return renderChallenge();
}

function renderRail() {
  rail.innerHTML = slides.map((item, index) => `<button class="rail-item ${index === state.index ? "is-active" : ""}" data-action="go" data-index="${index}">${index + 1}. ${esc(item.rail)}<small>${esc(item.section)}</small></button>`).join("");
}

function render() {
  stage.innerHTML = renderSlide();
  stage.classList.remove("stage-pulse");
  void stage.offsetWidth;
  stage.classList.add("stage-pulse");
  renderRail();
  sectionLabel.textContent = slides[state.index].section;
  progressLabel.textContent = `${state.index + 1} / ${slides.length}`;
  progressBar.style.width = `${((state.index + 1) / slides.length) * 100}%`;
  progressTrack.setAttribute("aria-valuenow", String(state.index + 1));
  document.querySelector("#mode-toggle").textContent = state.teacherMode ? "Teacher Mode" : "Student Mode";
  document.querySelector("#mode-toggle").setAttribute("aria-pressed", String(state.teacherMode));
  languageToggle.textContent = state.languageAr ? "English" : "العربية";
  languageToggle.setAttribute("aria-pressed", String(state.languageAr));
  document.documentElement.lang = state.languageAr ? "ar" : "en";
  document.documentElement.dir = "ltr";
  document.body.classList.toggle("lang-ar", state.languageAr);
  document.querySelector("#prev-btn").disabled = state.index === 0;
  document.querySelector("#next-btn").textContent = state.index === slides.length - 1 ? "Restart ↺" : "Next →";
}

function goTo(index) {
  state.index = Math.max(0, Math.min(slides.length - 1, index));
  state.revealed.clear();
  render();
}

function openModal(title, content, actionsHtml = "") {
  modalRoot.hidden = false;
  state.modalOpen = true;
  modalRoot.innerHTML = `<div class="modal-card" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-head"><h2>${esc(title)}</h2><button class="icon-btn" data-action="close-modal" aria-label="Close">Close</button></div><div class="modal-content">${content}</div>${actionsHtml ? `<div class="modal-actions">${actionsHtml}</div>` : ""}</div>`;
}

function closeModal() {
  modalRoot.hidden = true;
  modalRoot.innerHTML = "";
  state.modalOpen = false;
  state.videoPreview = null;
}

function openStageExample(id) {
  const item = lesson.stages.find((entry) => entry.id === id);
  if (!item) return;
  const visual = item.id === "cloud" ? cloudDiagram() : `<img src="${item.image || item.modernImage}" alt="${esc(item.imageAlt || item.modernAlt)}" />`;
  openModal(`${item.label} · example`, `${visual}<p><b>Why does this matter?</b></p><p>${esc(item.example)}</p><p><b>Source-supported impact:</b> ${esc(item.impact)}</p>`, `<button class="mini-btn primary" data-action="close-modal">Continue teaching</button>`);
}

function openTeacherNote(id) {
  const item = lesson.stages.find((entry) => entry.id === id);
  if (!item) return;
  openModal(`${item.label} · teacher note`, `<p><b>Ask:</b> ${esc(item.question)}</p><p><b>Point to:</b> ${esc(item.technology)} and the visual before discussing the social impact.</p><p><b>Source-supported impact:</b> ${esc(item.impact)}</p><p><b>Transition:</b> Compare the “before” situation with what the selected stage made possible.</p>`);
}

function openConcept(concept) {
  const normalized = concept.toLowerCase();
  const all = [...lesson.socialChanges, ...lesson.emerging];
  const found = all.find((entry) => entry.term.toLowerCase().includes(normalized) || concept.toLowerCase().includes(entry.term.toLowerCase()));
  if (found) {
    const isEmerging = lesson.emerging.some((entry) => entry.id === found.id);
    const visualMarkup = found.visual ? (isEmerging ? emergingVisual(found) : socialVisual(found)) : "";
    openModal(`${found.term} · ${found.ar}`, `${visualMarkup}<p>${esc(found.sourceText || found.short)}</p><p><b>Example:</b> ${esc(found.example || found.detail || "")}</p>`);
    return;
  }
  if (normalized.includes("moore")) {
    openModal("Moore’s Law", `<img src="media/moores_law_chart.png" alt="Moore's Law chart" /><p>${esc(lesson.moore.definition)}</p><p>${esc(lesson.moore.limits.join(" "))}</p>`);
    return;
  }
  openModal(concept, `<p>This concept belongs to the official Lesson 1 vocabulary.</p>`);
}

function renderGallery() {
  const items = [
    ["ENIAC", "media/eniac.jpg", "Historical ENIAC computer room"],
    ["Personal computers", "media/early_pcs.jpg", "Early personal computers"],
    ["The Web", "media/first_web.png", "The first World Wide Web project page"],
    ["IBM Simon", "media/ibm_simon.png", "Early smartphone"],
    ["Modern smartphone", "media/smartphone.jpg", "Modern smartphone"],
    ["Moore’s Law", "media/moores_law_chart.png", "Transistor count over time"],
    ["VR headset", "media/vr_headset.jpg", "Virtual reality headset"]
  ];
  return `<div class="media-grid">${items.map(([title, src, alt]) => `<button class="media-card" data-action="open-media" data-src="${src}" data-title="${esc(title)}" data-alt="${esc(alt)}"><img src="${src}" alt="${esc(alt)}" loading="lazy" /><span>${esc(title)}</span></button>`).join("")}</div>`;
}

function openGallery() {
  openModal("Lesson media gallery", `${renderGallery()}<p class="small-ar">Use the gallery to pause on a visual and explain what students should notice. Image credits are listed below.</p><div class="selected-detail">${imageCredits.map(([name, url]) => `<div><b>${esc(name)}:</b> <a href="${url}" target="_blank" rel="noreferrer">source</a></div>`).join("")}</div>`);
}

function curatedVideoList() {
  const videos = lesson.curatedVideos || [];
  if (!videos.length) return `<div class="selected-detail">No curated videos are available.</div>`;
  return `<div class="video-list">${videos.map((video) => `<div class="video-item video-item--curated"><strong>${esc(tr(video.title, video.titleAr))}</strong><span>${esc(video.source)} · ${esc(tr(video.description, video.descriptionAr))}</span><div class="modal-actions"><button class="mini-btn primary" data-action="play-curated-video" data-video-id="${esc(video.id)}">Play in lesson</button></div></div>`).join("")}</div>`;
}

function openVideos() {
  const curated = curatedVideoList();
  const added = state.videoItems.length ? `<div class="video-list">${state.videoItems.map((item, index) => `<div class="video-item"><strong>${esc(item.name)}</strong><span>${esc(item.section)} · ${esc(item.description || item.type || "local video")}</span><div class="modal-actions"><button class="mini-btn primary" data-action="play-video" data-video-index="${index}">Preview</button><button class="mini-btn" data-action="remove-video" data-video-index="${index}">Remove</button></div></div>`).join("")}</div>` : `<div class="selected-detail">No teacher-added videos yet. You can add a YouTube URL or choose local video files for a classroom preview.</div>`;
  openModal("Lesson media · Video library", `<div class="video-library"><div class="video-drop"><h3>Recommended lesson videos</h3><p>Each curated video is linked to the concept where it is taught. YouTube opens inside the lesson without autoplay.</p>${curated}</div><div><h3 class="video-library-heading">Add your own video</h3><p class="small-ar">Teacher-added URLs and local files stay available during this browser session.</p><select id="video-section-select" class="control-select">${lesson.stages.map((item) => `<option value="${item.era}">${esc(item.era)} · ${esc(item.label)}</option>`).join("")}<option value="Modern IT">Modern IT</option><option value="Exam Prep">Exam Prep</option></select><input id="video-title-input" class="control-input" placeholder="Video title" /><input id="video-url-input" class="control-input" placeholder="YouTube or video URL" /><input id="video-description-input" class="control-input" placeholder="Short description (optional)" /><div class="modal-actions"><button class="mini-btn primary" data-action="add-video-url">Add video URL</button><button class="mini-btn" data-action="choose-video">Choose local video file(s)</button></div><div class="added-video-list"><h3 class="video-library-heading">Teacher-added videos</h3>${added}</div></div></div>`);
}

function chooseVideoFiles() { videoInput.value = ""; videoInput.click(); }

function handleVideoFiles(files) {
  const section = document.querySelector("#video-section-select")?.value || "Lesson 1";
  [...files].forEach((file) => state.videoItems.push({ name: file.name, description: "Local file", type: "local video", section, url: URL.createObjectURL(file), local: true }));
  openVideos();
}

function youtubeEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
  } catch {}
  return url;
}

function addVideoUrl() {
  const title = document.querySelector("#video-title-input")?.value.trim();
  const url = document.querySelector("#video-url-input")?.value.trim();
  const description = document.querySelector("#video-description-input")?.value.trim() || "Teacher-added video";
  const section = document.querySelector("#video-section-select")?.value || "Lesson 1";
  if (!url) return;
  state.videoItems.push({ name: title || "Lesson video", description, type: "URL", section, url: youtubeEmbedUrl(url), local: false });
  openVideos();
}

function playVideo(index) {
  const item = state.videoItems[index];
  if (!item) return;
  state.videoPreview = index;
  const player = item.local ? `<video class="lesson-video" src="${item.url}" controls></video>` : `<iframe class="lesson-video" src="${esc(item.url)}" title="${esc(item.name)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  openModal(item.name, `${player}<p><b>Lesson section:</b> ${esc(item.section)}</p><p>${esc(item.description || "")}</p>`);
}

function playCuratedVideo(id) {
  const video = lesson.curatedVideos?.find((entry) => entry.id === id);
  if (!video) return;
  const player = `<iframe class="lesson-video" src="${esc(youtubeEmbedUrl(video.url))}" title="${esc(tr(video.title, video.titleAr))}" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  openModal(tr(video.title, video.titleAr), `${player}<div class="video-resource"><b>${esc(tr("Why this video is here", "لماذا يوجد هذا الفيديو هنا"))}:</b> ${esc(tr(video.description, video.descriptionAr))}<br /><span>${esc(video.source)}</span><br /><a href="${esc(video.url)}" target="_blank" rel="noreferrer">Open on YouTube ↗</a></div>`);
}

function handleAction(event) {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "go") goTo(Number(target.dataset.index));
  else if (action === "next") goTo(state.index === slides.length - 1 ? 0 : state.index + 1);
  else if (action === "prev") goTo(state.index - 1);
  else if (action === "start-lesson") goTo(1);
  else if (action === "go-timeline") goTo(2);
  else if (action === "select-stage") { state.selectedStage = target.dataset.stage; render(); }
  else if (action.startsWith("example-")) openStageExample(action.slice(8));
  else if (action.startsWith("teacher-note-")) openTeacherNote(action.slice(13));
  else if (action.startsWith("before-after-")) { const id = action.slice(13); state.beforeAfter.has(id) ? state.beforeAfter.delete(id) : state.beforeAfter.add(id); render(); }
  else if (action === "select-social") { state.selectedSocial = target.dataset.social; render(); }
  else if (action === "select-emerging") { state.selectedEmerging = target.dataset.emerging; render(); }
  else if (action === "reveal-moore") { state.revealed.has("moore-details") ? state.revealed.delete("moore-details") : state.revealed.add("moore-details"); render(); }
  else if (action === "reveal-exam") { state.revealed.has("exam") ? state.revealed.delete("exam") : state.revealed.add("exam"); render(); }
  else if (action === "reveal-practice") { state.revealed.has("practice") ? state.revealed.delete("practice") : state.revealed.add("practice"); render(); }
  else if (action === "practice-tab") { state.practiceTab = target.dataset.practiceTab; state.revealed.delete("practice"); render(); }
  else if (action === "open-sidebar") { const item = lesson.sidebars[Number(target.dataset.sidebarIndex)]; if (item) openModal(item.label, `<p>${esc(item.text)}</p>`); }
  else if (action === "open-gallery") openGallery();
  else if (action === "open-videos") openVideos();
  else if (action === "close-modal") closeModal();
  else if (action === "open-media") openModal(target.dataset.title, `<img src="${target.dataset.src}" alt="${esc(target.dataset.alt)}" /><p>${esc(target.dataset.alt)}</p>`);
  else if (action === "open-concept") openConcept(target.dataset.concept);
  else if (action === "choose-video") chooseVideoFiles();
  else if (action === "add-video-url") addVideoUrl();
  else if (action === "play-video") playVideo(Number(target.dataset.videoIndex));
  else if (action === "play-curated-video") playCuratedVideo(target.dataset.videoId);
  else if (action === "remove-video") { const removed = state.videoItems.splice(Number(target.dataset.videoIndex), 1)[0]; if (removed?.url) URL.revokeObjectURL(removed.url); openVideos(); }
}

document.addEventListener("click", handleAction);
document.querySelector("#prev-btn").addEventListener("click", () => goTo(state.index - 1));
document.querySelector("#next-btn").addEventListener("click", () => goTo(state.index === slides.length - 1 ? 0 : state.index + 1));
document.querySelector("#overview-btn").addEventListener("click", () => goTo(0));
document.querySelector("#gallery-btn").addEventListener("click", openGallery);
document.querySelector("#video-btn").addEventListener("click", openVideos);
document.querySelector("#mode-toggle").addEventListener("click", () => { state.teacherMode = !state.teacherMode; render(); });
languageToggle.addEventListener("click", () => { state.languageAr = !state.languageAr; render(); });
document.querySelector("#fullscreen-btn").addEventListener("click", async () => { try { if (!document.fullscreenElement) await document.documentElement.requestFullscreen(); else await document.exitFullscreen(); } catch { document.body.classList.toggle("presentation"); } });
videoInput.addEventListener("change", () => handleVideoFiles(videoInput.files));
modalRoot.addEventListener("click", (event) => { if (event.target === modalRoot) closeModal(); });
document.addEventListener("keydown", (event) => {
  if (state.modalOpen) { if (event.key === "Escape") closeModal(); return; }
  if (["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
  if (event.key === "ArrowRight" || event.key === "PageDown") { event.preventDefault(); goTo(state.index === slides.length - 1 ? 0 : state.index + 1); }
  if (event.key === "ArrowLeft" || event.key === "PageUp") { event.preventDefault(); goTo(state.index - 1); }
  if (event.key.toLowerCase() === "f") document.querySelector("#fullscreen-btn").click();
  if (event.key === " ") { event.preventDefault(); if (slides[state.index].type === "exam") { state.revealed.has("exam") ? state.revealed.delete("exam") : state.revealed.add("exam"); render(); } else if (slides[state.index].type === "moore") { state.revealed.has("moore-details") ? state.revealed.delete("moore-details") : state.revealed.add("moore-details"); render(); } }
});

render();
