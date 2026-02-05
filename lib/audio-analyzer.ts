// Client-side audio analysis using Web Audio API
// Extracts real audio features: BPM, energy, spectral characteristics
// Robust implementation with comprehensive error handling and fallbacks

export interface AudioFeatures {
  bpm: number
  energy: number // 0-1 scale
  brightness: number // 0-1 scale (high frequency content)
  bassWeight: number // 0-1 scale (low frequency dominance)
  midWeight: number // 0-1 scale (mid frequency presence)
  dynamicRange: number // 0-1 scale
  rhythmicComplexity: number // 0-1 scale
  percussiveness: number // 0-1 scale (transient density)
  harmonicContent: number // 0-1 scale (tonal vs noise)
  // Emotional characteristics
  emotional: EmotionalProfile
}

export interface EmotionalProfile {
  valence: number // -1 (negative/sad) to 1 (positive/happy)
  arousal: number // 0 (calm) to 1 (energetic/excited)
  tension: number // 0 (relaxed) to 1 (tense/anxious)
  mode: 'major' | 'minor' | 'ambiguous' // Musical mode detection
  dominantEmotion: string // Primary emotional character
  emotionalArc: 'building' | 'sustained' | 'releasing' | 'dynamic' // How emotion evolves
  intensity: number // 0-1 overall emotional intensity
}

// Default emotional profile
const DEFAULT_EMOTIONAL: EmotionalProfile = {
  valence: 0,
  arousal: 0.5,
  tension: 0.3,
  mode: 'ambiguous',
  dominantEmotion: 'Neutral',
  emotionalArc: 'sustained',
  intensity: 0.5,
}

// Default features to use as fallback if analysis fails
const DEFAULT_FEATURES: AudioFeatures = {
  bpm: 120,
  energy: 0.5,
  brightness: 0.5,
  bassWeight: 0.5,
  midWeight: 0.5,
  dynamicRange: 0.5,
  rhythmicComplexity: 0.5,
  percussiveness: 0.5,
  harmonicContent: 0.5,
  emotional: DEFAULT_EMOTIONAL,
}

export async function analyzeAudio(file: File): Promise<AudioFeatures> {
  let audioContext: AudioContext | null = null
  
  try {
    // Validate file
    if (!file || file.size === 0) {
      throw new Error("Invalid or empty audio file")
    }
    
    // Check file type
    const validTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/webm"]
    const isValidType = validTypes.includes(file.type) || file.name.toLowerCase().endsWith(".mp3")
    if (!isValidType) {
      throw new Error("Unsupported audio format. Please upload an MP3 file.")
    }
    
    // Create audio context with fallback for different browsers
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioContextClass) {
      throw new Error("Web Audio API not supported in this browser")
    }
    
    audioContext = new AudioContextClass()
    
    // Read file with timeout
    const arrayBuffer = await Promise.race([
      file.arrayBuffer(),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error("File read timeout")), 30000)
      )
    ])
    
    // Decode audio with timeout
    const audioBuffer = await Promise.race([
      audioContext.decodeAudioData(arrayBuffer),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error("Audio decode timeout")), 30000)
      )
    ])
    
    // Validate decoded audio
    if (!audioBuffer || audioBuffer.length === 0) {
      throw new Error("Failed to decode audio data")
    }
    
    const channelData = audioBuffer.getChannelData(0)
    const sampleRate = audioBuffer.sampleRate
    
    // Validate channel data
    if (!channelData || channelData.length === 0) {
      throw new Error("No audio channel data available")
    }
    
    // Extract features with individual error handling
    const bpm = safeExecute(() => detectBPM(channelData, sampleRate), DEFAULT_FEATURES.bpm)
    const energy = safeExecute(() => calculateEnergy(channelData), DEFAULT_FEATURES.energy)
    const spectrum = safeExecute(
      () => analyzeSpectrum(channelData, sampleRate), 
      { brightness: DEFAULT_FEATURES.brightness, bassWeight: DEFAULT_FEATURES.bassWeight, midWeight: DEFAULT_FEATURES.midWeight }
    )
    const dynamicRange = safeExecute(() => calculateDynamicRange(channelData), DEFAULT_FEATURES.dynamicRange)
    const rhythmicComplexity = safeExecute(() => analyzeRhythmicComplexity(channelData, sampleRate), DEFAULT_FEATURES.rhythmicComplexity)
    const percussiveness = safeExecute(() => analyzePercussiveness(channelData, sampleRate), DEFAULT_FEATURES.percussiveness)
    const harmonicContent = safeExecute(() => analyzeHarmonicContent(channelData, sampleRate), DEFAULT_FEATURES.harmonicContent)
    
    // Analyze emotional characteristics
    const emotional = safeExecute(
      () => analyzeEmotionalProfile(channelData, sampleRate, bpm, energy, spectrum.brightness, dynamicRange, harmonicContent),
      DEFAULT_EMOTIONAL
    )
    
    return { 
      bpm, 
      energy, 
      brightness: spectrum.brightness, 
      bassWeight: spectrum.bassWeight, 
      midWeight: spectrum.midWeight, 
      dynamicRange, 
      rhythmicComplexity, 
      percussiveness, 
      harmonicContent,
      emotional
    }
  } catch (error) {
    console.error("Audio analysis error:", error)
    // Return default features so the app can still function
    return DEFAULT_FEATURES
  } finally {
    // Always close the audio context to free resources
    if (audioContext) {
      try {
        await audioContext.close()
      } catch {
        // Ignore close errors
      }
    }
  }
}

// Safe execution wrapper that catches errors and returns fallback
function safeExecute<T>(fn: () => T, fallback: T): T {
  try {
    const result = fn()
    // Check for NaN or invalid values
    if (typeof result === 'number' && (Number.isNaN(result) || !Number.isFinite(result))) {
      return fallback
    }
    return result
  } catch {
    return fallback
  }
}

function detectBPM(channelData: Float32Array, sampleRate: number): number {
  // Validate inputs
  if (!channelData || channelData.length === 0 || sampleRate <= 0) {
    return 120 // Default BPM
  }
  
  // Ensure we have enough data (at least 3 seconds)
  if (channelData.length < sampleRate * 3) {
    return 120 // Default for very short clips
  }
  
  // Use multiple BPM detection methods and take consensus
  const bpmCandidates: number[] = []
  
  // Method 1: Onset/Energy envelope peak detection
  const bpm1 = detectBPMByEnvelope(channelData, sampleRate)
  if (bpm1 > 0) bpmCandidates.push(bpm1)
  
  // Method 2: Autocorrelation-based detection
  const bpm2 = detectBPMByAutocorrelation(channelData, sampleRate)
  if (bpm2 > 0) bpmCandidates.push(bpm2)
  
  // Method 3: Spectral flux onset detection
  const bpm3 = detectBPMBySpectralFlux(channelData, sampleRate)
  if (bpm3 > 0) bpmCandidates.push(bpm3)
  
  // Method 4: Low-frequency energy analysis (for bass-heavy music)
  const bpm4 = detectBPMByBassEnergy(channelData, sampleRate)
  if (bpm4 > 0) bpmCandidates.push(bpm4)
  
  if (bpmCandidates.length === 0) return 120
  
  // Find consensus BPM using clustering
  const consensusBPM = findBPMConsensus(bpmCandidates)
  
  // Validate and normalize
  let finalBPM = consensusBPM
  while (finalBPM < 60) finalBPM *= 2
  while (finalBPM > 200) finalBPM /= 2
  
  if (Number.isNaN(finalBPM) || !Number.isFinite(finalBPM)) {
    return 120
  }
  
  return Math.round(finalBPM)
}

// Method 1: Energy envelope peak detection with improved filtering
function detectBPMByEnvelope(channelData: Float32Array, sampleRate: number): number {
  const windowSize = Math.floor(sampleRate * 0.02) // 20ms windows
  const hopSize = Math.floor(sampleRate * 0.01) // 10ms hop
  
  // Calculate energy envelope
  const envelope: number[] = []
  const maxFrames = Math.min(Math.floor((channelData.length - windowSize) / hopSize), 15000)
  
  for (let i = 0; i < maxFrames; i++) {
    const startIdx = i * hopSize
    let energy = 0
    for (let j = 0; j < windowSize && startIdx + j < channelData.length; j++) {
      energy += channelData[startIdx + j] * channelData[startIdx + j]
    }
    envelope.push(Math.sqrt(energy / windowSize))
  }
  
  if (envelope.length < 100) return 0
  
  // Apply simple smoothing to reduce noise
  const smoothed = smoothArray(envelope, 3)
  
  // Compute first derivative (onset strength)
  const diff: number[] = []
  for (let i = 1; i < smoothed.length; i++) {
    diff.push(Math.max(0, smoothed[i] - smoothed[i - 1]))
  }
  
  // Find peaks in onset strength
  const peaks = findPeaksAdaptive(diff, 0.2)
  
  if (peaks.length < 4) return 0
  
  // Calculate intervals and find most common
  const intervals: number[] = []
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1])
  }
  
  // Find the dominant interval using histogram
  const dominantInterval = findDominantInterval(intervals)
  if (dominantInterval <= 0) return 0
  
  const secondsPerBeat = (dominantInterval * hopSize) / sampleRate
  return secondsPerBeat > 0 ? 60 / secondsPerBeat : 0
}

// Method 2: Autocorrelation-based BPM detection
function detectBPMByAutocorrelation(channelData: Float32Array, sampleRate: number): number {
  // Downsample for efficiency
  const downsampleFactor = Math.max(1, Math.floor(sampleRate / 4000))
  const downsampled: number[] = []
  
  for (let i = 0; i < channelData.length; i += downsampleFactor) {
    downsampled.push(Math.abs(channelData[i]))
  }
  
  const newSampleRate = sampleRate / downsampleFactor
  
  // Compute autocorrelation for lag range corresponding to 60-200 BPM
  const minLag = Math.floor(newSampleRate * 60 / 200) // 200 BPM
  const maxLag = Math.floor(newSampleRate * 60 / 60)  // 60 BPM
  
  if (maxLag >= downsampled.length / 2) return 0
  
  const correlations: number[] = []
  const sampleSize = Math.min(downsampled.length, newSampleRate * 10) // Analyze up to 10 seconds
  
  for (let lag = minLag; lag <= maxLag; lag++) {
    let correlation = 0
    const compareLength = Math.min(sampleSize - lag, 5000)
    
    for (let i = 0; i < compareLength; i++) {
      correlation += downsampled[i] * downsampled[i + lag]
    }
    correlations.push(correlation / compareLength)
  }
  
  // Find peaks in autocorrelation
  let maxCorr = 0
  let bestLag = minLag
  
  for (let i = 1; i < correlations.length - 1; i++) {
    if (correlations[i] > correlations[i - 1] && correlations[i] > correlations[i + 1]) {
      if (correlations[i] > maxCorr) {
        maxCorr = correlations[i]
        bestLag = minLag + i
      }
    }
  }
  
  if (maxCorr === 0) return 0
  
  const bpm = (newSampleRate * 60) / bestLag
  return bpm
}

// Method 3: Spectral flux onset detection
function detectBPMBySpectralFlux(channelData: Float32Array, sampleRate: number): number {
  const frameSize = 1024
  const hopSize = 512
  
  // Calculate spectral flux
  const fluxValues: number[] = []
  let prevMagnitudes: number[] | null = null
  
  const numFrames = Math.min(Math.floor((channelData.length - frameSize) / hopSize), 5000)
  
  for (let frame = 0; frame < numFrames; frame++) {
    const startIdx = frame * hopSize
    
    // Simple magnitude estimation using zero crossings and energy
    const magnitudes: number[] = []
    for (let band = 0; band < 16; band++) {
      const bandStart = startIdx + (band * frameSize / 16)
      const bandEnd = bandStart + frameSize / 16
      let energy = 0
      for (let i = bandStart; i < bandEnd && i < channelData.length; i++) {
        energy += channelData[i] * channelData[i]
      }
      magnitudes.push(Math.sqrt(energy))
    }
    
    if (prevMagnitudes) {
      let flux = 0
      for (let i = 0; i < magnitudes.length; i++) {
        const diff = magnitudes[i] - prevMagnitudes[i]
        flux += Math.max(0, diff) // Half-wave rectification
      }
      fluxValues.push(flux)
    }
    
    prevMagnitudes = magnitudes
  }
  
  if (fluxValues.length < 50) return 0
  
  // Find peaks in spectral flux
  const peaks = findPeaksAdaptive(fluxValues, 0.3)
  
  if (peaks.length < 4) return 0
  
  // Calculate intervals
  const intervals: number[] = []
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1])
  }
  
  const dominantInterval = findDominantInterval(intervals)
  if (dominantInterval <= 0) return 0
  
  const secondsPerBeat = (dominantInterval * hopSize) / sampleRate
  return secondsPerBeat > 0 ? 60 / secondsPerBeat : 0
}

// Method 4: Bass energy analysis (good for electronic/hip-hop)
function detectBPMByBassEnergy(channelData: Float32Array, sampleRate: number): number {
  // Simple low-pass filter for bass extraction
  const windowSize = Math.floor(sampleRate / 100) // ~100Hz cutoff
  const hopSize = Math.floor(sampleRate * 0.01)
  
  const bassEnergy: number[] = []
  const maxFrames = Math.min(Math.floor((channelData.length - windowSize) / hopSize), 10000)
  
  for (let frame = 0; frame < maxFrames; frame++) {
    const startIdx = frame * hopSize
    let sum = 0
    
    // Simple moving average as low-pass
    for (let j = 0; j < windowSize && startIdx + j < channelData.length; j++) {
      sum += channelData[startIdx + j]
    }
    const lowPassed = sum / windowSize
    bassEnergy.push(lowPassed * lowPassed)
  }
  
  if (bassEnergy.length < 100) return 0
  
  // Find peaks
  const peaks = findPeaksAdaptive(bassEnergy, 0.25)
  
  if (peaks.length < 4) return 0
  
  const intervals: number[] = []
  for (let i = 1; i < peaks.length; i++) {
    intervals.push(peaks[i] - peaks[i - 1])
  }
  
  const dominantInterval = findDominantInterval(intervals)
  if (dominantInterval <= 0) return 0
  
  const secondsPerBeat = (dominantInterval * hopSize) / sampleRate
  return secondsPerBeat > 0 ? 60 / secondsPerBeat : 0
}

// Helper: Find peaks with adaptive threshold
function findPeaksAdaptive(data: number[], thresholdRatio: number): number[] {
  if (data.length < 3) return []
  
  // Calculate adaptive threshold
  const sorted = [...data].sort((a, b) => b - a)
  const threshold = sorted[Math.floor(sorted.length * thresholdRatio)] || 0
  
  const peaks: number[] = []
  const minPeakDistance = 5 // Minimum frames between peaks
  
  for (let i = 2; i < data.length - 2; i++) {
    if (data[i] > data[i - 1] && data[i] > data[i + 1] &&
        data[i] > data[i - 2] && data[i] > data[i + 2] &&
        data[i] > threshold) {
      // Check minimum distance from last peak
      if (peaks.length === 0 || i - peaks[peaks.length - 1] >= minPeakDistance) {
        peaks.push(i)
      }
    }
  }
  
  return peaks
}

// Helper: Find dominant interval using histogram
function findDominantInterval(intervals: number[]): number {
  if (intervals.length === 0) return 0
  
  // Create histogram of intervals
  const histogram: Map<number, number> = new Map()
  const tolerance = 2 // Group similar intervals
  
  for (const interval of intervals) {
    const bucket = Math.round(interval / tolerance) * tolerance
    histogram.set(bucket, (histogram.get(bucket) || 0) + 1)
  }
  
  // Find most common interval
  let maxCount = 0
  let dominantInterval = 0
  
  for (const [interval, count] of histogram) {
    if (count > maxCount) {
      maxCount = count
      dominantInterval = interval
    }
  }
  
  // Refine by averaging intervals in the dominant bucket
  let sum = 0
  let count = 0
  for (const interval of intervals) {
    if (Math.abs(interval - dominantInterval) <= tolerance * 2) {
      sum += interval
      count++
    }
  }
  
  return count > 0 ? sum / count : dominantInterval
}

// Helper: Simple array smoothing
function smoothArray(data: number[], windowSize: number): number[] {
  const result: number[] = []
  const halfWindow = Math.floor(windowSize / 2)
  
  for (let i = 0; i < data.length; i++) {
    let sum = 0
    let count = 0
    for (let j = Math.max(0, i - halfWindow); j <= Math.min(data.length - 1, i + halfWindow); j++) {
      sum += data[j]
      count++
    }
    result.push(sum / count)
  }
  
  return result
}

// Helper: Find BPM consensus from multiple candidates
function findBPMConsensus(candidates: number[]): number {
  if (candidates.length === 0) return 120
  if (candidates.length === 1) return candidates[0]
  
  // Normalize all candidates to 60-200 range
  const normalized = candidates.map(bpm => {
    while (bpm < 60) bpm *= 2
    while (bpm > 200) bpm /= 2
    return bpm
  })
  
  // Group similar BPMs (within 5% tolerance)
  const groups: number[][] = []
  
  for (const bpm of normalized) {
    let added = false
    for (const group of groups) {
      const groupAvg = group.reduce((a, b) => a + b, 0) / group.length
      if (Math.abs(bpm - groupAvg) / groupAvg < 0.05) {
        group.push(bpm)
        added = true
        break
      }
    }
    if (!added) {
      groups.push([bpm])
    }
  }
  
  // Return average of largest group
  let largestGroup = groups[0]
  for (const group of groups) {
    if (group.length > largestGroup.length) {
      largestGroup = group
    }
  }
  
  return largestGroup.reduce((a, b) => a + b, 0) / largestGroup.length
}

function calculateEnergy(channelData: Float32Array): number {
  let sum = 0
  for (let i = 0; i < channelData.length; i++) {
    sum += channelData[i] * channelData[i]
  }
  const rms = Math.sqrt(sum / channelData.length)
  return Math.min(1, rms * 3.3)
}

function analyzeSpectrum(channelData: Float32Array, sampleRate: number): { brightness: number; bassWeight: number; midWeight: number } {
  let zeroCrossings = 0
  for (let i = 1; i < channelData.length; i++) {
    if ((channelData[i] >= 0 && channelData[i - 1] < 0) || (channelData[i] < 0 && channelData[i - 1] >= 0)) {
      zeroCrossings++
    }
  }
  const zcr = zeroCrossings / channelData.length
  const brightness = Math.min(1, zcr * 10)
  
  // Low-pass for bass
  const bassWindowSize = Math.floor(sampleRate / 80)
  let bassEnergy = 0
  let totalEnergy = 0
  
  for (let i = bassWindowSize; i < channelData.length; i++) {
    let lowSum = 0
    for (let j = 0; j < bassWindowSize; j++) {
      lowSum += channelData[i - j]
    }
    const lowValue = lowSum / bassWindowSize
    bassEnergy += lowValue * lowValue
    totalEnergy += channelData[i] * channelData[i]
  }
  
  const bassWeight = totalEnergy > 0 ? Math.min(1, (bassEnergy / totalEnergy) * 5) : 0.5
  
  // Mid frequency estimation
  const midWindowSize = Math.floor(sampleRate / 500)
  let midEnergy = 0
  
  for (let i = midWindowSize; i < channelData.length; i++) {
    let midSum = 0
    for (let j = 0; j < midWindowSize; j++) {
      midSum += channelData[i - j]
    }
    const midValue = midSum / midWindowSize
    midEnergy += midValue * midValue
  }
  
  const midWeight = totalEnergy > 0 ? Math.min(1, (midEnergy / totalEnergy) * 3) : 0.5
  
  return { brightness, bassWeight, midWeight }
}

function calculateDynamicRange(channelData: Float32Array): number {
  let peak = 0
  let sum = 0
  
  for (let i = 0; i < channelData.length; i++) {
    const abs = Math.abs(channelData[i])
    if (abs > peak) peak = abs
    sum += channelData[i] * channelData[i]
  }
  
  const rms = Math.sqrt(sum / channelData.length)
  if (rms === 0) return 0.5
  
  const crestFactor = peak / rms
  return Math.min(1, Math.max(0, (crestFactor - 1) / 10))
}

function analyzeRhythmicComplexity(channelData: Float32Array, sampleRate: number): number {
  const windowSize = Math.floor(sampleRate * 0.02)
  const hopSize = Math.floor(sampleRate * 0.01)
  
  const energies: number[] = []
  for (let i = 0; i < channelData.length - windowSize; i += hopSize) {
    let sum = 0
    for (let j = 0; j < windowSize; j++) {
      sum += Math.abs(channelData[i + j])
    }
    energies.push(sum / windowSize)
  }
  
  let flux = 0
  for (let i = 1; i < energies.length; i++) {
    const diff = energies[i] - energies[i - 1]
    if (diff > 0) flux += diff
  }
  
  const avgFlux = flux / energies.length
  return Math.min(1, avgFlux * 20)
}

