document.addEventListener("DOMContentLoaded", () => {
    const dogButtons = document.querySelectorAll(".dog-panel");
    const modal = document.getElementById("dogPurchaseModal");
    const preview = document.getElementById("previewDog");
    const costLabel = document.getElementById("dogCost");
    const closeButton = document.getElementById("closeDogPurchase");
    const buyButton = document.getElementById("buyDog");

    if (!modal || !preview || !costLabel || !closeButton || !buyButton) return;

    const prices = { med: 200, large: 350 };
    let ownedSizes;

    try {
        ownedSizes = JSON.parse(localStorage.getItem("ownedDogSizes")) || ["small"];
    } catch {
        ownedSizes = ["small"];
    }

    if (!ownedSizes.includes("small")) ownedSizes.push("small");

    let pendingSize = null;

    function closePopup() {
        modal.classList.add("hidden");
        pendingSize = null;
    }

    function equipDog(size) {
        const avatar = AvatarSettings.get();

        AvatarSettings.save({
            ...avatar,
            size
        });

        dogButtons.forEach(button => {
            const selected = button.dataset.dogSize === size;
            button.classList.toggle("selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        });

        closePopup();
    }


    function updateDogTiles() {
        dogButtons.forEach(button => {
            const locked = !ownedSizes.includes(button.dataset.dogSize);
            button.classList.toggle("is-locked", locked);
            button.setAttribute("aria-pressed", String(!locked));
        });
    }

    const savedSize = AvatarSettings.get().size;
    if (ownedSizes.includes(savedSize)) {
        dogButtons.forEach(button => {
            const selected = button.dataset.dogSize === savedSize;
            button.classList.toggle("selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        });
    }

    updateDogTiles();

    dogButtons.forEach(button => {
        button.addEventListener("click", () => {
            const size = button.dataset.dogSize;

            // Owned dogs equip immediately, with no popup.
            if (ownedSizes.includes(size)) {
                equipDog(size);
                return;
            }

            // Unowned dogs open the purchase popup.
            pendingSize = size;
            preview.src = `images/dog.${size}.png`;
            preview.alt = `${size} dog`;
            costLabel.textContent = prices[size];
            modal.classList.remove("hidden");
        });
    });

    buyButton.addEventListener("click", () => {
        if (!pendingSize) return;

        const cost = prices[pendingSize];

        if (typeof spendPoints !== "function" || !spendPoints(cost)) {
            alert("You don't have enough points!");
            return;
        }

        ownedSizes.push(pendingSize);
        localStorage.setItem("ownedDogSizes", JSON.stringify(ownedSizes));

        updateDogTiles();
        equipDog(pendingSize);
    });

    closeButton.addEventListener("click", closePopup);

    modal.addEventListener("click", event => {
        if (event.target === modal) closePopup();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !modal.classList.contains("hidden")) {
            closePopup();
        }
    });
});