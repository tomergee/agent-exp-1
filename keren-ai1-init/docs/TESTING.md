# Testing Guide - Foodie Game

## Desktop Testing (Recommended for Development)

The fastest way to test the game is on desktop using LibGDX's LWJGL3 backend.

### Run on Desktop

```bash
cd keren-ai1
./gradlew :desktop:run
```

### Desktop Controls

| Action      | Desktop Key        | Mobile Equivalent  |
|-------------|--------------------|--------------------|
| Move left   | Left arrow key     | Swipe left         |
| Move right  | Right arrow key    | Swipe right        |
| Jump        | Up arrow / Space   | Swipe up           |
| Start game  | Click anywhere     | Tap screen         |

### What to Test

#### 1. Menu Screen
- [ ] Pink background loads correctly
- [ ] "FOODIE" title is visible
- [ ] Character preview animates
- [ ] "TAP TO PLAY" text pulses
- [ ] Tapping/clicking starts the game

#### 2. Gameplay
- [ ] Pink path with green park sides is visible
- [ ] Background scrolls to create movement illusion
- [ ] Foodie character appears in the center lane
- [ ] Lane switching works (left/right)
- [ ] Character cannot move beyond leftmost/rightmost lane
- [ ] Jump animation works (swipe up / Up key)
- [ ] Food items spawn from top of screen
- [ ] Food items scroll downward
- [ ] Food appears in all 3 lanes
- [ ] Both healthy and unhealthy food types appear

#### 3. Scoring
- [ ] Score starts at 5
- [ ] Healthy food adds +5 points (green popup)
- [ ] Unhealthy food subtracts -3 points (red popup)
- [ ] Score display updates in HUD
- [ ] Green flash on healthy food collection
- [ ] Red flash on unhealthy food collection

#### 4. Win Condition
- [ ] Reaching 100 points triggers Win Screen
- [ ] "YOU WIN!" text displays
- [ ] Character animates on win screen
- [ ] Tapping returns to Menu Screen

#### 5. Lose Condition
- [ ] Reaching 0 points triggers Game Over Screen
- [ ] "GAME OVER" text displays
- [ ] Final score is shown
- [ ] Tapping starts a new game

#### 6. Food Types
Healthy (+5 points):
- [ ] Apple (red circle with green stem)
- [ ] Carrot (orange triangle with green top)
- [ ] Banana (yellow crescent)
- [ ] Broccoli (green florets with stem)
- [ ] Watermelon (green circle with red inside, seeds)

Unhealthy (-3 points):
- [ ] Donut (brown ring with pink frosting, sprinkles)
- [ ] Candy (red wrapper shape)
- [ ] Soda (purple can)
- [ ] Fries (red container with yellow fries)

## Android Testing

### Build the APK

```bash
./gradlew :android:assembleDebug
```

The APK will be at: `android/build/outputs/apk/debug/android-debug.apk`

### Install on Device

1. **Enable USB debugging** on your Samsung Galaxy S22:
   - Go to Settings > About phone > Software information
   - Tap "Build number" 7 times to enable Developer options
   - Go to Settings > Developer options > Enable "USB debugging"

2. **Connect device** via USB and install:
```bash
adb install android/build/outputs/apk/debug/android-debug.apk
```

3. **Or transfer the APK** to the device and install manually.

### Android-Specific Tests

- [ ] App launches in portrait mode
- [ ] Swipe left moves character left
- [ ] Swipe right moves character right
- [ ] Swipe up makes character jump
- [ ] Touch/tap works on all screens
- [ ] Game runs smoothly at 60fps (no stuttering)
- [ ] Graphics render correctly at device resolution
- [ ] App doesn't crash on pause/resume (home button)
- [ ] Immersive mode hides navigation/status bars

### Performance Testing

On Samsung Galaxy S22:
- Target: 60 FPS constant
- Monitor via Android Studio Profiler or `adb shell dumpsys gfxinfo com.keren.foodie`
- Watch for GC pauses (food object pooling should prevent this)

## Common Issues

| Issue | Solution |
|-------|----------|
| Blank screen on launch | Check that `AssetGenerator.generate()` runs before first render |
| Food not spawning | Verify `GameWorld.update()` is called each frame |
| Swipe not working | Check `SwipeDetector` threshold (50px) - may need adjustment |
| Jerky movement | Ensure delta time is used for all movement calculations |
| APK won't install | Check minSdk (24) matches device, enable "Unknown sources" |
