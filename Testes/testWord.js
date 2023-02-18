selectedWord = "farol"
inputWord = "farto"

for (let i = 0; i < 5; i++){
    if (selectedWord.indexOf(inputWord[i]) !== -1){
        if (selectedWord[i] == inputWord[i])
            console.log('GREEN')
        else
            console.log('YELLOW')
    } else {
        console.log('RED')
    }
}