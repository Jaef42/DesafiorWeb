import { readdirSync, writeFileSync, lstatSync } from 'fs';
import { join } from 'path';

function generateIndex(directoryPath, basePath = '') {
    let content = '<ul>\n';

    const files = readdirSync(directoryPath);

    files.forEach(file => {
        const fullPath = join(directoryPath, file);
        const relativePath = join(basePath, file);
        const isDirectory = lstatSync(fullPath).isDirectory();

        if (isDirectory) {
            content += `<li><a href="./${relativePath}/">${file}/</a></li>\n`;
            content += generateIndex(fullPath, relativePath);  // Recursivamente agrega el contenido de la carpeta
        } else {
            content += `<li><a href="./${relativePath}">${file}</a></li>\n`;
        }
    });

    content += '</ul>\n';
    return content;
}

const directoryPath = join('.', 'src');
let htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Índice de Proyecto</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            text-align: center;
            margin: 0;
            padding: 20px;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            padding: 8px;
        }
        a {
            text-decoration: none;
            color: #333;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <h1>Índice de Proyecto</h1>
`;

htmlContent += generateIndex(directoryPath);
htmlContent += `
</body>
</html>
`;

writeFileSync('index.html', htmlContent);
