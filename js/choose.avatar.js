
document.addEventListener("DOMContentLoaded", () => {
    const panels = document.querySelectorAll("[data-dog-size]");

    // Read the previously saved dog size
    const savedAvatar = AvatarSettings.get();
    setSelectedPanel(savedAvatar.size);

    // Handle clicks on each dog panel
    panels.forEach(panel => {
        panel.addEventListener("click", () => {
            const size = panel.dataset.dogSize;

            // Save the selected dog size
            AvatarSettings.save({ size: size });

            // Highlight the selected dog
            setSelectedPanel(size);
        });
    });

    function setSelectedPanel(size) {
        panels.forEach(panel => {
            const isSelected = panel.dataset.dogSize === size;

            panel.classList.toggle("selected", isSelected);

            const overlay = panel.querySelector(".dog-overlay");
            if (overlay) {
                overlay.classList.toggle("active", isSelected);
            }

            panel.setAttribute("aria-pressed", String(isSelected));
        });
    }
});

