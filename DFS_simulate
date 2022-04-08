//https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_010_Maze_DFS/P5
//위의 코드를 참고 했습니다.
//주석 추가 예정입니다.
//맵 크기 변환과 입력을 더 쉽게 할 예정입니다.

let num = 5;  //맵의 크기
let map = ['00000','00111','10011','11001','11100'];  //맵의 값
let arr = [num];  //맵의 값을 저장

let w = 100;
let grid = [];
let current;
let stack = [];
function setup() {
  createCanvas(num*w,num*w);
  for(let i = 0; i < num; i++)
  {
    arr[i] = [];
    for(let j = 0; j < num; j++)
    {
      arr[i][j] = map[i][j]-'0';
      if(arr[i][j]==0)
        fill(255,0,255);
      else if(arr[i][j]==1)
        fill(125);
      rect(i*w,j*w,w,w);
    }
  }
  for (let j = 0; j < num; j++) {
    for (let i = 0; i < num; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];
  current.highlight();
}
function draw() {
  frameRate(5);
  current.visited = true;
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    stack.push(current);

    current = next;
  } else if (stack.length > 0) {
    current.remove();
    current = stack.pop();
  }
  current.highlight();
}

function index(i, j) {
  if (i < 0 || j < 0 || i > num - 1 || j > num - 1) {
    return -1;
  }
  return i + j * num;
}

function Cell(i,j){
  this.i = i;
  this.j = j;
  this.visted = false;
  
  this.checkNeighbors = function() {
    let neighbors = [];

    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];

    if (top && !top.visited && arr[i][j-1]==0) {
      neighbors.push(top);
    }
    if (right && !right.visited && arr[i+1][j]==0) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited && arr[i][j+1]==0) {
      neighbors.push(bottom);
    }
    if (left && !left.visited && arr[i-1][j]==0) {
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
    fill(0, 0, 255);
    rect(x, y, w, w);
  };
  
  this.remove = function() {
    let x = this.i * w;
    let y = this.j * w;
    fill(255,0,255);
    rect(x,y,w,w);
  };
}
