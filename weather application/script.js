// Weather App - Clean Version
const apiKey = "0f5e6318b7e215c4c19572d9ef26a54e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

// DOM elements
let searchInput, weatherIcon, temperature, cityName, humidity, windSpeed, currentTime, newsContainer, forecastContainer, cityPreview;

// City list for autocomplete
const cityList = [
    "New York", "London", "Tokyo", "Paris", "Berlin", "Madrid", "Rome", "Barcelona", 
    "Amsterdam", "Vienna", "Prague", "Budapest", "Warsaw", "Stockholm", "Copenhagen", 
    "Oslo", "Helsinki", "Dublin", "Brussels", "Zurich", "Munich", "Milan", "Athens", 
    "Lisbon", "Bucharest", "Sofia", "Belgrade", "Zagreb", "Bratislava", "Ljubljana", 
    "Tallinn", "Riga", "Vilnius", "Reykjavik", "Istanbul", "Ankara", "Tbilisi", 
    "Yerevan", "Baku", "Tashkent", "Almaty", "Astana", "Moscow", "Saint Petersburg",
    "Kiev", "Minsk", "Riga", "Tallinn", "Vilnius", "Warsaw", "Prague", "Vienna", 
    "Budapest", "Bratislava", "Ljubljana", "Zagreb", "Belgrade", "Sofia", "Bucharest"
];

// Autocomplete variables
let currentSuggestions = [];
let selectedIndex = -1;
let isSuggestionsVisible = false;

// Login prompt tracking
let hasShownLoginPrompt = false;

// Weather animation elements
let sunnyAnimation, rainyAnimation, cloudyAnimation, snowyAnimation, nightAnimation;

// Initialize DOM elements
function initializeDOMElements() {
    searchInput = document.getElementById("searchInput");
    weatherIcon = document.getElementById("weatherIcon");
    temperature = document.getElementById("temperature");
    cityName = document.getElementById("cityName");
    humidity = document.getElementById("humidity");
    windSpeed = document.getElementById("windSpeed");
    currentTime = document.getElementById("currentTime");
    newsContainer = document.getElementById("newsContainer");
    forecastContainer = document.getElementById("forecastContainer");
    cityPreview = document.getElementById('cityPreview');
    
    // Initialize weather animation elements
    sunnyAnimation = document.getElementById("sunnyAnimation");
    rainyAnimation = document.getElementById("rainyAnimation");
    cloudyAnimation = document.getElementById("cloudyAnimation");
    snowyAnimation = document.getElementById("snowyAnimation");
    nightAnimation = document.getElementById("nightAnimation");
    
    // Set up event listeners
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
        searchInput.addEventListener('keydown', handleSearchKeydown);
        searchInput.addEventListener('focus', handleSearchFocus);
    }
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput?.contains(e.target) && !cityPreview?.contains(e.target)) {
            hideSuggestions();
        }
    });
}

// Weather Animation Functions
function clearAllAnimations() {
    if (sunnyAnimation) sunnyAnimation.classList.remove('show');
    if (rainyAnimation) rainyAnimation.classList.remove('show');
    if (cloudyAnimation) cloudyAnimation.classList.remove('show');
    if (snowyAnimation) snowyAnimation.classList.remove('show');
    if (nightAnimation) nightAnimation.classList.remove('show');
    
    // Clear dynamic elements
    if (rainyAnimation) rainyAnimation.innerHTML = '';
    if (cloudyAnimation) cloudyAnimation.innerHTML = '';
    if (snowyAnimation) snowyAnimation.innerHTML = '';
    if (nightAnimation) nightAnimation.innerHTML = '';
}

function createRaindrops() {
    if (!rainyAnimation) return;
    
    for (let i = 0; i < 50; i++) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.style.left = Math.random() * 100 + '%';
        raindrop.style.animationDelay = Math.random() * 2 + 's';
        raindrop.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        rainyAnimation.appendChild(raindrop);
    }
}

