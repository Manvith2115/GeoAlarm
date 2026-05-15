# GeoAlarm

> Never miss your stop again.

GeoAlarm is a location-based alarm mobile app built with React Native and Expo. Instead of setting a time-based alarm, you drop a pin anywhere on the map and set a radius. The moment you enter that zone, your phone rings and vibrates to wake you up.

**Built for one simple use case** — sleeping on a bus and not missing your stop.

---

## Download

[Download APK (v1.0.0)](https://github.com/Manvith2115/GeoAlarm/releases/tag/v1.0.0)

> Android only. Enable "Install from unknown sources" in your settings before installing.

---

## How it works

1. Open the app and set your alarm radius (100m to 5km)
2. Tap anywhere on the map to drop a destination pin
3. Lock your phone and sleep
4. GeoAlarm tracks your location in the background
5. When you enter the alarm zone — it rings and vibrates
6. Tap **Stop** to dismiss

---

## Features

- Interactive Google Maps with tap-to-drop destination pin
- Variable alarm radius via slider (100m to 5km)
- Visual radius circle drawn on the map
- Real-time GPS tracking (updates every 3 seconds)
- Haversine formula for accurate distance calculation
- Alarm sound + vibration pattern when entering the zone
- Background location tracking (works with screen locked)
- Persistent foreground notification while alarm is active
- Stop button to dismiss the alarm

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native + Expo | Cross-platform mobile framework |
| expo-location | Real-time GPS tracking + background tasks |
| expo-av | Alarm sound playback |
| expo-task-manager | Background location processing |
| react-native-maps | Google Maps integration |
| @react-native-community/slider | Radius selector UI |
| Haversine formula | Accurate GPS distance calculation |
| EAS Build | Cloud-based APK compilation |

---

## Project Structure

```
GeoAlarm/
├── app/
│   ├── index.tsx        ← Landing screen
│   ├── map.tsx          ← Map, radius selector, alarm logic
│   └── _layout.tsx      ← Navigation layout
├── utils/
│   └── haversine.js     ← Distance calculation formula
├── assets/
│   └── alarm.mp3        ← Alarm sound
├── app.json             ← Expo + Android config
└── eas.json             ← EAS build profiles
```

---

## Run Locally

```bash
# Clone the repo
git clone https://github.com/Manvith2115/GeoAlarm.git
cd GeoAlarm

# Install dependencies
npm install

# Create .env file
echo "EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here" > .env

# Start development server
npx expo start --clear
```

> You'll need a Google Maps API key with Maps SDK for Android enabled.
> Get one at console.cloud.google.com

---

## Build APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK
eas build --platform android --profile preview
```

---

## What I learned building this

- React Native component lifecycle and hooks (useState, useEffect)
- Async/await for handling GPS and audio APIs
- Background location tracking on Android
- The Haversine formula for calculating real-world distances from GPS coordinates
- EAS Build for compiling and distributing Android APKs
- Managing API keys securely with environment variables

---

## Future Plans

- Search bar for typing destinations (Google Places API)
- Multiple saved alarm locations
- iOS support
- Alarm scheduling (set alarm in advance)
- Play Store release

---

## Built by

**Manvith** — May 2026  
[GitHub](https://github.com/Manvith2115)
