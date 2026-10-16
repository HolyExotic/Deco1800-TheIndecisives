
document.addEventListener("DOMContentLoaded", () => {
    // Existing inventory elements
    const hangerButton = document.querySelector(".hanger");
    const inventory = document.querySelector("#inventory");
    const closeButton = inventory?.querySelector(".close-inventory");

    // Avatar elements
    const avatarImage = document.querySelector("[data-avatar-image]");
    const nameInput = document.querySelector("[data-avatar-name]");
    const saveButton = document.querySelector(".save-button");
    const accessoryButtons = document.querySelectorAll("[data-accessory]");

    // Load saved settings
    let avatar = AvatarSettings.get();
    let selectedAccessory = avatar.accessory;

    // Open and close inventory
    const setInventoryVisible = (visible) => {
        if (!inventory || !hangerButton) return;

        inventory.style.display = visible ? "flex" : "none";
        hangerButton.setAttribute("aria-expanded", String(visible));
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

    // Highlight the selected accessory
    function updateSelection() {
        accessoryButtons.forEach(button => {
            const selected =
                button.dataset.accessory === selectedAccessory;

            button.classList.toggle("selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        });
    }

    // Display the current saved settings
    updatePreview();
    updateSelection();

    if (nameInput) {
        nameInput.value = avatar.name;
    }

    // Preview changes when an accessory is clicked
    accessoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            selectedAccessory = button.dataset.accessory;

            updatePreview();
            updateSelection();
        });
    });

    // Save the settings when the user clicks Save Changes
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
