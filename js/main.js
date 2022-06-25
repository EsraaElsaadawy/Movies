let response = "";
let responseJson = "";

$("#closeNav").hide()

var nameInput = document.getElementById('nameInput');
nameInput.addEventListener("input", function () {

    var regName = /^[a-zA-Z]+$/;
    if (!regName.test(nameInput.value)) {
        $(".invalideName").show()
    } else {
        $(".invalideName").hide()
    }
})

var emailInput = document.getElementById('emailInput');
emailInput.addEventListener("input", function () {

    var regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(emailInput.value)) {
        $(".invalideEmail").show()
    } else {
        $(".invalideEmail").hide()
    }
})

var phoneInput = document.getElementById('phoneInput');
phoneInput.addEventListener("input", function () {

    var regPhone = /^01[210][0-9]{8}$/;
    if (!regPhone.test(phoneInput.value)) {
        $(".invalidePhone").show()
    } else {
        $(".invalidePhone").hide()
    }
})

var ageInput = document.getElementById('ageInput');
ageInput.addEventListener("input", function () {

    var regAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    if (!regAge.test(ageInput.value)) {
        $(".invalideAge").show()
    } else {
        $(".invalideAge").hide()
    }
})

var passwordInput = document.getElementById('passwordInput');
passwordInput.addEventListener("input", function () {

    var regPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regPassword.test(passwordInput.value)) {
        $(".invalidePassword").show()
    } else {
        $(".invalidePassword").hide()
    }
})

var RepasswordInput = document.getElementById('RepasswordInput');
RepasswordInput.addEventListener("input", function () {

    var regRePassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!regRePassword.test(RepasswordInput.value)) {
        $(".invalideRePassword").show()
    } else {
        $(".invalideRePassword").hide()
    }
})

function openNav() {
    document.getElementById("mySidenav").style.left = "0px";
    $("#openNav").hide()
    $("#closeNav").show()
    setTimeout(() => {
        $(".navItem").css("margin-top", "0px")
    }, 500);
}

//   var openNav = document.getElementById("openNav");
//   openNav.addEventListener("click",function () {
//     alert(hello)
//   })

function closeNav() {
    document.getElementById("mySidenav").style.left = "-250px";
    $("#closeNav").hide()
    $("#openNav").show()
    $(".navItem").css("margin-top", "40vh")
}

var getMovies = document.getElementById("getMovies");
getMovies.addEventListener("input", function () {
    if (getMovies.value.trim() != "") {
        getData(`https://api.themoviedb.org/3/search/movie?api_key=6049397588123be43d996c1c718ecc23&language=en-US&page=1&query=${getMovies.value}`)
    }
})

var nowPlaying = document.getElementById("nowPlaying");
nowPlaying.addEventListener("click", function () { getData(`https://api.themoviedb.org/3/movie/now_playing?api_key=6049397588123be43d996c1c718ecc23&language=en-US&page=1`) })

var popular = document.getElementById("popular");
popular.addEventListener("click", function () { getData(`https://api.themoviedb.org/3/movie/popular?api_key=6049397588123be43d996c1c718ecc23&language=en-US&page=1`) })

var topRated = document.getElementById("topRated");
topRated.addEventListener("click", function () { getData(`https://api.themoviedb.org/3/movie/top_rated?api_key=6049397588123be43d996c1c718ecc23&language=en-US&page=1`) })

var trending = document.getElementById("trending");
trending.addEventListener("click", function () { getData(`https://api.themoviedb.org/3/trending/movie/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR3ay5Z24zz1lcxSd4mGfaLUaqlkqQWuSNYHVkBab4M5R0h1QP59cnLpH1g`) })

var upcoming = document.getElementById("upcoming");
upcoming.addEventListener("click", function () { getData(`https://api.themoviedb.org/3/movie/upcoming?api_key=6049397588123be43d996c1c718ecc23&language=en-US&page=1`) })

getData(`https://api.themoviedb.org/3/trending/movie/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR3ay5Z24zz1lcxSd4mGfaLUaqlkqQWuSNYHVkBab4M5R0h1QP59cnLpH1g`)
async function getData(URL) {
    response = await fetch(URL)
    responseJson = await response.json()
    console.log(responseJson);

    displayData();
}

function displayData() {
    let cartoona = "";
    if (responseJson != null) {
        if (responseJson.results != null) {
            for (let i = 0; i < responseJson.results.length; i++) {
                cartoona += `<div class="col-md-4  position-relative imgContainer">
                    <img src="https://image.tmdb.org/t/p/w500${responseJson.results[i].poster_path}" class="w-100">
                    <div class="caption text-center text-black position-absolute p-3">
                        <h2>${responseJson.results[i].title}</h2>
                        <p>${responseJson.results[i].overview}</p>
                        <p>${responseJson.results[i].vote_average}</p>
                        <p>${responseJson.results[i].release_date}</p>
                    </div>
                    </div>`
            }
            document.getElementById("movies").innerHTML = cartoona;
        }
    }
}

var search = document.getElementById("search");
search.addEventListener("input", function () {
    if (search.value.trim() != "") {
        if (responseJson != null) {
            if (responseJson.results != null) {
                let cartoona = "";
                console.log("results", responseJson.results)
                for (let i = 0; i < responseJson.results.length; i++) {
                    console.log("responseJson.results[i]", responseJson.results[i])
                    if (responseJson.results[i].title.toLowerCase().includes(search.value.toLowerCase())) {
                        cartoona += `<div class="col-md-4  position-relative imgContainer">
                        <img src="https://image.tmdb.org/t/p/w500${responseJson.results[i].poster_path}" class="w-100">
                        <div class="caption text-center text-black position-absolute p-3">
                            <h2>${responseJson.results[i].title}</h2>
                            <p>${responseJson.results[i].overview}</p>
                            <p>${responseJson.results[i].vote_average}</p>
                            <p>${responseJson.results[i].release_date}</p>
                        </div>
                        </div>`
                    }
                }
                document.getElementById("movies").innerHTML = cartoona;
            }
        }
    }

})

$("#contactBtn").click(function (e) {
    let clickedItem = $(e.target).attr('href')
    let sectionOffset = $(clickedItem).offset().top;
    $('html,body').animate({ scrollTop: sectionOffset })
})