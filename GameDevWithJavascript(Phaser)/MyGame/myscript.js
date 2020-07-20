$(document).ready(function () {

    $('input').tooltip({
        position:{
            my:"left center",
            at:"right center"
        }
    });


    $(".radio").checkboxradio({
        icon: true
    });


    $("#dialog").dialog({
        autoOpen: false,
        buttons: [
            {
              text: "Procceed",
              click: function() {
                $( this ).dialog( "close" );
                $("#test").show();
              }
            }
          ]
        
    });

    $("#button").on("click",function(){
        let name = $("#name").val();
        $('#text').text(name + " please procced by clicking procced");
        $('#form').hide()
        $("#dialog").dialog("open");
    })

    $("#button").button();

})

