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
var id = "15bdf952"
var appKey = "f46dd27595c9f290dd53bcdc138f4b79"
var foods = ["steak", "fish", "chicken", "tacos", "rice", "potatos", "sushi", "apples"];
var random = Math.floor(Math.random() * foods.length);
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
var prices = [];
var total = 0;

function contentSetup(a, title, serve, calories, dietLabels, healthLabels, image) {
    $('.searchContent').append(`
        <div class="col-sm-6"><div class="well listing" id="target${a}">
        <div><h1>${title}</h1></div>
        <div>Serving: ${serve}</div>
        <div>Calories: ${calories}</div>
        <div></div>
        <div></div>
        <div><img src="${image}"></img></div>
        </div></div>
    `)
}

function apiCall(search) {

    var queryURL = `https://api.edamam.com/search?q=${search}&app_id=${id}&app_key=${appKey}&from=0&to=6`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // for (let i = 0; i < 6; i++) {
        // $("#target1").html("<div class = 'float-left'> Recipe: " + response.hits[0].recipe.label + "<br> recipe URL: <a src=" + response.hits[0].recipe.url + ">" + response.hits[0].recipe.url + "</a><br> calories: " + response.hits[0].recipe.calories + "<br> <img src=" + response.hits[0].recipe.image + "> <br><br> </div>");
        // $("#target2").html("<div class = 'float-left'> Recipe: " + response.hits[1].recipe.label + "<br> recipe URL: <a src=" + response.hits[1].recipe.url + ">" + response.hits[1].recipe.url + "</a><br> calories: " + response.hits[1].recipe.calories + "<br> <img src=" + response.hits[1].recipe.image + "> <br><br> </div>");
        // $("#target3").html("<div class = 'float-left'> Recipe: " + response.hits[2].recipe.label + "<br> recipe URL: <a src=" + response.hits[2].recipe.url + ">" + response.hits[2].recipe.url + "</a><br> calories: " + response.hits[2].recipe.calories + "<br> <img src=" + response.hits[2].recipe.image + "> <br><br> </div>");
        // $("#target4").html("<div class = 'float-left'> Recipe: " + response.hits[3].recipe.label + "<br> recipe URL: <a src=" + response.hits[3].recipe.url + ">" + response.hits[3].recipe.url + "</a><br> calories: " + response.hits[3].recipe.calories + "<br> <img src=" + response.hits[3].recipe.image + "> <br><br> </div>");
        // $("#target5").html("<div class = 'float-left'> Recipe: " + response.hits[4].recipe.label + "<br> recipe URL: <a src=" + response.hits[4].recipe.url + ">" + response.hits[4].recipe.url + "</a><br> calories: " + response.hits[4].recipe.calories + "<br> <img src=" + response.hits[4].recipe.image + "> <br><br> </div>");
        // $("#target6").html("<div class = 'float-left'> Recipe: " + response.hits[5].recipe.label + "<br> recipe URL: <a src=" + response.hits[5].recipe.url + ">" + response.hits[5].recipe.url + "</a><br> calories: " + response.hits[5].recipe.calories + "<br> <img src=" + response.hits[5].recipe.image + "> <br><br> </div>");
        for (let w = 0; w < 6; w++) {
            holder.push(response.hits[w].recipe.ingredientLines);
        }
        for (let i = 0; i < 6; i++) {
            $("#target" + i).html("<div class = 'float-left'> Recipe: " + response.hits[i].recipe.label + "<br> recipe URL: <a src=" + response.hits[i].recipe.url + ">" + response.hits[i].recipe.url + "</a><br> calories: " + Math.round(response.hits[i].recipe.calories) + "<br> <img class = 'float-left' src=" + response.hits[i].recipe.image + "> <br><br> <div class = 'float-left' id='ing" + i + "' > ingredients: </div></div>");

        }
        for (let i = 0; i < 6; i++) {
            for (let w = 0; w < holder[i].length; w++) {
                $("#ing" + i).append("<br> " + holder[i][w] + "<br>");
            }
        }
        for (let i = 0; i < 6; i++) {
        var title = response.hits[i].recipe.label
        var serve = response.hits[i].recipe.yield
        var calories = Math.round(response.hits[i].recipe.calories)
        var instruction = response.hits[i].recipe.url
        // var dietLabels = []
        // var healthLabels = []
        var image = response.hits[i].recipe.image

        contentSetup(i, title, serve, calories, dietLabels, healthLabels, image)
        }
    });
}

function apiCall2(search2) {
    var queryURL2 = `http://api.walmartlabs.com/v1/search?apiKey=3psax5qauewy3f2gtrj5hvyd&query=${search2}`
    $.ajax({
        url: proxy + queryURL2,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#walmart").empty();
        for (let i = 0; i < response.items.length; i++) {
            $("#walmart").append(response.items[i].name + "<br> sale price: <p id = 'price" + i + "' value = '" + response.items[i].salePrice +"'>$" + response.items[i].salePrice + "</p><br> <br>")
     }
    });
}
$(document).on("click", "#price0", function(){
    prices.push(Number(document.getElementById("price0").getAttribute("value")));
    console.log(prices);
});
$(document).on("click", "#price1", function(){
    prices.push(Number(document.getElementById("price1").getAttribute("value")));
    console.log(prices);
});
$(document).on("click", "#price2", function(){
    prices.push(Number(document.getElementById("price2").getAttribute("value")));
    console.log(prices);
});
$(document).on("click", "#price3", function(){
    prices.push(Number(document.getElementById("price3").getAttribute("value")));
    console.log(prices);
});
$(document).on("click", "#price4", function(){
    prices.push(Number(document.getElementById("price4").getAttribute("value")));
    console.log(prices);
});
$(document).on("click", "#price5", function(){
    prices.push(Number(document.getElementById("price5").getAttribute("value")));
    console.log(prices);
});
$(document).on("click", "#price6", function(){
    prices.push(Number(document.getElementById("price6").getAttribute("value")));
    console.log(prices);
});
$(document).on("click", "#price7", function(){
    prices.push(Number(document.getElementById("price7").getAttribute("value")));
    console.log(prices);
});
$(document).on("click", "#price8", function(){
    prices.push(Number(document.getElementById("price8").getAttribute("value")));
    console.log(prices);
});
$(document).on("click", "#price9", function(){
    prices.push(Number(document.getElementById("price9").getAttribute("value")));
    console.log(prices);
});
$("#calc").click( function () {
    for (let i = 0; i < prices.length; i++) {
        total = total + prices[i];
    }
    $("#total").text(total);
});
$("#calcClear").click(function () {
    $("#total").text("");
    total = 0;
    prices =  [];
});
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
$("#searchWm").click(function () {
    var search2 = $("#searchWalmart").val();
    apiCall2(search2);
});
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
    event.preventDefault();
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