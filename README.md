# Taringa

It's api for V7 of (taringa)[https://www.taringa.net/]. 

## Install

```bash
>npm i taringa 
```
## Run

```javascript

const t = require("taringa");
var taringa = new t();
taringa.logear("user","password");
taringa.shoutear("text for testing","");
taringa.deslogear();
``` 
## Available functions:

Logear()

Desloguear()

shoutear(contenido, url_multimedia)

# TODO

shoutearAUsuario(usuario, mensaje, multimedia)

likearShout(url_shout)

unlikearShout(url_shout)

comentarShout(url_shout)

reshoutear(url_shout)

subirArchivoDesdeUrl(url_archivo)

crearPost()

comentarUnPost(url_post)

votarShout(url_shout)

denunciarPost(post,razon,aclaracion, preguntar)

bloquearUsuario(nick), 

desbloquearUsuario(nick)

seguirUsuario(nick), 

dejarDeSeguirUsuario(nick)

feedPost() #Lanza lista con posts recientes o a eleccion

feedShout() #lanza shouts recientes

likearFeedShout() #para likear todos los shouts recientes

comentarFeedPost(comentario, url_imagen) #comentar posts de paginas principales
