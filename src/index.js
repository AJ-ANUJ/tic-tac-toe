// gameboard via IIFE(via factory method and closure)
const gameBoard = (function() {
    const board = new Array(3).fill().map(() => new Array(3).fill(""));
    const updateBoard = (i, j, sign) => {
        // check if i, j is available to be updated
        if(i >= 0 && i < 3 && j >= 0 & j < 3) {
            if(board[i][j] === "") {
                // update board
                board[i][j] = sign;
                return "success";
            }
            return "already filled, chose another";
        }
        else {
            return "give valid positions";
        }
    }
    return { board, updateBoard };
})();

const Game = function() {
    const p1Sign = 'X';
    const p2Sign = '0';
    let moves = 0;
    let toPlay = 0;
    function checkRow(i) {
        const board = gameBoard.board;
        const sign = board[i][0];
        if(sign === '') return false;
        for(let j=1; j<3; j++) {
            if(board[i][j] === sign) continue;
            else return false;
        }
        return true;
    }

    function checkCol(j) {
        const board = gameBoard.board;
        const sign = board[0][j];
        if(sign === '') return false;
        for(let i=1; i<3; j++) {
            if(board[i][j] === sign) continue;
            else return false;
        }
        return true;
    }

    function checkPrimDiag() {
        const board = gameBoard.board;
        const sign = board[0][0];
        if(sign === '') return false;
        if(board[1][1] === sign && board[2][2] === sign) return true;
        return false;
    }

    function checkSecoDiag() {
        const board = gameBoard.board;
        const sign = board[0][2];
        if(sign === '') return false;
        if(board[1][1] === sign && board[2][0] === sign) return true;
        return false;
    }

    const checkWin = function() {
        // check rows
        for(let i=0; i<3; i++) {
            const res = checkRow(i);
            if(res) {
                console.log("row win");
                console.table(gameBoard.board);
                return true;
            }
        }

        // check cols
        for(let i=0; i<3; i++) {
            const res = checkCol(i);
            if(res) return true;
        }

        // check primary diagonal
        if(checkPrimDiag()) {
            console.log("prime diag win");
            return true;
        }
        // check secondary diagonal
        if(checkSecoDiag()) {
            console.log("secondary diag win");
            return true;
        }
        return false;
    }

    const play = function() {
        while(moves < 9) {
            const ip = prompt(`${toPlay ? 'Player 2':'Player 1'}, Give square location to play...`);
            const [x, y] = ip.split(',');
            const updateStatus = gameBoard.updateBoard(+x, +y, toPlay ? p2Sign : p1Sign);
            if(updateStatus != 'success') {
                console.log('square already filled, choose another');
                // console.log('current board status: ');
                // console.table(gameBoard.board);
                // toPlay = !toPlay;
                // moves += 1
                continue;
            }
            const checkWinStatus = checkWin();
            if(checkWinStatus) {
                console.log(toPlay ? 'player 2 won': 'player 1 won');
                return;
            }
            console.log('current board status: ');
            console.table(gameBoard.board);
            toPlay = !toPlay;
            moves += 1
        }
        console.log('game drawn');
        return;
    }

    return { play };
}

const game = Game();
game.play();