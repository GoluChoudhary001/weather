# Weather Application

A modern, responsive weather application built with HTML, CSS, and JavaScript. Features include real-time weather data, 5-day forecasts, location-based weather, user authentication, and a beautiful dark/light theme toggle.

## Features

- 🔐 **User Authentication**: Login, register, and guest access
- 🌤️ **Real-time Weather Data**: Get current weather conditions for any city
- 📍 **Location-based Weather**: Use your current location for weather data
- 📅 **5-Day Forecast**: View extended weather forecasts
- 🗺️ **Interactive Map**: View your location on an interactive map
- 🌙 **Dark/Light Theme**: Toggle between dark and light themes
- 🔍 **Smart Search**: Autocomplete search with city suggestions
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Auto-refresh**: Refresh weather data with one click
- 📰 **Weather News**: Get weather-related news and alerts
- 👤 **User Profiles**: Save preferences and favorite cities
- 🎨 **Personalized Experience**: Custom settings for each user
- 🚀 **Try Before You Sign Up**: Search weather first, then register

## User Flow

### **New User Experience:**
1. **Visit the app** → Start using immediately
2. **Search for a city** → Get weather data instantly
3. **After successful search** → Login prompt appears (optional)
4. **Choose to register** → Create account for full features
5. **Or continue as guest** → Basic access without persistence

### **Existing User Experience:**
1. **Login/Register** → Access personalized features
2. **Saved preferences** → Theme, default city, favorites
3. **Enhanced features** → Profile management, settings

## Setup Instructions

### 1. Get API Keys

You'll need two API keys to run this application:

#### OpenWeatherMap API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Get your API key from your account dashboard
4. Replace `YOUR_OPENWEATHERMAP_API_KEY` in `script.js` with your actual API key

#### Google Maps API Key (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API
4. Create credentials (API key)
5. Replace `YOUR_GOOGLE_MAPS_API_KEY` in `map.js` with your actual API key

### 2. Update API Keys

#### In `script.js`:
```javascript
const apiKey = "YOUR_ACTUAL_OPENWEATHERMAP_API_KEY";
```

#### In `map.js`:
```javascript
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_GOOGLE_MAPS_API_KEY&callback=initMap`;
```

### 3. Run the Application

#### Option 1: Using Python (Recommended)
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

#### Option 2: Using Node.js
```bash
npx http-server
```
Then open the URL shown in the terminal.

#### Option 3: Using Live Server (VS Code Extension)
1. Install the Live Server extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## File Structure

```
weather-application/
├── index.html          # Main application page (start here)
├── login.html          # Login and registration page
├── map.html           # Map page
├── script.js          # Main JavaScript functionality
├── auth.js            # Authentication system
├── login.js           # Login page functionality
├── map.js             # Map functionality
├── style.css          # Styling and responsive design
├── login.css          # Login page styling
├── images/            # Weather icons and images
│   ├── clear.png
│   ├── clouds.png
│   ├── drizzle.png
│   ├── humidity.png
│   ├── mist.png
│   ├── rain.png
│   ├── search.png
│   ├── snow.png
│   └── wind.png
└── README.md          # This file
```

## Authentication System

### User Types

1. **Anonymous Users**: Immediate access
   - Search and view weather data
   - Basic functionality
   - Login prompt after successful search
   - No data persistence

2. **Registered Users**: Full access to all features
   - Save preferences and settings
   - Favorite cities
   - Personalized experience
   - Profile management

3. **Guest Users**: Limited access
   - Basic weather functionality
   - No data persistence
   - Cannot save preferences

### Login Options

- **Email/Password**: Traditional login
- **Guest Access**: Quick access without registration
- **Social Login**: Google and Facebook (placeholder)

### Security Features

- Password validation
- Email verification (demo)
- Session management
- Local storage encryption (basic)

## User Experience Flow

### **Step 1: Immediate Access**
- Users can start using the app right away
- No registration required to search weather
- Clean, distraction-free interface

### **Step 2: Weather Search**
- Search for any city worldwide
- Get instant weather data
- View forecasts and news

### **Step 3: Login Prompt**
- After successful weather search
- Non-intrusive modal appears
- Options to register, login, or continue as guest

### **Step 4: Enhanced Features**
- For registered users: full feature access
- For guests: basic functionality
- For anonymous: prompted to create account

## Troubleshooting

### Common Issues

#### 1. "Invalid API key" Error
- Make sure you've replaced the placeholder API keys with your actual keys
- Verify your OpenWeatherMap API key is active
- Check if you've exceeded the free tier limits

#### 2. Authentication Issues
- Clear browser cache and localStorage
- Check if cookies are enabled
- Try logging in as guest first

#### 3. Location Not Working
- Ensure your browser allows location access
- Check if HTTPS is required (some browsers require HTTPS for geolocation)
- Try refreshing the page and allowing location permissions

#### 4. Map Not Loading
- Verify your Google Maps API key is correct
- Check if the Maps JavaScript API is enabled in Google Cloud Console
- Ensure you have billing set up (required for Google Maps API)

#### 5. Weather Data Not Loading
- Check your internet connection
- Verify the city name spelling
- Check browser console for error messages

#### 6. Login Page Issues
- Ensure all files are in the correct directory
- Check browser console for JavaScript errors
- Verify that localStorage is enabled

### Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (not recommended)

### Mobile Compatibility

- ✅ iOS Safari
- ✅ Android Chrome
- ✅ Samsung Internet
- ✅ Firefox Mobile

## API Usage

### OpenWeatherMap API
- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`
- **Free Tier**: 1,000 calls/day

