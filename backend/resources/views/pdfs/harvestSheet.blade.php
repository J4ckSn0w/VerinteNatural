<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <title>Hoja de recolección - {{$harvest_sheet->folio}}</title>

    <style>
        * {
            margin: 0;
        }

        body {
            margin: 10px;
        }

        .list-data>li {
            list-style: none;
        }

        .list-data {
            font-size: 12px;
            padding: 0;
        }

        th,
        td {
            font-size: 13px;
            text-align: center;
        }

        .signatures {
            justify-content: center;
            margin-bottom: 20px;
        }

        .signatures>span {
            display: inline-block;
            border-top: 1px solid black;
            width: <?php echo ($forProvider ? '170px' : '150px') ?>;
            text-align: center;
            margin: <?php echo ($forProvider ? '0 90px' : '0 40px') ?>;
        }

        footer {
            position: fixed;
            bottom: 95;
        }

        .footer-text {
            font-size: 10px;
            color: gray;
        }

        .page-break {
            page-break-after: always;
        }

        .logo {
            float: right;
        }
    </style>
</head>

<body>


    <footer>
        <div class="container">
            <div class="signatures">
                <span class="border-top">
                    Proveedor
                </span>
                <span class="border-top">
                    Recolector
                </span>
                @if(!$forProvider)
                <span class="border-top">
                    Almacén
                </span>
                @endif
            </div>
            <p class="footer-text">
                449-910-2030 <br>
                verintenatural@gmail.com <br>
                Mar de las Antillas 606, Col. Las Brisas, Aguascalientes, Ags C.P. 20100
            </p>
        </div>
    </footer>


    <div class="container mt-5">

        <h3 class="text-center mt-5"><b>Hoja de recolección</b></h3>

        <div class="px-4 d-flex">

            <div style="width: 50%;">
                <ul class="list-data mb-4">
                    <li><b>Folio:</b> {{$harvest_sheet->folio}}</li>
                    <li><b>Fecha:</b> {{$harvest_sheet->collect_to}}</li>
                    @if(!$forProvider)
                    <li><b>Almacén:</b> {{$harvest_sheet->warehouse}}</li>
                    @endif
                    <li><b>Proveedor:</b> {{$harvest_sheet->provider}}</li>
                    <li><b>Contacto:</b> {{$harvest_sheet->contact_name}}</li>
                    <li><b>Forma de pago:</b> {{$harvest_sheet->payment_form_name}}</li>
                    <li><b>Dirección:</b> {{$harvest_sheet->address}}</li>
                    <li><b>Recolector:</b> {{$harvest_sheet->gatherer_name}}</li>
                </ul>
            </div>

            <div class="logo" style="width: 50%;">
                <img class="float-right" src="{{asset('images/logo.png')}}" alt="" width="120px">
            </div>

        </div>

        <table class="table table-striped border border-1">
            <thead>
                <tr>
                    <th>Lote</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Recolectado</th>
                    <th>Unidad</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($harvest_sheet->products as $index => $product)
                <tr>
                    <td style="font-size: 12px !important">{{$product['sku'] }}</td>
                    <td>{{$product['name']}}</td>
                    <td>{{$product['quantity']}}</td>
                    <td></td>
                    <td>{{$product['unit']['name']}}</td>
                </tr>
                @endforeach
            </tbody>
        </table>

        <div class="row justify-content-center mt-4">
            <div class="col-12">
                <h6>Comentarios</h6>
                <div class="border border-1" style="height: 100px">

                </div>
            </div>

        </div>

    </div>


</body>

</html>