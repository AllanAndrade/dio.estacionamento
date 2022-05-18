/**
 * A classe Tela trata de todas as ações envolvendo o DOM.
 */
import Inputmask from "inputmask";
const Veiculo = require('./Veiculo');
const Patio = require('./Patio');
const FormatData = require('./FormatData');
const calcularTempo = require('./CalcularTempo');



module.exports = class Tela {

    static inicio() {
        Tela.monitoraBotaoEntrar();
        Tela.aplicarMascaraPlaca();
        Tela.preencherListaPatio();
        Tela.monitoraBotaoSair();
    }

    static preencherListaPatio() {
        let lista = Patio.getListaPatio();
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
        let tr = event.target.parentElement.parentElement;
        let placa = tr.children[1].innerHTML;
        if (confirm('Deseja confirmar a saída do veículo ' + placa + '?')) {
            let saiu = Patio.sair(placa);
            let ar_tempo = calcularTempo(saiu.dh_entrada);
            tr.remove();
            alert(`O veículo de placa ${placa}, saiu do pátio e permaneceu por ${ar_tempo[0]} horas, ${ar_tempo[1]} minutos e ${ar_tempo[2]} segundos.`);
        }
    }

    static adicionaVeiculo(event) {
        event.preventDefault();

        let nome = window.document.getElementById('nome') as HTMLInputElement;
        if (nome.value === '') {
            alert('Informe o nome do veículo');
            nome.focus();
            return;
        }
        let placa = window.document.getElementById('placa') as HTMLInputElement;
        if (placa.value === '') {
            alert('Informe a placa do veículo');
            placa.focus();
            return;
        }
        if (placa.value.replace(/_/g, '').length !== 8) {
            alert('Informe uma placa válida');
            placa.focus();
            return;
        }
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