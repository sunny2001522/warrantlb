import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Timestamp, getFirestore, getDoc, doc as firestoreDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYJsGahiNxAh0YS7Ykrj3Kvxe13stWtLI",
  authDomain: "warrent-20e16.firebaseapp.com",
  projectId: "warrent-20e16",
  storageBucket: "warrent-20e16.firebasestorage.app",
  messagingSenderId: "676250915863",
  appId: "1:676250915863:web:3b7c288aa354a2854a7852",
  measurementId: "G-4EML2BWTHG",
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export default app;

// LiveStream
export interface LiveStreamData {
  youtubeUrl: string;
  scheduledTime: string;
  title?: string;
  isActive: boolean;
}

interface FirestoreTimestampLike {
  toDate?: () => Date;
  seconds?: number;
  nanoseconds?: number;
}

const LIVE_STREAM_DOC = "current";
const LIVE_STREAM_COLLECTION = "liveStreams";

function padTimePart(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatDateTimeLocalValue(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return [
    date.getFullYear(),
    padTimePart(date.getMonth() + 1),
    padTimePart(date.getDate()),
  ].join("-") + `T${padTimePart(date.getHours())}:${padTimePart(date.getMinutes())}`;
}

export function isLiveStreamExpired(scheduledTime: string): boolean {
  if (!scheduledTime) return false;
  const scheduled = new Date(scheduledTime).getTime();
  if (Number.isNaN(scheduled)) return false;
  const after3h = scheduled + 3 * 60 * 60 * 1000;
  return Date.now() > after3h;
}

export function normalizeLiveStreamData(data: Partial<LiveStreamData> & {
  scheduledTime?: string | Timestamp | FirestoreTimestampLike | null;
}): LiveStreamData {
  const scheduledTime = data.scheduledTime;

  if (typeof scheduledTime === "string") {
    const date = new Date(scheduledTime);
    return {
      youtubeUrl: data.youtubeUrl ?? "",
      scheduledTime: Number.isNaN(date.getTime()) ? scheduledTime : date.toISOString(),
      title: data.title ?? "",
      isActive: Boolean(data.isActive),
    };
  }

  if (scheduledTime instanceof Timestamp) {
    return {
      youtubeUrl: data.youtubeUrl ?? "",
      scheduledTime: scheduledTime.toDate().toISOString(),
      title: data.title ?? "",
      isActive: Boolean(data.isActive),
    };
  }

  if (scheduledTime && typeof scheduledTime === "object") {
    if (typeof scheduledTime.toDate === "function") {
      return {
        youtubeUrl: data.youtubeUrl ?? "",
        scheduledTime: scheduledTime.toDate().toISOString(),
        title: data.title ?? "",
        isActive: Boolean(data.isActive),
      };
    }

    if (typeof scheduledTime.seconds === "number") {
      const ms = scheduledTime.seconds * 1000 + Math.floor((scheduledTime.nanoseconds ?? 0) / 1_000_000);
      return {
        youtubeUrl: data.youtubeUrl ?? "",
        scheduledTime: new Date(ms).toISOString(),
        title: data.title ?? "",
        isActive: Boolean(data.isActive),
      };
    }
  }

  return {
    youtubeUrl: data.youtubeUrl ?? "",
    scheduledTime: "",
    title: data.title ?? "",
    isActive: Boolean(data.isActive),
  };
}

export async function fetchLiveStream(): Promise<LiveStreamData | null> {
  const snap = await getDoc(firestoreDoc(db, LIVE_STREAM_COLLECTION, LIVE_STREAM_DOC));
  if (!snap.exists()) return null;
  return normalizeLiveStreamData(snap.data() as Partial<LiveStreamData>);
}

export async function setLiveStream(data: LiveStreamData): Promise<void> {
  const normalized = normalizeLiveStreamData(data);
  await setDoc(firestoreDoc(db, LIVE_STREAM_COLLECTION, LIVE_STREAM_DOC), normalized);
}
