function logout() {
    localStorage.removeItem(`isLoggedIn`);
    localStorage.removeItem(`userEmail`);
    window.location.href=`index.html`;
}
// ─── Search Data (replace with API later) ─────────────────────────
const searchData = {
  restaurants: [
    { name: "Flo Gardens",      sub: "Nairobi · Rating 4.8",    status: "active",   link: "restaurants.html" },
    { name: "Java House",       sub: "Nairobi · Rating 4.5",    status: "active",   link: "restaurants.html" },
    { name: "Artcaffe",         sub: "Nairobi · Rating 4.3",    status: "active",   link: "restaurants.html" },
    { name: "Serene Gardens",   sub: "Nairobi · Rating 4.1",    status: "inactive", link: "restaurants.html" },
    { name: "The Talisman",     sub: "Karen · Rating 4.0",      status: "active",   link: "restaurants.html" },
    { name: "Carnivore",        sub: "Nairobi · Rating 3.9",    status: "active",   link: "restaurants.html" },
    { name: "Sankara Rooftop",  sub: "Westlands · Rating 3.8",  status: "active",   link: "restaurants.html" },
    { name: "About Thyme",      sub: "Nairobi · Rating 3.7",    status: "inactive", link: "restaurants.html" },
  ],
  users: [
    { name: "Brian Otieno",     sub: "brian@gmail.com",         status: "active",   link: "users.html" },
    { name: "Wendy Mwangi",     sub: "wendymwangi@gmail.com",   status: "active",   link: "users.html" },
    { name: "Samson Mworia",    sub: "samsonmworia@gmail.com",  status: "active",   link: "users.html" },
    { name: "Nicholas Wanyoike",sub: "nben6755@gmail.com",      status: "inactive", link: "users.html" },
    { name: "Ali Masoud",       sub: "alimasoud@gmail.com",     status: "inactive", link: "users.html" },
  ],
  reservations: [
    { name: "Brian Otieno",     sub: "Flo Gardens · Jan 15, 2026",   status: "confirmed",  link: "Dashboard.html" },
    { name: "Wendy Mwangi",     sub: "Java House · Feb 15, 2026",    status: "confirmed",  link: "Dashboard.html" },
    { name: "Angela Kimani",    sub: "Artcaffe · Mar 12, 2026",      status: "confirmed",  link: "Dashboard.html" },
    { name: "Kate Maina",       sub: "Flo Gardens · Mar 05, 2026",   status: "pending",    link: "Dashboard.html" },
    { name: "Joel Seme",        sub: "Serene Gardens · Mar 05, 2026",status: "cancelled",  link: "Dashboard.html" },
  ]
};

// ─── Build Result Item HTML ────────────────────────────────────────
function buildResultItem(item, iconClass, iconSymbol) {
  return `
    <div class="search-result-item" onclick="window.location='${item.link}'">
      <div class="search-result-icon ${iconClass}">
        <i class="${iconSymbol}"></i>
      </div>
      <div class="search-result-text">
        <p class="search-result-name">${item.name}</p>
        <p class="search-result-sub">${item.sub}</p>
      </div>
      <span class="search-result-badge ${item.status}">${item.status}</span>
    </div>`;
}

// ─── Build Group HTML ──────────────────────────────────────────────
function buildGroup(label, items, iconClass, iconSymbol) {
  if (items.length === 0) return "";
  return `
    <div class="search-group-label">${label}</div>
    ${items.map(item => buildResultItem(item, iconClass, iconSymbol)).join("")}`;
}

// ─── Handle Search Input ───────────────────────────────────────────
function handleSearch(value) {
  const dropdown = document.getElementById("searchDropdown");
  if (!dropdown) return;

  const query = value.trim().toLowerCase();

  // Hide dropdown if input is empty
  if (query === "") {
    dropdown.classList.remove("active");
    dropdown.innerHTML = "";
    return;
  }

  // Filter each category
  const matchedRestaurants = searchData.restaurants.filter(r =>
    r.name.toLowerCase().includes(query) ||
    r.sub.toLowerCase().includes(query)
  );

  const matchedUsers = searchData.users.filter(u =>
    u.name.toLowerCase().includes(query) ||
    u.sub.toLowerCase().includes(query)
  );

  const matchedReservations = searchData.reservations.filter(r =>
    r.name.toLowerCase().includes(query) ||
    r.sub.toLowerCase().includes(query)
  );

  const total = matchedRestaurants.length + matchedUsers.length + matchedReservations.length;

  // Build dropdown content
  if (total === 0) {
    dropdown.innerHTML = `<p class="search-no-results">No results found for "${value}"</p>`;
  } else {
    dropdown.innerHTML =
      buildGroup("Restaurants", matchedRestaurants, "rest-ic", "fa-solid fa-utensils") +
      buildGroup("Users",       matchedUsers,        "user-ic", "fa-solid fa-user") +
      buildGroup("Reservations",matchedReservations, "res-ic",  "fa-solid fa-calendar-check");
  }

  dropdown.classList.add("active");
}

// ─── Close dropdown when clicking outside ─────────────────────────
document.addEventListener("click", function(e) {
  const searchBar = document.querySelector(".search-bar");
  const dropdown  = document.getElementById("searchDropdown");
  if (!dropdown) return;
  if (searchBar && !searchBar.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});