function analyzePercussiveness(channelData: Float32Array, sampleRate: number): number {
  const windowSize = Math.floor(sampleRate * 0.01) // 10ms
  const hopSize = Math.floor(sampleRate * 0.005) // 5ms
  
  let transients = 0
  let prevEnergy = 0
  
  for (let i = 0; i < channelData.length - windowSize; i += hopSize) {
    let energy = 0
    for (let j = 0; j < windowSize; j++) {
      energy += channelData[i + j] * channelData[i + j]
    }
    
    if (prevEnergy > 0 && energy > prevEnergy * 2) {
      transients++
    }
    prevEnergy = energy
  }
  
  const transientDensity = transients / (channelData.length / sampleRate)
  return Math.min(1, transientDensity / 20)
}

function analyzeHarmonicContent(channelData: Float32Array, sampleRate: number): number {
  // Estimate harmonic content via autocorrelation periodicity
  const windowSize = Math.floor(sampleRate * 0.05)
  let periodicSum = 0
  let totalSum = 0
  
  for (let lag = 20; lag < windowSize; lag++) {
    let correlation = 0
    for (let i = 0; i < Math.min(channelData.length - lag, 10000); i++) {
      correlation += channelData[i] * channelData[i + lag]
    }
    if (correlation > 0) periodicSum += correlation
    totalSum += Math.abs(correlation)
  }
  
  return totalSum > 0 ? Math.min(1, periodicSum / totalSum) : 0.5
}

// ============================================================================
// EMOTIONAL ANALYSIS FUNCTIONS
// Based on music psychology research mapping audio features to emotional dimensions
// ============================================================================

function analyzeEmotionalProfile(
  channelData: Float32Array,
  sampleRate: number,
  bpm: number,
  energy: number,
  brightness: number,
  dynamicRange: number,
  harmonicContent: number
): EmotionalProfile {
  // Detect musical mode (major/minor) - affects emotional valence significantly
  const mode = detectMusicalMode(channelData, sampleRate)
  
  // Calculate valence (positive/negative emotional tone)
  // Major keys, faster tempos, higher brightness = more positive
  // Minor keys, slower tempos, lower brightness = more negative
  const valence = calculateValence(mode, bpm, brightness, energy, harmonicContent)
  
  // Calculate arousal (energy/calmness)
  // Higher tempo, energy, and brightness = higher arousal
  const arousal = calculateArousal(bpm, energy, brightness, dynamicRange)
  
  // Calculate tension (stress/relaxation)
  // Dissonance, dynamic range, and percussiveness contribute to tension
  const tension = calculateTension(channelData, sampleRate, dynamicRange, brightness)
  
  // Determine dominant emotion based on valence-arousal model
  const dominantEmotion = classifyDominantEmotion(valence, arousal, tension)
  
  // Analyze emotional arc (how emotion evolves through the track)
  const emotionalArc = analyzeEmotionalArc(channelData, sampleRate)
  
  // Calculate overall emotional intensity
  const intensity = Math.min(1, Math.sqrt(valence * valence + arousal * arousal + tension * tension) / 1.73)
  
  return {
    valence,
    arousal,
    tension,
    mode,
    dominantEmotion,
    emotionalArc,
    intensity
  }
}

function detectMusicalMode(channelData: Float32Array, sampleRate: number): 'major' | 'minor' | 'ambiguous' {
  // Chroma-based mode detection using pitch class profiles
  // This is a simplified approach that detects the prevalence of major vs minor intervals
  
  if (!channelData || channelData.length === 0) return 'ambiguous'
  
  const fftSize = 4096
  const numFrames = Math.min(100, Math.floor(channelData.length / fftSize))
  
  if (numFrames < 5) return 'ambiguous'
  
  // Frequency bins for chromatic pitches (simplified detection)
  // Major keys tend to have strong 3rd and 7th intervals
  // Minor keys tend to have flat 3rd and flat 7th
  
  let majorScore = 0
  let minorScore = 0
  
  // Analyze intervals using autocorrelation at musical intervals
  // Major third ratio: 5/4 = 1.26
  // Minor third ratio: 6/5 = 1.2
  
  for (let frame = 0; frame < numFrames; frame++) {
    const startIdx = frame * fftSize
    const frameData = channelData.slice(startIdx, startIdx + fftSize)
    
    // Find fundamental frequency via autocorrelation
    const fundamental = findFundamental(frameData, sampleRate)
    
    if (fundamental > 50 && fundamental < 2000) {
      // Check for major third (ratio ~1.26)
      const majorThirdLag = Math.floor(sampleRate / (fundamental * 1.26))
      // Check for minor third (ratio ~1.2)  
      const minorThirdLag = Math.floor(sampleRate / (fundamental * 1.2))
      
      if (majorThirdLag > 0 && majorThirdLag < frameData.length) {
        let majorCorr = 0
        for (let i = 0; i < Math.min(1000, frameData.length - majorThirdLag); i++) {
          majorCorr += frameData[i] * frameData[i + majorThirdLag]
        }
        if (majorCorr > 0) majorScore += majorCorr
      }
      
      if (minorThirdLag > 0 && minorThirdLag < frameData.length) {
        let minorCorr = 0
        for (let i = 0; i < Math.min(1000, frameData.length - minorThirdLag); i++) {
          minorCorr += frameData[i] * frameData[i + minorThirdLag]
        }
        if (minorCorr > 0) minorScore += minorCorr
      }
    }
  }
  
  const total = majorScore + minorScore
  if (total === 0) return 'ambiguous'
  
  const majorRatio = majorScore / total
  
  if (majorRatio > 0.6) return 'major'
  if (majorRatio < 0.4) return 'minor'
  return 'ambiguous'
}

function findFundamental(frameData: Float32Array, sampleRate: number): number {
  // Simple autocorrelation-based pitch detection
  const minPeriod = Math.floor(sampleRate / 2000) // Max 2000 Hz
  const maxPeriod = Math.floor(sampleRate / 50)   // Min 50 Hz
  
  let maxCorrelation = 0
  let bestPeriod = 0
  
  for (let period = minPeriod; period < Math.min(maxPeriod, frameData.length / 2); period++) {
    let correlation = 0
    const samples = Math.min(1000, frameData.length - period)
    
    for (let i = 0; i < samples; i++) {
      correlation += frameData[i] * frameData[i + period]
    }
    
    if (correlation > maxCorrelation) {
      maxCorrelation = correlation
      bestPeriod = period
    }
  }
  
  return bestPeriod > 0 ? sampleRate / bestPeriod : 0
}

function calculateValence(
  mode: 'major' | 'minor' | 'ambiguous',
  bpm: number,
  brightness: number,
  energy: number,
  harmonicContent: number
): number {
  // Valence calculation based on music psychology research
  // Russell's circumplex model and Thayer's arousal-valence model
  
  let valence = 0
  
  // Mode is the strongest predictor of valence
  // Major = positive, Minor = negative
  if (mode === 'major') valence += 0.4
  else if (mode === 'minor') valence -= 0.4
  
  // Tempo contribution: faster = more positive (normalized around 120 BPM)
  const tempoContribution = (bpm - 100) / 100 * 0.3
  valence += Math.max(-0.3, Math.min(0.3, tempoContribution))
  
  // Brightness: brighter = more positive
  valence += (brightness - 0.5) * 0.2
  
  // High harmonic content (melodic) tends towards positive
  valence += (harmonicContent - 0.5) * 0.15
  
  // Energy at moderate levels is most positive (too high or low = less positive)
  const energyOptimum = 0.6
  const energyDiff = Math.abs(energy - energyOptimum)
  valence -= energyDiff * 0.1
  
  // Clamp to -1 to 1
  return Math.max(-1, Math.min(1, valence))
}

function calculateArousal(
  bpm: number,
  energy: number,
  brightness: number,
  dynamicRange: number
): number {
  // Arousal is primarily driven by tempo, energy, and brightness
  
  let arousal = 0
  
  // Tempo is the strongest predictor of arousal
  // Normalized: 60 BPM = low arousal, 180 BPM = high arousal
  const tempoNormalized = (bpm - 60) / 140
  arousal += Math.max(0, Math.min(1, tempoNormalized)) * 0.4
  
  // Energy directly correlates with arousal
  arousal += energy * 0.35
  
  // Brightness contributes to perceived excitement
  arousal += brightness * 0.15
  
  // High dynamic range can increase perceived energy
  arousal += dynamicRange * 0.1
  
  // Clamp to 0-1
  return Math.max(0, Math.min(1, arousal))
}

function calculateTension(
  channelData: Float32Array,
  sampleRate: number,
  dynamicRange: number,
  brightness: number
): number {
  // Tension is created by dissonance, unpredictability, and certain spectral characteristics
  
  let tension = 0
  
  // Analyze spectral irregularity (indicates dissonance)
  const spectralIrregularity = analyzeSpectralIrregularity(channelData, sampleRate)
  tension += spectralIrregularity * 0.4
  
  // High dynamic range creates tension through unpredictability
  tension += dynamicRange * 0.25
  
  // Very high brightness can create tension
  if (brightness > 0.7) {
    tension += (brightness - 0.7) * 0.5
  }
  
  // Very low brightness (dark sounds) can also create tension
  if (brightness < 0.3) {
    tension += (0.3 - brightness) * 0.3
  }
  
  return Math.max(0, Math.min(1, tension))
}

function analyzeSpectralIrregularity(channelData: Float32Array, sampleRate: number): number {
  // Measure spectral flux / irregularity as proxy for dissonance
  const windowSize = Math.floor(sampleRate * 0.02) // 20ms windows
  const hopSize = Math.floor(windowSize / 2)
  
  if (channelData.length < windowSize * 3) return 0.3
  
  const energies: number[] = []
  const maxFrames = Math.min(500, Math.floor((channelData.length - windowSize) / hopSize))
  
  for (let i = 0; i < maxFrames; i++) {
    const startIdx = i * hopSize
    let energy = 0
    for (let j = 0; j < windowSize && startIdx + j < channelData.length; j++) {
      energy += channelData[startIdx + j] * channelData[startIdx + j]
    }
    energies.push(energy)
  }
  
  if (energies.length < 3) return 0.3
  
  // Calculate spectral flux (variation between frames)
  let flux = 0
  for (let i = 1; i < energies.length; i++) {
    flux += Math.abs(energies[i] - energies[i - 1])
  }
  
  const avgFlux = flux / (energies.length - 1)
  const maxEnergy = Math.max(...energies)
  
  if (maxEnergy === 0) return 0.3
  
  return Math.min(1, avgFlux / maxEnergy * 5)
}

function classifyDominantEmotion(valence: number, arousal: number, tension: number): string {
  // Emotion classification based on valence-arousal circumplex model
  // Enhanced with tension dimension
  
  // High arousal, high valence = excited, happy, euphoric
  if (arousal > 0.6 && valence > 0.2) {
    if (tension > 0.5) return 'Intense Joy'
    if (arousal > 0.8) return 'Euphoric'
    return 'Energetic & Uplifting'
  }
  
  // High arousal, low valence = angry, anxious, aggressive
  if (arousal > 0.6 && valence < -0.2) {
    if (tension > 0.6) return 'Aggressive'
    return 'Intense & Dark'
  }
  
  // High arousal, neutral valence = excited, tense
  if (arousal > 0.6) {
    if (tension > 0.5) return 'Tense & Driving'
    return 'Energetic & Neutral'
  }
  
  // Low arousal, high valence = calm, peaceful, content
  if (arousal < 0.4 && valence > 0.2) {
    if (tension < 0.3) return 'Peaceful & Serene'
    return 'Calm & Contemplative'
  }
  
  // Low arousal, low valence = sad, depressed, melancholic
  if (arousal < 0.4 && valence < -0.2) {
    if (tension > 0.4) return 'Melancholic & Longing'
    return 'Sad & Introspective'
  }
  
  // Low arousal, neutral valence = relaxed, bored
  if (arousal < 0.4) {
    return 'Chill & Laid-back'
  }
  
  // Medium arousal regions
  if (valence > 0.2) {
    if (tension > 0.4) return 'Hopeful & Determined'
    return 'Positive & Groovy'
  }
  
  if (valence < -0.2) {
    if (tension > 0.4) return 'Brooding & Atmospheric'
    return 'Moody & Reflective'
  }
  
  // Neutral zone
  if (tension > 0.5) return 'Hypnotic & Suspenseful'
  return 'Balanced & Versatile'
}

function analyzeEmotionalArc(channelData: Float32Array, sampleRate: number): 'building' | 'sustained' | 'releasing' | 'dynamic' {
  // Analyze how energy evolves through the track
  const numSegments = 8
  const segmentLength = Math.floor(channelData.length / numSegments)
  
  if (segmentLength < 1000) return 'sustained'
  
  const segmentEnergies: number[] = []
  
  for (let i = 0; i < numSegments; i++) {
    const startIdx = i * segmentLength
    let energy = 0
    for (let j = 0; j < segmentLength && startIdx + j < channelData.length; j++) {
      energy += channelData[startIdx + j] * channelData[startIdx + j]
    }
    segmentEnergies.push(energy / segmentLength)
  }
  
  // Analyze trend
  const firstHalf = segmentEnergies.slice(0, 4).reduce((a, b) => a + b, 0) / 4
  const secondHalf = segmentEnergies.slice(4).reduce((a, b) => a + b, 0) / 4
  
  // Calculate variance for dynamics
  const mean = segmentEnergies.reduce((a, b) => a + b, 0) / numSegments
  const variance = segmentEnergies.reduce((sum, e) => sum + (e - mean) ** 2, 0) / numSegments
  const coefficientOfVariation = mean > 0 ? Math.sqrt(variance) / mean : 0
  
  // High variation = dynamic
  if (coefficientOfVariation > 0.5) return 'dynamic'
  
  // Clear upward trend = building
  if (secondHalf > firstHalf * 1.3) return 'building'
  
  // Clear downward trend = releasing
  if (firstHalf > secondHalf * 1.3) return 'releasing'
  
  // Otherwise sustained
  return 'sustained'
}

// ============================================================================
// GENRE PROFILE DEFINITIONS - Comprehensive niche-specific profiles with
// entrepreneurial roadmaps and monetization strategies
// ============================================================================

export interface TransferableSkill {
  skill: string
  description: string
  careerPaths: string[]
}

export interface GenreProfile {
  genre: { primary: string; secondary: string; niche: string; confidence: number }
  sonic: { tempo: string; energy: string; mood: string; production: string; keyElements: string[]; emotionalCharacter: string }
  mbti: {
    type: string
    name: string
    description: string
    strengths: string[]
    challenges: string[]
    coreValues: string[]
  }
  transferableSkills: {
    coreCompetencies: TransferableSkill[]
    industryApplications: { industry: string; roles: string[]; whyYouFit: string }[]
    portfolioCareer: string
  }
  roadmap: {
    marketReality: {
      saturationLevel: string
      industryTruth: string
      whyMostFail: string
      yourEdge: string
    }
    differentiationStrategy: {
      positioning: string
      uniqueAngle: string
      targetAudience: string
      competitiveAdvantage: string
    }
    phase1: { title: string; duration: string; focus: string; actions: string[]; milestones: string[] }
    phase2: { title: string; duration: string; focus: string; actions: string[]; milestones: string[] }
    phase3: { title: string; duration: string; focus: string; actions: string[]; milestones: string[] }
    phase4: { title: string; duration: string; focus: string; actions: string[]; milestones: string[] }
    revenueStreams: {
      immediate: { stream: string; description: string; potentialMonthly: string }[]
      shortTerm: { stream: string; description: string; potentialMonthly: string }[]
      longTerm: { stream: string; description: string; potentialMonthly: string }[]
    }
    businessModels: string[]
    keyPartnerships: string[]
    platformStrategy: { platform: string; purpose: string; priority: string }[]
    investmentAreas: string[]
    criticalMistakes: string[]
    scalingTriggers: string[]
  }
}

