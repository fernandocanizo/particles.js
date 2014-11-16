/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* GitHub : https://github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* ----------------------------------------------- */


var particlesJS = {}; // define name space

particlesJS.intervalId = null;

// particlesJS defaults object
particlesJS.o = {
	particles: {
		color: '#fff',
		shape: 'circle',
		opacity: 1,
		size: 2.5,
		size_random: true,
		nb: 200,

		line_linked: {
			enable_auto: true,
			distance: 100,
			color: '#fff',
			opacity: 1,
			width: 1,
			condensed_mode: {
				enable: true,
				rotateX: 65000,
				rotateY: 65000
			}
		},

		anim: {
			enable: true,
			speed: 1
		},

		array: []
	},

	interactivity: {
		enable: true,

		mouse: {
			distance: 100
		},

		detect_on: 'canvas',
		mode: 'grab'
	},

	retina_detect: false,
	fn: {
		vendors:{
			interactivity: {}
		}
	}
};


particlesJS.launch = function () {
	/* convert hex colors to rgb */
	particlesJS.o.particles.color_rgb = hexToRgb(particlesJS.o.particles.color);
	particlesJS.o.particles.line_linked.color_rgb_line = hexToRgb(particlesJS.o.particles.line_linked.color);

	/* detect retina */
	if(particlesJS.o.retina_detect){
		if(window.devicePixelRatio > 1){
			particlesJS.o.retina = true;
			particlesJS.o.canvas.w = particlesJS.o.canvas.el.offsetWidth*2;
			particlesJS.o.canvas.h = particlesJS.o.canvas.el.offsetHeight*2;
			particlesJS.o.particles.anim.speed = particlesJS.o.particles.anim.speed*2;
			particlesJS.o.particles.line_linked.distance = particlesJS.o.particles.line_linked.distance*2;
			particlesJS.o.particles.line_linked.width = particlesJS.o.particles.line_linked.width*2;
			particlesJS.o.interactivity.mouse.distance = particlesJS.o.interactivity.mouse.distance*2;
		}
	};


	/* ---------- CANVAS functions ------------ */

	particlesJS.o.fn.canvasInit = function(){
		particlesJS.o.canvas.ctx = particlesJS.o.canvas.el.getContext('2d');
	};

	particlesJS.o.fn.canvasSize = function(){
		particlesJS.o.canvas.el.width = particlesJS.o.canvas.w;
		particlesJS.o.canvas.el.height = particlesJS.o.canvas.h;

		window.onresize = function(){
			/* resize canvas */
			if(particlesJS.o.retina){
				particlesJS.o.canvas.w = particlesJS.o.canvas.el.offsetWidth*2;
				particlesJS.o.canvas.h = particlesJS.o.canvas.el.offsetHeight*2;
			}else{
				particlesJS.o.canvas.w = particlesJS.o.canvas.el.offsetWidth;
				particlesJS.o.canvas.h = particlesJS.o.canvas.el.offsetHeight;
			}
			particlesJS.o.canvas.el.width = particlesJS.o.canvas.w;
			particlesJS.o.canvas.el.height = particlesJS.o.canvas.h;

			/* repaint canvas */
			particlesJS.o.fn.canvasPaint();
			if(!particlesJS.o.particles.anim.enable){
				particlesJS.o.fn.particlesRemove();
				particlesJS.o.fn.canvasRemove();
				launchParticles();
			}
		}
	};

	particlesJS.o.fn.canvasPaint = function(){
		particlesJS.o.canvas.ctx.fillRect(0, 0, particlesJS.o.canvas.w, particlesJS.o.canvas.h);
	};

	particlesJS.o.fn.canvasRemove = function(){
		particlesJS.o.canvas.ctx.clearRect(0, 0, particlesJS.o.canvas.w, particlesJS.o.canvas.h);
	}


	/* --------- PARTICLES functions ----------- */

	particlesJS.o.fn.particle = function(color, opacity){

		/* position */
		this.x = Math.random() * particlesJS.o.canvas.w;
		this.y = Math.random() * particlesJS.o.canvas.h;

		/* size */
		if(particlesJS.o.retina){
			if(particlesJS.o.particles.size_random){
				this.radius = Math.random() * particlesJS.o.particles.size * 2;
			}else{
				this.radius = particlesJS.o.particles.size * 2;
			}
		}else{
			if(particlesJS.o.particles.size_random){
				this.radius = Math.random() * particlesJS.o.particles.size * 1;
			}else{
				this.radius = particlesJS.o.particles.size * 1;
			}
		}

		/* color */
		this.color = color;

		/* opacity */
		this.opacity = opacity;

		/* animation - velocity for speed */
		this.vx = -.5 + Math.random();
		this.vy = -.5 + Math.random();

		/* draw function */
		this.draw = function(){
			particlesJS.o.canvas.ctx.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+this.opacity+')';
			particlesJS.o.canvas.ctx.beginPath();

			switch(particlesJS.o.particles.shape){
				case 'circle':
					particlesJS.o.canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				break;

				case 'edge':
					particlesJS.o.canvas.ctx.rect(this.x, this.y, this.radius*2, this.radius*2);
				break;

				case 'triangle':
					particlesJS.o.canvas.ctx.moveTo(this.x,this.y);
					particlesJS.o.canvas.ctx.lineTo(this.x+this.radius,this.y+this.radius*2);
					particlesJS.o.canvas.ctx.lineTo(this.x-this.radius,this.y+this.radius*2);
					particlesJS.o.canvas.ctx.closePath();
				break;
			}

			particlesJS.o.canvas.ctx.fill();
		}

	};

	particlesJS.o.fn.particlesCreate = function(){
		for(var i = 0; i < particlesJS.o.particles.nb; i++) {
			particlesJS.o.particles.array.push(new particlesJS.o.fn.particle(particlesJS.o.particles.color_rgb, particlesJS.o.particles.opacity));
		}
	};

	particlesJS.o.fn.particlesAnimate = function(){
		for(var i = 0; i < particlesJS.o.particles.array.length; i++){
			/* the particle */
			var p = particlesJS.o.particles.array[i];

			/* move the particle */
			p.x += p.vx * (particlesJS.o.particles.anim.speed/2);
			p.y += p.vy * (particlesJS.o.particles.anim.speed/2);

			/* change particle position if it is out of canvas */
			if(p.x - p.radius > particlesJS.o.canvas.w) p.x = p.radius;
			else if(p.x + p.radius < 0) p.x = particlesJS.o.canvas.w + p.radius;
			if(p.y - p.radius > particlesJS.o.canvas.h) p.y = p.radius;
			else if(p.y + p.radius < 0) p.y = particlesJS.o.canvas.h + p.radius;

			/* Check distance between each particle and mouse position */
			for(var j = i + 1; j < particlesJS.o.particles.array.length; j++){
				var p2 = particlesJS.o.particles.array[j];

				/* link particles if enable */
				if(particlesJS.o.particles.line_linked.enable_auto){
					particlesJS.o.fn.vendors.distanceParticles(p,p2);
				}

				/* set interactivity if enable */
				if(particlesJS.o.interactivity.enable){

					/* interactivity mode */
					switch(particlesJS.o.interactivity.mode){
						case 'grab':
							particlesJS.o.fn.vendors.interactivity.grabParticles(p,p2);
						break;
					}

				}


			}
		}
	};

	particlesJS.o.fn.particlesDraw = function(){
		/* clear canvas */
		particlesJS.o.canvas.ctx.clearRect(0, 0, particlesJS.o.canvas.w, particlesJS.o.canvas.h);

		/* move particles */
		particlesJS.o.fn.particlesAnimate();

		/* draw each particle */
		for(var i = 0; i < particlesJS.o.particles.array.length; i++){
			var p = particlesJS.o.particles.array[i];
			p.draw('rgba('+p.color.r+','+p.color.g+','+p.color.b+','+p.opacity+')');
		}

	};

	particlesJS.o.fn.particlesRemove = function(){
		particlesJS.o.particles.array = [];
	}


	/* ---------- VENDORS functions ------------ */

	particlesJS.o.fn.vendors.distanceParticles = function(p1, p2){

		var dx = p1.x - p2.x,
			dy = p1.y - p2.y,
			dist = Math.sqrt(dx*dx + dy*dy);

		/* Check distance between particle and mouse mos */
		if(dist <= particlesJS.o.particles.line_linked.distance) {

			/* draw the line */
			var color_line = particlesJS.o.particles.line_linked.color_rgb_line;
			particlesJS.o.canvas.ctx.beginPath();
			particlesJS.o.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+ (particlesJS.o.particles.line_linked.opacity-dist/particlesJS.o.particles.line_linked.distance) +')';
			particlesJS.o.canvas.ctx.moveTo(p1.x, p1.y);
			particlesJS.o.canvas.ctx.lineTo(p2.x, p2.y);
			particlesJS.o.canvas.ctx.lineWidth = particlesJS.o.particles.line_linked.width;
			particlesJS.o.canvas.ctx.stroke();
			particlesJS.o.canvas.ctx.closePath();

			/* condensed particles */
			if(particlesJS.o.particles.line_linked.condensed_mode.enable){
				var dx = p1.x - p2.x;
					dy = p1.y - p2.y;
				var ax = dx/(particlesJS.o.particles.line_linked.condensed_mode.rotateX*1000),
					ay = dy/(particlesJS.o.particles.line_linked.condensed_mode.rotateY*1000);
				// p1.vx -= ax;
				// p1.vy -= ay;
				p2.vx += ax;
				p2.vy += ay;
			}

		}
	}

	particlesJS.o.fn.vendors.interactivity.listeners = function(){
		if(particlesJS.o.interactivity.detect_on == 'window'){
			var detect_el = window
		}else{
			var detect_el = particlesJS.o.canvas.el
		}

		detect_el.onmousemove = function(e){
			if(particlesJS.o.retina){
				particlesJS.o.interactivity.mouse.pos_x = e.pageX*2;
				particlesJS.o.interactivity.mouse.pos_y = e.pageY*2;
			}else{
				particlesJS.o.interactivity.mouse.pos_x = e.pageX;
				particlesJS.o.interactivity.mouse.pos_y = e.pageY;
			}
			particlesJS.o.interactivity.status = 'mousemove';
		}
		detect_el.onmouseleave = function(e){
			particlesJS.o.interactivity.mouse.pos_x = 0;
			particlesJS.o.interactivity.mouse.pos_y = 0;
			particlesJS.o.interactivity.status = 'mouseleave';
		}
	}

	particlesJS.o.fn.vendors.interactivity.grabParticles = function(p1, p2){
		var dx = p1.x - p2.x,
			dy = p1.y - p2.y,
			dist = Math.sqrt(dx*dx + dy*dy);

		var dx_mouse = p1.x - particlesJS.o.interactivity.mouse.pos_x,
			dy_mouse = p1.y - particlesJS.o.interactivity.mouse.pos_y,
			dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

		/* Check distance between 2 particles + Check distance between 1 particle and mouse position */
		if(dist <= particlesJS.o.particles.line_linked.distance && dist_mouse <= particlesJS.o.interactivity.mouse.distance && particlesJS.o.interactivity.status == 'mousemove'){
			/* Draw the line */
			var color_line = particlesJS.o.particles.line_linked.color_rgb_line;
			particlesJS.o.canvas.ctx.beginPath();
			particlesJS.o.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+ (particlesJS.o.particles.line_linked.opacity-dist_mouse/particlesJS.o.interactivity.mouse.distance) +')';
			particlesJS.o.canvas.ctx.moveTo(p1.x, p1.y);
			particlesJS.o.canvas.ctx.lineTo(particlesJS.o.interactivity.mouse.pos_x, particlesJS.o.interactivity.mouse.pos_y);
			particlesJS.o.canvas.ctx.lineWidth = particlesJS.o.particles.line_linked.width;
			particlesJS.o.canvas.ctx.stroke();
			particlesJS.o.canvas.ctx.closePath();
		}
	}


	/* --------- LAUNCH ----------- */

	function launchParticles(){
		particlesJS.o.fn.canvasInit();
		particlesJS.o.fn.canvasSize();
		particlesJS.o.fn.canvasPaint();
		particlesJS.o.fn.particlesCreate();
		particlesJS.o.fn.particlesDraw();
	};


	function launchAnimation(){
		particlesJS.o.fn.particlesDraw();
		particlesJS.intervalId = requestAnimFrame(launchAnimation);
	};


	launchParticles();

	if(particlesJS.o.particles.anim.enable){
		launchAnimation();
	}

	if(particlesJS.o.interactivity.enable){
		particlesJS.o.fn.vendors.interactivity.listeners();
	}


};