function createClouds() {
    if (!cloudyAnimation) return;
    
    // Create multiple cloud formations for depth
    for (let formation = 0; formation < 3; formation++) {
        const cloudFormation = document.createElement('div');
        cloudFormation.className = `cloud-formation cloud-formation-${formation + 1}`;
        
        // Create cloud layers for each formation
        for (let layer = 0; layer < 3; layer++) {
            const cloudLayer = document.createElement('div');
            cloudLayer.className = 'cloud-layer';
            
            // Create multiple clouds in each layer
            for (let i = 0; i < 3; i++) {
                const cloud = document.createElement('div');
                cloud.className = 'cloud';
                
                // Random positioning and timing
                cloud.style.top = (Math.random() * 60 + 10 + layer * 20) + '%';
                cloud.style.animationDelay = (Math.random() * 10 + formation * 5) + 's';
                cloud.style.animationDuration = (Math.random() * 20 + 30) + 's';
                cloud.style.width = (Math.random() * 120 + 80) + 'px';
                cloud.style.height = (Math.random() * 50 + 30) + 'px';
                
                cloudLayer.appendChild(cloud);
            }
            
            cloudFormation.appendChild(cloudLayer);
        }
        
        cloudyAnimation.appendChild(cloudFormation);
    }
    
    // Create special floating clouds
    for (let i = 0; i < 4; i++) {
        const specialCloud = document.createElement('div');
        specialCloud.className = 'cloud cloud-special';
        specialCloud.style.top = Math.random() * 70 + 5 + '%';
        specialCloud.style.animationDelay = (Math.random() * 15 + 5) + 's';
        specialCloud.style.animationDuration = (Math.random() * 25 + 35) + 's';
        specialCloud.style.width = (Math.random() * 150 + 100) + 'px';
        specialCloud.style.height = (Math.random() * 60 + 40) + 'px';
        cloudyAnimation.appendChild(specialCloud);
    }
    
    // Create individual floating clouds
    for (let i = 0; i < 6; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = Math.random() * 80 + 10 + '%';
        cloud.style.animationDelay = (Math.random() * 20 + 10) + 's';
        cloud.style.animationDuration = (Math.random() * 30 + 40) + 's';
        cloud.style.width = (Math.random() * 100 + 80) + 'px';
        cloud.style.height = (Math.random() * 45 + 35) + 'px';
        cloudyAnimation.appendChild(cloud);
    }
}

function createSnowflakes() {
    if (!snowyAnimation) return;
    
    const snowflakeChars = ['❄', '❅', '❆', '•'];
    
    for (let i = 0; i < 30; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDelay = Math.random() * 3 + 's';
        snowflake.style.animationDuration = (Math.random() * 3 + 4) + 's';
        snowflake.style.fontSize = (Math.random() * 10 + 15) + 'px';
        snowyAnimation.appendChild(snowflake);
    }
}

function createStars() {
    if (!nightAnimation) return;
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        nightAnimation.appendChild(star);
    }
}

function showWeatherAnimation(weatherType) {
    clearAllAnimations();
    
    switch (weatherType) {
        case 'sunny':
        case 'clear':
            if (sunnyAnimation) sunnyAnimation.classList.add('show');
            break;
            
        case 'rainy':
        case 'rain':
        case 'drizzle':
            if (rainyAnimation) {
                rainyAnimation.classList.add('show');
                createRaindrops();
            }
            break;
            
        case 'cloudy':
        case 'clouds':
            if (cloudyAnimation) {
                cloudyAnimation.classList.add('show');
                createClouds();
            }
            break;
            
        case 'snowy':
        case 'snow':
            if (snowyAnimation) {
                snowyAnimation.classList.add('show');
                createSnowflakes();
            }
            break;
            
        case 'night':
        case 'clear-night':
            if (nightAnimation) {
                nightAnimation.classList.add('show');
                createStars();
            }
            break;
            
        default:
            // Default to night animation for unknown weather
            if (nightAnimation) {
                nightAnimation.classList.add('show');
                createStars();
            }
            break;
    }
}

// Event handlers
function handleSearchInput() {
    const query = this.value.trim().toLowerCase();
    if (query.length < 2) {
        hideSuggestions();
        return;
    }
    const suggestions = cityList.filter(city => 
        city.toLowerCase().includes(query)
    ).slice(0, 5);
    showSuggestions(suggestions, query);
}

function handleSearchKeydown(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (isSuggestionsVisible && currentSuggestions.length > 0 && selectedIndex >= 0) {
            selectSuggestion(currentSuggestions[selectedIndex]);
        } else {
            searchWeather();
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (isSuggestionsVisible && currentSuggestions.length > 0) {
            selectedIndex = Math.min(selectedIndex + 1, currentSuggestions.length - 1);
            updateSelection();
        }
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (isSuggestionsVisible && currentSuggestions.length > 0) {
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection();
        }
    } else if (e.key === 'Escape') {
        hideSuggestions();
    }
}

