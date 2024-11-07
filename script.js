
document.getElementById('locationForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value;
    fetchWeatherData(city);
});

async function fetchWeatherData(city) {
    try {
        const apiKey = '76cb2d4878964147b4f175047240711';
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes&alerts=yes&lang=pt`;

        const response = await fetch(url);
        const data = await response.json();

        displayWeatherData(data);
    } catch (error) {
        document.getElementById('weatherInfo').innerHTML = "<p>Erro ao buscar dados. Tente novamente.</p>";
    }
}

function displayWeatherData(data) {
    const location = data.location;
    const current = data.current;
    const forecast = data.forecast.forecastday[0];
    const alerts = data.alerts ? data.alerts.alert : [];

    const htmlContent = `
        <h2>${location.name}, ${location.region}, ${location.country}</h2>
        <p>Temperatura Atual: ${current.temp_c}°C</p>
        <p>Condição: ${current.condition.text} <img src="https:${current.condition.icon}" alt="${current.condition.text}"></p>
        <p>Umidade: ${current.humidity}%</p>
        <p>Vento: ${current.wind_kph} km/h</p>
        <p>Sensação Térmica: ${current.feelslike_c}°C</p>
        <p>Índice UV: ${current.uv}</p>
        
        <h3>Qualidade do Ar</h3>
        <p>PM2.5: ${current.air_quality.pm2_5.toFixed(2)}</p>
        <p>PM10: ${current.air_quality.pm10.toFixed(2)}</p>
        <p>CO: ${current.air_quality.co.toFixed(2)}</p>
        <p>NO₂: ${current.air_quality.no2.toFixed(2)}</p>
        <p>O₃: ${current.air_quality.o3.toFixed(2)}</p>
        <p>SO₂: ${current.air_quality.so2.toFixed(2)}</p>
        <p>Índice DEFRA: ${current.air_quality["gb-defra-index"]}</p>
        
        <h3>Previsão do Dia</h3>
        <p>Temperatura Máxima: ${forecast.day.maxtemp_c}°C</p>
        <p>Temperatura Mínima: ${forecast.day.mintemp_c}°C</p>
        <p>Nascer do Sol: ${forecast.astro.sunrise}</p>
        <p>Pôr do Sol: ${forecast.astro.sunset}</p>
        
        ${alerts.length > 0 ? `<h3>Alertas Climáticos</h3>` + alerts.map(alert => `<p>${alert.headline}: ${alert.desc}</p>`).join('') : ''}
    `;

    document.getElementById('weatherInfo').innerHTML = htmlContent;
}
