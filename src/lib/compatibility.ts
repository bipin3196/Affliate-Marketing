import { CompatibilityIssue, CompatibilityReport, PCPartType, Product } from "@/types";

export interface PartSlotCompatibilityEvaluation {
  isCompatible: boolean;
  status: 'optimal' | 'compatible' | 'warning' | 'incompatible';
  badgeText: string;
  reason: string;
  recommendationScore: number;
}

export function evaluatePartCompatibility(
  candidate: Product,
  slot: PCPartType,
  currentParts: Partial<Record<PCPartType, Product>>
): PartSlotCompatibilityEvaluation {
  const cpu = currentParts.cpu;
  const motherboard = currentParts.motherboard;
  const gpu = currentParts.gpu;
  const ram = currentParts.ram;
  const psu = currentParts.psu;
  const pcCase = currentParts.case;
  const cooler = currentParts.cooler;

  // 1. Motherboard evaluation against selected CPU
  if (slot === 'motherboard') {
    const mbSocket = candidate.componentSpecs?.socket;
    if (cpu && mbSocket) {
      const cpuSocket = cpu.componentSpecs?.socket;
      if (cpuSocket && mbSocket !== cpuSocket) {
        return {
          isCompatible: false,
          status: 'incompatible',
          badgeText: `Incompatible Socket (${mbSocket})`,
          reason: `Requires Socket ${cpuSocket} for ${cpu.name}. This board has ${mbSocket}.`,
          recommendationScore: 0,
        };
      }
      return {
        isCompatible: true,
        status: 'optimal',
        badgeText: `100% Compatible (Socket ${mbSocket})`,
        reason: `Matches your ${cpu.name} processor on socket ${mbSocket}.`,
        recommendationScore: 100,
      };
    }
  }

  // 2. RAM evaluation against Motherboard (or CPU)
  if (slot === 'ram') {
    const ramType = candidate.componentSpecs?.memoryType; // DDR5 or DDR4
    if (motherboard && ramType) {
      const mbMemoryType = motherboard.componentSpecs?.memoryType;
      if (mbMemoryType && ramType !== mbMemoryType) {
        return {
          isCompatible: false,
          status: 'incompatible',
          badgeText: `Mismatched Type (${ramType})`,
          reason: `Your selected motherboard (${motherboard.name}) requires ${mbMemoryType}.`,
          recommendationScore: 0,
        };
      }
      return {
        isCompatible: true,
        status: 'optimal',
        badgeText: `100% Compatible (${ramType})`,
        reason: `Matches ${motherboard.name} memory slots.`,
        recommendationScore: 100,
      };
    }
    // If only CPU is selected (e.g. Ryzen 7000/9000 strictly requires DDR5)
    if (cpu && cpu.componentSpecs?.socket === 'AM5' && ramType === 'DDR4') {
      return {
        isCompatible: false,
        status: 'incompatible',
        badgeText: `AM5 Requires DDR5`,
        reason: `AMD AM5 processors do not support DDR4 memory.`,
        recommendationScore: 0,
      };
    }
  }

  // 3. PSU evaluation against GPU and CPU power demand
  if (slot === 'psu') {
    const psuWattage = candidate.componentSpecs?.wattage || 0;
    let estimatedSystemWattage = 70;
    if (cpu?.componentSpecs?.tdp) estimatedSystemWattage += cpu.componentSpecs.tdp;
    if (gpu?.componentSpecs?.tdp) estimatedSystemWattage += gpu.componentSpecs.tdp;
    const recommendedWattage = Math.ceil((estimatedSystemWattage * 1.3) / 50) * 50;

    if (psuWattage > 0) {
      if (psuWattage < estimatedSystemWattage) {
        return {
          isCompatible: false,
          status: 'incompatible',
          badgeText: `Insufficient (${psuWattage}W)`,
          reason: `System estimated draw is ~${estimatedSystemWattage}W. Need at least ${recommendedWattage}W.`,
          recommendationScore: 10,
        };
      }
      if (psuWattage < recommendedWattage) {
        return {
          isCompatible: true,
          status: 'warning',
          badgeText: `Tight Headroom (${psuWattage}W)`,
          reason: `Meets minimum draw, but recommended is ${recommendedWattage}W+ for GPU power spikes.`,
          recommendationScore: 50,
        };
      }
      return {
        isCompatible: true,
        status: 'optimal',
        badgeText: `Optimal Power (${psuWattage}W 80+ Gold)`,
        reason: `Provides comfortable power headroom for your CPU and GPU.`,
        recommendationScore: 100,
      };
    }
  }

  // 4. Case evaluation against GPU length
  if (slot === 'case') {
    const maxGpuLength = candidate.componentSpecs?.maxGpuLengthMM;
    const gpuLength = gpu?.componentSpecs?.gpuLengthMM;
    if (maxGpuLength && gpuLength && gpuLength > maxGpuLength) {
      return {
        isCompatible: false,
        status: 'incompatible',
        badgeText: `GPU Too Long`,
        reason: `Your GPU (${gpuLength}mm) exceeds this case clearance (${maxGpuLength}mm).`,
        recommendationScore: 0,
      };
    }
    return {
      isCompatible: true,
      status: 'optimal',
      badgeText: `Fits GPU & Cooling`,
      reason: `Supports GPU lengths up to ${maxGpuLength || 400}mm.`,
      recommendationScore: 90,
    };
  }

  // 5. Cooler evaluation against CPU socket and Case
  if (slot === 'cooler') {
    const supportedSockets = candidate.componentSpecs?.supportedSockets;
    const cpuSocket = cpu?.componentSpecs?.socket;
    if (cpuSocket && supportedSockets && !supportedSockets.includes(cpuSocket)) {
      return {
        isCompatible: false,
        status: 'incompatible',
        badgeText: `Incompatible Socket`,
        reason: `Does not support CPU socket ${cpuSocket}.`,
        recommendationScore: 0,
      };
    }
    const coolerHeight = candidate.componentSpecs?.coolerHeightMM;
    const maxCoolerHeight = pcCase?.componentSpecs?.maxCoolerHeightMM;
    if (coolerHeight && maxCoolerHeight && coolerHeight > maxCoolerHeight) {
      return {
        isCompatible: false,
        status: 'incompatible',
        badgeText: `Cooler Too Tall`,
        reason: `Height (${coolerHeight}mm) exceeds case clearance (${maxCoolerHeight}mm).`,
        recommendationScore: 0,
      };
    }
    return {
      isCompatible: true,
      status: 'optimal',
      badgeText: `100% Compatible`,
      reason: `Fits CPU socket ${cpuSocket || 'AM5/LGA'} and chassis clearance.`,
      recommendationScore: 95,
    };
  }

  return {
    isCompatible: true,
    status: 'compatible',
    badgeText: 'Compatible',
    reason: 'Fully compatible standard component.',
    recommendationScore: 80,
  };
}

