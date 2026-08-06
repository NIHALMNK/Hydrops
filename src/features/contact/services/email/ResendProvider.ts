import { Resend } from 'resend';
import type { EmailProvider, EmailPayload } from './EmailProvider';

export class ResendProvider implements EmailProvider {
  private resend: Resend;

  constructor(apiKey?: string) {
    const key = apiKey || process.env.RESEND_API_KEY || '';
    this.resend = new Resend(key);
  }

  private generateHtml(payload: EmailPayload): string {
    const formattedDate = new Date(payload.createdAt).toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Hydrops Website Contact Enquiry</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8f6f1; color: #1a1a1a; margin: 0; padding: 24px; }
            .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e8e5df; }
            .header { background-color: #08180e; padding: 36px 28px; text-align: center; border-bottom: 3px solid #c8a96a; }
            .header h1 { color: #faf8f5; font-size: 26px; font-weight: 300; letter-spacing: 0.12em; margin: 0; }
            .header p { color: #c8a96a; font-size: 11px; text-transform: uppercase; letter-spacing: 0.25em; margin: 8px 0 0 0; }
            .content { padding: 32px 28px; }
            .field-group { margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid #f3eee4; }
            .field-group:last-child { border-bottom: none; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #737373; font-weight: 600; margin-bottom: 4px; }
            .value { font-size: 15px; color: #1a1a1a; line-height: 1.5; }
            .message-box { background-color: #f8f6f1; border-left: 3px solid #c8a96a; padding: 18px; border-radius: 0 8px 8px 0; font-size: 15px; line-height: 1.6; color: #2c2c2c; white-space: pre-wrap; }
            .footer { background-color: #f3eee4; padding: 20px 28px; font-size: 12px; color: #737373; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>HYDROPS</h1>
              <p>Website Contact Enquiry</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Full Name</div>
                <div class="value"><strong>${payload.name}</strong></div>
              </div>

              <div class="field-group">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${payload.email}" style="color: #205c3b; text-decoration: none; font-weight: 500;">${payload.email}</a></div>
              </div>

              ${
                payload.phone
                  ? `<div class="field-group">
                      <div class="label">Phone Number</div>
                      <div class="value"><a href="tel:${payload.phone}" style="color: #205c3b; text-decoration: none;">${payload.phone}</a></div>
                    </div>`
                  : ''
              }

              ${
                payload.subject
                  ? `<div class="field-group">
                      <div class="label">Subject</div>
                      <div class="value">${payload.subject}</div>
                    </div>`
                  : ''
              }

              <div class="field-group">
                <div class="label">Message</div>
                <div class="message-box">${payload.message}</div>
              </div>

              <div class="field-group">
                <div class="label">Submitted At</div>
                <div class="value">${formattedDate} (IST)</div>
              </div>
            </div>
            <div class="footer">
              This message was sent automatically via the Hydrops Contact Page.
            </div>
          </div>
        </body>
      </html>
    `;
  }

  async sendEmail(payload: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const receiver = process.env.CONTACT_RECEIVER_EMAIL || 'official@hydrops.in';
      const from = process.env.FROM_EMAIL || 'Hydrops Contact <noreply@hydrops.in>';

      const { data, error } = await this.resend.emails.send({
        from,
        to: [receiver],
        replyTo: payload.email,
        subject: `Hydrops Website Contact Enquiry: ${payload.subject || 'New Message'}`,
        text: `Hydrops Website Contact Enquiry\n\nFull Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone || 'N/A'}\nSubject: ${payload.subject || 'N/A'}\n\nMessage:\n${payload.message}\n\nSubmitted At: ${payload.createdAt}`,
        html: this.generateHtml(payload),
      });

      if (error) {
        console.error('Resend SDK error:', error);
        return { success: false, error: error.message || 'Failed to deliver email via Resend' };
      }

      return { success: true, messageId: data?.id };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('ResendProvider exception:', errorMessage);
      return { success: false, error: errorMessage };
    }
  }
}
