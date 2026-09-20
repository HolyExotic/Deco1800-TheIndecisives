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

        <!-- ROUTES -->
        <div class="nav-item" id="routesButton">
        <div class="nav-icon">
            <img src="images/routes.svg" alt="Routes" />
        </div>
        <span>Routes</span>
        </div>

        <!-- WALKING -->
        <a href="" class="nav-link">
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
        <a href="map.html" class="nav-link">
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

/* Open the route planner when Routes is clicked
const routesButton = document.getElementById("routesButton");
const routePlanner = document.getElementById("routePlanner");

if (routesButton) {
  routesButton.addEventListener("click", () => {
    routePlanner.classList.remove("hidden");
  });
}
*/