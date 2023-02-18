wordsElements = [
    document.getElementById('word1').children,
    document.getElementById('word2').children,
    document.getElementById('word3').children,
    document.getElementById('word4').children,
    document.getElementById('word5').children,
    document.getElementById('word6').children
]
wordInput = document.getElementById('wordInput')
wordInput.focus()
wordCursor = 0
selectedWord = "farol"

wordInput.addEventListener('input', () => {
    wordInput.value = wordInput.value.toUpperCase()
    wordInput.value = wordInput.value.replace(/[^a-zA-ZÀ-ÿ]/g, '');
})

wordInput.addEventListener('keyup', async (e) => {
    //se tecla enter e input length igual a 5 e cursor menor ou igual a 5
    if (e.key == "Enter" && wordInput.value.length == 5 && wordCursor <= 5)
    {
        //verifica se palavra existe
        word = wordInput.value.toLowerCase()
        url = `https://api.dicionario-aberto.net/word/${word}`
        response = await fetch(url)
        data = await response.json()
        if (!data.length) {return}


        for (let i = 0; i < 5; i++){
            console.log(`${selectedWord} ${wordInput.value[i]}`)
            if (selectedWord.indexOf(wordInput.value[i].toLowerCase()) !== -1){
                if (selectedWord[i] == wordInput.value[i].toLowerCase()){
                    wordsElements[wordCursor][i].style.backgroundColor = "green"
                    wordsElements[wordCursor][i].style.borderColor = "green"
                } else {
                    wordsElements[wordCursor][i].style.backgroundColor = "orange"
                    wordsElements[wordCursor][i].style.borderColor = "orange"
                }
            } else {
                wordsElements[wordCursor][i].style.backgroundColor = "red"
            }

            //adiciona palavra na linha
            wordsElements[wordCursor][i].innerText = wordInput.value[i]
        }
        //verifica se ganhou o jogo
        if (selectedWord == wordInput.value.toLowerCase()) {
            console.log('teste')
            wordInput.value = "Você acertou!"
            wordInput.disabled = true
            return
        }

        // mudando o cursor / resetando input
        wordCursor += 1
        wordInput.value = ""

        //Verifica se perdeu
        if (wordCursor == 6){
            wordInput.value = `Errou! Era ${selectedWord}`
            wordInput.disabled = true
        }
    }
})