


$('#choose').click(function(){
 
    var grtn = G$('Abhishek','Ranjan');

    $('#logindiv').hide();

    grtn.setLang($('#lang').val()).HtmlGreeting('#greeting',true).log();
});