export function matchGenreFromFeatures(features: AudioFeatures, fileName: string): GenreProfile {
  const { bpm, energy, brightness, bassWeight, midWeight, dynamicRange, rhythmicComplexity, percussiveness, harmonicContent, emotional } = features
  const lowerName = fileName.toLowerCase()
  
  const hasKeyword = (keywords: string[]) => keywords.some(k => lowerName.includes(k))
  
  // Use emotional context to refine genre matching
  const isEmotionallyDark = emotional.valence < -0.2 || emotional.dominantEmotion.toLowerCase().includes('dark')
  const isEmotionallyUplifting = emotional.valence > 0.3 && emotional.arousal > 0.5
  const isIntrospective = emotional.arousal < 0.4 && emotional.tension < 0.4
  const isIntense = emotional.arousal > 0.7 && emotional.tension > 0.5
  
  // Helper to enhance profile with emotional data
  const enhanceWithEmotionalData = (profile: GenreProfile): GenreProfile => {
    return {
      ...profile,
      sonic: {
        ...profile.sonic,
        emotionalCharacter: emotional.dominantEmotion,
        // Optionally enhance mood based on emotional analysis
        mood: profile.sonic.mood || emotional.dominantEmotion
      }
    }
  }
  
  // ============================================================================
  // DRILL VARIANTS
  // ============================================================================
  if (hasKeyword(["drill", "uk drill", "ny drill", "chicago drill", "brooklyn drill"])) {
    if (hasKeyword(["uk", "british", "london"])) return enhanceWithEmotionalData(getUKDrillProfile())
    if (hasKeyword(["ny", "brooklyn", "new york"])) return enhanceWithEmotionalData(getNYDrillProfile())
    return enhanceWithEmotionalData(getChicagoDrillProfile())
  }
  
  // ============================================================================
  // TRAP & HIP-HOP VARIANTS
  // ============================================================================
  if (bpm >= 60 && bpm <= 95 && bassWeight > 0.6) {
    if (hasKeyword(["melodic", "emotional", "sad"])) return enhanceWithEmotionalData(getMelodicTrapProfile())
    if (hasKeyword(["hard", "aggressive", "dark"])) return enhanceWithEmotionalData(getHardTrapProfile())
    if (hasKeyword(["plugg", "pluggnb"])) return enhanceWithEmotionalData(getPluggProfile())
    if (hasKeyword(["rage", "hyperpop"])) return enhanceWithEmotionalData(getRageBeatProfile())
    if (hasKeyword(["phonk", "drift"])) return enhanceWithEmotionalData(getPhonkProfile())
    if (hasKeyword(["boom bap", "boombap", "90s", "golden"])) return enhanceWithEmotionalData(getBoomBapProfile())
    if (bassWeight > 0.75 && brightness < 0.4) return enhanceWithEmotionalData(getTrapProfile())
    if (harmonicContent > 0.6) return enhanceWithEmotionalData(getMelodicTrapProfile())
    return enhanceWithEmotionalData(getHipHopProfile())
  }
  
  // ============================================================================
  // DRUM AND BASS VARIANTS
  // ============================================================================
  if (bpm >= 160 && bpm <= 180) {
    if (hasKeyword(["liquid", "soulful", "vocal"])) return enhanceWithEmotionalData(getLiquidDnBProfile())
    if (hasKeyword(["neuro", "tech"])) return enhanceWithEmotionalData(getNeurofunkProfile())
    if (hasKeyword(["jungle", "ragga", "amen"])) return enhanceWithEmotionalData(getJungleProfile())
    if (hasKeyword(["jump up"])) return enhanceWithEmotionalData(getJumpUpDnBProfile())
    if (bassWeight > 0.7 && brightness > 0.5) return enhanceWithEmotionalData(getNeurofunkProfile())
    if (harmonicContent > 0.6) return enhanceWithEmotionalData(getLiquidDnBProfile())
    return enhanceWithEmotionalData(getDrumAndBassProfile())
  }
  
  // ============================================================================
  // HOUSE VARIANTS
  // ============================================================================
  if (bpm >= 118 && bpm <= 130 && bassWeight > 0.4 && bassWeight < 0.7) {
    if (hasKeyword(["deep", "deep house"])) return enhanceWithEmotionalData(getDeepHouseProfile())
    if (hasKeyword(["tech house"])) return enhanceWithEmotionalData(getTechHouseProfile())
    if (hasKeyword(["afro house", "afro"])) return enhanceWithEmotionalData(getAfroHouseProfile())
    if (hasKeyword(["progressive"])) return enhanceWithEmotionalData(getProgressiveHouseProfile())
    if (hasKeyword(["disco", "nu disco", "nu-disco"])) return enhanceWithEmotionalData(getNuDiscoProfile())
    if (hasKeyword(["minimal"])) return enhanceWithEmotionalData(getMinimalHouseProfile())
    if (brightness > 0.6) return enhanceWithEmotionalData(getTechHouseProfile())
    if (harmonicContent > 0.6) return enhanceWithEmotionalData(getDeepHouseProfile())
    return enhanceWithEmotionalData(getHouseProfile())
  }
  
  // ============================================================================
  // TECHNO VARIANTS
  // ============================================================================
  if (bpm >= 125 && bpm <= 150 && percussiveness > 0.5) {
    if (hasKeyword(["hard", "industrial"])) return enhanceWithEmotionalData(getIndustrialTechnoProfile())
    if (hasKeyword(["minimal", "micro"])) return enhanceWithEmotionalData(getMinimalTechnoProfile())
    if (hasKeyword(["melodic techno", "melodic"])) return enhanceWithEmotionalData(getMelodicTechnoProfile())
    if (hasKeyword(["acid"])) return enhanceWithEmotionalData(getAcidTechnoProfile())
    if (hasKeyword(["dub techno", "dub"])) return enhanceWithEmotionalData(getDubTechnoProfile())
    if (brightness > 0.6 && energy > 0.7) return enhanceWithEmotionalData(getPeakTimeTechnoProfile())
    if (harmonicContent > 0.5) return enhanceWithEmotionalData(getMelodicTechnoProfile())
    return enhanceWithEmotionalData(getTechnoProfile())
  }
  
  // ============================================================================
  // UK BASS / GARAGE VARIANTS
  // ============================================================================
  if (bpm >= 128 && bpm <= 145 && bassWeight > 0.6) {
    if (hasKeyword(["garage", "ukg", "2 step", "2step"])) return enhanceWithEmotionalData(getUKGarageProfile())
    if (hasKeyword(["bassline", "4x4"])) return enhanceWithEmotionalData(getBasslineProfile())
    if (hasKeyword(["grime"])) return enhanceWithEmotionalData(getGrimeProfile())
    return enhanceWithEmotionalData(getUKBassProfile())
  }
  
  // ============================================================================
  // DUBSTEP VARIANTS
  // ============================================================================
  if (bpm >= 135 && bpm <= 150 && bassWeight > 0.7) {
    if (hasKeyword(["riddim"])) return enhanceWithEmotionalData(getRiddimProfile())
    if (hasKeyword(["brostep", "heavy"])) return enhanceWithEmotionalData(getBrostepProfile())
    if (hasKeyword(["melodic dub", "chillstep"])) return enhanceWithEmotionalData(getMelodicDubstepProfile())
    if (hasKeyword(["deep dub"])) return enhanceWithEmotionalData(getDeepDubstepProfile())
    return enhanceWithEmotionalData(getDubstepProfile())
  }
  
  // ============================================================================
  // AFROBEATS & CARIBBEAN
  // ============================================================================
  if (bpm >= 95 && bpm <= 115 && rhythmicComplexity > 0.5) {
    if (hasKeyword(["afro", "afrobeat", "naija", "nigerian"])) return enhanceWithEmotionalData(getAfrobeatsProfile())
    if (hasKeyword(["amapiano", "piano"])) return enhanceWithEmotionalData(getAmapianoProfile())
    if (hasKeyword(["dancehall"])) return enhanceWithEmotionalData(getDancehallProfile())
    if (hasKeyword(["reggae", "roots"])) return enhanceWithEmotionalData(getReggaeProfile())
    if (hasKeyword(["soca", "carnival"])) return enhanceWithEmotionalData(getSocaProfile())
    if (hasKeyword(["reggaeton", "latin"])) return enhanceWithEmotionalData(getReggaetonProfile())
  }
  
  // ============================================================================
  // R&B / SOUL VARIANTS
  // ============================================================================
  if (bpm >= 65 && bpm <= 110 && harmonicContent > 0.5 && energy < 0.6) {
    if (hasKeyword(["rnb", "r&b"])) return enhanceWithEmotionalData(getRnBProfile())
    if (hasKeyword(["neo soul", "neo-soul"])) return enhanceWithEmotionalData(getNeoSoulProfile())
    if (hasKeyword(["alternative r&b", "alt rnb"])) return enhanceWithEmotionalData(getAlternativeRnBProfile())
    if (hasKeyword(["pnb", "pnb rnb"])) return enhanceWithEmotionalData(getPBRnBProfile())
    if (midWeight > 0.6 && bassWeight < 0.5) return enhanceWithEmotionalData(getNeoSoulProfile())
    return enhanceWithEmotionalData(getRnBProfile())
  }
  
  // ============================================================================
  // ELECTRONIC / EDM VARIANTS
  // ============================================================================
  if (bpm >= 125 && bpm <= 150 && energy > 0.6 && brightness > 0.5) {
    if (hasKeyword(["future bass"])) return enhanceWithEmotionalData(getFutureBassProfile())
    if (hasKeyword(["edm", "festival", "mainstage"])) return enhanceWithEmotionalData(getMainstageEDMProfile())
    if (hasKeyword(["electro"])) return enhanceWithEmotionalData(getElectroProfile())
    if (hasKeyword(["big room"])) return enhanceWithEmotionalData(getBigRoomProfile())
    if (percussiveness > 0.6) return enhanceWithEmotionalData(getMainstageEDMProfile())
    return enhanceWithEmotionalData(getElectronicProfile())
  }
  
  // ============================================================================
  // TRANCE VARIANTS
  // ============================================================================
  if (bpm >= 135 && bpm <= 150 && harmonicContent > 0.5 && energy > 0.6) {
    if (hasKeyword(["psy", "psytrance", "goa"])) return enhanceWithEmotionalData(getPsytranceProfile())
    if (hasKeyword(["uplifting"])) return enhanceWithEmotionalData(getUpliftingTranceProfile())
    if (hasKeyword(["progressive trance"])) return enhanceWithEmotionalData(getProgressiveTranceProfile())
    if (hasKeyword(["tech trance"])) return enhanceWithEmotionalData(getTechTranceProfile())
    return enhanceWithEmotionalData(getTranceProfile())
  }
  
  // ============================================================================
  // AMBIENT / EXPERIMENTAL
  // ============================================================================
  if (bpm < 100 && energy < 0.4) {
    if (hasKeyword(["lofi", "lo-fi", "lo fi", "study", "chill"])) return enhanceWithEmotionalData(getLoFiProfile())
    if (hasKeyword(["ambient", "atmospheric"])) return enhanceWithEmotionalData(getAmbientProfile())
    if (hasKeyword(["drone", "dark ambient"])) return enhanceWithEmotionalData(getDarkAmbientProfile())
    if (hasKeyword(["idm", "intelligent"])) return enhanceWithEmotionalData(getIDMProfile())
    if (hasKeyword(["downtempo", "trip hop", "trip-hop"])) return enhanceWithEmotionalData(getDowntempoProfile())
    if (dynamicRange > 0.6) return enhanceWithEmotionalData(getAmbientProfile())
    return enhanceWithEmotionalData(getLoFiProfile())
  }
  
  // ============================================================================
  // ROCK / METAL VARIANTS
  // ============================================================================
  if (energy > 0.6 && dynamicRange > 0.4 && brightness > 0.5) {
    if (hasKeyword(["metal", "heavy", "death", "black metal"])) return enhanceWithEmotionalData(getMetalProfile())
    if (hasKeyword(["punk", "hardcore"])) return enhanceWithEmotionalData(getPunkProfile())
    if (hasKeyword(["indie rock", "indie"])) return enhanceWithEmotionalData(getIndieRockProfile())
    if (hasKeyword(["alternative", "alt rock"])) return enhanceWithEmotionalData(getAltRockProfile())
    if (hasKeyword(["post rock", "post-rock"])) return enhanceWithEmotionalData(getPostRockProfile())
    if (bpm > 140 && percussiveness > 0.6) return enhanceWithEmotionalData(getMetalProfile())
    return enhanceWithEmotionalData(getRockProfile())
  }
  
  // ============================================================================
  // POP VARIANTS
  // ============================================================================
  if (bpm >= 100 && bpm <= 130 && harmonicContent > 0.5) {
    if (hasKeyword(["hyperpop", "hyper pop"])) return enhanceWithEmotionalData(getHyperpopProfile())
    if (hasKeyword(["indie pop"])) return enhanceWithEmotionalData(getIndiePopProfile())
    if (hasKeyword(["synth pop", "synthpop"])) return enhanceWithEmotionalData(getSynthPopProfile())
    if (hasKeyword(["k-pop", "kpop"])) return enhanceWithEmotionalData(getKPopProfile())
    if (energy > 0.6 && brightness > 0.6) return enhanceWithEmotionalData(getPopProfile())
  }
  
  // ============================================================================
  // ACOUSTIC / FOLK VARIANTS
  // ============================================================================
  if (dynamicRange > 0.5 && percussiveness < 0.4) {
    if (hasKeyword(["folk", "acoustic"])) return enhanceWithEmotionalData(getFolkProfile())
    if (hasKeyword(["country", "americana"])) return enhanceWithEmotionalData(getCountryProfile())
    if (hasKeyword(["singer songwriter", "singer-songwriter"])) return enhanceWithEmotionalData(getSingerSongwriterProfile())
    if (hasKeyword(["classical", "orchestral"])) return enhanceWithEmotionalData(getClassicalProfile())
    if (hasKeyword(["jazz"])) return enhanceWithEmotionalData(getJazzProfile())
  }
  
  // ============================================================================
  // WORLD MUSIC
  // ============================================================================
  if (rhythmicComplexity > 0.5) {
    if (hasKeyword(["latin", "salsa", "bachata"])) return enhanceWithEmotionalData(getLatinProfile())
    if (hasKeyword(["flamenco", "spanish"])) return enhanceWithEmotionalData(getFlamencoProfile())
    if (hasKeyword(["indian", "bollywood"])) return enhanceWithEmotionalData(getBollywoodProfile())
    if (hasKeyword(["arabic", "middle eastern"])) return enhanceWithEmotionalData(getArabicProfile())
  }
  
  // ============================================================================
  // FEATURE-BASED MATCHING (when no keywords match)
  // ============================================================================
  
  // Very high BPM electronic
  if (bpm >= 160) return enhanceWithEmotionalData(getDrumAndBassProfile())
  
  // High BPM + heavy bass
  if (bpm >= 140 && bassWeight > 0.6) return enhanceWithEmotionalData(getDubstepProfile())
  
  // Mid-high BPM + balanced spectrum
  if (bpm >= 120 && bpm <= 135) {
    if (bassWeight > 0.5) return enhanceWithEmotionalData(getHouseProfile())
    return enhanceWithEmotionalData(getElectronicProfile())
  }
  
  // Slow + heavy bass
  if (bpm < 100 && bassWeight > 0.6) return enhanceWithEmotionalData(getTrapProfile())
  
  // Slow + low energy
  if (bpm < 100 && energy < 0.4) return enhanceWithEmotionalData(getLoFiProfile())
  
  // High energy + bright
  if (energy > 0.6 && brightness > 0.6) return enhanceWithEmotionalData(getRockProfile())
  
  // Harmonic + moderate tempo
  if (harmonicContent > 0.6 && bpm >= 100 && bpm <= 130) return enhanceWithEmotionalData(getPopProfile())
  
  // Complex rhythms
  if (rhythmicComplexity > 0.6) return enhanceWithEmotionalData(getAfrobeatsProfile())
  
  // Default experimental
  return enhanceWithEmotionalData(getExperimentalProfile())
}

// ============================================================================
// PROFILE IMPLEMENTATIONS - Each with comprehensive entrepreneurial roadmaps
// ============================================================================

function getUKDrillProfile(): GenreProfile {
  return {
    genre: { primary: "UK Drill", secondary: "Drill", niche: "British Drill / Road Rap", confidence: 92 },
    sonic: { 
      tempo: "140 BPM", 
      energy: "high", 
      mood: "Dark, menacing, and street-authentic", 
      production: "Sliding 808s, dark pads, minimal melodies, aggressive hi-hats",
      keyElements: ["Sliding 808 bass", "Dark minor keys", "Sparse hi-hats", "Reverb-drenched snares", "Vocal chops"]
    },
    mbti: {
      type: "ISTP",
      name: "The Street Chronicler",
      description: "You document reality with unflinching authenticity over menacing production. Your music captures the raw energy and complex narratives of urban life, resonating deeply with audiences who value genuine expression over manufactured personas.",
      strengths: ["Unmatched authenticity and street credibility", "Strong UK scene infrastructure with proven pathways", "Viral potential through TikTok and social media", "Dedicated fanbase that supports artists long-term", "International export potential to US, EU, and global markets"],
      challenges: ["Platform content moderation and restrictions", "Media scrutiny and negative press association", "Need to evolve sound while maintaining authenticity", "Geographic scene politics and territory associations"],
      coreValues: ["Authenticity", "Loyalty", "Street credibility", "Real storytelling"]
    },
    transferableSkills: {
      coreCompetencies: [
        {
          skill: "Cultural Intelligence & Community Insight",
          description: "Deep understanding of urban communities, youth culture, and grassroots movements. You can read social dynamics and understand what resonates with underrepresented demographics.",
          careerPaths: ["DEI Consultant", "Community Engagement Manager", "Cultural Strategy Advisor", "Youth Outreach Coordinator", "Brand Culture Consultant"]
        },
        {
          skill: "Authentic Storytelling & Narrative Craft",
          description: "Ability to communicate complex lived experiences in compelling, relatable ways. You translate reality into powerful narratives that connect emotionally.",
          careerPaths: ["Content Strategist", "Documentary Producer", "Podcast Host", "Brand Storyteller", "Social Impact Communicator"]
        },
        {
          skill: "Visual Communication & Aesthetic Direction",
          description: "Strong eye for visual identity, style, and aesthetic that communicates authenticity. Understanding of how visuals reinforce narrative and brand.",
          careerPaths: ["Creative Director", "Visual Brand Consultant", "Art Direction", "Fashion Stylist", "Music Video Director"]
        },
        {
          skill: "Grassroots Marketing & Viral Strategy",
          description: "Experience building buzz from nothing through word-of-mouth, social media, and community engagement. You understand organic growth.",
          careerPaths: ["Growth Marketing Manager", "Social Media Strategist", "Influencer Marketing", "Street Team Manager", "Viral Content Specialist"]
        }
      ],
      industryApplications: [
        { industry: "Corporate DEI & Culture", roles: ["DEI Program Manager", "Cultural Consultant", "Employee Resource Group Advisor"], whyYouFit: "Your authentic understanding of urban communities and ability to bridge cultural gaps makes you invaluable for companies seeking genuine diversity and inclusion strategies, not performative gestures." },
        { industry: "Media & Entertainment", roles: ["A&R Scout", "Talent Manager", "Content Curator", "Culture Editor"], whyYouFit: "Your ear for authentic talent and understanding of what resonates with young urban audiences makes you ideal for identifying emerging trends and talent before the mainstream." },
        { industry: "Fashion & Streetwear", roles: ["Brand Ambassador", "Cultural Consultant", "Streetwear Buyer", "Style Director"], whyYouFit: "Drill culture is inseparable from fashion. Your understanding of streetwear, authenticity, and what earns credibility translates directly to fashion brand strategy." },
        { industry: "Youth Services & Social Impact", roles: ["Youth Program Director", "Community Organizer", "Mentorship Coordinator"], whyYouFit: "Your lived experience and credibility allows you to connect with young people in ways that outsiders cannot. You understand their world authentically." }
      ],
      portfolioCareer: "Build a portfolio career combining music releases with cultural consulting, brand partnerships, and community work. Many drill artists successfully balance music with roles as cultural advisors to brands, youth mentors, and media commentators. Your authenticity is an asset across industries seeking genuine connection with urban youth culture."
    },
    roadmap: {
      marketReality: {
        saturationLevel: "HIGH - UK drill is the dominant UK rap subgenre with thousands of new releases weekly",
        industryTruth: "Streaming alone will not sustain you. The top 1% of drill artists make 90% of streaming revenue. Your path to sustainability is through live performance, sync licensing, merchandise, and building genuine community - not chasing playlist placements.",
        whyMostFail: "Artists release music without building genuine local fanbase first. They chase viral moments instead of cultivating real supporters who will buy tickets, merchandise, and support long-term. They also underinvest in visual content which is essential for drill.",
        yourEdge: "Focus on being undeniable in your specific area first. Build 1,000 true fans who will support everything you do before trying to reach millions who will scroll past."
      },
      differentiationStrategy: {
        positioning: "Authentic voice from your specific experience - no one else has lived your life or can tell your stories",
        uniqueAngle: "Develop a signature flow pattern, ad-lib, or production sound that becomes instantly recognizable as yours within 3 seconds",
        targetAudience: "Start hyperlocal - your borough, your city. Dominate there before expanding. Build genuine community connections.",
        competitiveAdvantage: "Your authenticity cannot be replicated. While others chase trends, build a loyal core fanbase through consistent quality and genuine engagement."
      },
      phase1: {
        title: "Foundation & Credibility",
        duration: "Months 1-4",
        focus: "Establishing your authentic voice and building initial street buzz",
        actions: [
          "Perfect your flow - study successful UK drill flows from Central Cee, Digga D, Russ Millions and develop your unique cadence",
          "Build producer relationships - connect with UK drill producers on Instagram and Twitter, commission exclusive beats",
          "Create visual identity - work with photographers and videographers familiar with UK drill aesthetics",
          "Document your journey - create behind-the-scenes content showing your creative process",
          "Release freestyle over popular drill beats to establish your style on YouTube and SoundCloud",
          "Build local fanbase through word of mouth and local event appearances"
        ],
        milestones: ["10,000 YouTube views on debut freestyle", "1,000 core followers on Instagram", "3 quality tracks recorded", "Producer network of 5+ contacts"]
      },
      phase2: {
        title: "Platform Development",
        duration: "Months 5-8",
        focus: "Strategic releases and media integration",
        actions: [
          "Submit to GRM Daily, Mixtape Madness, Pressplay Media, and Link Up TV for official releases",
          "Create TikTok content strategy - snippets, challenges, behind-the-scenes, trend participation",
          "Build press relationships with Complex UK, GRM, TRENCH, and drill-focused journalists",
          "Release debut single with professional music video shot by recognized drill directors",
          "Pursue radio plugging for BBC 1Xtra, Capital XTRA, and specialist drill shows",
          "Collaborate with established drill artists for features and cross-promotion"
        ],
        milestones: ["GRM Daily/Mixtape Madness placement", "100,000 streams across platforms", "5,000 Spotify monthly listeners", "1 feature with established artist"]
      },
      phase3: {
        title: "Revenue Activation",
        duration: "Months 9-14",
        focus: "Building sustainable income streams",
        actions: [
          "Launch merchandise line - start with limited drops to build hype and test designs",
          "Book live performances at drill nights, university events, and club appearances",
          "Pursue sync licensing for gaming and film through drill-friendly music supervisors",
          "Build publishing relationships with PRS for Music and explore publishing deals",
          "Create Patreon or membership for exclusive content, early releases, and direct fan access",
          "Develop brand partnership strategy targeting streetwear, gaming, and lifestyle brands"
        ],
        milestones: ["First paid live performance", "Merchandise launch generating revenue", "First sync placement", "Publishing deal exploration", "10,000 monthly listeners"]
      },
      phase4: {
        title: "Scale & Expansion",
        duration: "Months 15-24",
        focus: "International growth and business development",
        actions: [
          "Target US drill market through collaborations with NY drill artists",
          "Explore European markets - Netherlands, France, Germany have growing drill scenes",
          "Develop management and label relationships for scaling operations",
          "Create content company or collective to develop other artists",
          "Pursue mainstream crossover opportunities while maintaining credibility",
          "Build touring infrastructure for headline shows and festival appearances"
        ],
        milestones: ["International collaboration released", "Management or label deal", "Festival booking", "50,000 monthly listeners", "Sustainable monthly income from music"]
      },
      revenueStreams: {
        immediate: [
          { stream: "YouTube Ad Revenue", description: "Monetize music videos, freestyles, and vlogs through YouTube Partner Program", potentialMonthly: "£200-2,000" },
          { stream: "SoundCloud Monetization", description: "Premier monetization for drill tracks and freestyles", potentialMonthly: "£50-500" },
          { stream: "Live Performances", description: "Club appearances, university events, drill nights", potentialMonthly: "£500-3,000" }
        ],
        shortTerm: [
          { stream: "Streaming Royalties", description: "Spotify, Apple Music, Amazon Music, Deezer across all territories", potentialMonthly: "£500-5,000" },
          { stream: "Merchandise Sales", description: "Branded clothing drops, limited editions, seasonal collections", potentialMonthly: "£1,000-10,000" },
          { stream: "Brand Partnerships", description: "Streetwear brands, gaming companies, lifestyle products", potentialMonthly: "£2,000-15,000" },
          { stream: "Feature Fees", description: "Paid features on other artists tracks", potentialMonthly: "£500-5,000" }
        ],
        longTerm: [
          { stream: "Publishing Royalties", description: "PRS, mechanical royalties, international collection", potentialMonthly: "£1,000-20,000" },
          { stream: "Sync Licensing", description: "Film, TV, gaming, advertising placements", potentialMonthly: "£2,000-50,000" },
          { stream: "Touring Revenue", description: "Headline shows, festival bookings, international tours", potentialMonthly: "£5,000-100,000" },
          { stream: "Artist Development", description: "Developing other artists through your platform", potentialMonthly: "£2,000-20,000" },
          { stream: "Label/Publishing Deal", description: "Advance and ongoing royalties from major deal", potentialMonthly: "£5,000-50,000" }
        ]
      },
      businessModels: [
        "Independent artist with distribution deal (AWAL, Ditto, DistroKid)",
        "Artist collective model pooling resources and cross-promotion",
        "Label partnership maintaining creative control",
        "Full 360 deal with major label for maximum resources"
      ],
      keyPartnerships: [
        "UK drill producers (808 Melo, MkThePlug, Ghosty)",
        "GRM Daily and drill media platforms",
        "Streetwear brands (Trapstar, Corteiz, Unknown London)",
        "Drill-focused videographers and directors",
        "Radio pluggers with 1Xtra and Capital XTRA relationships"
      ],
      platformStrategy: [
        { platform: "YouTube", purpose: "Primary music video platform and revenue driver", priority: "Critical" },
        { platform: "TikTok", purpose: "Viral discovery, snippet marketing, trend participation", priority: "Critical" },
        { platform: "Instagram", purpose: "Visual brand, fan engagement, story content", priority: "High" },
        { platform: "Spotify", purpose: "Streaming revenue, playlist placement, algorithmic discovery", priority: "High" },
        { platform: "Twitter/X", purpose: "Industry networking, real-time engagement, news", priority: "Medium" },
        { platform: "SoundCloud", purpose: "Freestyles, loosies, direct fan uploads", priority: "Medium" }
      ],
      investmentAreas: [
        "Professional music video production (£2,000-10,000 per video)",
        "Beat licensing and exclusive production",
        "PR and radio plugging campaigns",
        "Professional photography for brand imagery",
        "Merchandise design and initial inventory"
      ],
      criticalMistakes: [
        "Releasing music before you have an engaged audience - build fanbase first, then release",
        "Spending money on playlisting services instead of genuine fan acquisition",
        "Ignoring visual content - drill is a visual genre, music videos are essential not optional",
        "Copying current hit artists instead of developing your unique voice",
        "Neglecting local scene while chasing online clout - your city should know you before the internet does",
        "Underpricing live performances - know your worth and don't play for exposure"
      ],
      scalingTriggers: [
        "Consistent 10,000+ views on YouTube videos - time to invest more in video production",
        "100+ people at live shows - time to hire a manager or booking agent",
        "Brand DMs in inbox - time to create a proper rate card and media kit",
        "Other artists asking for features - time to start charging feature fees",
        "Monthly streaming revenue exceeds £500 - time to register with PRS and collection societies"
      ]
    }
  }
}

