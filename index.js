import { auth, provider } from './firebase.js';

document.getElementById('loginBtn').addEventListener('click', async () => {
  try {
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    alert(`Logged in as ${user.displayName}`);
  } catch (error) {
    console.error(error);
    alert("Login failed");
  }
});

document.getElementById('analyzeBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('audioUpload');
  const outputDiv = document.getElementById('output');
  const resultText = document.getElementById('resultText');

  if (!fileInput.files.length) {
    alert("Please upload an audio file first.");
    return;
  }

  // Placeholder for real processing
  outputDiv.classList.remove('hidden');
  resultText.textContent = "Simulated transcription and analysis will appear here...";
});
