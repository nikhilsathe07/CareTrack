# CareTrack

CareTrack is a web application designed to help users manage their medication schedules, track adherence, and request renewals. Built with React, TypeScript, Material-UI (MUI), and React Query, it offers a responsive UI with light/dark mode support, a dashboard for medication overview, and a clean user experience.

## Features

Link : https://caretrack1.netlify.app/

- **Medication Dashboard:** View all medications with details like dosage, next dose, and adherence status.
- **Add Medications:** Form to input new medications with name, dosage, next dose, refills, and expiration date.
- **History Tracking:** Log of renewal requests with delete functionality.
- **Profile Page:** Displays medication adherence via a pie chart.
- **Theme Toggle:** Switch between light and dark modes, persisted in `localStorage`.
- **Responsive Design:** Adapts to desktop, tablet, and mobile screens.
- **Authentication:** Basic login/register system with local storage-based auth.
- **Notifications:** Banner for system-wide alerts.
- **Custom Logo:** Clickable logo in the app bar redirects to the homepage.

## Tech Stack

- **Frontend:** React, TypeScript, Material-UI (MUI), React Router
- **State Management:** React Query for data fetching and caching
- **Styling:** Custom CSS (`index.css`) with MUI overrides
- **Date Handling:** MUI X Date Pickers with Date-fns adapter
- **Notifications:** React Toastify
- **Persistence:** Local Storage for auth and theme settings

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
