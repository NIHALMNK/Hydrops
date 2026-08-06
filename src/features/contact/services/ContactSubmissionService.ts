import type { EmailProvider } from './email/EmailProvider';
import type { RateLimiter } from '../lib/rateLimit';
import type { ContactFormInput, SubmissionResult } from '../types';
import { contactSchema } from '../validation/contact.schema';
import { contactValidationMessages } from '../validation/contact.messages';

export class ContactSubmissionService {
  constructor(
    private readonly emailProvider: EmailProvider,
    private readonly rateLimiter: RateLimiter
  ) {}

  async processSubmission(
    input: ContactFormInput,
    clientIp = '127.0.0.1',
    metadata?: { userAgent?: string; referer?: string }
  ): Promise<SubmissionResult> {
    // 1. Zod Validation
    const validation = contactSchema.safeParse(input);
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || 'Validation failed';
      return { success: false, error: firstError };
    }

    const data = validation.data;

    // 2. Anti-Spam: Honeypot field check
    if (data.website && data.website.trim().length > 0) {
      return { success: false, error: contactValidationMessages.honeypotTriggered };
    }

    // 3. Anti-Spam: Minimum Submission Time check (< 2000ms = bot)
    if (data.formLoadedAt && Date.now() - data.formLoadedAt < 2000) {
      return { success: false, error: contactValidationMessages.tooFast };
    }

    // 4. Rate Limiting Check
    const limited = await this.rateLimiter.isRateLimited(clientIp);
    if (limited) {
      return { success: false, error: contactValidationMessages.rateLimited };
    }

    const createdAt = new Date().toISOString();

    // 5. Send Email Notification directly to company
    const emailResult = await this.emailProvider.sendEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      createdAt,
      metadata,
    });

    if (!emailResult.success) {
      return {
        success: false,
        error: emailResult.error || 'Failed to deliver email. Please try again.',
      };
    }

    return {
      success: true,
      message: 'Your message has been sent successfully.',
    };
  }
}
