// ✅ Your Firebase config — this is fine
const firebaseConfig = {
  apiKey: "AIzaSyAtX4-cXANVUr8IRaFVxiuNQlmCv42fgHA",
  authDomain: "dreadedvcf.firebaseapp.com",
  databaseURL: "https://dreadedvcf-default-rtdb.firebaseio.com",
  projectId: "dreadedvcf",
  storageBucket: "dreadedvcf.firebasestorage.app",
  messagingSenderId: "931259893839",
  appId: "1:931259893839:web:ea17f7761116ded168823a"
};

// ✅ Initialize Firebase using compat version
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM elements
const form = document.getElementById("vcfForm");
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const countDisplay = document.getElementById("count");
const downloadBtn = document.getElementById("downloadBtn");

const TARGET_COUNT = 300;

function updateCount() {
  db.ref("contacts").once("value", (snapshot) => {
    const data = snapshot.val();
    const count = data ? Object.keys(data).length : 0;
    countDisplay.textContent = count;
    if (count >= TARGET_COUNT) {
      downloadBtn.style.display = "inline-block";
    }
  });
}
updateCount();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const number = numberInput.value.trim();

  if (!name || !number) {
    return alert("Please enter both name and number.");
  }

  const contactData = {
    name,
    number,
    timestamp: Date.now()
  };

  const newRef = db.ref("contacts").push();
  newRef
    .set(contactData)
    .then(() => {
      alert("Contact uploaded successfully!");
      nameInput.value = "";
      numberInput.value = "";
      updateCount();
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to upload contact.");
    });
});

