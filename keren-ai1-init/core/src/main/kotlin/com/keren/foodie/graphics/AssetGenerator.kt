package com.keren.foodie.graphics

import com.badlogic.gdx.graphics.Color
import com.badlogic.gdx.graphics.Pixmap
import com.badlogic.gdx.graphics.Texture
import com.keren.foodie.game.FoodType

class AssetGenerator {
    lateinit var playerTextures: Array<Texture>
    lateinit var foodTextures: Map<FoodType, Texture>
    lateinit var backgroundTexture: Texture
    lateinit var heartTexture: Texture

    fun generate() {
        playerTextures = arrayOf(
            createPlayerTexture(0),
            createPlayerTexture(1),
            createPlayerTexture(2)
        )
        foodTextures = FoodType.entries.associateWith { createFoodTexture(it) }
        backgroundTexture = createBackgroundTexture()
        heartTexture = createHeartTexture()
    }

    private fun createPlayerTexture(frame: Int): Texture {
        val size = 64
        val pixmap = Pixmap(size, size, Pixmap.Format.RGBA8888)

        // Body - cute pink dress
        pixmap.setColor(Color(1f, 0.6f, 0.7f, 1f)) // Pink
        pixmap.fillRectangle(16, 28, 32, 30)

        // Legs (animated)
        pixmap.setColor(Color(1f, 0.85f, 0.75f, 1f)) // Skin
        when (frame) {
            0 -> {
                pixmap.fillRectangle(20, 56, 8, 8)
                pixmap.fillRectangle(36, 56, 8, 8)
            }
            1 -> {
                pixmap.fillRectangle(18, 56, 8, 8)
                pixmap.fillRectangle(38, 56, 8, 8)
            }
            2 -> {
                pixmap.fillRectangle(22, 56, 8, 8)
                pixmap.fillRectangle(34, 56, 8, 8)
            }
        }

        // Head - skin color
        pixmap.setColor(Color(1f, 0.85f, 0.75f, 1f))
        pixmap.fillCircle(32, 20, 14)

        // Hair - dark brown anime hair
        pixmap.setColor(Color(0.3f, 0.15f, 0.1f, 1f))
        pixmap.fillCircle(32, 16, 14)
        pixmap.fillRectangle(18, 14, 28, 10)
        // Side hair strands
        pixmap.fillRectangle(16, 14, 6, 22)
        pixmap.fillRectangle(42, 14, 6, 22)

        // Face
        pixmap.setColor(Color(1f, 0.85f, 0.75f, 1f))
        pixmap.fillCircle(32, 22, 10)

        // Eyes - big anime eyes
        pixmap.setColor(Color(0.2f, 0.2f, 0.6f, 1f)) // Dark blue
        pixmap.fillCircle(27, 20, 3)
        pixmap.fillCircle(37, 20, 3)
        // Eye highlights
        pixmap.setColor(Color.WHITE)
        pixmap.fillCircle(28, 19, 1)
        pixmap.fillCircle(38, 19, 1)

        // Smile
        pixmap.setColor(Color(0.9f, 0.3f, 0.3f, 1f))
        pixmap.fillRectangle(29, 26, 6, 2)

        // Blush
        pixmap.setColor(Color(1f, 0.5f, 0.5f, 0.5f))
        pixmap.fillCircle(23, 24, 3)
        pixmap.fillCircle(41, 24, 3)

        // Chef hat - white with tall shape
        pixmap.setColor(Color.WHITE)
        pixmap.fillRectangle(20, 0, 24, 6)   // Hat brim
        pixmap.fillRectangle(24, 0, 16, 12)   // Hat top (tall)
        // Hat band
        pixmap.setColor(Color(0.8f, 0.8f, 0.8f, 1f))
        pixmap.fillRectangle(20, 5, 24, 2)

        // Arms
        pixmap.setColor(Color(1f, 0.85f, 0.75f, 1f))
        pixmap.fillRectangle(10, 32, 8, 6)
        pixmap.fillRectangle(46, 32, 8, 6)

        val texture = Texture(pixmap)
        pixmap.dispose()
        return texture
    }

