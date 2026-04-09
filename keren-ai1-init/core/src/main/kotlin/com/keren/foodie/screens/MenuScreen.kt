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

class MenuScreen(private val game: FoodieGame) : ScreenAdapter(), SwipeListener {
    private val camera = OrthographicCamera()
    private val viewport = FitViewport(480f, 800f, camera)
    private val shapeRenderer = ShapeRenderer()
    private var pulseTimer = 0f

    override fun show() {
        Gdx.input.inputProcessor = SwipeDetector(this)
        camera.position.set(240f, 400f, 0f)
    }

    override fun render(delta: Float) {
        pulseTimer += delta

        Gdx.gl.glClearColor(1f, 0.75f, 0.8f, 1f) // Pink
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT)

        camera.update()

        // Draw background elements
        shapeRenderer.projectionMatrix = camera.combined
        shapeRenderer.begin(ShapeRenderer.ShapeType.Filled)

        // Decorative circles
        shapeRenderer.setColor(1f, 0.65f, 0.7f, 1f)
        shapeRenderer.circle(80f, 650f, 40f)
        shapeRenderer.circle(400f, 700f, 30f)
        shapeRenderer.circle(60f, 200f, 25f)
        shapeRenderer.circle(420f, 250f, 35f)

        shapeRenderer.end()

        // Draw character preview
        game.batch.projectionMatrix = camera.combined
        game.batch.begin()

        // Draw Foodie character in center
        game.batch.draw(game.assets.playerTextures[((pulseTimer * 4).toInt() % 3)],
            208f, 350f, 64f, 64f)

        // Title
        game.titleFont.setColor(Color(0.8f, 0.1f, 0.3f, 1f))
        game.titleFont.draw(game.batch, "FOODIE", 120f, 600f)

        // Subtitle
        game.font.setColor(Color(0.5f, 0.2f, 0.3f, 1f))
        game.font.draw(game.batch, "Collect healthy food!", 100f, 300f)

        // Pulsing "Tap to Play"
        val alpha = (Math.sin(pulseTimer * 3.0) * 0.3 + 0.7).toFloat()
        game.font.setColor(Color(0.8f, 0.1f, 0.3f, alpha))
        game.font.draw(game.batch, "TAP TO PLAY", 130f, 200f)

        // Instructions
        game.font.setColor(Color(0.4f, 0.2f, 0.2f, 0.7f))
        game.font.data.setScale(1.2f)
        game.font.draw(game.batch, "Swipe left/right: move", 90f, 130f)
        game.font.draw(game.batch, "Swipe up: jump", 130f, 100f)
        game.font.data.setScale(2f)

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
