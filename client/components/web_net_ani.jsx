import React from 'react';

class CanvasComponent extends React.Component {
    componentDidMount() {
         //////////////////////////////////
  // Js WebNetwork Animation     //
  //////////////////////////////////
  {
    var canvas = document.querySelector("canvas");
    canvas.height = window.outerHeight;
    var ctx = canvas.getContext("2d");
    var TAU = 2 * Math.PI;
    var strict = false;
    var freemode = true;
    var limit_line = 5;
    var speed_line = 15;
    var dist_mouse_show = 250;
    var dist_near_border = 230;
    var dist_near_mouse = 100;
    var dist_connect_balls = 120;
    var speed_ball_move = 0.5;

    window.requestAnimFrame = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();

    times = [];
    function loop() {
      var startTime = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      update();
      draw();
      times.push(performance.now() - startTime);
      if (times.length > 500) {
        times.shift()
      }

      requestAnimFrame(loop);
    }

    function Ball(startX, startY, startVelX, startVelY) {
      this.x = startX || Math.random() * canvas.width;
      this.y = startY || Math.random() * canvas.height;
      this.disable = false;
      this.vel = {
        x: startVelX || Math.random() - speed_ball_move,
        y: startVelY || Math.random() * - speed_ball_move
      };
      this.update = function (canvas) {
        if (this.x > canvas.width + 50 || this.x < -50) {
          this.vel.x = -this.vel.x;
        }
        if (this.y > canvas.height + 50 || this.y < -50) {
          this.vel.y = -this.vel.y;
        }
        this.x += this.vel.x;
        this.y += this.vel.y;
      };

      this.draw = function (ctx, can) {
        ctx.beginPath();
        if (distMouse(this) > dist_near_border) {
          ctx.strokeStyle = "rgb(255, 153, 0)";
          ctx.globalAlpha = .2;
        }
        else if (distMouse(this) > dist_near_mouse) {
          ctx.fillStyle = "#ffffff";
          ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = '#448fda';
          ctx.globalAlpha = .6;
        }
        ctx.arc((0.5 + this.x) | 0, (0.5 + this.y) | 0, 2, 0, TAU, false);
        ctx.fill();
      }

      this.draw2 = function (ctx, can, speed) {
        ctx.beginPath();
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = .6;
        ctx.arc((0.5 + this.x) | 0, (0.5 + this.y) | 0, 2 + (speed/speed_line)*2, 0, TAU, false);
        ctx.fill();
      }
    }

    var balls = [];
    var fralin = {};

    for (var i = 0; i < canvas.width * canvas.height / (73 * 73); i++) {
      balls.push(new Ball(Math.random() * canvas.width, Math.random() * canvas.height));

    }


    var lastTime = Date.now();
    function update() {
      var diff = Date.now() - lastTime;
      for (var frame = 0; frame * 16.6667 < diff; frame++) {
        for (var index = 0; index < balls.length; index++) {
          balls[index].update(canvas);

        }

      }

      lastTime = Date.now();
    }

    var mouseX = -1e9, mouseY = -1e9;
    document.addEventListener('mousemove', function (event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    function distMouse(ball) {
      return Math.hypot(ball.x - mouseX, ball.y - mouseY);
    }


    function draw() {
      for (var index = 0; index < balls.length; index++) {
        var ball = balls[index];
        if (!ball.disable) {
          var limit = 0;
          if (distMouse(ball) < dist_mouse_show) {
            ball.draw(ctx, canvas);
            ctx.beginPath();
            for (var index2 = balls.length - 1; index2 > index; index2 += -1) {
              if (typeof fralin[index + "-" + index2] == 'undefined') fralin[index + "-" + index2] = 1;
              var ball2 = balls[index2];
              if (!ball2.disable) {
                var dist = Math.hypot(ball.x - ball2.x, ball.y - ball2.y);
                if (dist < dist_connect_balls + 30) {
                  limit++;
                  if (limit == limit_line && strict) ball.disable = true;
                  if (dist < dist_connect_balls) {
                    if (distMouse(ball) > dist_near_border) {
                      ctx.strokeStyle = "rgb(255, 153, 0)";
                      ctx.globalAlpha = .2;
                    }
                    else if (distMouse(ball) > dist_near_mouse) {
                      ctx.strokeStyle = "#8f9aa3";
                      ctx.globalAlpha = .4;
                    } else {
                      ctx.strokeStyle = '#448fda';
                      ctx.globalAlpha = .6;
                    }
                    if (fralin[index + "-" + index2] < speed_line) {
                      fralin[index + "-" + index2]++;
                    }
                    if (limit < limit_line || freemode) {
                      ctx.lineWidth = "3px";
                      ctx.moveTo((0.5 + ball.x) | 0, (0.5 + ball.y) | 0);
                      var dx = ball2.x - ball.x;
                      var dy = ball2.y - ball.y;
                      ctx.lineTo((0.5 + ball.x) + dx * fralin[index + "-" + index2] / speed_line | 0, (0.5 + ball.y) + dy * fralin[index + "-" + index2] / speed_line | 0);
                      ctx.stroke();
                      // ball2.draw2(ctx, canvas,fralin[index + "-" + index2]);
                      //if (fralin[index + "-" + index2] == speed_line) ball2.draw2(ctx, canvas);
                    }
                  } else {
                    if (fralin[index + "-" + index2] > 0) fralin[index + "-" + index2]--;
                    limit--;
                    ball.disable = false;
                    if (limit < limit_line || freemode) {
                      ctx.lineWidth = "3px";
                      ctx.moveTo((0.5 + ball2.x) | 0, (0.5 + ball2.y) | 0);
                      var dx = ball.x - ball2.x;
                      var dy = ball.y - ball2.y;
                      ctx.lineTo((0.5 + ball2.x) + dx * fralin[index + "-" + index2] / speed_line | 0, (0.5 + ball2.y) + dy * fralin[index + "-" + index2] / speed_line | 0);
                      ctx.stroke();
                       //ball2.draw2(ctx, canvas,fralin[index + "-" + index2]);
                      //if (fralin[index + "-" + index2] == speed_line) ball2.draw2(ctx, canvas);                 
                    }
                  }

                }
              }
            }
          }
        }
      }
    }

    // Start
    loop();
  }
  //////////////////////////////////
    }
   
    render() {      

        return (
            <canvas className="web-matrix"/>
        );
    }
}

export default CanvasComponent;