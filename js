KOD : import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5002;
const apiKey = '9784778c5208d29ef82a11ed069a8d40';

app.use(cors());
app.use(express.json());

// Endpoint for current weather
app.get('/api/weather', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            res.json({
                city: data.name,
                description: data.weather[0].description,
                temperature: data.main.temp,
                feels_like: data.main.feels_like,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                rain: data.rain ? data.rain['1h'] : 0,
                coord: data.coord,
            });
        } else {
            res.status(404).json({ error: data.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint for 16-day forecast
app.get('/api/forecast', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            res.json(data.daily);
        } else {
            res.status(404).json({ error: data.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


ekleme___________



async function getHourlyForecast(lat, lon, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();


    const hourlyForecast = data.list.slice(0, 5).map((hour) => {
        return {
            time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temp: hour.main.temp,
            description: hour.weather[0].description
        };
    });

    console.log('Saatlik Tahmin:', hourlyForecast);
    return hourlyForecast;
}


const apiKey = 'API_KEYİNİZİ_BURAYA_YERLEŞTİRİN';
getHourlyForecast(39.92077, 32.85411, apiKey); 



const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;


const response = await fetch(url);
const data = await response.json();

console.log('Saatlik Tahmin:', hourlyForecast);
return hourlyForecast;



const hourlyForecast = data.list.slice(0, 5).map((hour) => {
    return {
        time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: hour.main.temp,
        description: hour.weather[0].description
    };
});



async function getWindSpeed(lat, lon, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    const windSpeed = data.wind.speed;

    console.log('Rüzgar Hızı (m/s):', windSpeed);
    return windSpeed;
}


const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

const response = await fetch(url);
const data = await response.json();


const windSpeed = data.wind.speed;
/*
        {
    "wind": {
      "speed": 5.1,
      "deg": 270
    }
  }

*/


console.log('Rüzgar Hızı (m/s):', windSpeed);
return windSpeed;



async function loadMap(lat, lon, apiKey) {
    
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(weatherUrl);
    const weatherData = await response.json();

    const weatherInfo = {
        temp: weatherData.main.temp,
        description: weatherData.weather[0].description,
        location: weatherData.name,
    };

    
    const map = L.map('map').setView([lat, lon], 10); 

   
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '©️ OpenStreetMap Katkıda Bulunanlar',
    }).addTo(map);

  
    const marker = L.marker([lat, lon]).addTo(map);
    marker.bindPopup(
        `<b>${weatherInfo.location}</b><br>
        Sıcaklık: ${weatherInfo.temp}°C<br>
        Durum: ${weatherInfo.description}`
    ).openPopup();
}


const apiKey = 'API_KEYİNİZİ_BURAYA_YERLEŞTİRİN';
loadMap(39.92077, 32.85411, apiKey); 


 

async function getWeatherInfo(lat, lon, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    const weather = {
        temp: data.main.temp,
        description: data.weather[0].description,
    };

    return weather;
}

// Haritaya entegre et
const apiKey = 'API_KEYİNİZİ_BURAYA_YERLEŞTİRİN';
getWeatherInfo(39.92077, 32.85411, apiKey).then((weather) => {
    const popupContent = `
        <b>Ankara</b><br>
        Sıcaklık: ${weather.temp}°C<br>
        Hava Durumu: ${weather.description}
    `;
    marker.bindPopup(popupContent).openPopup();
});







async function getHistoricalWeather(lat, lon, apiKey, timestamp) {
    const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    // Örnek veri yapısı
    const weatherInfo = {
        time: new Date(data.current.dt * 1000).toLocaleString(),
        temp: data.current.temp,
        weather: data.current.weather[0].description,
    };

    console.log('Tarihi Hava Durumu:', weatherInfo);
    return weatherInfo;
}



function fetchHistoricalWeather() {
    const dateInput = document.getElementById('datePicker').value;
    if (!dateInput) {
        alert('Lütfen bir tarih seçin!');
        return;
    }

    const timestamp = Math.floor(new Date(dateInput).getTime() / 1000);
    getHistoricalWeather(39.92077, 32.85411, apiKey, timestamp).then((data) => {
        document.getElementById('result').innerHTML = `
            <p>Tarih: ${data.time}</p>
            <p>Sıcaklık: ${data.temp}°C</p>
            <p>Hava Durumu: ${data.weather}</p>
        `;
    });
}
