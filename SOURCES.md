# Evidence and editorial scope

Reviewed on 2026-09-10. This presentation describes the following source revisions, rather than assuming that `main` matches a published release.

| Repository                         | Reviewed commit                            |
| ---------------------------------- | ------------------------------------------ |
| exelearning/exelearning            | `102d7d1cb3ae278a6025f1bf6c865713e622a37b` |
| exelearning/mod_exeweb             | `2c386fb8685f502c44ce22d127f70e7143e4359c` |
| exelearning/mod_exescorm           | `8ef47fa4b75a533585b08ca8d7d463031f70e7a3` |
| exelearning/moodle-mod_exelearning | `3b6a7cd45ca9b762189d5e7ebc8f953c4d939023` |
| exelearning/wp-exelearning         | `a770a75a22cbb7096b4a9e64f7864c1e9bdb5a25` |
| exelearning/omeka-s-exelearning    | `8361c3a3876e57095fbaea321386c62af9a3c8c8` |
| exelearning/nextcloud-exelearning  | `99ed39c64b709e15f9e806ba6388359de4352270` |

Clickable links to these snapshots appear on the relevant slides and in `content.ts`.

## Architectural distinctions

- `src/websocket/yjs-websocket.ts` implements a relay without a resident Y.Doc per room. This does not make the entire server stateless: `src/websocket/yjs-persistence.ts` reconstructs Y.Doc instances when loading or compacting snapshots and updates.
- `public/app/yjs/YjsDocumentManager.js` stores the document in IndexedDB. `public/app/yjs/AssetManager.js` uses memory and Cache API for blobs, with IndexedDB as a fallback. Local browser storage is not a substitute for saving the project to a file or platform.
- `public/app/yjs/CollaborativeAutosaveManager.js` enables autosave for genuine online collaborative sessions after another participant has been present. It does not enable autosave for all online or static sessions.
- `public/app/yjs/AssetWebSocketHandler.js` coordinates asset availability and upload requests over WebSocket, with separate HTTP transfers. The presentation avoids implying a WebRTC connection between browsers.
- `src/db/dialect.ts` uses Kysely as a typed SQL query builder, supporting SQLite, PostgreSQL and MySQL.
- `app/main.js` serves the packaged static editor through Electron's custom protocol and integrates native file operations through IPC.
- `doc/development/embedding.md` defines two readiness stages and the OPEN_FILE / REQUEST_SAVE / SAVE_FILE exchange. Hosts must wait for document readiness before requesting a save.
- Moodle `mod_exeweb` and `mod_exescorm` both provide editing, with remote-online and integrated-editor options. `moodle-mod_exelearning/classes/grades/grade_item_manager.php` distinguishes overall and per-item grading.
- WordPress and Omeka S extract and manage packages on the server. The Nextcloud viewer extracts packages in the browser and uses a scoped Service Worker; its host integration uses PHP and a Vue/TypeScript frontend.

## Presentation choices

The ten-slide sequence covers the editor, technology responsibilities, data, collaboration, execution, embedding, Moodle, other platforms and publication. It replaces repeated feature grids with scoped diagrams and comparisons. It removes unsupported latency/performance claims, stale example routes and the implication that synchronization alone guarantees a saved project.

General feature lists such as authentication providers, administration and editing utilities are omitted from the main narrative to keep it focused on architecture. They can be documented separately when needed, against the target release.
