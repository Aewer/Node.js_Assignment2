const newsInfo = document.getElementById('newsInfo');

async function fetchNews() {
    try {
        const response = await fetch('/news?country=us');
        const data = await response.json();
        displayNewsData(data);
    } catch (error) {
        console.error(error);
        newsInfo.innerHTML = '<p>Failed to fetch data</p>';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

function displayNewsData(data) {
    newsInfo.innerHTML = `
        <div class="row">
            <div class="col-md-4" id="column1"></div>
            <div class="col-md-4" id="column2"></div>
            <div class="col-md-4" id="column3"></div>
        </div>
    `;

    const column1 = document.getElementById('column1');
    const column2 = document.getElementById('column2');
    const column3 = document.getElementById('column3');

    data.forEach((article, index) => {
        if (!article.imageUrl) {
            return;
        }
        const newsCard = `
            <div class="card mb-3">
                <img src="${article.imageUrl}" class="card-img-top" alt="${article.title}">
                <div class="card-body">
                    <h5 class="card-title">${article.title}</h5>
                    <p class="card-text">${article.description}</p>
                    <a href="${article.url}" class="btn btn-primary" target="_blank">Read More</a>
                </div>
            </div>
        `;

        if (index % 3 === 0) {
            column1.innerHTML += newsCard;
        } else if (index % 3 === 1) {
            column2.innerHTML += newsCard;
        } else {
            column3.innerHTML += newsCard;
        }
    });
}