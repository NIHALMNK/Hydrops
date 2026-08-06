import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { contactValidationMessages } from './contact.messages';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: contactValidationMessages.nameRequired })
    .min(2, { message: contactValidationMessages.nameMinLength })
    .max(100, { message: contactValidationMessages.nameMaxLength }),

  email: z
    .string()
    .trim()
    .min(1, { message: contactValidationMessages.emailRequired })
    .email({ message: contactValidationMessages.emailInvalid }),

  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => {
        if (!val || val.length === 0) return true;
        const parsed = parsePhoneNumberFromString(val);
        return parsed ? parsed.isValid() : false;
      },
      { message: contactValidationMessages.phoneInvalid }
    ),

  subject: z
    .string()
    .trim()
    .max(150, { message: contactValidationMessages.subjectMaxLength })
    .optional(),

  message: z
    .string()
    .trim()
    .min(1, { message: contactValidationMessages.messageRequired })
    .min(10, { message: contactValidationMessages.messageMinLength })
    .max(3000, { message: contactValidationMessages.messageMaxLength }),

  // Honeypot field (must remain empty)
  website: z.string().optional(),

  // Timestamp when form was loaded (for minimum submission time check)
  formLoadedAt: z.number().optional(),
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
