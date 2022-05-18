module.exports = function FormatarDataBR(dh: Date | string): string {
    if (!(dh instanceof Date)) {
        dh = new Date(dh);
    }

    let dia = ((dh.getDate()) < 10 ? '0' : '') + (dh.getDate());
    let mes = ((dh.getMonth() + 1) < 10 ? '0' : '') + (dh.getMonth() + 1);
    let horas = ((dh.getHours()) < 10 ? '0' : '') + (dh.getHours());
    let minutos = ((dh.getMinutes()) < 10 ? '0' : '') + (dh.getMinutes());
    let segundos = ((dh.getSeconds()) < 10 ? '0' : '') + (dh.getSeconds());
    let str_dt = dia + '/' + mes + '/' + dh.getFullYear() + ' ' + horas + ':' + minutos + ':' + segundos;
    return str_dt;

}