export function checkBuildCompatibility(parts: Partial<Record<PCPartType, Product>>): CompatibilityReport {
  const issues: CompatibilityIssue[] = [];

  const cpu = parts.cpu;
  const motherboard = parts.motherboard;
  const gpu = parts.gpu;
  const ram = parts.ram;
  const storage = parts.storage;
  const psu = parts.psu;
  const pcCase = parts.case;
  const cooler = parts.cooler;

  // 1. Socket Compatibility Check
  if (cpu && motherboard) {
    const cpuSocket = cpu.componentSpecs?.socket;
    const mbSocket = motherboard.componentSpecs?.socket;

    if (cpuSocket && mbSocket && cpuSocket !== mbSocket) {
      issues.push({
        severity: 'error',
        title: 'Socket Incompatibility',
        message: `CPU (${cpu.name}) uses socket ${cpuSocket}, which is incompatible with motherboard (${motherboard.name}) socket ${mbSocket}. These parts cannot be physically installed together.`,
        affectedParts: ['cpu', 'motherboard'],
      });
    }

    // BIOS validation warning
    if (motherboard.componentSpecs?.biosUpdateNeededForRyzen5000 && cpuSocket === 'AM4') {
      issues.push({
        severity: 'warning',
        title: '⚠️ BIOS Update May Be Required',
        message: `Motherboard (${motherboard.name}) may need a BIOS update prior to booting with ${cpu.name}. Look for a BIOS flashback button or ask retailer for pre-flashed BIOS.`,
        affectedParts: ['cpu', 'motherboard'],
      });
    }
  }

  // 2. RAM & Motherboard Compatibility Check
  if (ram && motherboard) {
    const ramType = ram.componentSpecs?.memoryType;
    const mbMemoryType = motherboard.componentSpecs?.memoryType;

    if (ramType && mbMemoryType && ramType !== mbMemoryType) {
      issues.push({
        severity: 'error',
        title: 'Memory Type Mismatch',
        message: `RAM (${ram.name}) is ${ramType}, but motherboard (${motherboard.name}) requires ${mbMemoryType}. DDR4 and DDR5 memory modules have different physical pin layouts.`,
        affectedParts: ['ram', 'motherboard'],
      });
    }
  }

  // 3. Power Estimation and PSU Validation
  let totalEstimatedWattage = 70; // baseline for fans, motherboard chipset, storage, rgb
  if (cpu?.componentSpecs?.tdp) totalEstimatedWattage += cpu.componentSpecs.tdp;
  if (gpu?.componentSpecs?.tdp) totalEstimatedWattage += gpu.componentSpecs.tdp;
  if (cooler?.componentSpecs?.coolerType?.includes('AIO')) totalEstimatedWattage += 25;
  if (ram) totalEstimatedWattage += 15;
  if (storage) totalEstimatedWattage += 10;

  // Recommended PSU Wattage with safety overhead (at least 25% overhead for transient spikes)
  const recommendedPsuWattage = Math.ceil((totalEstimatedWattage * 1.3) / 50) * 50;

  if (psu) {
    const psuWattage = psu.componentSpecs?.wattage || 0;
    if (psuWattage > 0) {
      if (psuWattage < totalEstimatedWattage) {
        issues.push({
          severity: 'error',
          title: '⚠️ Insufficient PSU Wattage',
          message: `The selected power supply (${psuWattage}W) is lower than the total system estimated draw (~${totalEstimatedWattage}W). System may shut down or fail under load.`,
          affectedParts: ['psu', 'gpu', 'cpu'],
        });
      } else if (psuWattage < recommendedPsuWattage) {
        issues.push({
          severity: 'warning',
          title: 'Tight Power Headroom',
          message: `The selected PSU is ${psuWattage}W, but recommended PSU is at least ${recommendedPsuWattage}W to comfortably absorb high-power transient spikes from modern GPUs.`,
          affectedParts: ['psu'],
        });
      }
    }
  }

  // 4. Physical Dimensions: Case vs GPU Length
  if (pcCase && gpu) {
    const maxGpuLength = pcCase.componentSpecs?.maxGpuLengthMM;
    const gpuLength = gpu.componentSpecs?.gpuLengthMM;

    if (maxGpuLength && gpuLength && gpuLength > maxGpuLength) {
      issues.push({
        severity: 'error',
        title: 'GPU Exceeds Case Clearance',
        message: `GPU length (${gpuLength}mm) exceeds case's maximum GPU clearance (${maxGpuLength}mm). It will physically not fit into ${pcCase.name}.`,
        affectedParts: ['gpu', 'case'],
      });
    }
  }

  // 5. Physical Dimensions: Case vs CPU Cooler Height
  if (pcCase && cooler) {
    const maxCoolerHeight = pcCase.componentSpecs?.maxCoolerHeightMM;
    const coolerHeight = cooler.componentSpecs?.coolerHeightMM;

    if (maxCoolerHeight && coolerHeight && coolerHeight > maxCoolerHeight) {
      issues.push({
        severity: 'error',
        title: 'CPU Cooler Too Tall For Case',
        message: `Cooler height (${coolerHeight}mm) exceeds case side panel clearance (${maxCoolerHeight}mm). Side glass/metal panel will not close.`,
        affectedParts: ['cooler', 'case'],
      });
    }
  }

  // 6. Cooler Socket Support
  if (cooler && cpu) {
    const cpuSocket = cpu.componentSpecs?.socket;
    const supportedSockets = cooler.componentSpecs?.supportedSockets;

    if (cpuSocket && supportedSockets && !supportedSockets.includes(cpuSocket)) {
      issues.push({
        severity: 'error',
        title: 'Cooler Socket Incompatibility',
        message: `Cooler (${cooler.name}) does not support CPU socket ${cpuSocket}. Dedicated bracket or alternative cooler needed.`,
        affectedParts: ['cooler', 'cpu'],
      });
    }
  }

  // 7. Bottleneck Detection
  if (cpu && gpu) {
    const cpuPrice = cpu.basePriceINR;
    const gpuPrice = gpu.basePriceINR;

    // Heavy GPU pairing with entry CPU
    if (gpuPrice > 80000 && cpuPrice < 16000) {
      issues.push({
        severity: 'warning',
        title: '⚠️ CPU Bottleneck Detected',
        message: `Pairing a high-end graphics card (${gpu.name}) with an entry-level processor (${cpu.name}) may cause CPU bottlenecking in high-framerate 1080p and 1440p gaming.`,
        affectedParts: ['cpu', 'gpu'],
      });
    }
  }

  const hasErrors = issues.some((i) => i.severity === 'error');

  return {
    isCompatible: !hasErrors,
    totalEstimatedWattage,
    recommendedPsuWattage: Math.max(recommendedPsuWattage, 500),
    issues,
  };
}
