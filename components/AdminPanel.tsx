import React, { useState, useEffect, useCallback } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import {
  REGISTRATION_EVENTS,
  type RegistrationInfo,
} from "../constants";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ open, onClose }) => {
  const [events, setEvents] = useState<RegistrationInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [source, setSource] = useState<"firestore" | "constants">("constants");
  const [editingEvent, setEditingEvent] = useState<RegistrationInfo | null>(null);

  const loadFromFirestore = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "registrationEvents"));
      if (!snapshot.empty) {
        const data = snapshot.docs
          .map((d) => ({ id: Number(d.id), ...d.data() } as RegistrationInfo))
          .sort((a, b) => a.id - b.id);
        setEvents(data);
        setSource("firestore");
      } else {
        setEvents([...REGISTRATION_EVENTS]);
        setSource("constants");
      }
    } catch {
      setEvents([...REGISTRATION_EVENTS]);
      setSource("constants");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (open) loadFromFirestore();
  }, [open, loadFromFirestore]);

  const handleSave = async (event: RegistrationInfo) => {
    setSaving(true);
    try {
      await setDoc(doc(db, "registrationEvents", String(event.id)), {
        title: event.title,
        dateStr: event.dateStr,
        timeStr: event.timeStr,
        targetDate: event.targetDate,
        originalPrice: event.originalPrice,
        discountPrice: event.discountPrice,
        url: event.url,
        productType: event.productType,
        functionId: event.functionId,
      });
      setEditingEvent(null);
      await loadFromFirestore();
    } catch (err) {
      alert("儲存失敗: " + (err as Error).message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("確定要刪除這筆講座？")) return;
    setSaving(true);
    try {
      await deleteDoc(doc(db, "registrationEvents", String(id)));
      await loadFromFirestore();
    } catch (err) {
      alert("刪除失敗: " + (err as Error).message);
    }
    setSaving(false);
  };

  const handleAddNew = () => {
    const newId = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;
    setEditingEvent({
      id: newId,
      title: "",
      dateStr: "",
      timeStr: "",
      targetDate: "",
      originalPrice: 0,
      discountPrice: 0,
      url: "",
      productType: 0,
      functionId: 0,
    });
  };

  const pushAllToFirestore = async () => {
    setSaving(true);
    try {
      for (const event of REGISTRATION_EVENTS) {
        await setDoc(doc(db, "registrationEvents", String(event.id)), {
          title: event.title,
          dateStr: event.dateStr,
          timeStr: event.timeStr,
          targetDate: event.targetDate,
          originalPrice: event.originalPrice,
          discountPrice: event.discountPrice,
          url: event.url,
          productType: event.productType,
          functionId: event.functionId,
        });
      }
      await loadFromFirestore();
    } catch (err) {
      alert("同步失敗: " + (err as Error).message);
    }
    setSaving(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f1a2e] border border-[#d4af37]/40 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#0f1a2e] border-b border-[#d4af37]/20 p-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-black text-[#d4af37]">管理後台</h2>
            <span className="text-xs text-gray-400">
              資料來源：{source === "firestore" ? "Firestore" : "Constants (本機)"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/30 flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {loading ? (
            <div className="text-center py-12 text-gray-400">載入中...</div>
          ) : (
            <>
              {/* Action buttons */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleAddNew}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  + 新增講座
                </button>
                {source === "constants" && (
                  <button
                    onClick={pushAllToFirestore}
                    disabled={saving}
                    className="px-4 py-2 bg-[#d4af37] hover:bg-[#c9a230] text-black text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                  >
                    同步至 Firestore
                  </button>
                )}
                <button
                  onClick={loadFromFirestore}
                  disabled={loading}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors"
                >
                  重新載入
                </button>
              </div>

              {/* Editing form */}
              {editingEvent && (
                <EditForm
                  event={editingEvent}
                  saving={saving}
                  onSave={handleSave}
                  onCancel={() => setEditingEvent(null)}
                  onChange={setEditingEvent}
                />
              )}

              {/* Event list */}
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-sm truncate">
                        {event.title}
                      </h4>
                      <p className="text-gray-400 text-xs mt-1">
                        {event.dateStr} {event.timeStr}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        原價 ${event.originalPrice} → ${event.discountPrice} |
                        目標日: {event.targetDate}
                      </p>
                      <p className="text-gray-600 text-xs mt-1 truncate">
                        {event.url}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => setEditingEvent({ ...event })}
                        className="px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 text-xs font-bold rounded-lg transition-colors"
                      >
                        編輯
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 text-xs font-bold rounded-lg transition-colors"
                      >
                        刪除
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Inline Edit Form ── */
interface EditFormProps {
  event: RegistrationInfo;
  saving: boolean;
  onSave: (e: RegistrationInfo) => void;
  onCancel: () => void;
  onChange: (e: RegistrationInfo) => void;
}

const EditForm: React.FC<EditFormProps> = ({ event, saving, onSave, onCancel, onChange }) => {
  const field = (label: string, key: keyof RegistrationInfo, type = "text") => (
    <label className="flex flex-col gap-1">
      <span className="text-gray-400 text-xs font-bold">{label}</span>
      <input
        type={type}
        value={event[key] as string | number}
        onChange={(e) =>
          onChange({
            ...event,
            [key]: type === "number" ? Number(e.target.value) : e.target.value,
          })
        }
        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#d4af37]/60"
      />
    </label>
  );

  return (
    <div className="bg-[#d4af37]/5 border border-[#d4af37]/30 rounded-xl p-4 space-y-3">
      <h4 className="text-[#d4af37] font-bold text-sm">
        {event.title ? "編輯講座" : "新增講座"}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {field("標題", "title")}
        {field("日期顯示 (如: 3/19 (四))", "dateStr")}
        {field("時間 (如: 21:00 - 22:00)", "timeStr")}
        {field("目標日期 (ISO)", "targetDate")}
        {field("原價", "originalPrice", "number")}
        {field("折扣價", "discountPrice", "number")}
        {field("報名連結", "url")}
        {field("productType", "productType", "number")}
        {field("functionId", "functionId", "number")}
      </div>
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onSave(event)}
          disabled={saving}
          className="px-4 py-2 bg-[#d4af37] hover:bg-[#c9a230] text-black text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? "儲存中..." : "儲存"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  );
};
