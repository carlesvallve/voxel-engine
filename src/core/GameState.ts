// Minimal game state container — standalone version (not using @sttg/game-base).
// The voxel engine uses zustand (store.ts) for all state, but this is kept
// for compatibility with any code that imports it.

export class GameState {
  score = 0;
  highScore = 0;
  isGameOver = false;
  isPaused = false;

  reset(): void {
    this.score = 0;
    this.isGameOver = false;
    this.isPaused = false;
  }
}

export const gameState = new GameState();
