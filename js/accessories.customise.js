// localStorage.removeItem("purchasedItems");
// localStorage.removeItem("dogAvatar");

document.addEventListener("DOMContentLoaded", () => {
    // Inventory elements
    const hangerButton = document.querySelector(".hanger");
    const inventory = document.querySelector("#inventory");
    const closeButton = inventory?.querySelector(".close-inventory");

    // Avatar elements
    const avatarImage = document.querySelector("[data-avatar-image]");
    const nameInput = document.querySelector("[data-avatar-name]");
    const saveButton = document.querySelector(".save-button");
    const accessoryButtons = document.querySelectorAll("[data-accessory]");

    // Load purchased items from the shop
    let purchasedItems = JSON.parse(
        localStorage.getItem("purchasedItems")
    ) || [];

    // Cowboy hat is owned by default
    if (!purchasedItems.includes("cowboyHat")) {
        purchasedItems.push("cowboyHat");

        localStorage.setItem(
            "purchasedItems",
            JSON.stringify(purchasedItems)
        );
    }

    // Match inventory accessory names to shop item IDs
    const accessoryMap = {
        cowboyhat: "cowboyHat",
        partyhat: "partyHat",
        bow: "redBow",
        glasses: "glasses",
        sunglasses: "sunglasses"
    };

    // Load saved avatar settings
    let avatar = AvatarSettings.get();
    let selectedAccessory = avatar.accessory;

    // Check whether an accessory is owned
    function isAccessoryOwned(accessory) {
        // The basic dog without an accessory is always available
        if (accessory === "none") {
            return true;
        }

        // Find the matching shop item
        const itemID = accessoryMap[accessory];

        return itemID && purchasedItems.includes(itemID);
    }

    // Hide accessories the player has not purchased
    function updateInventory() {
        accessoryButtons.forEach(button => {
            const accessory = button.dataset.accessory;

            button.hidden = !isAccessoryOwned(accessory);
        });
    }

    // Open and close the inventory
    const setInventoryVisible = (visible) => {
        if (!inventory || !hangerButton) return;

        inventory.style.display = visible ? "flex" : "none";
        hangerButton.setAttribute(
            "aria-expanded",
            String(visible)
        );
    };

    if (hangerButton && inventory && closeButton) {
        hangerButton.setAttribute("aria-controls", inventory.id);
        hangerButton.setAttribute("aria-expanded", "false");

        hangerButton.addEventListener("click", () => {
            setInventoryVisible(inventory.style.display === "none");
        });

        closeButton.addEventListener("click", () => {
            setInventoryVisible(false);
        });
    }

    // If a saved accessory is no longer owned, use the basic dog
    if (!isAccessoryOwned(selectedAccessory)) {
        selectedAccessory = "none";
    }

    // Preview the selected dog and accessory
    function updatePreview() {
        if (!avatarImage) return;

        avatarImage.src = AvatarSettings.imagePath(
            avatar.size,
            selectedAccessory
        );

        avatarImage.alt =
            `${avatar.size} dog wearing ${selectedAccessory}`;
    }

    // Highlight the currently selected accessory
    function updateSelection() {
        accessoryButtons.forEach(button => {
            const selected =
                button.dataset.accessory === selectedAccessory;

            button.classList.toggle("selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        });
    }

    // Display the saved avatar
    updateInventory();
    updatePreview();
    updateSelection();

    if (nameInput) {
        nameInput.value = avatar.name;
    }

    // Preview an owned accessory when clicked
    accessoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const accessory = button.dataset.accessory;

            if (!isAccessoryOwned(accessory)) {
                return;
            }

            selectedAccessory = accessory;

            updatePreview();
            updateSelection();
        });
    });

    // Save avatar settings
    if (saveButton) {
        saveButton.addEventListener("click", () => {
            AvatarSettings.save({
                size: avatar.size,
                accessory: selectedAccessory,
                name: nameInput ? nameInput.value : avatar.name
            });

            avatar = AvatarSettings.get();

            updatePreview();
            setInventoryVisible(false);
        });
    }
});

