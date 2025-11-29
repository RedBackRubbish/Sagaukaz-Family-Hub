// ------------- KIDS CONFIG ------------------------------------

const kids = [
  // Parents
  { id: "mum", name: "Mum", age: null, emoji: "👑", tagline: "Queen of the House" },
  { id: "dad", name: "Dad", age: null, emoji: "🦍", tagline: "Gorilla in Charge" },

  // Kids
  { id: "tali", name: "Tali", age: 13, emoji: "🌟", tagline: "Big Sis Guardian" },
  { id: "tai", name: "Tai", age: 10, emoji: "⚔️", tagline: "Quest Master" },
  { id: "moses", name: "Moses", age: 5, emoji: "🛡️", tagline: "Brave Buffalo" },
  { id: "toby", name: "Toby", age: 3, emoji: "😈", tagline: "Chaos Kid" },
  { id: "ziah", name: "Ziah", age: 3, emoji: "🧸", tagline: "Tiny Adventurer" },
];


// Per-kid quests
const kidQuests = {
  // Mum quests
  // Mum quests
mum: [
  {
    id: "mum-sandwich",
    icon: "🥪",
    title: "Sandwich Queen",
    description: "Make Dad a sandwich (or choose a special snack for him).",
    coins: 5,
  },
  {
    id: "mum-reset",
    icon: "🧺",
    title: "Laundry Legend",
    description: "Do one laundry mission: load, dry, or fold.",
    coins: 4,
  },
  {
    id: "mum-break",
    icon: "👑",
    title: "Boss Meri's Break",
    description: "2 hours of alone time: coffee, pokies, scroll, relax — no interruptions.",
    coins: 8,
  },
],

  // Dad quests
  dad: [
    {
      id: "dad-bins",
      icon: "🗑️",
      title: "Bin Gorilla",
      description: "Take bins out / in or empty all house bins.",
      coins: 4,
    },
    {
      id: "dad-play",
      icon: "🎮",
      title: "Play Time Boss",
      description: "Give at least 1hr of full-focus play with the kids.",
      coins: 4,
    },
    {
      id: "dad-dishes",
      icon: "🍽️",
      title: "Dishwasher Don",
      description: "Do a full load: stack, run or empty the dishwasher.",
      coins: 3,
    },
  ],

  // Kids
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
      description: "Have a quick check-in chat with Mum or Dad. Talk about your day",
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


// Reward shop (same for all kids for now)
const rewardShop = [
  {
  id: "mum-queen-week",
  icon: "👑",
  title: "Queen of the Week",
  description: "Mum-only reward: 2-hour alone time pass (coffee, pokies, scroll) and crowned Queen of the Week.",
  cost: 40,
  onlyFor: "mum",
},
 {
    id: "dessert",
    icon: "🍨",
    title: "Choose Dessert",
    description: "Pick the special dessert for tonight.",
    cost: 10,
  },
  {
    id: "movie",
    icon: "🎬",
    title: "Movie Boss",
    description: "Choose the family movie night film.",
    cost: 20,
  },
  {
    id: "late-bed",
    icon: "🌙",
    title: "Late Bedtime",
    description: "Stay up 20 minutes later than usual.",
    cost: 25,
  },
  {
    id: "activity",
    icon: "🎢",
    title: "Weekend Activity",
    description: "Choose a fun weekend activity (within reason!).",
    cost: 35,
  },
];

const moodsMap = {
  happy: "Happy 😊",
  okay: "Okay 🙂",
  sad: "Sad 😢",
  angry: "Angry 😡",
  proud: "Proud 🌟",
};

// ------------- STATE / STORAGE --------------------------------

// bump version to avoid clashing with older structure
const STORAGE_KEY = "familyHubState_v2";

let state = {
  activeKidId: "tali",
  // kids: { kidId: { coins, completedQuestIds, mood, unlockedRewardIds } }
  kids: {},
};

function initKidStateIfNeeded(kidId) {
  if (!state.kids[kidId]) {
    state.kids[kidId] = {
      coins: 0,
      completedQuestIds: [],
      mood: null,
      unlockedRewardIds: [],
    };
  } else {
    // ensure new fields exist
    state.kids[kidId].completedQuestIds ||= [];
    state.kids[kidId].unlockedRewardIds ||= [];
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      kids.forEach((k) => initKidStateIfNeeded(k.id));
      return;
    }
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      state = {
        activeKidId: parsed.activeKidId || "tali",
        kids: parsed.kids || {},
      };
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

const rewardsListEl = document.getElementById("rewardsList");
const rewardSummaryEl = document.getElementById("rewardSummary");

const familyLevelValueEl = document.getElementById("familyLevelValue");
const familyLevelFillEl = document.getElementById("familyLevelFill");
const familySummaryTextEl = document.getElementById("familySummaryText");

const toggleParentBtn = document.getElementById("toggleParentBtn");
const parentPanel = document.getElementById("parentPanel");
const resetKidQuestsBtn = document.getElementById("resetKidQuestsBtn");
const resetKidAllBtn = document.getElementById("resetKidAllBtn");
const resetAllKidsBtn = document.getElementById("resetAllKidsBtn");

// ------------- HELPERS ----------------------------------------

function getActiveKid() {
  return kids.find((k) => k.id === state.activeKidId) || kids[0];
}

function getKidState(kidId) {
  initKidStateIfNeeded(kidId);
  return state.kids[kidId];
}

// Level formula: 1 + floor(coins / 10), cap at 20
function getKidLevel(coins) {
  return Math.min(20, 1 + Math.floor(coins / 10));
}

// Family level: 1 + floor(totalCoinsAll / 40), cap at 20
function getFamilyLevel(totalCoins) {
  return Math.min(20, 1 + Math.floor(totalCoins / 40));
}

// Progress to next family level (0–1)
function getFamilyLevelProgress(totalCoins) {
  const level = getFamilyLevel(totalCoins);
  const currentBase = (level - 1) * 40;
  const nextBase = level * 40;
  const span = nextBase - currentBase || 1;
  const within = Math.min(Math.max(totalCoins - currentBase, 0), span);
  return within / span;
}

// ------------- RENDER -----------------------------------------

function renderKidTabs() {
  kidTabsEl.innerHTML = "";
  kids.forEach((kid) => {
    const btn = document.createElement("button");
    btn.className = "kid-tab";
    if (kid.id === "toby") btn.classList.add("toby"); // chaos style
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

  const level = getKidLevel(kidData.coins);

  kidEmojiEl.textContent = kid.emoji;
  kidNameEl.textContent = kid.name;
  kidTaglineEl.textContent = `Level ${level} • ${kid.tagline}`;
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

function renderRewards() {
  const kid = getActiveKid();
  const kidData = getKidState(kid.id);

  rewardsListEl.innerHTML = "";

  if (!rewardShop.length) {
    rewardSummaryEl.textContent = "No rewards set yet.";
    return;
  }




  rewardSummaryEl.textContent = "Spend coins to unlock fun rewards.";

  rewardShop.forEach((reward) => {
    const isUnlocked = kidData.unlockedRewardIds.includes(reward.id);
    const canAfford = kidData.coins >= reward.cost;

    const card = document.createElement("article");
    card.className = "reward-card";

    const icon = document.createElement("div");
    icon.className = "reward-icon";
    icon.textContent = reward.icon;

    const main = document.createElement("div");
    main.className = "reward-main";

    const title = document.createElement("div");
    title.className = "reward-title";
    title.textContent = reward.title;

    const desc = document.createElement("div");
    desc.className = "reward-desc";
    desc.textContent = reward.description;

    const meta = document.createElement("div");
    meta.className = "reward-meta";
    meta.textContent = `${reward.cost} coins`;

    main.appendChild(title);
    main.appendChild(desc);
    main.appendChild(meta);

    const actions = document.createElement("div");
    actions.className = "reward-actions";

    const btn = document.createElement("button");
    btn.className = "reward-button";

    if (isUnlocked) {
      btn.textContent = "Unlocked ✅";
      btn.classList.add("disabled");
      btn.disabled = true;
    } else if (!canAfford) {
      btn.textContent = "Need more coins";
      btn.classList.add("disabled");
      btn.disabled = true;
    } else {
      btn.textContent = "Unlock";
      btn.addEventListener("click", () => handleUnlockReward(kid.id, reward));
    }

    actions.appendChild(btn);

    card.appendChild(icon);
    card.appendChild(main);
    card.appendChild(actions);

    rewardsListEl.appendChild(card);
  });
}

function renderFamilyLevel() {
  // total coins for all kids
  let totalCoins = 0;
  kids.forEach((kid) => {
    const data = getKidState(kid.id);
    totalCoins += data.coins || 0;
  });

  const level = getFamilyLevel(totalCoins);
  const progress = getFamilyLevelProgress(totalCoins);

  familyLevelValueEl.textContent = level;
  familyLevelFillEl.style.width = `${Math.round(progress * 100)}%`;

  familySummaryTextEl.textContent = `Family coins: ${totalCoins} • Keep completing quests to reach Level ${
    level + 1
  }!`;
}

function renderAll() {
  renderKidTabs();
  renderKidSummary();
  renderMood();
  renderQuests();
  renderRewards();
  renderFamilyLevel();
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
  renderRewards();
  renderFamilyLevel();
}

function handleMoodClick(moodKey) {
  const kid = getActiveKid();
  const kidData = getKidState(kid.id);
  kidData.mood = moodKey;
  saveState();
  renderMood();
}

function handleUnlockReward(kidId, reward) {
  const kidData = getKidState(kidId);
  if (kidData.unlockedRewardIds.includes(reward.id)) return;
  if (kidData.coins < reward.cost) return;

  const confirmMsg = `Spend ${reward.cost} coins for "${reward.title}"?`;
  if (!confirm(confirmMsg)) return;

  kidData.coins -= reward.cost;
  kidData.unlockedRewardIds.push(reward.id);

  saveState();
  renderKidSummary();
  renderRewards();
  renderFamilyLevel();
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
    unlockedRewardIds: [],
  };
  saveState();
  renderAll();
}

function resetAllKids() {
  if (!confirm("Reset ALL kids (coins, quests, moods and rewards)?")) return;
  kids.forEach((k) => {
    state.kids[k.id] = {
      coins: 0,
      completedQuestIds: [],
      mood: null,
      unlockedRewardIds: [],
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
