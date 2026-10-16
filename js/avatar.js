document.addEventListener("DOMContentLoaded", function () {

    const avatarButton = document.querySelector(".dog-avatar-selection");
    const accessoriesButton = document.querySelector(".dog-accessories");
    const questsButton = document.querySelector(".daily-quests");
    const dogGoButton = document.querySelector(".lower-btn");

    avatarButton.addEventListener("click", function () {
        window.location.href = "/choose.avatar.html";
    });

    accessoriesButton.addEventListener("click", function () {
        window.location.href = "/accessories.customise.html";
    });

    questsButton.addEventListener("click", function () {
        window.location.href = "/routes.html";
    });

    dogGoButton.addEventListener("click", function () {
        window.location.href = "/maps.html";
    });

});


// Animation on avatar options page
document.addEventListener("DOMContentLoaded", () => {
    const dogOptions = document.querySelector(".dog-size-options");

    if (dogOptions) {
        requestAnimationFrame(() => {
            dogOptions.classList.add("animate-dogs");
        });
    }
});
