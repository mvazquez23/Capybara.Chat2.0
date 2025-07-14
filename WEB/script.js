function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user && pass) {
    localStorage.setItem('capyUser', user);
    localStorage.setItem('capyPass', pass);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('chat-screen').classList.remove('hidden');
    loadStoredData();
  } else {
    alert('Ingresá usuario y contraseña.');
  }
}

function sendMessage() {
  const input = document.getElementById('message-input');
  const chatWindow = document.getElementById('chat-window');
  if (input.value.trim() !== '') {
    const msg = document.createElement('div');
    msg.textContent = input.value;
    msg.className = 'sent';
    chatWindow.appendChild(msg);

    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push({ type: 'sent', content: input.value });
    localStorage.setItem('messages', JSON.stringify(messages));

    input.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const chatWindow = document.getElementById('chat-window');
      const msg = document.createElement('div');
      msg.className = 'received';
      msg.textContent = `📍 Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`;
      chatWindow.appendChild(msg);

      const messages = JSON.parse(localStorage.getItem('messages')) || [];
      messages.push({ type: 'received', content: msg.textContent });
      localStorage.setItem('messages', JSON.stringify(messages));
    });
  }
}

function toggleNote() {
  document.getElementById('note-box').classList.toggle('hidden');
}

function toggleDate() {
  document.getElementById('date-box').classList.toggle('hidden');
}

function saveNotes() {
  const notes = document.getElementById('notes').value;
  localStorage.setItem('notes', notes);
  alert("Nota guardada ✅");
}

function saveDate() {
  const date = document.getElementById('important-date').value;
  localStorage.setItem('importantDate', date);
  alert("Fecha importante guardada 📅");
}

function toggleEmojiPicker() {
  document.getElementById('emoji-picker').classList.toggle('hidden');
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('emoji-picker').addEventListener("click", function(e) {
    if (e.target && e.target.textContent) {
      document.getElementById('message-input').value += e.target.textContent;
    }
  });
});

function loadStoredData() {
  const messages = JSON.parse(localStorage.getItem('messages')) || [];
  const chatWindow = document.getElementById('chat-window');
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = msg.type;
    div.textContent = msg.content;
    chatWindow.appendChild(div);
  });

  document.getElementById('notes').value = localStorage.getItem('notes') || '';
  document.getElementById('important-date').value = localStorage.getItem('importantDate') || '';
}