function handleSearchFocus() {
    const query = searchInput.value.trim().toLowerCase();
    if (query.length >= 2) {
        const suggestions = cityList.filter(city => 
            city.toLowerCase().includes(query)
        ).slice(0, 5);
        showSuggestions(suggestions, query);
    }
}

// Utility functions
function showError(message) {
    console.error(message);
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
}

// Update weather UI
function updateWeatherUI(data) {
    if (!data) return;
    
    try {
        const temp = Math.round(data.main.temp);
        const humidityValue = data.main.humidity;
        const windSpeedValue = data.wind.speed;
        const weatherMain = data.weather[0].main.toLowerCase();
        const weatherIconCode = data.weather[0].icon;
        
        temperature.textContent = `${temp}°C`;
        cityName.textContent = data.name;
        humidity.textContent = `${humidityValue}%`;
        windSpeed.textContent = `${windSpeedValue} km/h`;
        
        // Update weather icon
        weatherIcon.src = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
        
        // Update background based on weather
        updateBackground(weatherMain);
        
        // Update time
        updateTime();
        
    } catch (error) {
        console.error('Error updating weather UI:', error);
        showError('Failed to update weather display');
    }
}

// Update background based on weather
function updateBackground(weatherCondition) {
    const body = document.body;
    body.className = ''; // Reset classes
    
    if (weatherCondition.includes('clear')) {
        body.classList.add('sunny-bg');
        showWeatherAnimation('sunny');
    } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
        body.classList.add('rainy-bg');
        showWeatherAnimation('rainy');
    } else if (weatherCondition.includes('cloud')) {
        body.classList.add('cloudy-bg');
        showWeatherAnimation('cloudy');
    } else if (weatherCondition.includes('snow')) {
        body.classList.add('snow-bg');
        showWeatherAnimation('snowy');
    } else {
        body.classList.add('night-bg');
        showWeatherAnimation('night');
    }
}

// Check weather for a city
async function checkWeather(city) {
    if (!city || city.trim() === '') {
        showError('Please enter a city name');
        return;
    }
    
    try {
        const response = await fetch(apiUrl + encodeURIComponent(city.trim()) + `&appid=${apiKey}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                showError('City not found. Please check the spelling.');
            } else if (response.status === 401) {
                showError('API key error. Please check configuration.');
            } else {
                showError(`Weather data unavailable (${response.status})`);
            }
            return;
        }
        
        const data = await response.json();
        
        if (!data || !data.main) {
            showError('Invalid weather data received');
            return;
        }
        
        updateWeatherUI(data);
        updateForecast(city);
        generateCityNews(city, data);
        
        // Show login prompt for non-authenticated users after successful search
        if (typeof isUserAuthenticated === 'function' && !isUserAuthenticated() && !hasShownLoginPrompt) {
            setTimeout(() => {
                if (typeof showLoginPrompt === 'function') {
                    showLoginPrompt();
                    hasShownLoginPrompt = true;
                }
            }, 2000); // Show after 2 seconds
        }
        
    } catch (error) {
        console.error('Error fetching weather:', error);
        showError('Failed to fetch weather data. Please try again.');
    }
}

// Get weather by coordinates
async function getWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        updateWeatherUI(data);
        updateForecast(data.name);
        generateCityNews(data.name, data);
        
        // Show login prompt for non-authenticated users after successful location search
        if (typeof isUserAuthenticated === 'function' && !isUserAuthenticated() && !hasShownLoginPrompt) {
            setTimeout(() => {
                if (typeof showLoginPrompt === 'function') {
                    showLoginPrompt();
                    hasShownLoginPrompt = true;
                }
            }, 2000); // Show after 2 seconds
        }
        
    } catch (error) {
        console.error('Error fetching weather by coordinates:', error);
        showError('Failed to get weather for your location');
    }
}

// Update forecast
async function updateForecast(city) {
    if (!city) return;
    
    try {
        const response = await fetch(forecastApiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);
        
        if (!response.ok) {
            console.error('Forecast API error:', response.status);
            return;
        }
        
        const data = await response.json();
        
        if (!data || !data.list) {
            console.error('Invalid forecast data');
            return;
        }
        
        // Get daily forecasts (every 8th item = 24 hours apart)
        const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
        
        forecastContainer.innerHTML = '';
        
        dailyForecasts.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(forecast.main.temp);
            const weatherIconCode = forecast.weather[0].icon;
            
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item';
            forecastItem.innerHTML = `
                <div class="forecast-day">${dayName}</div>
                <img src="http://openweathermap.org/img/wn/${weatherIconCode}.png" alt="weather" class="forecast-icon">
                <div class="forecast-temp">${temp}°C</div>
            `;
            
            forecastContainer.appendChild(forecastItem);
        });
        
    } catch (error) {
        console.error('Error updating forecast:', error);
    }
}

// Generate city news
function generateCityNews(city, weatherData) {
    const newsItems = [
        {
            title: `Weather Update for ${city}`,
            content: `Current temperature is ${Math.round(weatherData.main.temp)}°C with ${weatherData.weather[0].description}.`,
            time: new Date().toLocaleTimeString()
        },
        {
            title: `${city} Weather Alert`,
            content: `Humidity levels at ${weatherData.main.humidity}% with wind speeds of ${weatherData.wind.speed} km/h.`,
            time: new Date().toLocaleTimeString()
        },
        {
            title: "Weather Tips",
            content: "Remember to check the weather before planning outdoor activities. Stay safe and prepared!",
            time: new Date().toLocaleTimeString()
        }
    ];
    
    updateNews(newsItems);
}

// Update news display
function updateNews(newsItems) {
    if (!newsContainer) return;
    
    newsContainer.innerHTML = '';
    
    newsItems.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <div class="time">${item.time}</div>
        `;
        newsContainer.appendChild(newsItem);
    });
}

