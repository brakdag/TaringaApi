var request = require('request');
var querystring = require('querystring');


module.exports = class Taringa{
    constructor() {
        
		this.header = {"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36"}
		this.pagina_home = "https://taringa.net/"
		this.pagina_login = "https://www.taringa.net/registro/login-submit.php"
		this.pagina_deslogear = "https://www.taringa.net/ajax/user/logout"
		this.pagina_agregado_shout = "https://www.taringa.net/ajax/shout/add"
		this.pagina_agregado_post = "https://www.taringa.net/ajax/post/add"
		this.pagina_enviarMensaje = "https://www.taringa.net/ajax/mp/compose"
		this.pagina_responder_mensaje = "https://www.taringa.net/ajax/mensajes/responder"
		this.pagina_subir_imagen = "https://www.taringa.net/ajax/shout/attach"
		this.pagina_shoutear_en_muro = "https://www.taringa.net/ajax/wall/add-post"
		this.pagina_shoutear = "https://www.taringa.net/ajax/shout/add"
		this.pagina_acciones = "https://www.taringa.net/notificaciones-ajax.php" //seguir
		this.pagina_denuncia = "http://www.taringa.net/denuncia.php"
		this.pagina_bloquearUsuario = "https://www.taringa.net/ajax/user/block"
		this.pagina_subir_miniatura = "https://www.taringa.net/ajax/kn3-signdata.php"
		this.pagina_agregar_fuente = "https://www.taringa.net/ajax/source/data-add"
		this.pagina_recortar_imagen = "https://apikn3.taringa.net/image/crop"
		this.pagina_comentarUnPost = "https://www.taringa.net/ajax/comments/add"
		this.pagina_dar_like = "https://www.taringa.net/serv/shout/like"
		this.pagina_dar_unlike = "https://www.taringa.net/serv/shout/unlike"
		this.pagina_reshoutear = "https://www.taringa.net/serv/shout/reshout"
		this.pagina_comentarShout = "https://www.taringa.net/serv/comment/add/"
		this.pagina_votar_shout = "https://www.taringa.net/ajax/shout/vote"
		this.pagina_posts_recientes = "https://www.taringa.net/posts/recientes"
		this.pagina_posts_ascenso = "https://www.taringa.net/posts/ascenso"
		this.pagina_puntuar_post = "https://www.taringa.net/ajax/post/vote"
		this.pagina_shouts_recientes = "https://www.taringa.net/shouts/recent"
		this.pagina_shouts_mi = "https://www.taringa.net/mi"
		this.key_seguridad = ""
		this.id_usuario = ""
		this.usuario_actual = ""
		this.sesion_actual = request;
		//Etiquetas de referencia para extraer del html de alguna pagina, el '(.+)' es el dato a extraer
		this.html_regex = {
			"id_usuario_propio":	"'User_Id', '(.+)', 2 ]", 
			"id_usuario":"<a obj=\"user\" objid=\"(.+)\" er",
			"id_muro":		"<a obj=\"user\" objid=\"(.+)\" errorContainer",  
			"id_shout": "\"id\":\"(.+)\",\"url\"",
			"nickname_usuario": "class=\"hovercard shout-user_name\">(.+)</a>" ,
			"key_seguridad": "user_key: '(.+)', postid:",
			"shout_feed_recientes_id": "<article class=\"shout-item shout-item_simple  \" id=\"item_(.+)\" data-fetchid",
			"shout_feed_recientes_url": "<li><a href=\"(.+)\" class=\"og-link icon-comments light-shoutbox \"",
			"shout_feed_mi_id":"this,'shout',(.+),",
			"shout_feed_mi_url":"<a href=\"(.+)\" title=\"",
			
			"post_id":"Comments.objectOwner =  '(.+)';",
			"posts_feed_url": "<a href=\"(.+)\" class=\"avatar list-l__avatar\">",
	
		}
        this.buffer_ = []
    }
    test(){
        console.log("clase cargada");
    }

    extraerDatoHtml(etiqueta, codigo){
        var re = RegExp(etiqueta);
		return codigo.match(re)[1];
    }
    peticionPOST( url, datos){
    return this.sesion_actual.post(url).form(datos);
    }
    logear(usuario,contraseña){
        this.usuario_actual = usuario;
        console.log("[+] Logeando...")
        var parametros_login =  {
			"connect":"",
			"nick":usuario,
			"pass":contraseña,
			"redirect":"/"+usuario,
        }  
        var formData = querystring.stringify(parametros_login);
        var contentLength = formData.length;
        var clase = this;
        var cookieJar = request.jar();
        request({headers: {'Content-Length': contentLength,'Content-Type': 'application/x-www-form-urlencoded'
            },
            uri: this.pagina_login,
            body: formData,
            jar: cookieJar,
            method: 'POST'
          }, function (err, res, body) {
              var r= JSON.parse(body);
              if(r.status==1){
                console.log("[+]Logeado correctamente, sesión creada")
                console.log("[+]Extrayendo key..")
                request.get({url:clase.pagina_home+"/"+usuario,header: res.headers,jar: cookieJar},function(err,resp,body){
                   clase.id_usuario = clase.extraerDatoHtml(clase.html_regex['id_usuario_propio'],body);
                   console.log("c= " + clase.html_regex['key_seguridad'])
                   clase.key_seguridad = clase.extraerDatoHtml(clase.html_regex['key_seguridad'],body);
                   console.log("[+]Datos extraidos.." + clase.id_usuario)
                   console.log("[+]Tu key es "+clase.key_seguridad)

                });
              }
            console.log(r)
        });
       
    }}
    /*
	def logear(self,usuario,contraseña):#Logear con cuenta en taringa
		self.usuario_actual = usuario
		print("[+]Logeando..")
		parametros_login = {
			"connect":"",
			"nick":usuario,
			"pass":contraseña,
			"redirect":"/"+usuario,
		}
		logeo = self.peticionPOST(self.pagina_login,datos=parametros_login,)#solicitud de POST		
		json_generado = str(logeo.content)
		if "\"status\":1" in json_generado:
			print("[+]Logeado correctamente, sesión creada")
			print("[+]Extrayendo key..")
			if self.key_seguridad is None:
				code = self.peticionGET(self.pagina_home+"/"+usuario).text
				self.id_usuario = self.extraerDatoHtml(self.html_regex["id_usuario_propio"], code)[0]
				self.key_seguridad = self.extraerDatoHtml(self.html_regex["key_seguridad"], code)[0]
				print("[+]Datos extraidos..")
				print("[+]Tu key es "+self.key_seguridad)
			self.logeado = True
		else:
			print("[+]Fallo el logeo")*/