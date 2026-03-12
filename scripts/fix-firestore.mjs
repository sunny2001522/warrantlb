import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

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

const fixes = [
  { id: "1", productType: 777004, functionId: 3043 },
  { id: "2", productType: 777004, functionId: 3044 },
  { id: "3", productType: 777004, functionId: 3045 },
];

async function fix() {
  for (const f of fixes) {
    await updateDoc(doc(db, "registrationEvents", f.id), {
      productType: f.productType,
      functionId: f.functionId,
    });
    console.log(`✓ 講座 ${f.id}: productType=${f.productType}, functionId=${f.functionId}`);
  }
  console.log("完成！");
  process.exit(0);
}

fix().catch((err) => { console.error("失敗:", err.message); process.exit(1); });
