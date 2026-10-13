const purchaseButtons = document.querySelectorAll(".points");

const purchaseModal = document.getElementById("purchaseModal");
const closePurchase = document.getElementById("closePurchase");
const confirmPurchase = document.getElementById("confirmPurchase");

const previewItem = document.getElementById("previewItem");
const confirmCost = document.getElementById("confirmCost");

// Purchased items saved in localStorage
let purchasedItems = JSON.parse(
    localStorage.getItem("purchasedItems")
) || [];

// Currently selected item
let selectedItem = null;


// MARK: Update purchased items

function updatePurchasedItems() {
    purchaseButtons.forEach((button) => {
        if (purchasedItems.includes(button.dataset.item)) {
            // Show Owned instead of the price
            button.innerHTML = "<span>Owned</span>";
            button.classList.add("owned");
        }
    });
}

// Check saved purchases when the page loads
updatePurchasedItems();


// MARK: Open purchase popup

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
            cost: cost
        };

        // Show item on avatar
        previewItem.src = itemImage;
        previewItem.alt = selectedItem.name;

        // Show purchase cost
        confirmCost.textContent = cost;

        // Open popup
        purchaseModal.classList.remove("hidden");
    });
});


// MARK: Close popup

closePurchase.addEventListener("click", () => {
    purchaseModal.classList.add("hidden");
    selectedItem = null;
});


// MARK: Purchase item

confirmPurchase.addEventListener("click", () => {
    if (!selectedItem) {
        return;
    }

    const cost = selectedItem.cost;

    // Check and deduct points
    if (!spendPoints(cost)) {
        alert("You don't have enough points!");
        return;
    }

    // Save purchased item
    purchasedItems.push(selectedItem.id);

    localStorage.setItem(
        "purchasedItems",
        JSON.stringify(purchasedItems)
    );

    // Update buttons to show Owned
    updatePurchasedItems();

    // Close popup
    purchaseModal.classList.add("hidden");

    // Clear selected item
    selectedItem = null;
});