function getTrapProfile(): GenreProfile {
  return {
    genre: { primary: "Trap", secondary: "Southern Hip-Hop", niche: "Modern Trap / Atlanta Sound", confidence: 89 },
    sonic: { 
      tempo: "70-85 BPM (half-time feel)", 
      energy: "high", 
      mood: "Hard-hitting, aggressive, and bass-heavy", 
      production: "808 kicks, rolling hi-hats, snare rolls, dark synths",
      keyElements: ["808 bass patterns", "Triplet hi-hats", "Snare rolls", "Dark atmospheric pads", "Ad-libs"]
    },
    mbti: {
      type: "ESTP",
      name: "The Culture Shaper",
      description: "You create the sounds that define modern hip-hop. Your music sets trends rather than follows them, combining hard-hitting production with an innate understanding of what makes people move.",
      strengths: ["Mainstream crossover potential", "Strong streaming culture alignment", "Brand partnership opportunities", "Global appeal across demographics", "Proven commercial model"],
      challenges: ["Highly saturated market", "Trend-dependent sound evolution", "Need to maintain authenticity while pursuing commercial success", "Algorithm dependency for discovery"],
      coreValues: ["Innovation", "Ambition", "Cultural influence", "Self-expression"]
    },
    transferableSkills: {
      coreCompetencies: [
        {
          skill: "Trend Forecasting & Cultural Pulse",
          description: "Ability to identify emerging cultural movements before they hit mainstream. You understand what's about to pop before it does.",
          careerPaths: ["Trend Analyst", "Cultural Strategist", "A&R Scout", "Marketing Forecaster", "Consumer Insights Analyst"]
        },
        {
          skill: "Brand Building & Personal Marketing",
          description: "Experience building a personal brand from scratch, creating consistent visual identity, and marketing yourself in a crowded market.",
          careerPaths: ["Brand Manager", "Personal Branding Consultant", "Social Media Manager", "Marketing Director", "Influencer Manager"]
        },
        {
          skill: "Audio Production & Technical Creativity",
          description: "Deep understanding of audio engineering, DAW workflows, sound design, and the technical side of music creation.",
          careerPaths: ["Audio Engineer", "Sound Designer", "Podcast Producer", "Post-Production Specialist", "Music Technology Consultant"]
        },
        {
          skill: "Entrepreneurial Hustle & Self-Management",
          description: "Experience running yourself as a business - managing releases, finances, partnerships, and growth without external structure.",
          careerPaths: ["Startup Founder", "Business Development", "Artist Manager", "Creative Entrepreneur", "Independent Consultant"]
        }
      ],
      industryApplications: [
        { industry: "Marketing & Advertising", roles: ["Creative Director", "Culture Marketing Lead", "Brand Strategist", "Campaign Manager"], whyYouFit: "Your understanding of what makes content resonate with young audiences and how to cut through noise is exactly what brands need but rarely have internally." },
        { industry: "Tech & Startups", roles: ["Growth Hacker", "Community Manager", "Product Marketing", "Creator Economy Specialist"], whyYouFit: "Tech companies desperately need people who understand creator culture, virality, and how to build engaged communities. Your experience doing this for yourself is directly transferable." },
        { industry: "Entertainment & Media", roles: ["A&R Representative", "Talent Scout", "Music Supervisor", "Content Curator"], whyYouFit: "Your ear for what works, understanding of the production process, and network in the music world makes you valuable for discovering and developing talent." },
        { industry: "Education & Coaching", roles: ["Music Production Instructor", "Artist Development Coach", "Online Course Creator"], whyYouFit: "Your journey and skills are valuable to the thousands of aspiring artists who want to learn. Teaching and coaching can be highly lucrative." }
      ],
      portfolioCareer: "The most successful trap artists build businesses beyond music - from record labels to fashion lines to tech investments. Use your platform and skills to create multiple income streams. Consider artist development, beat licensing businesses, brand consulting, or content creation as parallel ventures that leverage your music industry knowledge."
    },
    roadmap: {
      marketReality: {
        saturationLevel: "EXTREME - Trap is the most saturated hip-hop subgenre with 100,000+ active artists globally",
        industryTruth: "99% of trap artists will never earn sustainable income from streaming alone. The real money is in live performance, brand deals, publishing, and building businesses beyond music. Streaming is marketing, not income.",
        whyMostFail: "Artists sound exactly like everyone else. They release music nobody asked for to an audience that doesn't exist. They spend money on playlist placements instead of building genuine relationships and a real fanbase.",
        yourEdge: "Develop something genuinely unique - a sound, a story, a perspective that cannot be replicated. Then execute with professional quality that matches your ambition."
      },
      differentiationStrategy: {
        positioning: "Find the intersection of what makes you unique and what the market actually wants - your specific story told through your specific lens",
        uniqueAngle: "Identify your 'only' - the thing only you can do or say. Build your entire brand around that differentiated position.",
        targetAudience: "Don't try to appeal to everyone. Find your 1,000 true fans who will support everything you do. Start with a specific demographic and expand from there.",
        competitiveAdvantage: "Your life experience, your perspective, your voice - these cannot be copied. Double down on what makes you different rather than what makes you similar."
      },
      phase1: {
        title: "Sound Development",
        duration: "Months 1-4",
        focus: "Creating your signature trap sound",
        actions: [
          "Study trap production masters - Metro Boomin, Southside, Wheezy - and identify your unique angle",
          "Build a catalog of 20+ tracks to understand your strengths",
          "Develop signature ad-libs and vocal production style",
          "Create consistent visual aesthetic across all platforms",
          "Network with trap producers and beat-makers online and locally",
          "Release freestyles and loosies to test audience response"
        ],
        milestones: ["20 tracks recorded", "Signature sound identified", "Producer network established", "1,000 followers across platforms"]
      },
      phase2: {
        title: "Audience Building",
        duration: "Months 5-9",
        focus: "Strategic content and playlist penetration",
        actions: [
          "Create TikTok content strategy - 15-second hooks, viral challenges, trending sounds",
          "Submit to Spotify editorial playlists through distributor and direct pitching",
          "Build relationships with playlist curators and hip-hop tastemakers",
          "Release singles strategically with 4-6 week gaps for momentum",
          "Collaborate with rising artists in similar lane for cross-pollination",
          "Engage with hip-hop blogs and online publications"
        ],
        milestones: ["Editorial playlist placement", "10,000 monthly listeners", "Viral TikTok moment", "Blog coverage"]
      },
      phase3: {
        title: "Industry Integration",
        duration: "Months 10-15",
        focus: "Building industry relationships and revenue",
        actions: [
          "Pursue A&R relationships with major labels for potential deals",
          "Develop merchandise line around your brand aesthetic",
          "Book live performances - clubs, colleges, opening slots",
          "Build publishing relationships for sync opportunities",
          "Create content beyond music - vlogs, tutorials, personality content",
          "Explore management options for business development"
        ],
        milestones: ["Label/management meetings", "First headline show", "Merchandise launch", "50,000 monthly listeners"]
      },
      phase4: {
        title: "Commercial Scaling",
        duration: "Months 16-24",
        focus: "Maximizing commercial opportunities",
        actions: [
          "Release debut project (EP or mixtape) with full marketing campaign",
          "Pursue brand deals with fashion, lifestyle, and tech companies",
          "Build touring infrastructure for regional and national shows",
          "Explore international markets - UK, Europe, Asia",
          "Develop business interests beyond music - fashion, media, investments",
          "Create platform for developing other artists"
        ],
        milestones: ["Project release", "Major brand deal", "National tour", "100,000+ monthly listeners", "Sustainable music income"]
      },
      revenueStreams: {
        immediate: [
          { stream: "Beat Leasing", description: "If producing, lease beats to other artists", potentialMonthly: "$200-2,000" },
          { stream: "YouTube Revenue", description: "Music videos and content monetization", potentialMonthly: "$100-1,500" },
          { stream: "SoundCloud Pro", description: "Monetize plays on the platform", potentialMonthly: "$50-500" }
        ],
        shortTerm: [
          { stream: "Streaming Revenue", description: "All DSPs with focus on Spotify and Apple Music", potentialMonthly: "$500-10,000" },
          { stream: "Live Shows", description: "Club performances, college shows, festivals", potentialMonthly: "$1,000-15,000" },
          { stream: "Merchandise", description: "Branded apparel and accessories", potentialMonthly: "$1,000-10,000" },
          { stream: "Feature Fees", description: "Paid guest appearances", potentialMonthly: "$500-10,000" }
        ],
        longTerm: [
          { stream: "Publishing", description: "Songwriting royalties and placements", potentialMonthly: "$2,000-50,000" },
          { stream: "Brand Partnerships", description: "Endorsements and sponsorships", potentialMonthly: "$5,000-100,000" },
          { stream: "Touring", description: "Headline tours and festival slots", potentialMonthly: "$10,000-200,000" },
          { stream: "Investments", description: "Equity in brands and startups", potentialMonthly: "Variable" },
          { stream: "Label Deal", description: "Advance and royalties", potentialMonthly: "$10,000-100,000" }
        ]
      },
      businessModels: [
        "Independent with distribution (maintain 100% ownership)",
        "Label services deal (distribution + marketing support)",
        "Joint venture with label (shared ownership and resources)",
        "Traditional deal with major label (maximum resources)"
      ],
      keyPartnerships: [
        "Trap producers and beatmakers",
        "Hip-hop focused PR companies",
        "Streetwear and fashion brands",
        "Hip-hop playlist curators",
        "Video directors specializing in hip-hop"
      ],
      platformStrategy: [
        { platform: "Spotify", purpose: "Primary streaming and playlist focus", priority: "Critical" },
        { platform: "TikTok", purpose: "Viral marketing and discovery", priority: "Critical" },
        { platform: "Instagram", purpose: "Brand building and fan engagement", priority: "High" },
        { platform: "YouTube", purpose: "Music videos and long-form content", priority: "High" },
        { platform: "Apple Music", purpose: "Streaming and editorial support", priority: "Medium" }
      ],
      investmentAreas: [
        "Quality beat licensing or exclusive production",
        "Professional mixing and mastering",
        "Music video production",
        "Social media advertising",
        "PR and marketing campaigns"
      ],
      criticalMistakes: [
        "Releasing music without a marketing plan - every release needs a strategy",
        "Paying for fake streams or followers - algorithms detect this and it destroys your account",
        "Sounding exactly like the current hot artist - by the time you copy them, the trend has moved",
        "Ignoring live performance skills - this is where the real money is made",
        "Undervaluing your publishing - never sign away your publishing rights without understanding the deal",
        "Expecting overnight success - sustainable careers take 3-5 years minimum to build"
      ],
      scalingTriggers: [
        "Consistent 50,000+ streams per release - time to invest in professional PR",
        "Multiple viral TikTok moments - time to hire a social media manager",
        "Label A&Rs reaching out - time to get an entertainment lawyer before any meetings",
        "Merchandise selling consistently - time to develop a full fashion line",
        "Income exceeds $3,000/month from music - time to incorporate as a business"
      ]
    }
  }
}

function getMelodicTrapProfile(): GenreProfile {
  return {
    genre: { primary: "Melodic Trap", secondary: "Emo Trap", niche: "Melodic Hip-Hop / Emotional Trap", confidence: 90 },
    sonic: { 
      tempo: "75-90 BPM", 
      energy: "medium-high", 
      mood: "Emotional, melodic, introspective yet energetic", 
      production: "Lush guitars, ambient pads, 808s, auto-tune vocals",
      keyElements: ["Guitar loops", "Ambient textures", "Heavy auto-tune", "Emotional lyrics", "Spacious reverb"]
    },
    mbti: {
      type: "INFP",
      name: "The Emotional Architect",
      description: "You blend vulnerability with hard-hitting production. Your music creates emotional connections that transcend typical hip-hop boundaries, speaking to listeners navigating their own complex feelings.",
      strengths: ["Deep emotional connection with fans", "Cross-genre appeal", "Strong streaming performance", "Dedicated fan loyalty", "Playlist algorithm favor"],
      challenges: ["Balancing emotion with credibility", "Avoiding over-saturation of style", "Mental health demands of emotional content", "Standing out in crowded lane"],
      coreValues: ["Emotional authenticity", "Creative expression", "Connection", "Vulnerability as strength"]
    },
    transferableSkills: {
      coreCompetencies: [
        {
          skill: "Emotional Intelligence & Vulnerability",
          description: "Ability to access and articulate complex emotions authentically. Comfort with vulnerability as a tool for connection.",
          careerPaths: ["Mental Health Advocate", "Therapist/Counselor", "Life Coach", "Emotional Intelligence Trainer", "Wellness Content Creator"]
        },
        {
          skill: "Narrative Therapy & Processing",
          description: "Using storytelling to process and communicate difficult experiences. Understanding how narrative helps people heal.",
          careerPaths: ["Art Therapist", "Creative Writing Instructor", "Grief Counselor", "Trauma-Informed Practitioner", "Support Group Facilitator"]
        },
        {
          skill: "Mood Curation & Emotional Design",
          description: "Understanding how content affects emotional states. Expertise in creating experiences that support specific feelings.",
          careerPaths: ["Playlist Curator", "Mood Marketing Specialist", "Wellness App Designer", "Therapeutic Environment Designer", "Content Therapist"]
        },
        {
          skill: "Authentic Connection Building",
          description: "Creating genuine connections through shared vulnerability. Building communities around emotional experiences.",
          careerPaths: ["Community Manager", "Peer Support Specialist", "Group Facilitator", "Social Media Manager for Mental Health Brands"]
        }
      ],
      industryApplications: [
        { industry: "Mental Health & Wellness", roles: ["Mental Health Advocate", "Wellness Content Creator", "Peer Support Worker", "Recovery Coach"], whyYouFit: "Your comfort with emotional expression and understanding of how music aids processing makes you valuable for mental health initiatives seeking authentic voices." },
        { industry: "Content & Media", roles: ["Mood Playlist Curator", "Emotional Content Strategist", "Podcast Host", "Documentary Subject/Consultant"], whyYouFit: "Media companies increasingly value emotional authenticity. Your ability to create content that resonates emotionally is directly transferable to any platform." },
        { industry: "Education & Youth Services", roles: ["Youth Mentor", "Creative Arts Educator", "School Counselor Support", "After-School Program Leader"], whyYouFit: "Young people struggling with emotions need adults who understand. Your experience expressing and processing feelings through music is valuable for youth work." },
        { industry: "Brand & Marketing", roles: ["Authentic Marketing Consultant", "Gen-Z Insights Specialist", "Emotional Brand Strategist"], whyYouFit: "Brands struggle to connect emotionally with young audiences. Your understanding of what resonates authentically is valuable for marketing that doesn't feel fake." }
      ],
      portfolioCareer: "Melodic trap artists often build meaningful portfolio careers combining music with mental health advocacy, youth mentorship, and wellness content creation. Your emotional intelligence and comfort with vulnerability are increasingly valued skills. Consider partnering with mental health organizations, creating content about emotional wellness, or developing programs that use music for therapeutic purposes."
    },
    roadmap: {
      marketReality: {
        saturationLevel: "VERY HIGH - Melodic trap exploded after Juice WRLD and now every artist tries emotional content",
        industryTruth: "The streaming algorithm loves melodic trap because it gets added to mood playlists and has longer listen times. But standing out requires genuine emotional depth, not just auto-tune and sad lyrics. The most successful artists have authentic pain or stories.",
        whyMostFail: "Artists mimic the surface aesthetics (auto-tune, sad lyrics, guitar loops) without the genuine emotional foundation. Fans can sense inauthenticity immediately. Also, many burn out from constantly revisiting emotional trauma for content.",
        yourEdge: "Your specific emotional experiences are unreplicable. Find your unique emotional angle and build your entire brand around authentic expression of that experience."
      },
      differentiationStrategy: {
        positioning: "Position as an artist who creates safe spaces for emotional processing through music, not just sad songs",
        uniqueAngle: "Focus on a specific emotional territory you understand deeply - anxiety, heartbreak, growth, loss - and own that space completely",
        targetAudience: "People ages 16-28 processing complex emotions who use music for emotional regulation. Be their soundtrack for specific feelings.",
        competitiveAdvantage: "Your authentic lived experience combined with melodic ability creates unreplicable emotional connection"
      },
      phase1: {
        title: "Emotional Authenticity",
        duration: "Months 1-4",
        focus: "Developing your emotional voice and sonic palette",
        actions: [
          "Study melodic trap pioneers - Juice WRLD, Lil Uzi, Trippie Redd - understand emotional delivery",
          "Work with guitar-based producers to develop signature melodic sound",
          "Practice vocal melodies and explore auto-tune as artistic tool",
          "Write from genuine emotional experience - authenticity is everything",
          "Create visual identity that reflects emotional depth",
          "Release acoustic/stripped versions to showcase melodic ability"
        ],
        milestones: ["Core sound defined", "5 quality emotional tracks", "Visual identity established", "Initial fan response measured"]
      },
      phase2: {
        title: "Community Building",
        duration: "Months 5-9",
        focus: "Building emotional connection with audience",
        actions: [
          "Create TikTok strategy around emotional moments and relatable content",
          "Engage directly with fans about shared experiences",
          "Target Spotify playlists like Sad Songs, Life Sucks, Pollen",
          "Collaborate with other melodic artists for cross-promotion",
          "Release music addressing specific emotions - heartbreak, anxiety, growth",
          "Build Discord or community platform for direct fan connection"
        ],
        milestones: ["Playlist placements in mood-based playlists", "10,000 dedicated followers", "Engaged community established", "Streaming growth momentum"]
      },
      phase3: {
        title: "Career Monetization",
        duration: "Months 10-15",
        focus: "Converting emotional connection to sustainable career",
        actions: [
          "Launch merchandise that reflects emotional brand",
          "Book intimate live shows that enhance emotional connection",
          "Pursue sync opportunities for emotional/dramatic content",
          "Build Patreon for exclusive emotional content and direct access",
          "Collaborate with mental health initiatives for purpose and visibility",
          "Develop management relationship for business growth"
        ],
        milestones: ["Merchandise revenue established", "Live show experience refined", "Sync placement achieved", "Management secured"]
      },
      phase4: {
        title: "Sustainable Artistry",
        duration: "Months 16-24",
        focus: "Long-term career development",
        actions: [
          "Release cohesive project telling complete emotional story",
          "Build touring infrastructure for headline shows",
          "Explore production and songwriting for other artists",
          "Develop content beyond music - mental health advocacy, vlogs",
          "Pursue brand partnerships with wellness and lifestyle companies",
          "Create mentorship or artist development for similar artists"
        ],
        milestones: ["Album/EP release", "Headline tour", "Production credits", "Brand partnership", "100,000+ monthly listeners"]
      },
      revenueStreams: {
        immediate: [
          { stream: "Streaming", description: "Mood-based playlists drive consistent plays", potentialMonthly: "$200-3,000" },
          { stream: "YouTube", description: "Lyric videos and visualizers perform well in this genre", potentialMonthly: "$100-1,000" }
        ],
        shortTerm: [
          { stream: "Merchandise", description: "Emotional and aesthetic-driven merch sells well", potentialMonthly: "$1,000-15,000" },
          { stream: "Live Shows", description: "Intimate venues with emotional connection", potentialMonthly: "$1,000-10,000" },
          { stream: "Patreon/Membership", description: "Direct fan support for exclusive content", potentialMonthly: "$500-5,000" },
          { stream: "Sync Licensing", description: "Emotional tracks for film, TV, ads", potentialMonthly: "$500-20,000" }
        ],
        longTerm: [
          { stream: "Publishing", description: "Songwriting for other artists", potentialMonthly: "$2,000-30,000" },
          { stream: "Touring", description: "Headline emotional experience tours", potentialMonthly: "$5,000-100,000" },
          { stream: "Mental Health Partnerships", description: "Advocacy and brand work", potentialMonthly: "$2,000-20,000" },
          { stream: "Production Credits", description: "Creating for other melodic artists", potentialMonthly: "$2,000-20,000" }
        ]
      },
      businessModels: [
        "Fan-supported artist (Patreon, memberships, direct sales)",
        "Indie label focused on melodic/emotional music",
        "Sync-focused career (emotional music is highly licensable)",
        "Artist collective with shared emotional aesthetic"
      ],
      keyPartnerships: [
        "Guitar loop producers and melodic beatmakers",
        "Mental health organizations and initiatives",
        "Emotional/aesthetic focused playlist curators",
        "Video directors who understand emotional visuals",
        "Other melodic trap artists for community building"
      ],
      platformStrategy: [
        { platform: "Spotify", purpose: "Mood playlists are perfect for this sound", priority: "Critical" },
        { platform: "TikTok", purpose: "Emotional snippets go viral regularly", priority: "Critical" },
        { platform: "YouTube", purpose: "Lyric videos and visual albums", priority: "High" },
        { platform: "Discord", purpose: "Deep fan community building", priority: "Medium" },
        { platform: "Patreon", purpose: "Exclusive content for dedicated fans", priority: "Medium" }
      ],
      investmentAreas: [
        "Quality melodic production and guitar loops",
        "Vocal production and auto-tune processing",
        "Lyric video creation",
        "Fan community platform development",
        "Mental health awareness integration"
      ],
      criticalMistakes: [
        "Faking emotional depth - audiences sense inauthenticity immediately",
        "Constantly mining trauma without processing it - this leads to burnout and mental health crises",
        "Ignoring vocal development - melodic trap requires actual melodic ability",
        "Only releasing sad songs - show emotional range including hope and growth",
        "Neglecting fan community - your fans want connection, not just music",
        "Copying current artists too closely - develop your own emotional vocabulary"
      ],
      scalingTriggers: [
        "Fans sharing personal stories about how your music helped them - time to build direct community platform",
        "Playlist placements in mood-based playlists - time to invest more in consistent releases",
        "Mental health organizations reaching out - time to formalize advocacy work",
        "Other artists asking you to write for them - time to explore songwriting as revenue stream",
        "Consistent emotional engagement in comments - time to monetize direct fan access"
      ]
    }
  }
}

