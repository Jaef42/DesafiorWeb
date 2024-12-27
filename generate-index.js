import { readdir, writeFileSync, lstatSync } from 'fs';
import { join } from 'path';

const directoryPath = join('.', '.');

readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    let content = `
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
        <ul>
    `;

    files.forEach(function (file) {
        const filePath = join(directoryPath, file);
        const isDirectory = lstatSync(filePath).isDirectory();

        if (isDirectory) {
            content += `<li><a href="./${file}/">${file}/</a></li>\n`;
        } else {
            content += `<li><a href="./${file}">${file}</a></li>\n`;
        }
    });

    content += `
        </ul>
    </body>
    </html>
    `;

    writeFileSync('index.html', content);
});
