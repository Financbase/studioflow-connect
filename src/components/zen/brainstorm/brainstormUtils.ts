
// Simulate AI response based on user input
export const generateResponse = async (userInput: string): Promise<string> => {
  // This simulates an AI response - in a real implementation this would call an API
  const topics = [
    "creative process", "musical composition", "sound design",
    "harmony", "melody", "rhythm", "inspiration", "artistic vision"
  ];
  
  const relevantTopic = topics.find(topic => userInput.toLowerCase().includes(topic)) || 
    topics[Math.floor(Math.random() * topics.length)];

  // Simulate thinking time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return different responses based on the user's input
  if (userInput.toLowerCase().includes("stuck") || userInput.toLowerCase().includes("block")) {
    return `Creative blocks are common. Try approaching your ${relevantTopic} from a different angle. What if you reversed your usual process? Sometimes constraints can spark creativity - what could you achieve with just three elements?`;
  } 
  else if (userInput.toLowerCase().includes("idea") || userInput.toLowerCase().includes("concept")) {
    return `That's an interesting concept. To develop this idea further, consider how it relates to ${relevantTopic}. What emotions are you trying to evoke? How might your audience respond to this?`;
  }
  else if (userInput.toLowerCase().includes("how") || userInput.toLowerCase().includes("?")) {
    return `Great question about ${relevantTopic}. There are multiple approaches you could consider. What's worked for you in the past? Would you like to explore conventional techniques or experiment with something unconventional?`;
  }
  else {
    return `Your thoughts on ${relevantTopic} are intriguing. Let's explore this further. What aspects of this are you most excited about? How does this connect to your broader creative vision?`;
  }
};
