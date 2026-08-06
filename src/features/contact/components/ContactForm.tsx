'use client';

import { Loader2, Send } from 'lucide-react';
import type { ContactFormContentData } from '../types';
import { useContactForm } from '../hooks/useContactForm';

interface Props {
  data: ContactFormContentData;
}

export function ContactForm({ data }: Props) {
  const { formData, isSubmitting, handleChange, handleSubmit } = useContactForm({
    successMessage: data.successMessage,
    errorMessage: data.errorMessage,
  });

  return (
    <section className="w-full max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 py-16">
      <div className="bg-[#FAF8F5] border border-[#E8E5DF] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
        {/* Editorial Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          {data.sectionTitle && (
            <span className="text-[11px] font-mono tracking-[0.35em] text-[#C8A96A] uppercase mb-3 block">
              {data.sectionTitle}
            </span>
          )}

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#1A1A1A] mb-4">
            {data.heading}
          </h2>

          <p className="text-sm sm:text-base font-light text-[#1A1A1A]/70 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>
          {/* Honeypot anti-spam field (hidden visually from real users) */}
          <div aria-hidden="true" className="hidden opacity-0 absolute left-[-9999px]">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={formData.website || ''}
              onChange={handleChange}
            />
          </div>

          {/* Row 1: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name Field */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-xs font-medium tracking-wider text-[#1A1A1A] uppercase mb-2">
                {data.labels.fullName} <span className="text-[#C8A96A]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={data.placeholders.fullName}
                disabled={isSubmitting}
                className="w-full bg-white border border-[#E8E5DF] focus:border-[#205C3B] focus:ring-1 focus:ring-[#205C3B] rounded-2xl px-5 py-4 text-sm text-[#1A1A1A] placeholder-[#737373]/50 outline-none transition-all disabled:opacity-50"
              />
            </div>

            {/* Email Address Field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-xs font-medium tracking-wider text-[#1A1A1A] uppercase mb-2">
                {data.labels.email} <span className="text-[#C8A96A]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={data.placeholders.email}
                disabled={isSubmitting}
                className="w-full bg-white border border-[#E8E5DF] focus:border-[#205C3B] focus:ring-1 focus:ring-[#205C3B] rounded-2xl px-5 py-4 text-sm text-[#1A1A1A] placeholder-[#737373]/50 outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Row 2: Phone & Subject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Phone Number Field (Optional) */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-xs font-medium tracking-wider text-[#1A1A1A] uppercase mb-2">
                {data.labels.phone}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                placeholder={data.placeholders.phone}
                disabled={isSubmitting}
                className="w-full bg-white border border-[#E8E5DF] focus:border-[#205C3B] focus:ring-1 focus:ring-[#205C3B] rounded-2xl px-5 py-4 text-sm text-[#1A1A1A] placeholder-[#737373]/50 outline-none transition-all disabled:opacity-50"
              />
            </div>

            {/* Subject Field (Optional) */}
            <div className="flex flex-col">
              <label htmlFor="subject" className="text-xs font-medium tracking-wider text-[#1A1A1A] uppercase mb-2">
                {data.labels.subject}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject || ''}
                onChange={handleChange}
                placeholder={data.placeholders.subject}
                disabled={isSubmitting}
                className="w-full bg-white border border-[#E8E5DF] focus:border-[#205C3B] focus:ring-1 focus:ring-[#205C3B] rounded-2xl px-5 py-4 text-sm text-[#1A1A1A] placeholder-[#737373]/50 outline-none transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Row 3: Message */}
          <div className="flex flex-col">
            <label htmlFor="message" className="text-xs font-medium tracking-wider text-[#1A1A1A] uppercase mb-2">
              {data.labels.message} <span className="text-[#C8A96A]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder={data.placeholders.message}
              disabled={isSubmitting}
              className="w-full bg-white border border-[#E8E5DF] focus:border-[#205C3B] focus:ring-1 focus:ring-[#205C3B] rounded-2xl px-5 py-4 text-sm text-[#1A1A1A] placeholder-[#737373]/50 outline-none transition-all resize-none disabled:opacity-50"
            />
          </div>

          {/* Submit Button Container */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center bg-[#205C3B] hover:bg-[#18482d] text-white rounded-full px-10 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-3 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{data.submitButtonText}</span>
                  <Send className="w-4 h-4 ml-3 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
