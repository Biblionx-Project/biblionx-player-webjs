# Biblionx Web Sign Player

Browser-side WebGL player for **Biblionx**, a UNICDA thesis project (Trabajo de Grado) that translates
written Spanish (Dominican Republic) into **Dominican Sign Language (LSRD, Lengua de Señas Dominicana)**.
The player loads a Unity WebGL 3D avatar, sends text to the Biblionx translation API, and animates the
resulting LSRD gloss sequence.

![Version](https://img.shields.io/badge/version-v1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-LGPLv3-blue.svg)

## Role in the Biblionx architecture

This repository is one of the Biblionx architecture reference components in the
[Biblionx-Project](https://github.com/Biblionx-Project) organization. The active product is
[`biblionx-lsrd-translator`](https://github.com/Biblionx-Project/biblionx-lsrd-translator).

```
text (Spanish) --> translation API --> LSRD gloss --> web sign player (this repo) --> 3D avatar
                                                        ^
                                       browser plugins / web widget embed the player
```

- Sends text to the translation endpoint and receives an LSRD gloss sequence.
- Points the avatar at the sign dictionary endpoint (per region) to download sign animations.
- Exposes a small event-driven JavaScript API used by the Biblionx browser plugins and web widget.

## Project structure

| Path | Purpose |
| --- | --- |
| `src/index.js` | Entry point; exposes `{ Player }` as `window.Biblionx` and as the module export |
| `src/Player.js` | `Player` class: loads the Unity target, translates text, controls playback, emits events |
| `src/GlosaTranslator.js` | HTTP client for the translation API (30 s timeout) |
| `src/PlayerManagerAdapter.js` | Bridge between JavaScript and the Unity `PlayerManager`, `EmotionBridge` and `CustomizationBridge` objects |
| `src/config.js` | Endpoint and region defaults (`DO` / `LSRD`) |
| `src/target/` | Prebuilt Unity WebGL build (`UnityLoader.js`, `playerweb.json`, `*.unityweb`) |
| `demo/index.html` | Minimal demo page |

## Requirements

- Node.js and npm (Webpack 5 toolchain)
- A browser with WebGL support
- A running Biblionx translation backend (defaults to `http://localhost:8000`)

## Install and build

```bash
npm install
npm run build
```

`npm run build` runs Webpack in production mode on `src/index.js` and writes to `build/`:

- `build/biblionx.js` — the player bundle
- `build/target/` — the Unity WebGL assets copied from `src/target/`

## Usage

Serve the repository (or your page plus `build/`) over HTTP, then:

```html
<div id="wrapper"></div>
<script>
  // Optional: override endpoints before loading the bundle
  window.BIBLIONX_BACKEND_URL = 'http://localhost:8000';
</script>
<script src="build/biblionx.js"></script>
<script>
  var player = new Biblionx.Player({
    targetPath: 'build/target' // where UnityLoader.js and playerweb.json live
  });

  player.on('load', function () {
    player.translate('Hola, ¿cómo estás?');
  });

  player.on('error', function (err) {
    console.error('Player error:', err); // 'unsupported' (no WebGL) or 'timeout_error'
  });

  player.load(document.getElementById('wrapper'));
</script>
```

### Player options

| Option | Default | Description |
| --- | --- | --- |
| `translator` | `config.translatorUrl` | Translation API endpoint |
| `targetPath` | `"target"` | Base path of the Unity WebGL target |
| `onLoad` | — | Called when the avatar is ready; if omitted, the player plays any pending gloss |
| `progress` | — | Constructor called as `new progress(wrapper)` to render a loading indicator |

### Methods

`load(wrapper)`, `translate(text, { isEnabledStats })`, `play(gloss)`, `continue()`, `repeat()`,
`pause()`, `stop()`, `setSpeed(speed)`, `setRegion(region)`, `changeAvatar(name)`,
`toggleSubtitle()`, `applyEmotion(action, intensity)`, `setPersonalization(url)`, `playWellcome()`.

### Events

`load`, `translate:start`, `translate:end`, `gloss:start`, `gloss:end`, `animation:play`,
`animation:pause`, `animation:end`, `animation:progress`, `response:glosa`, `GetAvatar`,
`start:welcome`, `stop:welcome`, `error`.

## Configuration

Endpoints are resolved in `src/config.js`. In the browser, set these as `window` globals before the
bundle loads; `process.env` values with the same names are used only where a `process` object exists.

| Variable | Default |
| --- | --- |
| `BIBLIONX_BACKEND_URL` (alias `BIBLIONX_API_URL` on `window`) | `http://localhost:8000` |
| `BIBLIONX_TRANSLATOR_URL` | `<backend>/api/v1/translate` |
| `BIBLIONX_DICTIONARY_URL` | `<backend>/dictionary/` |
| `BIBLIONX_DICTIONARY_STATIC_URL` | `<backend>/static/BUNDLES/` |

The default region is `DO` and the sign language is `LSRD`. Sign animations are loaded from
`<dictionary URL><region>/`; `translate(text, { isEnabledStats: false })` switches to the static
dictionary URL.

### Translation API contract

The player sends `POST <translator>` with JSON `{ text, texto, domain }` (`domain` is the page host)
and accepts any of these responses:

1. `nlp_analysis.secuencia_lsrd` — array of glosses, joined with spaces
2. `secuencia_senas` — array of objects; `palabra_es` or `letra` is used for each sign
3. a plain-text body used as the gloss

If the request fails, the input text is played in upper case (fingerspelling fallback).

## Origins

This project was initially forked from the open-source VLibras project. It has since evolved
enough to stand as an independent project of its own. Licensed under LGPLv3 — see [LICENSE](LICENSE).
