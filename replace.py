import re

with open('pokemon.html', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'function animarAtaqueAliado.*?function animarRetornoPokebolaEnemigo', re.DOTALL)

replacement = '''function animarAtaqueAliado(power = 'normal', callback = null) {
        const pSprite = document.getElementById('playerSprite')
        const eSprite = document.getElementById('enemySprite')
        const bf = document.getElementById('battlefield')
        if (!pSprite || !bf || !eSprite) {
          if (callback) callback()
          return
        }

        const bfRect = bf.getBoundingClientRect()
        const spRect = pSprite.getBoundingClientRect()
        const er = eSprite.getBoundingClientRect()
        
        const sx = spRect.left - bfRect.left + spRect.width * 0.5
        const sy = spRect.top - bfRect.top + spRect.height * 0.5
        const ex = er.left - bfRect.left + er.width * 0.5
        const ey = er.top - bfRect.top + er.height * 0.5
        const dxTotal = ex - sx
        const dyTotal = ey - sy
        
        const src = pSprite.src.split('/').pop().toLowerCase()
        let ataques = ['placaje']
        
        if (src.includes('pikachu') || src.includes('pichu')) {
          ataques = ['ataque_rapido', 'electrobola', 'chispa', 'cola_ferrea', 'placaje_electrico']
        } else if (src.includes('raichu')) {
          ataques = ['chispa', 'electrobola', 'ataque_rapido', 'cola_electrica', 'descarga']
        } else if (src.includes('squirtle') || src.includes('totodile') || src.includes('mudkip')) {
          ataques = ['burbujas', 'pistola_agua_debil', 'placaje', 'giro_caparazon', 'salpicadura_acuatica']
        } else if (src.includes('wartortle') || src.includes('croconaw') || src.includes('marshtomp')) {
          ataques = ['burbujas', 'coletazo', 'pistola_agua', 'giro_caparazon', 'golpe_acuatico']
        } else if (src.includes('blastoise') || src.includes('feraligatr') || src.includes('swampert')) {
          ataques = ['mini_hidrobomba', 'placaje_pesado', 'disparo_agua', 'golpe_caparazon', 'explosion_acuatica']
        } else if (src.includes('charmander') || src.includes('cyndaquil')) {
          ataques = ['aranazo', 'mordisco', 'cola_ardiente', 'mini_ascuas', 'empujon_igneo']
        } else if (src.includes('charmeleon') || src.includes('quilava')) {
          ataques = ['garra_dragon', 'zarpazo', 'mordisco', 'cola_ardiente', 'mini_lanzallamas']
        } else if (src.includes('charizard') || src.includes('typhlosion')) {
          ataques = ['golpe_ala', 'zarpazo', 'embestida_aerea', 'aliento_fuego', 'cola_ignea']
        } else if (src.includes('bulbasaur') || src.includes('chikorita') || src.includes('treecko')) {
          ataques = ['latigo_cepa', 'hojas_rapidas', 'raices', 'semillas', 'placaje']
        } else if (src.includes('ivysaur') || src.includes('bayleef') || src.includes('grovyle') || src.includes('venusaur') || src.includes('meganium') || src.includes('sceptile')) {
          ataques = ['latigo_cepa', 'hojas_rapidas', 'raices', 'semillas', 'placaje']
        } else if (src.includes('torchic') || src.includes('combusken') || src.includes('blaziken')) {
          ataques = ['dash_golpe', 'dash_patada', 'embestida']
        }

        const atk = pick(ataques)
        pSprite.classList.remove('ally-attack-surge', 'ally-attack-crit', 'atk-dash')
        
        function addEl(css, z = 22) {
          const el = document.createElement('div')
          el.style.cssText = position:absolute;pointer-events:none;z-index:; + css
          bf.appendChild(el)
          return el
        }
        
        function finalizar() {
          setTimeout(() => { if (callback) callback() }, 100)
        }

        // DRAMATISMO: Tiempos largos, 1.2s - 2.0s
        function animarSecuencia(prepDur, dashDur, holdDur, returnDur, dashTransform, dashBezier, customImpact = null) {
          const total = prepDur + dashDur + holdDur + returnDur;
          pSprite.animate([
            { transform: 'translate(0,0) scale(1)' },
            { transform: 'translate(-12px, 8px) scale(0.9)', offset: prepDur / total },
            { transform: dashTransform, offset: (prepDur + dashDur) / total },
            { transform: dashTransform, offset: (prepDur + dashDur + holdDur) / total },
            { transform: 'translate(0,0) scale(1)' }
          ], { duration: total, easing: dashBezier || 'cubic-bezier(.2,.9,.2,1)', fill: 'none' });

          if (customImpact) {
            setTimeout(customImpact, prepDur + dashDur * 0.85);
          }
          setTimeout(finalizar, total);
        }

        const fisicos = ['placaje', 'ataque_rapido', 'placaje_electrico', 'giro_caparazon', 'golpe_acuatico', 'placaje_pesado', 'golpe_caparazon', 'empujon_igneo', 'embestida', 'embestida_aerea', 'dash_golpe', 'dash_patada'];
        const cortes = ['aranazo', 'mordisco', 'zarpazo', 'garra_dragon', 'golpe_ala', 'cola_ferrea', 'cola_electrica', 'coletazo', 'cola_ardiente', 'cola_ignea'];
        const proyectil_agua = ['burbujas', 'pistola_agua_debil', 'salpicadura_acuatica', 'pistola_agua', 'mini_hidrobomba', 'disparo_agua', 'explosion_acuatica'];
        const proyectil_fuego = ['mini_ascuas', 'mini_lanzallamas', 'aliento_fuego'];
        const proyectil_electrico = ['electrobola', 'chispa', 'descarga'];
        const proyectil_planta = ['latigo_cepa', 'hojas_rapidas', 'raices', 'semillas'];

        // TIEMPOS CAVE: Prep 300ms, Dash 350ms, Hold/Impact 400ms, Return 400ms = 1450ms Total.
        const tPrep = 300, tDash = 350, tHold = 450, tRet = 400;

        if (fisicos.includes(atk)) {
          let flashColor = '#fff';
          if (atk.includes('electrico')) flashColor = '#ffeb3b';
          if (atk.includes('igneo')) flashColor = '#ff9800';
          if (atk.includes('acuatico') || atk.includes('caparazon')) flashColor = '#29b6f6';

          animarSecuencia(tPrep, tDash, tHold, tRet, 	ranslate(px, px) , 'ease-in', () => {
            const flash = addEl(left:px;top:px;width:120px;height:120px;background:radial-gradient(circle,#fff,,transparent);border-radius:50%;);
            flash.animate([{transform:'scale(0.5)', opacity:0.8}, {transform:'scale(2)', opacity:0}], {duration: 500, fill:'forwards'});
            setTimeout(()=>flash.remove(), 550);
          });
        }
        else if (cortes.includes(atk)) {
          animarSecuencia(tPrep, 300, 500, tRet, 	ranslate(px, px), 'ease-out', () => {
             for(let i=0; i<3; i++) {
               let colorCorte = '#fff';
               if(atk.includes('ardiente') || atk.includes('ignea')) colorCorte = '#ff5722';
               if(atk.includes('electrica')) colorCorte = '#ffeb3b';
               
               const slash = addEl(left:px;top:px;width:70px;height:4px;background:;box-shadow:0 0 8px ;transform:rotate(-45deg););
               slash.animate([{transform:'rotate(-45deg) scaleX(0)', opacity:1}, {transform:'rotate(-45deg) scaleX(1)', opacity:0}], {duration:300, fill:'forwards'});
               setTimeout(()=>slash.remove(), 350);
             }
          });
        }
        else if (proyectil_agua.includes(atk)) {
          animarSecuencia(350, 200, 450, tRet, 	ranslate(10px, -5px), 'ease-out', () => {
             for(let i=0; i<8; i++) {
               setTimeout(() => {
                 const drop = addEl(left:px;top:px;width:25px;height:25px;border-radius:50%;background:radial-gradient(circle at 30% 30%, #fff, #4fc3f7, #0288d1);box-shadow:0 0 5px rgba(0,0,0,0.2););
                 const offset = (Math.random() - 0.5) * 60;
                 drop.animate([
                   {transform: 'translate(0,0) scale(0.5)', opacity: 0.9},
                   {transform: 	ranslate(px, px) scale(1.3), opacity: 0.9}
                 ], {duration: 400 + Math.random()*200, easing: 'ease-in', fill: 'forwards'});
                 setTimeout(() => {
                   drop.remove();
                   const pop = addEl(left:px;top:px;width:40px;height:40px;border-radius:50%;border:2px solid #81d4fa;);
                   pop.animate([{transform:'scale(0.5)', opacity:1}, {transform:'scale(1.8)', opacity:0}], {duration:250, fill:'forwards'});
                   setTimeout(()=>pop.remove(), 300);
                 }, 450);
               }, i * 40);
             }
          });
        }
        else if (proyectil_fuego.includes(atk)) {
          animarSecuencia(350, 200, 450, tRet, 	ranslate(-5px, -5px), 'ease-out', () => {
             for(let i=0; i<10; i++) {
               setTimeout(() => {
                 const asc = addEl(left:px;top:px;width:20px;height:20px;background:radial-gradient(circle, #fff, #ff9800, #f44336);border-radius:50%;box-shadow:0 0 10px #ff5722;);
                 const off = (Math.random() - 0.5) * 60;
                 asc.animate([
                   {transform: 'translate(0,0) scale(0.5)', opacity: 0.9},
                   {transform: 	ranslate(px, px) scale(1.3), opacity: 0.8}
                 ], {duration: 400 + Math.random()*150, easing: 'ease-in', fill: 'forwards'});
                 setTimeout(() => {
                   asc.remove();
                   const br = addEl(left:px;top:px;width:40px;height:40px;background:radial-gradient(circle, #fff, #ff5722, transparent);border-radius:50%;);
                   br.animate([{transform:'scale(0.5)', opacity:1}, {transform:'scale(1.5)', opacity:0}], {duration:300, fill:'forwards'});
                   setTimeout(()=>br.remove(), 350);
                 }, 450);
               }, i * 35);
             }
          });
        }
        else if (proyectil_electrico.includes(atk)) {
          animarSecuencia(350, 150, 500, tRet, 	ranslate(-5px, -10px), 'ease-out', () => {
             for(let z=0; z<4; z++) {
               setTimeout(() => {
                 const bolt = addEl(left:px;top:px;width:6px;height:30px;background:#fff;box-shadow:0 0 10px #ffeb3b;transform-origin:top center;);
                 const angle = Math.atan2(dyTotal, dxTotal) * 180 / Math.PI;
                 const dist = Math.hypot(dxTotal, dyTotal);
                 bolt.animate([
                   {height:'30px', transform:otate(deg) translateY(0px), opacity:1},
                   {height:'100px', transform:otate(deg) translateY(px), opacity:0.8},
                   {height:'30px', transform:otate(deg) translateY(px), opacity:0}
                 ], {duration: 400, fill:'forwards'});
                 setTimeout(()=>bolt.remove(), 450);
               }, z * 90);
             }
             setTimeout(() => {
               const boom = addEl(left:px;top:px;width:100px;height:100px;background:radial-gradient(circle,#fff,#ffeb3b,transparent);border-radius:50%;);
               boom.animate([{transform:'scale(0.3)', opacity:1}, {transform:'scale(1.5)', opacity:0}], {duration: 400, fill:'forwards'});
               setTimeout(()=>boom.remove(), 450);
             }, 300);
          });
        }
        else if (proyectil_planta.includes(atk)) {
          animarSecuencia(350, 200, 450, tRet, 	ranslate(10px, 0), 'ease-out', () => {
             for(let i=0; i<6; i++) {
               setTimeout(() => {
                 const obj = addEl(left:px;top:px;width:25px;height:15px;background:linear-gradient(135deg, #aed581, #4caf50);border-radius:80% 0 80% 0;);
                 const curveY = (Math.random() - 0.5) * 100;
                 obj.animate([
                   {transform: 'translate(0,0) rotate(0deg) scale(0.6)', opacity: 1},
                   {transform: 	ranslate(px, px) rotate(360deg) scale(1.2), offset: 0.5},
                   {transform: 	ranslate(px, px) rotate(720deg) scale(0.9), opacity: 0.9}
                 ], {duration: 500, easing: 'ease-in-out', fill: 'forwards'});
                 setTimeout(() => {
                   obj.remove();
                   const hit = addEl(left:px;top:px;width:40px;height:40px;background:radial-gradient(circle,#fff,#4caf50,transparent);border-radius:50%;);
                   hit.animate([{transform:'scale(0.5)', opacity:1}, {transform:'scale(1.5)', opacity:0}], {duration:300, fill:'forwards'});
                   setTimeout(()=>hit.remove(), 350);
                 }, 500);
               }, i * 60);
             }
          });
        } else {
          // Fallback
          animarSecuencia(tPrep, tDash, tHold, tRet, 	ranslate(px, px), 'cubic-bezier(.3,.8,.2,1)', () => {
            const hit = addEl(left:px;top:px;width:100px;height:100px;background:radial-gradient(circle,#fff,transparent);border-radius:50%;);
            hit.animate([{transform:'scale(0.3)', opacity:1}, {transform:'scale(1.3)', opacity:0}], {duration: 300, fill:'forwards'});
            setTimeout(()=>hit.remove(), 350);
          });
        }
      }

      function animarRetornoPokebolaEnemigo'''

if content != re.sub(pattern, lambda m: replacement, content):
    with open('pokemon.html', 'w', encoding='utf-8') as f:
        f.write(re.sub(pattern, lambda m: replacement, content))
    print('Replaced successfully')
else:
    print('Pattern not found or identical')
