function OpenSenha() {

    const visual2 = document.getElementById("inputPassword1")
    const visua3 = document.getElementById("inputPasswordConfirm1")

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
