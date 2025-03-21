
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
  },
  {
    question: "What's the difference between limiting and compression?",
    answer: "While both reduce dynamic range, limiters have higher ratios (typically 10:1 or higher) and faster attack times than compressors. Limiters are designed to catch and prevent peaks from exceeding a ceiling, making them ideal for mastering and preventing clipping. Compressors (with lower ratios like 2:1 to 8:1) are more musical tools for controlling dynamics and shaping the envelope of sounds throughout the mix.",
    category: "mastering"
  },
  {
    question: "How should I organize my mix session?",
    answer: "Create a logical track order with instruments grouped by type (drums, bass, guitars, keys, vocals). Use color coding for visual organization. Group related tracks with busses/aux sends. Label everything clearly. Create templates for future sessions. Use markers for song sections. Consider a top-down mixing approach, starting with the most important elements. Keep your session tidy by hiding unused tracks and removing unused plugins.",
    category: "technical"
  },
  {
    question: "What's the Haas effect and how can I use it?",
    answer: "The Haas effect occurs when two identical sounds are played with a delay between them of roughly 1-40ms. The human ear perceives this not as an echo but as a single sound with directional information. You can use this to create width by panning two versions of a sound hard left and right, delaying one side by 10-30ms. This creates a sense of width without phase cancellation issues that can occur with traditional stereo widening.",
    category: "mixing"
  },
  {
    question: "How do I approach microphone placement for acoustic guitar?",
    answer: "For a balanced sound, position a condenser mic about 8-12 inches from where the neck meets the body, angled slightly toward the sound hole. For more low-end, move closer to the sound hole; for more definition, aim toward the 12th fret. To capture more room ambience, add a second mic 3-6 feet away. For stereo recording, try an XY configuration or spaced pair technique. Always check for phase issues when using multiple mics.",
    category: "recording"
  },
  {
    question: "What's the best way to use reference tracks?",
    answer: "Choose 3-5 professional tracks in a similar style to your project. Import them to your DAW at the same level as your mix (match perceived loudness, not peak levels). Use a plugin to match their spectrum and dynamics as a reference. A/B between your mix and references frequently throughout mixing. Focus on specific elements like kick/bass relationship, vocal presence, or overall balance rather than trying to copy exactly. Use reference tracks early in the mixing process, not just at the end.",
    category: "mixing"
  },
  {
    question: "How should I prepare my tracks for mastering?",
    answer: "Leave at least 6dB of headroom on your mix bus. Don't apply limiting or heavy compression on the master bus. Keep all tracks at their original sample rate and bit depth. Export as WAV or AIFF files. Include any specific references or notes for the mastering engineer. Consider removing any master bus processing or providing both processed and unprocessed versions. Check the mix on multiple systems to ensure translation before submitting for mastering.",
    category: "mastering"
  },
  {
    question: "What's the difference between reverb types (plate, hall, room, etc.)?",
    answer: "Plate reverbs have bright, dense reflections good for vocals and snares. Hall reverbs simulate large spaces with long decay times (2+ seconds), ideal for orchestral music or creating atmosphere. Room reverbs mimic medium-sized spaces with shorter tails (0.5-1.5s), good for creating cohesion without washing out the mix. Chamber reverbs are between room and hall, with a unique character. Spring reverbs (common in guitar amps) have a distinctive 'boingy' sound great for vintage effects.",
    category: "mixing"
  },
  {
    question: "How do I record drums with limited microphones?",
    answer: "With just one mic, place a large-diaphragm condenser at head height, 3-6 feet in front of the kit, angled down. With two mics, add a dynamic mic inside the kick. With three, add an overhead. With four, use a kick mic, snare mic, and stereo overheads in an XY or ORTF pattern. The Glyn Johns technique uses four mics: kick, snare, and two overheads in a specific arrangement to capture the entire kit with excellent phase coherence.",
    category: "recording"
  }
];
