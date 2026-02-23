const BOOKS = [
  {
    id: "wager",
    title: "The Wager",
    author: "David Grann",
    year: 2023,
    genre: "History",
    summary:
      "A true survival and mutiny story about a British naval expedition that wrecked off Patagonia and returned with two conflicting versions of what happened.",
    whyRead:
      "Great for readers who want high-stakes leadership lessons, endurance, and sharp narrative nonfiction.",
    source: "https://www.penguinrandomhouse.com/books/313182/the-wager-by-david-grann/"
  },
  {
    id: "james",
    title: "James",
    author: "Percival Everett",
    year: 2024,
    genre: "Literary Fiction",
    summary:
      "A bold reimagining of 'Adventures of Huckleberry Finn' from Jim's point of view, blending satire, emotion, and social critique.",
    whyRead:
      "It is one of the most discussed recent novels and rewards close reading and conversation.",
    source: "https://www.penguinrandomhouse.com/books/704505/james-by-percival-everett/"
  },
  {
    id: "intermezzo",
    title: "Intermezzo",
    author: "Sally Rooney",
    year: 2024,
    genre: "Contemporary Fiction",
    summary:
      "After their father's death, two brothers navigate grief, ambition, and intimacy while their very different lives begin to collide.",
    whyRead:
      "Strong character work and modern relationship themes make it ideal if you want serious fiction with emotional range.",
    source: "https://us.macmillan.com/books/9780374602637/intermezzo"
  },
  {
    id: "anxious-generation",
    title: "The Anxious Generation",
    author: "Jonathan Haidt",
    year: 2024,
    genre: "Nonfiction / Psychology",
    summary:
      "An argument that phone-based childhood and social-media-first adolescence have reshaped mental health, especially for younger generations.",
    whyRead:
      "Useful for anyone thinking about focus, behavior, and the cultural tradeoffs of always-on technology.",
    source: "https://www.penguinrandomhouse.com/books/739177/the-anxious-generation-by-jonathan-haidt/"
  },
  {
    id: "martyr",
    title: "Martyr!",
    author: "Kaveh Akbar",
    year: 2024,
    genre: "Literary Fiction",
    summary:
      "A young poet in recovery becomes obsessed with martyrs, identity, and meaning, pushing toward art and self-understanding.",
    whyRead:
      "Inventive prose and philosophical depth make it a sophisticated pick with strong voice.",
    source: "https://www.penguinrandomhouse.com/books/704130/martyr-by-kaveh-akbar/"
  },
  {
    id: "demon-copperhead",
    title: "Demon Copperhead",
    author: "Barbara Kingsolver",
    year: 2022,
    genre: "Literary Fiction",
    summary:
      "A modern Appalachian retelling of Dickens that follows a resilient boy through poverty, addiction, and the struggle to define his own future.",
    whyRead:
      "It is immersive, socially sharp, and gives the list another heavyweight novel with strong emotional depth.",
    source:
      "https://www.harpercollins.com/products/demon-copperhead-barbara-kingsolver"
  }
];

const ACTIVE_KEY = "bookshelf.activeBookId";
const READ_KEY = "bookshelf.readBookIds";

const shelfEl = document.getElementById("shelf");
const detailsEl = document.getElementById("details");
const template = document.getElementById("details-template");

const state = {
  activeBookId: loadActiveBookId(),
  readBookIds: loadReadIds()
};

renderApp();

function renderApp() {
  renderShelf();
  renderDetails();
}

function renderShelf() {
  shelfEl.innerHTML = "";

  BOOKS.forEach((book) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "book-spine";

    const isActive = book.id === state.activeBookId;
    const isRead = state.readBookIds.has(book.id);

    if (isActive) button.classList.add("is-active");
    if (isRead) button.classList.add("is-read");

    button.setAttribute("role", "option");
    button.setAttribute("aria-selected", String(isActive));
    button.innerHTML = `
      <span class="spine-title">${book.title}</span>
      <span class="spine-author">${book.author}</span>
      ${isRead ? '<span class="read-chip">Read</span>' : ''}
    `;

    button.addEventListener("click", () => {
      state.activeBookId = book.id;
      persistActiveBookId();
      renderApp();
    });

    shelfEl.appendChild(button);
  });
}

function renderDetails() {
  const book = getActiveBook();

  if (!book) {
    detailsEl.innerHTML = "<p>Select a book to see details.</p>";
    return;
  }

  const content = template.content.cloneNode(true);
  content.getElementById("book-year").textContent = String(book.year);
  content.getElementById("book-genre").textContent = book.genre;
  content.getElementById("book-title").textContent = book.title;
  content.getElementById("book-author").textContent = book.author;
  content.getElementById("book-summary").textContent = book.summary;
  content.getElementById("book-why").textContent = `Why read in 2026: ${book.whyRead}`;

  const readToggle = content.getElementById("read-toggle");
  const isRead = state.readBookIds.has(book.id);
  readToggle.textContent = isRead ? "Mark as unread" : "Mark as read";
  if (isRead) {
    readToggle.classList.add("is-read");
  }

  readToggle.addEventListener("click", () => {
    toggleRead(book.id);
    renderApp();
  });

  const sourceLink = content.getElementById("source-link");
  sourceLink.href = book.source;

  detailsEl.innerHTML = "";
  detailsEl.appendChild(content);
}

function getActiveBook() {
  return BOOKS.find((book) => book.id === state.activeBookId) ?? BOOKS[0];
}

function toggleRead(bookId) {
  if (state.readBookIds.has(bookId)) {
    state.readBookIds.delete(bookId);
  } else {
    state.readBookIds.add(bookId);
  }

  persistReadIds();
}

function loadActiveBookId() {
  const saved = localStorage.getItem(ACTIVE_KEY);
  if (!saved) return BOOKS[0].id;
  const exists = BOOKS.some((book) => book.id === saved);
  return exists ? saved : BOOKS[0].id;
}

function persistActiveBookId() {
  localStorage.setItem(ACTIVE_KEY, state.activeBookId);
}

function loadReadIds() {
  try {
    const raw = localStorage.getItem(READ_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id) => BOOKS.some((book) => book.id === id)));
  } catch {
    return new Set();
  }
}

function persistReadIds() {
  localStorage.setItem(READ_KEY, JSON.stringify([...state.readBookIds]));
}
