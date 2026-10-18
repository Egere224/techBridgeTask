// ---------- DATA: an array of challenge objects ----------
const challenges = [
  {
    id: "da-sales",
    title: "Sales Analysis",
    track: "data",
    difficulty: "Beginner",
    description: "Clean and analyse a small monthly sales dataset to find the best-selling products and months.",
    outcome: "A one-page summary of monthly sales with a chart and three key findings.",
    objective: "Use a small sales dataset to find which products, months and regions sell best.",
    skills: ["Spreadsheet formulas", "Data cleaning", "Basic charts"],
    tools: ["Google Sheets", "Microsoft Excel"],
    produce: ["A cleaned sales dataset", "A Pivot Table of sales by product and month", "One clear chart", "Three written findings"],
    time: "3–4 hours"
  },
  {
    id: "da-expenses",
    title: "Expense Analysis",
    track: "data",
    difficulty: "Beginner",
    description: "Organise a month of business expenses into categories and see where the money goes.",
    outcome: "A clear breakdown of expenses by category with a short list of ideas to save money.",
    objective: "Turn a messy list of expenses into a clean summary that a business owner can understand.",
    skills: ["Data cleaning", "Formulas", "Pivot Tables"],
    tools: ["Google Sheets", "Microsoft Excel"],
    produce: ["A cleaned expense list", "A summary by category", "A bar or pie chart", "Three ideas to reduce costs"],
    time: "2–3 hours"
  },
  {
    id: "da-employees",
    title: "Employee Data Analysis",
    track: "data",
    difficulty: "Intermediate",
    description: "Combine staff and department data with lookup functions and answer HR-style questions.",
    outcome: "A combined table and a summary of headcount and average pay by department.",
    objective: "Join two related datasets, fix mismatches, and answer questions about a company's staff.",
    skills: ["VLOOKUP or XLOOKUP", "Data wrangling", "Pivot Tables"],
    tools: ["Google Sheets", "Microsoft Excel"],
    produce: ["One combined dataset", "A list of mismatches you found and fixed", "A department summary table", "A short written summary"],
    time: "4–5 hours"
  },
  {
    id: "da-orders",
    title: "Customer Orders Analysis",
    track: "data",
    difficulty: "Intermediate",
    description: "Write SQL queries across customer and order tables to answer real business questions.",
    outcome: "A set of tested SQL queries with clear answers to five business questions.",
    objective: "Use SQL to find top customers, busiest months and average order value.",
    skills: ["SQL", "JOIN", "GROUP BY", "COUNT, SUM and AVG"],
    tools: ["SQLite or any SQL tool", "Google Sheets"],
    produce: ["Five working SQL queries", "The result of each query", "A short explanation of each answer"],
    time: "4–5 hours"
  },
  {
    id: "da-churn",
    title: "Customer Churn Analysis",
    track: "data",
    difficulty: "Advanced",
    description: "Combine spreadsheet analysis and SQL to understand why customers stop buying.",
    outcome: "A short report with a simple dashboard and three recommendations backed by evidence.",
    objective: "Find patterns in customers who stopped ordering and suggest ways to keep them.",
    skills: ["SQL joins", "Pivot Tables", "Data visualization", "Business analysis"],
    tools: ["SQLite or any SQL tool", "Google Sheets or Excel"],
    produce: ["A cleaned dataset from at least two tables", "SQL queries that find inactive customers", "A dashboard with 3 or more charts", "A report with recommendations"],
    time: "6–8 hours"
  },
  {
    id: "web-landing",
    title: "Landing Page",
    track: "web",
    difficulty: "Beginner",
    description: "Build a responsive landing page for a small business or product using HTML and CSS.",
    outcome: "A one-page responsive website with a header, hero, features and a call-to-action button.",
    objective: "Practise page structure and layout by building a page that looks good on any screen.",
    skills: ["HTML structure", "CSS layout", "Responsive design"],
    tools: ["Code editor", "Browser DevTools", "Git and GitHub"],
    produce: ["A landing page with 4 or more sections", "A layout that works on phone, tablet and desktop", "The code pushed to GitHub"],
    time: "3–4 hours"
  },
  {
    id: "web-portfolio",
    title: "Portfolio Website",
    track: "web",
    difficulty: "Beginner",
    description: "Create a simple personal portfolio that introduces you and shows your projects.",
    outcome: "A multi-section portfolio page that you can share with employers.",
    objective: "Present yourself and your work clearly with clean HTML and CSS.",
    skills: ["HTML", "CSS", "Git and GitHub"],
    tools: ["Code editor", "GitHub"],
    produce: ["An about section", "A projects section with at least 2 projects", "A contact section", "The code pushed to GitHub"],
    time: "4–5 hours"
  },
  {
    id: "web-product",
    title: "Product Page",
    track: "web",
    difficulty: "Intermediate",
    description: "Design a responsive product page with an image gallery, product details and a buy button.",
    outcome: "A polished product page that works well on phone, tablet and desktop.",
    objective: "Build the kind of page an online shop would use to present one product.",
    skills: ["CSS Grid and Flexbox", "Responsive images", "JavaScript basics"],
    tools: ["Code editor", "Browser DevTools"],
    produce: ["A product page with images and details", "A gallery where clicking a thumbnail changes the main image", "A layout tested on 3 screen sizes"],
    time: "4–5 hours"
  },
  {
    id: "web-contact",
    title: "Contact Form",
    track: "web",
    difficulty: "Intermediate",
    description: "Build an accessible contact form that checks the visitor's input before it is sent.",
    outcome: "A form that shows clear error messages and a friendly success message.",
    objective: "Learn how to collect input and guide people to fill in a form correctly.",
    skills: ["HTML forms", "JavaScript validation", "Accessibility"],
    tools: ["Code editor", "Browser DevTools"],
    produce: ["A form with name, email and message fields", "Validation for empty and invalid fields", "Error and success messages"],
    time: "3–4 hours"
  },
  {
    id: "web-interactive",
    title: "Interactive Website",
    track: "web",
    difficulty: "Advanced",
    description: "Build an interactive quiz or task tracker that remembers what the visitor does.",
    outcome: "A working interactive web app with saved progress, published online.",
    objective: "Combine HTML, CSS and JavaScript into a small app that responds to the person using it.",
    skills: ["JavaScript arrays and objects", "DOM manipulation", "localStorage", "Git and GitHub"],
    tools: ["Code editor", "Browser DevTools", "GitHub Pages or another host"],
    produce: ["An app with at least 3 interactions", "Progress that is saved when the page is reloaded", "A live link and a GitHub repository"],
    time: "6–8 hours"
  }
];