    private fun createFoodTexture(type: FoodType): Texture {
        val size = 48
        val pixmap = Pixmap(size, size, Pixmap.Format.RGBA8888)
        val cx = size / 2
        val cy = size / 2

        when (type) {
            FoodType.APPLE -> {
                pixmap.setColor(Color(0.9f, 0.1f, 0.1f, 1f)) // Red
                pixmap.fillCircle(cx, cy + 2, 18)
                pixmap.setColor(Color(0.3f, 0.6f, 0.1f, 1f)) // Green stem
                pixmap.fillRectangle(cx - 2, 2, 4, 10)
                // Leaf
                pixmap.fillCircle(cx + 6, 6, 4)
                // Highlight
                pixmap.setColor(Color(1f, 0.4f, 0.4f, 0.6f))
                pixmap.fillCircle(cx - 6, cy - 4, 5)
            }
            FoodType.CARROT -> {
                pixmap.setColor(Color(1f, 0.5f, 0f, 1f)) // Orange
                // Carrot body (triangle-ish)
                for (i in 0 until 30) {
                    val w = (30 - i) * 14 / 30
                    pixmap.fillRectangle(cx - w, 8 + i, w * 2, 1)
                }
                // Green top
                pixmap.setColor(Color(0.2f, 0.7f, 0.2f, 1f))
                pixmap.fillRectangle(cx - 8, 2, 16, 10)
            }
            FoodType.BANANA -> {
                pixmap.setColor(Color(1f, 0.9f, 0.2f, 1f)) // Yellow
                pixmap.fillCircle(cx - 4, cy, 14)
                pixmap.setColor(Color(0f, 0f, 0f, 0f)) // Clear inside curve
                pixmap.fillCircle(cx + 8, cy, 12)
                // Fill it back as banana shape
                pixmap.setColor(Color(1f, 0.9f, 0.2f, 1f))
                pixmap.fillCircle(cx - 2, cy, 10)
                // Stem
                pixmap.setColor(Color(0.6f, 0.5f, 0.1f, 1f))
                pixmap.fillRectangle(cx + 8, 8, 4, 6)
            }
            FoodType.BROCCOLI -> {
                // Green florets
                pixmap.setColor(Color(0.1f, 0.6f, 0.1f, 1f))
                pixmap.fillCircle(cx, 14, 10)
                pixmap.fillCircle(cx - 8, 18, 8)
                pixmap.fillCircle(cx + 8, 18, 8)
                // Stem
                pixmap.setColor(Color(0.3f, 0.7f, 0.3f, 1f))
                pixmap.fillRectangle(cx - 4, 22, 8, 18)
            }
            FoodType.WATERMELON -> {
                // Green rind
                pixmap.setColor(Color(0.2f, 0.7f, 0.2f, 1f))
                pixmap.fillCircle(cx, cy + 4, 18)
                // Red inside
                pixmap.setColor(Color(0.9f, 0.2f, 0.2f, 1f))
                pixmap.fillCircle(cx, cy + 4, 14)
                // Seeds
                pixmap.setColor(Color(0.1f, 0.1f, 0.1f, 1f))
                pixmap.fillCircle(cx - 5, cy + 2, 2)
                pixmap.fillCircle(cx + 5, cy + 2, 2)
                pixmap.fillCircle(cx, cy + 8, 2)
            }
            FoodType.DONUT -> {
                // Outer ring - brown
                pixmap.setColor(Color(0.7f, 0.4f, 0.2f, 1f))
                pixmap.fillCircle(cx, cy, 18)
                // Hole
                pixmap.setColor(Color(0f, 0f, 0f, 0f))
                pixmap.fillCircle(cx, cy, 7)
                // Pink frosting on top
                pixmap.setColor(Color(1f, 0.6f, 0.7f, 1f))
                pixmap.fillCircle(cx, cy - 2, 16)
                pixmap.setColor(Color(0f, 0f, 0f, 0f))
                pixmap.fillCircle(cx, cy - 2, 6)
                // Sprinkles
                pixmap.setColor(Color.YELLOW)
                pixmap.fillRectangle(cx - 8, cy - 8, 3, 2)
                pixmap.setColor(Color.CYAN)
                pixmap.fillRectangle(cx + 4, cy - 6, 3, 2)
                pixmap.setColor(Color.RED)
                pixmap.fillRectangle(cx - 2, cy - 12, 3, 2)
            }
            FoodType.CANDY -> {
                // Wrapper
                pixmap.setColor(Color(0.9f, 0.1f, 0.1f, 1f))
                pixmap.fillCircle(cx, cy, 12)
                // Wrapper ends
                pixmap.setColor(Color(0.9f, 0.3f, 0.3f, 1f))
                pixmap.fillRectangle(2, cy - 4, 12, 8)
                pixmap.fillRectangle(size - 14, cy - 4, 12, 8)
                // Twist lines
                pixmap.setColor(Color(0.7f, 0.1f, 0.1f, 1f))
                pixmap.fillRectangle(4, cy - 1, 10, 2)
                pixmap.fillRectangle(size - 14, cy - 1, 10, 2)
                // Stripe on candy
                pixmap.setColor(Color.WHITE)
                pixmap.fillRectangle(cx - 2, cy - 10, 4, 20)
            }
            FoodType.SODA -> {
                // Can body
                pixmap.setColor(Color(0.4f, 0.1f, 0.6f, 1f)) // Purple
                pixmap.fillRectangle(12, 8, 24, 36)
                // Rounded top/bottom
                pixmap.fillCircle(cx, 10, 12)
                pixmap.fillCircle(cx, 42, 12)
                // Silver top
                pixmap.setColor(Color(0.7f, 0.7f, 0.7f, 1f))
                pixmap.fillRectangle(14, 4, 20, 6)
                // Tab
                pixmap.setColor(Color(0.5f, 0.5f, 0.5f, 1f))
                pixmap.fillRectangle(cx - 3, 2, 6, 4)
                // Label
                pixmap.setColor(Color.WHITE)
                pixmap.fillRectangle(16, 20, 16, 10)
            }
            FoodType.FRIES -> {
                // Red container
                pixmap.setColor(Color(0.8f, 0.1f, 0.1f, 1f))
                pixmap.fillRectangle(10, 22, 28, 22)
                // Fries sticking out
                pixmap.setColor(Color(1f, 0.85f, 0.3f, 1f))
                pixmap.fillRectangle(14, 6, 4, 20)
                pixmap.fillRectangle(20, 4, 4, 22)
                pixmap.fillRectangle(26, 8, 4, 18)
                pixmap.fillRectangle(32, 6, 4, 20)
            }
        }

        val texture = Texture(pixmap)
        pixmap.dispose()
        return texture
    }

