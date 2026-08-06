import type { ContactPageData } from '@/features/contact/types';

export const fallbackContactPageData: ContactPageData = {
  hero: {
    eyebrow: 'CONNECT WITH HYDROPS',
    heading: 'We would love to hear from you',
    highlightedWord: 'hear from you',
    description:
      'Reach out to our team regarding inquiries, corporate orders, press, or partnership opportunities. We respond to all messages within 24 hours.',
  },
  cards: {
    phone: {
      title: 'Phone Enquiries',
      phoneNumbers: ['+91 70121 23505', '+91 98765 43210'],
    },
    whatsapp: {
      title: 'Instant WhatsApp',
      buttonText: 'Chat on WhatsApp',
      whatsappNumber: '+917012123505',
    },
    location: {
      title: 'Our Headquarters',
      address: 'Kadungalloor, Aluva, Ernakulam, Kerala 683110, India',
      googleMapsUrl: 'https://maps.app.goo.gl/LykpGeLBQjAHpcVd8',
    },
    businessHours: {
      title: 'Business Hours',
      workingHours: 'Monday – Saturday: 08:00 AM — 07:00 PM IST',
    },
  },
  formContent: {
    sectionTitle: 'SEND US A MESSAGE',
    heading: 'Begin the Conversation',
    description:
      'Fill out the form below and a representative from Hydrops will get back to you promptly.',
    submitButtonText: 'Send Message',
    successMessage:
      'Thank you for reaching out. Your message has been delivered to Hydrops.',
    errorMessage:
      'Unable to send message at this moment. Please try again or reach out via WhatsApp.',
    labels: {
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number (Optional)',
      subject: 'Subject (Optional)',
      message: 'Your Message',
    },
    placeholders: {
      fullName: 'e.g. Alexander Wright',
      email: 'alexander@example.com',
      phone: '+91 98765 43210',
      subject: 'Product Inquiry / Bulk Order',
      message: 'Tell us how we can assist you...',
    },
  },
  map: {
    googleMapsUrl: 'https://maps.app.goo.gl/LykpGeLBQjAHpcVd8',
  },
  cta: {
    title: 'Prefer Direct Communication?',
    description:
      'Connect with us immediately via direct call, WhatsApp message, or direct email.',
    buttons: [
      { type: 'call', label: 'Call Now', url: 'tel:+917012123505' },
      { type: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/917012123505' },
      { type: 'email', label: 'Email Us', url: 'mailto:official@hydrops.in' },
    ],
  },
};

export const contactPageData = fallbackContactPageData;

