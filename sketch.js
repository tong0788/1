let points = [[-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2]];
let shapes = []; //形状
let song;
let amplitude;

function preload() { //音乐
  song = loadSound('sunset-beach-259654.mp3'); // 請將 'path/to/your/music.mp3' 替換為音樂檔案的路徑
}

function setup() {
  createCanvas(windowWidth, windowHeight); //背景
  song.loop();
  amplitude = new p5.Amplitude(); //音量
  for (let i = 0; i < 30; i++) {  //形状
    shapes.push({
      posX: random(width), //随机位置
      posY: random(height),
      speedX: random(-2, 2), //随机速度
      speedY: random(-2, 2),
      size: random(10, 50),
      color: color(random(255), random(255), random(255), 150)  //随机颜色
    }); 
  }
}

function draw() {
  background("#f4acb7");
  let level = amplitude.getLevel();
  let sizeFactor = map(level, 0, 1, 0.5, 2);

  for (let shape of shapes) { //形状
    shape.posX += shape.speedX; //移动
    shape.posY += shape.speedY; //移动

    if (shape.posX < 0 || shape.posX > width) shape.speedX *= -1; //反弹
    if (shape.posY < 0 || shape.posY > height) shape.speedY *= -1; //反弹

    push();
    translate(shape.posX, shape.posY); //移动
    strokeWeight(2);
    fill(shape.color);
    beginShape(); //形状
    for (let i = 0; i < points.length; i++) {
      let x = points[i][0] * shape.size * sizeFactor; // 大小
      let y = points[i][1] * shape.size * sizeFactor;
      vertex(x, y); //顶点
    }
    endShape(CLOSE);
    pop();
  }
}
