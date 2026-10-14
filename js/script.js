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
        <a href="avatar.html" class="nav-link">
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
        <a href="route-planner.html" class="nav-link">
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


/* Highlight the current page in the navbar */
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".bottom-nav .nav-link").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
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
    // Fixed demo date (year, month 0-11, day). October 13, 2026.
    const now = new Date(2026, 9, 13);

    const activeDays = [1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13];
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
