import re

with open("pokemon.html", "r", encoding="utf-8") as f:
    content = f.read()

changes = 0

def do_replace(old, new, label):
    global content, changes
    if old in content:
        content = content.replace(old, new, 1)
        changes += 1
        print(f"  [OK] {label}")
    else:
        print(f"  [SKIP] {label} - pattern not found")

print("=== 1. Remove duplicate estallido ===")
do_replace(
    "case 'lanzallamas_debil':\n          case 'estallido':",
    "case 'lanzallamas_debil':",
    "Remove duplicate estallido"
)

print("=== 8. Rewriting nitrocarga VFX ===")
# Use regex to find nitrocarga block
nitro_match = re.search(r"\} else if \(habilidadNorm === 'nitrocarga'\) \{.*?(?=\} else if \(habilidadNorm ===|if \(!omitirProyectiles\))", content, re.DOTALL)
if nitro_match:
    old_nitro = nitro_match.group(0)
    new_nitro = """} else if (habilidadNorm === 'nitrocarga') {
             // NITROCARGA CINEMATOGRÁFICO
             const nitroDark = document.createElement('div');
             nitroDark.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.28);z-index:8;pointer-events:none;';
             bf.appendChild(nitroDark);
             nitroDark.animate([{opacity:0},{opacity:1,offset:0.2},{opacity:1,offset:0.8},{opacity:0}],{duration:1200});
             setTimeout(()=>nitroDark.remove(),1250);
             for(let i=0;i<24;i++){
               setTimeout(()=>{
                 const ang=(i/24)*Math.PI*6;const r=50-(i/24)*30;
                 const fx=startX+Math.cos(ang)*r;const fy=startY+Math.sin(ang)*r*0.6;
                 const flm=document.createElement('div');const sz=10+Math.random()*12;
                 flm.style.cssText=`position:absolute;z-index:20;left:${fx-sz/2}px;top:${fy-sz/2}px;width:${sz}px;height:${sz*1.3}px;background:radial-gradient(circle,#fff,#ff9800,#ff5722);border-radius:50%;box-shadow:0 0 ${sz}px #ff5722;pointer-events:none;`;
                 bf.appendChild(flm);
                 flm.animate([{transform:'scale(0)',opacity:0},{transform:'scale(1.5)',opacity:1,offset:0.5},{transform:'translate(0,-20px) scale(0)',opacity:0}],{duration:350});
                 setTimeout(()=>flm.remove(),350);
               },i*18);
             }
             setTimeout(()=>{
               const glow=document.createElement('div');
               glow.style.cssText=`position:absolute;z-index:18;left:${startX-60}px;top:${startY-60}px;width:120px;height:120px;background:radial-gradient(circle,#ffeb3b,#ff5722,transparent);border-radius:50%;mix-blend-mode:screen;pointer-events:none;`;
               bf.appendChild(glow);
               glow.animate([{transform:'scale(0.5)',opacity:0},{transform:'scale(2)',opacity:0.85},{transform:'scale(2.5)',opacity:0}],{duration:380});
               setTimeout(()=>glow.remove(),380);
             },280);
             setTimeout(()=>{
               for(let i=0;i<20;i++){
                 setTimeout(()=>{
                   const t=i/20;const fx=startX+(endX-startX)*t;const fy=startY+(endY-startY)*t+(Math.random()-0.5)*30;
                   const sz=16+Math.random()*20;const flm=document.createElement('div');
                   flm.style.cssText=`position:absolute;z-index:19;left:${fx-sz/2}px;top:${fy-sz/2}px;width:${sz}px;height:${sz*1.3}px;background:radial-gradient(circle,#fff,#ffeb3b,#ff5722,transparent);border-radius:50%;mix-blend-mode:screen;box-shadow:0 0 15px #ff5722;pointer-events:none;`;
                   bf.appendChild(flm);
                   flm.animate([{transform:'scale(1)',opacity:1},{transform:'translateY(-35px) scale(0)',opacity:0}],{duration:380});
                   setTimeout(()=>flm.remove(),380);
                 },i*12);
               }
               for(let i=0;i<4;i++){
                 setTimeout(()=>{
                   const t=(i+1)/5;const gx=startX+(endX-startX)*t;const gy=startY+(endY-startY)*t;
                   const ghost=document.createElement('div');
                   ghost.style.cssText=`position:absolute;z-index:17;left:${gx-42}px;top:${gy-42}px;width:84px;height:84px;background:radial-gradient(circle,rgba(255,152,0,0.5),transparent);border-radius:50%;filter:blur(3px);pointer-events:none;`;
                   bf.appendChild(ghost);
                   ghost.animate([{opacity:0.6},{opacity:0}],{duration:180});
                   setTimeout(()=>ghost.remove(),180);
                 },i*35);
               }
               for(let i=0;i<14;i++){
                 const line=document.createElement('div');
                 line.style.cssText=`position:absolute;z-index:16;left:${startX-100}px;top:${startY-55+i*8}px;width:${130+Math.random()*100}px;height:3px;background:linear-gradient(90deg,transparent,#ff5722,#ffeb3b,#fff);box-shadow:0 0 10px #ff5722;pointer-events:none;`;
                 bf.appendChild(line);
                 line.animate([{transform:'translateX(0)',opacity:0},{transform:`translateX(${bfRect.width+200}px)`,opacity:1,offset:0.2},{transform:`translateX(${bfRect.width+400}px)`,opacity:0}],{duration:180});
                 setTimeout(()=>line.remove(),180);
               }
             },430);
           \n           """
    content = content.replace(old_nitro, new_nitro)
    changes += 1
    print("  [OK] Rewrite nitrocarga VFX")
