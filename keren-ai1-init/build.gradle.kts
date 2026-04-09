plugins {
    kotlin("jvm") version "2.1.10" apply false
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val gdxVersion by extra("1.12.1")
