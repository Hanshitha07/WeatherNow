let apiKey = "d91f6fe521f2085d12603028372a0d6c";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchBox = document.querySelector(".search input");
let searchBtn = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        let response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found!");
        }

        let data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "clouds.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "rainy.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "clear.png";
        }else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "drizzle.png";
        } else {
            weatherIcon.src = "weather.png"; 
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Could not retrieve weather data. Try again.");
    }
}


searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") { 
        checkWeather(searchBox.value);
    }
});


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

checkWeather("Visakhapatnam");
