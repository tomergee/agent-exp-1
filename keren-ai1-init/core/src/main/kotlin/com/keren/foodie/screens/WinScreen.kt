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

class WinScreen(private val game: FoodieGame) : ScreenAdapter(), SwipeListener {
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

        // Golden/celebratory background
        Gdx.gl.glClearColor(1f, 0.85f, 0.4f, 1f)
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT)

        camera.update()

        // Celebratory circles
        shapeRenderer.projectionMatrix = camera.combined
        shapeRenderer.begin(ShapeRenderer.ShapeType.Filled)
        for (i in 0 until 8) {
            val angle = timer * 2f + i * 0.785f
            val cx = 240f + Math.cos(angle.toDouble()).toFloat() * 120f
            val cy = 450f + Math.sin(angle.toDouble()).toFloat() * 120f
            shapeRenderer.setColor(1f, 0.6f + i * 0.03f, 0.2f, 0.6f)
            shapeRenderer.circle(cx, cy, 20f)
        }
        shapeRenderer.end()

        game.batch.projectionMatrix = camera.combined
        game.batch.begin()

        // Happy Foodie (animated)
        val frame = ((timer * 6).toInt() % 3)
        game.batch.draw(game.assets.playerTextures[frame], 208f, 400f, 64f, 64f)

        // Victory text
        game.titleFont.setColor(Color(0.8f, 0.2f, 0f, 1f))
        game.titleFont.draw(game.batch, "YOU", 155f, 660f)
        game.titleFont.draw(game.batch, "WIN!", 145f, 590f)

        // Score
        game.font.setColor(Color(0.6f, 0.3f, 0f, 1f))
        game.font.draw(game.batch, "Score: 100/100", 130f, 350f)
        game.font.draw(game.batch, "Foodie is full!", 120f, 310f)

        // Tap to play again
        val alpha = (Math.sin(timer * 3.0) * 0.3 + 0.7).toFloat()
        game.font.setColor(Color(0.6f, 0.2f, 0f, alpha))
        game.font.draw(game.batch, "TAP TO PLAY AGAIN", 80f, 200f)

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
        game.screen = MenuScreen(game)
    }
}
