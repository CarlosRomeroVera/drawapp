myApp.onPageInit('ActivosUser', function (page) {
    document.getElementById('buscar').focus();
	document.onkeydown = function(e){
  
	    e=window.event;
	    if(!window.event)return false;
	 	if(e.keyCode == 37 && e.altKey==true )
		{return false;} 
		if((e.keyCode == 116 || e.keyCode == 82) && e.ctrlKey==true)
		{return false;} 
	    if(e.keyCode == 13)
		{return false;} 
	}
	$("#buscar").on('keyup', function(){
        var value = $(this).val();
        busca(value);
    }).keyup();

    $('#cancel').on('click', function(){
    	//alert('cancel');
    	busca('');
    });

    
});