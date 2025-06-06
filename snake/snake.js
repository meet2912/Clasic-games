
    const canvas = document.getElementById("game");
    const ctx = canvas.getContext("2d");
    const scale = 20;
    const rows = canvas.height / scale;
    const columns = canvas.width / scale;

    let snake; 
    let food;

    (function setup() {
      snake = new Snake();
      food = randomFood();
      window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        food.draw();
        snake.update();
        snake.draw();

        if (snake.eat(food)) {
          food = randomFood();
        }

        snake.checkCollision();
      }, 150);
    })();

    window.addEventListener("keydown", e => {
      const direction = e.key.replace("Arrow", "");
      snake.changeDirection(direction);
    }); 

    function Snake() {
      this.x = 0;
      this.y = 0;
      this.xSpeed = scale;
      this.ySpeed = 0;
      this.total = 0;
      this.tail = [];

      this.draw = function () {
        ctx.fillStyle = "#0f0";

        for (let i = 0; i < this.tail.length; i++) {
          ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        ctx.fillRect(this.x, this.y, scale, scale);
      };

      this.update = function () {
        for (let i = 0; i < this.tail.length - 1; i++) {
          this.tail[i] = this.tail[i + 1];
        }

        if (this.total >= 1) {
          this.tail[this.total - 1] = { x: this.x, y: this.y };
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) this.x = 0;
        if (this.y >= canvas.height) this.y = 0;
        if (this.x < 0) this.x = canvas.width - scale;
        if (this.y < 0) this.y = canvas.height - scale;
      };

      this.changeDirection = function (direction) {
        switch (direction) {
          case "Up":
            if (this.ySpeed === 0) {
              this.xSpeed = 0;
              this.ySpeed = -scale;
            }
            break;
          case "Down":
            if (this.ySpeed === 0) {
              this.xSpeed = 0;
              this.ySpeed = scale;
            }
            break;
          case "Left":
            if (this.xSpeed === 0) {
              this.xSpeed = -scale;
              this.ySpeed = 0;
            }
            break;
          case "Right":
            if (this.xSpeed === 0) {
              this.xSpeed = scale;
              this.ySpeed = 0;
            }
            break;
        }
      };

      this.eat = function (food) {
        if (this.x === food.x && this.y === food.y) {
          this.total++;
          return true;
        }
        return false;
      };

      this.checkCollision = function () {
        for (let i = 0; i < this.tail.length; i++) {
          if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
            alert("Game Over");
            this.total = 0;
            this.tail = [];
          }
        }
      };
    }

    function randomFood() {
      const x = Math.floor(Math.random() * columns) * scale;
      const y = Math.floor(Math.random() * rows) * scale;
      return {
        x,
        y,
        draw: function () {
          ctx.fillStyle = "red";
          ctx.fillRect(this.x, this.y, scale, scale);
        },
      };
    }