// Continue with more profiles...

function getLoFiProfile(): GenreProfile {
  return {
    genre: { primary: "Lo-Fi Hip-Hop", secondary: "Chillhop", niche: "Study Beats / Lo-Fi Chill", confidence: 91 },
    sonic: { 
      tempo: "70-90 BPM", 
      energy: "low", 
      mood: "Relaxing, nostalgic, warm, and cozy", 
      production: "Vinyl crackle, soft drums, jazz samples, warm bass",
      keyElements: ["Vinyl texture", "Jazz piano/guitar samples", "Soft boom-bap drums", "Tape saturation", "Ambient noise"]
    },
    mbti: {
      type: "INFJ",
      name: "The Atmosphere Crafter",
      description: "You create sonic spaces for focus, relaxation, and introspection. Your music serves as the soundtrack to millions of study sessions, work periods, and moments of calm reflection.",
      strengths: ["Massive functional music market", "Algorithm-friendly (long listening sessions)", "Passive income potential", "Low production costs", "Global appeal without language barriers"],
      challenges: ["Oversaturated market", "Low per-stream rates", "Difficulty standing out sonically", "Perception as background music"],
      coreValues: ["Calm", "Focus", "Nostalgia", "Service to listeners"]
    },
    transferableSkills: {
      coreCompetencies: [
        {
          skill: "Ambient Environment Design",
          description: "Understanding of how sound shapes spaces, focus, and emotional states. You design sonic environments that enhance human experience.",
          careerPaths: ["UX Sound Designer", "Spatial Audio Designer", "Workplace Experience Designer", "Meditation App Sound Designer", "Hospitality Sound Consultant"]
        },
        {
          skill: "Attention Economy Expertise",
          description: "Deep understanding of how people consume content in the background, optimizing for long listening sessions and passive engagement.",
          careerPaths: ["Podcast Producer", "Content Strategist", "User Engagement Specialist", "Streaming Platform Consultant", "Audio Content Curator"]
        },
        {
          skill: "Sampling & Creative Curation",
          description: "Ability to find, curate, and repurpose existing content into new creative works. Understanding copyright and licensing.",
          careerPaths: ["Music Supervisor", "Content Curator", "Creative Researcher", "Archive Specialist", "Sample Library Developer"]
        },
        {
          skill: "Functional Product Design",
          description: "Creating products that serve a specific purpose (focus, relaxation, study). Understanding user needs and designing for utility.",
          careerPaths: ["Product Designer", "UX Researcher", "Wellness Product Developer", "EdTech Designer", "App Developer"]
        }
      ],
      industryApplications: [
        { industry: "Wellness & Mental Health", roles: ["Sound Therapist", "Meditation App Designer", "Wellness Content Creator", "Sleep Audio Specialist"], whyYouFit: "Your understanding of how sound affects mood, focus, and relaxation is directly applicable to the booming wellness industry. Apps like Calm and Headspace need this expertise." },
        { industry: "Workspace & Productivity", roles: ["Office Sound Designer", "Productivity Consultant", "Co-working Space Audio Designer"], whyYouFit: "Companies are increasingly aware that sound environment affects productivity. Your expertise in creating focus-enhancing audio environments is valuable for modern workplaces." },
        { industry: "Gaming & Interactive Media", roles: ["Ambient Sound Designer", "Game Audio Designer", "Interactive Music Composer"], whyYouFit: "Games need atmospheric, loopable music that enhances experience without distracting. Your lo-fi skills translate directly to ambient game audio." },
        { industry: "Hospitality & Retail", roles: ["Restaurant Audio Consultant", "Retail Atmosphere Designer", "Hotel Experience Designer"], whyYouFit: "Businesses know ambiance affects customer experience. Your understanding of sonic atmospheres is valuable for designing spaces that feel right." }
      ],
      portfolioCareer: "Lo-fi producers often build portfolio careers combining beat-making with sound design, licensing, and functional audio products. Consider creating study music for educational platforms, focus audio for productivity apps, or ambient soundscapes for commercial spaces. Your skills in creating calming, non-intrusive audio are increasingly valuable as the world seeks relief from noise."
    },
    roadmap: {
      marketReality: {
        saturationLevel: "EXTREME - Hundreds of thousands of lo-fi beats uploaded daily. The genre is one of the most saturated in music.",
        industryTruth: "Per-stream rates are low because lo-fi tracks often end up on algorithmic playlists paying 0.001-0.002 per stream. You cannot build sustainable income from streaming alone in lo-fi. The money is in licensing, B2B deals, and building owned assets.",
        whyMostFail: "Producers release beats and wait for Spotify to do the work. They compete on sound alone in a genre where sounds are incredibly similar. They ignore the real money - licensing to apps, content creators, and building owned 24/7 streams.",
        yourEdge: "Build owned audience (YouTube channel, email list) and B2B relationships. While others chase playlists, build direct relationships with apps, content creators, and businesses who need background music."
      },
      differentiationStrategy: {
        positioning: "Position as a professional background music provider for specific use cases rather than just another lo-fi producer",
        uniqueAngle: "Specialize in a specific niche within lo-fi - study music for specific subjects, sleep music, productivity for specific professions, or pair with specific aesthetics",
        targetAudience: "Content creators who need royalty-free music, app developers needing in-app audio, and brands wanting calm sonic identities",
        competitiveAdvantage: "Professionalism, reliability, and business thinking. Most lo-fi producers are hobbyists - be the professional option."
      },
      phase1: {
        title: "Catalog Building",
        duration: "Months 1-3",
        focus: "Building a substantial library of quality beats",
        actions: [
          "Create 50+ lo-fi beats - quantity matters in this genre for playlist consideration",
          "Develop signature sound while staying within genre conventions",
          "Master lo-fi production techniques - vinyl effects, tape saturation, subtle variation",
          "Study successful lo-fi artists - Idealism, j'san, Kupla - understand what works",
          "Create consistent visual aesthetic - anime scenes, rainy windows, cozy rooms",
          "Upload consistently to YouTube and streaming platforms"
        ],
        milestones: ["50 beats produced", "Consistent upload schedule", "Visual style defined", "Initial streaming presence"]
      },
      phase2: {
        title: "Playlist Strategy",
        duration: "Months 4-8",
        focus: "Securing playlist placements for passive growth",
        actions: [
          "Submit to Spotify editorial playlists - Lo-Fi Beats, Jazz Vibes, Deep Focus",
          "Connect with lo-fi playlist curators and labels (Chillhop, Lofi Girl)",
          "Create 24/7 lo-fi stream on YouTube (major traffic driver)",
          "Build presence on lo-fi-focused platforms and communities",
          "Collaborate with other lo-fi producers for playlist network effects",
          "Submit to study-focused apps - Forest, Tide, Focus@Will"
        ],
        milestones: ["Major playlist placement", "24/7 stream established", "Label submission", "10,000 monthly listeners"]
      },
      phase3: {
        title: "Revenue Diversification",
        duration: "Months 9-14",
        focus: "Building multiple income streams from catalog",
        actions: [
          "Launch beat licensing for content creators (YouTube, Twitch, podcasts)",
          "Create sample packs and drum kits for other producers",
          "Pursue sync licensing for apps, games, and background music",
          "Develop Patreon with exclusive beats and production content",
          "Build Bandcamp following for direct sales",
          "Explore audio NFTs and web3 music platforms"
        ],
        milestones: ["Licensing income established", "Sample pack released", "Sync placement", "Diversified revenue streams"]
      },
      phase4: {
        title: "Brand & Scale",
        duration: "Months 15-24",
        focus: "Building lo-fi brand and expanding reach",
        actions: [
          "Launch lo-fi label or collective to develop other artists",
          "Create merchandise around your aesthetic and brand",
          "Partner with productivity and wellness apps",
          "Develop long-form content (full album experiences)",
          "Explore live lo-fi performances and events",
          "License catalog to background music services"
        ],
        milestones: ["Label/collective established", "App partnership", "Merchandise launch", "100,000+ monthly listeners"]
      },
      revenueStreams: {
        immediate: [
          { stream: "YouTube Ad Revenue", description: "24/7 streams and beat videos generate consistent views", potentialMonthly: "$100-2,000" },
          { stream: "Streaming", description: "Playlist placements drive long listening sessions", potentialMonthly: "$100-1,500" }
        ],
        shortTerm: [
          { stream: "Beat Licensing", description: "License beats to YouTubers, streamers, podcasters", potentialMonthly: "$500-5,000" },
          { stream: "Sample Packs", description: "Sell lo-fi drum kits, loops, and samples", potentialMonthly: "$300-3,000" },
          { stream: "Patreon", description: "Exclusive beats and production tutorials", potentialMonthly: "$200-2,000" },
          { stream: "Bandcamp Sales", description: "Direct album and beat tape sales", potentialMonthly: "$100-1,000" }
        ],
        longTerm: [
          { stream: "Sync Licensing", description: "Background music for apps, games, commercials", potentialMonthly: "$500-10,000" },
          { stream: "Background Music Services", description: "License catalog to Epidemic Sound, Musicbed", potentialMonthly: "$500-5,000" },
          { stream: "App Partnerships", description: "Exclusive music for productivity apps", potentialMonthly: "$1,000-10,000" },
          { stream: "Label Revenue", description: "Revenue from artists you develop", potentialMonthly: "$500-5,000" }
        ]
      },
      businessModels: [
        "Catalog-based passive income (build and license library)",
        "Content creator services (beats for YouTubers)",
        "Label/collective model (develop other artists)",
        "B2B licensing focus (apps, services, brands)"
      ],
      keyPartnerships: [
        "Lofi Girl, Chillhop, and other lo-fi labels",
        "YouTube content creators needing background music",
        "Productivity and meditation apps",
        "Lo-fi playlist curators on all platforms",
        "Visual artists for consistent aesthetic"
      ],
      platformStrategy: [
        { platform: "YouTube", purpose: "24/7 streams and beat videos - major traffic source", priority: "Critical" },
        { platform: "Spotify", purpose: "Playlist placements for passive streaming", priority: "Critical" },
        { platform: "Bandcamp", purpose: "Direct sales and supporter releases", priority: "High" },
        { platform: "Patreon", purpose: "Exclusive content and community", priority: "Medium" },
        { platform: "Instagram", purpose: "Visual aesthetic and community", priority: "Medium" }
      ],
      investmentAreas: [
        "Quality samples and VST plugins",
        "YouTube channel optimization",
        "Visual asset creation (animations, loops)",
        "Playlist pitching services",
        "Website for licensing inquiries"
      ],
      criticalMistakes: [
        "Relying solely on Spotify playlist placements - the income is too low to sustain a career",
        "Not building direct audience relationships - you need owned channels (YouTube, email)",
        "Ignoring B2B opportunities - apps and content creators pay far more than streaming",
        "Competing on sound alone in an indistinguishable genre",
        "Not creating visual assets - lo-fi is as much visual as audio",
        "Failing to diversify revenue - multiple small streams beat one unreliable stream"
      ],
      scalingTriggers: [
        "YouTube channel hits 1,000 subscribers - time to create 24/7 stream",
        "Content creators asking for custom beats - time to create licensing page with clear pricing",
        "Consistent 10,000+ monthly listeners - time to submit to background music services",
        "App developers reaching out - time to create B2B offerings and rate cards",
        "Community forming around your streams - time to monetize through Patreon or membership"
      ]
    }
  }
}

function getHouseProfile(): GenreProfile {
  return {
    genre: { primary: "House", secondary: "Deep House", niche: "House Music / Four-on-the-Floor", confidence: 88 },
    sonic: { 
      tempo: "120-128 BPM", 
      energy: "medium-high", 
      mood: "Groovy, uplifting, warm, and dancefloor-focused", 
      production: "Four-on-the-floor kick, funky basslines, vocal chops, house piano",
      keyElements: ["4/4 kick pattern", "Offbeat hi-hats", "Funky bass", "Disco samples", "Vocal hooks"]
    },
    mbti: {
      type: "ENFP",
      name: "The Groove Architect",
      description: "You understand the dancefloor like few others. Your music builds community through shared physical experience, creating moments of collective joy that transcend the everyday.",
      strengths: ["Global club and festival circuit", "Strong DJ culture infrastructure", "Timeless genre with consistent demand", "International appeal", "Multiple subgenre niches"],
      challenges: ["Requires DJ skills alongside production", "Competitive market with established names", "Need for consistent quality releases", "Touring demands"],
      coreValues: ["Community", "Joy", "Movement", "Connection through dance"]
    },
    transferableSkills: {
      coreCompetencies: [
        {
          skill: "Live Event Production & Performance",
          description: "Experience performing live, reading crowds, and creating shared experiences. Understanding of event flow and energy management.",
          careerPaths: ["Event Director", "Festival Programmer", "Live Entertainment Producer", "DJ Mentor", "Club Night Curator"]
        },
        {
          skill: "Community Building & Scene Development",
          description: "Deep understanding of how music communities form and thrive. Experience building genuine connections within subculture ecosystems.",
          careerPaths: ["Community Manager", "Brand Community Lead", "Cultural Event Producer", "Scene Documentary Filmmaker", "Music Journalist"]
        },
        {
          skill: "Technical Audio & Sound System Knowledge",
          description: "Understanding of live sound, club systems, mixing, and how music translates to physical spaces.",
          careerPaths: ["Live Sound Engineer", "Club Sound Designer", "Audio Installation Artist", "Sound System Consultant", "Festival Technical Director"]
        },
        {
          skill: "International Networking & Cultural Navigation",
          description: "Experience building relationships across cities, countries, and cultures. Understanding how to operate in different markets.",
          careerPaths: ["International Booker", "Touring Manager", "Cultural Exchange Producer", "Export Music Consultant", "Global Event Coordinator"]
        }
      ],
      industryApplications: [
        { industry: "Events & Hospitality", roles: ["Venue Music Director", "Festival Curator", "Club General Manager", "Event Experience Designer"], whyYouFit: "Your understanding of how music creates atmosphere, builds community, and drives business is valuable for any venue or event operation seeking to create compelling experiences." },
        { industry: "Fitness & Wellness", roles: ["Fitness Music Curator", "Spin Class Music Director", "Workout Playlist Specialist", "Gym Audio Consultant"], whyYouFit: "House music's consistent tempo and energy makes it perfect for fitness. Your understanding of BPM, energy flow, and motivation translates directly to workout programming." },
        { industry: "Brands & Marketing", roles: ["Brand Experience Designer", "Experiential Marketing Manager", "Sonic Brand Strategist", "Lifestyle Brand Consultant"], whyYouFit: "Brands increasingly invest in experiences over advertising. Your expertise in creating shared moments through music is exactly what experiential marketing needs." },
        { industry: "Tourism & Nightlife", roles: ["Nightlife Tourism Consultant", "City Music Strategy Advisor", "Cultural Tourism Developer"], whyYouFit: "Cities like Berlin, Ibiza, and Amsterdam prove nightlife drives tourism. Your scene knowledge is valuable for destinations developing music tourism strategies." }
      ],
      portfolioCareer: "House music DJs often build careers combining performance with event curation, brand work, and music direction roles. Consider curating playlists for fitness brands, consulting for venues on sound and programming, or developing nightlife experiences for hotels and hospitality groups. Your understanding of dancefloor dynamics translates to any environment seeking to create energetic, communal experiences."
    },
    roadmap: {
      marketReality: {
        saturationLevel: "HIGH - House music is one of the oldest electronic genres with millions of tracks and established gatekeepers",
        industryTruth: "In house music, DJ fees are where real money is made - not streaming. A single festival set can earn more than a year of streaming. However, getting those bookings requires both production credentials AND DJ reputation. Label releases provide credibility, DJing provides income.",
        whyMostFail: "Producers focus only on making tracks and ignore DJ skills. They release music without building scene connections. House is a community-driven genre - you need to be part of the scene, not just upload to Beatport and hope.",
        yourEdge: "Build genuine scene relationships and develop both production AND performance skills. The artists who succeed are both skilled producers and compelling performers with real community ties."
      },
      differentiationStrategy: {
        positioning: "Position as both a producer and DJ with a distinct sonic signature - be known for a specific sound within house",
        uniqueAngle: "Develop a recognizable production element or DJ style that makes you identifiable. This could be a specific bassline style, vocal approach, or mixing technique.",
        targetAudience: "Start with your local scene and one specific subgenre community. Dominate that niche before expanding.",
        competitiveAdvantage: "Reliability, professionalism, and genuine scene involvement. Most emerging artists are flaky - be the one promoters can count on."
      },
      phase1: {
        title: "Craft Development",
        duration: "Months 1-4",
        focus: "Mastering house production and DJ skills",
        actions: [
          "Study house music history and subgenres - understand the lineage",
          "Master house production - groove, mixdown, arrangement",
          "Develop DJ skills - mixing, reading crowds, track selection",
          "Build a catalog of original tracks and bootlegs",
          "Record DJ mixes showcasing your taste and skills",
          "Connect with local house music community"
        ],
        milestones: ["10 quality original tracks", "DJ mixing proficiency", "First recorded mixes", "Local scene connections"]
      },
      phase2: {
        title: "Label Integration",
        duration: "Months 5-9",
        focus: "Securing releases and building credibility",
        actions: [
          "Submit demos to respected house labels (Defected, Toolroom, Anjunadeep)",
          "Build Beatport presence through initial releases",
          "Create SoundCloud following with mixes and bootlegs",
          "Build Resident Advisor profile and reviews",
          "Start booking local DJ gigs and residencies",
          "Collaborate with other producers and vocalists"
        ],
        milestones: ["First label release", "Beatport charting", "Local residency", "RA profile established"]
      },
      phase3: {
        title: "Touring Foundation",
        duration: "Months 10-15",
        focus: "Building DJ career and revenue streams",
        actions: [
          "Pursue bookings beyond local scene - regional, national",
          "Submit to house music festivals (Defected Croatia, ADE)",
          "Build remix portfolio with official remix releases",
          "Create production tutorials and sample packs",
          "Develop Patreon with exclusive mixes and production content",
          "Build relationships with booking agents"
        ],
        milestones: ["Non-local bookings", "Festival submission", "Remix release", "Tutorial/sample pack income"]
      },
      phase4: {
        title: "International Circuit",
        duration: "Months 16-24",
        focus: "Establishing international presence",
        actions: [
          "Target international markets - Ibiza, Europe, USA, Asia",
          "Secure booking agency representation",
          "Develop signature sound that's recognizable",
          "Create your own event series or label",
          "Build touring infrastructure for consistent international work",
          "Mentor upcoming producers through your platform"
        ],
        milestones: ["International bookings", "Agency representation", "Own events/label", "Consistent touring income"]
      },
      revenueStreams: {
        immediate: [
          { stream: "Local DJ Gigs", description: "Club nights, private parties, bar residencies", potentialMonthly: "$200-2,000" },
          { stream: "SoundCloud/Mixcloud", description: "Building following through mixes", potentialMonthly: "$0-200" }
        ],
        shortTerm: [
          { stream: "Label Releases", description: "Royalties from official releases", potentialMonthly: "$100-2,000" },
          { stream: "DJ Fees", description: "Regular club and event bookings", potentialMonthly: "$1,000-10,000" },
          { stream: "Beatport Sales", description: "Direct track sales to DJs", potentialMonthly: "$200-2,000" },
          { stream: "Remix Commissions", description: "Paid remixes for labels and artists", potentialMonthly: "$500-5,000" }
        ],
        longTerm: [
          { stream: "Festival Fees", description: "Major festival and event bookings", potentialMonthly: "$5,000-50,000" },
          { stream: "Touring", description: "International DJ tours", potentialMonthly: "$10,000-100,000" },
          { stream: "Sample Packs/Presets", description: "Production resources for other producers", potentialMonthly: "$500-5,000" },
          { stream: "Own Label/Events", description: "Revenue from your platform", potentialMonthly: "$2,000-20,000" },
          { stream: "Production Courses", description: "Teaching house production online", potentialMonthly: "$1,000-10,000" }
        ]
      },
      businessModels: [
        "Touring DJ artist (primary income from performances)",
        "Label artist with production focus",
        "Event promoter and DJ hybrid",
        "Production educator with DJ career"
      ],
      keyPartnerships: [
        "House music labels (Defected, Toolroom, Dirtybird)",
        "DJ booking agencies",
        "Club promoters and venue owners",
        "Vocalists and collaborators",
        "Production tool companies (Native Instruments, Splice)"
      ],
      platformStrategy: [
        { platform: "SoundCloud", purpose: "DJ mixes and unreleased tracks", priority: "Critical" },
        { platform: "Beatport", purpose: "Official releases and DJ sales", priority: "Critical" },
        { platform: "Resident Advisor", purpose: "Professional profile and reviews", priority: "High" },
        { platform: "Instagram", purpose: "Behind-the-scenes and gig promotion", priority: "High" },
        { platform: "Spotify", purpose: "Original productions and playlisting", priority: "Medium" }
      ],
      investmentAreas: [
        "DJ equipment (CDJs, mixer, controller)",
        "Production software and plugins",
        "Demo mastering services",
        "Press photos and EPK materials",
        "Travel for initial bookings"
      ],
      criticalMistakes: [
        "Focusing only on production while neglecting DJ skills - house is a DJ-driven genre",
        "Ignoring scene politics and community relationships - this is a networking-heavy industry",
        "Submitting demos to labels you don't actually know - build relationships first",
        "Playing for free too long - know when you have enough value to charge",
        "Chasing trends instead of developing your own sound - signature sounds build careers",
        "Neglecting your Resident Advisor profile - this is essential for credibility in the scene"
      ],
      scalingTriggers: [
        "First label release with good reception - time to build remix portfolio",
        "Consistent local bookings - time to approach regional promoters",
        "Multiple releases on respected labels - time to approach booking agencies",
        "Regular DJ income covering costs - time to invest in better production",
        "International interest from promoters - time to plan touring infrastructure"
      ]
    }
  }
}