const trackNames = { data: "Data Analytics", web: "Web Development" };

// ---------- VARIABLES: the current filter choices ----------
let selectedTrack = "all";
let selectedDifficulty = "all";
let searchText = "";
let lastButton = null; // remembers which button opened the popup

// ---------- PAGE ELEMENTS ----------
const grid = document.getElementById("challenge-grid");
const resultCount = document.getElementById("result-count");
const emptyMessage = document.getElementById("no-results");
const searchInput = document.getElementById("search");
const trackButtons = document.querySelectorAll("[data-filter-track]");
const difficultyButtons = document.querySelectorAll("[data-filter-difficulty]");
const resetButton = document.getElementById("reset-filters");
const emptyResetButton = document.getElementById("empty-reset");
const dialog = document.getElementById("challenge-dialog");

// ---------- HELPER FUNCTIONS ----------
function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function makeTags(challenge) {
  const tags = makeElement("div", "ch-tags");
  tags.appendChild(makeElement("span", "ch-track " + challenge.track, trackNames[challenge.track]));
  tags.appendChild(makeElement("span", "ch-level " + challenge.difficulty.toLowerCase(), challenge.difficulty));
  return tags;
}

function fillList(listElement, items) {
  listElement.innerHTML = "";
  items.forEach(function (item) {
    listElement.appendChild(makeElement("li", "", item));
  });
}

// ---------- FILTER LOGIC (conditions) ----------
function matchesFilters(challenge) {
  const trackOk = selectedTrack === "all" || challenge.track === selectedTrack;
  const levelOk = selectedDifficulty === "all" || challenge.difficulty === selectedDifficulty;
  const text = (challenge.title + " " + challenge.description).toLowerCase();
  const searchOk = searchText === "" || text.includes(searchText);
  return trackOk && levelOk && searchOk;
}

