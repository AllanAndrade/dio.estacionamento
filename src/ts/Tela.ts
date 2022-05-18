import Inputmask from "inputmask";
const Veiculo = require('./Veiculo');
const Patio = require('./Patio');
const FormatData = require('./FormatData');



module.exports = class Tela {

    static inicio() {
        Tela.monitoraBotaoEntrar();
        Tela.aplicarMascaraPlaca();
        Tela.preencherListaPatio();
        Tela.monitoraBotaoSair();
    }

    static preencherListaPatio() {
        let lista = Patio.getListaPatio();
        console.log({ lista });
        for (let i = 0; i < lista.length; i++) {
            let tr = Tela.getTr([lista[i].veiculo.nome, lista[i].veiculo.placa, FormatData(lista[i].dh_entrada)]);
            window.document.querySelector('#lista_patio tbody').append(tr);
        }
    }

    static aplicarMascaraPlaca() {
        let selector = document.getElementById("placa");
        let placa = new Inputmask('AAA 9A|999');
        placa.mask(selector);
    }

    static monitoraBotaoEntrar() {
        let botao = window.document.getElementById('entrar');
        botao.addEventListener('click', Tela.adicionaVeiculo);
    }

    static monitoraBotaoSair() {
        let botoes = window.document.getElementsByClassName('btnSaida') as HTMLCollectionOf<HTMLInputElement>;
        for (let i = 0; i < botoes.length; i++) {
            botoes[i].addEventListener('click', Tela.removeVeiculo);
        }
    }

    static removeVeiculo(event) {
        console.log('REMOVE');
    }

    static adicionaVeiculo(event) {
        event.preventDefault();

        let placa = window.document.getElementById('placa') as HTMLInputElement;
        let nome = window.document.getElementById('nome') as HTMLInputElement;
        let veiculo = new Veiculo(nome.value, placa.value);
        let veiculo_entrou = Patio.entrar(veiculo);
        Tela.atualizarPatio(veiculo_entrou);
        Tela.resetForm();
        Tela.monitoraBotaoSair()

    }

    static resetForm() {
        (<HTMLInputElement>window.document.getElementById('placa')).value = '';
        (<HTMLInputElement>window.document.getElementById('nome')).value = '';
        (<HTMLInputElement>window.document.getElementById('nome')).focus();
    }

    static atualizarPatio(veiculo_entrou) {
        let tr = this.getTr([veiculo_entrou.veiculo.nome, veiculo_entrou.veiculo.placa, FormatData(veiculo_entrou.dh_entrada)]);
        window.document.querySelector('#lista_patio tbody').append(tr);
    }

    static getTr(elementos: string[]): HTMLElement {
        let tr = window.document.createElement('tr');
        for (let i = 0; i < elementos.length; i++) {
            let txt = window.document.createTextNode(elementos[i]);
            let td = window.document.createElement('td');
            td.appendChild(txt);
            tr.appendChild(td);
        }

        let btn = window.document.createElement('button');
        btn.innerHTML = "X";
        btn.classList.add('btnSaida');
        let td = window.document.createElement('td');
        td.appendChild(btn);
        tr.appendChild(td);

        return tr;
    }
}