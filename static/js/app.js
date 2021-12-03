function submit(){
        document.getElementById("clearsave").hidden = true;
    var name = document.getElementById('inputid').value;
    var xhttp = new XMLHttpRequest();
    var gender = localStorage.getItem(`mrsormr-${name}`);
    if (gender){
        document.getElementById("clearsave").hidden = false;
        document.getElementById("message").textContent = `Saved Answer\n\n${gender}`;
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           // Typical action to be performed when the document is ready:
           const obj = JSON.parse(xhttp.responseText);
           var gender = obj.gender;
           if (gender == null){
                gender = "not found";
           }
           document.getElementById("prob").textContent= obj.probability;
           document.getElementById("gender").textContent= gender;
        }else if(this.readyState == 4){
            console.log(this.readyState)
            console.log(this.status)
            if (document.getElementById("error").hidden){
                document.getElementById("error").hidden = false;
                setTimeout(
                    function(){
                        document.getElementById("error").hidden = true;
                    }, 5000);
            }
        }
    };
    xhttp.open("GET", `https://api.genderize.io/?name=${name}`, true);
    xhttp.send();
}

function save(){
    if(!document.querySelector('input[name="selectgender"]:checked')){
        document.getElementById("genderbox").style.borderWidth = 'thin';
        document.getElementById("genderalert").hidden = false;
        setTimeout(
            function(){
                document.getElementById("genderbox").style.borderWidth = 0;
                document.getElementById("genderalert").hidden = true;
            }, 5000);
        return
    }
    document.getElementById("genderbox").style.borderWidth = 0;
    document.getElementById("genderalert").hidden = true;
    var name = document.getElementById('inputid').value;
    if (!name){
        document.getElementById("genderalert2").hidden = false;
        setTimeout(
            function(){
                document.getElementById("genderbox").style.borderWidth = 0;
                document.getElementById("genderalert2").hidden = true;
            }, 5000);
        return
    }
    document.getElementById("genderbox").style.borderWidth = 0;
    document.getElementById("genderalert2").hidden = true;
    var gender = document.querySelector('input[name="selectgender"]:checked').value
    localStorage.setItem(`mrsormr-${name}`, gender)
    document.getElementById("clearsave").hidden = false;
    document.getElementById("message").textContent = `Saved Answer\n\n${gender}`;
}

function clean(){
    var name = document.getElementById('inputid').value;
    localStorage.removeItem(`mrsormr-${name}`)
    document.getElementById("clearsave").hidden = true;
}