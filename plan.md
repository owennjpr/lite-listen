# Lite Listen — Notes

## Process Model

- **Main** — Node.js, full filesystem access, registers IPC handlers
- **Preload** — exposes a typed `window.api` surface to the renderer via `contextBridge`
- **Renderer** — React app, Web Audio API for playback, no Node access

## Audio

Web Audio API in the renderer. Files are never copied — the main process resolves absolute paths to `file://` URLs which the renderer loads directly. Streaming via `MediaElementSource` is preferred over full `decodeAudioData` for large lossless files.

## Directory Structure

### User's music folder (untouched)

The user points the app at any folder on their system. Structure is theirs — the app scans and infers artist/album from folder nesting.

```
~/Music/
  Burial/
    Untrue/
      01 Archangel.wav
```

### App data (`~/Library/Application Support/lite-listen/`)

Aliases and metadata only — no audio files ever stored here.

```
config.json              ← library root path, app settings
index/
  artists/
    burial.json          ← artist meta + list of album ids
  albums/
    untrue.json          ← album meta + ordered list of track ids
  tracks/
    a3f4b2.json          ← track meta, absolute path, duration
playlists/
  favorites.json         ← ordered list of track ids
  live-sets/
    2023.json            ← nested playlists via nested folders
```

## Missing Files

On scan, if a stored path no longer exists:

1. Search library root for same filename — relink automatically if found
2. If not found, mark track as missing in the index
3. User can manually relink via native file picker
