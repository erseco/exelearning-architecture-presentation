<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/15Nl0aUpc0ImmJJLpPcp6q-XhjrkH-7FP

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Appearance

Use the sun/moon button beside slide navigation to switch between light and dark mode. Dark mode remains the default. The selection is saved locally when browser storage is available. The original slide order and layout are preserved.

## Definition corrections

Terminology follows the previously reviewed [eXeLearning source revision](https://github.com/exelearning/exelearning/tree/102d7d1cb3ae278a6025f1bf6c865713e622a37b):

- `public/app/yjs/AssetManager.js`: Cache API stores blobs, with IndexedDB fallback; `YjsDocumentManager.js` persists document state in IndexedDB.
- `src/websocket/yjs-websocket.ts`: only the relay avoids a resident Y.Doc per room. `yjs-persistence.ts` reconstructs documents for loading and compaction.
- `public/app/yjs/CollaborativeAutosaveManager.js`: autosave is conditional on Cloud collaboration, not enabled in every runtime.
- `src/db/dialect.ts`: Kysely builds typed SQL queries.
- `doc/development/embedding.md`: OPEN_FILE and REQUEST_SAVE are actual embedding commands.

These describe the reviewed development code; availability depends on the installed release.

## Product terminology

- **Online**: the browser version previously called static; it runs without an eXeLearning backend.
- **Cloud**: the collaborative version with server-side services and persistence.
- **Embedded**: the version integrated into platform plugins and the Electron desktop application. Slides use the Spanish label **embebida**.

Technical identifiers such as `build-static`, file paths and source class names are unchanged. These product names follow the project owner's terminology.

## Formats and integration overview

The current product scope supplied by the project owner excludes SCORM 2004 and includes a single-page web export alongside multi-page HTML5. This takes precedence over older source snapshots referenced above.

The integration slide keeps four cards: WordPress, Omeka S, Moodle (covering all three activity plugins) and Nextcloud. Nextcloud's viewer/editor description follows [nextcloud-exelearning](https://github.com/exelearning/nextcloud-exelearning/tree/99ed39c64b709e15f9e806ba6388359de4352270).

The Nextcloud icon uses the original geometry from the [official Nextcloud logo](https://github.com/nextcloud/server/blob/master/core/img/logo/logo.svg), with `currentColor` for both presentation themes. The icon is bundled locally.
