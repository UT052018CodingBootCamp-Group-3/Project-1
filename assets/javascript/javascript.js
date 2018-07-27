
// Initialize Firebase
var config = {
    apiKey: "AIzaSyArBLY0gPP8YyjMOKMDVMoaTbILXeggXV8",
    authDomain: "project-1-88731.firebaseapp.com",
    databaseURL: "https://project-1-88731.firebaseio.com",
    projectId: "project-1-88731",
    storageBucket: "project-1-88731.appspot.com",
    messagingSenderId: "742279473370"
};
firebase.initializeApp(config);

var database = firebase.database();
var proxy = 'https://cors-anywhere.herokuapp.com/';
var foods = ["steak", "fish", "chicken", "tacos", "rice", "potatos", "sushi", "apples"];
var random = Math.floor(Math.random() * foods.length);
var counter;
var pickFood = foods[random];
var ingredients = [];
var ingredients = [];
var searchTrack = [];
var foodCount = 0;
var ingredientsTrack1 = [];
var ingredientsTrack2 = [];
var ingredientsTrack3 = [];
var ingredientsTrack4 = [];
var ingredientsTrack5 = [];
var ingredientsTrack6 = [];
var pickFood = foods[random];
var holder = [];

function contentSetup(counter, title, serve, calories, image, url, healthlabel) {
    $('.searchContent').append(`
        <div class="col-sm-6"><div class="well listing" id="target${counter}">
        <div><h1>${title}</h1></div>
        <div>Serving Size: ${serve}</div>
        <div>Calories per Serving: ${calories}</div>
        <div>Health Labels: ${healthlabel}</div>
        <div><img class="foodImg" src="${image}"></img></div>
        <div><input type="submit" value="SEE FULL RECEIPE" onclick="window.open('${url}')"></input></div>
    `)

    console.log("Content Setup Ran")
}

function apiCall(search) {

    var id = "15bdf952"
    var appKey = "f46dd27595c9f290dd53bcdc138f4b79"

    var queryURL = `https://api.edamam.com/search?q=${search}&app_id=${id}&app_key=${appKey}&from=0&to=6`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (let w = 0; w < 6; w++) {
            holder.push(response.hits[w].recipe.ingredientLines);
        }
        for (let i = 0; i < 6; i++) {
            $("#target" + i).html("<div class = 'float-left'> Recipe: " + response.hits[i].recipe.label + "<br> recipe URL: <a src=" + response.hits[i].recipe.url + ">" + response.hits[i].recipe.url + "</a><br> calories: " + response.hits[i].recipe.calories + "<br> <img src=" + response.hits[i].recipe.image + "> <br><br> <div class = 'float-left move' id='ing" + i + "' > ingredients: </div></div>");

        }
        for (let i = 0; i < 6; i++) {
            for (let w = 0; w < holder[i].length; w++) {
                $("#ing" + i).append("<br> " + holder[i][w] + "<br>");
            }
        }

        for (counter = 0; counter < 6; counter++) {
            var title = response.hits[counter].recipe.label
            var serve = response.hits[counter].recipe.yield
            var calories = Math.round(response.hits[counter].recipe.calories / serve)
            var image = response.hits[counter].recipe.image
            var url = response.hits[counter].recipe.url
            var healthlabel;

            for (var healthCounter = 0; healthCounter < response.hits[counter].recipe.healthLabels.length; healthCounter++) {
                if (healthlabel == undefined) {
                    healthlabel = `<small>${response.hits[counter].recipe.healthLabels[healthCounter]}</small>`
                }
                else {
                    healthlabel += `<small>${response.hits[counter].recipe.healthLabels[healthCounter]}</small>`
                }
            }

            contentSetup(counter, title, serve, calories, image, url, healthlabel)
        }

        healthlabel = undefined

    });
}

$(".healthMore").on("click", function () {
    event.preventDefault();
    var status = $(".healthMore").text()
    if (status === 'See More') {
        $(".hiddenHealth").css("display", "block")
        $(".healthMore").text("See Less")
    } else {
        $(".hiddenHealth").css("display", "none")
        $(".healthMore").text("See More")
    }
});

var italianChk = $("#italianChk");
var asianChk = $("#asainChk");
var mexicanChk = $("#mexicanChk");
var americanChk = $("#americanChk");

$("#random").click(function () {
    var search = foods[random];
    random = Math.floor(Math.random() * foods.length);
    console.log(search);
    event.preventDefault();
    apiCall(search);
});
var objSearch = {
    food: search,
    count: 0
}
$("#search").click(function () {
    event.preventDefault();

    if (italianChk[0].checked) {
        var search = "italian " + $("#searchFood").val();
    } else if (asianChk[0].checked) {
        var search = "asain " + $("#searchFood").val();
    } else if (mexicanChk[0].checked) {
        var search = "mexican " + $("#searchFood").val();
    } else if (americanChk[0].checked) {
        var search = "american " + $("#searchFood").val();
    } else {
        var search = $("#searchFood").val();
    }

    if (!(searchTrack.includes(search))) {
        searchTrack.push(search);
        objSearch.count = 0;
        objSearch.count += 1;
        console.log(objSearch.count)
        database.ref().child(search).set({
            count: objSearch.count
        })
    } else {
        objSearch.count += 1;
        database.ref(search).set({
            count: objSearch.count
        })
    }

    console.log(searchTrack);
    console.log(JSON.stringify(search))
    apiCall(search);
});

$("#italian").click(function () {
    var search = "italian"
    console.log(search)
    event.preventDefault()
    apiCall(search);
});

$("#asian").click(function () {
    var search = "asian"
    console.log(search)
    event.preventDefault()
    apiCall(search);
});

$("#mexican").click(function () {
    var search = "mexican"
    console.log(search)
    event.preventDefault()
    apiCall(search);
});

$("#thai").click(function () {
    var search = "thai"
    console.log(search)
    event.preventDefault()
    apiCall(search);
});

apiCall("chicken")