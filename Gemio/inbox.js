// ─── Conversations Data (I will replace with the API later) ───────────────────
const conversations = [
  {
    id: 1,
    name: "Brian Otieno",
    initials: "BO",
    type: "customer",
    online: true,
    typing: true,
    unread: true,
    time: "now",
    preview: "● ● ● typing...",
    messages: [
      { from: "them", text: "Hi, I need help with my reservation at Flo Gardens", time: "10:30 AM" },
      { from: "me",   text: "Hi Brian! Let me check that for you right away.", time: "10:31 AM" },
      { from: "them", text: "I booked for 3 people but the restaurant says they have no record of it", time: "10:32 AM" },
      { from: "me",   text: "I can see your booking — reservation #1042. I'll contact Flo Gardens now.", time: "10:33 AM" },
    ]
  },
  {
    id: 2,
    name: "Java House",
    initials: "JH",
    type: "owner",
    online: true,
    typing: false,
    unread: true,
    time: "5m ago",
    preview: "We'd like to update our opening hours...",
    messages: [
      { from: "them", text: "Hello Admin, we'd like to update our opening hours on the platform.", time: "9:55 AM" },
      { from: "me",   text: "Sure! What are your new hours?", time: "9:56 AM" },
      { from: "them", text: "We now open at 7AM instead of 8AM on weekdays.", time: "9:58 AM" },
    ]
  },
  {
    id: 3,
    name: "Wendy Mwangi",
    initials: "WM",
    type: "customer",
    online: false,
    typing: false,
    unread: true,
    time: "20m ago",
    preview: "Hi, I need help with my reservation at...",
    messages: [
      { from: "them", text: "Hi, I need help with my reservation at Artcaffe. Can I change the date?", time: "8:40 AM" },
    ]
  },
  {
    id: 4,
    name: "Flo Gardens",
    initials: "FG",
    type: "owner",
    online: false,
    typing: false,
    unread: false,
    time: "2h ago",
    preview: "Thank you for approving our listing!",
    messages: [
      { from: "them", text: "Thank you for approving our listing on Gemio!", time: "7:00 AM" },
      { from: "me",   text: "Welcome to Gemio! Looking forward to great reservations.", time: "7:05 AM" },
    ]
  },
];

// ─── Active conversation ───────────────────────────────────────────
let activeId = null;

// ─── Get initials color class ──────────────────────────────────────
function getAvClass(type) {
  return type === "customer" ? "av-customer" : "av-owner";
}

// ─── Render conversation list ──────────────────────────────────────
function renderConvList(data) {
  const list = document.getElementById("convList");
  if (!list) return;

  list.innerHTML = data.map(c => `
    <div class="conv-item ${c.unread ? "unread" : ""} ${activeId === c.id ? "active" : ""}"
         onclick="openConversation(${c.id})">
      <div class="conv-av-wrap">
        <div class="conv-av ${getAvClass(c.type)}">${c.initials}</div>
        <div class="conv-online-dot ${c.online ? "online" : "offline"}"></div>
      </div>
      <div class="conv-body">
        <div class="conv-top">
          <span class="conv-name">${c.name}</span>
          <span class="conv-time">${c.time}</span>
        </div>
        <span class="conv-type-badge ${c.type === "customer" ? "customer" : "owner"}">
          ${c.type === "customer" ? "Customer" : "Restaurant Owner"}
        </span>
        <p class="conv-preview ${c.typing ? "typing" : ""}">${c.preview}</p>
      </div>
      ${c.unread ? '<div class="conv-unread-dot"></div>' : ""}
    </div>
  `).join("");
}

// ─── Open a conversation ───────────────────────────────────────────
function openConversation(id) {
  activeId = id;
  const conv = conversations.find(c => c.id === id);
  if (!conv) return;

  // Mark as read
  conv.unread = false;
  renderConvList(conversations);

  // Show chat window
  document.getElementById("inboxEmpty").style.display  = "none";
  document.getElementById("chatWindow").style.display  = "flex";

  // Render header
  document.getElementById("chatHeader").innerHTML = `
    <div class="chat-header-av ${getAvClass(conv.type)}">${conv.initials}</div>
    <div class="chat-header-info">
      <p class="chat-header-name">
        ${conv.name}
        <span class="conv-type-badge ${conv.type === "customer" ? "customer" : "owner"}" style="font-size:10px;">
          ${conv.type === "customer" ? "Customer" : "Restaurant Owner"}
        </span>
      </p>
      <p class="chat-header-status ${conv.online ? "online" : "offline"}">
        ● ${conv.online ? "Online" : "Offline"}
      </p>
    </div>`;

  // Render messages
  renderMessages(conv);

  // Focus input
  document.getElementById("chatInput").focus();
}

// ─── Render messages in chat body ──────────────────────────────────
function renderMessages(conv) {
  const body = document.getElementById("chatBody");
  if (!body) return;

  let html = conv.messages.map(m => `
    <div class="msg-row ${m.from}">
      <div>
        <div class="bubble ${m.from}">${m.text}</div>
        <p class="bubble-time ${m.from === "me" ? "right" : ""}">${m.time}</p>
      </div>
    </div>
  `).join("");

  // Add typing indicator
  if (conv.typing) {
    html += `
      <div class="msg-row them">
        <div class="bubble them" style="color:#22c55e; font-style:italic;">● ● ● typing...</div>
      </div>`;
  }

  body.innerHTML = html;
  body.scrollTop = body.scrollHeight;
}

// ─── Send a message ────────────────────────────────────────────────
function sendMessage() {
  const input = document.getElementById("chatInput");
  const text  = input.value.trim();
  if (!text || !activeId) return;

  const conv = conversations.find(c => c.id === activeId);
  if (!conv) return;

  // Add message
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  conv.messages.push({ from: "me", text, time });
  conv.preview = text;
  conv.time    = "now";

  // Clear input and re-render
  input.value = "";
  renderMessages(conv);
  renderConvList(conversations);
}

// ─── Search conversations ──────────────────────────────────────────
function searchConversations(value) {
  const query    = value.toLowerCase();
  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.preview.toLowerCase().includes(query)
  );
  renderConvList(filtered);
}

// ─── Init ──────────────────────────────────────────────────────────
window.addEventListener("load", () => {
  renderConvList(conversations);

  // Restore saved profile photo
  const savedPhoto = localStorage.getItem("adminPhoto");
  if (savedPhoto) {
    const el = document.getElementById("admin-photo");
    if (el) el.src = savedPhoto;
  }
});