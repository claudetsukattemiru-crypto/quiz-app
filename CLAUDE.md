# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A general-knowledge quiz app (一般常識クイズ) built with plain HTML/CSS/JavaScript — no framework, no build step, no dependencies.

## Running

There is no build/dev/test tooling. Open [index.html](index.html) directly in a browser, or serve the directory with any static file server, e.g.:

```bash
npx http-server -p 8765
```

(Note: on this machine, the `python`/`python3` commands are Windows Store stub aliases that do not actually run Python — don't rely on `python -m http.server`.)

## Architecture

Exactly three files — by design, do not split `QUESTIONS` back out into a separate data file:

1. **[script.js](script.js)** — the `QUESTIONS` array (quiz content) plus all app logic, both in one file. Each question is `{ question, choices: string[], answer: number }`, where `answer` is the index into `choices` of the correct option. Logic operates directly on the DOM (no virtual DOM, no state library). Three screens (`#start-screen`, `#quiz-screen`, `#result-screen`) are toggled via a generic `.hidden` CSS class in `showScreen()`. Quiz progression is driven by module-level state (`currentIndex`, `score`, `answered`) rather than a state object — keep new features consistent with this pattern rather than introducing a separate state container.
2. **[index.html](index.html)** — markup/screen structure, loads script.js.
3. **[style.css](style.css)** — styling, including the `.choice-btn.correct` / `.choice-btn.incorrect` answer-highlight classes and `.feedback.correct` / `.feedback.incorrect` text-feedback classes applied by `selectChoice()` in script.js.

Flow: `startQuiz()` resets state and calls `renderQuestion()`, which rebuilds the `#choices` buttons for the current question and hides `#feedback`/`#next-btn`. `selectChoice()` locks in an answer (disables all choice buttons, applies correct/incorrect classes to the buttons, writes a 正解/不正解 message into `#feedback`, increments `score`) and reveals `#next-btn`. `nextQuestion()` advances `currentIndex` or calls `showResult()` once `QUESTIONS` is exhausted.
