/**
 * Calcula o tempo e retorna array com horas, minutos e segundos
 */
module.exports = function calcularTempo(dh: Date | string): number[] {
    let agora = new Date();

    if (typeof dh === 'string') {
        dh = new Date(dh);

    }
    let tempo = agora.getTime() - dh.getTime();
    let segundos = Math.round(tempo / 1000);
    let minutos = Math.round(segundos / 60);
    let horas = Math.round(minutos / 60);
    minutos %= 60;
    segundos %= 60;

    return [horas, minutos, segundos];
}