var blockPress = false;

function submit(value) {
  var anvisaNumber, serialNumber;
  blockPress = true;
  this.$("#enterDataMatrix").val('');
  value = dataMatrix.parseDataMatrix(value);
  if (!this.validateRBParsedDataMatrix(value)) {
    anvisaNumber = parsedDataMatrix["713"];
    serialNumber = parsedDataMatrix["21"];
    $.ajax({
      type: "GET",
      url: "http://dashboard.rastreabilidadebrasil.com.br/rest/1/report/medical_item/public/anvisa/" +
        anvisaNumber + "/serial/" + serialNumber,
      dataType: 'json',
      success: function(data) {
        var idToShow=3;//Error
        if(+data.status!==0){
          idToShow=2;
        }
        $(".et1").animate({
          opacity: 0.0
        }, 500, function() {
          showEt(idToShow);
        });

      },
      error: function(error){
          if(+error.status===404){
            $(".et1").animate({
              opacity: 0.0
            }, 500, function() {
              showEt(4);
            });
          }
      }
    });
  }
}

function checkValidade() {
  var keyCode = e.keyCode || e.which;
  if (keyCode === dataMatrix.DEFAULT_ASCII_SEPARATOR_CODE) {
    var newVal = this.$("#enterDataMatrix").val() + dataMatrix.DEFAULT_COMMON_SEPARATOR;
    this.$("#enterDataMatrix").val(newVal);
  } else {
    if (keyCode === 13) {
      submit(this.$("#enterDataMatrix").val());
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