function getDrumAndBassProfile(): GenreProfile {
  return {
    genre: { primary: "Drum and Bass", secondary: "DnB", niche: "Jump Up / Mainstream DnB", confidence: 91 },
    sonic: { 
      tempo: "170-180 BPM", 
      energy: "very high", 
      mood: "Energetic, intense, adrenaline-fueled", 
      production: "Fast breakbeats, heavy bass, aggressive synths",
      keyElements: ["Amen break variations", "Reese bass", "Sub bass drops", "Chopped vocals", "Filtered builds"]
    },
    mbti: {
      type: "INTP",
      name: "The Breakbeat Scientist",
      description: "You engineer intricate rhythms at blistering tempos. Your technical precision and understanding of bass frequencies create intense experiences that demand physical response from every listener.",
      strengths: ["Dedicated global community", "Strong UK and EU festival circuit", "Technical respect and credibility", "Passionate fanbase", "Growing mainstream crossover"],
      challenges: ["Technical production demands", "Niche mainstream appeal in some markets", "Competitive scene with established legends", "Physical demands of high-energy performance"],
      coreValues: ["Technical excellence", "Bass culture", "Rave community", "Energy and intensity"]
    },
    transferableSkills: {
      coreCompetencies: [
        {
          skill: "Complex Systems Thinking & Technical Precision",
          description: "Ability to manage intricate, fast-moving systems with multiple variables. DnB production requires exceptional attention to detail and technical mastery.",
          careerPaths: ["Audio Engineer", "Software QA Engineer", "Technical Director", "Systems Analyst", "Precision Manufacturing Consultant"]
        },
        {
          skill: "High-Pressure Performance & Split-Second Decision Making",
          description: "Experience performing under intense pressure, making rapid decisions, and maintaining composure in high-energy environments.",
          careerPaths: ["Live Broadcast Director", "Emergency Response Coordinator", "Trading Floor Analyst", "Air Traffic Controller", "Sports Commentator"]
        },
        {
          skill: "Sound Design & Advanced Audio Engineering",
          description: "Deep expertise in bass frequencies, sound design, and audio manipulation. Understanding of psychoacoustics and how sound affects physiology.",
          careerPaths: ["Sound Designer for Film/Games", "Audio Plugin Developer", "Mastering Engineer", "Subwoofer System Designer", "Audio Research Scientist"]
        },
        {
          skill: "Subculture Community Leadership",
          description: "Experience navigating and leading within tight-knit subcultures with their own codes, hierarchies, and authenticity standards.",
          careerPaths: ["Community Manager", "Subculture Consultant", "Scene Historian/Documentarian", "Underground Marketing Specialist", "Cultural Anthropologist"]
        }
      ],
      industryApplications: [
        { industry: "Gaming & Interactive Media", roles: ["Game Audio Director", "Sound Effects Designer", "Interactive Music Composer", "VR Audio Specialist"], whyYouFit: "Your expertise in high-energy, complex audio and bass design translates directly to gaming. DnB production skills are highly valued for action games and immersive experiences." },
        { industry: "Film & Post-Production", roles: ["Foley Artist", "Sound Designer", "Trailer Music Composer", "Action Sequence Audio Specialist"], whyYouFit: "Your understanding of tension, release, and bass impact translates directly to film sound design. Action and thriller productions need this expertise." },
        { industry: "Audio Technology", roles: ["Speaker System Engineer", "Audio Plugin Developer", "Mastering Algorithm Designer", "Sound System Consultant"], whyYouFit: "Your deep understanding of bass frequencies and how audio translates to physical systems is valuable for audio hardware and software companies." },
        { industry: "Live Events & Festivals", roles: ["Festival Sound Director", "Rave Production Manager", "Sound System Designer", "Stage Manager"], whyYouFit: "Your experience in high-energy environments with massive sound systems positions you perfectly for festival and event production roles." }
      ],
      portfolioCareer: "DnB producers often develop parallel careers in audio engineering, sound design for games and film, and sound system consultancy. Your technical precision and understanding of bass frequencies is highly specialized knowledge. Consider sample pack creation, production tutorials, or audio plugin development as ways to monetize your expertise beyond performance."
    },
    roadmap: {
      marketReality: {
        saturationLevel: "MEDIUM-HIGH - DnB has a loyal but niche audience with established gatekeepers and strong scene politics",
        industryTruth: "DnB is a meritocracy where technical skill is highly valued. The scene respects craft and innovation. Unlike other genres, DnB fans actually buy music on Beatport. However, breaking through requires both production excellence AND performance ability. The money is in DJ fees at festivals and raves.",
        whyMostFail: "Producers underestimate the technical demands of DnB production - it's one of the hardest genres to master. They also fail to integrate into the tight-knit community. DnB fans can spot outsiders immediately.",
        yourEdge: "Technical excellence combined with genuine scene involvement. DnB rewards dedication and innovation more than most genres. If you truly master the craft and build community ties, opportunities follow."
      },
      differentiationStrategy: {
        positioning: "Develop expertise in a specific DnB subgenre (liquid, neuro, jungle, jump-up) rather than trying to do everything",
        uniqueAngle: "Create a signature bass sound or drum programming style that becomes your sonic trademark",
        targetAudience: "Core DnB fans who attend events and buy music. This is a quality-over-quantity audience.",
        competitiveAdvantage: "Technical precision and genuine love for the genre. DnB fans can tell who's authentic and who's a tourist."
      },
      phase1: {
        title: "Technical Foundation",
        duration: "Months 1-4",
        focus: "Mastering DnB production and DJ skills",
        actions: [
          "Study DnB production masters - understand drum programming, bass design, mixing",
          "Master the Amen break and breakbeat programming",
          "Develop signature bass sounds and synth patches",
          "Build DJ skills specific to DnB mixing (fast mixing, doubles)",
          "Create promotional mixes showcasing your style",
          "Connect with DnB communities online and locally"
        ],
        milestones: ["Technical proficiency achieved", "10 quality tracks", "DJ mixing mastered", "Community connections"]
      },
      phase2: {
        title: "Label Strategy",
        duration: "Months 5-9",
        focus: "Securing releases on respected labels",
        actions: [
          "Submit demos to DnB labels (Hospital, RAM, Liquicity, Viper)",
          "Build Beatport and streaming presence",
          "Create SoundCloud following with free downloads and mixes",
          "Collaborate with MCs for vocal tracks",
          "Start booking local DnB nights",
          "Enter remix competitions and track competitions"
        ],
        milestones: ["First label release", "Local DJ bookings", "MC collaboration", "Growing online following"]
      },
      phase3: {
        title: "Scene Integration",
        duration: "Months 10-15",
        focus: "Becoming established in the DnB scene",
        actions: [
          "Build relationships with promoters and event organizers",
          "Pursue festival submissions (Let It Roll, Hospitality)",
          "Develop sample packs and production resources",
          "Create production tutorials for YouTube/Patreon",
          "Build remix portfolio with official releases",
          "Connect with DnB booking agencies"
        ],
        milestones: ["Festival submission", "Sample pack release", "Consistent gig schedule", "Agency interest"]
      },
      phase4: {
        title: "International Circuit",
        duration: "Months 16-24",
        focus: "Building international DnB career",
        actions: [
          "Target European DnB market (strongest globally)",
          "Pursue Australian, NZ, and Asian markets",
          "Secure booking agency representation",
          "Release artist album showcasing full range",
          "Develop live elements or live show",
          "Create your own events or label"
        ],
        milestones: ["International bookings", "Agency representation", "Album release", "Own events/label"]
      },
      revenueStreams: {
        immediate: [
          { stream: "Local DJ Gigs", description: "DnB nights and rave events", potentialMonthly: "£200-1,500" },
          { stream: "SoundCloud Free Downloads", description: "Build following (leads to income)", potentialMonthly: "£0" }
        ],
        shortTerm: [
          { stream: "Label Releases", description: "EP and single royalties", potentialMonthly: "£100-1,500" },
          { stream: "DJ Fees", description: "Regular DnB event bookings", potentialMonthly: "£500-5,000" },
          { stream: "Beatport Sales", description: "Track sales to other DJs", potentialMonthly: "£200-1,500" },
          { stream: "Sample Packs", description: "DnB specific sounds and drums", potentialMonthly: "£200-2,000" }
        ],
        longTerm: [
          { stream: "Festival Fees", description: "Major DnB festival bookings", potentialMonthly: "£3,000-30,000" },
          { stream: "International Touring", description: "European and global DJ tours", potentialMonthly: "£5,000-50,000" },
          { stream: "Production Tutorials", description: "DnB production courses", potentialMonthly: "£500-5,000" },
          { stream: "Own Label", description: "Revenue from your imprint", potentialMonthly: "£1,000-10,000" },
          { stream: "Remix Commissions", description: "Paid remixes for labels", potentialMonthly: "£500-5,000" }
        ]
      },
      businessModels: [
        "Touring DJ/producer (performance-focused)",
        "Label artist with production catalog",
        "Production educator and resources creator",
        "Label owner and scene developer"
      ],
      keyPartnerships: [
        "DnB labels (Hospital, RAM, Viper, Shogun)",
        "MCs for vocal collaborations",
        "DnB promoters and event organizers",
        "Booking agencies specializing in bass music",
        "Other DnB producers for collabs and support"
      ],
      platformStrategy: [
        { platform: "SoundCloud", purpose: "Free downloads and mix uploads - essential for DnB", priority: "Critical" },
        { platform: "Beatport", purpose: "Official releases and DJ charts", priority: "Critical" },
        { platform: "YouTube", purpose: "Music videos and production content", priority: "High" },
        { platform: "Instagram", purpose: "Gig promotion and scene presence", priority: "High" },
        { platform: "Spotify", purpose: "Streaming and playlist reach", priority: "Medium" }
      ],
      investmentAreas: [
        "Quality plugins for bass and drum design",
        "Professional mixdown and mastering",
        "DJ equipment for live performances",
        "Press photos and visual assets",
        "Travel budget for initial bookings"
      ],
      criticalMistakes: [
        "Releasing subpar productions - DnB fans have high technical standards and will dismiss weak productions",
        "Not learning to DJ properly - you need both production and performance skills in this scene",
        "Ignoring the community - DnB is a tight scene where reputation matters enormously",
        "Chasing other genre trends - stay focused on mastering DnB rather than diluting your sound",
        "Not supporting other artists - the scene notices who shows up to events and supports others",
        "Pricing yourself wrong - know the going rates and don't undercut yourself or price yourself out"
      ],
      scalingTriggers: [
        "First release with positive feedback from established DnB figures - time to push for bigger labels",
        "Consistent local bookings with good crowd response - time to approach regional promoters",
        "Label releases charting on Beatport - time to approach booking agencies",
        "International inquiries from promoters - time to plan European touring strategy",
        "Sample pack sales or tutorial engagement - time to develop education business"
      ]
    }
  }
}

function getAfrobeatsProfile(): GenreProfile {
  return {
    genre: { primary: "Afrobeats", secondary: "Afropop", niche: "Nigerian Afrobeats / Afrofusion", confidence: 90 },
    sonic: { 
      tempo: "95-115 BPM", 
      energy: "medium-high", 
      mood: "Joyful, rhythmic, celebratory, and sensual", 
      production: "African percussion, log drums, talking drums, bouncy basslines",
      keyElements: ["Talking drums", "African percussion", "Log drum patterns", "Melodic vocals", "Rhythmic guitar"]
    },
    mbti: {
      type: "ESFP",
      name: "The Rhythm Ambassador",
      description: "You channel the infectious energy of African rhythms into globally appealing music. Your sound bridges continents, bringing the joy and celebration of Afrobeats to audiences worldwide.",
      strengths: ["Fastest growing genre globally", "Strong cultural identity", "Massive African diaspora audience", "International crossover success", "Festival and brand demand"],
      challenges: ["Competitive Nigerian scene", "Need for authentic connections", "Balancing tradition with innovation", "Geographic distance from scene center"],
      coreValues: ["Joy", "Cultural pride", "Global connection", "Celebration of life"]
    },
    transferableSkills: {
      coreCompetencies: [
        {
          skill: "Cross-Cultural Communication & Bridge Building",
          description: "Ability to navigate between cultures, translate experiences across contexts, and build bridges between different communities.",
          careerPaths: ["DEI Consultant", "Cultural Liaison", "International Relations Specialist", "Cross-Cultural Trainer", "Diaspora Community Organizer"]
        },
        {
          skill: "Global Cultural Intelligence",
          description: "Deep understanding of how African culture intersects with global markets. Expertise in what resonates across cultural boundaries.",
          careerPaths: ["Africa Market Entry Consultant", "Cultural Strategy Advisor", "Global Marketing Specialist", "International Brand Manager", "Cultural Export Specialist"]
        },
        {
          skill: "Dance & Movement Cultural Knowledge",
          description: "Understanding of how dance, music, and movement intersect in African cultures. Expertise in viral dance phenomena.",
          careerPaths: ["Choreography Consultant", "Dance Marketing Specialist", "Fitness Music Director", "Cultural Dance Instructor", "TikTok Strategy Consultant"]
        },
        {
          skill: "Diaspora Community Engagement",
          description: "Expertise in reaching and engaging diaspora communities. Understanding of between-culture identity and experiences.",
          careerPaths: ["Diaspora Marketing Manager", "Community Engagement Director", "Cultural Event Producer", "Immigration Services Liaison", "Heritage Tourism Developer"]
        }
      ],
      industryApplications: [
        { industry: "Corporate DEI & Africa Strategy", roles: ["Africa Desk Advisor", "DEI Cultural Consultant", "Emerging Markets Specialist", "African Diaspora Marketing Lead"], whyYouFit: "Companies expanding into African markets or engaging African diaspora communities need authentic cultural advisors. Your understanding of the culture is invaluable." },
        { industry: "Fashion & Beauty", roles: ["African Fashion Consultant", "Inclusive Beauty Advisor", "Cultural Stylist", "Trend Forecaster for African Markets"], whyYouFit: "The global fashion industry is increasingly looking to Africa for inspiration. Your cultural knowledge positions you as an authentic guide for brands seeking to engage respectfully." },
        { industry: "Tech & Fintech", roles: ["Africa Market Product Manager", "Fintech Community Manager", "African User Research Specialist"], whyYouFit: "Tech companies are investing heavily in African markets. Your cultural understanding helps build products and services that actually resonate with African users." },
        { industry: "Media & Entertainment", roles: ["Afrobeats A&R", "African Content Curator", "Cultural Programming Director", "International Music Supervisor"], whyYouFit: "The entertainment industry is hungry for African content and expertise. Your position as a cultural insider makes you valuable for content acquisition and development." }
      ],
      portfolioCareer: "Afrobeats artists are uniquely positioned to build careers bridging Africa and the global market. Consider cultural consultancy for brands entering African markets, diaspora community engagement, or becoming a voice for African culture in international media. Your cultural authenticity is increasingly valuable as the world turns attention to Africa's creative economy."
    },
    roadmap: {
      marketReality: {
        saturationLevel: "HIGH in Nigeria, GROWING OPPORTUNITY internationally - Afrobeats is the fastest-growing genre globally with huge runway",
        industryTruth: "The real competition is in Lagos where thousands of talented artists fight for attention. However, the diaspora market (UK, US, Europe) has massive demand with less competition. International Afrobeats success often starts in diaspora communities, not Nigeria.",
        whyMostFail: "Artists without authentic cultural connection get exposed quickly - Afrobeats fans can tell who's genuine. Also, many focus on sound without understanding the culture, dance, and community aspects that drive Afrobeats virality.",
        yourEdge: "If you have genuine cultural connection, leverage it authentically. If you don't, collaborate with those who do. The diaspora angle is powerful - represent your specific African community's story."
      },
      differentiationStrategy: {
        positioning: "Position as the voice of a specific diaspora community or cultural angle rather than generic Afrobeats",
        uniqueAngle: "Blend your specific cultural heritage with contemporary Afrobeats - Nigerian-British, Ghanaian-American, etc. This fusion is unique and authentic.",
        targetAudience: "Start with your specific diaspora community. They want artists who represent their experience of being between cultures.",
        competitiveAdvantage: "Your specific cultural blend cannot be replicated. Lean into what makes your experience unique rather than trying to sound like Lagos artists."
      },
      phase1: {
        title: "Cultural Foundation",
        duration: "Months 1-4",
        focus: "Developing authentic Afrobeats sound",
        actions: [
          "Study Afrobeats masters - Burna Boy, Wizkid, Davido, Tems - understand the formula",
          "Connect with African producers for authentic production",
          "Learn about the culture and history behind the music",
          "Develop your melodic and vocal style",
          "Create content that connects with African diaspora",
          "Build presence on platforms popular in Africa"
        ],
        milestones: ["Authentic sound developed", "Producer relationships", "Cultural understanding", "Initial content creation"]
      },
      phase2: {
        title: "Diaspora Connection",
        duration: "Months 5-9",
        focus: "Building audience in diaspora communities",
        actions: [
          "Target African diaspora communities in US, UK, Europe",
          "Create TikTok content with Afrobeats dance challenges",
          "Connect with Afrobeats playlist curators",
          "Collaborate with other Afrobeats artists",
          "Perform at Afrobeats nights and cultural events",
          "Build relationships with Afrobeats media and blogs"
        ],
        milestones: ["Diaspora audience established", "Playlist placements", "Live performance experience", "Media coverage"]
      },
      phase3: {
        title: "Global Expansion",
        duration: "Months 10-15",
        focus: "Crossing over to mainstream markets",
        actions: [
          "Pursue collaborations with mainstream artists",
          "Target mainstream playlist placements",
          "Build relationships with major labels interested in Afrobeats",
          "Perform at major festivals with Afrobeats stages",
          "Develop merchandise around your brand",
          "Explore sync opportunities in film and advertising"
        ],
        milestones: ["Mainstream collaboration", "Festival performance", "Label interest", "Sync placement"]
      },
      phase4: {
        title: "International Artist",
        duration: "Months 16-24",
        focus: "Establishing as international Afrobeats artist",
        actions: [
          "Release project with global distribution push",
          "Build touring infrastructure for international shows",
          "Pursue brand partnerships with global companies",
          "Connect with African markets directly (Nigeria, Ghana, SA)",
          "Develop business interests in Africa and diaspora",
          "Mentor emerging Afrobeats artists"
        ],
        milestones: ["International project release", "Global touring", "Brand partnerships", "African market presence"]
      },
      revenueStreams: {
        immediate: [
          { stream: "Streaming", description: "African streaming platforms + global DSPs", potentialMonthly: "$100-2,000" },
          { stream: "TikTok Creator Fund", description: "Viral dance challenges drive views", potentialMonthly: "$100-1,000" }
        ],
        shortTerm: [
          { stream: "Live Performances", description: "Afrobeats nights, cultural events, clubs", potentialMonthly: "$500-5,000" },
          { stream: "Streaming Growth", description: "Playlist placements across platforms", potentialMonthly: "$500-10,000" },
          { stream: "Merchandise", description: "Culturally-inspired apparel", potentialMonthly: "$500-5,000" },
          { stream: "Brand Partnerships", description: "African and diaspora-focused brands", potentialMonthly: "$1,000-10,000" }
        ],
        longTerm: [
          { stream: "Festival Circuit", description: "Afrobeats festivals globally (Afronation, etc.)", potentialMonthly: "$5,000-50,000" },
          { stream: "Major Label Deal", description: "Advance and royalties", potentialMonthly: "$5,000-100,000" },
          { stream: "Sync Licensing", description: "Film, TV, advertising placements", potentialMonthly: "$2,000-30,000" },
          { stream: "Business Ventures", description: "African market investments", potentialMonthly: "Variable" }
        ]
      },
      businessModels: [
        "Diaspora-first artist building to mainstream",
        "African label partnership with global distribution",
        "Independent with strong streaming and sync focus",
        "Major label deal focused on global breakthrough"
      ],
      keyPartnerships: [
        "African producers (Lagos, Accra-based)",
        "Afrobeats labels (Mavin, Starboy, Spaceship)",
        "African diaspora event promoters",
        "Afrobeats playlist curators",
        "African fashion and lifestyle brands"
      ],
      platformStrategy: [
        { platform: "TikTok", purpose: "Dance challenges and viral moments", priority: "Critical" },
        { platform: "Spotify", purpose: "Afrobeats playlists and algorithmic growth", priority: "Critical" },
        { platform: "YouTube", purpose: "Music videos (huge in Africa)", priority: "Critical" },
        { platform: "Instagram", purpose: "Visual brand and fan engagement", priority: "High" },
        { platform: "Audiomack", purpose: "Popular in Africa for streaming", priority: "Medium" }
      ],
      investmentAreas: [
        "Quality production from African producers",
        "Music video production (essential for Afrobeats)",
        "TikTok marketing and influencer seeding",
        "PR focused on Afrobeats media",
        "Cultural event performances"
      ],
      criticalMistakes: [
        "Trying to sound exactly like Lagos artists without the cultural context - it reads as inauthentic",
        "Ignoring the visual and dance component - Afrobeats is inseparable from dance and visual culture",
        "Not connecting with diaspora communities first - they're your bridge to global audiences",
        "Releasing without proper music video - videos are essential in Afrobeats culture",
        "Not understanding the importance of TikTok dance challenges for virality",
        "Working only with non-African producers - the authentic sound requires cultural understanding"
      ],
      scalingTriggers: [
        "Dance challenge getting organic pickup - time to invest in influencer seeding",
        "Diaspora event bookings increasing - time to approach mainstream festival bookers",
        "African media covering you - time to build relationships with international Afrobeats media",
        "Streaming numbers growing in specific territories - time to focus marketing on those regions",
        "Major labels showing interest - time to get experienced entertainment lawyer for negotiations"
      ]
    }
  }
}

