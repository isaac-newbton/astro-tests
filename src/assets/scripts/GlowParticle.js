const PI2 = Math.PI * 2

export class GlowParticle {
    constructor(x, y, radius, rgb, lifetime = null) {
        this.x = x
        this.y = y
        this.radius = radius
        this.rgb = rgb
        this.vx = Math.random() * 4
        this.vy = Math.random() * 4
        this.sinValue = Math.random()
        this.lifetime = lifetime
        this.maxLifetime = lifetime
    }

    animate(ctx, stageWidth, stageHeight, frameTime = 0) {
        this.sinValue += 0.01
        this.radius += Math.sin(this.sinValue)
        this.x += this.vx
        this.y += this.vy

        if(this.x < 0) {
            this.vx *= -1
            this.x += 10
        } else if (this.x > stageWidth) {
            this.vx *= -1
            this.x -= 25
        }

        if(this.y < 0) {
            this.vy *= -1
            this.y += 10
        } else if (this.y > stageHeight) {
            this.vy *= -1
            this.y -= 25
        }

        ctx.beginPath()

        const g = ctx.createRadialGradient(
            this.x,
            this.y,
            this.radius * 0.01,
            this.x,
            this.y,
            this.radius
        )

        let alphaMax = ((null===this.lifetime) ? 0.833 : 0.333 * ((this.lifetime - frameTime) / this.maxLifetime))
        if(0 > alphaMax) {
            alphaMax = 0;
        }

        g.addColorStop(0, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, ${alphaMax.toString()})`)
        g.addColorStop(1, `rgba(${this.rgb.r}, ${this.rgb.g}, ${this.rgb.b}, 0.0)`)
        ctx.fillStyle = g
        ctx.arc(this.x, this.y, this.radius, 0, PI2, false)
        ctx.fill()

        if(null!==this.lifetime){
            this.lifetime -= frameTime
        }
    }
}