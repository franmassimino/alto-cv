import { z } from 'zod';

// Enum para los tipos de plantillas
export enum TemplateType {
  PREDEFINED = "PREDEFINED",
  CUSTOM = "CUSTOM",
}

// Enum para los tipos de mensajes
export enum MessageSender {
  USER = "USER",
  AI = "AI",
}

// Validaciones de usuario
export const userCreateSchema = z.object({
  name: z.string().min(3, 'Name must have at least 3 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().optional(),
});

export const userUpdateSchema = z.object({
  name: z.string().min(3, 'Name must have at least 3 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  password: z.string().optional(),
});

export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;

// Validaciones de plantillas
export const templateCreateSchema = z.object({
  name: z.string().min(3, 'Template name must have at least 3 characters'),
  description: z.string().min(10, 'Description must have at least 10 characters'),
  content: z.string().min(10, 'Content must have at least 10 characters'),
  type: z.nativeEnum(TemplateType),
  userId: z.string().optional(),
});

export const templateUpdateSchema = z.object({
  name: z.string().min(3, 'Template name must have at least 3 characters').optional(),
  description: z.string().min(10, 'Description must have at least 10 characters').optional(),
  content: z.string().min(10, 'Content must have at least 10 characters').optional(),
  type: z.nativeEnum(TemplateType).optional(),
  userId: z.string().optional(),
});

export type TemplateCreate = z.infer<typeof templateCreateSchema>;
export type TemplateUpdate = z.infer<typeof templateUpdateSchema>;

// Validaciones de currículums (Resumes)
export const resumeCreateSchema = z.object({
  title: z.string().min(3, 'Title must have at least 3 characters'),
  templateId: z.string().optional(),
  userId: z.string().min(1, 'User ID is required'),
});

export const resumeUpdateSchema = z.object({
  title: z.string().min(3, 'Title must have at least 3 characters').optional(),
  templateId: z.string().optional(),
});

export type ResumeCreate = z.infer<typeof resumeCreateSchema>;
export type ResumeUpdate = z.infer<typeof resumeUpdateSchema>;

// Validaciones de versiones de currículum (Resume Versions)
export const resumeVersionCreateSchema = z.object({
  resumeId: z.string().min(1, 'Resume ID is required'),
  versionNumber: z.number().min(1, 'Version number must be at least 1'),
  content: z.string().min(1, 'Content cannot be empty'),
  notes: z.string().optional(),
});

export type ResumeVersionCreate = z.infer<typeof resumeVersionCreateSchema>;

// Validaciones de chat y mensajes
export const chatCreateSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  resumeId: z.string().optional(),
});

export const messageCreateSchema = z.object({
  chatId: z.string().min(1, 'Chat ID is required'),
  sender: z.nativeEnum(MessageSender),
  message: z.string().min(1, 'Message cannot be empty'),
  type: z.string().optional(),
  attachments: z.array(z.object({
    fileUrl: z.string(),
    fileType: z.string(),
  })).optional(),
});

export type ChatCreate = z.infer<typeof chatCreateSchema>;
export type MessageCreate = z.infer<typeof messageCreateSchema>;
