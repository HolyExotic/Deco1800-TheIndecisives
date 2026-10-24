    //AI Acknowledgement

    //Tool used: ChatGPT (OpenAI)
    //Date used: 1 October 2026

    //How AI was used:
    //- Suggested code to store and update the amount of points the user has
    //- Helped explain JS code

    //Prompts included:
    //- "How can points be updated when thigns are stores"
    //- "Explain this part of the code, what is it's purpose?"

    //All code was reviewed, modified, and understood by the author before submission.


    // Get the user's current points
    function getPoints() {
        const savedPoints = localStorage.getItem("points");

        // Only set the starting balance if no balance exists
        if (savedPoints === null || isNaN(Number(savedPoints))) {
            localStorage.setItem("points", 940);
            return 940;
        }

        return Number(savedPoints);
    }

    // Save the user's points
    function setPoints(points) {
        localStorage.setItem("points", points);

        // Update all points displays on the current page
        document.querySelectorAll(".points-balance").forEach((display) => {
            display.textContent = points;
        });
    }

    // Add points when the user earns a reward
    function earnPoints(amount) {
        const currentPoints = getPoints();
        setPoints(currentPoints + amount);
    }

    // Deduct points when the user purchases an item
    function spendPoints(amount) {
        const currentPoints = getPoints();

        if (currentPoints < amount) {
            return false;
        }

        setPoints(currentPoints - amount);
        return true;
    }

    // Display the current points balance
    document.addEventListener("DOMContentLoaded", () => {
        const points = getPoints();

        document.querySelectorAll(".points-balance").forEach((display) => {
            display.textContent = points;
        });
    });
