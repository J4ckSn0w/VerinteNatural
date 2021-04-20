<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <title>Reporte de vehiculo</title>
</head>

<body>
    <div class="container mt-5">
        <h1 class="text-center">Reporte Vehicular</h1>
        <h3 class="text-center">Vehiculo: {{$vehicle->license_plate}}</h3>
        <h4 class="text-center">Modelo: {{$vehicle->brand}}</h4>
        <h4 class="text-center mb-3">Tipo: {{$vehicle->vehicle_type_name}}</h4>
        <h5 class="text-left">Reporte del: {{$date_from}}, al: {{$date_to}}</h5>
        <table class="table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Kilometraje</th>
                    <th>Costo</th>
                    <th>Gasolina</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($mileages as $mileage)
                <tr>
                    <td>{{$mileage->created_at }}</td>
                    <td>{{$mileage->mileage}} km</td>
                    <td>$ {{$mileage->fuel_cost}}</td>
                    <td>{{$mileage->spent_fuel}} L</td>
                </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td>{{$vehicle->mileage}} km</td>
                    <td>$ {{$vehicle->fuel_cost}}</td>
                    <td>{{$vehicle->spent_fuel}} L</td>
                </tr>
            </tfoot>
        </table>
    </div>

</body>

</html>