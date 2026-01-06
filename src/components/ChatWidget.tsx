import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/integroai-logo-icon-white.png";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const INITIAL_QUICK_REPLIES = [
  { label: "What services do you offer?", message: "What services does IntegroAI offer?" },
  { label: "Tell me about the framework", message: "Can you explain the IntegroAI framework?" },
  { label: "Book a Discovery Call", message: "How can I book a Discovery Call?" },
];

// Contextual follow-up suggestions based on AI response content
const CONTEXTUAL_SUGGESTIONS: { keywords: string[]; suggestions: { label: string; message: string }[] }[] = [
  {
    keywords: ["service", "readiness", "strategy", "governance", "pilot", "vendor", "use case"],
    suggestions: [
      { label: "How much does it cost?", message: "What's the pricing for your services?" },
      { label: "Book a Discovery Call", message: "I'd like to book a free Discovery Call" },
    ],
  },
  {
    keywords: ["framework", "discover", "design", "validate", "deliver", "iterate"],
    suggestions: [
      { label: "How long does it take?", message: "How long does the typical engagement take?" },
      { label: "What's the first step?", message: "What's the first step to get started?" },
    ],
  },
  {
    keywords: ["selina", "founder", "experience", "years"],
    suggestions: [
      { label: "What makes you different?", message: "What makes IntegroAI different from other consultants?" },
      { label: "Book a Discovery Call", message: "I'd like to book a free Discovery Call" },
    ],
  },
  {
    keywords: ["price", "cost", "pricing", "budget", "investment"],
    suggestions: [
      { label: "Book a Discovery Call", message: "I'd like to book a free Discovery Call to discuss pricing" },
      { label: "What's included?", message: "What's typically included in an engagement?" },
    ],
  },
  {
    keywords: ["discovery call", "book", "calendly", "meeting", "schedule"],
    suggestions: [
      { label: "What happens on the call?", message: "What should I expect from the Discovery Call?" },
      { label: "How do I prepare?", message: "How should I prepare for the Discovery Call?" },
    ],
  },
  {
    keywords: ["ready", "readiness", "assessment", "evaluate"],
    suggestions: [
      { label: "Is my business ready?", message: "How do I know if my business is ready for AI?" },
      { label: "Book a Discovery Call", message: "I'd like to book a free Discovery Call" },
    ],
  },
];

function getContextualSuggestions(lastAssistantMessage: string): { label: string; message: string }[] {
  const lowerContent = lastAssistantMessage.toLowerCase();
  
  for (const ctx of CONTEXTUAL_SUGGESTIONS) {
    if (ctx.keywords.some((kw) => lowerContent.includes(kw))) {
      return ctx.suggestions;
    }
  }
  
  // Default fallback suggestions
  return [
    { label: "Tell me more", message: "Can you tell me more about that?" },
    { label: "Book a Discovery Call", message: "I'd like to book a free Discovery Call" },
  ];
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm here to help you learn about IntegroAI's services. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const streamChat = useCallback(
    async (userMessages: Message[], onDelta: (text: string) => void, onDone: () => void) => {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: userMessages }),
      });

      if (!resp.ok || !resp.body) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to connect");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) onDelta(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) onDelta(content);
          } catch {
            /* ignore */
          }
        }
      }

      onDone();
    },
    []
  );

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    setShowQuickReplies(false);
    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    let assistantSoFar = "";

    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > 1 && prev[prev.length - 2]?.role === "user") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat(
        newMessages,
        (chunk) => upsertAssistant(chunk),
        () => setIsLoading(false)
      );
    } catch (e) {
      console.error("Chat error:", e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again or book a Discovery Call directly." },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickReply = (message: string) => {
    sendMessage(message);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent-warm text-accent-warm-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-background border border-border rounded-2xl shadow-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <img src={logoIcon} alt="IntegroAI" className="w-6 h-6 object-contain" />
                <span className="font-semibold text-sm">IntegroAI Assistant</span>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-muted text-foreground rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {/* Initial Quick Replies */}
              {showQuickReplies && messages.length === 1 && !isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {INITIAL_QUICK_REPLIES.map((qr, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickReply(qr.message)}
                      className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {qr.label}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Contextual Follow-up Suggestions */}
              {!isLoading && messages.length > 1 && messages[messages.length - 1]?.role === "assistant" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {getContextualSuggestions(messages[messages.length - 1].content).map((qr, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickReply(qr.message)}
                      className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {qr.label}
                    </button>
                  ))}
                </motion.div>
              )}
              
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground px-4 py-2.5 rounded-2xl rounded-bl-md">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our services..."
                  className="flex-1 px-4 py-2.5 text-sm bg-muted rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isLoading}
                />
                <Button
                  size="icon"
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="rounded-full w-10 h-10 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
