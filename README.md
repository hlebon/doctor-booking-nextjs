# Doctor Appointment Booking System

A modern, accessible web application for booking doctor appointments, built with React, TypeScript, and TailwindCSS.

Link: https://doctor-booking-nextjs.onrender.com/

<img width="1457" alt="image" src="https://github.com/user-attachments/assets/665e0ae6-56d2-463b-b11c-c7b913197385" />


## Features

- 📋 Doctor directory with filtering capabilities
- 📅 Appointment booking system
- ♿ Accessibility-first design
- 📱 Responsive layout

## Tech Stack

- React 19
- TypeScript
- TailwindCSS
- Zustand (State Management)
- Jest & Testing Library

## 📋 Prerequisites

- Node.js 18+
- npm 9+

## Setup Instructions

Clone the repository:

- `git clone https://github.com/hlebon/doctor-booking-nextjs`
- `cd doctor-booking-nextjs`
- `npm install`
- `npm run dev`

Run lighthouse

- `npm run lighthouse`
- Example:
  ![Doctor Booking App](/public/images/lighthouse-report.png)

## AI Tools Usage

This project was developed with assistance from AI tools:

1. **Cursor AI**

   - Generated basic component structure and boilerplate
   - Created TypeScript Types
   - Generated test cases and mocks

2. **GitHub Copilot**

   - Assisted with component UI, limited styling and visual appeal
   - Provided accessibility improvements
   - Helped with test implementations but buggy, none of the tests worked only after updating them

## Known Limitations

1. **Data Management**

   - In-memory state management (Zustand)
   - No data persistence across sessions
   - Limited mock data for doctors

2. **Booking System**

   - Fixed time slots only
   - Basic notification system

3. **UI/UX**
   - Basic error handling
   - Limited loading states
   - No form validation
   - Basic responsive design

## Next Steps

1. **Data Layer**

   - [ ] Implement backend API
   - [ ] Add database integration
   - [ ] Set up user authentication
   - [ ] Add data persistence

2. **Features**

   - [ ] Recurring appointments
   - [ ] Better notifications
   - [ ] Doctor reviews

3. **Testing**

   - [ ] Increase test coverage
   - [ ] Add E2E tests
   - [ ] Performance testing
   - [ ] Load testing

4. **UI/UX**
   - [ ] Improve error handling
   - [ ] Enhanced responsive design
   - [ ] Animations and transitions
