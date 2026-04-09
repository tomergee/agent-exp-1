# Installation Guide - Foodie Game

## Prerequisites

### Development Environment
- **Java Development Kit (JDK)**: Version 17 or higher
  ```bash
  java -version  # Should show 17+
  ```
- **Android Studio** (recommended): Latest stable version
  - Download: https://developer.android.com/studio
- **Android SDK**: API level 24+ (installed via Android Studio SDK Manager)
- **Git**: For cloning the repository

### Hardware
- **Target device**: Samsung Galaxy S22 (or any Android device with API 24+)
- **USB cable** for device deployment (or use wireless ADB)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/tomergee/keren-ai1.git
cd keren-ai1
```

### 2. Configure Android SDK

If building from command line, set the `ANDROID_HOME` environment variable:

```bash
# macOS/Linux
export ANDROID_HOME=$HOME/Android/Sdk
# or for macOS with Android Studio
export ANDROID_HOME=$HOME/Library/Android/sdk

# Windows
set ANDROID_HOME=%USERPROFILE%\AppData\Local\Android\Sdk
```

Alternatively, create a `local.properties` file in the project root:
```properties
sdk.dir=/path/to/your/Android/Sdk
```

### 3. Install Gradle Wrapper

The project includes a Gradle wrapper. Make it executable:
```bash
chmod +x gradlew
```

## Building

### Desktop Build (for testing)

```bash
./gradlew :desktop:run
```

This launches the game in a 480x800 desktop window. Use arrow keys to play.

### Android Debug Build

```bash
./gradlew :android:assembleDebug
```

Output APK location:
```
android/build/outputs/apk/debug/android-debug.apk
```

### Android Release Build

For a signed release build:

1. Create a keystore:
```bash
keytool -genkey -v -keystore foodie-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias foodie
```

2. Add signing config to `android/build.gradle.kts`:
```kotlin
android {
    signingConfigs {
        create("release") {
            storeFile = file("../foodie-release.jks")
            storePassword = "your-password"
            keyAlias = "foodie"
            keyPassword = "your-password"
        }
    }
    buildTypes {
        getByName("release") {
            signingConfig = signingConfigs.getByName("release")
            isMinifyEnabled = true
        }
    }
}
```

3. Build:
```bash
./gradlew :android:assembleRelease
```

## Installing on Samsung Galaxy S22

### Method 1: USB (ADB)

1. **Enable Developer Options** on your phone:
   - Settings > About phone > Software information
   - Tap "Build number" 7 times
   
2. **Enable USB Debugging**:
   - Settings > Developer options > USB debugging > ON
   
3. **Connect** your phone via USB cable

4. **Verify** the device is detected:
```bash
adb devices
```

5. **Install** the APK:
```bash
adb install android/build/outputs/apk/debug/android-debug.apk
```

6. **Launch** "Foodie" from your app drawer

### Method 2: Direct APK Transfer

1. Build the APK (see above)
2. Transfer `android-debug.apk` to your phone (email, cloud, USB file transfer)
3. On the phone, open the APK file
4. If prompted, allow "Install from unknown sources" for your file manager
5. Tap "Install"
6. Open "Foodie" from your app drawer

### Method 3: Android Studio

1. Open the project in Android Studio
2. Connect your Galaxy S22 via USB
3. Select your device in the device dropdown
4. Click the green "Run" button (or Shift+F10)

## Uninstalling

```bash
adb uninstall com.keren.foodie
```

Or on the phone: Settings > Apps > Foodie > Uninstall

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `ANDROID_HOME` not found | Set the environment variable or create `local.properties` |
| `SDK not found` | Install Android SDK 34 via Android Studio SDK Manager |
| Gradle build fails | Run `./gradlew clean` then rebuild |
| `adb: device not found` | Check USB cable, enable USB debugging, authorize the computer on the phone |
| APK install fails | Enable "Unknown sources" in phone settings |
| Black screen on launch | Make sure the phone supports OpenGL ES 2.0 (all modern phones do) |
| App crashes immediately | Check `adb logcat` for error logs: `adb logcat -s "LibGDX"` |

## Project Structure Overview

```
keren-ai1/
├── core/          - Shared game code (all game logic, screens, assets)
├── android/       - Android-specific launcher and config
├── desktop/       - Desktop launcher for testing
├── docs/          - Documentation
├── build.gradle.kts  - Root build configuration
└── settings.gradle.kts
```

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Android API | 24 (Android 7.0) | 33+ (Android 13+) |
| RAM | 2 GB | 4+ GB |
| Storage | 30 MB | 50 MB |
| GPU | OpenGL ES 2.0 | OpenGL ES 3.0+ |
