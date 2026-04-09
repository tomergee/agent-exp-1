package com.keren.foodie.desktop

import com.badlogic.gdx.backends.lwjgl3.Lwjgl3Application
import com.badlogic.gdx.backends.lwjgl3.Lwjgl3ApplicationConfiguration
import com.keren.foodie.FoodieGame

fun main() {
    val config = Lwjgl3ApplicationConfiguration().apply {
        setTitle("Foodie")
        setWindowedMode(480, 800)
        setResizable(false)
    }
    Lwjgl3Application(FoodieGame(), config)
}
