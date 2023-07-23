<!--Last Update on 23.07.2023-->

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="Icon.ico" type="image/x-icon">
    <title>Painel do Administrador</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;

            margin: 0px;
            padding: 0px;

            width: 100vw;
            height: 100vh;

            background-color: #404040;
        }
        h1 {
            font-size: 2.5em;
        }
        p {
            font-size: 1.7em;
        }
        main {
            background-color: #262626;
            box-shadow: 4px 4px 4px black;
            padding: 15px;
            border-radius: 15px;
            color: whitesmoke;
            font-family: monospace;
            text-align: center;
        }

        form {
            display: grid;
            width: 80%;
            margin: auto;
        }

        form input {
            font-family: monospace;
            font-size: 1.5em;
            text-align: center;
            line-height: 50px;
            padding: 0;
            margin: 0;
            outline: 0;
            border:none;
            width: 100%;
            box-sizing: border-box;
        }
        input[type=text] {
            font-size: 2em;
        }
        input[type=submit] {
            font-weight: bolder;
            background-color: green;
            color: white;
            font-weight: bolder;
        }
        input[type=submit]:disabled {
            font-weight: bolder;
            background-color: red;
            color: white;
            font-weight: bolder;
        }
        a {
            color: whitesmoke;
            font-weight: bolder;
            display: inline-block;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <main>
        <h1>Painel do <br>Administrador</h1>
        <p>Palavra atual: <span id="currentWord">...</span></p>
        <form method="POST">
            <input type="text" name="word" id="inputWord" autocomplete="off" maxlength="5" placeholder="Ex.: VERBO" oninput="verifyWord();this.value = this.value.slice(0, this.maxLength).toUpperCase()">
            <input id="btnSubmit" type="submit" value="Alterar Palavra"  title="Palavra Invalida" onclick="location.reload(true)" disabled>
        </form>
        <a href="index.html">Home Page</a>
    </main>
    <?php
        if (isset($_POST['word']) and strlen($_POST['word']) == 5){
            file_put_contents('word.json', json_encode(
                array(strtolower($_POST['word']))
            )
        );}
    ?>
    <script>
        inputWordE = document.getElementById('inputWord')
        btnSubmitE = document.getElementById('btnSubmit')
        currentWordE = document.getElementById('currentWord')

        fetch('word.json')
            .then(response => {return response.json()})
            .then(data => {currentWordE.innerText = data[0].toUpperCase()})

        async function verifyWord(){
            word = inputWordE.value.toLowerCase()
            btnSubmitE.disabled = true 
            btnSubmitE.title = 'Palavra Invalida'
            if (word.length != 5) { return }

            // Requesição API Dicionario Aberto
            url = `https://api.dicionario-aberto.net/word/${word}`
            response = await fetch(url)
            data = await response.json()
            console.log(data)

            // Verifica retorno se palavra esta no dicionario
            if (data.length) {
                btnSubmitE.disabled = false 
                btnSubmitE.title = 'Palavra Valida'
                console.log('existe')
            }
        }
    </script>
</body>
</html>