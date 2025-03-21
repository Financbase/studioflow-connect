
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
  },
  {
    question: "How do I connect external MIDI controllers?",
    answer: "To connect a MIDI controller, first ensure it's connected to your computer via USB or MIDI interface. Then go to Settings > MIDI Setup and click 'Scan for Devices'. Select your controller from the list and click 'Enable'.",
    category: "technical"
  },
  {
    question: "Can I share my projects with other users?",
    answer: "Yes, you can share projects with other StudioFlow users. Go to your project, click the 'Share' button, and enter the email addresses of the users you want to collaborate with.",
    category: "usage"
  },
  {
    question: "How can I export my project to work in another DAW?",
    answer: "StudioFlow supports exporting to various formats compatible with other DAWs. Go to File > Export > DAW Project and select your target DAW format (Pro Tools, Logic, Ableton, etc.).",
    category: "technical"
  },
  {
    question: "Is there a limit to how many projects I can create?",
    answer: "Free users can create up to 5 projects. Pro users can create unlimited projects, and Enterprise users have unlimited projects with enhanced collaboration features.",
    category: "billing"
  },
  {
    question: "How do I cancel my subscription?",
    answer: "To cancel your subscription, go to Settings > Subscription > Manage Subscription and click 'Cancel Subscription'. Your access will continue until the end of your current billing period.",
    category: "billing"
  }
];
