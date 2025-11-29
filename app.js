// ------------- KIDS CONFIG ------------------------------------

const kids = [
  { id: "tali", name: "Tali", age: 13, emoji: "🌟", tagline: "Big Sis Guardian" },
  { id: "tai", name: "Tai", age: 10, emoji: "⚔️", tagline: "Quest Master" },
  { id: "moses", name: "Moses", age: 5, emoji: "🛡️", tagline: "Brave Helper" },
  { id: "toby", name: "Toby", age: 3, emoji: "🧸", tagline: "Tiny Adventurer" },
  { id: "ziah", name: "Ziah", age: 3, emoji: "🚀", tagline: "Mini Rocket" },
];

// Per-kid quests (you can change these)
const kidQuests = {
  tali: [
    {
      id: "tali-room",
      icon: "🧹",
      title: "Calm Zone",
      description: "Tidy your room so it feels calm and comfy.",
      coins: 4,
    },
    {
      id: "tali-help",
      icon: "🤝",
      title: "Big Sis Helper",
      description: "Help one younger sibling with a task.",
      coins: 5,
    },
    {
      id: "tali-checkin",
      icon: "💬",
      title: "Talk Time",
      description: "Have a quick check-in chat with Mum or Dad.",
      coins: 3,
    },
  ],
  tai: [
    {
      id: "tai-room",
      icon: "🧸",
      title: "Room Ranger",
      description: "Pick up toys and clothes from your room floor.",
      coins: 4,
    },
    {
      id: "tai-dishes",
      icon: "🍽️",
      title: "Kitchen Guard",
      description: "Help stack dishes or wipe the table after a meal.",
      coins: 3,
    },
    {
      id: "tai-kind",
      icon: "💥",
      title: "Kindness Combo",
      description: "Do one unexpected kind thing for someone.",
      coins: 4,
    },
  ],
  moses: [
    {
      id: "moses-teeth",
      icon: "🪥",
      title: "Tooth Hero",
      description: "Brush teeth in the morning and night.",
      coins: 3,
    },
    {
      id: "moses-toys",
      icon: "🧱",
      title: "Toy Tidy",
      description: "Help pack away toys into the toy box.",
      coins: 3,
    },
    {
      id: "moses-quiet",
      icon: "📚",
      title: "Story Time",
      description: "Look at a book or listen to a story quietly.",
      coins: 2,
    },
  ],
  toby: [
    {
      id: "toby-toys",
      icon: "🧸",
      title: "Little Helper",
      description: "Put 3 toys in the box with help.",
      coins: 2,
    },
    {
      id: "toby-snack",
      icon: "🍎",
      title: "Snack Helper",
      description: "Help bring rubbish to the bin after snack.",
      coins: 2,
    },
  ],
  ziah: [
    {
      id: "ziah-toys",
      icon: "🧸",
      title: "Little Helper",
      description: "Put 3 toys in the box with help.",
      coins: 2,
    },
    {
      id: "ziah-snack",
      icon: "🥛",
      title: "Snack Helper",
      description: "Help bring rubbish to the bin after snack.",
      coins: 2,
    },
  ],
};

const moodsMap = {
  happy: "Happy 😊",
  okay: "Okay 🙂",
  sad: "Sad 😢",
  angry: "Angry 😡",
  proud: "Proud 🌟",
};

// ------------- STATE / STORAGE --------------------------------

const STORAGE_KEY = "familyHubState_v1";

let state = {
  activeKidId: "tali",
  kids: {}, // { kidId: { coins: number, completedQuestIds: [], mood: 'happy' | null } }
};

function initKidStateIfNeeded(kidId) {
  if (!state.kids[kidId]) {
    state.kids[kidId] = {
      coins: 0,
      completedQuestIds: [],
      mood: null,
    };
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // first time, set defaults
      kids.forEach((k) => initKidStateIfNeeded(k.id));
      return;
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      state = {
        activeKidId: parsed.activeKidId || "tali",
        kids: parsed.kids || {},
      };
      // ensure all kids exist
      kids.forEach((k) => initKidStateIfNeeded(k.id));
    }
  } catch (err) {
    console.error("Failed to load Family Hub state", err);
    kids.forEach((k) => initKidStateIfNeeded(k.id));
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save Family Hub state", err);
  }
}

// ------------- DOM LOOKUPS ------------------------------------

const kidTabsEl = document.getElementById("kidTabs");
const kidEmojiEl = document.getElementById("kidEmoji");
const kidNameEl = document.getElementById("kidName");
const kidTaglineEl = document.getElementById("kidTagline");
const kidCoinsEl = document.getElementById("kidCoins");

const moodStatusEl = document.getElementById("moodStatus");
const moodButtons = Array.from(document.querySelectorAll(".mood-btn"));

const questsListEl = document.getElementById("questsList");
const questsSummaryEl = document.getElementById("questsSummary");

const toggleParentBtn = document.getElementById("toggleParentBtn");
const parentPanel = document.getElementById("parentPanel");
const resetKidQuestsBtn = document.getElementById("resetKidQuestsBtn");
const resetKidAllBtn = document.getElementById("resetKidAllBtn");
const resetAllKidsBtn = document.getElementById("resetAllKidsBtn");

// ------------- RENDER HELPERS ---------------------------------

function getActiveKid() {
  return kids.find((k) => k.id === state.activeKidId) || kids[0];
}

function getKidState(kidId) {
  initKidStateIfNeeded(kidId);
  return state.kids[kidId];
}

