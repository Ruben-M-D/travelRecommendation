const searchBtn = document.getElementById("btnSearch");

function search() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const resultDiv = document.getElementById("result");
    console.log(searchValue);

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.countries.find(item => item.name.toLowerCase().contains(searchValue));
            


            console.log(data.toString());
        })
}

searchBtn.addEventListener('click', search);