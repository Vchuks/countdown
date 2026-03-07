# CountDown Application

An application where you can add events and you can see the day, time, hour or seconds left before the events.

**[Live Demo →](https://countdown-mu-bice.vercel.app/)**

## Core features

- Create countdowns with name, date/time, and optional description
- Live ticking timers, updates every second
- States the urgency (far / approaching / imminent / past)
- Edit and delete events
- Data persists via `localStorage`
- Smooth modal with form validation


## Tech stack

- **React** (Vite)
- **Tailwind Css**
- **localStorage** for persistence
- **Boxicons** for icons 


## Getting started

```bash
# 1. Clone the repo
git clone https://github.com/Vchuks/countdown.git
cd countdown

# 2. Install dependencies
npm install

# 3. Run locally
npm run dev
```

## What I'd improve with more time

**Reminders / notifications** — Browser push notifications when an event is 24 hours away would make this useful.

**Progress Bar** — For each event to see how far or near it may be.


## Chalenges

Trying to get the timer for each event took quite a time. Also the urgency tracker.


## Time spent

Day 1- Design system, form modal 
Day 2- Core architecture, countdown logic, localStorage, card Layout