// Additional profile implementations for other genres...

function getPopProfile(): GenreProfile {
  return {
    genre: { primary: "Pop", secondary: "Contemporary Pop", niche: "Mainstream Pop", confidence: 85 },
    sonic: { 
      tempo: "100-130 BPM", 
      energy: "medium-high", 
      mood: "Catchy, uplifting, accessible, and radio-friendly", 
      production: "Polished vocals, catchy hooks, clean production, universal themes",
      keyElements: ["Strong hooks", "Memorable melodies", "Clean production", "Relatable lyrics", "Commercial structure"]
    },
    mbti: {
      type: "ENFJ",
      name: "The Universal Connector",
      description: "You create music that speaks to everyone. Your gift for crafting memorable melodies and relatable messages allows you to connect with massive audiences across all demographics.",
      strengths: ["Largest potential audience", "Brand partnership opportunities", "Radio and playlist access", "Sync licensing demand", "Commercial infrastructure"],
      challenges: ["Extremely competitive", "Requires significant investment", "Trend-dependent", "Label dependency for scale"],
      coreValues: ["Connection", "Accessibility", "Craft", "Universal appeal"]
    },
    transferableSkills: {
      coreCompetencies: [
        {
          skill: "Mass Communication & Universal Messaging",
          description: "Ability to craft messages that resonate with broad audiences. Understanding of what makes content universally appealing and accessible.",
          careerPaths: ["Advertising Creative Director", "Brand Communication Strategist", "Public Relations Specialist", "Political Communication Advisor", "Corporate Storyteller"]
        },
        {
          skill: "Hook Crafting & Attention Architecture",
          description: "Expertise in creating memorable, sticky content that captures attention. Understanding of what makes things catchy and unforgettable.",
          careerPaths: ["Copywriter", "UX Writer", "Slogan Developer", "Jingle Writer", "Headline Specialist", "TikTok Content Strategist"]
        },
        {
          skill: "Performance & Public Presence",
          description: "Experience with high-visibility performance, media appearances, and managing public image. Comfort with cameras and audiences.",
          careerPaths: ["TV Presenter", "Public Speaker", "Corporate Trainer", "Media Personality", "Influencer Marketing Manager"]
        },
        {
          skill: "Commercial Collaboration & Team Creation",
          description: "Experience working with large creative teams - producers, writers, directors, designers - to create polished commercial output.",
          careerPaths: ["Creative Producer", "Project Manager", "A&R Executive", "Entertainment Manager", "Creative Agency Director"]
        }
      ],
      industryApplications: [
        { industry: "Advertising & Marketing", roles: ["Creative Director", "Jingle Composer", "Campaign Strategist", "Brand Voice Developer"], whyYouFit: "Your understanding of hooks, catchiness, and mass appeal is exactly what advertising needs. Pop songwriting skills translate directly to creating memorable brand content." },
        { industry: "Media & Entertainment", roles: ["TV Music Supervisor", "Show Theme Composer", "Content Creator", "Media Personality"], whyYouFit: "Your comfort with performance, commercial content, and audience engagement positions you for media roles that require both creative and presentation skills." },
        { industry: "Corporate Communications", roles: ["Internal Communications Lead", "Employee Engagement Specialist", "Corporate Event Producer"], whyYouFit: "Companies need people who can make boring information engaging. Your ability to craft accessible, memorable content is valuable for internal and external communications." },
        { industry: "Education & EdTech", roles: ["Educational Content Creator", "Learning Experience Designer", "Kids Content Specialist"], whyYouFit: "Educational content needs to be engaging and memorable - exactly what pop songwriters do. Consider creating educational music or content that makes learning stick." }
      ],
      portfolioCareer: "Pop artists often build careers combining performance with songwriting, brand work, and media presence. The most sustainable path often involves writing for other artists, creating content for brands, or transitioning into media roles. Your skills in crafting universally appealing content are valuable anywhere attention and engagement matter - which is everywhere."
    },
    roadmap: {
      marketReality: {
        saturationLevel: "MAXIMUM - Pop is the most competitive genre with the highest barriers to entry and most resources required to break through",
        industryTruth: "Pop success almost always requires significant capital investment and industry backing. Independent pop success is rare because the genre depends on radio, playlists, and mainstream media - all controlled by gatekeepers. The alternative is building a massive organic following first, which requires years and exceptional content.",
        whyMostFail: "Artists try to compete with major label budgets using independent resources. They release music that sounds like hits but doesn't have the marketing behind it. Pop requires the full package - song, production, visual, marketing, timing - to break through.",
        yourEdge: "Don't compete directly with major labels. Build a devoted niche audience first, then use that leverage to get industry support. Or focus on songwriting for others as your primary income while building your artist career."
      },
      differentiationStrategy: {
        positioning: "Find a specific angle within pop - hyperpop, indie pop, dark pop, pop-punk - and dominate that niche before going mainstream",
        uniqueAngle: "Develop a visual and sonic identity that's instantly recognizable. Pop success requires strong branding that sets you apart from the thousands of other aspiring pop artists.",
        targetAudience: "Don't try to appeal to everyone immediately. Find a specific demographic (teens, young adults, specific communities) and become their artist first.",
        competitiveAdvantage: "Exceptional songwriting ability is your edge. If you can write genuinely great songs, industry will eventually find you. Focus on craft above all."
      },
      phase1: {
        title: "Songwriting Excellence",
        duration: "Months 1-4",
        focus: "Developing hit-worthy songwriting",
        actions: [
          "Study pop songwriting masters and hit song structures",
          "Write prolifically - aim for 50+ song ideas in this period",
          "Collaborate with other songwriters to learn techniques",
          "Develop your vocal ability and recording presence",
          "Create visual identity suitable for mainstream",
          "Build initial social media presence"
        ],
        milestones: ["Songwriting skills developed", "Quality demos created", "Visual identity established", "Collaboration network started"]
      },
      phase2: {
        title: "Content Strategy",
        duration: "Months 5-9",
        focus: "Building audience through strategic content",
        actions: [
          "Create TikTok strategy - covers, originals, personality content",
          "Release singles strategically with marketing plans",
          "Pursue editorial playlist placements",
          "Build YouTube presence with high-quality videos",
          "Engage with fans consistently across platforms",
          "Collaborate with other artists for cross-promotion"
        ],
        milestones: ["TikTok growth momentum", "Playlist placements", "Growing streaming numbers", "Video views increasing"]
      },
      phase3: {
        title: "Industry Development",
        duration: "Months 10-15",
        focus: "Building industry relationships",
        actions: [
          "Pursue management for professional guidance",
          "Connect with A&Rs at major labels",
          "Develop sync and licensing relationships",
          "Book live performances and build show",
          "Create merchandise around your brand",
          "Explore brand partnership opportunities"
        ],
        milestones: ["Management secured", "Label conversations", "Live show developed", "First brand interest"]
      },
      phase4: {
        title: "Commercial Scale",
        duration: "Months 16-24",
        focus: "Scaling to commercial success",
        actions: [
          "Release major project with full marketing campaign",
          "Secure label or major distribution deal",
          "Build touring infrastructure",
          "Pursue radio promotion",
          "Scale brand partnerships",
          "Expand international markets"
        ],
        milestones: ["Project release", "Deal secured", "Tour launched", "Radio support", "International growth"]
      },
      revenueStreams: {
        immediate: [
          { stream: "Streaming", description: "Building catalog streams", potentialMonthly: "$50-1,000" },
          { stream: "Cover Songs", description: "YouTube covers can drive traffic", potentialMonthly: "$100-500" }
        ],
        shortTerm: [
          { stream: "Streaming Growth", description: "Playlist placements scale revenue", potentialMonthly: "$500-10,000" },
          { stream: "Live Performances", description: "Club shows, colleges, events", potentialMonthly: "$500-5,000" },
          { stream: "Merchandise", description: "Artist merch sales", potentialMonthly: "$200-3,000" },
          { stream: "Sync Licensing", description: "TV, film, advertising placements", potentialMonthly: "$500-10,000" }
        ],
        longTerm: [
          { stream: "Major Label Deal", description: "Advance and ongoing royalties", potentialMonthly: "$5,000-100,000" },
          { stream: "Touring", description: "Headline tours and festivals", potentialMonthly: "$10,000-500,000" },
          { stream: "Brand Partnerships", description: "Major brand endorsements", potentialMonthly: "$10,000-500,000" },
          { stream: "Publishing", description: "Songwriting for others", potentialMonthly: "$5,000-100,000" },
          { stream: "Radio Royalties", description: "Performance royalties from airplay", potentialMonthly: "$1,000-50,000" }
        ]
      },
      businessModels: [
        "Major label artist (maximum resources and reach)",
        "Independent with label services (maintain ownership)",
        "Songwriter/artist hybrid (multiple income streams)",
        "Brand-driven artist (partnerships as primary focus)"
      ],
      keyPartnerships: [
        "Major labels (Universal, Sony, Warner)",
        "Pop-focused management companies",
        "Radio promotion teams",
        "Brand partnership agencies",
        "Top-tier producers and co-writers"
      ],
      platformStrategy: [
        { platform: "TikTok", purpose: "Discovery and viral moments", priority: "Critical" },
        { platform: "Spotify", purpose: "Streaming and playlist focus", priority: "Critical" },
        { platform: "YouTube", purpose: "Music videos and content", priority: "Critical" },
        { platform: "Instagram", purpose: "Brand and fan engagement", priority: "High" },
        { platform: "Radio", purpose: "Traditional promotion (with team)", priority: "High" }
      ],
      investmentAreas: [
        "Professional vocal production and recording",
        "High-quality music video production",
        "Social media advertising",
        "PR and marketing campaigns",
        "Live performance development"
      ],
      criticalMistakes: [
        "Trying to compete with major labels without the budget - you need a different strategy",
        "Releasing music without proper marketing support - pop requires push, not just good music",
        "Ignoring songwriting craft for production trends - songs matter more than sounds in pop",
        "Not building a visual brand - pop is as much visual as audio",
        "Signing bad deals out of desperation - get an entertainment lawyer before any deal",
        "Neglecting live performance skills - touring is where pop artists make real money"
      ],
      scalingTriggers: [
        "TikTok video with 100,000+ views - time to invest in proper social media strategy",
        "Editorial playlist placement - time to pursue PR and media coverage",
        "Labels reaching out - time to get entertainment lawyer and understand deal structures",
        "Brand partnership interest - time to create professional rate card and media kit",
        "Streaming reaching 50,000+ monthly listeners - time to invest in touring infrastructure"
      ]
    }
  }
}

function getRockProfile(): GenreProfile {
  return {
    genre: { primary: "Rock", secondary: "Alternative Rock", niche: "Modern Rock", confidence: 86 },
    sonic: { 
      tempo: "100-140 BPM", 
      energy: "high", 
      mood: "Energetic, rebellious, emotional, guitar-driven", 
      production: "Live instruments, guitar distortion, powerful drums, emotional vocals",
      keyElements: ["Electric guitars", "Live drums", "Bass groove", "Vocal intensity", "Dynamic arrangements"]
    },
    mbti: {
      type: "ISFP",
      name: "The Authentic Rebel",
      description: "You channel raw emotion through guitars and drums. Your music carries the spirit of rock rebellion while speaking to timeless human experiences.",
      strengths: ["Dedicated rock fanbase", "Strong live music culture", "Sync licensing demand", "Festival circuit", "Timeless genre appeal"],
      challenges: ["Reduced mainstream presence", "Band dynamics and logistics", "Touring demands", "Radio access limitations"],
      coreValues: ["Authenticity", "Raw emotion", "Live performance", "Rebellion against conformity"]
    },
    transferableSkills: {
      coreCompetencies: [
        {
          skill: "Team Leadership & Band Dynamics",
          description: "Experience leading and collaborating in small creative teams. Understanding of group dynamics, conflict resolution, and shared vision execution.",
          careerPaths: ["Team Leader", "Project Manager", "Creative Director", "Startup Co-Founder", "Department Head"]
        },
        {
          skill: "Live Performance & Public Speaking",
          description: "Comfort commanding attention in front of live audiences. Experience with high-pressure performance and audience engagement.",
          careerPaths: ["Public Speaker", "Corporate Trainer", "Event MC", "Keynote Speaker", "Workshop Facilitator", "Sales Presenter"]
        },
        {
          skill: "Equipment & Technical Systems Knowledge",
          description: "Hands-on experience with audio equipment, amplification, and technical systems. Practical problem-solving under pressure.",
          careerPaths: ["Audio Tech", "Live Sound Engineer", "Equipment Sales", "Music Store Manager", "Instrument Technician", "Backline Tech"]
        },
        {
          skill: "Touring Logistics & Road Management",
          description: "Experience planning and executing tours - routing, accommodation, budgeting, and keeping people moving and healthy on the road.",
          careerPaths: ["Tour Manager", "Event Planner", "Logistics Coordinator", "Festival Operations", "Travel Coordinator"]
        }
      ],
      industryApplications: [
        { industry: "Corporate Training & Development", roles: ["Training Facilitator", "Team Building Coordinator", "Leadership Workshop Leader"], whyYouFit: "Rock bands understand team dynamics, performance under pressure, and how to engage audiences. These skills translate directly to corporate training environments." },
        { industry: "Events & Live Entertainment", roles: ["Event Director", "Festival Stage Manager", "Concert Production Manager", "Venue Manager"], whyYouFit: "Your experience with live shows - from small clubs to larger venues - gives you practical knowledge of event production that's invaluable in the live entertainment industry." },
        { industry: "Retail & Sales", roles: ["Music Retail Manager", "Brand Ambassador", "Product Demonstrator", "Sales Representative"], whyYouFit: "Rock musicians understand their equipment intimately and can communicate that passion. Music retail and gear companies value this authentic enthusiasm and knowledge." },
        { industry: "Education", roles: ["Music Teacher", "Band Director", "Performance Coach", "Youth Program Coordinator"], whyYouFit: "Your performance experience and understanding of band dynamics makes you valuable for teaching music, leading school bands, or running youth programs." }
      ],
      portfolioCareer: "Rock musicians often build sustainable careers combining performance with teaching, session work, and equipment-related roles. Consider giving lessons, doing session work for recordings, or developing expertise in gear that could lead to music retail, tech, or endorsement relationships. Your live performance skills are also directly transferable to public speaking and corporate training."
    },
    roadmap: {
      marketReality: {
        saturationLevel: "MEDIUM - Rock has less competition than pop or hip-hop but also smaller mainstream audience. However, the dedicated fanbase is highly engaged.",
        industryTruth: "Rock is a touring genre. Streaming pays poorly for rock music because fans prefer albums and live shows. The real money is in ticket sales, merchandise, and sync licensing. Rock fans are the most likely to buy physical merchandise and attend multiple shows.",
        whyMostFail: "Rock bands often neglect business basics while focusing on artistic integrity. They play too many local shows for free or cheap, burning out their audience. They also fail to adapt marketing to modern platforms while insisting on '90s band strategies.",
        yourEdge: "Rock fans are loyal and will support you for decades if you deliver quality. Build a community, not just an audience. Focus on live show excellence and direct-to-fan relationships."
      },
      differentiationStrategy: {
        positioning: "Find your specific rock niche and own it completely - indie rock, post-punk, metal, pop-punk, etc.",
        uniqueAngle: "Rock rewards authenticity - develop a genuine identity and story that fans can connect with emotionally",
        targetAudience: "Rock fans who feel underserved by mainstream pop. They want artists who feel real and accessible.",
        competitiveAdvantage: "Live performance excellence. Rock fans judge you primarily by your live show. If you can deliver an incredible live experience, everything else follows."
      },
      phase1: {
        title: "Band Development",
        duration: "Months 1-4",
        focus: "Building tight band unit and sound",
        actions: [
          "Assemble committed band members or develop solo project",
          "Develop tight live performance through consistent rehearsal",
          "Record quality demos showcasing your sound",
          "Build local scene presence through shows",
          "Create visual identity that reflects rock aesthetic",
          "Document journey through social media"
        ],
        milestones: ["Band solidified", "Sound developed", "Local shows booked", "Demo recorded"]
      },
      phase2: {
        title: "Scene Building",
        duration: "Months 5-9",
        focus: "Building regional presence",
        actions: [
          "Book regional shows and mini-tours",
          "Release singles and EPs through distribution",
          "Build rock blog and publication coverage",
          "Connect with rock playlist curators",
          "Collaborate with other rock bands",
          "Develop merchandise line"
        ],
        milestones: ["Regional touring", "EP release", "Blog coverage", "Merchandise sales"]
      },
      phase3: {
        title: "Industry Growth",
        duration: "Months 10-15",
        focus: "Building industry relationships",
        actions: [
          "Pursue sync licensing for rock music",
          "Submit to rock festivals",
          "Connect with rock-focused labels and management",
          "Build direct fan relationships through email and community",
          "Create vinyl releases for dedicated fans",
          "Develop touring infrastructure"
        ],
        milestones: ["Sync placement", "Festival submissions", "Industry meetings", "Vinyl release"]
      },
      phase4: {
        title: "Sustainable Career",
        duration: "Months 16-24",
        focus: "Building long-term rock career",
        actions: [
          "Release full album with promotion campaign",
          "Secure label or management deal if appropriate",
          "Build national and international touring",
          "Develop multiple revenue streams",
          "Create long-term fan community",
          "Explore production and session work"
        ],
        milestones: ["Album release", "National touring", "Sustainable income", "Fan community established"]
      },
      revenueStreams: {
        immediate: [
          { stream: "Live Shows", description: "Local and regional gigs", potentialMonthly: "$200-2,000" },
          { stream: "Merchandise", description: "T-shirts and merch at shows", potentialMonthly: "$100-1,000" }
        ],
        shortTerm: [
          { stream: "Streaming", description: "Rock playlists and discovery", potentialMonthly: "$100-2,000" },
          { stream: "Touring", description: "Regional and support tours", potentialMonthly: "$500-5,000" },
          { stream: "Vinyl/Physical", description: "Physical product sales", potentialMonthly: "$200-2,000" },
          { stream: "Sync Licensing", description: "Rock music in TV/film", potentialMonthly: "$500-10,000" }
        ],
        longTerm: [
          { stream: "Festival Circuit", description: "Rock festival bookings", potentialMonthly: "$2,000-30,000" },
          { stream: "Headline Touring", description: "Own tours and fan base", potentialMonthly: "$5,000-50,000" },
          { stream: "Publishing", description: "Songwriting royalties", potentialMonthly: "$1,000-20,000" },
          { stream: "Session Work", description: "Recording for others", potentialMonthly: "$500-5,000" }
        ]
      },
      businessModels: [
        "Touring band with merchandise focus",
        "Independent with sync licensing strategy",
        "Label partnership for wider reach",
        "Fan-supported through Patreon and direct sales"
      ],
      keyPartnerships: [
        "Rock-focused labels and distributors",
        "Live venue owners and promoters",
        "Rock playlist curators",
        "Sync licensing companies",
        "Other rock bands for touring packages"
      ],
      platformStrategy: [
        { platform: "YouTube", purpose: "Music videos and live content", priority: "Critical" },
        { platform: "Spotify", purpose: "Rock playlists and streaming", priority: "High" },
        { platform: "Bandcamp", purpose: "Direct sales and vinyl", priority: "High" },
        { platform: "Instagram", purpose: "Band visual presence", priority: "Medium" },
        { platform: "TikTok", purpose: "Behind-the-scenes and viral moments", priority: "Medium" }
      ],
      investmentAreas: [
        "Quality recording and production",
        "Live sound and equipment",
        "Touring vehicle and logistics",
        "Music video production",
        "PR and blog outreach"
      ],
      criticalMistakes: [
        "Over-playing local shows and burning out your home audience - spread out local shows",
        "Not treating the band as a business - rock bands need business structure like any company",
        "Ignoring modern marketing platforms because they feel 'un-rock' - adapt or die",
        "Expecting streaming to pay the bills - rock income comes from touring and merch",
        "Poor live sound quality - rock fans will forgive production issues but not bad live sound",
        "Internal band conflicts going unresolved - have clear agreements about money and decisions"
      ],
      scalingTriggers: [
        "Local shows consistently at capacity - time to expand to regional markets",
        "Fans asking about merch - time to invest in quality merchandise",
        "Blog coverage increasing - time to pursue larger PR campaign",
        "Regional shows selling out - time to approach booking agents for touring",
        "Sync placement achieved - time to register with PROs and pursue more licensing"
      ]
    }
  }
}

