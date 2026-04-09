# Foodie - Android Lane Runner Game

A 2D single-player action game for Android where you play as **Foodie**, a cute anime chef girl running through a pink park path collecting healthy food and avoiding junk food.

## Gameplay

- Run along a **3-lane pink path** through a park
- **Swipe left/right** to switch lanes, **swipe up** to jump
- Collect **healthy food** (apple, carrot, banana, broccoli, watermelon) for **+5 points**
- Avoid **unhealthy food** (donut, candy, soda, fries) which costs **-3 points**
- Start with **5 life points**
- Reach **100 points** to win
- Hit **0 points** and it's game over

## Quick Start

```bash
# Clone
git clone https://github.com/tomergee/keren-ai1.git
cd keren-ai1

# Run on desktop (for testing)
./gradlew :desktop:run

# Build Android APK
./gradlew :android:assembleDebug
```

## Requirements

- JDK 17+
- Android SDK (API 24+)
- Android Studio (recommended)

## Documentation

- [Installation Guide](docs/INSTALLATION.md) - Setup, building, and deploying to device
- [Testing Guide](docs/TESTING.md) - Test checklist and troubleshooting
- [Planning](docs/PLANNING.md) - Game design document

## Project Structure

```
core/       - Shared game logic (screens, mechanics, assets)
android/    - Android launcher and config
desktop/    - Desktop launcher for testing
docs/       - Documentation
```

## Tech Stack

- **Framework**: LibGDX 1.12.1
- **Language**: Kotlin
- **Target**: Android (Samsung Galaxy S22), portrait mode
- **Art**: Programmatically generated pixel art