else:
    print("  [SKIP] nitrocarga match failed")


print("=== 9. Rewriting rueda de fuego VFX ===")
rueda_match = re.search(r"\} else if \(habilidadNorm === 'rueda fuego'\) \{.*?(?=\} else if \(habilidadNorm ===|if \(!omitirProyectiles\))", content, re.DOTALL)
if rueda_match:
    old_rueda = rueda_match.group(0)
    new_rueda = """} else if (habilidadNorm === 'rueda fuego') {
             // RUEDA DE FUEGO - bola de fuego envolvente
             for(let i=0;i<14;i++){
               setTimeout(()=>{
                 const ang=(i/14)*Math.PI*2;const r=35;
                 const fx=startX+Math.cos(ang)*r;const fy=startY+Math.sin(ang)*r*0.6;
                 const flm=document.createElement('div');const sz=14+Math.random()*10;
                 flm.style.cssText=`position:absolute;z-index:22;left:${fx-sz/2}px;top:${fy-sz/2}px;width:${sz}px;height:${sz*1.3}px;background:radial-gradient(circle,#fff,#ff9800,#ff5722);border-radius:50%;box-shadow:0 0 ${sz}px #ff5722;pointer-events:none;`;
                 bf.appendChild(flm);
                 flm.animate([{transform:'scale(0)',opacity:0},{transform:'scale(1.5)',opacity:1,offset:0.5},{transform:'translate(0,-15px) scale(0)',opacity:0}],{duration:300});
                 setTimeout(()=>flm.remove(),300);
               },i*18);
             }
             setTimeout(()=>{
               const fireball=document.createElement('div');
               fireball.style.cssText=`position:absolute;z-index:24;left:${startX-30}px;top:${startY-30}px;width:60px;height:60px;border-radius:50%;background:radial-gradient(circle,#fff 10%,#ffeb3b 30%,#ff5722 60%,#bf360c 80%);box-shadow:0 0 30px #ff5722,0 0 60px rgba(255,87,34,0.5);pointer-events:none;`;
               bf.appendChild(fireball);
               const dx=endX-startX,dy=endY-startY;
               fireball.animate([
                 {transform:'translate(0,0) rotate(0deg) scale(0.5)',opacity:0},
                 {transform:'translate(0,0) rotate(180deg) scale(1.2)',opacity:1,offset:0.15},
                 {transform:`translate(${dx*0.5}px,${dy*0.5}px) rotate(540deg) scale(1)`,opacity:1,offset:0.5},
                 {transform:`translate(${dx}px,${dy}px) rotate(1080deg) scale(1.3)`,opacity:1,offset:0.85},
                 {transform:`translate(${dx}px,${dy}px) rotate(1080deg) scale(2)`,opacity:0}
               ],{duration:700,easing:'ease-in-out',fill:'forwards'});
               setTimeout(()=>fireball.remove(),750);
               for(let i=0;i<15;i++){
                 setTimeout(()=>{
                   const t=i/15;const tx=startX+dx*t;const ty=startY+dy*t+(Math.random()-0.5)*20;
                   const sz=12+Math.random()*14;const trail=document.createElement('div');
                   trail.style.cssText=`position:absolute;z-index:21;left:${tx-sz/2}px;top:${ty-sz/2}px;width:${sz}px;height:${sz*1.2}px;background:radial-gradient(circle,#ffeb3b,#ff5722,transparent);border-radius:50%;mix-blend-mode:screen;pointer-events:none;`;
                   bf.appendChild(trail);
                   trail.animate([{transform:'scale(1)',opacity:0.9},{transform:'translateY(-25px) scale(0)',opacity:0}],{duration:320});
                   setTimeout(()=>trail.remove(),320);
                 },i*30);
               }
             },250);
             setTimeout(()=>{
               const fl=document.createElement('div');
               fl.style.cssText='position:absolute;inset:0;background:rgba(255,87,34,0.4);mix-blend-mode:overlay;z-index:40;pointer-events:none;';
               bf.appendChild(fl);fl.animate([{opacity:0.7},{opacity:0}],{duration:300});setTimeout(()=>fl.remove(),300);
               for(let s=0;s<2;s++){
                 const rot=-45+s*90;const sl=document.createElement('div');
                 sl.style.cssText=`position:absolute;z-index:30;left:${endX-35}px;top:${endY-35}px;width:70px;height:6px;background:#ff5722;box-shadow:0 0 8px #ff5722;transform:rotate(${rot}deg);pointer-events:none;`;
                 bf.appendChild(sl);sl.animate([{transform:`rotate(${rot}deg) scaleX(0)`,opacity:1},{transform:`rotate(${rot}deg) scaleX(1.5)`,opacity:0}],{duration:300,fill:'forwards'});
                 setTimeout(()=>sl.remove(),350);
               }
               const boom=document.createElement('div');
               boom.style.cssText=`position:absolute;z-index:28;left:${endX-55}px;top:${endY-55}px;width:110px;height:110px;background:radial-gradient(circle,#fff,#ff5722,transparent);border-radius:50%;pointer-events:none;`;
               bf.appendChild(boom);boom.animate([{transform:'scale(0.3)',opacity:1},{transform:'scale(2.5)',opacity:0}],{duration:400});setTimeout(()=>boom.remove(),400);
               for(let i=0;i<14;i++){
                 const esz=4+Math.random()*6;const em=document.createElement('div');
                 em.style.cssText=`position:absolute;z-index:26;left:${endX}px;top:${endY}px;width:${esz}px;height:${esz}px;background:#ff9800;border-radius:50%;box-shadow:0 0 ${esz*2}px #ff5722;pointer-events:none;`;
                 bf.appendChild(em);em.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${(Math.random()-0.5)*100}px,-${30+Math.random()*80}px) scale(0)`,opacity:0}],{duration:500+Math.random()*500,easing:'ease-out'});
                 setTimeout(()=>em.remove(),1100);
               }
               for(let i=0;i<6;i++){
                 const ssz=20+Math.random()*30;const sm=document.createElement('div');
                 sm.style.cssText=`position:absolute;z-index:25;left:${endX+(Math.random()-0.5)*60-ssz/2}px;top:${endY+(Math.random()-0.5)*40-ssz/2}px;width:${ssz}px;height:${ssz}px;background:radial-gradient(circle,rgba(30,30,30,0.7),transparent);border-radius:50%;filter:blur(4px);pointer-events:none;`;
                 bf.appendChild(sm);sm.animate([{transform:'scale(0.4)',opacity:0.8},{transform:'translate(0,-40px) scale(1.8)',opacity:0}],{duration:600+Math.random()*400});
                 setTimeout(()=>sm.remove(),1100);
               }
               bf.style.transition='none';bf.style.transform='translate(12px,8px)';
               setTimeout(()=>{bf.style.transform='translate(-10px,-8px)'},40);
               setTimeout(()=>{bf.style.transform='translate(6px,4px)'},80);
               setTimeout(()=>{bf.style.transform='translate(0,0)'},120);
             },900);
           \n           """
    content = content.replace(old_rueda, new_rueda)
    changes += 1
    print("  [OK] Rewrite rueda de fuego VFX")
