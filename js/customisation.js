const purchaseButtons = document.querySelectorAll(".points");

const purchaseModal = document.getElementById("purchaseModal");
const closePurchase = document.getElementById("closePurchase");
const confirmPurchase = document.getElementById("confirmPurchase");

const previewItem = document.getElementById("previewItem");
const confirmCost = document.getElementById("confirmCost");

// User's points
let points = Number(localStorage.getItem("points"));

if (isNaN(points)) {
  points = 800;
  localStorage.setItem("points", points);
}

// Purchased items
let purchasedItems = JSON.parse(localStorage.getItem("purchasedItems")) || [];

// Currently selected item
let selectedItem = null;

//MARK: Open purchase popup
purchaseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const itemName = button.dataset.item;
    const itemImage = button.dataset.image;
    const cost = Number(button.dataset.cost);

    // Don't open popup if already owned
    if (purchasedItems.includes(itemName)) {
      return;
    }

    // Save selected item
    selectedItem = {
      id: itemName,
      name: button.dataset.name,
      image: itemImage,
      cost: cost,
    };

    // Put item image onto avatar
    previewItem.src = itemImage;
    previewItem.alt = selectedItem.name;

    // Show price
    confirmCost.textContent = cost;

    // Open modal
    purchaseModal.classList.remove("hidden");
  });
});

//MARK: Close popup

closePurchase.addEventListener("click", () => {
  purchaseModal.classList.add("hidden");

  selectedItem = null;
});

//MARK: Purchase item
confirmPurchase.addEventListener("click", () => {
  if (!selectedItem) {
    return;
  }

  const cost = selectedItem.cost;

  // Check points
  if (points < cost) {
    alert("You don't have enough points!");

    return;
  }

  // Deduct points
  points -= cost;

  localStorage.setItem("points", points);

  // Add item to inventory
  purchasedItems.push(selectedItem.id);

  localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));

  // Close popup
  purchaseModal.classList.add("hidden");

  // Change purchase button to Owned
  purchaseButtons.forEach((button) => {
    if (button.dataset.item === selectedItem.id) {
      button.innerHTML = `
                <span>Owned</span>
            `;

      button.classList.add("owned");
    }
  });

  // Clear selected item
  selectedItem = null;
});
