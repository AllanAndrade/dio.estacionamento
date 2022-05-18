
var veiculosNoPatio: any[] = JSON.parse(localStorage.getItem('patio')) || [];

module.exports = class Patio {

    static entrar(veiculo: any) {
        let dhEntrada = new Date();
        let veiculo_entrou = { veiculo, dh_entrada: dhEntrada };
        veiculosNoPatio.push(veiculo_entrou);
        localStorage.setItem('patio', JSON.stringify(veiculosNoPatio));
        return veiculo_entrou;
    }

    static sair(placa: string): any {
        let veiculo_saiu = veiculosNoPatio.find(veiculo => veiculo.veiculo.placa === placa);
        veiculosNoPatio = veiculosNoPatio.filter(veiculo => veiculo.veiculo.placa !== placa);
        localStorage.setItem('patio', JSON.stringify(veiculosNoPatio));
        return veiculo_saiu;
    }

    static getListaPatio() {
        return veiculosNoPatio;
    }
}