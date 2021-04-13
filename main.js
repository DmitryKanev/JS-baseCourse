function drawBoard() {
  let board = document.querySelector(".board");
  let block;
  let clr = true;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (j == 0) clr = !clr;
      block = document.createElement("div");
      if (clr) block.className = "block black";
      else block.className = "block white";
      board.appendChild(block);
      clr = !clr;
    }
  }
  let letter = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let numbers = ["8", "7", "6", "5", "4", "3", "2", "1"];
  let words = document.querySelector(".letters");
  for (wnum = 0; wnum < letter.length; wnum++) {
    let wordCell = document.createElement("div");
    words.appendChild(wordCell);
    wordCell.classList.add("wordCell");
    wordCell.innerHTML = letter[wnum];
  }
  let nums = document.querySelector(".numbers");
  for (num = 0; num < numbers.length; num++) {
    let numCell = document.createElement("div");
    nums.appendChild(numCell);
    numCell.classList.add("numCell");
    numCell.innerHTML = numbers[num];
  }
}

drawBoard();
