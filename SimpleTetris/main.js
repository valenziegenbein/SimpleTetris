import './style.css'
const canvas=document.querySelector('canvas');
const context= canvas.getContext('2d')
const $score= document.querySelector('span')
const BLOCK_SIZE =20;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT= 30;
let score=0;



canvas.width= BLOCK_SIZE*BOARD_WIDTH;
canvas.height=BLOCK_SIZE* BOARD_HEIGHT;
context.scale(BLOCK_SIZE,BLOCK_SIZE);




//BOARD
const board=[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,0,0,1,1,1,1,1,1,1,1]
  ]


const piece = {
  position: {x:6,y:1},
  shape:[[1,1],
          [1,1]]
}



//GET RANDOM PIECES
const PIECES=[
  [
    [1,1,1],
    [0,1,0]
  ],
  [
  [1,1],
  [1,1]
  ],
  [
  [1,1,1,1]
  ],
  [
  [0,1,1],
  [1,1,0]
  ],
  [
    [1,0],
    [1,0],
    [1,1,]
  ]
]




//gameloop
let lastTime=0;
let dropcounter=0;

function update(time = 0){
const deltaTime = time-lastTime
lastTime = time

dropcounter += deltaTime;
if(dropcounter>1000){
  piece.position.y++
  if(checkCollition()){
    piece.position.y--
    solidifyPiece();
    removeRow();
  }
  dropcounter = 0
}

draw()
window.requestAnimationFrame(update)

}




function draw(){
context.fillStyle = '#000'
context.fillRect (0,0,canvas.width,canvas.height)

board.forEach((row, y)=>{
  row.forEach((value,x)=>{
    if(value===1){
      context.fillStyle='rgba(255, 1, 86, 0.87)'
      context.fillRect(x,y, 1,1)
    }
  })
  $score.innerText = score
})



//user piece
piece.shape.forEach((row,y)=>{

  row.forEach((value,x)=>{
    if(value){
      context.fillStyle='rgba(1, 255, 179, 0.87)'
      context.fillRect(x+piece.position.x,y+piece.position.y, 1,1)
    }
  })

})

}

//CONTROLS
document.addEventListener('keydown',event=>{

  if(event.key==='ArrowUp'){

    const rotated=[];

    for(let i =0;i<piece.shape[0].length;i++){
      const row=[]

      for(let j=piece.shape.length-1;j>=0;j--){
        row.push(piece.shape[j][i]);
      }

      rotated.push(row)
    }
    const previousShape = piece.shape
    piece.shape = rotated
    if (checkCollition()){
      piece.shape = previousShape
    }

  

  }

  if(event.key==='ArrowLeft'){
    piece.position.x--;
    if(checkCollition()){
        piece.position.x++
    }
  }

  if(event.key==='ArrowRight'){
    piece.position.x++
    if(checkCollition()){
      piece.position.x--
    }
  };
  if(event.key==='ArrowDown'){
    piece.position.y++
    if(checkCollition()){
      piece.position.y--
      solidifyPiece()
      removeRow()
    }  
  };
})

//CHECK COLLITIONS

function checkCollition(){
  return piece.shape.find((row,y)=>{
    return row.find((value,x)=>{
      return(value!=0
        && board[y+piece.position.y]?.[x+piece.position.x] != 0 ) 
    })
  })

//SOLIDIFICATE
}
function solidifyPiece(){
  piece.shape.forEach((row,y)=>{
    row.forEach((value,x)=>{

      if(value===1){
        board[y+piece.position.y][x+piece.position.x]=1

      }
    })
  })


  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]

//RESET POSITION
  piece.position.x= (Math.floor(Math.random() * BOARD_WIDTH /2 ))+2
  piece.position.y=1
  if(checkCollition()){
    window.alert(`Game over, you did: ${score} points`)
    board.forEach((row)=>row.fill(0))

  }
}





//REMOVE ROWS

function removeRow(){

const rowsToremove=[]

board.forEach((row,y)=>{

  if(row.every(value=>value===1)){
    rowsToremove.push(y)
    score+=100
  }
})

rowsToremove.forEach(y=>{
  board.splice(y,1)
  const newRow=Array(BOARD_WIDTH).fill(0)
  board.unshift(newRow)
})


}


update()


