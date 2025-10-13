# Assignment #2 Create a Web Frontend with HTML, CSS, and JavaScript

This is the frontend part built with **Next.js + TailwindCSS**  
It connects to the backend API from Assignment 1 to display and manage drone data.

## Features
- Fetch drone configuration from backend.
- Store config data in LocalStorage for later use.
- Submit new temperature logs.
- View logs with pagination controls.
- Global sidebar navigation across all pages.
- Responsive and minimalist dashboard UI.

## Pages
| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Welcome page with project overview |
| View Config | `/config` | Fetch drone data and save it to LocalStorage |
| Temperature Log | `/form` | Form to log drone temperature data |
| View Logs | `/logs` | Paginated table showing temperature logs |

## Implementation
- **React Hooks:** Used `useState` and `useEffect` for dynamic data fetching.
- **Fetch API:** For backend communication.
- **LocalStorage:** To persist drone configuration between pages.
- **TailwindCSS:** For fast, modern, and UI styling.

## How to Run
```bash
npm install
npm run dev
```
Runs on: http://localhost:3000

## UI Design
The entire UI was **designed by me using Figma**, before implementing in Next.js.  
Every layout, color, and element was created from scratch to ensure a clean and consistent dashboard experience.  

-> [Click to View Full Design Board](https://www.figma.com/design/twvPiRn7snu7DkJ22OgeId/Drone-Monitoring-Dashboard?node-id=31-96&t=I9n3Vya0UZMZ3J4S-1)