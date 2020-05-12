let piPP;
let piDDA;
let piBH;
let partes,angulo,step,xp,yp,pPP,pDDA,pBH;
let diametro = 200;

let i;
let newPPF,newDDAF,newBHF;
let testpI,testpF;

let contCirculo=0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
	console.log(windowWidth)
	input = createInput();
	input.position(windowWidth/2-100, 250);

	button = createButton('Partir Pizza');
	button.position(input.x + input.width, 250);
	button.mousePressed(greet);

	greeting = createElement('h1', 'Ingrese el número de rebanadas');
	greeting.position(windowWidth/2-200, 180);

	etiquetaPP = createElement('h3', 'Punto Pendiente (Fuera de Servicio)');
	etiquetaPP.position(windowWidth/4-70, 300);
	etiquetaDDA = createElement('h3', 'DDA');
	etiquetaDDA.position(windowWidth/4*2-15, 300);
	etiquetaBH = createElement('h3', 'Bresenham');
	etiquetaBH.position(windowWidth/4*3-40, 300);
	

	
	pPP = {x:0,y:0};
	pDDA = {x:0,y:0};
	pBH = {x:0,y:0};

	frameRate(30);



	
}

function draw() {

	if(angulo<radians(360) && partes >=2){
		piPP = {x: windowWidth/4, y:500};
		piDDA = {x: (windowWidth/4)*2, y:500};
		piBH = {x: (windowWidth/4)*3, y:500};
		if (contCirculo<1) {
			circle(piPP.x, piPP.y,diametro);
			circle(piDDA.x, piDDA.y,diametro);
			circle(piBH.x, piBH.y,diametro);
		}
		contCirculo++;
		xp = Math.floor(diametro/2 * cos(angulo));
		yp = Math.floor(diametro/2 * sin(angulo));
		newPPF = {x:Math.floor(piPP.x+xp),y:Math.floor(piPP.y+yp)};
		newDDAF = {x:Math.floor(piDDA.x+xp),y:Math.floor(piDDA.y+yp)};
		newBHF = {x:Math.floor(piBH.x+xp),y:Math.floor(piBH.y+yp)};
		console.log("new P X: "+newPPF.x+"and "+newPPF.y);
		
		ecuaDDA(piDDA,newDDAF);
		ecuaDDA(newDDAF,piDDA);
		ecuaBH(piBH,newBHF);
		console.log(piPP.x+" AND piPP Y: "+piPP.y)
		console.log("xp: "+xp+" AND yp: "+yp)
		console.log("step: "+step)
		console.log(radians(360))
		console.log("angulo: "+angulo)
		console.log("partes: "+ partes)
		
		console.log(piPP.x)
		angulo+= step;

	}
	
}

function ecuaPP(p1,p2) {
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	let x;
    let m, b, y;
    
    m = dy / dx;
    b = p1.y - m * p1.x;

    x = p1.x;
    y = p1.y;
     
    while (x < (p2.x + 1)) {
        
        point(x, p1.y)
        x++;
        y = m * x + b; 
    }
}

function ecuaDDA(p1, p2) {
	var p,xi,yi,k;
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	point(p1.x, p1.y)

	let y=p1.y,x=p1.x;
	
	if (dx > dy || dy == 0) {
		p = dx;
	} else {
		p = dy;
	}

	xi = dx / p;
    yi = dy / p;

	for(k = 0;k < p;k++){
		x += xi;
		y += yi;
		point(x, y);
	}
}


function ecuaBH(p1, p2){
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;

	point(p1.x, p1.y)

	var m,b;
	let y,x,xEnd,stepx,stepy,p,incE,incNE;
	console.log(dx+"&"+dy)
	  if (dy < 0) { 
	    dy = -dy;
	    stepy = -1; 
	  } 
	  else{
	  	stepy = 1;
	  }  
	  if (dx < 0) {  
	    dx = -dx; 
	    stepx = -1; 
	  } 
	  else{
	  	stepx = 1;
	  } 
	    
	  x = p1.x;
	  y = p1.y;
	  point(p1.x, y)


	  if(dx>dy){
	    p = 2*dy - dx;
	    incE = 2*dy;
	    incNE = 2*(dy-dx);
	    while (x != p2.x){
	      x += stepx;
	      if (p < 0){
	        p += incE;
	      }
	      else {
	        y += stepy;
	        p += incNE;
	      }
	      point(x,y)
	    }
	  }else{
	    p = 2*dx - dy;
	    incE = 2*dx;
	    incNE = 2*(dx-dy);
	    while (y != p2.y){
	      y += stepy;
	      if (p < 0){
	        p += incE;
	      }
	      else {
	        x += stepx;
	        p += incNE;
	      }
	      point(x,y);
	    }
	  }
	}


function greet() {
	background('white');
	contCirculo =0;
	piPP = {x: windowWidth/4, y:400};
	piDDA = {x: (windowWidth/4)*2, y:400};
	piBH = {x: (windowWidth/4)*3, y:400};
	partes = input.value();
	step = radians(360/partes);
	angulo= 0;


}
	
