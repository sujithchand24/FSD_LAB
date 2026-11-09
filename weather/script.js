
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDiv = document.getElementById("weather");
const message = document.getElementById("message");
const forecastDiv = document.getElementById("forecast");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
        message.textContent = "Please enter a city name.";
        weatherDiv.classList.add("hidden");
        return;
    }

    message.textContent = "Loading weather data...";
    weatherDiv.classList.add("hidden");

    try {
        const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

        const geoRes = await fetch(geoURL);
        if (!geoRes.ok) throw new Error("Unable to find location.");

        const geoData = await geoRes.json();
        if (!geoData.results?.length) throw new Error("City not found.");

        const location = geoData.results[0];

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Unable to fetch weather data.");

        const data = await res.json();

        document.getElementById("location").textContent =
            `${location.name}, ${location.country}`;

        document.getElementById("temperature").textContent =
            Math.round(data.current.temperature_2m);

        document.getElementById("humidity").textContent =
            data.current.relative_humidity_2m;

        document.getElementById("wind").textContent =
            data.current.wind_speed_10m;

        displayForecast(data.daily);
        weatherDiv.classList.remove("hidden");

    } catch (error) {
        console.error(error);
        message.textContent = error.message;
        weatherDiv.classList.add("hidden");
    }
}

function displayForecast(daily) {
    forecastDiv.innerHTML = "";

    for (let i = 0; i < daily.time.length; i++) {
        const day = new Date(daily.time[i] + "T00:00:00")
            .toLocaleDateString("en-US", { weekday: "short" });

        const card = document.createElement("div");
        card.classList.add("forecast-card");

        card.innerHTML = `
            <h3>${day}</h3>
            <p class="temp">${Math.round(daily.temperature_2m_max[i])}°C</p>
            <p>Min: ${Math.round(daily.temperature_2m_min[i])}°C</p>
        `;

        forecastDiv.appendChild(card);
    }
}
