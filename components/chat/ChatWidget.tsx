import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import avatarImage from "../../assets/Gemini_Generated_Image_3zi9un3zi9un3zi9.png";

// ============ Types ============
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  linkText?: string;
  linkUrl?: string;
}

interface ChatWidgetProps {
  authorSlug?: string;
  apiBaseUrl?: string;
  avatarUrl?: string;
  authorName?: string;
}

// ============ Config ============
const API_BASE_URL =
  import.meta.env.VITE_CHAT_API_URL || "https://authorai.onrender.com";
const DEFAULT_AVATAR = avatarImage;
const ASSISTANT_NAME = "恩如老師小助手";

// Debug log - v2 with link support
console.log("[ChatWidget] v2 - API_BASE_URL:", API_BASE_URL);

// ============ Generate ID ============
const generateId = () => Math.random().toString(36).substr(2, 9);

// ============ Session Management ============
const getSessionId = (authorSlug: string): string => {
  const key = `cmoney_chat_session_${authorSlug}`;
  let sessionId = localStorage.getItem(key);
  if (!sessionId) {
    sessionId = generateId();
    localStorage.setItem(key, sessionId);
  }
  return sessionId;
};

// ============ Messages Storage ============
const getStoredMessages = (
  authorSlug: string,
  sessionId: string,
): Message[] => {
  const key = `cmoney_chat_messages_${authorSlug}_${sessionId}`;
  const stored = localStorage.getItem(key);
  if (!stored) return [];
  try {
    return JSON.parse(stored).map((m: any) => ({
      ...m,
      timestamp: new Date(m.timestamp),
    }));
  } catch {
    return [];
  }
};

const storeMessages = (
  authorSlug: string,
  sessionId: string,
  messages: Message[],
) => {
  const key = `cmoney_chat_messages_${authorSlug}_${sessionId}`;
  localStorage.setItem(key, JSON.stringify(messages.slice(-50)));
};

// ============ Main Component ============
export const ChatWidget: React.FC<ChatWidgetProps> = ({
  authorSlug = "enru",
  apiBaseUrl = API_BASE_URL,
  avatarUrl = DEFAULT_AVATAR,
  authorName = ASSISTANT_NAME,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sessionId = getSessionId(authorSlug);

  // Debug: Component mount
  useEffect(() => {
    console.log("[ChatWidget] Component mounted! apiBaseUrl:", apiBaseUrl);
  }, []);

  // Load messages on mount
  useEffect(() => {
    const stored = getStoredMessages(authorSlug, sessionId);
    if (stored.length > 0) {
      setMessages(stored);
    }
  }, [authorSlug, sessionId]);

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0) {
      storeMessages(authorSlug, sessionId, messages);
    }
  }, [messages, authorSlug, sessionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInputValue("");
      setIsLoading(true);
      setError(null);

      try {
        console.log(
          "[ChatWidget] Sending message to:",
          `${apiBaseUrl}/chat/${authorSlug}/message`,
        );
        const response = await fetch(
          `${apiBaseUrl}/chat/${authorSlug}/message`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, content: content.trim() }),
          },
        );

        if (!response.ok) throw new Error("API error");

        const data = await response.json();
        console.log(
          "[ChatWidget] API Response:",
          JSON.stringify(data, null, 2),
        );
        console.log(
          "[ChatWidget] linkText:",
          data.linkText,
          "linkUrl:",
          data.linkUrl,
        );

        const assistantMessage: Message = {
          id: data.messageId || generateId(),
          role: "assistant",
          content: data.content,
          timestamp: new Date(data.timestamp || Date.now()),
          linkText: data.linkText,
          linkUrl: data.linkUrl,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        setError("抱歉，發生了一些問題，請稍後再試");
        console.error("Chat error:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [apiBaseUrl, authorSlug, sessionId, isLoading],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // 檢查是否正在使用輸入法（IME）
    // isComposing 為 true 表示正在輸入中文，此時 Enter 是確認輸入，不是送出
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-TW", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleExpand = () => {
    setIsOpen(false);
    navigate("/chat");
  };

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 z-40 w-[calc(100vw-2rem)] md:w-[380px] h-[70vh] md:h-[520px] max-h-[520px] flex flex-col bg-[#0a0806]/95 backdrop-blur-xl border border-[#d4af37]/30 rounded-2xl shadow-2xl overflow-hidden animate-[windowOpen_0.3s_ease-out]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#d4af37]/50">
                <img
                  src={avatarUrl}
                  alt={authorName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  恩如老師小助手
                </p>
                <p className="text-[#d4af37] text-xs">線上</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Expand button */}
              <button
                onClick={handleExpand}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="展開全頁"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                  />
                </svg>
              </button>
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#d4af37]/50 mx-auto mb-4">
                  <img
                    src={avatarUrl}
                    alt={authorName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <p className="text-gray-400 text-sm">
                  嗨！我是恩如老師小助手
                  <br />
                  有任何關於恩如老師課程的問題都可以問我喔！
                </p>
                {/* 預設問題 */}
                <div className="mt-6 flex flex-wrap justify-center gap-2 px-2">
                  {[
                    "課程內容有什麼？",
                    "什麼是超簡單投資法？",
                    "如何開始投資美股？",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => {
                // Debug: 印出每個訊息的 link 資料
                if (message.role === "assistant") {
                  console.log(
                    "[ChatWidget] Rendering message:",
                    message.id,
                    "linkUrl:",
                    message.linkUrl,
                    "linkText:",
                    message.linkText,
                  );
                }
                return (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={avatarUrl}
                          alt={authorName}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}
                    >
                      <div
                        className={`inline-block px-4 py-2.5 rounded-2xl text-sm ${
                          message.role === "user"
                            ? "bg-[#d4af37]/20 border border-[#d4af37]/50 rounded-br-sm text-white"
                            : "bg-white/5 border border-white/10 rounded-bl-sm text-gray-200"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {/* 連結按鈕 - 獨立顯示在訊息下方 */}
                      {message.role === "assistant" && message.linkUrl && (
                        <div className="mt-2">
                          <a
                            href={message.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37] hover:bg-[#aa8a2e] text-[#0a0806] text-sm font-medium rounded-full transition-colors shadow-lg"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            {message.linkText || "了解更多"}
                          </a>
                        </div>
                      )}
                      <p className="text-[10px] text-gray-600 mt-1 px-1">
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}

            {isLoading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={avatarUrl}
                    alt={authorName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex items-center gap-1 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm">
                  <div
                    className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 bg-black/30">
            <div className="flex gap-2">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-[#d4af37]/50 transition-colors">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="輸入訊息..."
                  disabled={isLoading}
                  rows={1}
                  className="w-full bg-transparent text-white text-sm placeholder-gray-500 outline-none resize-none"
                  style={{ maxHeight: "80px" }}
                />
              </div>
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                className="w-10 h-10 rounded-full bg-[#d4af37] hover:bg-[#aa8a2e] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-5 h-5 text-[#0a0806]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-28 md:right-36 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:scale-110 hover:border-[#d4af37] active:scale-95 transition-all cursor-pointer bg-[#0a0806]"
        aria-label={isOpen ? "關閉聊天" : "開啟聊天"}
      >
        {isOpen ? (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[#d4af37]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        ) : (
          <img
            src={avatarUrl}
            alt={authorName}
            className="w-full h-full object-cover object-top"
          />
        )}
      </button>

      {/* Styles */}
      <style>{`
        @keyframes windowOpen {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default ChatWidget;
