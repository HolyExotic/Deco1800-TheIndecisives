
const AvatarSettings = {
    defaultAvatar: {
        size: "small",
        accessory: "none",
        name: ""
    },

    get() {
        const saved = localStorage.getItem("dogAvatar");

        if (!saved) {
            return { ...this.defaultAvatar };
        }

        try {
            return {
                ...this.defaultAvatar,
                ...JSON.parse(saved)
            };
        } catch {
            return { ...this.defaultAvatar };
        }
    },

    save(changes) {
        const current = this.get();
        const updated = { ...current, ...changes };

        localStorage.setItem("dogAvatar", JSON.stringify(updated));

        return updated;
    },

    imagePath(size, accessory) {
        const images = {
            small: {
                none: "dog.small.png",
                cowboyhat: "small.dog.cowboyhat.png",
                glasses: "dog.small.glasses.png",
                bow: "small.dog.bow.png",
                sunglasses: "small.dog.sunglasses.png",
                partyhat: "small.dog.partyhat.png"
            },
            med: {
                none: "dog.med.png",
                cowboyhat: "med.dog.cowboyhat.png",
                glasses: "med.dog.glasses.png",
                bow: "med.dog.bow.png",
                sunglasses: "med.dog.sunglasses.png",
                partyhat: "med.dog.partyhat.png"
            },
            large: {
                none: "dog.large.png",
                cowboyhat: "large.dog.cowboyhat.png",
                glasses: "large.dog.glasses.png",
                bow: "large.dog.bow.png",
                sunglasses: "large.dog.sunglasses.png",
                partyhat: "large.dog.partyhat.png"
            }
        };

        const filename =
            images[size]?.[accessory] ?? images.small.none;

        return `images/${filename}`;
    },


updateImage(img) {
    const avatar = this.get();

    // Update the dog's image
    img.src = this.imagePath(
        avatar.size,
        avatar.accessory
    );

    // Remove any previously applied size classes
    img.classList.remove(
        "dog-small",
        "dog-med",
        "dog-large"
    );

    // Apply the correct class for the selected size
    const sizeClasses = {
        small: "dog-small",
        med: "dog-med",
        large: "dog-large"
    };

    img.classList.add(
        sizeClasses[avatar.size] ?? "dog-small"
    );

    // Update the image description
    img.alt = `${avatar.size} dog wearing ${avatar.accessory}`;
},

    updatePage() {
        const avatar = this.get();

        document.querySelectorAll("[data-avatar-image]").forEach(img => {
            this.updateImage(img);
        });

    }
};

document.addEventListener("DOMContentLoaded", () => {
    AvatarSettings.updatePage();
});

