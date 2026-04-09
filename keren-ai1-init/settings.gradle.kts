pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

include(":core", ":desktop")

// Only include android module if Android SDK is available
val androidSdkAvailable = providers.environmentVariable("ANDROID_HOME").isPresent ||
    providers.environmentVariable("ANDROID_SDK_ROOT").isPresent ||
    file("local.properties").exists()

if (androidSdkAvailable) {
    include(":android")
}
