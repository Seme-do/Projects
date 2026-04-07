// ─── Reservations Data (replace with API later) ────────────────────
const reservationsData = [
  { id: 1,  customer: "Brian Otieno",     restaurant: "Flo Gardens",    date: "Jan 15, 2026", guests: 3, status: "confirmed"  },
  { id: 2,  customer: "Wendy Mwangi",     restaurant: "Java House",     date: "Feb 10, 2026", guests: 2, status: "confirmed"  },
  { id: 3,  customer: "Angela Kimani",    restaurant: "Artcaffe",       date: "Feb 20, 2026", guests: 4, status: "confirmed"  },
  { id: 4,  customer: "Kate Maina",       restaurant: "Flo Gardens",    date: "Feb 25, 2026", guests: 2, status: "pending"    },
  { id: 5,  customer: "Joel Seme",        restaurant: "Serene Gardens", date: "Mar 05, 2026", guests: 3, status: "cancelled"  },
  { id: 6,  customer: "Ali Masoud",       restaurant: "Carnivore",      date: "Mar 12, 2026", guests: 5, status: "pending"    },
  { id: 7,  customer: "Samson Mworia",    restaurant: "Java House",     date: "Mar 15, 2026", guests: 2, status: "confirmed"  },
  { id: 8,  customer: "Nicholas Wanyoike",restaurant: "The Talisman",   date: "Mar 20, 2026", guests: 4, status: "cancelled"  },
  { id: 9,  customer: "Brian Otieno",     restaurant: "Sankara Rooftop",date: "Mar 25, 2026", guests: 2, status: "confirmed"  },
  { id: 10, customer: "Wendy Mwangi",     restaurant: "Brew Bistro",    date: "Apr 01, 2026", guests: 3, status: "pending"    },
];

// ─── Status Badge ──────────────────────────────────────────────────
function statusBadge(status) {
  const map = {
    confirmed: `<span class="status confirmed">● Confirmed</span>`,
    pending:   `<span class="status pending">● Pending</span>`,
    cancelled: `<span class="status cancelled">● Cancelled</span>`,
  };
  return map[status] || status;
}

// ─── Render Rows ───────────────────────────────────────────────────
function renderRows(data) {
  const tbody = document.getElementById("reservationList");
  if (!tbody) return;

  if (data.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:2rem; color:#9ca3af;">
          No reservations found.
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = data.map((r, i) => `
    <tr data-status="${r.status}">
      <td>${i + 1}</td>
      <td>${r.customer}</td>
      <td>${r.restaurant}</td>
      <td>${r.date}</td>
      <td>${r.guests} ${r.guests === 1 ? "Guest" : "Guests"}</td>
      <td>${statusBadge(r.status)}</td>
    </tr>
  `).join("");
}

// ─── Update Stat Cards ─────────────────────────────────────────────
function updateStats(data) {
  document.getElementById("totalCount").textContent     = data.length;
  document.getElementById("confirmedCount").textContent = data.filter(r => r.status === "confirmed").length;
  document.getElementById("pendingCount").textContent   = data.filter(r => r.status === "pending").length;
  document.getElementById("cancelledCount").textContent = data.filter(r => r.status === "cancelled").length;
}

// ─── Filter by Status ──────────────────────────────────────────────
function filterReservations(value) {
  const filtered = value === "all"
    ? reservationsData
    : reservationsData.filter(r => r.status === value);
  renderRows(filtered);
  updateStats(filtered);
}

// ─── Search ────────────────────────────────────────────────────────
function searchReservations(value) {
  const query    = value.toLowerCase();
  const filtered = reservationsData.filter(r =>
    r.customer.toLowerCase().includes(query) ||
    r.restaurant.toLowerCase().includes(query) ||
    r.date.toLowerCase().includes(query) ||
    r.status.toLowerCase().includes(query)
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
  //Auto-folter from URL param
  const params = new URLSearchParams(window.location.search);
  const statusParam = params.get("status");
  const dateParam = params.get("date");
  if (dateParam === "today") {
    const today = new Date().toLocaleDateString("en-US", { 
      month: "short", day: "numeric", year: "numeric"
    });
    const filtered = reservationsData.filter(r => r.date === today);
    renderRows(filtered);
    updateStats(filtered);
  } else if (statusParam) {
        const filterSelect = document.getElementById("statusFilter");
        if (filterSelect) filterSelect.value = statusParam;
        filterReservations(statusParam);
    } else {
  renderRows(reservationsData);
  updateStats(reservationsData);
    }
});