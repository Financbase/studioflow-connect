
/**
 * Simulate system metrics
 * In a real application, this would fetch from a backend API
 */
export async function fetchSystemMetrics() {
  // For demo purposes, we'll simulate random metrics
  // In a real app, you would make an API call here
  return {
    cpu: Math.floor(Math.random() * 40) + 20, // Random between 20-60%
    memory: Math.floor(Math.random() * 30) + 40, // Random between 40-70%
    storage: Math.floor(Math.random() * 20) + 30, // Random between 30-50%
    network: Math.floor(Math.random() * 50) + 10, // Random between 10-60%
  };
}