    private fun createBackgroundTexture(): Texture {
        val w = 480
        val h = 800
        val pixmap = Pixmap(w, h, Pixmap.Format.RGBA8888)

        // Green park background
        pixmap.setColor(Color(0.4f, 0.75f, 0.3f, 1f))
        pixmap.fill()

        // Darker grass patches
        pixmap.setColor(Color(0.35f, 0.65f, 0.25f, 1f))
        for (i in 0 until 20) {
            val px = (Math.random() * w).toInt()
            val py = (Math.random() * h).toInt()
            pixmap.fillCircle(px, py, (Math.random() * 20 + 10).toInt())
        }

        // Pink path in the center
        val pathWidth = (w * 0.6f).toInt()
        val pathStart = (w - pathWidth) / 2
        pixmap.setColor(Color(1f, 0.75f, 0.8f, 1f)) // Pink path
        pixmap.fillRectangle(pathStart, 0, pathWidth, h)

        // Path edges - slightly darker pink
        pixmap.setColor(Color(0.9f, 0.65f, 0.7f, 1f))
        pixmap.fillRectangle(pathStart, 0, 4, h)
        pixmap.fillRectangle(pathStart + pathWidth - 4, 0, 4, h)

        // Lane dividers - dashed lines
        pixmap.setColor(Color(0.85f, 0.6f, 0.65f, 0.5f))
        val laneWidth = pathWidth / 3
        for (lane in 1..2) {
            val lx = pathStart + laneWidth * lane
            var dy = 0
            while (dy < h) {
                pixmap.fillRectangle(lx - 1, dy, 2, 20)
                dy += 40
            }
        }

        // Simple trees on the sides
        for (treeY in listOf(100, 300, 500, 700)) {
            drawTree(pixmap, pathStart / 2, treeY)
            drawTree(pixmap, pathStart + pathWidth + (w - pathStart - pathWidth) / 2, treeY)
        }

        val texture = Texture(pixmap)
        pixmap.dispose()
        return texture
    }

    private fun drawTree(pixmap: Pixmap, x: Int, y: Int) {
        // Trunk
        pixmap.setColor(Color(0.45f, 0.3f, 0.15f, 1f))
        pixmap.fillRectangle(x - 4, y, 8, 20)
        // Foliage
        pixmap.setColor(Color(0.2f, 0.55f, 0.15f, 1f))
        pixmap.fillCircle(x, y - 5, 18)
        pixmap.setColor(Color(0.25f, 0.6f, 0.2f, 1f))
        pixmap.fillCircle(x - 5, y, 12)
        pixmap.fillCircle(x + 5, y, 12)
    }

    private fun createHeartTexture(): Texture {
        val size = 24
        val pixmap = Pixmap(size, size, Pixmap.Format.RGBA8888)
        pixmap.setColor(Color(1f, 0.2f, 0.3f, 1f))
        // Simple heart shape
        pixmap.fillCircle(size / 3, size / 3, size / 4)
        pixmap.fillCircle(2 * size / 3, size / 3, size / 4)
        // Bottom triangle
        for (i in 0 until size / 2) {
            val w = size / 2 - i
            pixmap.fillRectangle(size / 2 - w, size / 3 + i, w * 2, 1)
        }
        val texture = Texture(pixmap)
        pixmap.dispose()
        return texture
    }

    fun dispose() {
        playerTextures.forEach { it.dispose() }
        foodTextures.values.forEach { it.dispose() }
        backgroundTexture.dispose()
        heartTexture.dispose()
    }
}
