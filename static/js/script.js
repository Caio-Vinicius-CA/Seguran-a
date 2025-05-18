// Buscar dados com base nos filtros
document.addEventListener('DOMContentLoaded', function () {
    async function fetchData() {
        const regiao = document.getElementById('regiao').value;
        const sexo = document.getElementById('sexo').value;
        
        let url = 'https://seguran-a.onrender.com';
        
        let query = [];
        if (regiao) query.push(`regiao=${encodeURIComponent(regiao)}`);
        if (sexo) query.push(`sexo=${encodeURIComponent(sexo)}`);
        if (query.length > 0) url += '?' + query.join('&');

        try {
            const response = await fetch(url);
            const data = await response.json();

            console.log("Dados recebidos do backend:", data);
            displayData(data);
        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    }


    // Exibir dados na tabela
    function displayData(data) {
        const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];

        data.forEach(item => {
            const row = tableBody.insertRow();
            row.insertCell(0).innerText = item.MUNICIPIO;
            row.insertCell(1).innerText = item.REGIAO_GEOGRAFICA;
            row.insertCell(2).innerText = item.SEXO;
            row.insertCell(3).innerText = item.NATUREZA_JURIDICA;
            row.insertCell(4).innerText = item.DATA;
            row.insertCell(5).innerText = item.IDADE;
        });
    }

    // Submit do formulário
    document.getElementById('filterForm').addEventListener('submit', function (e) {
        e.preventDefault();
        fetchData();
    });

    // Chama a função fetchData
    fetchData();
});