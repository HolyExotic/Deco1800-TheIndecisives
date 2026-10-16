//MARK: NAV
const navMount = document.getElementById("site-nav"); //html id is site-nav linking
// DOM is navMount element (document object model)

if (navMount) {
  navMount.insertAdjacentHTML(
    //allows html to be presnet in DOM
    "afterbegin", //Insert the new HTML inside navMount, at the very beginning
    `
      <nav class="bottom-nav">

        <!-- HOME -->
        <a href="index.html" class="nav-link">
        <div class="nav-item">
          <div class="nav-icon">
            <img src="images/home.svg" alt="Home" />
          </div>
          <span>Home</span>
        </div>
        </a>

        <!-- MAPS -->
        <a href="maps.html" class="nav-link">
          <div class="nav-item" id="maps-button">
              <div class="nav-icon">
                <img src="images/map_icon.svg" alt="Maps"/>
              </div>
              <span>Map</span>
          </div>
        </a>

        <!-- ROUTES -->
        <a href="routes.html" class="nav-link">
        <div class="nav-item">
          <div class="nav-icon">
            <img src="images/routes.svg" alt="Routes" />
          </div>
          <span>Routes</span>
        </div>
        </a>

        <!-- SHOP -->
        <a href="shop.html" class="nav-link">
        <div class="nav-item">
          <div class="nav-icon">
            <img src="images/shop.svg" alt="Shop" />
          </div>
          <span>Shop</span>
        </div>
        </a>

        <!-- PROFILE -->
        <a href="profile.html" class="nav-link">
        <div class="nav-item">
          <div class="nav-icon">
            <img src="images/profile.svg" alt="Profile" />
          </div>
          <span>Profile</span>
        </div>
        </a>

      </nav>
    `,
  );
}


// /* Highlight the current page in the navbar */
// const currentPage = window.location.pathname.split("/").pop() || "index.html";

// document.querySelectorAll(".bottom-nav .nav-link").forEach(link => {
//   if (link.getAttribute("href") === currentPage) {
//     link.classList.add("active");
//   }
// });


/* Highlight the current page in the navbar */
const currentPage = window.location.pathname.split("/").pop() || "index.html";

const isRoutesPage = [
  "routes.html",
  "routes2-activity-selection.html",
  "routes3-customise-routes.html",
  "routes4-route-selection.html"
].includes(currentPage);

document.querySelectorAll(".bottom-nav .nav-link").forEach(link => {
  const href = link.getAttribute("href");

  if (href === currentPage || (href === "routes.html" && isRoutesPage)) {
    link.classList.add("active");
  }
});






//MARK: Footer

const footerMount = document.getElementById("site-footer");

if (footerMount) {
  footerMount.insertAdjacentHTML(
    "beforeend",
    `
      <footer class="site-footer">
        <p>
          AI Disclosure: AI tools were used to assist in the
          development and creation of this page.
        </p>
      </footer>
    `,
  );
}





//MARK: Profile
/* PROFILE PAGE - Toggle weekly and monthly activity */



const periodBtn = document.getElementById('period-btn');
const periodMenu = document.getElementById('period-menu');
const periodLabel = document.getElementById('period-label');

if (periodBtn) {
    periodBtn.addEventListener('click', () => {
        const open = periodMenu.hidden;
        periodMenu.hidden = !open;
        periodBtn.setAttribute('aria-expanded', open);
    });

    periodMenu.addEventListener('click', (e) => {
        const period = e.target.dataset.period;
        if (!period) return;
        periodLabel.textContent = e.target.textContent;
        document.getElementById('chart-week').hidden = period !== 'week';
        document.getElementById('chart-month').hidden = period !== 'month';
        periodMenu.hidden = true;
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.activity-header')) periodMenu.hidden = true;
    });
}


const cal = document.getElementById('chart-month');

