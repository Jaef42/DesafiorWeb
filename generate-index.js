import { readdirSync, writeFileSync, lstatSync, readFileSync } from 'fs';
import { join } from 'path';

function generateIndex(directoryPath, basePath = '') {
    let content = '<ul>\n';

    const files = readdirSync(directoryPath);

    files.forEach(file => {
        const fullPath = join(directoryPath, file);
        const relativePath = join(basePath, file);
        const isDirectory = lstatSync(fullPath).isDirectory();

        if (isDirectory) {
            content += `<li><a href="#${relativePath}">${file}/</a></li>\n`;
            content += generateIndex(fullPath, relativePath);  // Recursivamente agrega el contenido de la carpeta
        } else {
            content += `<li><a href="#${relativePath}">${file}</a></li>\n`;

            // Si es un archivo JavaScript, muestra su contenido
            if (file.endsWith('.js')) {
                const fileContent = readFileSync(fullPath, 'utf-8');
                content += `
                <div id="${relativePath}">
                    <h3>${file}</h3>
                    <pre><code>${escapeHtml(fileContent)}</code></pre>
                </div>
                `;
            }
        }
    });

    content += '</ul>\n';
    return content;
}

// Función para escapar caracteres HTML
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

const directoryPath = join('.', 'src');  // Cambia la ruta aquí si quieres listar otra carpeta
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
        pre {
            text-align: left;
            background-color: #e0e0e0;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
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
