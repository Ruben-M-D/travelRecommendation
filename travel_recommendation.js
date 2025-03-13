const searchBtn = document.getElementById("btnSearch");



function search() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; 

    console.log(searchValue);

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let resultsFound = false; 

            const matchingCountries = data.countries.filter(country => country.name.toLowerCase().includes(searchValue));
            if (matchingCountries.length > 0) {
                resultsFound = true;
                matchingCountries.forEach(country => {
                    country.cities.forEach(city => {
                        resultDiv.innerHTML += `
                            <div>
                                <img src="${city.imageUrl}" alt="${city.name}">
                                <p><strong>${city.name}</strong></p>
                            </div>
                        `;
                    });
                });
            }

            const matchingBeaches = data.beaches.filter(beach => beach.name.toLowerCase().includes(searchValue));
            if (matchingBeaches.length > 0 || searchValue.includes("beach") || searchValue.includes("beaches")) {
                resultsFound = true;
                data.beaches.forEach(beach => {
                    resultDiv.innerHTML += `
                        <div>
                            <img src="${beach.imageUrl}" alt="${beach.name}">
                            <p><strong>${beach.name}</strong></p>
                        </div>
                    `;
                });
            }

            const matchingTemples = data.temples.filter(temple => temple.name.toLowerCase().includes(searchValue));
            if (matchingTemples.length > 0 || searchValue.includes("temple") || searchValue.includes("temples")) {
                resultsFound = true;
                data.temples.forEach(temple => {
                    resultDiv.innerHTML += `
                        <div>
                            <img src="${temple.imageUrl}" alt="${temple.name}">
                            <p><strong>${temple.name}</strong></p>
                        </div>
                    `;
                });
            }

            if (!resultsFound) {
                resultDiv.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

searchBtn.addEventListener('click', search);
