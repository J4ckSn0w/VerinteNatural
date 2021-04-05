<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Confirmación de Correo</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Rum+Raisin&display=swap');
        .frame {
            background: #FFFFFF;
            justify-content: center;
            align-content: center;
            display: flex;
        }

        .rectangle {
            position: absolute;
            width: 585px;
            border-radius: 12px;
            margin-top: 35px;
        }

        .rectangle > img {
            width: 585px;
            border-radius: 20px;
            opacity: 0.7;
        }

        .logo {
            position: absolute;
            width: 158px;
            height: 143px;
            top: 64px;
        }

        .logo > img {
            width: 160px;
            margin: 0;
        }

        .content {
            position: absolute;
            width: 347px;
            height: 125px;
            top: 212px;

            font-family: 'Rum Raisin', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 36px;
            line-height: 46px;
            display: flex;
            align-items: center;
            text-align: center;

            /* Gray 6 */

            color: #F2F2F2;

            text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        }

        .submit__button {
            position: absolute;
            text-decoration: none;
            top: 362px;
        }

        .submit__button > button {
            width: 183px;
            height: 70px;
            background: #A0E6C8;
            border-radius: 10px;
            border: none;
            font-family: 'Rum Raisin', sans-serif;
            text-align: center;
            font-size: 24px;
            color: #4F4F4F;
            cursor: pointer;
        }

    </style>

</head>
<body>
<div class="frame">

    <div class="rectangle">
        <img src="{{asset("/images/font_email.jpg")}}" alt="">
    </div>
    <div class="logo">
        <img src="{{asset("/images/logo.png")}}" alt="">
    </div>
    <div class="content">
        ¿Olvidaste tu contraseña? Crea una nueva
    </div>

    <a href="{{$url}}" class="submit__button">
        <button>
            Restablecer Contraseña
        </button>
    </a>

</div>
</body>
</html>
