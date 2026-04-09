package com.keren.foodie.game

import com.badlogic.gdx.math.MathUtils
import com.badlogic.gdx.math.Rectangle

class Player {
    var currentLane: Int = 1  // 0=left, 1=center, 2=right
    var x: Float = 0f
    var y: Float = 0f
    var targetX: Float = 0f
    var isJumping: Boolean = false
    var jumpOffset: Float = 0f
    val bounds: Rectangle = Rectangle()

    // Animation
    var runTimer: Float = 0f
    var currentFrame: Int = 0

    private var jumpVelocity: Float = 0f

    companion object {
        const val WIDTH = 64f
        const val HEIGHT = 64f
        const val MOVE_SPEED = 600f
        const val JUMP_VELOCITY = 400f
        const val GRAVITY = 800f
        const val JUMP_MAX_HEIGHT = 100f
    }

    fun init(laneXPositions: FloatArray, baseY: Float) {
        currentLane = 1
        x = laneXPositions[1] - WIDTH / 2
        targetX = x
        y = baseY
        isJumping = false
        jumpOffset = 0f
        jumpVelocity = 0f
        runTimer = 0f
    }

    fun moveLeft(laneXPositions: FloatArray) {
        if (currentLane > 0) {
            currentLane--
            targetX = laneXPositions[currentLane] - WIDTH / 2
        }
    }

    fun moveRight(laneXPositions: FloatArray) {
        if (currentLane < 2) {
            currentLane++
            targetX = laneXPositions[currentLane] - WIDTH / 2
        }
    }

    fun jump() {
        if (!isJumping) {
            isJumping = true
            jumpVelocity = JUMP_VELOCITY
        }
    }

    fun update(delta: Float) {
        // Smooth lane switching
        x = MathUtils.lerp(x, targetX, MOVE_SPEED * delta / 100f)
        if (Math.abs(x - targetX) < 1f) x = targetX

        // Jump physics
        if (isJumping) {
            jumpOffset += jumpVelocity * delta
            jumpVelocity -= GRAVITY * delta
            if (jumpOffset <= 0f) {
                jumpOffset = 0f
                isJumping = false
                jumpVelocity = 0f
            }
        }

        // Running animation timer
        runTimer += delta
        currentFrame = ((runTimer * 8).toInt() % 3)

        updateBounds()
    }

    private fun updateBounds() {
        bounds.set(x, y + jumpOffset, WIDTH, HEIGHT)
    }
}
