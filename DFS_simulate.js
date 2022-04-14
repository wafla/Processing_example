//https://github.com/CodingTrain/website/tree/main/CodingChallenges/CC_010_Maze_DFS/P5
//위의 코드를 참고 했습니다.
//원본 코드에서 추가된 부분 위주로 주석을 달았습니다.

let num = 10;  //길 개수
let map = [];  //맵의 값
let arr = [num];  //맵의 값을 저장
let size = 500; //맵 사이즈
let w = size/num; //길 크기

let grid = [];
let current;
let stack = [];
function setup() {
  createCanvas(num * w,num * w);
  for(let i = 0; i < num; i++)  //맵을 자동으로 생성합니다. 이진수의 특징을 이용해서 2^(num) ~ 2^(num+1) 값을 이진수로 변환하여 문자열로 저장합니다.
  {                             //조금 더 설명하자면 num이 10일 경우 2^10은 1024이고 이진수로 표현하면 1000000000이며 문자열로 보면 10자리입니다. 2^11는 10000000000이고 이 사이의 값을 적절히 섞었습니다.
    let x = random(pow(2,num), pow(2,num+1));
    map[i] = str(floor(x.toString(2)));
  }
  for(let i = 0; i < num; i++)
  {
    arr[i] = [];
    for(let j = 0; j < num; j++)
    {
      if(j==0)
        arr[i][j] = 0;
      else
        arr[i][j] = map[i][j]-'0';  //문자형이기 때문에 '0'을 빼서 정수형으로 바꿔줍니다.
      if(arr[i][j]==0)
          fill(255,0,255);  //0인경우 지나다닐 수 있는 길입니다. 색깔로 구분해줍니다.
      else
          fill(125);  //1인경우 벽입니다.
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
  current.highlight();  //길의 끝에 색깔이 안들어와서 수정했습니다.
}
function draw() {
  frameRate(5); //빨리 지나가서 속도를 낮췄습니다.
  current.visited = true;
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    stack.push(current);
    current = next;
  } else if (stack.length > 0) {
    current.remove(); //지나온 길을 다시 원래대로 돌려놓습니다.
    current = stack.pop();
  }
  current.highlight();
}

function index(i, j) {
  if (i < 0 || j < 0 || i > num - 1 || j > num - 1) {
    return -1;
  }
  if (arr[i][j] == 1) //벽인 경우에도 -1을 돌려줘서 지나가지 못하게 합니다.
    return -1;
  return i + j * num;
}

function Cell(i,j){
  this.i = i;
  this.j = j;
  this.visited = false;
  
  this.checkNeighbors = function() {
    let neighbors = [];

    let top = grid[index(i, j - 1)];
    let right = grid[index(i + 1, j)];
    let bottom = grid[index(i, j + 1)];
    let left = grid[index(i - 1, j)];

    if (bottom && !bottom.visited) {  //밑, 오른쪽, 왼쪽, 위 순서로 탐색합니다.
      neighbors.push(bottom);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    if (top && !top.visited) {
      neighbors.push(top);
    }
    
    if (neighbors.length > 0) {
      return neighbors[0];
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
