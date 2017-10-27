window.onload=function () {
let line=document.querySelector('#line');
let circle=document.querySelector('#circle');
let pencil=document.querySelector('#pencil');
let polygon=document.querySelector('#polygon');
let rectangle=document.querySelector('#rectangle');
let stroke=document.querySelector('#stroke');
let sc=document.querySelector('#sc>input');
let fill=document.querySelector('#fill');
let fc=document.querySelector('#fc>input');
let canvas=document.querySelector('canvas');
let megagon=document.querySelector('#megagon');
let opcity=document.querySelector('.opcity');
let ers=document.querySelector('.eras');
let eraser=document.querySelector('#eraser');
let font=document.querySelector('#font');
let crop=document.querySelector('#crop');
let cropobj=document.querySelector('.cropobj');
let save=document.querySelector('#save');
let clear=document.querySelector('#clear');
let savea=document.querySelector('#save>a');
let reverse=document.querySelector('#reverse');

let ctx=canvas.getContext('2d');
let borde =new Palette(canvas,ctx,opcity);
    borde.drow('line');
line.onclick=function () {
    borde.drow('line');
};
circle.onclick=function () {
        borde.drow('circle');
};
rectangle.onclick=function () {
    borde.drow('rectangle');
};
pencil.onclick=function () {
        borde.pencil();
};
megagon.onclick=function () {
        let num=prompt('请输入角数',5);
    borde.drow('megagon',num);
};
polygon.onclick=function () {
        let num=prompt('请输入边数',4);
        borde.drow('polygon',num);
};
eraser.onclick=function () {
    ers.style.display='block';
     borde.eraser(ers);
};
stroke.onclick=function () {
    borde.strokeStyle=sc.value;
    borde.style='stroke';
};
fill.onclick=function () {
    borde.fillStyle=fc.value;
    borde.style='fill';
};
font.onclick=function () {
    borde.font();
};
crop.onclick=function () {
    borde.crop(cropobj);
};
save.onclick=function () {
    let data=canvas.toDataURL('image/png');
    savea.href=data;
    savea.download='tu.png';
};
clear.onclick=function () {
    borde.clear();
};
reverse.onclick=function () {
    borde.reverse();
}
};