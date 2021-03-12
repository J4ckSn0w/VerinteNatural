<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Confirmación de Correo</title>
    <style>
        html, body {
            background: #C6FFDD;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to right, #f7797d, #FBD786, #C6FFDD);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to right, #f7797d, #FBD786, #C6FFDD); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .card {
            border-radius: 25px;
            background-color: white;
            text-align: center;
            width: 150vh;
            margin-top: 5vw;
            padding: 25px;
            display: block;
            justify-content: center;
            align-items: center;
        }

        .logo {
            margin-top: 25px;
        }

        .card__text {
            margin-left: 50%;
            transform: translate(-50%);
            background-color: #FFBF00;
            box-shadow: 6px 6px 4px #FBD786;
            width: 70%;
            border-radius: 6px;
            border: none;
            margin-bottom: 40px;
            padding: 10px;
        }

        .first__text {
            font-family: 'Courier new', Courier, monospace;
            margin-top: 10px;
            color: white;
            font-size: calc(2vw + 10px);
        }

        .second__text {
            font-family: 'Courier new', Courier, monospace;
            font-size: calc(1vw + 7px);
            color: white;
        }

        .confirm_button {
            background-color: #FFBF00;
            border: none;
            border-radius: 4px;
            box-shadow: 6px 6px 4px #FBD786;
            padding: 15px;
        }
        .confirm_button:hover {
            background-color: cadetblue;
            color: #1a202c;
            box-shadow: 6px 6px 4px #FBD786;
        }

        .confirm_button:active {
            background-color: chocolate;
            color: white;
        }

        .confirm_button > a{
            text-decoration: none;
            font-family: 'Courier new', Courier, monospace;
            font-size: 3vw;
            color: white;
        }

    </style>

</head>
<body>
<div class="container">
    <div class="card">
        <div class="logo">
            <img width="80%" src="{{asset('/images/logo.png')}}" alt="logo">
        </div>
        <div class="card__text">
                <span class="first__text">
                   Correo Verificado!
                </span>
            <br>
        </div>
        <button class="confirm_button" >
            <a href="{{route('home')}}">
                ir al Verinte Natural
            </a>
        </button>
    </div>
</div>
</body>
</html>
