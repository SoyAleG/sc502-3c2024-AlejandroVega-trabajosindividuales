<?php
$transacciones = array();

function registrarTransaccion($id, $descripcion, $monto) {
    global $transacciones;
    $transaccion = array(
        'id' => $id,
        'descripcion' => $descripcion,
        'monto' => $monto
    );
    array_push($transacciones, $transaccion);
}

function generarEstadoDeCuenta() {
    global $transacciones;
    
    $montoTotal = 0;
    foreach ($transacciones as $t) {
        $montoTotal += $t['monto'];
    }
    
    $montoInteres = $montoTotal * 1.026;
    $cashback = $montoTotal * 0.001;
    $montoFinal = $montoInteres - $cashback;
    
    $texto = "ESTADO DE CUENTA\n\n";
    $texto .= "Transacciones:\n";
    
    foreach ($transacciones as $t) {
        $texto .= "ID: " . $t['id'] . " - " . $t['descripcion'] . " - $" . number_format($t['monto'], 2) . "\n";
    }
    
    $texto .= "\nMonto total: $" . number_format($montoTotal, 2) . "\n";
    $texto .= "Monto con interes 2.6%: $" . number_format($montoInteres, 2) . "\n";
    $texto .= "Cashback 0.1%: $" . number_format($cashback, 2) . "\n";
    $texto .= "Monto final a pagar: $" . number_format($montoFinal, 2) . "\n";
    
    echo "<pre>" . $texto . "</pre>";
    
    $archivo = fopen("estado_cuenta.txt", "w");
    fwrite($archivo, $texto);
    fclose($archivo);
}

registrarTransaccion(1, "Supermercado", 45000);
registrarTransaccion(2, "Netflix", 9500);
registrarTransaccion(3, "Restaurante", 28000);
registrarTransaccion(4, "Gasolina", 35000);
registrarTransaccion(5, "Amazon", 67500);

generarEstadoDeCuenta();

?>