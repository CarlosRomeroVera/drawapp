myApp.onPageInit('DetallesUser', function (page) {
    cont = 0;
    $.ajax({
        type: 'POST', 
        url:  window.server + 'obtener_asuntos.php',
        data:   ({
                    
                }),
        cache: false,
        dataType: 'text',
        success: function(data){
            
            if(data != 'error'){
                var obj = $.parseJSON(data);
                var datos = '';
        
                $.each(obj.asunto, function(i,asunto){
                    //alert(asunto.id);
                    datos = datos + '<option value="'+asunto.id+'">'+asunto.nombre+'</option>'
                });
                $("#asuntos").html(datos);
            }
        }
    });//fin de ajax
	$.ajax({
        type: 'POST', 
        url:  window.server + 'obtener_detalles.php',
        data:   ({
                    id: window.resultado_id,
                }),
        cache: false,
        dataType: 'text',
        success: function(data){
            if (data != 'Error') {
                var obj = $.parseJSON(data);
                var html = '';
                $.each(obj.persona, function(i,persona){
                    contenido = "";
                    for (var i = 0; i < persona.hora_entrada.length; i ++){
                        contenido += (persona.hora_entrada.charAt(i) == " ") ? "T" : persona.hora_entrada.charAt(i);
                    }
                    if (persona.hora_salida != null) {
                        contenidoSalida = "";
                        for (var i = 0; i < persona.hora_salida.length; i ++){
                            contenidoSalida += (persona.hora_salida.charAt(i) == " ") ? "T" : persona.hora_salida.charAt(i);
                        }
                        document.getElementById("fechaSalida").value = contenidoSalida;
                    }
                    $('#nombre').val(persona.nombre);
                    document.getElementById("fecha").value = contenido;
                    $('#dependencia').val(persona.dependencia);
                    $('#asuntos').val(persona.asunto_id);
                    $('#comentarios').val(persona.comentarios);
                    $("#evidencia").attr("src", persona.evidencia);
                    $("#firma").attr("src", persona.firma);
                });
            }else{
                alert('Error al conectar a la bd');
            }
            
        }
    }).fail( function() {
        myApp.alert('Comprueba tu conexión a internet e intenta de nuevo', '¡Atención!');

    });//fin de ajax  

    $$('#finish').on('click', function(){
        $('#finish').attr("disabled", true);
        $.ajax({
            type: 'POST', 
            url:  window.server + 'editar_visita.php',
            data:   ({
                        id: window.resultado_id,
                        nombre: $("#nombre").val(),
                        horallegada: $("#fecha").val(),
                        horasalida: $("#fechaSalida").val(),
                        dependencia: $("#dependencia").val(),
                        asunto: $("#asuntos").val(),
                        comentarios: $("#comentarios").val(),
                    }),
            cache: false,
            dataType: 'text',
            //contentType: 'multipart/form-data',
            success: function(data){
                if (data == 'ok') {
                    $('#finish').attr("disabled", false);
                    myApp.alert('Datos guardados', '¡Atención!');
                    //mainView.router.loadPage('../User/Activos.html');
                    mainView.router.back();
                }
                //alert(data);
            }
        }).fail( function() {
            $('#finish').attr("disabled", false);
            //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
            myApp.alert('Comprueba tu conexión a internet e intenta de nuevo', '¡Atención!');

        });//fin de ajax
    });
});