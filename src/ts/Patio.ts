// const { Veiculo } = require('./Veiculo');

var veiculosNoPatio: any[] = JSON.parse(localStorage.getItem('patio')) || [];

module.exports = class Patio {

    static entrar(veiculo: any) {
        let dhEntrada = new Date();
        let veiculo_entrou = { veiculo, dh_entrada: dhEntrada };
        veiculosNoPatio.push(veiculo_entrou);
        localStorage.setItem('patio', JSON.stringify(veiculosNoPatio));
        return veiculo_entrou;
    }

    static sair(veiculo: any) {
        let dhSaida = new Date();
    }

    static getListaPatio() {
        return veiculosNoPatio;
    }
}