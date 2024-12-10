const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  const fileContent = "Este é o conteúdo do arquivo TXT!";
  const filePath = path.join(__dirname, 'output.txt');

  try {
    // Escreve o conteúdo no arquivo
    fs.writeFileSync(filePath, fileContent);

    // Envia o arquivo como resposta
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Arquivo criado com sucesso!',
        fileName: 'output.txt',
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao criar o arquivo', error }),
    };
  }
};
