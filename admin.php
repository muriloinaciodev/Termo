<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alterar Palavra</title>
    <style>
        body {
            position: absolute;
            background-color: #1a1a1a;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -30%)
        }
        section {
            width: 300px;
            height: 350px;
            background-color: cyan;
            border-radius: 20px;
            display:flex;
            flex-direction: column;
            font-family: monospace;
            text-align: center;
            font-size: 1.5em;
            padding: 15px;
        }
        input[type="text"]{
            width: 150px;
            height: 50px;
            margin: 0px;
            padding: 0px;
            border: 2px solid gray;
            margin-bottom: 10px;
            font-size:1.5em;
            text-align: center;
        }
        input[type="submit"]{
            width: 154px;
            height: 50px;
            margin: 0px;
            padding: 0px;
            background-color: red;
            border: none;
            border-bottom: 6px solid darkred;
            color: white;
            font-weight: bold;
        }
        input[type="submit"]:active {
            border:none;
            background-color: darkred;
        }
    </style>
</head>
<body>
    <section>
    <h1>Painel Admin</h1>
    <p>Este painel serve para alterar a palavra do termo.</p>
    <form method="post">
        <input type="text" name="word" autocomplete="Off" maxlength="5"> <br>
        <input type="submit" value="Confirmar">
    </form>
    <?php 
        if (isset($_POST['word']) and strlen($_POST['word']) == 5){
            file_put_contents('word.json', json_encode(
                array(strtolower($_POST['word']))
            ));
            echo "<p>" . $_POST['word'] . " agora é a palavra atual do Termo</p>";
        } else {
            echo "<p> Preencha completamente o campo de texto </p>";
        }

        ?>
    </section>
    <script>
        input = document.querySelector('input[type="text"]')
        input.addEventListener("input", () => {
            input.value = input.value.toUpperCase()
        })
    </script>
</body>
</html>
