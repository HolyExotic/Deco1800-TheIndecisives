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

/* Open the route planner when Routes is clicked
const routesButton = document.getElementById("routesButton");
const routePlanner = document.getElementById("routePlanner");

if (routesButton) {
  routesButton.addEventListener("click", () => {
    routePlanner.classList.remove("hidden");
  });
}
*/

/* Toggle weekly and monthly activity */

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
    const activeDays = [1, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13];
    const now = new Date();
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