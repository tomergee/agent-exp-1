package com.keren.foodie.input

import com.badlogic.gdx.InputAdapter

interface SwipeListener {
    fun onSwipeLeft()
    fun onSwipeRight()
    fun onSwipeUp()
    fun onTap()
}

class SwipeDetector(private val listener: SwipeListener) : InputAdapter() {
    private var startX: Float = 0f
    private var startY: Float = 0f
    private var isTouching: Boolean = false

    companion object {
        const val SWIPE_THRESHOLD = 50f
    }

    override fun touchDown(screenX: Int, screenY: Int, pointer: Int, button: Int): Boolean {
        startX = screenX.toFloat()
        startY = screenY.toFloat()
        isTouching = true
        return true
    }

    override fun touchUp(screenX: Int, screenY: Int, pointer: Int, button: Int): Boolean {
        if (!isTouching) return false
        isTouching = false

        val deltaX = screenX.toFloat() - startX
        val deltaY = screenY.toFloat() - startY

        val absDeltaX = Math.abs(deltaX)
        val absDeltaY = Math.abs(deltaY)

        if (absDeltaX < SWIPE_THRESHOLD && absDeltaY < SWIPE_THRESHOLD) {
            listener.onTap()
            return true
        }

        if (absDeltaX > absDeltaY) {
            // Horizontal swipe
            if (absDeltaX > SWIPE_THRESHOLD) {
                if (deltaX < 0) listener.onSwipeLeft()
                else listener.onSwipeRight()
            }
        } else {
            // Vertical swipe (screen Y is inverted)
            if (absDeltaY > SWIPE_THRESHOLD && deltaY < 0) {
                listener.onSwipeUp()
            }
        }
        return true
    }
}