else:
    print("  [SKIP] rueda de fuego match failed")


print("=== 10. Adding cinematic VFX blocks ===")

insert_marker = "\n           if (!omitirProyectiles) {"

new_vfx_blocks = """

           } else if (habilidadNorm === 'erupcion') {
             // ERUPCIÓN VOLCÁNICA CINEMATOGRÁFICA
             const erupDark=document.createElement('div');
             erupDark.style.cssText='position:absolute;inset:0;background:rgba(0,0,0,0.55);z-index:8;pointer-events:none;';
             bf.appendChild(erupDark);
             erupDark.animate([{opacity:0},{opacity:1,offset:0.08},{opacity:1,offset:0.88},{opacity:0}],{duration:5000});
             setTimeout(()=>erupDark.remove(),5000);
             // Rugido + llamas espalda
             for(let i=0;i<14;i++){
               setTimeout(()=>{
                 const flm=document.createElement('div');const sz=16+Math.random()*22;
                 flm.style.cssText=`position:absolute;z-index:20;left:${startX+(Math.random()-0.5)*55}px;top:${startY-22}px;width:${sz}px;height:${sz*1.5}px;background:radial-gradient(circle,#fff,#ffeb3b,#ff5722);border-radius:50%;box-shadow:0 0 ${sz}px #ff5722;pointer-events:none;`;
                 bf.appendChild(flm);
                 flm.animate([{transform:'scale(0.5) translateY(0)',opacity:0},{transform:`scale(${1+i*0.1}) translateY(-${30+Math.random()*40}px)`,opacity:1,offset:0.5},{transform:`scale(0) translateY(-${60+Math.random()*40}px)`,opacity:0}],{duration:400+Math.random()*300});
                 setTimeout(()=>flm.remove(),700);
               },i*55);
             }
             // Iluminación roja
             const redL=document.createElement('div');
             redL.style.cssText='position:absolute;inset:0;background:rgba(255,50,0,0.18);z-index:9;pointer-events:none;';
             bf.appendChild(redL);
             redL.animate([{opacity:0},{opacity:1,offset:0.12},{opacity:1,offset:0.82},{opacity:0}],{duration:4500});
             setTimeout(()=>redL.remove(),4500);
             // Grietas + shake progresivo
             setTimeout(()=>{
               let shN=0;const shI=setInterval(()=>{
                 if(shN++>35){clearInterval(shI);bf.style.transform='';return;}
                 const int=Math.min(shN*0.5,16);
                 bf.style.transition='none';bf.style.transform=`translate(${(Math.random()-0.5)*int}px,${(Math.random()-0.5)*int}px)`;
               },28);
               for(let i=0;i<7;i++){
                 setTimeout(()=>{
                   const crack=document.createElement('div');const cx=(Math.random()*0.6+0.2)*bfRect.width;
                   crack.style.cssText=`position:absolute;z-index:12;left:${cx}px;bottom:0;width:3px;height:${30+Math.random()*55}px;background:linear-gradient(to top,#ff5722,#ffeb3b,transparent);box-shadow:0 0 8px #ff5722;pointer-events:none;`;
                   bf.appendChild(crack);
                   crack.animate([{opacity:0,transform:'scaleY(0)'},{opacity:1,transform:'scaleY(1)',offset:0.3},{opacity:0,transform:'scaleY(1)'}],{duration:1500});
                   setTimeout(()=>crack.remove(),1500);
                 },i*90);
               }
               for(let i=0;i<22;i++){
                 setTimeout(()=>{
                   const br=document.createElement('div');const bsz=4+Math.random()*6;
                   br.style.cssText=`position:absolute;z-index:14;left:${Math.random()*bfRect.width}px;bottom:5px;width:${bsz}px;height:${bsz}px;background:#ff9800;border-radius:50%;box-shadow:0 0 8px #ff5722;pointer-events:none;`;
                   bf.appendChild(br);
                   br.animate([{transform:'translateY(0)',opacity:1},{transform:`translateY(-${80+Math.random()*130}px)`,opacity:0}],{duration:600+Math.random()*400});
                   setTimeout(()=>br.remove(),1000);
                 },Math.random()*800);
               }
             },700);
             // Columna vertical
             setTimeout(()=>{
               const col=document.createElement('div');
               col.style.cssText=`position:absolute;z-index:22;left:${startX-55}px;bottom:0;width:110px;height:0;background:linear-gradient(to top,#bf360c,#ff5722,#ffeb3b,#fff);box-shadow:0 0 55px #ff5722,0 0 110px rgba(255,87,34,0.5);pointer-events:none;mix-blend-mode:screen;`;
               bf.appendChild(col);
               col.animate([{height:'0',opacity:1},{height:`${bfRect.height+50}px`,opacity:1,offset:0.28},{height:`${bfRect.height+50}px`,opacity:0.9,offset:0.72},{height:`${bfRect.height+50}px`,opacity:0}],{duration:1200,fill:'forwards'});
               setTimeout(()=>col.remove(),1200);
               const flash=document.createElement('div');
               flash.style.cssText='position:absolute;inset:0;background:rgba(255,200,50,0.6);mix-blend-mode:overlay;z-index:40;pointer-events:none;';
               bf.appendChild(flash);flash.animate([{opacity:1},{opacity:0}],{duration:600});setTimeout(()=>flash.remove(),600);
               bf.style.transform='translate(25px,15px)';
               setTimeout(()=>{bf.style.transform='translate(-20px,-15px)'},50);
               setTimeout(()=>{bf.style.transform='translate(15px,10px)'},100);
               setTimeout(()=>{bf.style.transform='translate(-10px,-8px)'},150);
               setTimeout(()=>{bf.style.transform='translate(0,0)'},200);
             },1500);
             // METEOROS
             setTimeout(()=>{
               const mCount=14;
               for(let i=0;i<mCount;i++){
                 setTimeout(()=>{
                   const isGiant=i===mCount-1;const mx=endX+(Math.random()-0.5)*(isGiant?50:200);
                   const mSz=isGiant?38:(12+Math.random()*18);
                   const met=document.createElement('div');
                   met.style.cssText=`position:absolute;z-index:28;left:${mx}px;top:-60px;width:${mSz}px;height:${mSz*2}px;background:linear-gradient(to bottom,transparent,#ff9800,#fff);border-radius:50%;box-shadow:0 0 ${mSz}px #ff5722;pointer-events:none;`;
                   bf.appendChild(met);
                   const tY=endY+(Math.random()-0.5)*60;
                   met.animate([{transform:'translate(0,0)',opacity:0},{transform:`translate(${(Math.random()-0.5)*30}px,${tY+60}px)`,opacity:1}],{duration:isGiant?500:300+Math.random()*200,easing:'ease-in'});
                   const impD=isGiant?480:280+Math.random()*180;
                   setTimeout(()=>{
                     met.remove();
                     const fl=document.createElement('div');
                     fl.style.cssText=`position:absolute;inset:0;background:rgba(255,${isGiant?'150,0':'87,34'},${isGiant?0.55:0.28});mix-blend-mode:overlay;z-index:40;pointer-events:none;`;
                     bf.appendChild(fl);fl.animate([{opacity:isGiant?0.85:0.5},{opacity:0}],{duration:200});setTimeout(()=>fl.remove(),200);
                     const bSz=isGiant?130:65;const bm=document.createElement('div');
                     bm.style.cssText=`position:absolute;z-index:29;left:${mx-bSz/2}px;top:${tY-bSz/2}px;width:${bSz}px;height:${bSz}px;background:radial-gradient(circle,#fff 10%,#ff5722 40%,transparent 70%);border-radius:50%;pointer-events:none;`;
                     bf.appendChild(bm);bm.animate([{transform:'scale(0.3)',opacity:1},{transform:`scale(${isGiant?3:2})`,opacity:0}],{duration:isGiant?500:350});
                     setTimeout(()=>bm.remove(),isGiant?500:350);
                     for(let s=0;s<(isGiant?3:1);s++){
                       const rot=-45+(Math.random()-0.5)*30;const sl=document.createElement('div');
                       sl.style.cssText=`position:absolute;z-index:30;left:${mx-35}px;top:${tY-35}px;width:70px;height:6px;background:#ff5722;box-shadow:0 0 8px #ff5722;transform:rotate(${rot}deg);pointer-events:none;`;
                       bf.appendChild(sl);sl.animate([{transform:`rotate(${rot}deg) scaleX(0)`,opacity:1},{transform:`rotate(${rot}deg) scaleX(1.5)`,opacity:0}],{duration:300,fill:'forwards'});
                       setTimeout(()=>sl.remove(),350);
                     }
                     for(let c=0;c<(isGiant?22:9);c++){
                       const csz=3+Math.random()*5;const sp=document.createElement('div');
                       sp.style.cssText=`position:absolute;z-index:27;left:${mx}px;top:${tY}px;width:${csz}px;height:${csz}px;background:#ff9800;border-radius:50%;box-shadow:0 0 ${csz*2}px #ff5722;pointer-events:none;`;
                       bf.appendChild(sp);sp.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${(Math.random()-0.5)*(isGiant?160:85)}px,-${30+Math.random()*(isGiant?130:65)}px) scale(0)`,opacity:0}],{duration:400+Math.random()*600,easing:'ease-out'});
                       setTimeout(()=>sp.remove(),1100);
                     }
                     for(let h=0;h<(isGiant?7:3);h++){
                       const hsz=18+Math.random()*32;const hm=document.createElement('div');
                       hm.style.cssText=`position:absolute;z-index:26;left:${mx+(Math.random()-0.5)*40-hsz/2}px;top:${tY+(Math.random()-0.5)*30-hsz/2}px;width:${hsz}px;height:${hsz}px;background:radial-gradient(circle,rgba(30,30,30,0.8),transparent);border-radius:50%;filter:blur(4px);pointer-events:none;`;
                       bf.appendChild(hm);hm.animate([{transform:'scale(0.4)',opacity:0.8},{transform:'translate(0,-40px) scale(1.8)',opacity:0}],{duration:600+Math.random()*500});
                       setTimeout(()=>hm.remove(),1200);
                     }
                     bf.style.transition='none';bf.style.transform=`translate(${(Math.random()-0.5)*(isGiant?28:12)}px,${(Math.random()-0.5)*(isGiant?22:9)}px)`;
                     setTimeout(()=>{bf.style.transform='translate(0,0)'},isGiant?160:80);
                   },impD);
                 },i*110);
               }
             },2800);

           } else if (habilidadNorm === 'estallido') {
             // ESTALLIDO CINEMATOGRÁFICO VFX
             const estSph=document.createElement('div');
             estSph.style.cssText=`position:absolute;z-index:24;left:${startX-16}px;top:${startY-16}px;width:32px;height:32px;background:radial-gradient(circle,#fff,#ffeb3b,#ff5722);border-radius:50%;box-shadow:0 0 28px #ff5722;mix-blend-mode:screen;pointer-events:none;`;
             bf.appendChild(estSph);
             estSph.animate([{transform:'scale(0.2)',opacity:0.4},{transform:'scale(2.5)',opacity:1,offset:0.45},{transform:'scale(2.8)',opacity:1,offset:0.6},{transform:'scale(0)',opacity:0}],{duration:700});
             setTimeout(()=>estSph.remove(),700);
             const estD=document.createElement('div');
             estD.style.cssText='position:absolute;inset:0;background:rgba(0,0,0,0.32);z-index:8;pointer-events:none;';
             bf.appendChild(estD);estD.animate([{opacity:0},{opacity:1,offset:0.3},{opacity:1,offset:0.7},{opacity:0}],{duration:1200});
             setTimeout(()=>estD.remove(),1200);
             setTimeout(()=>{
               const shot=document.createElement('div');
               shot.style.cssText=`position:absolute;z-index:26;left:${startX-22}px;top:${startY-22}px;width:44px;height:44px;background:radial-gradient(circle,#fff,#ffeb3b,#ff5722);border-radius:50%;box-shadow:0 0 38px #ff5722;mix-blend-mode:screen;pointer-events:none;`;
               bf.appendChild(shot);
               shot.animate([{transform:'translate(0,0) scale(0.8)',opacity:1},{transform:`translate(${endX-startX}px,${endY-startY}px) scale(1.8)`,opacity:0.9}],{duration:180,easing:'ease-in'});
               setTimeout(()=>shot.remove(),180);
               for(let i=0;i<12;i++){
                 setTimeout(()=>{
                   const t=i/12;const tsz=16+Math.random()*16;const tr=document.createElement('div');
                   tr.style.cssText=`position:absolute;z-index:24;left:${startX+(endX-startX)*t-tsz/2}px;top:${startY+(endY-startY)*t-tsz/2}px;width:${tsz}px;height:${tsz}px;background:radial-gradient(circle,#ffeb3b,#ff5722,transparent);border-radius:50%;mix-blend-mode:screen;pointer-events:none;`;
                   bf.appendChild(tr);tr.animate([{opacity:0.9},{opacity:0}],{duration:280});setTimeout(()=>tr.remove(),280);
                 },i*12);
               }
             },600);

           } else if (habilidadNorm === 'patada ignea') {
             // PATADA ÍGNEA VFX CINEMATOGRÁFICO
             for(let i=0;i<18;i++){
               setTimeout(()=>{
                 const ang=(i/18)*Math.PI*4;const r=48-(i/18)*26;
                 const fx=startX+Math.cos(ang)*r;const fy=startY+Math.sin(ang)*r*0.6;
                 const flm=document.createElement('div');const sz=10+Math.random()*10;
                 flm.style.cssText=`position:absolute;z-index:20;left:${fx-sz/2}px;top:${fy-sz/2}px;width:${sz}px;height:${sz*1.3}px;background:radial-gradient(circle,#fff,#ff5722);border-radius:50%;box-shadow:0 0 ${sz}px #ff5722;mix-blend-mode:screen;pointer-events:none;`;
                 bf.appendChild(flm);
                 flm.animate([{transform:'scale(0)',opacity:0},{transform:'scale(1.5)',opacity:1,offset:0.5},{transform:'translate(0,-16px) scale(0)',opacity:0}],{duration:280});
                 setTimeout(()=>flm.remove(),280);
               },i*20);
             }
             setTimeout(()=>{
               const legG=document.createElement('div');
               legG.style.cssText=`position:absolute;z-index:18;left:${startX-16}px;top:${startY+8}px;width:32px;height:52px;background:radial-gradient(ellipse,#ff5722,#ffeb3b,transparent);mix-blend-mode:screen;filter:blur(5px);pointer-events:none;`;
               bf.appendChild(legG);legG.animate([{opacity:0},{opacity:1},{opacity:0}],{duration:320});setTimeout(()=>legG.remove(),320);
             },250);
             setTimeout(()=>{
               for(let i=0;i<16;i++){
                 const line=document.createElement('div');
                 line.style.cssText=`position:absolute;z-index:16;left:${startX-130}px;top:${startY-64+i*8}px;width:${150+Math.random()*120}px;height:3px;background:linear-gradient(90deg,transparent,#ff5722,#ffeb3b,#fff);box-shadow:0 0 14px #ff5722;pointer-events:none;`;
                 bf.appendChild(line);
                 line.animate([{transform:'translateX(0)',opacity:0},{transform:`translateX(${bfRect.width+200}px)`,opacity:1,offset:0.12},{transform:`translateX(${bfRect.width+400}px)`,opacity:0}],{duration:140});
                 setTimeout(()=>line.remove(),140);
               }
             },480);

           } else if (habilidadNorm === 'gancho alto') {
             // GANCHO ALTO VFX - uppercut, NO fuego lanzado
             for(let i=0;i<10;i++){
               const line=document.createElement('div');
               line.style.cssText=`position:absolute;z-index:16;left:${startX-80}px;top:${startY-40+i*8}px;width:${100+Math.random()*80}px;height:2px;background:rgba(255,255,255,0.85);box-shadow:0 0 8px white;pointer-events:none;`;
               bf.appendChild(line);
               line.animate([{transform:'translateX(0)',opacity:0},{transform:`translateX(${bfRect.width+200}px)`,opacity:0.8,offset:0.3},{transform:`translateX(${bfRect.width+300}px)`,opacity:0}],{duration:200});
               setTimeout(()=>line.remove(),200);
             }
             setTimeout(()=>{
               const arc=document.createElement('div');
               arc.style.cssText=`position:absolute;z-index:24;left:${endX-26}px;top:${endY+10}px;width:52px;height:88px;border-left:5px solid #ff5722;border-top:5px solid #ff9800;border-radius:60% 0 0 0;box-shadow:0 0 18px #ff5722;pointer-events:none;transform-origin:bottom center;`;
               bf.appendChild(arc);
               arc.animate([{transform:'scaleY(0) rotate(-20deg)',opacity:1},{transform:'scaleY(1) rotate(0deg)',opacity:1,offset:0.4},{transform:'scaleY(1) rotate(10deg)',opacity:0}],{duration:350});
               setTimeout(()=>arc.remove(),350);
               for(let i=0;i<10;i++){
                 const p=document.createElement('div');const psz=6+Math.random()*8;
                 p.style.cssText=`position:absolute;z-index:23;left:${endX+(Math.random()-0.5)*30}px;top:${endY}px;width:${psz}px;height:${psz*1.3}px;background:radial-gradient(circle,#ffeb3b,#ff5722);border-radius:50%;box-shadow:0 0 ${psz}px #ff5722;pointer-events:none;`;
                 bf.appendChild(p);
                 p.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${(Math.random()-0.5)*40}px,-${65+Math.random()*65}px) scale(0)`,opacity:0}],{duration:400});
                 setTimeout(()=>p.remove(),400);
               }
             },280);

           } else if (habilidadNorm === 'embestida ignea') {
             // EMBESTIDA ÍGNEA VFX
             for(let i=0;i<14;i++){
               setTimeout(()=>{
                 const ang=(i/14)*Math.PI*2;const fx=startX+Math.cos(ang)*32;const fy=startY+Math.sin(ang)*22;
                 const flm=document.createElement('div');const sz=12+Math.random()*10;
                 flm.style.cssText=`position:absolute;z-index:20;left:${fx-sz/2}px;top:${fy-sz/2}px;width:${sz}px;height:${sz*1.3}px;background:radial-gradient(circle,#fff,#ff9800,#ff5722,transparent);border-radius:50%;mix-blend-mode:screen;pointer-events:none;`;
                 bf.appendChild(flm);
                 flm.animate([{transform:'scale(0.5)',opacity:0},{transform:'scale(1.5)',opacity:1,offset:0.4},{transform:'translate(0,-20px) scale(0)',opacity:0}],{duration:350});
                 setTimeout(()=>flm.remove(),350);
               },i*20);
             }
             const eGlow=document.createElement('div');
             eGlow.style.cssText='position:absolute;inset:0;background:rgba(255,100,20,0.16);z-index:5;pointer-events:none;';
             bf.appendChild(eGlow);eGlow.animate([{opacity:0},{opacity:1,offset:0.25},{opacity:0}],{duration:800});
             setTimeout(()=>eGlow.remove(),800);
             setTimeout(()=>{
               for(let i=0;i<14;i++){
                 setTimeout(()=>{
                   const t=i/14;const fx=startX+(endX-startX)*t;const fy=startY+(endY-startY)*t+(Math.random()-0.5)*25;
                   const sz=16+Math.random()*14;const flm=document.createElement('div');
                   flm.style.cssText=`position:absolute;z-index:19;left:${fx-sz/2}px;top:${fy-sz/2}px;width:${sz}px;height:${sz*1.3}px;background:radial-gradient(circle,#fff,#ffeb3b,#ff5722,transparent);border-radius:50%;mix-blend-mode:screen;box-shadow:0 0 15px #ff5722;pointer-events:none;`;
                   bf.appendChild(flm);
                   flm.animate([{transform:'scale(1)',opacity:1},{transform:'translateY(-30px) scale(0)',opacity:0}],{duration:350});
                   setTimeout(()=>flm.remove(),350);
                 },i*14);
               }
               for(let i=0;i<12;i++){
                 const line=document.createElement('div');
                 line.style.cssText=`position:absolute;z-index:16;left:${startX-100}px;top:${startY-50+i*8}px;width:${120+Math.random()*100}px;height:3px;background:linear-gradient(90deg,transparent,#ff9800,#ff5722,#fff);box-shadow:0 0 10px #ff5722;pointer-events:none;`;
                 bf.appendChild(line);
                 line.animate([{transform:'translateX(0)',opacity:0},{transform:`translateX(${bfRect.width+300}px)`,opacity:1,offset:0.2},{transform:`translateX(${bfRect.width+500}px)`,opacity:0}],{duration:180});
                 setTimeout(()=>line.remove(),180);
               }
             },320);
"""

do_replace(insert_marker, new_vfx_blocks + insert_marker, "Adding cinematic VFX blocks")

if changes > 0:
    with open("pokemon.html", "w", encoding="utf-8") as f:
        f.write(content)
    print(f"\n=== DONE: {changes} changes applied ===")
else:
    print("\n=== NO CHANGES APPLIED ===")
