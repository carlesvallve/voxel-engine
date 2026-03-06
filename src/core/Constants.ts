// Display config — inlined from @sttg/game-base for standalone use.

interface DisplayConfig {
  DPR: number;
  PX: number;
  GAME: {
    WIDTH: number;
    HEIGHT: number;
    UI_BASE: number;
    MOBILE_SCALE: number;
    IS_PORTRAIT: boolean;
    IS_MOBILE: boolean;
    GRAVITY: number;
  };
}

function createDisplayConfig(): DisplayConfig {
  const maxDPR = 2;
  const gravity = 800;
  const DPR = Math.min(window.devicePixelRatio || 1, maxDPR);
  const isPortrait = window.innerHeight > window.innerWidth;
  const dw = isPortrait ? 540 : 960;
  const dh = isPortrait ? 960 : 540;
  const designAspect = dw / dh;
  const deviceW = window.innerWidth * DPR;
  const deviceH = window.innerHeight * DPR;
  const isMobile = (navigator.maxTouchPoints > 0) && (window.innerWidth <= 1024 || isPortrait);

  let canvasW: number;
  let canvasH: number;
  if (isMobile) {
    canvasW = deviceW;
    canvasH = deviceH;
  } else {
    if (deviceW / deviceH > designAspect) {
      canvasW = deviceW;
      canvasH = Math.round(deviceW / designAspect);
    } else {
      canvasW = Math.round(deviceH * designAspect);
      canvasH = deviceH;
    }
  }

  const PX = isMobile ? Math.min(canvasW / dw, canvasH / dh) : canvasW / dw;
  const mobileScale = isMobile ? 1.4 : 1;

  return {
    DPR,
    PX,
    GAME: {
      WIDTH: canvasW,
      HEIGHT: canvasH,
      UI_BASE: Math.min(canvasW, canvasH),
      MOBILE_SCALE: mobileScale,
      IS_PORTRAIT: isPortrait,
      IS_MOBILE: isMobile,
      GRAVITY: gravity * PX,
    },
  };
}

const { DPR, PX, GAME } = createDisplayConfig();

export { DPR, PX, GAME };

export const COLORS = {
  background: 0x1a1a2e,
  ground: 0x333344,
  accent: 0xe94560,
  ambient: 0xffffff,
  directional: 0xffffff,
};

export const CAMERA = {
  FOV: 60,
  NEAR: 0.1,
  FAR: 200,
  DISTANCE: 10,
  ANGLE_X: -25,
  ANGLE_Y: 35,
};

export const GAME_ID = 'voxel-engine';
