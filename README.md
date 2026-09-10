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
- `public/app/yjs/CollaborativeAutosaveManager.js`: autosave is conditional on online collaboration, not enabled in every runtime.
- `src/db/dialect.ts`: Kysely builds typed SQL queries.
- `doc/development/embedding.md`: OPEN_FILE and REQUEST_SAVE are actual embedding commands.

These describe the reviewed development code; availability depends on the installed release.
