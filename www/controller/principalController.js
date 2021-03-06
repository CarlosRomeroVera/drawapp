myApp.onPageInit('PrincipalUser', function (page) {
    function asignarAsuntos(){
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
                    $("#asuntosFirst").html(datos);
                }
            }
        }).fail( function() {

            //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
            asignarAsuntos();

        });//fin de ajax
    }
    

	var canvas,ctx;

    // Variables to keep track of the mouse position and left-button status 
    var mouseX,mouseY,mouseDown=0;

    // Variables to keep track of the touch position
    var touchX,touchY;

    // Draws a dot at a specific position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    function drawDot(ctx,x,y,size) {
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        r=0; g=0; b=0; a=255;

        // Select a fill style
        ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";

        // Draw a filled circle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    } 

    // Clear the canvas context using the canvas width and height
    function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Keep track of the mouse button being pressed and draw a dot at current location
    function sketchpad_mouseDown() {
        mouseDown=1;
        drawDot(ctx,mouseX,mouseY,6);
    }

    // Keep track of the mouse button being released
    function sketchpad_mouseUp() {
        mouseDown=0;
    }

    // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    function sketchpad_mouseMove(e) { 
        // Update the mouse co-ordinates when moved
        getMousePos(e);

        // Draw a dot if the mouse button is currently being pressed
        if (mouseDown==1) {
            drawDot(ctx,mouseX,mouseY,6);
        }
    }

    // Get the current mouse position relative to the top-left of the canvas
    function getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }

    // Draw something when a touch start is detected
    function sketchpad_touchStart() {
        // Update the touch co-ordinates
        getTouchPos();

        drawDot(ctx,touchX,touchY,6);

        // Prevents an additional mousedown event being triggered
        event.preventDefault();
    }

    // Draw something and prevent the default scrolling when touch movement is detected
    function sketchpad_touchMove(e) { 
        // Update the touch co-ordinates
        getTouchPos(e);

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        drawDot(ctx,touchX,touchY,6); 

        // Prevent a scrolling action as a result of this touchmove triggering.
        event.preventDefault();
    }

    // Get the touch position relative to the top-left of the canvas
    // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    function getTouchPos(e) {
        if (!e)
            var e = event;

        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    }

    var drawTouch = function() {
        var start = function(e) {
            ctx.beginPath();
            getTouchPos();
            // x = e.changedTouches[0].pageX;
            // y = e.changedTouches[0].pageY-44;
            x = touchX;
            y = touchY;
            ctx.moveTo(x,y);
        };
        var move = function(e) {
            e.preventDefault();
            getTouchPos();
            // x = e.changedTouches[0].pageX;
            // y = e.changedTouches[0].pageY-44;
            x = touchX;
            y = touchY;
            ctx.lineTo(x,y);
            ctx.stroke();
        };
        document.getElementById("sketchpad").addEventListener("touchstart", start, false);
        document.getElementById("sketchpad").addEventListener("touchmove", move, false);
    }; 


    // Set-up the canvas and add our event handlers after the page has loaded
    function init() {
        // Get the specific canvas element from the HTML document
        //canvas = document.getElementById('sketchpad');
        var canvas = '<canvas id="sketchpad" width="'+(window.innerWidth-25)+'" height="300"></canvas>';
        document.getElementById("preCanvas").innerHTML = canvas;
        canvas = document.getElementById('sketchpad');
        asignarAsuntos();


        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (canvas.getContext)
            ctx = canvas.getContext('2d');
            ctx.strokeStyle = "#000";
            ctx.lineWidth = 5;

        // Check that we have a valid context to draw on/with before adding event handlers
        if (ctx) {
            // React to mouse events on the canvas, and mouseup on the entire document
            //canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
            //canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
            //window.addEventListener('mouseup', sketchpad_mouseUp, false);

            // React to touch events on the canvas
            // canvas.addEventListener('touchstart', sketchpad_touchStart, false);
            // canvas.addEventListener('touchmove', sketchpad_touchMove, false);
            drawTouch();
        }
    }

    init();

    $$('#clear').on('click', function(){
        init();
    });

    var imagen = '';

    jQuery('#evidencia').on('change', function(e) {
        var Lector,
        oFileInput = this;
     
        if (oFileInput.files.length === 0) {
            return;
        };
     
        Lector = new FileReader();
        Lector.onloadend = function(e) {
            // jQuery('#vistaPrevia').attr('src', e.target.result); 
            imagen = e.target.result;         
        };
        Lector.readAsDataURL(oFileInput.files[0]);
    });

    $$('#finish').on('click', function(){
        $('#finish').attr("disabled", true);
        var id = generateUUID();
        canvas = document.getElementById('sketchpad');
        var dataURL = canvas.toDataURL();
        $.ajax({
            type: 'POST', 
            url:  window.server + 'guardar_visita.php',
            data:   ({
                        id: id,
                        user_id: window.user_id,
                        nombre: $("#nombre").val(),
                        horallegada: $("#fecha").val(),
                        horasalida: $("#fechaSalida").val(),
                        dependencia: $("#dependencia").val(),
                        asunto: $("#asuntosFirst").val(),
                        comentarios: $("#comentarios").val(),
                        evidencia: imagen,
                        firma: dataURL,
                    }),
            cache: false,
            dataType: 'text',
            //contentType: 'multipart/form-data',
            success: function(data){
                if (data == 'ok') {
                    $('#finish').attr("disabled", false);
                    myApp.alert('Datos guardados', '¡Atención!');
                    mainView.router.refreshPage();
                }
            }
        }).fail( function() {
            $('#finish').attr("disabled", false);
            //alert( 'Comprueba tu conexión a internet e intenta de nuevo' );
            myApp.alert('Comprueba tu conexión a internet e intenta de nuevo', '¡Atención!');

        });//fin de ajax
    });
});