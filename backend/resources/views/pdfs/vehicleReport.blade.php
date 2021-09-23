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

            @php
            $total_mileage = 0;
            $total_fuel_cost = 0;
            $total_spent_fuel = 0;
            @endphp
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
                @php
                $total_mileage += $mileage->mileage;
                $total_fuel_cost = $mileage->fuel_cost;
                $total_spent_fuel = $mileage->spent_fuel;
                @endphp

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
                    <td>{{$total_mileage}} km</td>
                    <td>$ {{$total_fuel_cost}}</td>
                    <td>{{$total_spent_fuel}} L</td>
                </tr>
            </tfoot>
        </table>
    </div>

</body>

</html>