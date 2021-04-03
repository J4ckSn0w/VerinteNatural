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
            height: 460px;
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
            display: block;
            position: fixed;
            width: 347px;
            height: 325px;
            top: 212px;

            font-family: 'Rum Raisin', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 26px;
            line-height: 46px;
            align-items: center;
            text-align: center;

            /* Gray 6 */

            color: #F2F2F2;

            text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        }

        .submit__button {
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

        .input_password {
            width: 247px;
            height: 30px;
            border: none;
            border-radius: 10px;
            font-size: 40px;
            margin-bottom: 0;
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

        <form  method="POST"
               action="{{route('setNewPassword',
                ['user_id' => request()->get('object'),
                'token' => request()->get('token')])}}"
        >
            @method('PUT')
            <label for="new_password">Nueva Contraseña</label>
            <input class="input_password"
                   type="password"
                   name="new_password" id="new_password">
            <label for="new_password_confirmation">Confirmar Nueva Contraseña</label>
            <input class="input_password" type="password"
                   name="new_password_confirmation" id="new_password_confirmation">

            <button class="submit__button" type="submit">
                Restablecer Contraseña
            </button>
        </form>

    </div>

</div>
</body>
</html>
