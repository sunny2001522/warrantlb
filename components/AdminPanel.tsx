import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  db,
  fetchLiveStream,
  formatDateTimeLocalValue,
  normalizeLiveStreamData,
  setLiveStream,
  type LiveStreamData,
} from "../firebase";
import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import {
  REGISTRATION_EVENTS,
  type RegistrationInfo,
} from "../constants";

interface AdminPanelProps {
  open: boolean;
  onClose: () => void;
}

interface ExperienceCourseResponseItem {
  experienceCourses?: {
    id: number;
    name: string;
    showDateTime: string;
    price: number;
    originalPrice: number;
  };
}

const FIXED_MEMBER_ID = "13997";

function parseShowDateTime(showDateTime: string) {
  const match = showDateTime.match(
    /^(\d{4})年(\d{2})月(\d{2})日\([^)]+\)\s+(\d{2}):(\d{2})-(\d{2}):(\d{2})$/,
  );

  if (!match) {
    return {
      dateStr: showDateTime,
      timeStr: "",
      targetDate: "",
    };
  }

  const [, year, month, day, startHour, startMinute, endHour, endMinute] = match;

  return {
    dateStr: `${Number(month)}/${Number(day)}`,
    timeStr: `${startHour}:${startMinute} - ${endHour}:${endMinute}`,
    targetDate: `${year}-${month}-${day}T${startHour}:${startMinute}:00`,
  };
}

