'use client';

import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import type { ContactFormInput, SubmissionResult } from '../types';
import { sendContactAction } from '../actions/sendContactAction';

interface UseContactFormProps {
  successMessage?: string;
  errorMessage?: string;
}

export function useContactForm({ successMessage, errorMessage }: UseContactFormProps = {}) {
  const [formData, setFormData] = useState<Omit<ContactFormInput, 'formLoadedAt'>>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formLoadedAtRef = useRef<number>(0);

  useEffect(() => {
    formLoadedAtRef.current = Date.now();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const submissionData: ContactFormInput = {
        ...formData,
        formLoadedAt: formLoadedAtRef.current,
      };

      const result: SubmissionResult = await sendContactAction(submissionData);

      if (result.success) {
        toast.success(successMessage || result.message || 'Message sent successfully!');

        // Trigger Google Analytics / GTM event if available
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const windowWithDataLayer = window as any;
          if (Array.isArray(windowWithDataLayer.dataLayer)) {
            windowWithDataLayer.dataLayer.push({
              event: 'contact_form_submit',
            });
          }
        }

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          website: '',
        });
        formLoadedAtRef.current = Date.now();
      } else {
        toast.error(result.error || errorMessage || 'Failed to submit form.');
      }
    } catch {
      toast.error(errorMessage || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
