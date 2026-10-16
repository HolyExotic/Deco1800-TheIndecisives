const purchaseButtons = document.querySelectorAll(".points");

const purchaseModal = document.getElementById("purchaseModal");
const closePurchase = document.getElementById("closePurchase");
const confirmPurchase = document.getElementById("confirmPurchase");

const previewAvatar = document.getElementById("previewAvatar");

// const previewItem = document.getElementById("previewItem");
const confirmCost = document.getElementById("confirmCost");

// Purchased items saved in localStorage

// Items the player already owns
let purchasedItems = JSON.parse(
    localStorage.getItem("purchasedItems")
) || [];

if (!purchasedItems.includes("cowboyHat")) {
    purchasedItems.push("cowboyHat");

    localStorage.setItem(
        "purchasedItems",
        JSON.stringify(purchasedItems)
    );
}

// Currently selected item
let selectedItem = null;

const accessoryMap = {
    cowboyHat: "cowboyhat",
    sunglasses: "sunglasses",
    partyHat: "partyhat",
    redBow: "bow",
    glasses: "glasses"
};


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


 // MARK: Open purchase popup

purchaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const itemName = button.dataset.item;
        const cost = Number(button.dataset.cost);

        // Don't open popup if already owned
        if (purchasedItems.includes(itemName)) {
            return;
        }

        // Get the matching accessory key
        const accessory = accessoryMap[itemName];

        // Save selected item
        selectedItem = {
            id: itemName,
            name: button.dataset.name,
            accessory: accessory,
            cost: cost
        };

        // Get the user's saved avatar size
        const avatar = AvatarSettings.get();

        // Display the correct pre-made dog image
        previewAvatar.src = AvatarSettings.imagePath(
            avatar.size,
            selectedItem.accessory
        );

        previewAvatar.alt =
            `${avatar.size} dog wearing ${selectedItem.name}`;

        // Show purchase cost
        confirmCost.textContent = cost;

        // Open popup
        purchaseModal.classList.remove("hidden");
    });
});


// purchaseButtons.forEach((button) => {
//     button.addEventListener("click", () => {
//         const itemName = button.dataset.item;
//         const itemImage = button.dataset.image;
//         const cost = Number(button.dataset.cost);

//         // Don't open popup if already owned
//         if (purchasedItems.includes(itemName)) {
//             return;
//         }

//         // Save selected item
//         selectedItem = {
//             id: itemName,
//             name: button.dataset.name,
//             image: itemImage,
//             cost: cost
//         };

//         // Show item on avatar
//         // previewItem.src = itemImage;
//         // previewItem.alt = selectedItem.name;

//         // Show the pre-made dog image with the accessory included
//         const avatar = AvatarSettings.get();

//         previewAvatar.src = AvatarSettings.imagePath(
//             avatar.size,
//             selectedItem.accessory
// );

//         previewAvatar.alt = `${avatar.size} dog wearing ${selectedItem.name}`;

//         // Show purchase cost
//         confirmCost.textContent = cost;

//         // Open popup
//         purchaseModal.classList.remove("hidden");
//     });
// });


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
