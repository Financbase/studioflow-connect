
export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export const faqs: FAQ[] = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by navigating to the login page and clicking 'Forgot Password'. Follow the instructions sent to your email to create a new password.",
    category: "account"
  },
  {
    question: "Can I use StudioFlow offline?",
    answer: "Yes, some features of StudioFlow can be used offline. Your local projects will sync once you reconnect to the internet.",
    category: "usage"
  },
  {
    question: "What audio formats are supported?",
    answer: "StudioFlow supports WAV, MP3, AIFF, FLAC, and OGG formats for audio import and export.",
    category: "technical"
  },
  {
    question: "How do I upgrade my subscription?",
    answer: "To upgrade your subscription, go to Settings > Subscription and select the plan you wish to upgrade to. Follow the payment instructions to complete your upgrade.",
    category: "billing"
  },
  {
    question: "What is the difference between Pro and Enterprise plans?",
    answer: "The Pro plan includes advanced audio editing tools and 100GB of storage. The Enterprise plan adds dedicated support, unlimited storage, and team collaboration features.",
    category: "billing"
  }
];