### Google Maps API
- **Maps JavaScript API**: For interactive maps
- **Free Tier**: $200 credit/month

## User Features

### Anonymous Users
- **Immediate Access**: No registration required
- **Weather Search**: Find weather for any city
- **Basic Features**: Current weather and forecasts
- **Login Prompt**: After successful search

### Registered Users
- **Profile Management**: View and edit profile information
- **Settings**: Customize default city, theme, and units
- **Favorites**: Save and manage favorite cities
- **Preferences**: Persistent settings across sessions
- **Personalized Experience**: Custom weather alerts and news

### Guest Users
- **Basic Weather**: View current weather and forecasts
- **Search**: Find weather for any city
- **Location**: Use current location for weather
- **Theme**: Toggle between light and dark themes
- **No Persistence**: Settings reset on page refresh

## Customization

### Adding New Cities
Edit the `cityList` array in `script.js` to add or remove cities from the autocomplete suggestions.

### Changing Default City
Modify the fallback city in the `getCurrentLocation()` function in `script.js`.

### Styling Changes
Modify `style.css` and `login.css` to customize colors, fonts, and layout.

### Authentication Customization
Edit `login.js` and `auth.js` to modify authentication behavior and user management.

### Login Prompt Timing
Adjust the delay in `script.js` where the login prompt appears after weather search.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Look at browser console for error messages
3. Verify API keys are correctly set
4. Test with a different browser
5. Try logging in as guest first

## Features in Detail

### Authentication System
- Secure login and registration
- Guest access option
- User profile management
- Session persistence
- Password validation
- Form validation and error handling
- Non-intrusive login prompts

### Weather Display
- Current temperature in Celsius
- Humidity percentage
- Wind speed in km/h
- Weather condition with appropriate icon
- Real-time clock

### Search Functionality
- Autocomplete with 200+ cities worldwide
- Keyboard navigation (arrow keys, enter, escape)
- Click to select suggestions
- Search by typing and pressing enter

### Theme System
- Dark and light theme toggle
- Theme preference saved in localStorage
- Smooth transitions between themes
- Responsive design for both themes

### Location Features
- GPS-based location detection
- Interactive map display
- Fallback to default city if location fails
- Location permission handling

### Forecast System
- 5-day weather forecast
- Daily temperature predictions
- Weather condition icons
- Expandable forecast details

### News System
- Weather-related news generation
- Alerts based on weather conditions
- Real-time updates
- Responsive news layout

### User Management
- Profile information display
- Settings customization
- Favorite cities management
- Logout functionality
- Session management
- Non-intrusive authentication flow 