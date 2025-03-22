
import { FAQItem } from "@/components/support/faq/types";

export const generalFAQs: FAQItem[] = [
  {
    id: "g1",
    question: "How do I reset my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page. Follow the instructions sent to your email to create a new password.",
    category: "Account",
    tags: ["account", "password", "login"]
  },
  {
    id: "g2",
    question: "How can I update my billing information?",
    answer: "To update your billing information, go to 'Settings > Subscription' and click on 'Update Payment Method'. You can enter your new payment details there.",
    category: "Billing",
    tags: ["billing", "payment", "subscription"]
  },
  {
    id: "g3",
    question: "Can I change my subscription plan?",
    answer: "Yes, you can change your subscription plan at any time. Go to 'Settings > Subscription' and select 'Change Plan' to view available options.",
    category: "Billing",
    tags: ["subscription", "plan", "upgrade", "downgrade"]
  },
  {
    id: "g4",
    question: "How do I export my data?",
    answer: "To export your data, go to 'Settings > Account' and select 'Export Data'. You can choose which data to export and in what format.",
    category: "Account",
    tags: ["export", "data", "backup"]
  },
  {
    id: "g5",
    question: "Is my data secure?",
    answer: "Yes, we take data security very seriously. All data is encrypted both in transit and at rest. We use industry-standard security measures to protect your information.",
    category: "Security",
    tags: ["security", "privacy", "encryption"]
  },
  {
    id: "g6",
    question: "How can I contact customer support?",
    answer: "You can contact our customer support team by clicking on the 'Contact Us' button in the Support section, or by sending an email to support@example.com.",
    category: "Help",
    tags: ["contact", "support", "help"]
  },
  {
    id: "g7",
    question: "What are the system requirements?",
    answer: "Our application works on all modern browsers and operating systems. For optimal performance, we recommend using the latest version of Chrome, Firefox, Safari, or Edge.",
    category: "Technical",
    tags: ["system", "requirements", "compatibility"]
  },
  {
    id: "g8",
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your subscription at any time. Go to 'Settings > Subscription' and click on 'Cancel Subscription'. Your account will remain active until the end of your billing cycle.",
    category: "Billing",
    tags: ["cancel", "subscription", "billing"]
  }
];

export default generalFAQs;
