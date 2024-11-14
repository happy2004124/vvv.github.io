// 获取游戏元素
const ball = document.getElementById('ball'); // 获取小球元素
const paddle = document.getElementById('paddle'); // 获取挡板元素
const scoreDisplay = document.getElementById('score'); // 获取得分显示元素
const livesDisplay = document.getElementById('lives'); // 获取生命显示元素
const gameContainer = document.getElementById('gameContainer'); // 获取游戏容器元素
let score = 0; // 初始化得分
let lives = 3; // 初始化生命值
let ballSpeedX = 2; // 初始化小球水平速度
let ballSpeedY = 2; // 初始化小球垂直速度
let paddleSpeed = 10; // 初始化挡板速度

// 初始化砖块
function createBricks() {
  const brickContainer = document.createElement('div'); // 创建砖块容器
  brickContainer.style.position = 'absolute'; // 设置砖块容器为绝对定位
  brickContainer.style.top = '50px'; // 设置砖块容器顶部位置
  brickContainer.style.left = '50px'; // 设置砖块容器左侧位置
  gameContainer.appendChild(brickContainer); // 将砖块容器添加到游戏容器中

  for (let i = 0; i < 3; i++) { // 循环创建砖块行
    for (let j = 0; j < 10; j++) { // 循环创建每行的砖块
      const brick = document.createElement('div'); // 创建砖块元素
      brick.classList.add('brick'); // 添加砖块类名
      brick.style.top = i * 26 + 'px'; // 设置砖块顶部位置
      brick.style.left = j * 76 + 'px'; // 设置砖块左侧位置
      brickContainer.appendChild(brick); // 将砖块添加到砖块容器中
    }
  }
}
createBricks(); // 调用函数创建砖块

// 移动挡板
document.addEventListener('mousemove', function(e) { // 监听鼠标移动事件
  let mouseX = e.clientX - gameContainer.offsetLeft; // 获取鼠标在游戏容器内的X坐标
  if (mouseX > 0 && mouseX < gameContainer.offsetWidth - paddle.offsetWidth) { // 判断鼠标位置是否在游戏容器内
    paddle.style.left = mouseX + 'px'; // 设置挡板位置
  }
});

// 小球运动
function moveBall() {
  let ballX = ball.offsetLeft; // 获取小球左侧位置
  let ballY = ball.offsetTop; // 获取小球顶部位置
  let ballRadius = ball.offsetWidth / 2; // 获取小球半径
  let paddleX = paddle.offsetLeft; // 获取挡板左侧位置
  let paddleY = paddle.offsetTop; // 获取挡板顶部位置
  let paddleWidth = paddle.offsetWidth; // 获取挡板宽度
  let containerWidth = gameContainer.offsetWidth; // 获取游戏容器宽度
  let containerHeight = gameContainer.offsetHeight; // 获取游戏容器高度

  // 检测小球与挡板的碰撞
  if (ballY + ballRadius >= paddleY && ballX + ballRadius >= paddleX && ballX - ballRadius <= paddleX + paddleWidth) {
    ballSpeedY = -ballSpeedY; // 反转小球垂直速度
  }

  // 检测小球与砖块的碰撞
  let bricks = document.querySelectorAll('.brick'); // 获取所有砖块元素
  bricks.forEach(brick => { // 遍历所有砖块
    let brickX = brick.offsetLeft; // 获取砖块左侧位置
    let brickY = brick.offsetTop; // 获取砖块顶部位置
    let brickWidth = brick.offsetWidth; // 获取砖块宽度
    let brickHeight = brick.offsetHeight; // 获取砖块高度

    if (ballY - ballRadius <= brickY + brickHeight && ballY + ballRadius >= brickY && ballX + ballRadius >= brickX && ballX - ballRadius <= brickX + brickWidth) {
      ballSpeedY = -ballSpeedY; // 反转小球垂直速度
      brick.remove(); // 移除砖块
      score++; // 增加得分
      scoreDisplay.textContent = `得分: ${score}`; // 更新得分显示
    }
  });

  // 检测小球是否触碰底部
  if (ballY + ballRadius >= containerHeight) { // 判断小球是否触碰底部
    lives--; // 减少生命值
    livesDisplay.textContent = `生命: ${lives}`; // 更新生命显示
    if (lives === 0) { // 判断生命值是否为0
      alert('游戏结束'); // 弹出游戏结束提示
      document.location.reload(); // 重载页面，重新开始游戏
    } else {
      ball.style.top = '280px'; // 重置小球顶部位置
      ball.style.left = '390px'; // 重置小球左侧位置
      ballSpeedX = 2; // 重置小球水平速度
      ballSpeedY = 2; // 重置小球垂直速度
    }
  }

  // 小球碰壁反弹
  if (ballX + ballRadius >= containerWidth || ballX - ballRadius <= 0) {
    ballSpeedX = -ballSpeedX; // 反转小球水平速度
  }
  if (ballY - ballRadius <= 0) {
    ballSpeedY = -ballSpeedY; // 反转小球垂直速度
  }

  // 更新小球位置
  ball.style.top = (ball.offsetTop + ballSpeedY) + 'px'; // 更新小球顶部位置
  ball.style.left = (ball.offsetLeft + ballSpeedX) + 'px'; // 更新小球左侧位置
}

// 游戏主循环
setInterval(moveBall, 10); // 每隔10毫秒调用一次moveBall函数，形成游戏循环
