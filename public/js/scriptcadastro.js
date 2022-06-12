
function user(user) {
  
  if (user == 'paci') {
      //tratando os inputs médico
      document.getElementById("ufcrm").hidden = true;
      document.getElementById("inputZip").hidden = true;
      document.getElementById("prof").hidden = true;
      document.getElementById("nomeprof").hidden = true;
      document.getElementById("status").hidden = true;
      document.getElementById("inputzip2").hidden = true;

      //tratando as Labels
      document.getElementById("label1").hidden = true;
      document.getElementById("prof1").hidden = true;
      document.getElementById("nomeprof1").hidden = true;
      document.getElementById("ufcrm1").hidden = true;
      document.getElementById("status1").hidden = true;
      document.getElementById("inputzip3").hidden = true;

    } else if (user == 'psic') {

      document.getElementById("inputzip3").hidden = false;
      document.getElementById("inputzip2").hidden = false;
      

      //tratando os inputs médico

      document.getElementById("ufcrm").hidden = true;
      document.getElementById("inputZip").hidden = true;
      document.getElementById("prof").hidden = true;
      document.getElementById("nomeprof").hidden = true;
      document.getElementById("status").hidden = true;

      //tratando as Labels
      document.getElementById("label1").hidden = true;
      document.getElementById("prof1").hidden = true;
      document.getElementById("nomeprof1").hidden = true;
      document.getElementById("ufcrm1").hidden = true;
      document.getElementById("status1").hidden = true;

    } else if (user == 'crm') {
      //tratando os inputs médico
      document.getElementById("ufcrm").hidden = false;
      document.getElementById("inputZip").hidden = false;
      document.getElementById("prof").hidden = false;
      document.getElementById("nomeprof").hidden = false;
      document.getElementById("status").hidden = false;
      document.getElementById("inputzip2").hidden = true;

      //tratando as Labels
      document.getElementById("label1").hidden = false;
      document.getElementById("prof1").hidden = false;
      document.getElementById("nomeprof1").hidden = false;
      document.getElementById("ufcrm1").hidden = false;
      document.getElementById("status1").hidden = false;
      document.getElementById("inputzip3").hidden = true;
    }
  }
  /*Carregar Modal, carregamento pagina */
  $(window).load(function () {
    $('#perfil').modal('show');

    $(".radio").click(function(){
      $("#perfil").modal("hide");
    });

  });



  /*Visualizar senhas*/
  function opensenha() {

    const visual2 = document.getElementById("inputPassword")
    const visua3 = document.getElementById("inputPasswordConfirm")

    if (visua3.type == "password") {
      visua3.type = "text"
    } else {
      visua3.type = "password"
    }

    if (visual2.type == "password") {
      visual2.type = "text"
    } else {
      visual2.type = "password"
    }
  }

  /* Mascaras */
  $(document).ready(function () {
    $('#inputZip1').mask('000.000.000-00', { reverse: true });
    $('#inputAddress').mask('00000-000', { reverse: false });
    $('#cnpj').mask('00.000.000/0000-00', { reverse: false });
    $('#inputZip').mask('00000', { reverse: false });
    $('#inputzip2').mask('00000', { reverse: false });
    $('#nascimento').mask('00/00/0000', { reverse: true });
  });

