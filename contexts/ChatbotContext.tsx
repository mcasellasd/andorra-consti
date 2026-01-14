import React, { createContext, useContext, useState, useCallback } from 'react';

interface ChatbotContextType {
  isOpen: boolean;
  openChatbot: (initialQuery?: string) => void;
  closeChatbot: () => void;
  initialQuery: string | null;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState<string | null>(null);

  const openChatbot = useCallback((query?: string) => {
    setInitialQuery(query || null);
    setIsOpen(true);
  }, []);

  const closeChatbot = useCallback(() => {
    setIsOpen(false);
    setInitialQuery(null);
  }, []);

  return (
    <ChatbotContext.Provider value={{ isOpen, openChatbot, closeChatbot, initialQuery }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within ChatbotProvider');
  }
  return context;
};

