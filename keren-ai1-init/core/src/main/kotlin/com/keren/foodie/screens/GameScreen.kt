package com.keren.foodie.screens

import com.badlogic.gdx.Gdx
import com.badlogic.gdx.Input
import com.badlogic.gdx.ScreenAdapter
import com.badlogic.gdx.graphics.Color
import com.badlogic.gdx.graphics.GL20
import com.badlogic.gdx.graphics.OrthographicCamera
import com.badlogic.gdx.graphics.glutils.ShapeRenderer
import com.badlogic.gdx.utils.viewport.FitViewport
import com.keren.foodie.FoodieGame
import com.keren.foodie.game.FoodItem
import com.keren.foodie.game.GameWorld
import com.keren.foodie.game.Player
import com.keren.foodie.input.SwipeDetector
import com.keren.foodie.input.SwipeListener

class GameScreen(private val game: FoodieGame) : ScreenAdapter(), SwipeListener {
    private val camera = OrthographicCamera()
    private val viewport = FitViewport(480f, 800f, camera)
    private val shapeRenderer = ShapeRenderer()
    private val world = GameWorld(480f, 800f)

    override fun show() {
        Gdx.input.inputProcessor = SwipeDetector(this)
        camera.position.set(240f, 400f, 0f)
        world.reset()
    }

    override fun render(delta: Float) {
        // Keyboard controls for desktop testing
        handleKeyboard()

        world.update(delta)

        // Check game end conditions
        if (world.isGameOver) {
            game.screen = GameOverScreen(game, world.score)
            return
        }
        if (world.isWin) {
            game.screen = WinScreen(game)
            return
        }

        // Clear with green (park)
        Gdx.gl.glClearColor(0.4f, 0.75f, 0.3f, 1f)
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT)

        camera.update()

        // Draw scrolling background
        game.batch.projectionMatrix = camera.combined
        game.batch.begin()

        // Draw background texture (scrolling)
        val bgOffset = world.backgroundOffset % 800f
        game.batch.draw(game.assets.backgroundTexture, 0f, -bgOffset, 480f, 800f)
        game.batch.draw(game.assets.backgroundTexture, 0f, -bgOffset + 800f, 480f, 800f)

        // Draw food items
        for (food in world.foodItems) {
            val tex = game.assets.foodTextures[food.type] ?: continue
            game.batch.draw(tex, food.x, food.y, FoodItem.SIZE, FoodItem.SIZE)
        }

        // Draw player
        val player = world.player
        val playerTex = game.assets.playerTextures[player.currentFrame]
        game.batch.draw(playerTex, player.x, player.y + player.jumpOffset,
            Player.WIDTH, Player.HEIGHT)

        // Draw HUD
        drawHUD()

        // Draw score popups
        for (popup in world.scorePopups) {
            val alpha = 1f - (popup.timer / popup.duration)
            if (popup.points > 0) {
                game.font.setColor(Color(0f, 0.8f, 0f, alpha))
                game.font.draw(game.batch, "+${popup.points}", popup.x - 15f, popup.y)
            } else {
                game.font.setColor(Color(1f, 0f, 0f, alpha))
                game.font.draw(game.batch, "${popup.points}", popup.x - 15f, popup.y)
            }
        }

        game.batch.end()

        // Flash effect overlay
        if (world.flashTimer > 0) {
            Gdx.gl.glEnable(GL20.GL_BLEND)
            shapeRenderer.projectionMatrix = camera.combined
            shapeRenderer.begin(ShapeRenderer.ShapeType.Filled)
            val flashAlpha = world.flashTimer / 0.15f * 0.3f
            if (world.flashGreen) {
                shapeRenderer.setColor(0f, 1f, 0f, flashAlpha)
            } else {
                shapeRenderer.setColor(1f, 0f, 0f, flashAlpha)
            }
            shapeRenderer.rect(0f, 0f, 480f, 800f)
            shapeRenderer.end()
            Gdx.gl.glDisable(GL20.GL_BLEND)
        }
    }

    private fun drawHUD() {
        // Score bar background
        game.font.setColor(Color.WHITE)

        // Hearts/life display
        val heartTex = game.assets.heartTexture
        game.batch.draw(heartTex, 10f, 760f, 24f, 24f)
        game.font.draw(game.batch, "${world.score}", 40f, 782f)

        // Score progress bar
        game.font.setColor(Color(0.3f, 0.2f, 0.2f, 1f))
        game.font.data.setScale(1.5f)
        game.font.draw(game.batch, "Score: ${world.score}/100", 160f, 782f)
        game.font.data.setScale(2f)
    }

    private fun handleKeyboard() {
        if (Gdx.input.isKeyJustPressed(Input.Keys.LEFT)) onSwipeLeft()
        if (Gdx.input.isKeyJustPressed(Input.Keys.RIGHT)) onSwipeRight()
        if (Gdx.input.isKeyJustPressed(Input.Keys.UP) || Gdx.input.isKeyJustPressed(Input.Keys.SPACE)) onSwipeUp()
    }

    override fun resize(width: Int, height: Int) {
        viewport.update(width, height)
    }

    override fun dispose() {
        shapeRenderer.dispose()
    }

    override fun onSwipeLeft() {
        world.player.moveLeft(world.laneXPositions)
    }

    override fun onSwipeRight() {
        world.player.moveRight(world.laneXPositions)
    }

    override fun onSwipeUp() {
        world.player.jump()
    }

    override fun onTap() {}
}