// Get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.error('Geolocation error:', error);
                showError('Unable to get your location. Please search for a city.');
            }
        );
    } else {
        showError('Geolocation is not supported by this browser.');
    }
}

// Search weather
function searchWeather() {
    const city = searchInput.value.trim();
    if (city) {
        checkWeather(city);
        hideSuggestions();
    }
}

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Check and apply theme
function checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
    }
}

// Refresh weather
function refreshWeather() {
    const currentCity = cityName.textContent;
    if (currentCity && currentCity !== '--') {
        checkWeather(currentCity);
        showSuccess('Weather refreshed!');
    } else {
        getCurrentLocation();
    }
}

// Update time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    if (currentTime) {
        currentTime.textContent = timeString;
    }
}

// Autocomplete functions
function showSuggestions(suggestions, query) {
    if (!cityPreview) return;
    
    if (suggestions.length === 0) {
        showNoSuggestions();
        return;
    }
    
    currentSuggestions = suggestions;
    selectedIndex = -1;
    isSuggestionsVisible = true;
    
    cityPreview.innerHTML = '';
    cityPreview.style.display = 'block';
    
    suggestions.forEach((city, index) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.textContent = city;
        item.addEventListener('click', () => selectSuggestion(city));
        cityPreview.appendChild(item);
    });
}

function showNoSuggestions() {
    if (!cityPreview) return;
    
    cityPreview.innerHTML = '<div class="no-suggestions">No cities found</div>';
    cityPreview.style.display = 'block';
    isSuggestionsVisible = false;
}

function hideSuggestions() {
    if (!cityPreview) return;
    
    cityPreview.style.display = 'none';
    isSuggestionsVisible = false;
    currentSuggestions = [];
    selectedIndex = -1;
}

function selectSuggestion(city) {
    searchInput.value = city;
    hideSuggestions();
    checkWeather(city);
}

function updateSelection() {
    const items = cityPreview.querySelectorAll('.suggestion-item');
    items.forEach((item, index) => {
        if (index === selectedIndex) {
            item.classList.add('selected');
        } else {
            item.classList.remove('selected');
        }
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    checkTheme();
    updateTime();
    setInterval(updateTime, 1000);
    
    // Initialize DOM elements
    initializeDOMElements();
    
    // Try to get current location on load
    setTimeout(() => {
        getCurrentLocation();
    }, 1000);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .suggestion-item.selected {
        background: rgba(102, 126, 234, 0.3);
    }
    
    .no-suggestions {
        color: #999;
        text-align: center;
        padding: 10px;
    }
`;
document.head.appendChild(style); 