//AI Acknowledgement

//Tool used: Claude
//Date used: 13 October 2026

//How AI was used:
//- Suggested code for generating different set routes based on some of the routes I gave it.
//- Helped explain JS code

//Prompts included:
//- "What code would be needed to have set routes that includes the routes information i included previously?"
//- "Explain this part of the code, what is it's purpose?"

//All code was reviewed, modified, and understood by the author before submission.



// Shared route data for routes4 (results) and routes5 (details)
const ROUTES = [
    {
        name: "Victoria Park Loop",
        minutes: 40,
        km: 2.8,
        tags: ["Quiet", "Fountains", "Park", "Shade"],
        points: [[15, 15], [36, 22], [55, 22], [71, 35], [63, 52], [51, 67], [25, 60], [30, 43], [14, 37]]
    },
    {
        name: "Riverside Park",
        minutes: 32,
        km: 2.4,
        tags: ["Park", "Fountains", "Greenery", "Uncrowded"],
        points: [[22, 12], [40, 24], [58, 20], [68, 50], [60, 68], [20, 63], [20, 37]]
    },
    {
        name: "Dobby Park",
        minutes: 49,
        km: 3.1,
        tags: ["Park", "Variety of scents", "Off-leash"],
        points: [[13, 20], [62, 28], [67, 52], [49, 69], [31, 50], [15, 43]]
    },
    {
        name: "Shady Creek Track",
        minutes: 24,
        km: 1.6,
        tags: ["Shade", "Quiet", "Greenery", "Uncrowded"],
        points: [[20, 16], [51, 18], [65, 35], [56, 60], [25, 68], [15, 43]]
    },
    {
        name: "Suburb Garden Walk",
        minutes: 35,
        km: 2.2,
        tags: ["Suburb", "Greenery", "Variety of scents"],
        points: [[17, 18], [42, 12], [64, 30], [60, 55], [45, 67], [20, 56]]
    },
    {
        name: "Barkly Off-leash Loop",
        minutes: 58,
        km: 3.8,
        tags: ["Off-leash", "Park", "Fountains", "Uncrowded"],
        points: [[15, 22], [40, 14], [65, 25], [61, 55], [48, 68], [20, 60]]
    },
    {
        name: "Market Street Stroll",
        minutes: 18,
        km: 1.2,
        tags: ["Suburb", "Fountains", "Quiet"],
        points: [[20, 17], [57, 18], [67, 43], [57, 64], [25, 59], [15, 39]]
    },
    {
        name: "Greenway Explorer",
        minutes: 62,
        km: 4.2,
        tags: ["Greenery", "Variety of scents", "Shade", "Park"],
        points: [[17, 15], [48, 20], [65, 37], [59, 61], [35, 68], [16, 47]]
    }
];