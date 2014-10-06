var blockPress = false;

function submit(value) {
  var anvisaNumber, serialNumber;
  blockPress = true;
  $("#enterDataMatrix").val('');
<<<<<<< HEAD
  if(value.indexOf('}[{-}]{')<0){
    value = value.trim();
    value =value.substring(0,25).trim()+'}[{-}]{'+value.substring(25,value.length-16).trim()+'}[{-}]{' +value.substring(value.length-16,value.length).trim();
  }
=======
>>>>>>> FETCH_HEAD
  value = dataMatrix.parseDataMatrix(value);
  anvisaNumber = value["713"];
  serialNumber = value["21"];
  $.ajax({
    type: "GET",
    url: "http://dashboard.rastreabilidadebrasil.com.br/rest/1/report/medical_item/public/anvisa/" +
      anvisaNumber + "/serial/" + serialNumber,
    dataType: 'json',
    xhrFields: {
      withCredentials: true
    },
    success: function(data) {
      var idToShow = 3; //Error
      if (+data.status !== 0) {
        idToShow = 2;
      }
      $(".et1").animate({
        opacity: 0.0
      }, 500, function() {
        showEt(idToShow);
      });

    },
    error: function(error) {
      if (+error.status === 404) {
        $(".et1").animate({
          opacity: 0.0
        }, 500, function() {
          showEt(4);
        });
      }
    }
  });

}

function checkValidade(e) {
<<<<<<< HEAD
  var keyCode = e.keyCode || e.which;
  e = e || window.event;
=======
  e = e || window.event;
  var keyCode = e.keyCode || e.which;
  console.log(keyCode + "_"+String.fromCharCode(keyCode)+"_");
>>>>>>> FETCH_HEAD
  if (keyCode === dataMatrix.DEFAULT_ASCII_SEPARATOR_CODE) {
    var newVal = $("#enterDataMatrix").val() + dataMatrix.DEFAULT_COMMON_SEPARATOR;
    $("#enterDataMatrix").val(newVal);
  } else {
    if (keyCode === 13) {
<<<<<<< HEAD
=======
      console.log('Codes');
      var value = $("#enterDataMatrix").val();
      for(var i=0;i<value.length;i++){
        console.log(value.charCodeAt(i));
      }
>>>>>>> FETCH_HEAD
      submit($("#enterDataMatrix").val());
    }
  }
}

function showEt(id) {
  $(".et" + id).css("display", "block");
  $(".et" + id).css("opacity", 0);
  $(".et" + id).animate({
    opacity: 1.0
  }, 500, function() {
    setTimeout(function() {
      $(".et" + id).animate({
        opacity: 0.0
      }, 500, function() {
        blockPress = false;
        $(".et" + id).css("display", "none");
        $("textarea[maxlength]").val("");
        $("textarea[maxlength]").focus();
        $(".et1").animate({
          opacity: 1.0
        }, 500);
      });
    }, 5000);
  });
}


$(document).ready(function() {
  $("textarea[maxlength]").focus();
});
