let compras = JSON.parse(localStorage.getItem("compras")) || [];

function salvar() {
    localStorage.setItem("compras", JSON.stringify(compras));
}

function adicionarCompra() {
    const item = document.getElementById("item").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const data = document.getElementById("data").value;

    if (!item || !valor || !data) {
        alert("Preencha todos os campos");
        return;
    }

    compras.push({
        item,
        valor,
        data,
        comprado: false
    });

    salvar();
    listar();
}

function listar() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    compras.forEach((c, index) => {
        const li = document.createElement("li");
        li.className = c.comprado ? "comprado" : "";

        li.innerHTML = `
            <span>${c.item} - R$ ${c.valor.toFixed(2)} - ${c.data}</span>
            <input type="checkbox" ${c.comprado ? "checked" : ""} 
            onchange="marcar(${index})">
        `;

        lista.appendChild(li);
    });

    calcularMedia();
}

function marcar(index) {
    compras[index].comprado = !compras[index].comprado;
    salvar();
    listar();
}

function calcularMedia() {
    if (compras.length === 0) {
        document.getElementById("media").innerText = "0.00";
        return;
    }

    const total = compras.reduce((soma, c) => soma + c.valor, 0);
    const meses = new Set(compras.map(c => c.data.slice(0,7))).size;

    document.getElementById("media").innerText = (total / meses).toFixed(2);
}

function limparHistorico() {
    if (confirm("Deseja apagar todo o histórico?")) {
        compras = [];
        salvar();
        listar();
    }
}

listar();
