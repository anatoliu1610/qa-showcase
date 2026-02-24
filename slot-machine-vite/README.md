# slot-machine-vite

Production-oriented Slot Machine prototype using **TypeScript + PixiJS + HTML5**.

## Current status
- Strict TypeScript project scaffold (Vite)
- Deterministic math core (`ResultGenerator`, `WinCalculator`)
- 21 classic paylines in config
- Reel wrap spin + staggered stopping
- Scatter effects (idle/impact/highlight/particle burst)
- Win presentation (sequential lines + all-lines mode + animated counter)
- Unit + integration tests

## Architecture (high level)
- `src/app` — App bootstrap and scene management
- `src/scenes` — Boot and Slot scenes
- `src/domain` — State machine and spin orchestration
- `src/math` — RNG abstraction, result generation, win calculation
- `src/rendering` — Reel view, line overlay, effects, tween manager
- `src/config` — Game configuration: paylines, strips, timing, paytable
- `src/tests` — Unit + integration tests

## Run
```bash
npm install
npm run dev
```

Open the Vite URL shown in terminal.

## Build
```bash
npm run build
npm run preview
```

## Quality checks
```bash
npm run typecheck
npm run lint
npm run test
```

## Notes
- RNG can be swapped between `CryptoRng` (prod) and `SeededRng` (tests/replays).
- Timing is config-driven via `gameConfig.timing`.
- Audio integration uses event hooks only (`window.dispatchEvent`).
