// ---------- DATA: an object holding two arrays of task objects ----------
const tracks = {
  data: {
    name: "Data Analytics",
    summary: "Working with data and extracting insights.",
    tasks: [
      { number: 1, day: 1, title: "Data Cleaning Basics", difficulty: "Beginner",
        description: "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types." },
      { number: 2, day: 4, title: "Formulas & Pivot Tables", difficulty: "Beginner",
        description: "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset." },
      { number: 3, day: 8, title: "Data Visualization", difficulty: "Beginner → Intermediate",
        description: "Create charts and a simple dashboard that communicate useful insights from a dataset." },
      { number: 4, day: 11, title: "Introduction to SQL", difficulty: "Beginner → Intermediate",
        description: "Practice basic SQL queries and use them to answer real-world questions about data." },
      { number: 5, day: 15, title: "SQL Joins & Aggregations", difficulty: "Intermediate",
        description: "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables." },
      { number: 6, day: 19, title: "Lookup Functions & Data Wrangling", difficulty: "Intermediate",
        description: "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches." },
      { number: 7, day: 22, title: "Mini Analysis Project", difficulty: "Intermediate",
        description: "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations." },
      { number: 8, day: 26, title: "Capstone Project", difficulty: "Intermediate",
        description: "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables." }
    ]
  },
  web: {
    name: "Web Development",
    summary: "Designing and building websites and web applications.",
    tasks: [
      { number: 1, day: 1, title: "Build the TechBridge Homepage", difficulty: "Beginner",
        description: "Create the first version of the TechBridge website using HTML and CSS." },
      { number: 2, day: 4, title: "Build the TechBridge Programs Experience", difficulty: "Beginner",
        description: "Create a Programs experience presenting TechBridge's available learning programs." },
      { number: 3, day: 8, title: "Build the Internship Tasks Experience", difficulty: "Beginner → Intermediate",
        description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey." },
      { number: 4, day: 11, title: "Build an Interactive Internship Roadmap", difficulty: "Beginner → Intermediate",
        description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks." },
      { number: 5, day: 15, title: "Build the Intern Registration Experience", difficulty: "Intermediate",
        description: "Create a professional registration and onboarding interface for TechBridge interns." },
      { number: 6, day: 19, title: "Build the Task Submission System", difficulty: "Intermediate",
        description: "Create an interface through which interns can prepare and submit their task work." },
      { number: 7, day: 22, title: "Build the Intern Dashboard", difficulty: "Intermediate",
        description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions." },
      { number: 8, day: 26, title: "Build the Complete TechBridge Internship Platform", difficulty: "Intermediate",
        description: "Combine the different components created during the internship into a complete TechBridge platform." }
    ]
  }
};

// How full the difficulty meter is for each label (out of 4 bars)
const difficultyLevels = {
  "Beginner": 1,
  "Beginner → Intermediate": 2,
  "Intermediate": 3
};

// ---------- VARIABLES ----------
let currentTrack = "data"; // the track being shown right now

const section = document.getElementById("roadmap");
const taskList = document.getElementById("task-list");
const viewingName = document.getElementById("viewing-name");
const viewingSummary = document.getElementById("viewing-summary");
const trackButtons = document.querySelectorAll(".track-btn");

// ---------- FUNCTIONS ----------
// Small helper: make an element with a class and some text
function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

// Build one task card from one task object
function createTaskCard(task) {
  const level = difficultyLevels[task.difficulty];

  const item = makeElement("li", "step");

  const dot = makeElement("div", "dot");
  dot.setAttribute("aria-hidden", "true");
  dot.appendChild(makeElement("small", "", "Day"));
  dot.appendChild(makeElement("b", "", String(task.day)));

  const card = makeElement("article", "tcard lv" + level);

  const meta = makeElement("div", "tmeta");
  meta.appendChild(makeElement("span", "tnum", "Task " + task.number));
  meta.appendChild(makeElement("span", "pill", "Day " + task.day));

  const meter = makeElement("span", "meter");
  meter.setAttribute("aria-hidden", "true");
  for (let i = 1; i <= 4; i++) {
    meter.appendChild(makeElement("i", i <= level ? "f" : ""));
  }
  const levelRow = makeElement("div", "level");
  levelRow.appendChild(meter);
  levelRow.appendChild(makeElement("span", "", task.difficulty));

  card.appendChild(meta);
  card.appendChild(makeElement("h3", "", task.title));
  card.appendChild(makeElement("p", "", task.description));
  card.appendChild(levelRow);

  item.appendChild(dot);
  item.appendChild(card);
  return item;
}

// Show the selected track on the page
function showTrack(trackKey) {
  // CONDITIONAL LOGIC: only "data" and "web" are allowed
  if (trackKey === "web") {
    currentTrack = "web";
  } else {
    currentTrack = "data";
  }

  const track = tracks[currentTrack];

  // DOM MANIPULATION: update the heading, summary and task list
  viewingName.textContent = track.name.toUpperCase();
  viewingSummary.textContent = track.summary;
  section.dataset.track = currentTrack;

  taskList.innerHTML = "";
  track.tasks.forEach(function (task) {
    taskList.appendChild(createTaskCard(task));
  });

  // Highlight the active button
  trackButtons.forEach(function (button) {
    const isActive = button.dataset.track === currentTrack;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  // Remember the choice in the address bar (no page refresh)
  try {
    history.replaceState(null, "", "#" + currentTrack);
  } catch (error) {
    /* ignore: not important if this fails */
  }
}

// ---------- EVENT LISTENERS ----------
trackButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (button.dataset.track !== currentTrack) {
      showTrack(button.dataset.track);
    }
  });
});

// ---------- START ----------
// Open on the Web Development track if the link ends with #web
if (window.location.hash === "#web") {
  showTrack("web");
} else {
  showTrack("data");
}