# Voxel Engine

A 3D voxel-based dungeon crawler action-RPG built with Three.js and React. Explore procedurally generated dungeons, fight enemies in real-time combat, collect loot, and descend deeper into increasingly dangerous floors.

## Gameplay

- **Dungeon crawling** through procedurally generated floors with rooms, corridors, doors, and stairs
- **Real-time melee combat** with a 3-hit combo system, knockback, and directional lunges
- **Ranged combat** with homing projectiles (arrows, fireballs) and auto-targeting
- **Loot system** with coins, gems, potions (8 types with unique effects), and food
- **Hunger mechanic** that decays over time, requiring food management
- **Progressive difficulty** across 12+ floors grouped into themed zones
- **Character selection** from 14+ hero archetypes (knight, mage, archer, barbarian, monk, paladin, etc.)
- **40+ enemy types** (rats, skeletons, dragons, hydras, beholders, etc.) with distinct AI behaviors
- **Overworld map** connecting multiple dungeon entrances across a 3x3 tile world

## Features

### Rendering
- Voxel meshes loaded from MagicaVoxel (.vox) format with vertex coloring (no textures)
- Procedural sky dome with sun, moon, and stars
- Day/night cycle with dynamic lighting transitions
- Post-processing stack: bloom, SSAO, vignette, color grading
- Particle systems: dust motes, rain, debris
- Shadow mapping with PCF soft shadows
- Screen shake, hit flash, slash trails, gore effects

### Terrain & Generation
- **BSP dungeon generator** with configurable room spacing, door probability, loop corridors, and height variation
- **Voxel tile dungeons** built from themed tile databases with wall classification and stair systems
- **Heightmap terrain** using Perlin noise with multiple styles (rolling, jagged, volcanic, island)
- **Overworld** with per-tile biomes, procedural naming, and POI markers
- **Nature generation** — trees, rocks, and shrubs placed procedurally
- Seeded RNG for deterministic, replayable layouts

### Combat & Characters
- Frame-based voxel animations (walk, idle, attack) with smooth transitions
- Combo system with escalating damage multipliers (1.0x, 1.25x, 1.5x)
- Hitstop mechanic for punchy hit feedback
- Enemy AI behaviors: chase, flee, roam, patrol, idle — with aggro memory
- Potion effects: healing, damage boost, speed, stun, poison, and more
- HP bars, floating damage numbers, death sequences with desaturation fade

### Environment Systems
- **Room visibility** — flood-fill culling through open doors with corridor line-of-sight
- **Pathfinding** — A* on a fine-grained NavGrid with step-height validation
- **Collision** — unified collider system with spatial hashing for 200+ debris at 120fps
- **Foot IK** — vertex deformation so character feet conform to terrain slopes
- **Doors & ladders** — interactive objects with open/close and climb mechanics

### Camera
- Orbit camera with mouse/touch drag, scroll zoom, pinch-to-zoom
- Collision detection against terrain and walls (no clipping)
- Snap-behind on movement input
- Smooth target tracking with configurable damping

### Audio
- Fully procedural — all SFX synthesized with Web Audio API (no audio files)
- 20+ sound effect types: slash, hit, arrow, fireball, potion drink, chest open, footsteps, death, etc.

### UI
- React overlay with menu, character select, HUD, death screen
- Settings panels for camera, lighting, post-FX, player/enemy params
- Potion hotbar, speech bubbles, debug visualization tools
- Text scramble effects for titles and dialogue

## Game Modes

| Recipe | Floors | Description |
|--------|--------|-------------|
| **Classic** | 12 | Standard dungeon crawl with 4 themed zones |
| **Blitz** | 6 | Short, fast-paced run |
| **Nightmare** | 12 | Scaled-up difficulty with aggressive enemies |
| **Story** | 12 | Campaign mode with narrative beats |

### Zone Progression (Classic)

1. **Upper Cellars** (1-3) — Rats, bats, imps. Low density, small dungeons.
2. **Haunted Halls** (4-6) — Skeletons, zombies, goblins. Medium density with height variation.
3. **Deep Warren** (7-9) — Werewolves, vampires, mimics. Large dungeons, loop corridors.
4. **Abyssal Depths** (10-12) — Dragons, hydras, beholders. Maximum density and scaling.

## Tech Stack

| Dependency | Version | Purpose |
|-----------|---------|---------|
| Three.js | 0.172 | 3D rendering |
| React | 19 | UI framework |
| Zustand | 5 | State management |
| TypeScript | 5.7 | Language |
| Vite | 6.3 | Build tool |

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Production build
pnpm build
```

## Controls

| Input | Action |
|-------|--------|
| WASD / Arrow keys | Move |
| Mouse click / Tap | Attack |
| Right-click | Move to position (A* pathfind) |
| Mouse drag / Touch drag | Rotate camera |
| Scroll / Pinch | Zoom |
| ESC | Pause |

## Project Structure

```
src/
├── game/
│   ├── Game.ts                  # Main game factory
│   ├── GameLoop.ts              # Frame update loop
│   ├── GameContext.ts            # Shared runtime context
│   ├── character/               # Character, Enemy, animations, combat, foot IK
│   ├── behaviors/               # AI: chase, flee, roam, patrol, player control
│   ├── combat/                  # Projectiles, loot, gore, potions, destruction
│   ├── dungeon/                 # BSP generator, voxel tiles, doors, ladders, rooms
│   ├── terrain/                 # Heightmap, noise, nature, water, color palettes
│   ├── environment/             # Collision, physics, navigation
│   ├── pathfinding/             # NavGrid, A*
│   ├── overworld/               # World map, tiles, POIs
│   ├── enemies/                 # Spawner, scaling, status effects
│   ├── props/                   # Chests, collectibles, speech bubbles
│   ├── recipes/                 # Game mode definitions (classic, blitz, etc.)
│   ├── rendering/               # Camera, sky, post-processing, day cycle
│   └── ui/                      # React components: HUD, menus, settings
├── utils/
│   ├── AudioSystem.ts           # Procedural audio engine
│   ├── VoxModelLoader.ts        # MagicaVoxel parser + mesh builder
│   ├── particles.ts             # Particle effect factories
│   └── sfx/                     # 20+ synthesized sound effects
└── store.ts                     # Zustand game state
```

## Assets

- **Characters & enemies**: [Square Dungeon Asset Pack](https://quaternius.com) (VOX format)
- **Buildings & nature**: [3D Voxel 100 Kingdom Assets](https://quaternius.com) (VOX format)
- All models are vertex-colored voxel meshes — no texture files required

## License

MIT
