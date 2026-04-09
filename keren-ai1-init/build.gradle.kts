plugins {
    kotlin("jvm") version "1.9.22" apply false
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val gdxVersion by extra("1.12.1")
