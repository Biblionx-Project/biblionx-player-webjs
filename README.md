# Biblionx WebGL Sign Language Player

WebGL 3D Avatar Sign Language Player component for Biblionx, delivering 3D animated signs in Dominican Sign Language (LSRD - Lengua de Señas de la República Dominicana).

*Adapted from the [VLibras](https://www.vlibras.gov.br/) Web (Plugins and Widget) Player component for the Biblionx ecosystem.*

![Version](https://img.shields.io/badge/version-v1.1.0-blue.svg)
![License](https://img.shields.io/badge/license-LGPLv3-blue.svg)
![Biblionx](https://img.shields.io/badge/biblionx%20suite-2026-green.svg)

> **Note — Biblionx-Project:** this repository provides the WebGL sign language player runtime for the Biblionx ecosystem (Dominican Sign Language, LSRD, text translator). It renders 3D avatar animations, connects to the translation endpoints, and coordinates playback with browser extensions and web widgets. The core Dominican Sign Language translator service is located in [`biblionx-lsrd-translator`](https://github.com/Biblionx-Project/biblionx-lsrd-translator). See the [Biblionx-Project](https://github.com/Biblionx-Project) organization.

## Installation & Build

To install dependencies:
```bash
npm install
```

To compile and build the package:
```bash
npm run build
```

This compiles `src/index.js` via Webpack and outputs the bundles `build/vlibras.js` and `build/biblionx.js` along with Unity WebGL target assets in `build/target/`.

## Configuration

Player endpoints and regional defaults can be configured via environment variables or global `window` properties:
- `BIBLIONX_BACKEND_URL`: Base backend URL (default: `http://localhost:8000`)
- `BIBLIONX_TRANSLATOR_URL`: Translation API endpoint (default: `http://localhost:8000/api/v1/translate`)
- `BIBLIONX_DICTIONARY_URL`: Dictionary assets endpoint (default: `http://localhost:8000/dictionary/`)
- Default Region: `DO` (Dominican Republic) / `LSRD` (Dominican Sign Language)

## Contributors & Attribution

Originally developed by the VLibras team (Laboratório de Aplicações de Vídeo Digital - LAVID / UFPB). Adapted, modernized, and maintained as an architectural reference for Dominican Sign Language (LSRD) avatar rendering by the Biblionx team (UNICDA thesis project).

## License

This project is licensed under the LGPLv3 License - see the [LICENSE](LICENSE) file for details. Derived from the open-source VLibras project, maintaining full compliance with the GNU Lesser General Public License v3.0.
