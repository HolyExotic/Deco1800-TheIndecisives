const pointsNumber = document.getElementById("points-number");

let points = Number(localStorage.getItem("points"));

if (isNaN(points) || points === 0) {
    points = 940;
    localStorage.setItem("points", points);
}

pointsNumber.textContent = points;