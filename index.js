const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = 0.5
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 30
        this.height = 30
    }
    draw() {
        c.fillStyle = 'green'
        c.fillRect(this.position.x,this.position.y, this.width, this.height)
    }
    update() {
        this.draw() 
        if (this.position.x + this.width + this.velocity.x <= this.width) {
            this.position.x = 0
            this.velocity.x = 0
        } else if (this.position.x + this.width + this.velocity.x >= canvas.width) {
            this.position.x = canvas.width - this.width
            this.velocity.x = 0
        }

        if (this.position.y + this.height + this.velocity.y <= this.width) {
            this.position.y = 0
            this.velocity.y = 0
        }
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else
            this.velocity.y = 0
    }
}

const player = new Player
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()

    if (keys.right.pressed) {
        player.velocity.x = 5
    } else if (keys.left.pressed) {
        player.velocity.x = -5
    } else {
        player.velocity.x = 0
    }
}

animate()

window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            keys.right.pressed = true
            break
        case 87:
            console.log('up')
            player.velocity.y -= 5
            break
        
    }
})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
        case 83:
            console.log('down')
            break
        case 68:
            console.log('right')
            keys.right.pressed = false
            break
        case 87:
            console.log('up')
            player.velocity.y -= 5
            break
        
    }
})