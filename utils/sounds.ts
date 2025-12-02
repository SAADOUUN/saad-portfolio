// Utility to play cyber sounds using Web Audio API
// This avoids external file dependencies and ensures sounds always work.

const createOscillator = (
    ctx: AudioContext,
    type: OscillatorType,
    frequency: number,
    startTime: number,
    duration: number,
    volume: number = 0.1
) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, startTime);

    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
};

export const playCyberSound = (type: 'hover' | 'click' | 'startup' | 'access-granted' | 'access-denied') => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const now = ctx.currentTime;

        switch (type) {
            case 'hover':
                // High pitched short blip
                createOscillator(ctx, 'sine', 800, now, 0.1, 0.05);
                createOscillator(ctx, 'square', 1200, now, 0.05, 0.02);
                break;

            case 'click':
                // Mechanical click
                createOscillator(ctx, 'square', 200, now, 0.1, 0.1);
                createOscillator(ctx, 'sawtooth', 100, now, 0.05, 0.1);
                break;

            case 'startup':
                // Power up effect
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.frequency.setValueAtTime(100, now);
                osc.frequency.exponentialRampToValueAtTime(1000, now + 0.5);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.linearRampToValueAtTime(0, now + 1.0);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 1.0);
                break;

            case 'access-granted':
                // Success chime
                createOscillator(ctx, 'sine', 440, now, 0.2, 0.1);
                createOscillator(ctx, 'sine', 880, now + 0.1, 0.4, 0.1);
                break;

            case 'access-denied':
                // Error buzz
                createOscillator(ctx, 'sawtooth', 150, now, 0.3, 0.2);
                createOscillator(ctx, 'sawtooth', 100, now + 0.1, 0.3, 0.2);
                break;
        }
    } catch (e) {
        console.error('Audio playback failed', e);
    }
};
