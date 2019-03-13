# EasyPage

*Guia de inicio rapido*

Para uso basico solo debes de modificar los archivos dentro de las carpetas *routes* y *views*

## Instalación.

1.-Instala el microframework con ayuda de composer `composer create-project yinblack/easypage` ó descargando directamente los archivos de este repositorio.

## Personalización.

Si necesitas variables utilizables en cualquier vista puedes crearlas en el archivo *routes/config.json*, estas se convierten automaticamente en variables twig.

## Soporte para webs multilenguaje.

Soporte programado para 9 lenguajes mas el default:
1. Español; es
2. Ingles; en
3. Chino; zh
4. Alemán; de
5. Francés; fr
6. Portugués; pt
7. Italiano; it
8. Ruso; ru
9. Japones; ja

Automaticamente al poner la abreviatura de el lenguaje concatenada con *_*, ejemplo: `index_en` . Creara la variable: `const.LAN == "_en"` con la cual puedes trabajar en las vistas con ayuda de twig para crear algo asi:
```

{% if const.LAN == "_es" %}
<p>LENGUAJE: Español</p>
{% elseif const.LAN == "_en" %}
<p>LENGUAJE: Ingles</p>
{% elseif const.LAN == "_de" %}
<p>LENGUAJE: Alemán</p>
{% elseif const.LAN == "_zh" %}
<p>LENGUAJE: Chino</p>
{% elseif const.LAN == "_fr" %}
<p>LENGUAJE: Francés</p>
{% elseif const.LAN == "_pt" %}
<p>LENGUAJE: Portugués</p>
{% elseif const.LAN == "_it" %}
<p>LENGUAJE: Italiano</p>
{% elseif const.LAN == "_ru" %}
<p>LENGUAJE: Ruso</p>
{% elseif const.LAN == "_ja" %}
<p>LENGUAJE: Japones</p>
{% else %}
<p>LENGUAJE: Default</p>
{% endif %}

```
Esta es una forma eficaz para crear una pagina multilenguaje.
