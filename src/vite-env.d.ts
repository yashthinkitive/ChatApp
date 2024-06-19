/// <reference types="vite/client" />

declare module 'react-chat-engine' {
    import { ComponentType } from 'react';
  
    interface SendMessageParams {
      text?: string;
      files?: FileList;
    }
  
    interface IsTypingParams {
      chatId: number;
    }
  
    export function sendMessage(creds: any, chatId: number, message: SendMessageParams): void;
    export function isTyping(props: IsTypingParams, chatId: number): void;
  
    export const ChatEngine: ComponentType<any>;
  }
  