# Lesson 1 — Interactive Smart Board Teaching Website

This is a standalone, dependency-free teaching website for:

**Development of Information Technology and Social Transformation**

## Run locally

Because the project uses ES modules, open it through a small local server rather than double-clicking the HTML file.

### Option A — Python

From this folder:

```powershell
py -m http.server 4173
```

Then open:

`http://localhost:4173`

### Option B — Node.js

```powershell
npx serve .
```

## Teaching controls

- `Start lesson` opens the guided teaching flow.
- Click timeline stages to highlight and explain them.
- `Show example`, `Show before / after`, and `Reveal` controls support live explanation.
- `Teacher Mode` shows teacher prompts and hidden answer guidance.
- `Student Mode` hides teacher-only prompts.
- `Full screen` switches to a presentation-friendly view.
- Keyboard: `←` / `→` navigate, `Space` reveals the current teaching answer, `F` toggles full screen, `Esc` closes overlays.
- `Media gallery` opens the historical images and chart in a large lightbox.
- `Video library` accepts YouTube/video URLs as well as local video files, associates each item with a lesson section, and previews it in a large player without autoplay. Local video previews are browser-session only; persistent storage would require a backend or file hosting layer.
- `Key Facts + Concepts` exposes the official sidebar material as expandable cards.
- `Think and investigate` contains the official worked example, Try questions, Think as an Engineer task, New Context prompt, Exercise, and Lesson Question answer.

## Content fidelity

The educational content is based on the supplied Lesson 1 extraction and preserves the official stages, source-supported impacts, Key Concepts, worked reasoning, activities, and the exact exam-style question.

Use the `العربية` / `English` control in the top bar to switch the stage explanations, impacts, questions, social changes, and emerging technologies between English-first content and Arabic support based on the supplied Arabic lesson PDF.

## Visual sources

Historical and technical visuals are local copies of reusable Wikimedia Commons assets. Source links are listed in the media gallery and in `content.js`.
