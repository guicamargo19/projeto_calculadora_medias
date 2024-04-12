const form = document.getElementById('form-atividade');
const imgAprovado = "<img src='./assets/aprovado.png' alt='Emoji celebrando'/>";
const imgReprovado = "<img src='./assets/reprovado.png' alt='Emoji decepcionado'/>";
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
const notaMinima = document.getElementById('media');
const erro = document.querySelector('.error');


let linhas = '';

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (notaMinima.value === '') {
        erro.classList.add('opacity');
        notaMinima.classList.toggle('error-border');
    } else {
        adicionaLinha();
        atualizaTabela();
        atualizaMediaFinal();
        erro.classList.remove('opacity');
    }
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida.`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= parseFloat(notaMinima.value) ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';

        linhas += linha
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function calculaMediaFinal() {
    let somaNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaNotas += notas[i]
    }

    return somaNotas / notas.length;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= parseFloat(notaMinima.value)  ? spanAprovado : spanReprovado;
}