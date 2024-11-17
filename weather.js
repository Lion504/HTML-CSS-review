async function checkWeather() {
    // Get the user input and the output element
    const location = document.getElementById('location').value;
    const output = document.getElementById('output');

    // Clear previous output
    output.textContent = '';

    // Validate user input
    if (!location) {
        output.textContent = 'Please enter a location.';
        return;
    }

    // Weather API setup
    const weatherApi = 'http://api.weatherapi.com/v1/current.json';
    const apiKey = '60c9c688a405424a913163013242910';

    try {
        // Make the API call with Axios
        const response = await axios.get(weatherApi, {
            params: {
                key: apiKey,
                q: location,
                aqi: 'no',
            },
        });

        // Extract data from the response
        const data = response.data;
        const weatherInfo = `
            <div class="weather-detail"><strong>📍 Location:</strong> ${data.location.name}, ${data.location.country}</div>
            <div class="weather-detail"><strong>🕒 Local Time:</strong> ${data.location.localtime}</div>
            <div class="weather-detail"><strong>🌡️ Temperature:</strong> ${data.current.temp_c} ℃</div>
            <div class="weather-detail"><strong>☁️ Condition:</strong> ${data.current.condition.text}</div>
            <div class="weather-detail"><strong>🍃 Wind Speed:</strong> ${data.current.wind_mph} mph</div>
            <div class="weather-detail"><strong>💧 Humidity:</strong> ${data.current.humidity} %</div>
            <div class="weather-detail"><strong>👕 Feels Like:</strong> ${data.current.feelslike_c} ℃</div>
            <div class="weather-detail"><strong>🏖️ UV Index:</strong> ${data.current.uv}</div>
        `;

        // Display the weather information
        output.innerHTML = weatherInfo;

    } catch (error) {
        // Handle errors (e.g., invalid location or API issues)
        output.textContent = 'Error: Unable to fetch weather data. Please check the city name or try again later.';
        console.error(error);
    }
}
