// ─── Restaurant Data ───────────────────────────────────────────────
// Sorted highest to lowest rating.
// When I connect to the real API,I will replace this array with a fetch() call.
const topRatedData = [
  { name: "Flo Gardens",      location: "Nairobi",   rating: 4.8, status: "active"   },
  { name: "Java House",       location: "Nairobi",   rating: 4.5, status: "active"   },
  { name: "Artcaffe",         location: "Nairobi",   rating: 4.3, status: "active"   },
  { name: "Serene Gardens",   location: "Nairobi",   rating: 4.1, status: "inactive" },
  { name: "The Talisman",     location: "Karen",     rating: 4.0, status: "active"   },
  { name: "Carnivore",        location: "Nairobi",   rating: 3.9, status: "active"   },
  { name: "Sankara Rooftop",  location: "Westlands", rating: 3.8, status: "active"   },
  { name: "About Thyme",      location: "Nairobi",   rating: 3.7, status: "inactive" },
  { name: "Mediterraneo",     location: "Nairobi",   rating: 3.6, status: "active"   },
  { name: "Brew Bistro",      location: "Westlands", rating: 3.5, status: "active"   },
];

// ─── Rank Badge Colours ────────────────────────────────────────────
function getRankStyle(rank) {
  if (rank === 1) return "color:#f59e0b; font-weight:600;";  // gold
  if (rank === 2) return "color:#9ca3af; font-weight:600;";  // silver
  if (rank === 3) return "color:#b45309; font-weight:600;";  // bronze
  return "color:#6b7280;";
}

// ─── Rating Bar ────────────────────────────────────────────────────
function ratingBar(rating) {
  const pct = (rating / 5) * 100;
  return `
    <span style="display:flex; align-items:center; gap:8px;">
      <strong style="color:#f59e0b;">${rating.toFixed(1)}</strong>
      <span style="
        display:inline-block; width:60px; height:6px;
        background:#f3f4f6; border-radius:99px; overflow:hidden;">
        <span style="
          display:block; width:${pct}%; height:100%;
          background:#f59e0b; border-radius:99px;">
        </span>
      </span>
    </span>`;
}

// ─── Status Badge ──────────────────────────────────────────────────
function statusBadge(status) {
  if (status === "active") {
    return `<span class="status confirmed">● Active</span>`;
  }
  return `<span class="status pending">● Inactive</span>`;
}

// ─── Render Rows ───────────────────────────────────────────────────
function renderRows(data) {
  const tbody = document.getElementById("topRatedList");
  if (!tbody) return;

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding:2rem; color:#9ca3af;">
          No restaurants found.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = data.map((r, i) => `
    <tr data-status="${r.status}">
      <td style="${getRankStyle(i + 1)}">#${i + 1}</td>
      <td>${r.name}</td>
      <td>${r.location}</td>
      <td>${ratingBar(r.rating)}</td>
      <td>${statusBadge(r.status)}</td>
    </tr>
  `).join("");
}

// ─── Update Stat Cards ─────────────────────────────────────────────
function updateStats(data) {
  const total  = data.length;
  const active = data.filter(r => r.status === "active").length;
  const avg    = total > 0
    ? (data.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
    : "0.0";

  document.getElementById("totalCount").textContent = total;
  document.getElementById("activeCount").textContent = active;
  document.getElementById("avgRating").textContent   = avg;
}

// ─── Filter by Status ──────────────────────────────────────────────
function filterTopRated(value) {
  const filtered = value === "all"
    ? topRatedData
    : topRatedData.filter(r => r.status === value);
  renderRows(filtered);
  updateStats(filtered);
}

// ─── Search by Name or Location ────────────────────────────────────
function searchTopRated(value) {
  const query    = value.toLowerCase();
  const filtered = topRatedData.filter(r =>
    r.name.toLowerCase().includes(query) ||
    r.location.toLowerCase().includes(query)
  );
  renderRows(filtered);
  updateStats(filtered);
}

// ─── Init ──────────────────────────────────────────────────────────
window.addEventListener("load", () => {
  const savedPhoto = localStorage.getItem("adminPhoto");
  if (savedPhoto) {
    const el = document.getElementById("admin-photo");
    if (el) el.src = savedPhoto;
  }

  renderRows(topRatedData);
  updateStats(topRatedData);
});