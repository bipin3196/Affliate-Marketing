export interface GameOption {
  id: string;
  name: string;
  genre: string;
  engine: string;
  baseCpuWeight: number; // how CPU bound (0 = pure GPU, 1 = heavy CPU)
  coverImage: string;
}

export const SUPPORTED_GAMES: GameOption[] = [
  {
    id: "cyberpunk-2077",
    name: "Cyberpunk 2077: Phantom Liberty",
    genre: "Open World RPG",
    engine: "REDengine 4",
    baseCpuWeight: 0.35,
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "gta-vi",
    name: "Grand Theft Auto VI (Target Estimates)",
    genre: "Open World Action",
    engine: "RAGE 9 Engine",
    baseCpuWeight: 0.45,
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "cs2",
    name: "Counter-Strike 2",
    genre: "Tactical FPS",
    engine: "Source 2",
    baseCpuWeight: 0.70,
    coverImage: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "valorant",
    name: "Valorant",
    genre: "Competitive Tactical FPS",
    engine: "Unreal Engine 4",
    baseCpuWeight: 0.80,
    coverImage: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "fortnite",
    name: "Fortnite (Unreal Engine 5)",
    genre: "Battle Royale",
    engine: "Unreal Engine 5.4",
    baseCpuWeight: 0.45,
    coverImage: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "apex-legends",
    name: "Apex Legends",
    genre: "Hero Battle Royale",
    engine: "Modified Source",
    baseCpuWeight: 0.40,
    coverImage: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "warzone",
    name: "Call of Duty: Warzone",
    genre: "Battle Royale",
    engine: "IW 9.0",
    baseCpuWeight: 0.50,
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "pubg",
    name: "PUBG: Battlegrounds",
    genre: "Battle Royale",
    engine: "Unreal Engine 4",
    baseCpuWeight: 0.55,
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80"
  }
];

// GPU relative performance points (normalized relative to RTX 4070 Super = 100)
export const GPU_POWER_INDEX: Record<string, number> = {
  "nvidia-geforce-rtx-4080-super": 145,
  "nvidia-geforce-rtx-4070-super": 100,
  "amd-radeon-rx-7800-xt": 92,
  "nvidia-geforce-rtx-4060": 58,
  "amd-radeon-rx-7900-xtx": 150,
};

// CPU relative single-thread & gaming cache index (normalized relative to Ryzen 7 7800X3D = 100)
export const CPU_POWER_INDEX: Record<string, number> = {
  "amd-ryzen-7-7800x3d": 100,
  "intel-core-i7-14700k": 92,
  "amd-ryzen-5-7600": 84,
  "amd-ryzen-5-5600": 68,
};

// Resolution scaling multipliers
export const RESOLUTION_MULTIPLIERS = {
  "1080p": 1.0,
  "1440p": 0.72,
  "4K": 0.44
};

// Quality Preset multipliers
export const PRESET_MULTIPLIERS = {
  "Low": 1.45,
  "Medium": 1.20,
  "High": 1.05,
  "Ultra": 1.00,
  "Ray Tracing": 0.65
};

// Base game baseline FPS at 1080p Ultra with RTX 4070 Super + Ryzen 7 7800X3D
export const GAME_BASELINES: Record<string, { avg: number; low: number }> = {
  "cyberpunk-2077": { avg: 145, low: 112 },
  "gta-vi": { avg: 110, low: 88 },
  "cs2": { avg: 510, low: 360 },
  "valorant": { avg: 620, low: 480 },
  "fortnite": { avg: 195, low: 148 },
  "apex-legends": { avg: 265, low: 205 },
  "warzone": { avg: 175, low: 132 },
  "pubg": { avg: 240, low: 175 },
};

export function estimateFps(
  cpuId: string,
  gpuId: string,
  gameId: string,
  resolution: "1080p" | "1440p" | "4K" = "1080p",
  preset: "Low" | "Medium" | "High" | "Ultra" | "Ray Tracing" = "Ultra"
): { avgFps: number; onePercentLow: number; bottleneck: string; playableRating: string } {
  const game = SUPPORTED_GAMES.find((g) => g.id === gameId) || SUPPORTED_GAMES[0];
  const baseline = GAME_BASELINES[game.id] || { avg: 120, low: 90 };

  const gpuIndex = GPU_POWER_INDEX[gpuId] || 100;
  const cpuIndex = CPU_POWER_INDEX[cpuId] || 90;

  // Compute composite score weighted by game CPU weight
  const cpuWeight = game.baseCpuWeight;
  const gpuWeight = 1 - cpuWeight;

  const resMult = RESOLUTION_MULTIPLIERS[resolution] || 1.0;
  const presetMult = PRESET_MULTIPLIERS[preset] || 1.0;

  // At 4K, GPU weight increases significantly
  let effectiveGpuWeight = gpuWeight;
  let effectiveCpuWeight = cpuWeight;
  if (resolution === "4K") {
    effectiveGpuWeight = Math.min(0.92, gpuWeight + 0.25);
    effectiveCpuWeight = 1 - effectiveGpuWeight;
  }

  const compositeRatio =
    (gpuIndex / 100) * effectiveGpuWeight + (cpuIndex / 100) * effectiveCpuWeight;

  const avgFps = Math.round(baseline.avg * compositeRatio * resMult * presetMult);
  const onePercentLow = Math.round(baseline.low * compositeRatio * resMult * presetMult * (cpuIndex / 100));

  let bottleneck = "Balanced System";
  if (gpuIndex > 130 && cpuIndex < 75) {
    bottleneck = "Moderate CPU Bottleneck";
  } else if (cpuIndex > 95 && gpuIndex < 70 && resolution !== "1080p") {
    bottleneck = "GPU Limited (Optimal for Visuals)";
  }

  let playableRating = "Super Smooth";
  if (avgFps >= 240) playableRating = "Competitive Esports Tier";
  else if (avgFps >= 120) playableRating = "Ultra Smooth (High Refresh)";
  else if (avgFps >= 60) playableRating = "Fluid AAA Experience";
  else playableRating = "Playable (Settings Reduction Recommended)";

  return {
    avgFps,
    onePercentLow,
    bottleneck,
    playableRating
  };
}
