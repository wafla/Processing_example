//https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_010_Maze_DFS/P5
//위의 미로를 만들어주는 코드를 사용했습니다.
//미로 생성 후 미로를 탈출하는 코드를 만들어 봤습니다.
//선에 막혀서 이동을 하지 못하는 것은 아직 구현이 되지 않았습니다. 3차원 배열을 만들어서 못 지나가는 곳을 저장하면 될 것 같습니다.

let cols, rows;
let w = 40;
let grid = [];
let current;
let stack = [];
let map_finish = 0;

function setup() {
  createCanvas(600, 600);
  cols = floor(width / w);
  rows = floor(height / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
}

function draw() {
  if(map_finish<2)
  {
    background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  // STEP 1
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
  }
}
let mx = 0, my = 0;
function keyPressed(){
  if(map_finish==2)
  {
    if(key=='a')
    {
      if(mx-w>-w)
      {
        noStroke();
        fill(255,0,255,100);
        rect(mx+1 ,my+1 ,w-2 ,w-2);
        mx=mx-w;
        my=my;
        noStroke();
        fill(0,255,0,100);
        rect(mx+1 ,my+1 ,w-2 ,w-2);
      }
    }
    if(key=='d')
    {
      if(mx+w<width)
      {
        noStroke();
        fill(255,0,255,100);
        rect(mx+1 ,my+1 ,w-2 ,w-2);
        mx=mx+w;
        my=my;
        noStroke();
        fill(0,255,0,100);
        rect(mx+1 ,my+1 ,w-2 ,w-2);
      }
    }
    if(key=='w')
    {
      if(my-w>-w)
      {
        noStroke();
        fill(255,0,255,100);
        rect(mx+1 ,my+1 ,w-2 ,w-2);
        mx=mx;
        my=my-w;
        noStroke();
        fill(0,255,0,100);
        rect(mx+1 ,my+1 ,w-2 ,w-2);
      }
    }
    if(key=='s')
    {
      if(my+w<height)
      {
        noStroke();
        fill(255,0,255,100);
        rect(mx+1 ,my+1 ,w-2 ,w-2);
        mx=mx;
        my=my+w;
        noStroke();
        fill(0,255,0,100);
        rect(mx+1 ,my+1 ,w-2 ,w-2);
      }
    }
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {
    let neighbors = [];

    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  };
  this.highlight = function() {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
    if(x==0 && y ==0 && map_finish<2)
      map_finish++;
  };

  this.show = function() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(0);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    if (this.visited) {
      if(x == width - w  && y == height - w)
      {
        noStroke();
        fill(255,0,0,100);
        rect(x,y,w,w);
      }
      else
      {
        noStroke();
        fill(255, 0, 255,100);
        rect(x, y, w, w);
      }
    }
  };
}
