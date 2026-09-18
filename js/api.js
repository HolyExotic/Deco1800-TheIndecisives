const API_BASE_URL =
    "https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets";

async function getDataset(datasetId) {
    const url =
        `${API_BASE_URL}/${datasetId}/records?limit=20`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch dataset");
    }

    const data = await response.json();

    return data.results;
}
