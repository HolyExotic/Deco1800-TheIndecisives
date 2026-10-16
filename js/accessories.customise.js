document.addEventListener("DOMContentLoaded", () => {
    const hangerButton = document.querySelector(".hanger");
    const inventory = document.querySelector("#inventory");
    const closeButton = inventory?.querySelector(".close-inventory");

    if (!hangerButton || !inventory || !closeButton) {
        return;
    }

    const setInventoryVisible = (visible) => {
        inventory.style.display = visible ? "flex" : "none";
        hangerButton.setAttribute("aria-expanded", String(visible));
    };

    hangerButton.setAttribute("aria-controls", inventory.id);
    hangerButton.setAttribute("aria-expanded", "false");

    hangerButton.addEventListener("click", () => {
        setInventoryVisible(inventory.style.display === "none");
    });

    closeButton.addEventListener("click", () => {
        setInventoryVisible(false);
    });
});