if (Titanium.Platform.osname == 'android') {
	var win_login = Titanium.UI.createWindow({
		backgroundImage : '/images/fondo.png',
		// backgroundColor : 'red',
		theme : 'materialThemeNoAB',
		layout : 'absolute'
	});
};

if (Titanium.Platform.osname == 'iphone') {
	var win_login = Titanium.UI.createWindow({
		backgroundImage : 'fondo.png',
		// backgroundColor : 'red',
		layout : 'absolute'
	});
};

var view_wrap = Titanium.UI.createView({
	// backgroundColor : 'blue',
	width : '70%',
	height : Titanium.UI.SIZE,
	layout : 'vertical'
});

if (Titanium.Platform.osname == 'android') {
	var view_logo = Titanium.UI.createImageView({
		image : '/images/logo.png',
		height : '80dp'
	});
};

if (Titanium.Platform.osname == 'iphone') {
	var view_logo = Titanium.UI.createImageView({
		image : 'logo.png',
		height : '80dp'
	});
};

var lb_bienvenido = Titanium.UI.createLabel({
	color : "#FFFFFF",
	text : 'Bienvenido',
	font : {
		fontSize : '20dp'
	},
	top : '20dp',
	width : Titanium.UI.FILL,
	height : Titanium.UI.SIZE
});

var lb_fecha = Titanium.UI.createLabel({
	color : "#FFFFFF",
	text : '28 de Agosto de 2016',
	width : Titanium.UI.FILL,
	height : Titanium.UI.SIZE
});

var view_input_usuario = Titanium.UI.createView({
	width : '100%',
	height : '60dp',
	top : '50dp',
	layout : 'absolute'
});

if (Titanium.Platform.osname == 'android') {
	var img_usuario = Titanium.UI.createImageView({
		image : '/images/user.png',
		left : 0
	});
};

if (Titanium.Platform.osname == 'iphone') {
	var img_usuario = Titanium.UI.createImageView({
		image : 'user.png',
		left : 0
	});
};

var view_linea = Titanium.UI.createView({
	backgroundColor : '#FFFFFF',
	width : Titanium.UI.FILL,
	height : '3dp',
	bottom : 0
});

var txtfield_usuario = Ti.UI.createTextField({
	borderColor : 'transparent',
	backgroundColor : 'transparent',
	hintText : 'Escribe tu correo',
	hintTextColor : 'white',
	left : '40dp'
});

view_input_usuario.add(img_usuario);
view_input_usuario.add(view_linea);
view_input_usuario.add(txtfield_usuario);

var view_input_contrasenia = Titanium.UI.createView({
	// backgroundColor : 'red',
	width : '100%',
	height : '60dp',
	top : '50dp',
	layout : 'absolute'
});

if (Titanium.Platform.osname == 'android') {
	var img_contrasenia = Titanium.UI.createImageView({
		image : '/images/padlock.png',
		left : 0
	});
};

if (Titanium.Platform.osname == 'iphone') {
	var img_contrasenia = Titanium.UI.createImageView({
		image : 'padlock.png',
		left : 0
	});
};

var view_linea_2 = Titanium.UI.createView({
	backgroundColor : '#FFFFFF',
	width : Titanium.UI.FILL,
	height : '3dp',
	bottom : 0
});

var txtfield_contrasenia = Ti.UI.createTextField({
	borderColor : 'transparent',
	backgroundColor : 'transparent',
	hintText : 'Contraseña',
	hintTextColor : 'white'
});

view_input_contrasenia.add(img_contrasenia);
view_input_contrasenia.add(view_linea_2);
view_input_contrasenia.add(txtfield_contrasenia);

var view_btn = Titanium.UI.createView({
	backgroundColor : '#233348',
	width : '100%',
	height : '60dp',
	top : '50dp',
	layout : 'absolute'
});

var lb_acceder = Titanium.UI.createLabel({
	color : "#FFFFFF",
	text : 'Acceder',
	font : {
		fontSize : '20dp'
	},
	width : Titanium.UI.SIZE,
	height : Titanium.UI.SIZE
});

view_btn.add(lb_acceder);

view_wrap.add(view_logo);
view_wrap.add(lb_bienvenido);
view_wrap.add(lb_fecha);
view_wrap.add(view_input_usuario);
view_wrap.add(view_input_contrasenia);
view_wrap.add(view_btn);

win_login.add(view_wrap);

view_btn.addEventListener('touchstart', function(e) {
	view_btn.setOpacity(0.5);
});

view_btn.addEventListener('touchend', function(e) {
	view_btn.setOpacity(1.0);
});

view_btn.addEventListener('click', function(e) {
	var usuario = txtfield_usuario.value;
	var contrasenia = txtfield_contrasenia.value;
	
	var url_login = 'http://carloshosting.esy.es/apiABC/index.php/Usuarios/' + usuario + '/' + contrasenia;
	// alert(usuario + ' ' + contrasenia);
	// Create an HTTPClient.
	var xhr_login = Ti.Network.createHTTPClient();
	xhr_login.setTimeout(10000);
	
	// Define the callback.
	xhr_login.onload = function() {
		// Handle the XML data.
		var respuesta = this.responseText;
		
		var respuesta_json = JSON.parse(respuesta);
		
		if (respuesta_json.code == 200) {
			alert('Bienvanido ' + usuario);
			
			// Create an HTTPClient.
			var xhr_usuarios = Ti.Network.createHTTPClient();
			xhr_usuarios.setTimeout(10000);
			
			// Define the callback.
			xhr_usuarios.onload = function() {
				// Handle the XML data.
				var respuesta_usuarios = this.responseText;
				var home = require('home');
				home.abrir_home(respuesta_usuarios);
			};
			xhr_usuarios.onerror = function() {
				alert('The HTTP request failed');
			};
			
			// Send the request data.
			xhr_usuarios.open('GET','http://carloshosting.esy.es/apiABC/index.php/Usuarios');
			xhr_usuarios.send();
			
		} else{
			alert('Revise su usuario y contraseña.');
		};
		// alert(doc);
	};
	xhr_login.onerror = function() {
		alert('The HTTP request failed');
	};
	
	// Send the request data.
	xhr_login.open('GET', url_login );
	xhr_login.send();
});

win_login.open();
