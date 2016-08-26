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
	backgroundColor : 'green',
	width : '100%',
	height : '60dp',
	top : '50dp',
	layout : 'absolute'
});

var view_input_contrasenia = Titanium.UI.createView({
	backgroundColor : 'green',
	width : '100%',
	height : '60dp',
	top : '50dp',
	layout : 'absolute'
});

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

win_login.open();
