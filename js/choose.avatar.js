
document.addEventListener("DOMContentLoaded", () => {
    const panels = document.querySelectorAll("[data-dog-size]");

    // Read dog size
    const savedAvatar = AvatarSettings.get();
    setSelectedPanel(savedAvatar.size);

    // Dog panel click handling
    panels.forEach(panel => {
        panel.addEventListener("click", () => {
            const size = panel.dataset.dogSize;

            // Save selected dog size
            AvatarSettings.save({ size: size });

            // Highlight selected dog
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

