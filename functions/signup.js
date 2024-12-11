const fs = require('fs');
const path = require('path');

// Caminho para o arquivo de dados
const dataFilePath = path.join(__dirname, 'data.json');

// Função para garantir que o arquivo exista
function ensureDataFileExists() {
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, JSON.stringify({}, null, 2));
    }
}

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Método não permitido. Use POST.' }),
        };
    }

    const { email, senha } = JSON.parse(event.body);

    if (!email || !senha) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Email e senha são obrigatórios.' }),
        };
    }

    // Certifica-se de que o arquivo existe
    ensureDataFileExists();

    // Carrega os dados existentes
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

    // Adiciona os novos dados
    data[email] = senha;

    // Salva os dados no arquivo
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Dados salvos com sucesso.' }),
    };
};
