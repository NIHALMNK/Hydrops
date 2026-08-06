'use server';

import { headers } from 'next/headers';
import type { ContactFormInput, SubmissionResult } from '../types';
import { ContactSubmissionService } from '../services/ContactSubmissionService';
import { ResendProvider } from '../services/email/ResendProvider';
import { defaultRateLimiter } from '../lib/rateLimit';

export async function sendContactAction(input: ContactFormInput): Promise<SubmissionResult> {
  try {
    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || undefined;
    const referer = headersList.get('referer') || undefined;

    const forwardedFor = headersList.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    const emailProvider = new ResendProvider();
    const service = new ContactSubmissionService(
      emailProvider,
      defaultRateLimiter
    );

    return await service.processSubmission(input, clientIp, { userAgent, referer });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('sendContactAction failed:', errorMessage);
    return {
      success: false,
      error: 'An unexpected server error occurred. Please try again.',
    };
  }
}
