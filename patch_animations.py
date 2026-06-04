import re

with open("pokemon.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Swap abilities
content = content.replace('"charizard_back.png": { nombre: "Anillo Ígneo 🌋", daño: 18, tipo: "fire" }', 
                          '"charizard_back.png": { nombre: "Sofoco 🌋", daño: 28, tipo: "fire" }')
content = content.replace('"charizard_back.png": { nombre: "Anillo gneo ??", dao: 18, tipo: "fire" }', 
                          '"charizard_back.png": { nombre: "Sofoco ??", dao: 28, tipo: "fire" }')

content = content.replace('"typhlosion_back.png": { nombre: "Sofoco 🌋", daño: 28, tipo: "fire" }', 
                          '"typhlosion_back.png": { nombre: "Erupción 🌋", daño: 28, tipo: "fire" }')
content = content.replace('"typhlosion_back.png": { nombre: "Sofoco ??", dao: 28, tipo: "fire" }', 
                          '"typhlosion_back.png": { nombre: "Erupción ??", dao: 28, tipo: "fire" }')

# Fix arrays if needed
content = content.replace("typhlosion: ['Sofoco', 'Llamarada']", "typhlosion: ['Erupción', 'Llamarada']")

# 2. Add explosionImpactoDemo helper inside realizarAtaque
# Let's inject it after `const flashFisico = ...`

helper_code = """
        const explosionImpactoDemo = (isUltimate = false) => {
            slashCorte('#ff5722', 2);
            const flash = addEl(`left:0;top:0;width:100%;height:100%;background:rgba(255,87,34,0.5);mix-blend-mode:overlay;z-index:40;`);
            flash.animate([{opacity:0.7},{opacity:0,offset:0.3},{opacity:0.45,offset:0.6},{opacity:0}], {duration:300});
            setTimeout(()=>flash.remove(), 300);
            shakeLocal(300, isUltimate ? 20 : 12);
            const boom = addEl(`left:${ex-60}px;top:${ey-60}px;width:120px;height:120px;background:radial-gradient(circle, #fff 10%, #ff5722 40%, transparent 70%);border-radius:50%;`);
            boom.animate([{transform:'scale(0.5)', opacity:1},{transform:`translate(${dxTotal*0.2}px,${dyTotal*0.2}px) scale(2)`, opacity:0}], {duration:400, fill:'forwards'});
            setTimeout(()=>boom.remove(), 450);
            for(let i=0;i<(isUltimate?30:15);i++) {
                setTimeout(() => {
                    const size = 3+Math.random()*5;
                    const rX = ex + (Math.random()-0.5)*120;
                    const rY = ey + (Math.random()-0.5)*120;
                    const br = addEl(`left:${rX}px;top:${rY}px;width:${size}px;height:${size}px;background:#ff9800;border-radius:50%;box-shadow:0 0 ${size*2}px #ff5722;`);
                    br.animate([{transform:'translate(0,0) scale(1)', opacity:1}, {transform:`translate(${(Math.random()-0.5)*100}px,-${30+Math.random()*80}px) scale(0)`, opacity:0}], {duration:500+Math.random()*800, easing:'ease-out'});
                    setTimeout(()=>br.remove(), 1400);
                }, Math.random()*600);
            }
            for(let i=0;i<8;i++) {
                setTimeout(() => {
                    const rX = ex + (Math.random()-0.5)*80;
                    const rY = ey + (Math.random()-0.5)*80;
                    const size = 18+Math.random()*36;
                    const sm = addEl(`left:${rX-size/2}px;top:${rY-size/2}px;width:${size}px;height:${size}px;background:radial-gradient(circle, rgba(30,30,30,0.82), transparent);border-radius:50%;filter:blur(4px);mix-blend-mode:multiply;`);
                    sm.animate([{transform:'scale(0.4)', opacity:0.85}, {transform:`translate(${(Math.random()-0.5)*48}px,-${44+Math.random()*50}px) scale(1.6)`, opacity:0}], {duration:620+Math.random()*580});
                    setTimeout(()=>sm.remove(), 1320);
                }, Math.random()*500);
            }
            eSprite.animate([{filter:'brightness(1)'}, {filter:'brightness(4) saturate(0)', offset:0.15}, {filter:'brightness(1)'}], {duration:400});
        };
"""

if "const explosionImpactoDemo" not in content:
    content = content.replace("const flashFisico = (color = '#fff') => {", helper_code + "\n        const flashFisico = (color = '#fff') => {")


# 3. Rewrite physical attacks in realizarAtaque
# Replace 'cola_ardiente' block
cola_match = re.search(r"case 'cola_ardiente':.*?break;", content, re.DOTALL)
if cola_match:
    cola_new = """case 'cola_ardiente':
          case 'cola_ignea':
          case 'golpe_igneo':
          case 'golpe_fuego':
            {
              const isMegaHeavy = atk === 'cola_ignea' || atk === 'golpe_igneo';
              for(let i=0;i<5;i++) {
                setTimeout(() => {
                  const b = addEl(`left:${sx+(Math.random()-0.5)*40}px;top:${sy+30}px;width:6px;height:6px;background:#ff9800;border-radius:50%;box-shadow:0 0 5px #ff5722;`);
                  b.animate([{transform:'translate(0,0)'},{transform:`translate(0,-30px) scale(0)`}], {duration:400});
                  setTimeout(()=>b.remove(), 400);
                }, i*50);
              }
              const midX = dxTotal * 0.5;
              const midY = dyTotal * 0.5 - 150;
              pSprite.style.transition = 'none';
              pSprite.style.transform = '';
              const cal = window.battleSandboxOpen ? (window.battleSandboxCalibration || {}) : {};
              const tail = window.battleSandboxOpen ? ` scale(${cal.scale || 1}) rotate(${cal.rotation || 0}deg)` : '';
              const totalDur = isMegaHeavy ? 1500 : 1200;
              
              // NO GIRO (NO ROTATE)
              pSprite.animate([
                { transform: 'translate(0,0) scale(1)' + tail, offset: 0 },
                { transform: 'translate(0, 10px) scale(1.1, 0.9)' + tail, offset: 0.15 },
                { transform: `translate(${midX}px, ${midY}px)` + tail, offset: 0.40 },
                { transform: `translate(${midX}px, ${midY - 5}px)` + tail, offset: 0.55 },
                { transform: `translate(${dxTotal*0.8}px, ${dyTotal*0.8}px)` + tail, offset: 0.65 },
                { transform: `translate(${dxTotal*0.8}px, ${dyTotal*0.8}px)` + tail, offset: 0.75 },
                { transform: `translate(${midX}px, ${midY - 30}px)` + tail, offset: 0.85 },
                { transform: 'translate(0,0) scale(1)' + tail, offset: 1 }
              ], { duration: totalDur, easing: 'ease-in-out', fill: 'none' });
              
              setTimeout(() => {
                const glow = addEl(`left:${sx+midX-30}px;top:${sy+midY-30}px;width:60px;height:60px;background:radial-gradient(circle, #fff, #ffeb3b, #ff5722, transparent);border-radius:50%;mix-blend-mode:screen;filter:blur(5px);`);
                glow.animate([{transform:'scale(0.5)', opacity:0},{transform:'scale(1.5)', opacity:1},{transform:'scale(0.5)', opacity:0}], {duration: totalDur * 0.15});
                setTimeout(()=>glow.remove(), totalDur * 0.15);
              }, totalDur * 0.40);
              
              setTimeout(() => {
                explosionImpactoDemo(isMegaHeavy);
                if (callback) callback();
              }, totalDur * 0.65);
              
              setTimeout(() => {
                pSprite.style.transform = '';
                pSprite.style.transition = '';
              }, totalDur + 40);
            }
            break;"""
    content = content.replace(cola_match.group(0), cola_new)

# Replace Dash attacks block
dash_match = re.search(r"case 'patada_rapida':.*?break;", content, re.DOTALL)
if dash_match:
    dash_new = """case 'patada_rapida':
          case 'dash_patada':
          case 'nitrocarga':
          case 'embestida_ignea':
          case 'patada_ignea':
          case 'gancho_alto':
            {
              const isUltimate = atk === 'patada_ignea' || atk === 'nitrocarga';
              const isUppercut = atk === 'gancho_alto';
              const totalDur = isUltimate ? 1000 : 700;
              pSprite.style.transition = 'none';
              pSprite.style.transform = '';
              
              shakeLocal(300, 5);
              if (isUltimate) {
                const chargeAura = addEl(`left:${sx-50}px;top:${sy-50}px;width:100px;height:100px;border-radius:50%;background:radial-gradient(circle, #ffeb3b, #ff5722, transparent);mix-blend-mode:screen;`);
                chargeAura.animate([{transform:'scale(0.5)', opacity:0},{transform:'scale(1.5)', opacity:0.8},{transform:'scale(2)', opacity:0}], {duration:400});
                setTimeout(()=>chargeAura.remove(), 400);
                for(let i=0;i<8;i++) {
                  const p = addEl(`left:${sx-40}px;top:${sy-40}px;width:80px;height:80px;border:2px dashed #ff5722;border-radius:50%;`);
                  p.animate([{transform:`rotate(${i*45}deg) scale(0)`},{transform:`rotate(${i*45 + 360}deg) scale(1)`},{transform:`rotate(${i*45 + 720}deg) scale(0)`}], {duration:600});
                  setTimeout(()=>p.remove(), 600);
                }
              }
              
              const dashStart = isUltimate ? 400 : 200;
              
              // Animación de dash
              pSprite.animate([
                { transform: 'translate(0,0) scale(1)', offset: 0 },
                { transform: 'translate(-20px, 10px) scale(0.9, 1.1) skewX(10deg)', offset: dashStart / totalDur },
                { transform: `translate(${dxTotal*0.4}px, ${dyTotal*0.4}px) scale(1.5, 0.2)`, opacity: 0.2, offset: (dashStart+30) / totalDur },
                { transform: `translate(${dxTotal*0.8}px, ${dyTotal*0.8}px) scale(1.2) skewX(-20deg)`, opacity: 1, offset: (dashStart+100) / totalDur },
                { transform: `translate(${dxTotal*0.8}px, ${dyTotal*0.8}px) scale(1.2) skewX(-20deg)`, offset: (dashStart+250) / totalDur },
                { transform: 'translate(0,0) scale(1)', offset: 1 }
              ], { duration: totalDur, easing: 'ease-in-out', fill: 'none' });
              
              setTimeout(() => {
                const blur = addEl(`left:${sx}px;top:${sy-20}px;width:${Math.hypot(dxTotal,dyTotal)*0.9}px;height:40px;background:linear-gradient(90deg, transparent, #ff9800, #ff5722, #fff);transform-origin:left center;transform:rotate(${Math.atan2(dyTotal, dxTotal)}rad);mix-blend-mode:screen;filter:blur(5px);`);
                blur.animate([{opacity:0, transform:blur.style.transform+' scaleX(0)'},{opacity:0.8, transform:blur.style.transform+' scaleX(1)'},{opacity:0, transform:blur.style.transform+' scaleX(1)'}], {duration:150});
                setTimeout(()=>blur.remove(), 150);
              }, dashStart);
              
              setTimeout(() => {
                explosionImpactoDemo(isUltimate);
                if (isUppercut) {
                  eSprite.animate([{transform:'translate(0,0)'},{transform:'translate(0,-40px)'},{transform:'translate(0,0)'}], {duration:400});
                }
                if (callback) callback();
              }, dashStart+100);
              
              setTimeout(() => {
                pSprite.style.transform = '';
                pSprite.style.transition = '';
              }, totalDur + 40);
            }
            break;"""
    content = content.replace(dash_match.group(0), dash_new)

# Add Erupcion and Sofoco in lanzarHabilidadVisual
# Search for `if (['lanzallamas', 'sofoco'].includes(habilidadNorm))`
content = content.replace("['lanzallamas', 'sofoco'].includes(habilidadNorm)", "['lanzallamas'].includes(habilidadNorm)")

erupcion_logic = """
          } else if (habilidadNorm === 'erupcion' || habilidadNorm === 'erupcin' || habilidadNorm === 'erupción') {
             // 1. Ruge, llamas aumentan
             shakeLocal(400, 5);
             const heat = document.createElement('div');
             heat.style.cssText = `position:absolute;left:${startX-40}px;top:${startY-40}px;width:80px;height:80px;border-radius:50%;background:rgba(255,87,34,0.4);filter:blur(8px);z-index:10;`;
             bf.appendChild(heat);
             heat.animate([{transform:'scale(1)',opacity:0.5},{transform:'scale(3)',opacity:0}],{duration:600});
             setTimeout(()=>heat.remove(), 600);
             
             // 2. Grietas y brasas desde abajo
             setTimeout(() => {
               shakeLocal(600, 8);
               const crack = document.createElement('div');
               crack.style.cssText = `position:absolute;left:0;bottom:0;width:100%;height:60px;background:radial-gradient(ellipse at bottom, rgba(255,87,34,0.6) 0%, transparent 60%);z-index:5;`;
               bf.appendChild(crack);
               crack.animate([{opacity:0},{opacity:1},{opacity:0}], {duration:1500});
               setTimeout(()=>crack.remove(), 1500);
               
               for(let i=0;i<15;i++) {
                  const br = document.createElement('div');
                  br.style.cssText = `position:absolute;left:${Math.random()*100}%;bottom:10px;width:6px;height:6px;background:#ff9800;border-radius:50%;box-shadow:0 0 10px #ff5722;z-index:20;`;
                  bf.appendChild(br);
                  br.animate([{transform:'translateY(0)'},{transform:`translateY(-${100+Math.random()*100}px)`}], {duration:800+Math.random()*400});
                  setTimeout(()=>br.remove(), 1200);
               }
             }, 600);
             
             // 3. Columna de fuego hacia arriba
             setTimeout(() => {
               shakeLocal(800, 25);
               const col = document.createElement('div');
               col.style.cssText = `position:absolute;left:${startX-60}px;bottom:0;width:120px;height:0;background:linear-gradient(to top, #fff, #ffeb3b, #ff5722, transparent);box-shadow:0 0 40px #ff5722;z-index:25;mix-blend-mode:screen;`;
               bf.appendChild(col);
               col.animate([{height:'0', opacity:1}, {height:'300px', opacity:1, offset:0.3}, {height:'300px', opacity:0.8, offset:0.8}, {height:'300px', opacity:0}], {duration:1000, fill:'forwards'});
               setTimeout(()=>col.remove(), 1000);
               
               // Impacto global visual (Erupción)
               const flash = document.createElement('div');
               flash.style.cssText = `position:absolute;inset:0;background:rgba(255,87,34,0.5);mix-blend-mode:overlay;z-index:40;`;
               bf.appendChild(flash);
               flash.animate([{opacity:1},{opacity:0}],{duration:600});
               setTimeout(()=>flash.remove(), 600);
               
             }, 1200);
             
             // 6. Meteoros cayendo sobre el enemigo
             setTimeout(() => {
               for(let i=0;i<12;i++) {
                 setTimeout(() => {
                   const meteoro = document.createElement('div');
                   const rX = endX + (Math.random()-0.5)*150;
                   meteoro.style.cssText = `position:absolute;left:${rX}px;top:-50px;width:20px;height:40px;background:linear-gradient(to bottom, transparent, #ff9800, #fff);border-radius:50%;box-shadow:0 0 15px #ff5722;z-index:30;`;
                   bf.appendChild(meteoro);
                   const rY = endY + (Math.random()-0.5)*50;
                   meteoro.animate([
                     {transform:'translate(0,0)'},
                     {transform:`translate(${endX-rX + (Math.random()-0.5)*40}px, ${rY+50}px)`}
                   ], {duration:400});
                   
                   setTimeout(() => {
                     meteoro.remove();
                     // IMPACTO METEORO
                     const imp = document.createElement('div');
                     imp.style.cssText = `position:absolute;left:${rX-30}px;top:${rY-30}px;width:60px;height:60px;background:radial-gradient(circle, #fff, #ff5722, transparent);border-radius:50%;mix-blend-mode:screen;z-index:28;`;
                     bf.appendChild(imp);
                     imp.animate([{transform:'scale(0.5)', opacity:1},{transform:'scale(2)', opacity:0}],{duration:300});
                     setTimeout(()=>imp.remove(), 300);
                     shakeLocal(200, 10);
                   }, 380);
                   
                 }, i*80);
               }
               
               setTimeout(() => {
                 finalizar();
               }, 1200);
             }, 2000);
             
             return; // Finalizamos el control aquí
"""

if "habilidadNorm === 'erupcion'" not in content:
    content = content.replace("} else if (habilidadNorm === 'sofoco' ||", "} else if (habilidadNorm === 'erupcion' ||")
    content = content.replace("// === GESTIN DE PROYECTILES Y VFX ===", erupcion_logic + "\n          // === GESTIN DE PROYECTILES Y VFX ===")


# Replace 'zarpazo' single logic to use explosionImpactoDemo too
zarpazo_match = re.search(r"case 'zarpazo':.*?break;", content, re.DOTALL)
if zarpazo_match:
    zarpazo_new = """case 'zarpazo':
            {
              animarSecuencia(300, 200, 400, 300, `translate(${dxTotal*0.75}px, ${dyTotal*0.75}px) scale(1.1) skewX(-10deg)`, 'cubic-bezier(.1,.9,.2,1)', () => {
                explosionImpactoDemo(false);
                for(let i=0; i<3; i++) {
                  setTimeout(() => {
                    const rot = -45 + (i-1)*15;
                    const slash = addEl(`left:${ex-40}px;top:${ey-40 + i*10}px;width:80px;height:8px;background:#fff;box-shadow:0 0 15px #ff5722, 0 0 5px #ff9800;border-radius:4px;transform:rotate(${rot}deg);`);
                    slash.animate([{transform:`rotate(${rot}deg) scaleX(0)`, opacity:1}, {transform:`rotate(${rot}deg) scaleX(1.5)`, opacity:0}], {duration:300, fill:'forwards'});
                    setTimeout(()=>slash.remove(), 350);
                  }, i*50);
                }
              });
            }
            break;"""
    content = content.replace(zarpazo_match.group(0), zarpazo_new)

with open("pokemon.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Patch applied successfully.")
