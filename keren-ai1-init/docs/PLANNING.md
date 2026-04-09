# Game Planning - Foodie

## Game Concept

- **Name**: Foodie
- **Genre**: 2D Lane Runner / Action
- **Platform**: Android (Samsung Galaxy S22)
- **Engine**: LibGDX 1.12.1 with Kotlin
- **Target Audience**: Casual gamers, all ages

## Core Mechanics

### Character
- "Foodie" - a cute anime girl wearing a chef hat
- Runs forward automatically on a pink park path
- Can switch between 3 lanes (left, center, right)
- Can jump to avoid obstacles

### Controls
- **Swipe left**: Move to left lane
- **Swipe right**: Move to right lane
- **Swipe up**: Jump
- **Tap**: Menu interactions

### Scoring
- Start with 5 life points
- Healthy food: +5 points (apple, carrot, banana, broccoli, watermelon)
- Unhealthy food: -3 points (donut, candy, soda, fries)
- Win at 100 points
- Game over at 0 points

### Difficulty
- Game speed gradually increases as score rises
- Food spawn interval randomized (0.8-1.5 seconds)
- 60% healthy / 40% unhealthy food ratio

## Visual Design
- Pink path through a green park
- Trees on both sides of the path
- Scrolling background for movement illusion
- Programmatically generated pixel art sprites
- Green/red flash effects on food collection
- Floating score popups (+5 / -3)

## Screens
1. **Menu**: Title, character preview, tap to play
2. **Game**: Main gameplay with HUD
3. **Game Over**: Score display, tap to retry
4. **Win**: Celebration, tap to play again

## Milestones

- [x] Define game concept and core mechanics
- [x] Choose game engine/framework (LibGDX)
- [x] Create project structure
- [x] Implement core gameplay
- [ ] Test on target device (Galaxy S22)
- [ ] Polish and release
