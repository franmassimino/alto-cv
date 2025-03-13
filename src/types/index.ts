import { User, Account, Session, VerificationToken, Template, Resume, ResumeVersion, Chat, ChatMessage, Attachment, MessageSender, TemplateType } from '@prisma/client';

// Interfaz para el modelo User
export interface IUser extends User {
    accounts: Account[];
    sessions: Session[];
    templates: Template[];
    resumes: Resume[];
    chats: Chat[];
}

// Interfaz para el modelo Account
export interface IAccount extends Account {
    user: User;
}

// Interfaz para el modelo Session
export interface ISession extends Session {
    user: User;
}

// Interfaz para el modelo VerificationToken
export interface IVerificationToken extends VerificationToken { }

// Interfaz para el modelo Template
export interface ITemplate extends Template {
    user?: IUser;
    resumes: Resume[];
}

// Interfaz para el modelo Resume
export interface IResume extends Resume {
    template?: ITemplate;
    user: IUser;
    versions: IResumeVersion[];
    currentVersion?: IResumeVersion;
    chats: IChat[];
}

// Interfaz para el modelo ResumeVersion
export interface IResumeVersion extends ResumeVersion {
    resume: IResume;
    asCurrentOf?: IResume;
}

// Interfaz para el modelo Chat
export interface IChat extends Chat {
    resume?: IResume;
    user: IUser;
    messages: IChatMessage[];
}

// Interfaz para el modelo ChatMessage
export interface IChatMessage extends ChatMessage {
    chat: IChat;
    attachments: IAttachment[];
}

// Interfaz para el modelo Attachment
export interface IAttachment extends Attachment {
    chatMessage: IChatMessage;
}

// Enums
export { MessageSender, TemplateType };