// ---------- CARDS ----------
function createCard(challenge) {
  const card = makeElement("article", "ccard");
  card.dataset.track = challenge.track;

  card.appendChild(makeTags(challenge));
  card.appendChild(makeElement("h3", "", challenge.title));
  card.appendChild(makeElement("p", "ch-desc", challenge.description));

  const outcome = makeElement("div", "ch-outcome");
  outcome.appendChild(makeElement("strong", "", "Expected outcome"));
  outcome.appendChild(makeElement("span", "", challenge.outcome));
  card.appendChild(outcome);

  card.appendChild(makeElement("p", "ch-time", "Estimated time: " + challenge.time));

  const button = makeElement("button", "btn", "View Challenge");
  button.type = "button";
  button.dataset.id = challenge.id;
  button.setAttribute("aria-label", "View challenge: " + challenge.title);
  card.appendChild(button);

  return card;
}

function render() {
  const visible = challenges.filter(matchesFilters);

  grid.innerHTML = "";
  visible.forEach(function (challenge) {
    grid.appendChild(createCard(challenge));
  });

  resultCount.textContent = "Showing " + visible.length + " of " + challenges.length + " challenges";
  emptyMessage.hidden = visible.length !== 0;
}

function updateButtons(buttons, attribute, value) {
  buttons.forEach(function (button) {
    button.setAttribute("aria-pressed", String(button.getAttribute(attribute) === value));
  });
}

// ---------- DETAILS POPUP ----------
function openChallenge(id, button) {
  const challenge = challenges.find(function (item) {
    return item.id === id;
  });
  if (!challenge) return;

  lastButton = button;

  const tags = document.getElementById("dlg-tags");
  tags.replaceWith(makeTags(challenge));
  document.querySelector("#challenge-dialog .ch-tags").id = "dlg-tags";

  document.getElementById("dlg-title").textContent = challenge.title;
  document.getElementById("dlg-objective").textContent = challenge.objective;
  document.getElementById("dlg-time").textContent = challenge.time;
  document.getElementById("dlg-outcome").textContent = challenge.outcome;
  fillList(document.getElementById("dlg-skills"), challenge.skills);
  fillList(document.getElementById("dlg-tools"), challenge.tools);
  fillList(document.getElementById("dlg-produce"), challenge.produce);

  dialog.showModal();
}

// ---------- EVENT LISTENERS ----------
trackButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedTrack = button.dataset.filterTrack;
    updateButtons(trackButtons, "data-filter-track", selectedTrack);
    render();
  });
});

difficultyButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedDifficulty = button.dataset.filterDifficulty;
    updateButtons(difficultyButtons, "data-filter-difficulty", selectedDifficulty);
    render();
  });
});

searchInput.addEventListener("input", function () {
  searchText = searchInput.value.trim().toLowerCase();
  render();
});

function resetFilters() {
  selectedTrack = "all";
  selectedDifficulty = "all";
  searchText = "";
  searchInput.value = "";
  updateButtons(trackButtons, "data-filter-track", "all");
  updateButtons(difficultyButtons, "data-filter-difficulty", "all");
  render();
}
resetButton.addEventListener("click", resetFilters);
emptyResetButton.addEventListener("click", resetFilters);

// One listener on the grid handles every "View Challenge" button
grid.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-id]");
  if (button) {
    openChallenge(button.dataset.id, button);
  }
});

document.getElementById("dlg-close").addEventListener("click", function () {
  dialog.close();
});
document.getElementById("dlg-done").addEventListener("click", function () {
  dialog.close();
});

// Clicking the dark area outside the popup closes it
dialog.addEventListener("click", function (event) {
  if (event.target === dialog) {
    dialog.close();
  }
});

// When the popup closes, return focus to the button that opened it
dialog.addEventListener("close", function () {
  if (lastButton) lastButton.focus();
});

// ---------- START ----------
document.getElementById("total-count").textContent = challenges.length;
render();