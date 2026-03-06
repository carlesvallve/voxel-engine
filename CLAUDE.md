# Voxel Engine — Claude Context

## Project Overview

3D voxel dungeon crawler action-RPG. Three.js + React + Zustand + TypeScript + Vite.

All rendering is vertex-colored voxel meshes from MagicaVoxel (.vox) files — no textures. All audio is procedurally synthesized with Web Audio API — no audio files.

## Architecture

### Entry flow
`main.tsx` → `App.tsx` → `GameCanvas.tsx` → `Game.ts` (factory) → `GameLoop.ts` (frame tick)

### Key singleton: `GameContext`
`GameContext.ts` holds shared runtime state passed to all systems: scene, camera, input, environment, characters, enemies, combat, projectiles, loot, etc. Most systems receive `ctx: GameContext` rather than importing globals.

### State management
`store.ts` — large Zustand store with player params, enemy params, terrain settings, camera, post-processing, UI toggles, floor progression, overworld state. Settings auto-persist to localStorage.

## Key Systems & Files

| System | Entry point | Notes |
|--------|------------|-------|
| Game loop | `GameLoop.ts` | `tick()` called via rAF, delegates to all subsystems |
| Characters | `character/Character.ts` | Base class. `Enemy.ts` extends it. `VoxAnimator.ts` for frame anims |
| Combat | `character/CharacterCombat.ts` | HP, combos, knockback, hitstop. `combat/ProjectileSystem.ts` for ranged |
| AI | `behaviors/` | `ChaseBehavior`, `FleeBehavior`, `Roaming`, `PlayerControl` |
| Dungeon gen | `dungeon/DungeonGenerator.ts` | BSP layout. `VoxelDungeon.ts` for tile-based building |
| Terrain | `terrain/TerrainBuilder.ts` | Facade. `HeightmapBuilder.ts` for noise terrain |
| NavGrid | `pathfinding/NavGrid.ts` | Fine-grained walkability grid. `AStar.ts` for pathfinding |
| Environment | `environment/Environment.ts` | Facade for physics, collision, navigation |
| Colliders | `environment/EnvironmentContext.ts` | `addCollider()` unified API. Spatial hash for perf |
| Room vis | `dungeon/RoomVisibility.ts` | Flood-fill culling through doors |
| Rendering | `rendering/` | Camera, Sky, DayCycle, PostProcessing, RevealShader |
| Overworld | `overworld/OverworldMap.ts` | 3x3 tile world with POIs |
| Recipes | `recipes/` | Game mode definitions (classic, blitz, nightmare, story) |
| Potions | `combat/PotionEffectSystem.ts` | 8 types, duration-based effects |
| Loot | `combat/Loot.ts` | Coins, gems, potions, food drops |
| Props | `props/Chest.ts`, `Collectible.ts` | Interactive objects |
| UI | `ui/` | React: MenuScreen, CharacterSelect, HUD, DeathOverlay, settings panels |
| Audio | `utils/AudioSystem.ts` + `utils/sfx/` | All procedural synthesis |
| Vox loader | `utils/VoxModelLoader.ts` | Parses .vox, builds vertex-colored BufferGeometry |

## Critical Implementation Details

### Unified Collider System
- `ctx.addCollider(box, opts?)` — single call for movement + projectile collision
- No opts: auto-creates invisible proxy BoxGeometry for raycasts
- `{ mesh }`: uses provided mesh. `{ projectile: false }`: movement only
- `ctx.rebuildSpatialHash()` after all colliders registered
- InstancedMesh can't raycast — always use proxy boxes
- `DebrisSpatialHash` (4m cells) critical for 120fps with 200+ debris

### Foot IK
- Bottom voxel vertices (local Y < 0.12) conform to terrain slope
- Three.js Y-rotation transform: `(lx*cos + lz*sin, -lx*sin + lz*cos)` — NOT standard 2D
- Must use `mesh.position.y` as base, NOT `groundY`
- Step detection via nudge-sampling (3cm offsets) — skip IK on discontinuities
- Gated behind `footIKEnabled` player param

### Room Visibility
- Flood-fill from player room through open doors, stop at closed doors
- Rooms (rid >= 0), corridors (rid <= -2), unowned (-1)
- Meshes registered under room IDs. Walls use 8-neighbor adjacent room IDs
- `prevActiveKey` cache invalidated on `registerMesh()` for async loading

### Overworld
- 3x3 mini heightmaps, post-scaled via `rescaleHeights()` with sqrt compression
- Per-tile water level from height percentiles
- POI terrain flattening with smoothstep blend
- M key toggles overworld ↔ dungeon

### HMR Support
- Terrain/nav-grid cached between hot reloads
- Player position and camera angle preserved
- Character state restored for rapid iteration

## Common Commands

```bash
pnpm dev          # Dev server (Vite)
pnpm build        # Production build (tsc + vite)
npx tsc --noEmit  # Type check
```

## User Preferences

- Don't over-engineer — keep changes focused on what's requested
- Don't gate gameplay on UI state (settings panels should never freeze the game)
- Test with `npx tsc --noEmit` after changes
- Prefer editing existing files over creating new ones
- The user iterates fast and tests in-browser — keep the dev server running
