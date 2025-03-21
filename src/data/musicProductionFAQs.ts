
import { FAQ } from "./faqs";

export const musicProductionFAQs: FAQ[] = [
  {
    question: "What's the ideal monitoring volume for mixing?",
    answer: "The recommended monitoring volume is around 85dB SPL, which is referred to as the 'conversation level'. At this volume, your ears perceive frequencies more evenly. However, it's also important to check your mix at both lower and higher volumes to ensure it translates well across different listening environments.",
    category: "mixing"
  },
  {
    question: "How do I eliminate latency while recording?",
    answer: "To reduce latency, lower your buffer size in your DAW's audio preferences (e.g., 64 or 128 samples). If you need more processing power for playback, use direct monitoring through your audio interface while recording, then switch to a higher buffer size during mixing. Hardware monitoring bypasses software latency completely.",
    category: "recording"
  },
  {
    question: "What's the Fletcher-Munson curve and why is it important?",
    answer: "The Fletcher-Munson curve describes how human hearing perceives different frequencies at different volumes. At lower volumes, we perceive less bass and treble, while at higher volumes, frequency response seems more balanced. This is why mixes sometimes sound different at various playback levels, and why mixing at a consistent, moderate volume is important.",
    category: "mixing"
  },
  {
    question: "When should I use parallel compression?",
    answer: "Parallel compression (or New York compression) is useful when you want to add density and power to a sound while preserving its natural dynamics and transients. It's particularly effective on drums, vocals, and bass. By blending a heavily compressed signal with the original, you get the best of both worlds: the energy of compression with the natural feel of the unprocessed signal.",
    category: "mixing"
  },
  {
    question: "What's the difference between dynamic and condenser microphones?",
    answer: "Dynamic microphones use a simple electromagnetic system making them durable, less sensitive to high SPLs (good for loud sources like drums or guitar amps), and less detailed in high frequencies. Condenser microphones require phantom power, capture more detail and transients, have extended frequency response, but are more fragile and sensitive to loud sounds and plosives.",
    category: "recording"
  },
  {
    question: "How should I approach EQ when mixing?",
    answer: "Start by cutting rather than boosting. Identify problematic frequencies with a narrow boost and sweep, then cut those frequencies. High-pass instruments that don't need low frequencies. Create 'space' for each instrument in its own frequency range. Subtle, broad boosts are better than dramatic, narrow ones. Always EQ in context of the full mix, not in solo mode.",
    category: "mixing"
  },
  {
    question: "What's the 'mid-side' technique in mastering?",
    answer: "Mid-side processing separates your stereo signal into 'mid' (center/mono content) and 'side' (stereo information) components. This allows for separate processing of each component. You might boost high frequencies in the sides for width, while controlling low frequencies in the mid for a tight center. It's powerful for stereo enhancement and fixing problems without affecting the entire mix.",
    category: "mastering"
  },
  {
    question: "How do I set up a proper gain structure?",
    answer: "Maintain headroom throughout your signal chain by setting gain levels properly. Start at the source with appropriate microphone placement and preamp gain. Aim for peak levels around -18dBFS to -12dBFS on your DAW meters for individual tracks. Use gain staging plugins or track/bus trims to control levels between plugins. Leave master headroom of at least -6dB before mastering.",
    category: "technical"
  },
  {
    question: "What's the rule of thirds for arrangement?",
    answer: "The rule of thirds suggests dividing your track into three main sections for better musical flow. In the first third, establish your core elements and theme. In the second third, create variation, tension, or contrast. In the final third, provide resolution and climax. This structure helps maintain listener interest throughout the piece.",
    category: "composition"
  },
  {
    question: "How do I create depth in a mix?",
    answer: "Depth comes from multiple techniques working together. Use reverb with different pre-delays and decay times to place sounds at varying distances. Pan instruments to create width. Use EQ to place sounds front-to-back (brighter sounds seem closer). Utilize dynamics processing - more compressed elements appear closer. Also consider arrangement factors like note density and timing - busier parts seem closer.",
    category: "mixing"
  },
  {
    question: "What's the best approach to vocal compression?",
    answer: "For vocals, multi-stage compression often works best. First, use a gentle compressor (2:1 or 3:1 ratio) to even out the performance with moderate gain reduction (3-6dB). Then add a second, more aggressive compressor to catch peaks (4:1 or higher) or try parallel compression. Adjust attack and release to maintain natural vocal articulation - typically slower attack (5-20ms) and medium release (50-250ms).",
    category: "mixing"
  },
  {
    question: "How do I eliminate ground loops and noise?",
    answer: "To eliminate ground loops, ensure all equipment is plugged into the same power strip or outlet. Use balanced connections when possible. Try a ground lift adapter or DI box with ground lift for problem equipment. For general noise reduction, use proper shielded cables, keep audio cables away from power cables, turn off unnecessary electronic devices, and use a power conditioner for clean power.",
    category: "technical"
  }
];
