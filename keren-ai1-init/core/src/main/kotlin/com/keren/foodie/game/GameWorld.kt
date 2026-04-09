package com.keren.foodie.game

import com.badlogic.gdx.math.MathUtils

class GameWorld(private val worldWidth: Float, private val worldHeight: Float) {
    val player = Player()
    val foodItems = mutableListOf<FoodItem>()
    val laneXPositions = FloatArray(3)

    var score: Int = 5
    var gameSpeed: Float = 250f
    var isGameOver: Boolean = false
    var isWin: Boolean = false
    var backgroundOffset: Float = 0f

    // Floating score popups
    val scorePopups = mutableListOf<ScorePopup>()

    private var spawnTimer: Float = 0f
    private var spawnInterval: Float = 1.2f
    private val foodPool = mutableListOf<FoodItem>()

    // Screen flash effect
    var flashTimer: Float = 0f
    var flashGreen: Boolean = false

    companion object {
        const val LANE_WIDTH_RATIO = 0.6f  // Path takes 60% of screen width
        const val PLAYER_Y_RATIO = 0.15f
        const val WIN_SCORE = 100
        const val START_SCORE = 5
    }

    init {
        // Calculate lane positions (centered on screen)
        val pathWidth = worldWidth * LANE_WIDTH_RATIO
        val pathStart = (worldWidth - pathWidth) / 2
        val laneSpacing = pathWidth / 3f
        for (i in 0..2) {
            laneXPositions[i] = pathStart + laneSpacing * i + laneSpacing / 2
        }

        // Pre-fill food pool
        for (i in 0 until 20) {
            foodPool.add(FoodItem())
        }

        player.init(laneXPositions, worldHeight * PLAYER_Y_RATIO)
    }

    fun reset() {
        score = START_SCORE
        gameSpeed = 250f
        isGameOver = false
        isWin = false
        spawnTimer = 0f
        backgroundOffset = 0f
        flashTimer = 0f
        foodItems.clear()
        scorePopups.clear()
        player.init(laneXPositions, worldHeight * PLAYER_Y_RATIO)
    }

    fun update(delta: Float) {
        if (isGameOver || isWin) return

        player.update(delta)

        // Scroll background
        backgroundOffset += gameSpeed * delta * 0.5f
        if (backgroundOffset > worldHeight) backgroundOffset -= worldHeight

        // Spawn food
        spawnTimer += delta
        if (spawnTimer >= spawnInterval) {
            spawnTimer = 0f
            spawnInterval = MathUtils.random(0.8f, 1.5f)
            spawnFood()
        }

        // Update food items
        val iterator = foodItems.iterator()
        while (iterator.hasNext()) {
            val food = iterator.next()
            food.update(delta, gameSpeed)
            if (!food.active) {
                foodPool.add(food)
                iterator.remove()
                continue
            }
            // Collision check
            if (food.bounds.overlaps(player.bounds)) {
                score += food.type.points
                // Flash effect
                flashTimer = 0.15f
                flashGreen = food.type.healthy

                // Score popup
                scorePopups.add(ScorePopup(
                    food.x + FoodItem.SIZE / 2,
                    food.y + FoodItem.SIZE,
                    food.type.points
                ))

                food.active = false
                foodPool.add(food)
                iterator.remove()

                // Check win/lose
                if (score >= WIN_SCORE) {
                    score = WIN_SCORE
                    isWin = true
                } else if (score <= 0) {
                    score = 0
                    isGameOver = true
                }
            }
        }

        // Update popups
        val popupIter = scorePopups.iterator()
        while (popupIter.hasNext()) {
            val popup = popupIter.next()
            popup.update(delta)
            if (!popup.active) popupIter.remove()
        }

        // Flash timer
        if (flashTimer > 0) flashTimer -= delta

        // Gradually increase speed
        gameSpeed = 250f + (score.toFloat() / WIN_SCORE) * 100f
    }

    private fun spawnFood() {
        val food = if (foodPool.isNotEmpty()) foodPool.removeAt(foodPool.size - 1) else FoodItem()
        val lane = MathUtils.random(0, 2)
        food.init(FoodType.randomFood(), lane, laneXPositions[lane], worldHeight + 50f)
        foodItems.add(food)
    }
}

class ScorePopup(var x: Float, var y: Float, val points: Int) {
    var timer: Float = 0f
    var active: Boolean = true
    val duration: Float = 1f

    fun update(delta: Float) {
        timer += delta
        y += 60f * delta
        if (timer >= duration) active = false
    }
}
