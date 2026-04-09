package com.keren.foodie.game

enum class FoodType(
    val displayName: String,
    val healthy: Boolean,
    val points: Int
) {
    // Healthy foods (+5 points)
    APPLE("Apple", true, 5),
    CARROT("Carrot", true, 5),
    BANANA("Banana", true, 5),
    BROCCOLI("Broccoli", true, 5),
    WATERMELON("Watermelon", true, 5),

    // Unhealthy foods (-3 points)
    DONUT("Donut", false, -3),
    CANDY("Candy", false, -3),
    SODA("Soda", false, -3),
    FRIES("Fries", false, -3);

    companion object {
        private val healthyFoods = entries.filter { it.healthy }
        private val unhealthyFoods = entries.filter { !it.healthy }

        fun randomFood(): FoodType {
            // 60% chance healthy, 40% chance unhealthy
            return if (Math.random() < 0.6) {
                healthyFoods.random()
            } else {
                unhealthyFoods.random()
            }
        }
    }
}
