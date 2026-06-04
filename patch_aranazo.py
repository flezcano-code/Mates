import re

with open("pokemon.html", "r", encoding="utf-8") as f:
    content = f.read()

# Replace aranazo and garra_dragon block
aranazo_match = re.search(r"case 'aranazo':\s*case 'garra_dragon':.*?break;", content, re.DOTALL)
if aranazo_match:
    aranazo_new = """case 'aranazo':
          case 'garra_dragon':
            animarSecuencia(300, 250, 500, 400, `translate(${dxTotal*0.75}px, ${dyTotal*0.75}px)`, 'ease-out', () => {
              explosionImpactoDemo(false);
              slashCorte(atk==='garra_dragon'?'#00e676':'#fff', 2);
              if(atk==='garra_dragon') flashFisico('#00e676');
            });
            break;"""
    content = content.replace(aranazo_match.group(0), aranazo_new)

with open("pokemon.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Aranazo patch applied.")