function mapExperienceCoursesToEvents(items: ExperienceCourseResponseItem[]): RegistrationInfo[] {
  return items
    .map((item) => item.experienceCourses)
    .filter((course): course is NonNullable<ExperienceCourseResponseItem["experienceCourses"]> => Boolean(course))
    .map((course, index) => {
      const parsed = parseShowDateTime(course.showDateTime);
      return {
        id: course.id ?? index + 1,
        title: course.name,
        dateStr: parsed.dateStr,
        timeStr: parsed.timeStr,
        targetDate: parsed.targetDate,
        originalPrice: Number(course.originalPrice ?? 0),
        discountPrice: Number(course.price ?? 0),
        url: "",
        productType: 0,
        functionId: 0,
      };
    });
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ open, onClose }) => {
  const [events, setEvents] = useState<RegistrationInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [source, setSource] = useState<"firestore" | "constants">("constants");
  const [editingEvent, setEditingEvent] = useState<RegistrationInfo | null>(null);
  const [memberImporting, setMemberImporting] = useState(false);
  const hasAutoSyncedRef = useRef(false);

  // Live Stream state
  const [liveForm, setLiveForm] = useState<LiveStreamData>({
    youtubeUrl: "",
    scheduledTime: "",
    title: "",
    isActive: false,
  });
  const [liveSaving, setLiveSaving] = useState(false);
  const [liveLoaded, setLiveLoaded] = useState(false);

  useEffect(() => {
    if (!open) return;
    fetchLiveStream().then((data) => {
      if (data) setLiveForm(data);
      setLiveLoaded(true);
    }).catch(() => setLiveLoaded(true));
  }, [open]);

  const handleLiveSave = async () => {
    setLiveSaving(true);
    try {
      const normalized = normalizeLiveStreamData(liveForm);
      await setLiveStream(normalized);
      setLiveForm(normalized);
    } catch (e: any) {
      alert("直播儲存失敗：" + (e.message || e));
    } finally {
      setLiveSaving(false);
    }
  };

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

  const handleImportByMemberId = async () => {
    setMemberImporting(true);
    try {
      const response = await fetch(
        `/api/experience-course?authorMemberId=${FIXED_MEMBER_ID}`,
      );

      if (!response.ok) {
        throw new Error(`API 錯誤 (${response.status})`);
      }

      const result = (await response.json()) as ExperienceCourseResponseItem[];
      const importedEvents = mapExperienceCoursesToEvents(result);

      if (importedEvents.length === 0) {
        throw new Error("查無講座資料");
      }

      const existingSnapshot = await getDocs(collection(db, "registrationEvents"));
      await Promise.all(existingSnapshot.docs.map((item) => deleteDoc(item.ref)));

      for (const event of importedEvents) {
        await setDoc(doc(db, "registrationEvents", String(event.id)), event);
      }

      setEvents(importedEvents);
      setSource("firestore");
      setEditingEvent(null);
    } catch (err) {
      alert("匯入講座失敗: " + (err as Error).message);
    } finally {
      setMemberImporting(false);
    }
  };

  useEffect(() => {
    if (!open) {
      hasAutoSyncedRef.current = false;
      return;
    }

    if (hasAutoSyncedRef.current) return;
    hasAutoSyncedRef.current = true;
    void handleImportByMemberId();
  }, [open]);

  if (!open) return null;

  return (
    <div className="min-h-screen bg-[#080c14] text-white px-4 py-6 md:px-6 md:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 rounded-[2rem] border border-[#d4af37]/20 bg-gradient-to-br from-[#121d34] via-[#0f1a2e] to-[#0a111f] p-6 shadow-2xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-bold tracking-[0.35em] text-[#d4af37]/70">ADMIN</span>
              <h1 className="mt-2 text-3xl font-black text-[#d4af37] md:text-4xl">管理後台</h1>
              <span className="mt-2 block text-sm text-gray-400">
                資料來源：{source === "firestore" ? "Firestore" : "Constants (本機)"}
              </span>
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10"
            >
              返回首頁
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#d4af37]/25 bg-[#0f1a2e] shadow-2xl">
        {/* Header */}
          <div className="sticky top-0 z-10 rounded-t-[2rem] border-b border-[#d4af37]/20 bg-[#0f1a2e]/95 p-4 backdrop-blur md:p-5">
            <h2 className="text-lg font-black text-[#d4af37] md:text-xl">直播與講座資料管理</h2>
          </div>

        {/* Body */}
          <div className="p-4 space-y-4 md:p-6">
          {loading ? (
            <div className="text-center py-12 text-gray-400">載入中...</div>
          ) : (
            <>
              {/* Live Stream Management */}
              <div className="bg-black/40 border border-[#d4af37]/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[#d4af37] font-bold text-sm">直播管理</h3>
                  {liveLoaded && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setLiveForm((p) => ({ ...p, isActive: !p.isActive }))}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          liveForm.isActive ? "bg-green-600" : "bg-gray-600"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            liveForm.isActive ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                      <span className={`text-xs font-bold ${liveForm.isActive ? "text-green-400" : "text-gray-500"}`}>
                        {liveForm.isActive ? "ON" : "OFF"}
                      </span>
                    </div>
                  )}
                </div>
                {liveLoaded ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-gray-400 text-[10px] font-bold block mb-1">YouTube URL</label>
                      <input
                        type="text"
                        value={liveForm.youtubeUrl}
                        placeholder="https://www.youtube.com/watch?v=..."
                        onChange={(e) => setLiveForm((p) => ({ ...p, youtubeUrl: e.target.value }))}
                        className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-gray-400 text-[10px] font-bold block mb-1">預定時間</label>
                        <input
                          type="datetime-local"
                          value={formatDateTimeLocalValue(liveForm.scheduledTime)}
                          onChange={(e) =>
                            setLiveForm((p) => ({
                              ...p,
                              scheduledTime: e.target.value ? new Date(e.target.value).toISOString() : "",
                            }))
                          }
                          className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-[10px] font-bold block mb-1">標題（選填，空白自動抓 YouTube 標題）</label>
                        <input
                          type="text"
                          value={liveForm.title || ""}
                          placeholder="不填則自動顯示 YouTube 影片標題"
                          onChange={(e) => setLiveForm((p) => ({ ...p, title: e.target.value }))}
                          className="w-full bg-black/60 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-[#d4af37] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleLiveSave}
                      disabled={liveSaving}
                      className={`w-full py-2.5 font-bold text-sm rounded-lg transition-colors disabled:opacity-50 ${
                        liveForm.isActive
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-[#d4af37] hover:bg-[#b8962e] text-black"
                      }`}
                    >
                      {liveSaving ? "儲存中..." : liveForm.isActive ? "儲存並啟用直播" : "儲存直播設定（目前關閉）"}
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">載入中...</div>
                )}
              </div>

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

              <div className="rounded-xl border border-[#d4af37]/20 bg-black/20 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-end">
                  <div className="flex-1">
                    <span className="mb-1 block text-xs font-bold text-gray-400">固定講座 Member ID</span>
                    <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm font-bold text-white">
                      {FIXED_MEMBER_ID}
                    </div>
                  </div>
                  <button
                    onClick={handleImportByMemberId}
                    disabled={memberImporting}
                    className="px-4 py-2 bg-[#d4af37] hover:bg-[#c9a230] text-black text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {memberImporting ? "匯入中..." : "用 Member ID 匯入講座"}
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  會從 `authorMemberId` API 抓講座，並直接覆蓋 Firestore 目前的講座清單。
                </p>
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
