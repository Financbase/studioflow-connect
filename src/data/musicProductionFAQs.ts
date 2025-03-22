
import { FAQItem } from "@/components/support/faq/types";

const musicProductionFAQs: FAQItem[] = [
  {
    id: "mp1",
    question: "What audio interfaces work best with StudioFlow?",
    answer: "StudioFlow is compatible with most professional audio interfaces. We particularly recommend interfaces from Focusrite, Universal Audio, PreSonus, and MOTU for the best integration and performance.",
    category: "Studio Setup",
    tags: ["audio interface", "hardware", "setup"]
  },
  {
    id: "mp2",
    question: "How can I reduce latency in my recording setup?",
    answer: "To reduce latency, try decreasing your buffer size in the audio settings. Also ensure you're using ASIO drivers on Windows or Core Audio on Mac. Using direct monitoring from your audio interface can also help bypass DAW latency when recording.",
    category: "Studio Setup",
    tags: ["latency", "recording", "performance"]
  },
  {
    id: "mp3",
    question: "What's the best way to set up my microphone for vocal recording?",
    answer: "Place your microphone in a treated room, use a pop filter, position the mic slightly above mouth level and about 6-8 inches away. Adjust gain to avoid clipping but capture enough signal. Consider using a reflection filter for untreated rooms.",
    category: "Vocals",
    tags: ["microphone", "recording", "vocals"]
  },
  {
    id: "mp4",
    question: "How do I create a punchy kick drum sound?",
    answer: "For a punchy kick drum, start with a good sample, then apply EQ to boost around 100Hz for weight and 4-5kHz for click. Use compression with fast attack and medium release. Consider transient designers to enhance the initial impact and layering samples for complexity.",
    category: "Sound Design",
    tags: ["drums", "mixing", "sound design"]
  },
  {
    id: "mp5",
    question: "Which plugins are recommended for mastering?",
    answer: "For mastering, we recommend FabFilter Pro-L2 for limiting, iZotope Ozone for comprehensive mastering, Waves Linear Phase EQ for transparent equalization, and the Brainworx bx_masterdesk for an all-in-one solution. The stock plugins in StudioFlow also offer excellent mastering capabilities.",
    category: "Plugins",
    tags: ["mastering", "plugins", "audio processing"]
  },
  {
    id: "mp6",
    question: "How can I make my vocals sit better in the mix?",
    answer: "To make vocals sit better, start with proper EQ to cut muddy frequencies (around 200-400Hz) and boost presence (2-5kHz). Apply compression to control dynamics, use de-essing to reduce sibilance, and add subtle reverb/delay for space. Automate volume throughout the song for consistent levels.",
    category: "Mixing",
    tags: ["vocals", "mixing", "effects"]
  },
  {
    id: "mp7",
    question: "What's the proper gain staging workflow?",
    answer: "For proper gain staging, aim for peaks around -18dBFS to -12dBFS during recording. Maintain this level through your processing chain, adjusting each plugin's input/output accordingly. This provides headroom and optimal signal-to-noise ratio. Use a gain utility plugin at the start of your chain to set initial levels.",
    category: "Mixing",
    tags: ["gain staging", "mixing", "levels"]
  },
  {
    id: "mp8",
    question: "How do I create width in my stereo field?",
    answer: "To create stereo width, use techniques like panning different elements across the stereo field, applying stereo imaging plugins, using stereo delays with different times for left/right channels, recording doubled performances, and using mid-side processing. Keep low frequencies centered for better mix translation.",
    category: "Mixing",
    tags: ["stereo", "mixing", "spatial"]
  },
  {
    id: "mp9",
    question: "What sample rate and bit depth should I use for recording?",
    answer: "For professional recording, we recommend 24-bit/48kHz as a standard. This provides excellent audio quality while balancing file sizes and processing demands. For critical audiophile productions or projects requiring extensive processing, consider 24-bit/96kHz.",
    category: "Technical",
    tags: ["recording", "sample rate", "bit depth"]
  },
  {
    id: "mp10",
    question: "How can I maximize CPU efficiency in my projects?",
    answer: "To maximize CPU efficiency, freeze or bounce CPU-intensive tracks, use higher buffer sizes during mixing, disable unused plugins, use sends for shared effects, create instrument templates, consider using less CPU-intensive plugins, and regularly clean up your project by removing unused assets.",
    category: "Technical",
    tags: ["performance", "CPU", "optimization"]
  }
];

export default musicProductionFAQs;
