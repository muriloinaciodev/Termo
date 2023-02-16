from os import system
from random import choice

dicio = ['AMIGO', 'ATRAS', 'BANCO', 'BRIGA', 'CERTO', 'CHUVA', 'COISA', 'CORPO', 'CREIO', 'CUIDA', 'FELIZ', 'FESTA', 'FIQUE', 'GOSTO', 'JANTA', 'JOVEM', 'LARGO', 'LIVRO', 'LONGO', 'MEDIR', 'MUNDO', 'NADAR', 'NOITE', 'OLHAR', 'PRAIA', 'PUDIM', 'QUASE', 'QUERO', 'SABOR', 'SALTO', 'SONHO', 'SUAVE', 'TANTO', 'TENHO', 'TRAGO', 'ÚNICO', 'UMIDO', 'VIVER']
selectedWord = choice(dicio)
attempts = 0
testedWords = []
win = False

while attempts < 6:
    #Entrada
    attempts += 1
    print(f'{7-attempts} tentativas')
    inputWord = str(input(':')).upper()
    system('clear')
    finalWord = ""
    for i, char in enumerate(inputWord):
        if char in selectedWord:
            if char == selectedWord[i]:
                finalWord += (f'\033[42m{char}\033[m')
            else:
                finalWord += (f'\033[43m{char}\033[m')
        else:
            finalWord += (f'\033[41m{char}\033[m')

    testedWords.append(finalWord)

    #Mostra Palavras Testadas
    for word in testedWords:
        print(f' {word}')

    if selectedWord == inputWord:
        win = True
        break

if win:
    print(f"Você acertou a palavra {selectedWord} com {attempts} tentativas")
else:
    print(f"Você errou e todas as chances acabaram")