if (cal) {
  
    const now = new Date(2026, 9, 14);

    const activeDays = [1, 3, 4, 6, 7, 8, 9, 10, 11, 13, 14];
    const offset = new Date(now.getFullYear(), now.getMonth(), 1).getDay();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const monthName = now.toLocaleString('default', { month: 'long', year: 'numeric' });
    cal.insertAdjacentHTML('beforeend', `<span class="cal-title">${monthName}</span>`);

    'SMTWTFS'.split('').forEach(d => {
        cal.insertAdjacentHTML('beforeend', `<span class="cal-head">${d}</span>`);
    });

    for (let i = 0; i < offset; i++) {
        cal.insertAdjacentHTML('beforeend', '<span></span>');
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const active = activeDays.includes(day) ? ' active' : '';
        const today = day === now.getDate() ? ' today' : '';
        const future = day > now.getDate() ? ' future' : '';
        cal.insertAdjacentHTML(
            'beforeend',
            `<div class="cal-day${active}${today}${future}">${day}</div>`
        );
    }
}


/* Achievement popup */

const badgeModal = document.getElementById('badge-modal');

if (badgeModal) {
    const icon = document.getElementById('badge-modal-icon');
    const nameEl = document.getElementById('badge-modal-name');
    const descEl = document.getElementById('badge-modal-desc');
    const statusEl = document.getElementById('badge-modal-status');

    document.querySelectorAll('.badge').forEach(b => {
        b.addEventListener('click', () => {
            const locked = b.classList.contains('locked');
            icon.innerHTML = b.querySelector('.badge-icon').innerHTML;
            icon.className = 'badge-icon big' + (locked ? ' locked' : '');
            nameEl.textContent = b.dataset.name;
            descEl.textContent = b.dataset.desc;
            statusEl.textContent = locked ? 'Locked' : 'Obtained';
            statusEl.className = 'badge-status' + (locked ? '' : ' earned');
            badgeModal.hidden = false;
        });
    });

    const closeBadge = () => { badgeModal.hidden = true; };
    document.getElementById('badge-close').addEventListener('click', closeBadge);
    badgeModal.addEventListener('click', e => {
        if (e.target === badgeModal) closeBadge();
    });
}

const badgeRow = document.querySelector('.badge-row');

if (badgeRow) {
    let down = false, moved = false, startX = 0, startLeft = 0, pid = null;

    badgeRow.addEventListener('pointerdown', e => {
        if (e.pointerType !== 'mouse') return; // touch scrolls natively
        down = true;
        moved = false;
        startX = e.clientX;
        startLeft = badgeRow.scrollLeft;
        pid = e.pointerId;
    });

    badgeRow.addEventListener('pointermove', e => {
        if (!down) return;
        const dx = e.clientX - startX;
        if (!moved && Math.abs(dx) > 5) {
            moved = true;
            badgeRow.setPointerCapture(pid); // keeps dragging outside the row
        }
        if (moved) badgeRow.scrollLeft = startLeft - dx;
    });

    const endDrag = () => { down = false; };
    badgeRow.addEventListener('pointerup', endDrag);
    badgeRow.addEventListener('pointercancel', endDrag);

    // a drag shouldn't open the popup
    badgeRow.addEventListener('click', e => {
        if (moved) {
            e.stopPropagation();
            e.preventDefault();
            moved = false;
        }
    }, true);

    // wheel scrolls sideways, but lets the page scroll at the ends
    badgeRow.addEventListener('wheel', e => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        const max = badgeRow.scrollWidth - badgeRow.clientWidth;
        const atStart = badgeRow.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = badgeRow.scrollLeft >= max && e.deltaY > 0;
        if (max <= 0 || atStart || atEnd) return;
        e.preventDefault();
        badgeRow.scrollLeft += e.deltaY;
    }, { passive: false });
}

//MARK: ROUTES

// Quest reward popup

const rewardModal = document.getElementById('reward-modal');

