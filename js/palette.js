class Palette{
    constructor(canvas,ctx,opcity){
        this.canvas=canvas;
        this.opcity=opcity;
        this.ctx=ctx;
        this.cw=this.canvas.width;
        this.ch=this.canvas.height;
        this.history=[];
        //样式
        this.style='stroke';
        this.fillStyle='red';
        this.strokeStyle='yellow';
        this.lineCap='butt';
        this.lineWidth='1';

        //
        this.temp=null;

    }
    //线
    line(cx,cy,ox,oy){
        this.ctx.beginPath();
        this.ctx.moveTo(cx,cy);
        this.ctx.lineTo(ox,oy);
        this.ctx[this.style]();
        this.stle();
    };
    //矩形
    rectangle(cx,cy,ox,oy){
        this.ctx.beginPath();
        this.ctx.moveTo(cx,cy);
        this.ctx.lineTo(cx,oy);
        this.ctx.lineTo(ox,oy);
        this.ctx.lineTo(ox,cy);
        this.ctx.closePath();
        this.ctx[this.style]();
        this.stle();
    };
    //多边形
    polygon(cx,cy,ox,oy,n){
        this.ctx.beginPath();
        let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        let rad=Math.PI*2/n;
        this.ctx.moveTo(cx+r,cy);
        for(let i=0;i<n;i++){
            let x=cx+r*Math.cos(rad*i),
                y=cy+r*Math.sin(rad*i);
            this.ctx.lineTo(x,y);
        }
        this.ctx.closePath();
        this.ctx[this.style]();
        this.stle();
    };
    //多角形
    megagon(cx,cy,ox,oy,n){
        this.ctx.beginPath();
        let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        let rad=Math.PI/n;
        this.ctx.moveTo(cx+r,cy);
        for(let i=0;i<2*n;i++){
            let rl = i%2==0 ? r:r/2;
            let x=cx+rl*Math.cos(rad*i),
                y=cy+rl*Math.sin(rad*i);
            this.ctx.lineTo(x,y);
        }
        this.ctx.closePath();
        this.ctx[this.style]();
        this.stle();
    }
    //圆
    circle(cx,cy,ox,oy){
        this.ctx.beginPath();
        let r=Math.sqrt(Math.pow(cx-ox,2)+Math.pow(cy-oy,2));
        this.ctx.arc(cx,cy,r,0,Math.PI*2);
        this.ctx[this.style]();
        this.stle();
    };
    //铅笔
    pencil(){
        this.opcity.onmousedown=function (e) {
            let cx=e.offsetX, cy=e.offsetY;
            // this.ctx.clearRect(0,0,this.cw,this.ch);
            this.ctx.beginPath();
            this.ctx.moveTo(cx,cy);
            this.opcity.onmousemove=function (e) {
                let ox=e.offsetX, oy=e.offsetY;
                if(this.history.length){
                    this.ctx.putImageData(this.history[this.history.length-1],0,0)
                }
                this.ctx.lineTo(ox,oy);
                this.ctx[this.style]();
            }.bind(this);
            this.opcity.onmouseup=function(){
                this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
                this.opcity.onmousemove=null;
                this.opcity.onmouseup=null;
            }.bind(this)
        }.bind(this)
    };
    //橡皮
    eraser(ers) {
        this.opcity.onmousedown = function (e) {

            // let ox = e.offsetX - 25, oy = e.offsetY-25;
            // ers.style.left = `${e.offsetX-25}px`;
            // ers.style.top = `${e.offsetY-25}px`;
            ers.style.display = 'block';
            this.opcity.onmousemove = function (e) {
                let ox = e.offsetX - 25, oy = e.offsetY-25;
                if (this.history.length) {
                    this.ctx.putImageData(this.history[this.history.length - 1], 0, 0);
                }
                // if (ox >= this.cw - 50) {
                //     ox = this.cw - 50;
                // }
                // if (ox <= 0) {
                //     ox = 0;
                // }
                // if (oy >= this.ch-50) {
                //     oy = this.ch-50;
                // }
                // if (oy <= 0) {
                //     oy = 0;
                // }
                ers.style.left = `${ox}px`;
                ers.style.top = `${oy}px`;
                this.ctx.clearRect(ox,oy,50,50)
            }.bind(this);

        }.bind(this);
        this.opcity.onmouseup = function () {
            this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
            ers.style.display = 'none';
            this.opcity.onmousemove=null;
            this.opcity.onmouseup=null;
        }.bind(this);

    };

    drow(type,num){
        this.opcity.onmousedown=function (e) {
            let cx=e.offsetX, cy=e.offsetY;
            this.opcity.onmousemove=function (e) {
                let ox=e.offsetX, oy=e.offsetY;
                this.ctx.clearRect(0,0,this.cw,this.ch);
                if(this.history.length){
                    this.ctx.putImageData(this.history[this.history.length-1],0,0)
                }
                this[type](cx,cy,ox,oy,num);
            }.bind(this);
            this.opcity.onmouseup=function(){
                this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
                this.opcity.onmousemove=null;
                this.opcity.onmouseup=null;
            }.bind(this);
            window.onkeydown=function (e) {
                if(e.ctrlKey&&e.keyCode==90){
                    this.history.pop();
                    this.ctx.clearRect(0,0,this.cw,this.ch);
                    if(!this.history.length){return}
                    this.ctx.putImageData(this.history[this.history.length-1],0,0);
                }
            }.bind(this);
        }.bind(this);
    };
    stle(){
        //样式
        this.ctx.fillStyle=this.fillStyle;
        this.ctx.lineWidth=this.lineWidth;
        this.ctx.lineCap=this.lineCap;
        this.ctx.strokeStyle=this.strokeStyle;
    };
    font(){
        let that=this;
        let lefs,tops;
        that.opcity.onmousedown=function (e) {
            that.opcity.onmousedown=null;
            let divs=document.createElement('div');
            divs.contentEditable='true';
             let cx=e.offsetX,cy=e.offsetY;
            divs.style.cssText=`
                width:100px;
                height:30px;
                border: 1px dashed #00abff;
                position:absolute;
                left:${cx}px;
                top:${cy}px;
            `;
            lefs=cx;tops=cy;
            that.opcity.appendChild(divs);
            divs.onmousedown=function (e) {
                let oc=e.clientX,oy=e.clientY;
                let left=divs.offsetLeft,top=divs.offsetTop;
                that.opcity.onmousemove=function (e) {
                    let px=e.clientX,py=e.clientY;
                    lefs=0;
                    tops=0;
                    lefs=left+px-oc;
                    tops=top+py-oy;
                    if(lefs<=0){
                        lefs=0;
                    }
                    if(lefs>=that.cw -100){
                        lefs=that.cw-100;
                    }
                    if(tops<=0){
                        tops=0;
                    }
                    if(tops>=that.ch -30){
                        tops=that.ch-30;
                    }
                    divs.style.left=`${lefs}px`;
                    divs.style.top=`${tops}px`;
                };
                divs.onmouseup=function () {
                    that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                    that.opcity.onmousemove=null;
                }

            };

            divs.onblur=function () {
                let value=this.innerText;
                that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
                that.opcity.removeChild(divs);
                that.ctx.font='bold 20px sans-serif';
                that.ctx.fillText(value,lefs,tops);
                that.ctx.textAlign='center';
                that.ctx.textBaseline='moddle';
            }
        }
    };
crop(obj){
    let that=this;
    let minX,minY;
    let w,h;
    that.opcity.onmousedown=function (e) {
        e.preventDefault();
        let ox=e.offsetX,oy=e.offsetY;
        obj.style.display='block';
        obj.style.width=0;
        obj.style.height=0;
        that.opcity.onmousemove=function (e) {
            let cx=e.offsetX,cy=e.offsetY;
            w=Math.abs(cx-ox);h=Math.abs(cy-oy);
            minX= cx>=ox ? ox:cx;
            minY= cy>=oy ? oy:cy;
            obj.style.left=`${minX}px`;
            obj.style.top=`${minY}px`;
            obj.style.width=`${w}px`;
            obj.style.height=`${h}px`;
        };
        that.opcity.onmouseup=function () {
            that.temp=that.ctx.getImageData(minX,minY,w,h);
            that.ctx.clearRect(minX,minY,w,h);
            that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
            that.ctx.putImageData(that.temp,minX,minY);
            that.opcity.onmousemove=null;
            that.opcity.onmouseup=null;
            that.drog(minX,minY,obj);
        }
    }
};
drog(x,y,obj){
    let that=this;
    that.opcity.onmousedown=function (e) {
            let cx=e.offsetX,cy=e.offsetY;
            e.preventDefault();
            that.opcity.onmousemove=function (e) {
               let ox=e.offsetX,oy=e.offsetY;
                let lefts=x+ox-cx,
                tops=y+oy-cy;
                if(lefts<=0){
                    lefts=0;
                }
                if(lefts>=that.cw -100){
                    lefts=that.cw-100;
                }
                if(tops<=0){
                    tops=0;
                }
                if(tops>=that.ch -30){
                    tops=that.ch-30;
                }
               obj.style.left=`${lefts}px`;
               obj.style.top=`${tops}px`;
                that.ctx.clearRect(0,0,that.cw,that.ch);
                if(that.history.length){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }
                that.ctx.putImageData(that.temp,lefts,tops);
            };

    };
    that.opcity.onmouseup=function () {
        that.history.push(that.ctx.getImageData(0,0,that.cw,that.ch));
        that.temp=null;
        obj.style.display='none';
        that.opcity.onmousedown=null;
        that.opcity.onmousemove=null;
        that.opcity.onmouseup=null;

    }
};
clear(){
    this.history.push(this.ctx.getImageData(0,0,this.cw,this.ch));
    this.ctx.clearRect(0,0,this.cw,this.ch);
};
reverse(){
    let imgData=this.ctx.getImageData(0,0,this.cw,this.ch);
    for(let i=0;i<imgData.data.length;i+=4){
        imgData.data[i]=255-imgData.data[i];
        imgData.data[i+1]=255-imgData.data[i+1];
        imgData.data[i+2]=255-imgData.data[i+2];
    }
    this.ctx.putImageData(imgData,0,0);
}

}