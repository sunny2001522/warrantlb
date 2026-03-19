import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, getDoc, doc as firestoreDoc, setDoc } from "firebase/firestore";

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

const LIVE_STREAM_DOC = "current";
const LIVE_STREAM_COLLECTION = "liveStreams";

export async function fetchLiveStream(): Promise<LiveStreamData | null> {
  const snap = await getDoc(firestoreDoc(db, LIVE_STREAM_COLLECTION, LIVE_STREAM_DOC));
  if (!snap.exists()) return null;
  return snap.data() as LiveStreamData;
}

export async function setLiveStream(data: LiveStreamData): Promise<void> {
  await setDoc(firestoreDoc(db, LIVE_STREAM_COLLECTION, LIVE_STREAM_DOC), data);
}
