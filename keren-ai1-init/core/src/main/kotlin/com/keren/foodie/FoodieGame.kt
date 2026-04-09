package com.keren.foodie

import com.badlogic.gdx.Game
import com.badlogic.gdx.graphics.g2d.BitmapFont
import com.badlogic.gdx.graphics.g2d.SpriteBatch
import com.keren.foodie.graphics.AssetGenerator
import com.keren.foodie.screens.MenuScreen

class FoodieGame : Game() {
    lateinit var batch: SpriteBatch
    lateinit var font: BitmapFont
    lateinit var titleFont: BitmapFont
    lateinit var assets: AssetGenerator

    override fun create() {
        batch = SpriteBatch()
        font = BitmapFont().apply { data.setScale(2f) }
        titleFont = BitmapFont().apply { data.setScale(4f) }
        assets = AssetGenerator()
        assets.generate()
        setScreen(MenuScreen(this))
    }

    override fun dispose() {
        batch.dispose()
        font.dispose()
        titleFont.dispose()
        assets.dispose()
        screen?.dispose()
    }
}
