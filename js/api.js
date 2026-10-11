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

// Search records from Brisbane City Council Open Data
async function searchDataset(datasetId, keyword) {

    const where = `search(*, ${JSON.stringify(keyword)})`;

    const url =
        `${API_BASE_URL}/${datasetId}/records?where=${encodeURIComponent(where)}&limit=20`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to search dataset");
    }

    const data = await response.json();

    return data.results;
}