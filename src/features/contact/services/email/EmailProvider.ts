export interface EmailPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
  metadata?: {
    userAgent?: string;
    referer?: string;
  };
}

export interface EmailProvider {
  sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }>;
}
