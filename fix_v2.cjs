const fs = require('fs');

const filePath = 'pokemon.html';
let content = fs.readFileSync(filePath, 'utf-8');

// Búsqueda más flexible: encontrar el bloque de plantillas2Suma original
const pattern1 = /const plantillas2Suma = \[\s*\(p, e, a, b\) => `\$\{p\} lanzó \$\{a\} \$\{e\} y luego lanzó \$\{b\} más contra el rival\. ¿Cuántas tiene ahora\?\`,\s*\(p, e, a, b\) => `\$\{p\} reunió \$\{a\} \$\{e\} durante el combate y encontró \$\{b\} más\. ¿Cuál es el total\?\`,\s*\(p, e, a, b\) => `\$\{p\} tiene \$\{a\} \$\{e\} y su aliado le da \$\{b\} extras\. ¿Cuántas son en total\?\`,\s*\(p, e, a, b\) => `\$\{p\} cargó \$\{a\} \$\{e\} antes de usar su habilidad y consiguió \$\{b\} más\. ¿Cuánto suma\?\`\s*\];/;

const replacement1 = `const plantillas2Suma = [
            (p, e, a, b) => \`\${p} reunió \${a} \${e} y encontró \${b} más. ¿Cuántas consiguió en total?\`,
            (p, e, a, b) => \`\${p} cargó \${a} \${e} y su aliado le dio \${b} extras. ¿Cuántas tiene ahora?\`,
            (p, e, a, b) => \`\${p} obtuvo \${a} \${e} durante el entrenamiento y ganó \${b} más. ¿Cuál es el total?\`,
            (p, e, a, b) => \`\${p} recibió \${a} \${e} y luego consiguió \${b} adicionales. ¿Cuántas acumuló?\`,
            (p, e, a, b) => \`\${p} acumuló \${a} \${e} antes de la batalla y encontró \${b} más. ¿Cuánto suma?\`,
            (p, e, a, b) => \`\${p} juntó \${a} \${e} en el gimnasio y obtuvo \${b} extra. ¿Cuántas tiene en total?\`
          ];`;

if (!content.includes('reunió') || !content.includes('usó ${b} en el ataque')) {
  // Hacer el reemplazo
  content = content.replace(pattern1, replacement1);
  console.log('Reemplazando plantillas2Suma...');
}

// Patrón para plantillas2Resta
const pattern2 = /const plantillas2Resta = \[\s*\(p, e, a, b\) => `\$\{p\} tenía \$\{a\} \$\{e\} y gastó \$\{b\} en su ataque\. ¿Cuántas quedan\?\`,\s*\(p, e, a, b\) => `\$\{p\} tenía \$\{a\} \$\{e\} y el enemigo le quitó \$\{b\}\. ¿Cuántas conserva\?\`,\s*\(p, e, a, b\) => `\$\{p\} perdió \$\{b\} \$\{e\} tras defenderse\. Si tenía \$\{a\}, ¿qué queda\?\`,\s*\(p, e, a, b\) => `\$\{p\} tenía \$\{a\} \$\{e\} y usó \$\{b\} para defenderse\. ¿Cuántas quedan\?\`\s*\];/;

const replacement2 = `const plantillas2Resta = [
            (p, e, a, b) => \`\${p} tenía \${a} \${e} y usó \${b} en el ataque. ¿Cuántas le quedan?\`,
            (p, e, a, b) => \`\${p} cargó \${a} \${e} pero perdió \${b} tras defenderse. ¿Cuántas conserva?\`,
            (p, e, a, b) => \`\${p} reunió \${a} \${e} y gastó \${b} para recuperarse. ¿Cuántas quedan?\`,
            (p, e, a, b) => \`\${p} tenía \${a} \${e} y el rival le quitó \${b}. ¿Cuántas le sobran?\`,
            (p, e, a, b) => \`\${p} acumuló \${a} \${e} pero lanzó \${b} en su defensa. ¿Cuánto le resta?\`,
            (p, e, a, b) => \`\${p} obtuvo \${a} \${e} pero consumió \${b} en el combate. ¿Cuál es el balance?\`
          ];`;

if (!content.includes('usó ${b} en el ataque')) {
  content = content.replace(pattern2, replacement2);
  console.log('Reemplazando plantillas2Resta...');
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('✅ Plantillas actualizadas');
