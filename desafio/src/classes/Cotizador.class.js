class Cotizador {
    static tasas = {
        "USD": 0.0058,
        "BTC": 0.000059
    }

    getPrice(precio, moneda) {
        switch (moneda) {
            case 'USD':
                return precio * Cotizador.tasas["USD"];
            case 'BTC':
                return precio * Cotizador.tasas["BTC"];
            default:
                break;
        }
    }
}

export default Cotizador;
