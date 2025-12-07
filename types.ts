export interface ChatMessage {
  id: string;
  sender: 'user' | 'doctor';
  text: string;
  timestamp: Date;
}

export interface AnalyzeResult {
  success: boolean;
  result: string;
}

export interface BackendFile {
  name: string;
  language: string;
  content: string;
}