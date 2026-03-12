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
    id: 1,
    title: "【免費直播】權證小哥-高勝率處置策略線上體驗課",
    dateStr: "3/19 (四)",
    timeStr: "21:00 - 22:00",
    targetDate: "2026-03-19T21:00:00",
    originalPrice: 6000,
    discountPrice: 0,
    url: "https://www.cmoney.tw/datasite/shoppingcar.ashx?action=checkout&productType=777004&functionid=3043",
    productType: 0,
    functionId: 0,
  },
  {
    id: 2,
    title: "【免費直播】權證小哥-高勝率處置策略線上體驗課",
    dateStr: "3/26 (四)",
    timeStr: "21:00 - 22:00",
    targetDate: "2026-03-26T21:00:00",
    originalPrice: 6000,
    discountPrice: 0,
    url: "https://www.cmoney.tw/datasite/shoppingcar.ashx?action=checkout&productType=777004&functionid=3044",
    productType: 0,
    functionId: 0,
  },
  {
    id: 3,
    title: "【免費直播】權證小哥-高勝率處置策略線上體驗課",
    dateStr: "4/09 (四)",
    timeStr: "21:00 - 22:00",
    targetDate: "2026-04-09T21:00:00",
    originalPrice: 6000,
    discountPrice: 0,
    url: "https://www.cmoney.tw/datasite/shoppingcar.ashx?action=checkout&productType=777004&functionid=3045",
    productType: 0,
    functionId: 0,
  },
];

async function seed() {
  console.log("開始寫入 Firestore...");
  for (const event of REGISTRATION_EVENTS) {
    const { id, ...rest } = event;
    await setDoc(doc(db, "registrationEvents", String(id)), rest);
    console.log(`✓ 寫入講座 ${id}: ${rest.dateStr}`);
  }
  console.log("完成！共寫入 3 筆講座資料。");
  process.exit(0);
}

seed().catch((err) => {
  console.error("寫入失敗:", err.message);
  process.exit(1);
});
