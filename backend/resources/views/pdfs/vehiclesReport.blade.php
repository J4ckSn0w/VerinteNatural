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
        <h1 class="text-center">Reporte Vehicular General</h1>
        <h3 class="text-center">Fecha: {{$date}}</h3>
        <table class="table">
            @php
            $total_mileage = 0;
            $total_fuel_cost = 0;
            $total_spent_fuel = 0;
            @endphp

            <thead>
                <tr>
                    <th>Vehiculo</th>
                    <th>Tipo</th>
                    <th>Kilometraje</th>
                    <th>Costo</th>
                    <th>Gasolina</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($vehicles as $vehicle)
                @php
                $total_mileage += $vehicle->mileage;
                $total_fuel_cost += $vehicle->fuel_cost;
                $total_spent_fuel += $vehicle->spent_fuel;
                @endphp
                <tr>
                    <td>{{$vehicle->license_plate }}</td>
                    <td>{{$vehicle->vehicle_type_name}}</td>
                    <td>{{$vehicle->mileage}} km</td>
                    <td>$ {{$vehicle->fuel_cost}}</td>
                    <td>{{$vehicle->spent_fuel}} L</td>
                </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr>
                    <td>Total</td>
                    <td></td>
                    <td>{{$total_mileage}} km</td>
                    <td>$ {{$total_fuel_cost}}</td>
                    <td>{{$total_spent_fuel}} L</td>
                </tr>
            </tfoot>
        </table>
    </div>

</body>

</html>