if (rewardModal) {
    const nameEl = document.getElementById('reward-name');
    const coinsEl = document.getElementById('reward-coins');
    const xpEl = document.getElementById('reward-xp');
    const itemEl = document.getElementById('reward-item-item');
    const rewardRow = rewardModal.querySelector('.reward-row');
    const closeBtn = document.getElementById('reward-ok');

    document.querySelectorAll('.quests-card').forEach(card => {
        card.addEventListener('click', () => {
            const questName = card.dataset.name.trim();
            const hasItemReward = questName === 'Walk 25 km';

            nameEl.textContent = questName;
            coinsEl.textContent = card.dataset.reward;
            xpEl.textContent = card.dataset.xp;

            // Reset the item reward every time a quest is opened.
            itemEl.hidden = true;

            // Only the Walk 25 km quest receives an item.
            if (hasItemReward) {
                itemEl.hidden = false;
            }

            // Show two tiles normally, or three for the 25 km quest.
            rewardRow.style.gridTemplateColumns = hasItemReward
                ? 'repeat(3, minmax(0, 1fr))'
                : 'repeat(2, minmax(0, 1fr))';

            rewardModal.hidden = false;
        });
    });

    function closeReward() {
        rewardModal.hidden = true;
    }

    closeBtn.addEventListener('click', closeReward);

    rewardModal.addEventListener('click', event => {
        if (event.target === rewardModal) {
            closeReward();
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !rewardModal.hidden) {
            closeReward();
        }
    });
}


// Bookmarks: save and unsave routes
const savedList = document.getElementById('saved-list');
const savedCount = document.getElementById('saved-count');

// Date shown on newly saved routes (change to new Date() for the real date)
const SAVE_DATE = new Date(2026, 9, 14);

const ROUTE_ICONS = {
    park: '🌳',
    hill: '⛰️',
    loop: `<svg viewBox="0 0 24 24" fill="none" stroke="#644426" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
             <path d="M3 3v5h5" />
             <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
             <path d="M16 16h5v5" />
           </svg>`
};

function updateSavedCount() {
    if (savedList && savedCount) {
        savedCount.textContent = savedList.querySelectorAll('.saved-card').length;
    }
}

function addSavedCard(row) {
    const id = row.dataset.id;
    if (savedList.querySelector(`[data-id="${id}"]`)) return; // already saved

    const name = row.querySelector('h3').textContent;
    const meta = row.querySelector('.meta').textContent;
    const icon = ROUTE_ICONS[row.dataset.icon] || '📍';
    const date = SAVE_DATE.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

    savedList.insertAdjacentHTML('afterbegin', `
        <div class="saved-card" data-id="${id}">
            <div class="route-thumb">${icon}</div>
            <div class="route-info">
                <h3>${name}</h3>
                <p class="meta">${meta}</p>
                <p class="sub">Saved ${date}</p>
            </div>
            <button class="start-btn">Start</button>
        </div>
    `);
}

function removeSavedCard(id) {
    const card = savedList.querySelector(`[data-id="${id}"]`);
    if (card) card.remove();
}

document.querySelectorAll('.bookmark').forEach(btn => {
    btn.addEventListener('click', () => {
        const row = btn.closest('.recent-row');
        const nowSaved = btn.getAttribute('aria-pressed') !== 'true';

        btn.setAttribute('aria-pressed', nowSaved);
        btn.setAttribute('aria-label', nowSaved ? 'Unsave route' : 'Save route');

        if (savedList && row) {
            if (nowSaved) addSavedCard(row);
            else removeSavedCard(row.dataset.id);
            updateSavedCount();
        }
    });
});



// CUSTOMISE ROUTES
document.querySelectorAll(".custom-dropdown").forEach(dropdown => {
  const trigger = dropdown.querySelector(".custom-dropdown-button");
  const menu = dropdown.querySelector(".custom-dropdown-menu");
  const value = dropdown.querySelector(".dropdown-value");
  const hiddenInput = dropdown.querySelector('input[type="hidden"]');

  if (!trigger || !menu || !value) return;

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });

  menu.querySelectorAll('[role="option"]').forEach(option => {
    option.addEventListener("click", () => {
      value.textContent = option.textContent.trim();

      if (hiddenInput) {
        hiddenInput.value = option.dataset.value || option.textContent.trim();
      }

      menu.querySelectorAll('[role="option"]').forEach(item => {
        item.setAttribute("aria-selected", String(item === option));
      });

      menu.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    });
  });
});

document.addEventListener("click", event => {
  document.querySelectorAll(".custom-dropdown").forEach(dropdown => {
    if (!dropdown.contains(event.target)) {
      const trigger = dropdown.querySelector(".custom-dropdown-button");
      const menu = dropdown.querySelector(".custom-dropdown-menu");

      if (trigger && menu) {
        menu.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
      }
    }
  });
});
