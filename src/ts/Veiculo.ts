
/**
 * Objeto veículo
 */
module.exports = class Veiculo {

    nome: string;
    placa: string;

    constructor(nome: string, placa: string) {
        this.nome = nome;
        this.placa = placa;
    };
}


