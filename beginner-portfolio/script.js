import { portfolio } from "./data.js";

console.log("JavaScript connected");
const byId = (id) => document.getElementById(id);

// Render text with textContent so profile content is never treated as HTML.
byId("name").textContent = portfolio.name;
byId("introduction").textContent = portfolio.introduction;
byId("aboutText").textContent = portfolio.about;
byId("education").textContent = portfolio.education;
byId("footerName").textContent = portfolio.name;
document.title = `${portfolio.name} | Portfolio`;

for (const skill of portfolio.skills) {
  const item = document.createElement("li");
  item.textContent = skill;
  byId("skillsList").append(item);
}

function webUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}

function addLink(container, label, value) {
  const url = webUrl(value);
  if (!url) return false;
  const link = document.createElement("a");
  link.textContent = label;
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  container.append(link);
  return true;
}

if (portfolio.photo && !portfolio.photo.includes("..")) {
  const image = document.createElement("img");
  image.id = "profilePhoto";
  image.width = 320;
  image.height = 320;
  image.addEventListener("error", () => {
    image.hidden = true;
    byId("photoNote").hidden = false;
    byId("photoNote").textContent = "Photo could not load. Check its filename in data.js.";
    byId("setupNotice").hidden = false;
  });
  image.alt = `Photo of ${portfolio.name}`;
  image.src = portfolio.photo;
  byId("photoContainer").append(image);
  byId("photoNote").hidden = true;
}

const contact = byId("contactLinks");
addLink(contact, "GitHub profile", portfolio.github);
if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(portfolio.email)) {
  const emailLink = document.createElement("a");
  emailLink.href = `mailto:${portfolio.email}`;
  emailLink.textContent = portfolio.email;
  contact.append(emailLink);
}
if (!contact.children.length) contact.textContent = "Contact details have not been added yet.";

const incomplete = JSON.stringify(portfolio).includes("PLACEHOLDER") ||
  !portfolio.photo || !portfolio.email || !webUrl(portfolio.github) ||
  portfolio.projects.some((project) => project.github && !webUrl(project.github));
byId("setupNotice").hidden = !incomplete;

// Theme storage is optional: blocked browser storage must not break the page.
let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
try {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved) dark = saved === "dark";
} catch { /* Keep the system preference. */ }
function applyTheme() {
  document.body.classList.toggle("dark-mode", dark);
  byId("themeToggle").textContent = dark ? "Light mode" : "Dark mode";
  byId("themeToggle").setAttribute("aria-pressed", String(dark));
}
applyTheme();
byId("themeToggle").addEventListener("click", () => {
  dark = !dark;
  applyTheme();
  try { localStorage.setItem("portfolio-theme", dark ? "dark" : "light"); } catch { /* Optional. */ }
});

const technologies = [...new Set(portfolio.projects.flatMap((p) => p.technologies))].sort();
for (const technology of technologies) {
  const option = document.createElement("option");
  option.value = technology;
  option.textContent = technology;
  byId("technologyFilter").append(option);
}

function renderProjects() {
  const query = byId("projectSearch").value.trim().toLowerCase();
  const technology = byId("technologyFilter").value;
  const matches = portfolio.projects.filter((project) => {
    const text = [project.title, project.description, ...project.technologies].join(" ").toLowerCase();
    return text.includes(query) && (technology === "all" || project.technologies.includes(technology));
  });
  byId("projectList").replaceChildren();
  for (const project of matches) {
    const card = document.createElement("article");
    card.className = "project-card";
    const title = document.createElement("h3");
    title.textContent = project.title;
    const description = document.createElement("p");
    description.textContent = project.description;
    const tags = document.createElement("ul");
    tags.className = "technologies";
    for (const technology of project.technologies) {
      const tag = document.createElement("li");
      tag.className = "technology";
      tag.textContent = technology;
      tags.append(tag);
    }
    const links = document.createElement("div");
    links.className = "project-links";
    if (!addLink(links, "GitHub repository", project.github)) {
      const pending = document.createElement("span");
      pending.className = "pending";
      pending.textContent = "Repository link not added";
      links.append(pending);
    }
    addLink(links, "Live application", project.live);
    card.append(title, description, tags, links);
    byId("projectList").append(card);
  }
  byId("resultCount").textContent = `${matches.length} of ${portfolio.projects.length} projects`;
  byId("emptyState").hidden = matches.length > 0;
}
byId("projectSearch").addEventListener("input", renderProjects);
byId("technologyFilter").addEventListener("change", renderProjects);
byId("resetFilters").addEventListener("click", () => {
  byId("projectSearch").value = "";
  byId("technologyFilter").value = "all";
  renderProjects();
});
renderProjects();

// Questions go to our server function. The browser never receives the API key.
function addMessage(text, type) {
  const message = document.createElement("p");
  message.className = `message ${type}`;
  message.textContent = text;
  byId("chatMessages").append(message);
  message.scrollIntoView({ block: "nearest", behavior: "instant" });
}
document.querySelectorAll("[data-question]").forEach((button) => {
  button.addEventListener("click", () => {
    byId("chatInput").value = button.dataset.question;
    byId("chatInput").focus();
  });
});
let sending = false;
byId("chatForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = byId("chatInput").value.trim();
  if (sending || !question) return;
  sending = true;
  byId("sendButton").disabled = true;
  byId("chatStatus").textContent = "Getting an answer...";
  byId("chatMessages").setAttribute("aria-busy", "true");
  addMessage(question, "user");
  byId("chatInput").value = "";
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
      signal: AbortSignal.timeout(25000)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Chat request failed. Please try again.");
    if (typeof data.reply !== "string" || !data.reply.trim()) throw new Error("No answer was returned. Please try again.");
    addMessage(data.reply, "assistant");
  } catch (error) {
    const message = error.name === "TimeoutError"
      ? "The request took too long. Try again in a moment."
      : error instanceof TypeError || error instanceof SyntaxError
        ? "Cannot reach the chatbot. Check your connection and run the site with npm start or on Vercel."
        : error.message;
    addMessage(message, "error");
    // Keep the question available for a retry without overwriting a new draft.
    if (!byId("chatInput").value) byId("chatInput").value = question;
  } finally {
    sending = false;
    byId("sendButton").disabled = false;
    byId("chatStatus").textContent = "";
    byId("chatMessages").setAttribute("aria-busy", "false");
  }
});