function renderKidTabs() {
  kidTabsEl.innerHTML = "";
  kids.forEach((kid) => {
    const btn = document.createElement("button");
    btn.className = "kid-tab";
    if (kid.id === state.activeKidId) {
      btn.classList.add("active");
    }
    btn.dataset.kidId = kid.id;

    const emojiSpan = document.createElement("span");
    emojiSpan.textContent = kid.emoji;
    const nameSpan = document.createElement("span");
    nameSpan.textContent = kid.name;

    btn.appendChild(emojiSpan);
    btn.appendChild(nameSpan);

    btn.addEventListener("click", () => {
      state.activeKidId = kid.id;
      saveState();
      renderAll();
    });

    kidTabsEl.appendChild(btn);
  });
}

function renderKidSummary() {
  const kid = getActiveKid();
  const kidData = getKidState(kid.id);

  kidEmojiEl.textContent = kid.emoji;
  kidNameEl.textContent = kid.name;
  kidTaglineEl.textContent = kid.tagline;
  kidCoinsEl.textContent = kidData.coins;
}

function renderMood() {
  const kid = getActiveKid();
  const kidData = getKidState(kid.id);

  const moodKey = kidData.mood;
  if (moodKey && moodsMap[moodKey]) {
    moodStatusEl.textContent = moodsMap[moodKey];
  } else {
    moodStatusEl.textContent = "No mood picked yet";
  }

  moodButtons.forEach((btn) => {
    const key = btn.dataset.mood;
    if (key === moodKey) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function renderQuests() {
  const kid = getActiveKid();
  const kidData = getKidState(kid.id);
  const quests = kidQuests[kid.id] || [];

  questsListEl.innerHTML = "";

  const completedCount = quests.filter((q) => kidData.completedQuestIds.includes(q.id)).length;
  questsSummaryEl.textContent = `${completedCount}/${quests.length} done`;

  quests.forEach((quest) => {
    const isCompleted = kidData.completedQuestIds.includes(quest.id);

    const card = document.createElement("article");
    card.className = "quest-card";

    const left = document.createElement("div");
    left.className = "quest-left";
    const icon = document.createElement("div");
    icon.className = "quest-icon";
    icon.textContent = quest.icon;
    const coins = document.createElement("div");
    coins.className = "quest-coins";
    coins.textContent = `+${quest.coins} coins`;
    left.appendChild(icon);
    left.appendChild(coins);

    const main = document.createElement("div");
    main.className = "quest-main";

    const titleRow = document.createElement("div");
    titleRow.className = "quest-title-row";
    const title = document.createElement("h3");
    title.className = "quest-title";
    title.textContent = quest.title;
    const status = document.createElement("span");
    status.className = "quest-status-pill";
    status.textContent = isCompleted ? "Completed" : "Not yet";
    titleRow.appendChild(title);
    titleRow.appendChild(status);

    const desc = document.createElement("p");
    desc.className = "quest-desc";
    desc.textContent = quest.description;

    const btn = document.createElement("button");
    btn.className = "quest-button";
    btn.textContent = isCompleted ? "Done ✅" : "Complete Quest";
    btn.disabled = isCompleted;
    if (isCompleted) {
      btn.classList.add("completed");
    }

    btn.addEventListener("click", () => handleCompleteQuest(kid.id, quest));

    main.appendChild(titleRow);
    main.appendChild(desc);
    main.appendChild(btn);

    card.appendChild(left);
    card.appendChild(main);
    questsListEl.appendChild(card);
  });
}

function renderAll() {
  renderKidTabs();
  renderKidSummary();
  renderMood();
  renderQuests();
}

// ------------- HANDLERS ---------------------------------------

function handleCompleteQuest(kidId, quest) {
  const kidData = getKidState(kidId);
  if (kidData.completedQuestIds.includes(quest.id)) return;

  kidData.completedQuestIds.push(quest.id);
  kidData.coins += quest.coins;

  saveState();
  renderKidSummary();
  renderQuests();
}

function handleMoodClick(moodKey) {
  const kid = getActiveKid();
  const kidData = getKidState(kid.id);
  kidData.mood = moodKey;
  saveState();
  renderMood();
}

// Parent controls
function toggleParentPanel() {
  const isHidden = parentPanel.hasAttribute("hidden");
  if (isHidden) {
    parentPanel.removeAttribute("hidden");
  } else {
    parentPanel.setAttribute("hidden", "");
  }
}

function resetCurrentKidQuests() {
  const kid = getActiveKid();
  if (!confirm(`Reset quests for ${kid.name}? Coins stay the same.`)) return;
  const kidData = getKidState(kid.id);
  kidData.completedQuestIds = [];
  saveState();
  renderQuests();
}

function resetCurrentKidAll() {
  const kid = getActiveKid();
  if (!confirm(`Reset coins, quests and mood for ${kid.name}?`)) return;
  state.kids[kid.id] = {
    coins: 0,
    completedQuestIds: [],
    mood: null,
  };
  saveState();
  renderAll();
}

function resetAllKids() {
  if (!confirm("Reset ALL kids (coins, quests and moods)?")) return;
  kids.forEach((k) => {
    state.kids[k.id] = {
      coins: 0,
      completedQuestIds: [],
      mood: null,
    };
  });
  saveState();
  renderAll();
}

// ------------- INIT -------------------------------------------

function init() {
  loadState();
  renderAll();

  moodButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.mood;
      handleMoodClick(key);
    });
  });

  toggleParentBtn.addEventListener("click", toggleParentPanel);
  resetKidQuestsBtn.addEventListener("click", resetCurrentKidQuests);
  resetKidAllBtn.addEventListener("click", resetCurrentKidAll);
  resetAllKidsBtn.addEventListener("click", resetAllKids);
}

document.addEventListener("DOMContentLoaded", init);
