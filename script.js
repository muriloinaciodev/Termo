// Version: 1.0
// wordsElement[word[letter, ...], ...]
wordsElements = [
    document.getElementById('word1').children,
    document.getElementById('word2').children,
    document.getElementById('word3').children,
    document.getElementById('word4').children,
    document.getElementById('word5').children,
    document.getElementById('word6').children
]
// variaveis do sistema de WARNING
warningDiv   = document.getElementById('warning')
warningTitle = document.getElementById('warningTitle')
warningText  = document.getElementById('warningText')
warningBtn   = document.getElementById('warningBtn')

wordInput    = document.getElementById('wordInput')
spin         = document.getElementById('spinner')
testedWords = []
wordInput.focus()
wordCursor = 0
var selectedWord;

fetch('word.json')
    .then(response => response.json())
    .then(data => {
        selectedWord = data[0]
    })


function rmAcentos(text){
    text = text.replace(/[áàâãä]/gi, 'a')
    text = text.replace(/[éèê]/gi, 'e')
    text = text.replace(/[íï]/gi, 'i')
    text = text.replace(/[óôõö]/gi, 'o')
    text = text.replace(/[úü]/gi, 'u')
    return text
}

function warning(title="Erro", text="Algum erro ocorreu, recarregue a página!", btn="OK"){
    wordInput.disabled = true
    warningTitle.innerText = title
    warningText.innerText  = text
    warningBtn.innerText   = btn
    warningDiv.style.visibility = 'visible'
    warningDiv.style.opacity = 1
    setInterval(()=>{warningBtn.focus()}, 700)
}

warningBtn.addEventListener('click', () => {
    warningDiv.style.visibility = 'hidden'
    warningDiv.style.opacity = 0
    wordInput.disabled = false
    setInterval(()=>{wordInput.focus()}, 700)
})

wordInput.addEventListener('input', () => {
    if (wordInput.value.length > wordInput.maxLength)
        wordInput.value = wordInput.value.slice(0, wordInput.maxLength)
    wordInput.value = wordInput.value.toUpperCase()
    wordInput.value = wordInput.value.replace(/[^a-zA-ZÀ-ÿ]/g, '');
})

wordInput.addEventListener('keyup', async (e) => {
    //se tecla enter e input length igual a 5 e cursor menor ou igual a 5
    if (e.key == "Enter" && wordInput.value.length == 5 && wordCursor <= 5)
    {
        spin.style.visibility = 'visible' //spin de carregamento show
        //verifica se palavra existe
        word = wordInput.value.toLowerCase()
        url = url = `https://dicio-api-ten.vercel.app/v2/${word}`
        response = await fetch(url)
        spin.style.visibility = 'hidden' //spin de carregamento hide
        if (response["status"] == 400){
            warning("aviso", `A palavra "${word}" não foi encontrada no dicionario dicio.`)
            wordInput.value = ""
            return
        }

        //verifica se palavra ja testada
        if(testedWords.indexOf(word) != -1){
            warning('aviso', `A palavra "${word}" já foi testada.`)
            wordInput.value = ""
            return
        }
        
        testedWords.push(word)

        //var temp sem acentos
        tSelectedWord = rmAcentos(selectedWord)
        tWordInput    = rmAcentos(wordInput.value)

        //verifica a cor das letras
        for (let i = 0; i < 5; i++){
            console.log(`${selectedWord} ${wordInput.value[i]}`)

            if (tSelectedWord.indexOf(tWordInput[i].toLowerCase()) !== -1){
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
            wordInput.value = "Você acertou!"
            /* warning('Vitoria', 'Você acertou a palavra! Parabens!')
            warningTitle.style.backgroundColor = 'green' */
            wordInput.disabled = true
            return
        }

        // mudando o cursor / resetando input
        wordCursor += 1
        wordInput.value = ""

        //Verifica se perdeu
        if (wordCursor == 6){ 
            wordInput.value = `Palavra: "${selectedWord}"`
            /* warning('Derrota!', `A palavra era ${word}`) */
            wordInput.disabled = true
        }
    }
})