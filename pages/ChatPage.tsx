import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
const avatarImage = "";

// ============ Types ============
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  linkText?: string;
  linkUrl?: string;
}

// ============ Config ============
const API_BASE_URL =
  import.meta.env.VITE_CHAT_API_URL || "https://authorai.onrender.com";
const AVATAR_URL = avatarImage;
const AUTHOR_NAME = "恩如老師小助手";
const AUTHOR_SLUG = "enru";

// ============ Utilities ============
const generateId = () => Math.random().toString(36).substr(2, 9);

const getSessionId = (): string => {
  const key = `cmoney_chat_session_${AUTHOR_SLUG}`;
  let sessionId = localStorage.getItem(key);
  if (!sessionId) {
    sessionId = generateId();
    localStorage.setItem(key, sessionId);
  }
  return sessionId;
};

const getStoredMessages = (sessionId: string): Message[] => {
  const key = `cmoney_chat_messages_${AUTHOR_SLUG}_${sessionId}`;
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

const storeMessages = (sessionId: string, messages: Message[]) => {
  const key = `cmoney_chat_messages_${AUTHOR_SLUG}_${sessionId}`;
  localStorage.setItem(key, JSON.stringify(messages.slice(-100)));
};

// Demo responses
function getDemoResponse(input: string): string {
  const lowerInput = input.toLowerCase();

  if (lowerInput.includes("課程") || lowerInput.includes("報名")) {
    return "我們的「美股致富聖經」線上體驗課完全免費！\n\n課程中我會分享：\n• 超簡單投資法的核心理念\n• 如何選擇優質美股\n• 實際操作案例分享\n\n回到主頁點擊「免費報名」按鈕即可報名喔！";
  }

  if (lowerInput.includes("投資") || lowerInput.includes("美股")) {
    return "美股投資其實沒有想像中困難！我的「超簡單投資法」核心理念是：\n\n1. 選擇趨勢向上的股票\n2. 用簡單的技術指標判斷進出場\n3. 嚴格執行停損停利\n\n想了解更多，歡迎報名我們的免費線上體驗課！";
  }

  if (
    lowerInput.includes("你好") ||
    lowerInput.includes("嗨") ||
    lowerInput.includes("hi") ||
    lowerInput.includes("hello")
  ) {
    return "你好！我是 恩如老師小助手 👋\n\n有任何關於美股投資或課程的問題都可以問我喔！";
  }

  return "感謝你的問題！\n\n如果想深入了解美股投資，推薦你報名我們的「美股致富聖經」免費線上體驗課。\n\n課程中恩如老師會親自分享 28 年的投資心得和超簡單投資法的實戰技巧！";
}

// ============ Main Component ============
export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sessionId = getSessionId();

  // Load messages on mount
  useEffect(() => {
    const stored = getStoredMessages(sessionId);
    if (stored.length > 0) {
      setMessages(stored);
    }
  }, [sessionId]);

  // Save messages when they change
  useEffect(() => {
    if (messages.length > 0) {
      storeMessages(sessionId, messages);
    }
  }, [messages, sessionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
        if (API_BASE_URL) {
          const response = await fetch(
            `${API_BASE_URL}/chat/${AUTHOR_SLUG}/message`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId, content: content.trim() }),
            },
          );

          if (!response.ok) throw new Error("API error");

          const data = await response.json();
          const assistantMessage: Message = {
            id: data.messageId || generateId(),
            role: "assistant",
            content: data.content,
            timestamp: new Date(data.timestamp || Date.now()),
            linkText: data.linkText,
            linkUrl: data.linkUrl,
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } else {
          // Demo mode
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const assistantMessage: Message = {
            id: generateId(),
            role: "assistant",
            content: getDemoResponse(content.trim()),
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        }
      } catch (err) {
        setError("抱歉，發生了一些問題，請稍後再試");
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading],
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

  const clearChat = () => {
    if (confirm("確定要清除所有對話嗎？")) {
      setMessages([]);
      localStorage.removeItem(
        `cmoney_chat_messages_${AUTHOR_SLUG}_${sessionId}`,
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0806] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2 -ml-2 rounded-lg hover:bg-white/10 transition-colors"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#d4af37]/50">
              <img
                src={AVATAR_URL}
                alt={AUTHOR_NAME}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h1 className="text-white font-semibold">{AUTHOR_NAME}</h1>
              <p className="text-[#d4af37] text-xs">線上</p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            重啟對話
          </button>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#d4af37]/50 mx-auto mb-6">
                <img
                  src={AVATAR_URL}
                  alt={AUTHOR_NAME}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                嗨！我是恩如老師小助手
                <br />
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                有任何關於恩如老師課程的問題都可以問我喔！
              </p>

              {/* Quick questions */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  "課程內容有什麼？",
                  "什麼是超簡單投資法？",
                  "如何開始投資美股？",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-gray-300 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={AVATAR_URL}
                      alt={AUTHOR_NAME}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}
                >
                  <div
                    className={`inline-block px-5 py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-[#d4af37]/20 border border-[#d4af37]/50 rounded-br-sm text-white"
                        : "bg-white/5 border border-white/10 rounded-bl-sm text-gray-200"
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                  {/* 連結按鈕 */}
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
                  <p className="text-xs text-gray-600 mt-1.5 px-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={AVATAR_URL}
                  alt={AUTHOR_NAME}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex items-center gap-1.5 px-5 py-4 bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm">
                <div
                  className="w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2.5 h-2.5 bg-[#d4af37] rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="max-w-md mx-auto px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <div className="border-t border-white/10 bg-black/50 backdrop-blur-xl sticky bottom-0">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex gap-3">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 focus-within:border-[#d4af37]/50 transition-colors">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="輸入訊息..."
                disabled={isLoading}
                rows={1}
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none resize-none"
                style={{ maxHeight: "120px" }}
              />
            </div>
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              className="w-12 h-12 rounded-xl bg-[#d4af37] hover:bg-[#aa8a2e] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors self-end"
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
    </div>
  );
}

export default ChatPage;
