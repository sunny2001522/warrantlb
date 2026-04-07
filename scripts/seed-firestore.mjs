import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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
const db = getFirestore(app);

const REGISTRATION_EVENTS = [
  {
    id: 3045,
    title: "權證小哥-高勝率處置策略｜線上體驗課",
    dateStr: "4/7 (二)",
    timeStr: "21:00 - 22:00",
    targetDate: "2026-04-07T21:00:00",
    originalPrice: 6000,
    discountPrice: 0,
    url: "https://www.cmoney.tw/classes/classdetail/3045",
    productType: 777004,
    functionId: 3045,
  },
];

async function seed() {
  console.log("開始寫入 Firestore...");
  for (const event of REGISTRATION_EVENTS) {
    const { id, ...rest } = event;
    await setDoc(doc(db, "registrationEvents", String(id)), rest);
    console.log(`✓ 寫入講座 ${id}: ${rest.dateStr}`);
  }
  console.log(`完成！共寫入 ${REGISTRATION_EVENTS.length} 筆講座資料。`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("寫入失敗:", err.message);
  process.exit(1);
});
