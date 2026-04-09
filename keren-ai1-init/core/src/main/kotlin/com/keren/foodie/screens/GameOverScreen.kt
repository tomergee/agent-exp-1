package com.keren.foodie.screens

import com.badlogic.gdx.Gdx
import com.badlogic.gdx.ScreenAdapter
import com.badlogic.gdx.graphics.Color
import com.badlogic.gdx.graphics.GL20
import com.badlogic.gdx.graphics.OrthographicCamera
import com.badlogic.gdx.graphics.glutils.ShapeRenderer
import com.badlogic.gdx.utils.viewport.FitViewport
import com.keren.foodie.FoodieGame
import com.keren.foodie.input.SwipeDetector
import com.keren.foodie.input.SwipeListener

class GameOverScreen(
    private val game: FoodieGame,
    private val finalScore: Int
) : ScreenAdapter(), SwipeListener {
    private val camera = OrthographicCamera()
    private val viewport = FitViewport(480f, 800f, camera)
    private val shapeRenderer = ShapeRenderer()
    private var timer = 0f

    override fun show() {
        Gdx.input.inputProcessor = SwipeDetector(this)
        camera.position.set(240f, 400f, 0f)
    }

    override fun render(delta: Float) {
        timer += delta

        Gdx.gl.glClearColor(0.3f, 0.1f, 0.1f, 1f)
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT)

        camera.update()

        // Dark overlay with sad elements
        shapeRenderer.projectionMatrix = camera.combined
        shapeRenderer.begin(ShapeRenderer.ShapeType.Filled)
        shapeRenderer.setColor(0.4f, 0.15f, 0.15f, 1f)
        shapeRenderer.circle(240f, 450f, 100f)
        shapeRenderer.end()

        game.batch.projectionMatrix = camera.combined
        game.batch.begin()

        // Sad Foodie
        game.batch.draw(game.assets.playerTextures[0], 208f, 420f, 64f, 64f)

        // Game Over text
        game.titleFont.setColor(Color(1f, 0.3f, 0.3f, 1f))
        game.titleFont.draw(game.batch, "GAME", 130f, 650f)
        game.titleFont.draw(game.batch, "OVER", 140f, 580f)

        // Final score
        game.font.setColor(Color(1f, 0.7f, 0.7f, 1f))
        game.font.draw(game.batch, "Final Score: $finalScore", 120f, 350f)

        // Tap to retry (pulsing)
        val alpha = (Math.sin(timer * 3.0) * 0.3 + 0.7).toFloat()
        game.font.setColor(Color(1f, 0.5f, 0.5f, alpha))
        game.font.draw(game.batch, "TAP TO RETRY", 120f, 200f)

        game.batch.end()
    }

    override fun resize(width: Int, height: Int) {
        viewport.update(width, height)
    }

    override fun dispose() {
        shapeRenderer.dispose()
    }

    override fun onSwipeLeft() {}
    override fun onSwipeRight() {}
    override fun onSwipeUp() {}

    override fun onTap() {
        game.screen = GameScreen(game)
    }
}