/* --- VENDORS --- */

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame    ||
		  window.oRequestAnimationFrame      ||
		  window.msRequestAnimationFrame     ||
		  function(callback){
			window.setTimeout(callback, 1000 / 60);
		  };
})();

window.cancelAnimationFrame = (function () {
	return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.oCancelAnimationFrame ||
		window.msCancelAnimationFrame ||
		function(intervalId) {
			window.clearTimeout(intervalId);
		}
}());

function hexToRgb(hex){
    // By Tim Down - http://stackoverflow.com/a/5624139/3493650
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};


/* --- LAUNCH --- */

particlesJS.load = function(tag_id) {
	// no id? set the id to default id
	if(! tag_id || 'string' !== typeof tag_id) {
		tag_id = 'particles-js';
	}

	// create canvas element
	var canvas_el = document.createElement('canvas');

	// set canvas size
	canvas_el.style.width = "100%";
	canvas_el.style.height = "100%";

	// append canvas
	var canvas = document.getElementById(tag_id).appendChild(canvas_el);

	// launch particle.js
	if(canvas != null) {
		// append canvas to default object
		particlesJS.o.canvas = {
			el: document.querySelector('#' + tag_id + ' > canvas'),
			w: document.querySelector('#' + tag_id + ' > canvas').offsetWidth,
			h: document.querySelector('#' + tag_id + ' > canvas').offsetHeight
		};


		particlesJS.launch();
	}
};
