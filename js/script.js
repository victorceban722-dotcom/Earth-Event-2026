const images = [
  "img/earth1.jpg",
  "img/earth2.jpg",
  "img/earth3.jpg"
];

let currentIndex = 0;
const slide = document.getElementById("slide");
const workshopSelect = document.getElementById("workshop-select");
const workshopTopic = document.getElementById("workshop-topic");

function showWorkshopTopic() {
  if (!workshopSelect || !workshopTopic) return;
  const shouldShow = workshopSelect.value === "yes";
  workshopTopic.classList.toggle("hidden", !shouldShow);
  workshopTopic.setAttribute("aria-hidden", String(!shouldShow));
}

if (workshopSelect) {
  workshopSelect.addEventListener("change", showWorkshopTopic);
}

if (slide) {
  setInterval(() => {
    slide.style.opacity = 0;

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % images.length;
      slide.src = images[currentIndex];
      slide.style.opacity = 1;
    }, 500);
  }, 3000);
}

const chatToggle = document.getElementById('chat-toggle');
const chatPanel = document.getElementById('chat-panel');
const chatClose = document.getElementById('chat-close');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

function addChatMessage(text, sender) {
  if (!chatMessages) return;
  const message = document.createElement('div');
  message.className = `chat-message ${sender}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getChatReply(message) {
  const text = message.toLowerCase();
  if (text.includes('schedule')) {
    return 'The event schedule starts at 13:00 and includes talks, a coffee break, and a workshop.';
  }
  if (text.includes('register') || text.includes('ticket')) {
    return 'You can register using the form on the page. Tickets are limited to 5 per person.';
  }
  if (text.includes('workshop')) {
    return 'The workshop starts at 15:45 and is included with your registration.';
  }
  if (text.includes('location') || text.includes('where')) {
    return 'The event takes place in Reykjavík on May 5, 2026.';
  }
  return 'I can help with the event schedule, registration, and workshops. Ask me anything!';
}

function openChat() {
  if (chatPanel) {
    chatPanel.classList.remove('hidden');
    chatInput?.focus();
  }
}

function closeChat() {
  if (chatPanel) {
    chatPanel.classList.add('hidden');
  }
}

chatToggle?.addEventListener('click', openChat);
chatClose?.addEventListener('click', closeChat);
chatForm?.addEventListener('submit', event => {
  event.preventDefault();
  const value = chatInput?.value.trim();
  if (!value) return;
  addChatMessage(value, 'user');
  if (chatInput) chatInput.value = '';
  setTimeout(() => {
    addChatMessage(getChatReply(value), 'bot');
  }, 600);
});

showWorkshopTopic();