# City

### One platform for everything happening around your city.

City is a full-stack city information and community platform designed to bring local discovery, community interaction, events, maps, weather, and personalized city information together in one place.

> 🚧 **Status: Actively under development**

---

## 🌆 Why City?

Information about a city is often scattered across different platforms — maps, social media, event websites, weather applications, local groups and government resources.

City aims to bring these experiences together into a single, location-aware platform where users can discover their city, interact with their local community, and access useful city information from one place.

---

## ✨ Features

### 🏠 City Dashboard

* Personalized city dashboard
* Current weather information
* Local alerts and updates
* Upcoming events
* Quick access to city features

### 🗺️ Explore

* Interactive city maps
* Location-based exploration
* Points of interest
* City-specific information

### 👥 Community

* Community posts
* User-generated content
* Post search
* Trending and following feeds
* Post sorting and filtering
* Save posts
* User profiles

### 📅 Events

* Discover local events
* Event information and locations
* Event-focused city discovery

### 👤 User System

* User registration and authentication
* User profiles
* Saved posts
* Personalized user experience

---

## 🏗️ Architecture

City is being developed as a full-stack application with a React frontend and FastAPI backend.

```text
                    CITY
                      │
          ┌───────────┴───────────┐
          │                       │
      Frontend                 Backend
          │                       │
       React                  FastAPI
          │                       │
    React Router             API Routers
          │                       │
       Redux               Business Logic
          │                       │
     REST APIs              SQLAlchemy
          │                       │
          └───────────┬───────────┘
                      │
                   Database
```

The frontend is responsible for the user interface, navigation, application state, and interaction with external and backend APIs.

The backend provides authentication, user management, post-related functionality, saved posts, and database interaction.

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* React Router
* Redux Toolkit
* React-Leaflet
* CSS
* Parcel

### Backend

* Python
* FastAPI
* SQLAlchemy

### APIs & Services

* REST APIs
* Weather API
* Map services

### Development

* Git
* GitHub
* VS Code

---

## 📁 Project Structure

```text
City/
│
├── Frontend/
│   ├── src/
│   │   ├── Assets/
│   │   ├── Components/
│   │   ├── Data/
│   │   ├── Pages/
│   │   └── Utils/
│   │
│   └── package.json
│
├── Backend/
│   └── App/
│       ├── Routers/
│       ├── Models/
│       ├── Schemas/
│       ├── Authentication/
│       ├── Database/
│       └── main.py
│
└── README.md
```

---

## 🚧 Development Status

City is being developed incrementally, with the frontend and backend being connected feature by feature.

### Completed

* React application architecture
* Application navigation and routing
* City dashboard
* Weather integration
* Maps integration
* Events interface
* User profiles
* Authentication flow
* Community feed interface
* Community search, sorting and filtering UI
* Saved posts functionality
* FastAPI backend foundation
* Database models and ORM integration
* Initial authentication and post APIs

### In Development

* Database-driven community feed
* Community post creation
* Server-side sorting and filtering
* Comments and post interactions
* Following system
* Improved authorization
* Complete frontend-backend integration

### Planned

* Notifications
* Local places and reviews
* Public transport information
* Administrative and civic information
* Advanced city search
* More location-aware features
* Production deployment

---

## 🔌 API

The backend is built with FastAPI and exposes REST endpoints for the application's core functionality.

Current backend functionality includes areas such as:

```text
Authentication
Users
Profiles
Posts
Saved Posts
```

API documentation will be expanded as additional services and endpoints are implemented.

---

## 🎯 Vision

City is being developed beyond a simple collection of city-related features.

The long-term goal is to create a unified digital layer for a city — connecting residents with local information, places, events, transportation, public services, and each other.

The project is intentionally being developed incrementally, allowing individual features to evolve into a connected full-stack platform.

---

## 🚀 Future Direction

The next stages of development focus on strengthening the backend, connecting the existing frontend features to persistent data, improving authentication and authorization, and expanding City into a more complete location-aware platform.

As development progresses, this README will be updated alongside the application.

---

## 👨‍💻 Author

**Udayan Kar**

City is an independently developed project focused on exploring full-stack application development, location-aware services, community platforms, and modern web application architecture.