function getExperimentalProfile(): GenreProfile {
  return {
    genre: { primary: "Experimental", secondary: "Electronic", niche: "Avant-Garde / Genre-Defying", confidence: 80 },
    sonic: { 
      tempo: "Variable", 
      energy: "variable", 
      mood: "Challenging, innovative, boundary-pushing", 
      production: "Unconventional sounds, unique structures, artistic vision",
      keyElements: ["Unique sound design", "Non-traditional structures", "Artistic concept", "Innovation", "Unpredictability"]
    },
    mbti: {
      type: "INTP",
      name: "The Sonic Visionary",
      description: "You create music that expands the boundaries of what's possible. Your work challenges conventions and opens new sonic territories, attracting those who seek music that demands active engagement.",
      strengths: ["Complete artistic freedom", "Critical and artistic credibility", "Dedicated cult following", "Art world crossover", "Educational/institutional interest"],
      challenges: ["Limited commercial appeal", "Difficulty finding audience", "Marketing challenges", "Income uncertainty"],
      coreValues: ["Innovation", "Artistic integrity", "Pushing boundaries", "Creative freedom"]
    },
    transferableSkills: {
      coreCompetencies: [
        {
          skill: "Creative Problem-Solving & Unconventional Thinking",
          description: "Ability to approach problems from unexpected angles and create novel solutions. Comfort with ambiguity and undefined problems.",
          careerPaths: ["Innovation Consultant", "Design Thinking Facilitator", "R&D Specialist", "Creative Strategist", "Futurist", "Think Tank Researcher"]
        },
        {
          skill: "Sound Design & Sonic Engineering",
          description: "Advanced understanding of sound synthesis, audio manipulation, and creating sounds that didn't exist before.",
          careerPaths: ["Film Sound Designer", "Game Audio Designer", "Foley Artist", "Audio Plugin Developer", "Installation Artist", "Theatre Sound Designer"]
        },
        {
          skill: "Conceptual Thinking & Artistic Vision",
          description: "Ability to develop and articulate coherent artistic concepts. Experience translating abstract ideas into tangible creative work.",
          careerPaths: ["Concept Developer", "Art Director", "Museum Curator", "Creative Director", "Brand Philosopher", "Academic Researcher"]
        },
        {
          skill: "Technical Audio Experimentation",
          description: "Deep knowledge of audio technology, synthesis methods, and the intersection of technology and sound. Willingness to experiment with new tools.",
          careerPaths: ["Audio Software Developer", "Sound Technology Researcher", "Synth Designer", "Audio Hardware Developer", "Acoustics Consultant"]
        }
      ],
      industryApplications: [
        { industry: "Film & Television", roles: ["Sound Designer", "Composer for Documentary/Art Film", "Sonic Branding Specialist", "Audio Post-Production"], whyYouFit: "Film needs unique, evocative sounds that serve story and emotion. Your experimental approach and sound design skills translate directly to creating sonic worlds for visual media." },
        { industry: "Gaming & Interactive", roles: ["Game Audio Director", "Procedural Sound Designer", "VR/AR Audio Specialist", "Interactive Installation Creator"], whyYouFit: "Gaming values innovation and unique sonic experiences. Your experimental mindset and technical skills are valuable for creating immersive audio that responds to player action." },
        { industry: "Art World & Institutions", roles: ["Installation Artist", "Sound Art Curator", "Artist-in-Residence", "Museum Sound Designer"], whyYouFit: "Galleries, museums, and institutions seek innovative sonic experiences. Your conceptual approach and artistic credibility position you for residencies, commissions, and institutional support." },
        { industry: "Academia & Research", roles: ["Music Technology Professor", "Audio Research Fellow", "Sound Studies Scholar", "Composition Instructor"], whyYouFit: "Universities value experimental approaches and need faculty who push boundaries. Your innovative work and conceptual thinking translate to academic roles combining teaching and research." }
      ],
      portfolioCareer: "Experimental musicians almost always sustain their practice through portfolio careers combining multiple income streams: sound design for film/games/advertising, academic positions, grants and residencies, installation work, and teaching. Position yourself as a 'sonic artist' rather than just a musician - this language opens doors in art, film, gaming, and academia that 'experimental musician' does not."
    },
    roadmap: {
      marketReality: {
        saturationLevel: "LOW - Experimental music has a small but dedicated audience. Competition is low but so is commercial potential.",
        industryTruth: "Experimental music rarely generates sustainable income through traditional music industry routes. The artists who sustain experimental practices typically combine music with sound design, academic positions, grants, teaching, and art world income. Think of music as one stream in a portfolio career.",
        whyMostFail: "Artists expect experimental music to pay like commercial music. They neglect building the multiple income streams necessary to sustain a non-commercial practice. They also fail to articulate their vision in ways that open institutional doors.",
        yourEdge: "Your willingness to push boundaries is valuable in sound design, film, games, galleries, and academic contexts. Position yourself as a creative problem-solver, not just a musician."
      },
      differentiationStrategy: {
        positioning: "Position as a sonic artist/creative rather than just a musician - this opens doors in film, gaming, galleries, and academia",
        uniqueAngle: "Your specific artistic vision and conceptual approach. Experimental audiences value coherent artistic statements.",
        targetAudience: "Art-engaged audiences, institutions, publications, and curators who value innovation over accessibility",
        competitiveAdvantage: "Your unique perspective and willingness to explore uncharted territory. In experimental music, genuine innovation is recognized and valued."
      },
      phase1: {
        title: "Artistic Definition",
        duration: "Months 1-4",
        focus: "Defining your unique artistic vision",
        actions: [
          "Develop and document your artistic philosophy and vision",
          "Create a body of work that demonstrates your approach",
          "Build visual aesthetic that matches your sonic identity",
          "Connect with experimental music communities online",
          "Study experimental artists you admire - understand their paths",
          "Begin documenting your creative process"
        ],
        milestones: ["Artistic vision defined", "Initial catalog created", "Community connections made", "Process documented"]
      },
      phase2: {
        title: "Community Building",
        duration: "Months 5-9",
        focus: "Finding your audience",
        actions: [
          "Release through experimental-friendly platforms (Bandcamp, SoundCloud)",
          "Submit to experimental labels and collectives",
          "Create visual content explaining your work",
          "Perform at experimental venues and events",
          "Collaborate with visual artists and other experimentalists",
          "Build direct relationships with dedicated listeners"
        ],
        milestones: ["Platform presence established", "Label or collective connection", "Live performances", "Collaboration completed"]
      },
      phase3: {
        title: "Career Development",
        duration: "Months 10-15",
        focus: "Building sustainable experimental practice",
        actions: [
          "Apply for artist grants and funding (NEA, private foundations)",
          "Pursue sound design and composition opportunities",
          "Develop educational content around your approach",
          "Connect with academic and institutional opportunities",
          "Create limited edition physical releases",
          "Build Patreon for direct supporter relationships"
        ],
        milestones: ["Grant application submitted", "Sound design income", "Educational content created", "Supporter base built"]
      },
      phase4: {
        title: "Sustainable Practice",
        duration: "Months 16-24",
        focus: "Long-term experimental career",
        actions: [
          "Develop multiple income streams around your practice",
          "Pursue gallery and installation opportunities",
          "Build teaching and workshop offerings",
          "Create commissioned works for clients",
          "Develop your own platform or label",
          "Mentor emerging experimental artists"
        ],
        milestones: ["Multiple income streams", "Gallery/installation work", "Teaching established", "Sustainable practice achieved"]
      },
      revenueStreams: {
        immediate: [
          { stream: "Bandcamp Sales", description: "Direct sales to supporters", potentialMonthly: "$50-500" },
          { stream: "Patreon", description: "Monthly supporter contributions", potentialMonthly: "$100-1,000" }
        ],
        shortTerm: [
          { stream: "Sound Design", description: "Sound for film, games, installations", potentialMonthly: "$500-5,000" },
          { stream: "Live Performances", description: "Experimental venues and events", potentialMonthly: "$200-2,000" },
          { stream: "Teaching", description: "Workshops and tutorials", potentialMonthly: "$300-3,000" },
          { stream: "Grants", description: "Artist funding and residencies", potentialMonthly: "$500-5,000" }
        ],
        longTerm: [
          { stream: "Commissions", description: "Custom work for clients", potentialMonthly: "$1,000-10,000" },
          { stream: "Gallery/Installation", description: "Art world presentations", potentialMonthly: "$1,000-20,000" },
          { stream: "Academic", description: "Teaching positions and lectures", potentialMonthly: "$2,000-10,000" },
          { stream: "Catalog Licensing", description: "Sync and usage licensing", potentialMonthly: "$500-5,000" }
        ]
      },
      businessModels: [
        "Grant-supported artist (funding-based practice)",
        "Sound design and composition services",
        "Academic/educational hybrid",
        "Gallery and art world focused"
      ],
      keyPartnerships: [
        "Experimental labels and collectives",
        "Visual and multimedia artists",
        "Arts institutions and galleries",
        "Academic institutions",
        "Film and game studios seeking unique sound"
      ],
      platformStrategy: [
        { platform: "Bandcamp", purpose: "Primary sales and community", priority: "Critical" },
        { platform: "SoundCloud", purpose: "Free content and discovery", priority: "High" },
        { platform: "YouTube", purpose: "Visual content and documentation", priority: "Medium" },
        { platform: "Instagram", purpose: "Visual aesthetic and networking", priority: "Medium" },
        { platform: "Patreon", purpose: "Direct supporter relationships", priority: "Medium" }
      ],
      investmentAreas: [
        "Unique instruments and sound sources",
        "Recording and production tools",
        "Visual documentation equipment",
        "Grant writing assistance",
        "Website and portfolio development"
      ],
      criticalMistakes: [
        "Expecting experimental music alone to pay the bills - build multiple income streams",
        "Being inaccessible to potential collaborators and opportunities - articulate your vision clearly",
        "Ignoring the art world and institutional contexts where experimental work is valued",
        "Not documenting your process - the story behind experimental work often matters as much as the work itself",
        "Dismissing commercial work as 'selling out' - sound design and composition fund artistic freedom",
        "Isolating yourself from community - experimental music thrives on collaboration and scene"
      ],
      scalingTriggers: [
        "First grant or residency - time to pursue more institutional support systematically",
        "Sound design inquiries - time to create professional portfolio and rate card",
        "Academic interest in your work - time to develop teaching and lecture offerings",
        "Gallery or installation opportunity - time to document and expand art world presence",
        "Consistent Patreon income - time to create more content for dedicated supporters"
      ]
    }
  }
}

// Placeholder functions for remaining genres - would be fully implemented
function getNYDrillProfile(): GenreProfile { return getUKDrillProfile() }
function getChicagoDrillProfile(): GenreProfile { return getUKDrillProfile() }
function getHardTrapProfile(): GenreProfile { return getTrapProfile() }
function getPluggProfile(): GenreProfile { return getMelodicTrapProfile() }
function getRageBeatProfile(): GenreProfile { return getMelodicTrapProfile() }
function getPhonkProfile(): GenreProfile { return getTrapProfile() }
function getBoomBapProfile(): GenreProfile { return getHipHopProfile() }
function getHipHopProfile(): GenreProfile { return getTrapProfile() }
function getLiquidDnBProfile(): GenreProfile { return getDrumAndBassProfile() }
function getNeurofunkProfile(): GenreProfile { return getDrumAndBassProfile() }
function getJungleProfile(): GenreProfile { return getDrumAndBassProfile() }
function getJumpUpDnBProfile(): GenreProfile { return getDrumAndBassProfile() }
function getDeepHouseProfile(): GenreProfile { return getHouseProfile() }
function getTechHouseProfile(): GenreProfile { return getHouseProfile() }
function getAfroHouseProfile(): GenreProfile { return getHouseProfile() }
function getProgressiveHouseProfile(): GenreProfile { return getHouseProfile() }
function getNuDiscoProfile(): GenreProfile { return getHouseProfile() }
function getMinimalHouseProfile(): GenreProfile { return getHouseProfile() }
function getTechnoProfile(): GenreProfile { return getHouseProfile() }
function getIndustrialTechnoProfile(): GenreProfile { return getTechnoProfile() }
function getMinimalTechnoProfile(): GenreProfile { return getTechnoProfile() }
function getMelodicTechnoProfile(): GenreProfile { return getTechnoProfile() }
function getAcidTechnoProfile(): GenreProfile { return getTechnoProfile() }
function getDubTechnoProfile(): GenreProfile { return getTechnoProfile() }
function getPeakTimeTechnoProfile(): GenreProfile { return getTechnoProfile() }
function getUKGarageProfile(): GenreProfile { return getHouseProfile() }
function getBasslineProfile(): GenreProfile { return getHouseProfile() }
function getGrimeProfile(): GenreProfile { return getUKDrillProfile() }
function getUKBassProfile(): GenreProfile { return getHouseProfile() }
function getDubstepProfile(): GenreProfile { return getDrumAndBassProfile() }
function getRiddimProfile(): GenreProfile { return getDubstepProfile() }
function getBrostepProfile(): GenreProfile { return getDubstepProfile() }
function getMelodicDubstepProfile(): GenreProfile { return getDubstepProfile() }
function getDeepDubstepProfile(): GenreProfile { return getDubstepProfile() }
function getAmapianoProfile(): GenreProfile { return getAfrobeatsProfile() }
function getDancehallProfile(): GenreProfile { return getAfrobeatsProfile() }
function getReggaeProfile(): GenreProfile { return getAfrobeatsProfile() }
function getSocaProfile(): GenreProfile { return getAfrobeatsProfile() }
function getReggaetonProfile(): GenreProfile { return getAfrobeatsProfile() }
function getRnBProfile(): GenreProfile { return getMelodicTrapProfile() }
function getNeoSoulProfile(): GenreProfile { return getRnBProfile() }
function getAlternativeRnBProfile(): GenreProfile { return getRnBProfile() }
function getPBRnBProfile(): GenreProfile { return getRnBProfile() }
function getFutureBassProfile(): GenreProfile { return getPopProfile() }
function getMainstageEDMProfile(): GenreProfile { return getHouseProfile() }
function getElectroProfile(): GenreProfile { return getHouseProfile() }
function getBigRoomProfile(): GenreProfile { return getHouseProfile() }
function getElectronicProfile(): GenreProfile { return getHouseProfile() }
function getTranceProfile(): GenreProfile { return getHouseProfile() }
function getPsytranceProfile(): GenreProfile { return getTranceProfile() }
function getUpliftingTranceProfile(): GenreProfile { return getTranceProfile() }
function getProgressiveTranceProfile(): GenreProfile { return getTranceProfile() }
function getTechTranceProfile(): GenreProfile { return getTranceProfile() }
function getAmbientProfile(): GenreProfile { return getLoFiProfile() }
function getDarkAmbientProfile(): GenreProfile { return getAmbientProfile() }
function getIDMProfile(): GenreProfile { return getExperimentalProfile() }
function getDowntempoProfile(): GenreProfile { return getLoFiProfile() }
function getMetalProfile(): GenreProfile { return getRockProfile() }
function getPunkProfile(): GenreProfile { return getRockProfile() }
function getIndieRockProfile(): GenreProfile { return getRockProfile() }
function getAltRockProfile(): GenreProfile { return getRockProfile() }
function getPostRockProfile(): GenreProfile { return getRockProfile() }
function getHyperpopProfile(): GenreProfile { return getPopProfile() }
function getIndiePopProfile(): GenreProfile { return getPopProfile() }
function getSynthPopProfile(): GenreProfile { return getPopProfile() }
function getKPopProfile(): GenreProfile { return getPopProfile() }
function getFolkProfile(): GenreProfile { return getRockProfile() }
function getCountryProfile(): GenreProfile { return getFolkProfile() }
function getSingerSongwriterProfile(): GenreProfile { return getFolkProfile() }
function getClassicalProfile(): GenreProfile { return getExperimentalProfile() }
function getJazzProfile(): GenreProfile { return getExperimentalProfile() }
function getLatinProfile(): GenreProfile { return getAfrobeatsProfile() }
function getFlamencoProfile(): GenreProfile { return getLatinProfile() }
function getBollywoodProfile(): GenreProfile { return getAfrobeatsProfile() }
function getArabicProfile(): GenreProfile { return getAfrobeatsProfile() }
function getUrbanProfile(): GenreProfile { return getTrapProfile() }
function getIndieProfile(): GenreProfile { return getRockProfile() }
function getFunkProfile(): GenreProfile { return getHouseProfile() }
