package com.keren.foodie.game

import com.badlogic.gdx.math.Rectangle

class FoodItem {
    var type: FoodType = FoodType.APPLE
    var lane: Int = 1
    var x: Float = 0f
    var y: Float = 0f
    var active: Boolean = false
    val bounds: Rectangle = Rectangle()

    companion object {
        const val SIZE = 48f
    }

    fun init(type: FoodType, lane: Int, laneX: Float, startY: Float) {
        this.type = type
        this.lane = lane
        this.x = laneX - SIZE / 2
        this.y = startY
        this.active = true
        updateBounds()
    }

    fun update(delta: Float, speed: Float) {
        y -= speed * delta
        updateBounds()
        if (y < -SIZE) {
            active = false
        }
    }

    private fun updateBounds() {
        bounds.set(x, y, SIZE, SIZE)
    }
}
