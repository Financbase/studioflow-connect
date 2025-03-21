
import { ProfileStats } from "./types";

// Mock data for demonstration
export const getMockStats = (): ProfileStats => ({
  projectsCreated: 24,
  tracksUploaded: 56,
  storageUsed: "4.2 GB",
  totalStorage: "10 GB",
  lastLogin: new Date().toISOString(),
  accountCreated: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), // 120 days ago
  connectionsCount: 5,
  recentProjects: [
    { id: "p1", name: "Summer Beats", lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "p2", name: "Remix Project", lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    { id: "p3", name: "Ambient Album", lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() }
  ],
  audioAssets: [
    { id: "a1", name: "Acoustic Guitar.wav", size: "24.5 MB", duration: "5:42" },
    { id: "a2", name: "Vocals Stem.mp3", size: "18.2 MB", duration: "3:15" },
    { id: "a3", name: "Drum Loop.wav", size: "8.7 MB", duration: "0:32" }
  ],
  workflows: [
    { id: "w1", name: "Recording Session", devices: ["Focusrite Scarlett 2i2", "AKG C414"] },
    { id: "w2", name: "Mixing Setup", plugins: ["FabFilter Pro-Q 3", "Waves SSL", "Valhalla Reverb"] }
  ]
});
