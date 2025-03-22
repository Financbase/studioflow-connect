
import { FAQItem } from "@/components/support/faq/types";

const technicalFAQs: FAQItem[] = [
  {
    id: "t1",
    question: "How do I install StudioFlow on my computer?",
    answer: "Download the installer from our website, run the executable file, and follow the on-screen instructions. You'll need to accept the license agreement and choose an installation location. After installation, you can launch the application from your desktop or start menu.",
    category: "Installation",
    tags: ["install", "setup", "download"]
  },
  {
    id: "t2",
    question: "What are the minimum system requirements?",
    answer: "StudioFlow requires Windows 10/11 (64-bit) or macOS 10.15 or newer, 8GB RAM (16GB recommended), 4GB free disk space, and an Intel Core i5 or equivalent processor. For optimal performance, we recommend 16GB RAM, an SSD, and a modern multi-core processor.",
    category: "Compatibility",
    tags: ["system requirements", "hardware", "compatibility"]
  },
  {
    id: "t3",
    question: "Why is StudioFlow crashing on startup?",
    answer: "Startup crashes can be caused by incompatible plugins, corrupted preferences, or driver issues. Try starting with the Shift key held down to bypass plugins, reset preferences by deleting the preferences file in the application data folder, or update your audio drivers and graphics drivers.",
    category: "Troubleshooting",
    tags: ["crash", "startup", "error"]
  },
  {
    id: "t4",
    question: "How do I optimize StudioFlow for better performance?",
    answer: "Increase your audio buffer size, disable unused plugins and tracks, use freeze or bounce functions for CPU-intensive tracks, close unused applications, defragment your hard drive regularly, ensure your drivers are updated, and consider upgrading your RAM or switching to an SSD.",
    category: "Performance",
    tags: ["optimization", "speed", "cpu"]
  },
  {
    id: "t5",
    question: "Does StudioFlow work with my MIDI controller?",
    answer: "StudioFlow is compatible with most MIDI controllers through standard MIDI protocols. Simply connect your controller via USB or MIDI interface, and it should be automatically detected. You can configure controller mappings in the Preferences > MIDI section of the application.",
    category: "Compatibility",
    tags: ["midi", "controller", "hardware"]
  },
  {
    id: "t6",
    question: "How often are updates released?",
    answer: "We typically release major updates quarterly and minor updates/bug fixes monthly. Critical security updates are released as needed. You can check for updates within the application by going to Help > Check for Updates, or enable automatic updates in preferences.",
    category: "Updates",
    tags: ["updates", "version", "release"]
  },
  {
    id: "t7",
    question: "Why am I experiencing audio dropouts or glitches?",
    answer: "Audio dropouts can be caused by buffer size being too low, CPU overload, disk speed issues, or driver conflicts. Try increasing your buffer size, freezing CPU-intensive tracks, defragmenting your hard drive, updating drivers, or disabling unnecessary background processes.",
    category: "Troubleshooting",
    tags: ["audio", "glitches", "dropouts"]
  },
  {
    id: "t8",
    question: "How do I backup my StudioFlow projects?",
    answer: "Use the File > Backup Project function to create a complete backup including all audio files and settings. You can also manually copy your project folders to an external drive. For automatic backups, enable the Auto-Backup feature in Preferences > Project Settings.",
    category: "Technical",
    tags: ["backup", "save", "project"]
  },
  {
    id: "t9",
    question: "Can I use StudioFlow plugins in other DAWs?",
    answer: "Yes, most StudioFlow plugins are available in VST, AU, and AAX formats for use in other DAWs. Install the separate Plugin Pack from our website, and the plugins will be available in any compatible DAW. Note that some specialized plugins are StudioFlow-exclusive.",
    category: "Compatibility",
    tags: ["plugins", "daw", "compatibility"]
  },
  {
    id: "t10",
    question: "How do I resolve authorization issues after installation?",
    answer: "If you're experiencing authorization issues, first ensure you're logged in with the correct account. Try deactivating and reactivating through Help > Manage License. If problems persist, use the offline authorization method or contact our support team with your license ID and system information.",
    category: "Troubleshooting",
    tags: ["license", "authorization", "activation"]
  }
];

export default technicalFAQs;
