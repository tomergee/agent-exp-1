plugins {
    kotlin("jvm")
}

val gdxVersion: String by rootProject.extra

dependencies {
    api("com.badlogicgames.gdx:gdx:$gdxVersion")
}

java {
    sourceCompatibility = JavaVersion.VERSION_17
    targetCompatibility = JavaVersion.VERSION_17
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
    kotlinOptions.jvmTarget = "17"
}
