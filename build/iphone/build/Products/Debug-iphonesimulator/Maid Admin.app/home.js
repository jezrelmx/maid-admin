var abrir_home = function(arreglo_usuarios) {
	var arreglo_usuarios_json = JSON.parse(arreglo_usuarios);

	if (Titanium.Platform.osname == 'android') {
		var win_home = Titanium.UI.createWindow({
			backgroundImage : '/images/fondo.png',
			theme : 'materialThemeNoAB',
			layout : 'absolute'
		});
	};

	if (Titanium.Platform.osname == 'iphone') {
		var win_home = Titanium.UI.createWindow({
			backgroundImage : 'fondo.png',
			layout : 'absolute'
		});
	};

	if (Titanium.Platform.osname == 'android') {
		var view_logo_home = Titanium.UI.createImageView({
			image : '/images/logo.png',
			width : '80%',
			// height : '80dp',
			top : '20dp'
		});
	};

	if (Titanium.Platform.osname == 'iphone') {
		var view_logo_home = Titanium.UI.createImageView({
			image : 'logo.png',
			width : '80%',
			// height : '80dp',
			top : '20dp'
		});
	};

	var scrollView_usuarios = Titanium.UI.createScrollView({
		// backgroundColor : 'red',
		width : Titanium.UI.FILL,
		height : Titanium.UI.SIZE,
		top : '100dp',
		layout : 'vertical'
	});

	// var arreglo_colores = ['blue', 'pink', 'purple', 'cyan', 'yellow', 'green'];

	for (var i = 0; i < arreglo_usuarios_json.response.length; i++) {
		var view_wrap_usuario = Titanium.UI.createView({
			backgroundColor : '#233348',
			width : '90%',
			height : '200dp',
			bottom : '10dp',
			layout : 'absolute'
		});

		var view_caja_usuario = Titanium.UI.createView({
			backgroundColor : 'transparent',
			width : Titanium.UI.FILL,
			height : Titanium.UI.FILL,
			bottom : '10dp',
			left : '10dp',
			right : '10dp',
			layout : 'vertical'
		});

		var lb_usuario_nombre = Titanium.UI.createLabel({
			color : "#FFFFFF",
			text : arreglo_usuarios_json.response[i].nombre + ' ' + arreglo_usuarios_json.response[i].a_paterno,
			font : {
				fontSize : '24dp'
			},
			top : '20dp',
			width : Titanium.UI.FILL,
			height : Titanium.UI.SIZE
		});

		var lb_usuario_sexo = Titanium.UI.createLabel({
			color : "#FFFFFF",
			text : 'Sexo: ' + arreglo_usuarios_json.response[i].sexo,
			font : {
				fontSize : '20dp'
			},
			top : '20dp',
			width : Titanium.UI.FILL,
			height : Titanium.UI.SIZE
		});

		var lb_usuario_edad = Titanium.UI.createLabel({
			color : "#FFFFFF",
			text : 'Edad: ' + arreglo_usuarios_json.response[i].edad,
			font : {
				fontSize : '20dp'
			},
			width : Titanium.UI.FILL,
			height : Titanium.UI.SIZE
		});

		var view_wrap_btns = Titanium.UI.createView({
			// backgroundColor : 'red',
			width : Titanium.UI.FILL,
			height : '60dp',
			bottom : '-10dp',
			layout : 'horizontal'
		});

		var view_btn_editar = Titanium.UI.createView({
			// backgroundColor : 'green',
			width : '50%',
			height : Titanium.UI.FILL,
			layout : 'absolute'
		});

		var lb_btn_editar = Titanium.UI.createLabel({
			color : "#FFAB40",
			text : 'Editar',
			font : {
				fontSize : '20dp',
				fontWeight : 'bold'
			},
			bottom : 0,
			width : Titanium.UI.SIZE,
			height : Titanium.UI.SIZE
		});

		var view_btn_eliminar = Titanium.UI.createView({
			// backgroundColor : 'purple',
			id : arreglo_usuarios_json.response[i].id,
			width : '50%',
			height : Titanium.UI.FILL,
			layout : 'absolute'
		});

		var lb_btn_eliminar = Titanium.UI.createLabel({
			color : "#FFAB40",
			text : 'Eliminar',
			font : {
				fontSize : '20dp',
				fontWeight : 'bold'
			},
			bottom : 0,
			touchEnabled : false,
			width : Titanium.UI.SIZE,
			height : Titanium.UI.SIZE
		});

		view_btn_eliminar.addEventListener('touchstart', function(e) {
			e.source.setOpacity(0.5);
		});

		view_btn_eliminar.addEventListener('touchend', function(e) {
			e.source.setOpacity(1.0);
		});

		view_btn_eliminar.addEventListener('click', function(e) {
			var url_elimanr_usuario = 'http://carloshosting.esy.es/apiABC/index.php/Usuarios/' + e.source.id;    
			// Create an HTTPClient.
			var xhr_borrar_usuario = Ti.Network.createHTTPClient();
			xhr_borrar_usuario.setTimeout(10000);
			
			// Define the callback.
			xhr_borrar_usuario.onload = function() {
				// Handle the XML data.
				var respuesta_borrar_usuario = this.responseText;
				var respues_json = JSON.parse(respuesta_borrar_usuario);
				if (respues_json.code == 200) {
					e.source.children[0].setText('Deshacer');
					// e.source.setOpacity(0.5);
				} else{
					alert('Este usuario no se pudo eliminar.');
				};
				
				alert(respuesta_borrar_usuario);
				
			};
			xhr_borrar_usuario.onerror = function() {
				alert('The HTTP request failed');
			};
			
			// Send the request data.
			xhr_borrar_usuario.open('DELETE', url_elimanr_usuario);
			xhr_borrar_usuario.send();
			
		});

		view_btn_editar.add(lb_btn_editar);
		view_btn_eliminar.add(lb_btn_eliminar);
		view_wrap_btns.add(view_btn_editar);
		view_wrap_btns.add(view_btn_eliminar);

		view_caja_usuario.add(lb_usuario_nombre);
		view_caja_usuario.add(lb_usuario_sexo);
		view_caja_usuario.add(lb_usuario_edad);
		view_caja_usuario.add(view_wrap_btns);
		view_wrap_usuario.add(view_caja_usuario);
		scrollView_usuarios.add(view_wrap_usuario);
	};

	win_home.add(view_logo_home);
	win_home.add(scrollView_usuarios);

	win_home.open();
};

exports.abrir_home = abrir_home;
