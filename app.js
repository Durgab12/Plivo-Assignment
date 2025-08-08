const API_KEY = 2adf2dec47f84d04b3917a6d7175aaa9;

async function handleAudio() {
  const fileInput = document.getElementById('audioUpload');
  const file = fileInput.files[0];
  if (!file) {
    alert("Please upload a file.");
    return;
  }

  // Step 1: Upload file to AssemblyAI
  const uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
    method: 'POST',
    headers: { authorization: API_KEY },
    body: file,
  });
  const uploadData = await uploadResponse.json();
  const audioUrl = uploadData.upload_url;

  // Step 2: Request transcription + diarization
  const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
    method: 'POST',
    headers: {
      authorization: API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      audio_url: audioUrl,
      speaker_labels: true
    }),
  });
  const transcriptData = await transcriptResponse.json();
  const transcriptId = transcriptData.id;

  // Step 3: Poll until done
  let status = 'queued';
  let transcriptResult;
  while (status !== 'completed') {
    const polling = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
      headers: { authorization: API_KEY }
    });
    transcriptResult = await polling.json();
    status = transcriptResult.status;
    await new Promise(r => setTimeout(r, 3000));
  }

  // Step 4: Display results
  document.getElementById('results').classList.remove('hidden');
  document.getElementById('transcription').textContent = transcriptResult.text;

  let diarizationOutput = '';
  transcriptResult.words.forEach(word => {
    diarizationOutput += `[Speaker ${word.speaker}] ${word.text} `;
  });
  document.getElementById('diarization').textContent = diarizationOutput;
}
