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

        <!-- WALKING -->
        <a href="route-planner.html" class="nav-link">
        <div class= "walking-button">
        <div class="nav-item">
          <div class="nav-icon">
          <img src= "images/walking.svg" alt= "Walking" />
          </div>
        </div>
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