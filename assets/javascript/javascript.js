// console.log("What button was clicked: " + x) // checking what button was pressed
var id = "15bdf952"
var appKey = "f46dd27595c9f290dd53bcdc138f4b79"
var random = Math.floor(Math.random()*5)
var foods = ["steak","fish","chicken","tacos","rice","potatos","sushi",""];
var pickFood  = foods[random];
function apiCall(search) {
var queryURL = `https://api.edamam.com/search?q=${search}&app_id=${id}&app_key=${appKey}&from=0&to=6`
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
    console.log(response);
        // for (let i = 0; i < 6; i++) {
            $("#target1").html("<div class = 'float-left'> Recipe: " + response.hits[0].recipe.label + "<br> recipe URL: <a src=" + response.hits[0].recipe.url + ">" + response.hits[0].recipe.url + "</a><br> calories: " + response.hits[0].recipe.calories + "<br> <img src=" + response.hits[0].recipe.image + "> <br><br> </div>");
            $("#target2").html("<div class = 'float-left'> Recipe: " + response.hits[1].recipe.label + "<br> recipe URL: <a src=" + response.hits[1].recipe.url + ">" + response.hits[1].recipe.url + "</a><br> calories: " + response.hits[1].recipe.calories + "<br> <img src=" + response.hits[1].recipe.image + "> <br><br> </div>");
            $("#target3").html("<div class = 'float-left'> Recipe: " + response.hits[2].recipe.label + "<br> recipe URL: <a src=" + response.hits[2].recipe.url + ">" + response.hits[2].recipe.url + "</a><br> calories: " + response.hits[2].recipe.calories + "<br> <img src=" + response.hits[2].recipe.image + "> <br><br> </div>");
            $("#target4").html("<div class = 'float-left'> Recipe: " + response.hits[3].recipe.label + "<br> recipe URL: <a src=" + response.hits[3].recipe.url + ">" + response.hits[3].recipe.url + "</a><br> calories: " + response.hits[3].recipe.calories + "<br> <img src=" + response.hits[3].recipe.image + "> <br><br> </div>");
            $("#target5").html("<div class = 'float-left'> Recipe: " + response.hits[4].recipe.label + "<br> recipe URL: <a src=" + response.hits[4].recipe.url + ">" + response.hits[4].recipe.url + "</a><br> calories: " + response.hits[4].recipe.calories + "<br> <img src=" + response.hits[4].recipe.image + "> <br><br> </div>");
            $("#target6").html("<div class = 'float-left'> Recipe: " + response.hits[5].recipe.label + "<br> recipe URL: <a src=" + response.hits[5].recipe.url + ">" + response.hits[5].recipe.url + "</a><br> calories: " + response.hits[5].recipe.calories + "<br> <img src=" + response.hits[5].recipe.image + "> <br><br> </div>");
        //}
    });
}
$(".healthMore").on("click", function () {
    event.preventDefault();
    var status = $(".healthMore").text()
    if (status === 'See More')
    {
        $(".hiddenHealth").css("display", "block")
        $(".healthMore").text("See Less")
    }else{
        $(".hiddenHealth").css("display", "none")
        $(".healthMore").text("See More")
        
    }
});
var italianChk = $("#italianChk");
var asianChk = $("#asainChk");
var mexicanChk = $("#mexicanChk");
var americanChk = $("americanChk");
console.log(americanChk);

$("#random").click(function (){
    var search = foods[random];
    random = Math.floor(Math.random()*5);
    console.log(search);
    event.preventDefault();
    apiCall(search);
});
$("#search").click(function () {
    if (italianChk[0].checked) {
        var search = "italian " + $("#searchFood").val();
    } else if(asianChk[0].checked) {
        var search = "asain " + $("#searchFood").val();
    } else if (mexicanChk[0].checked) {
        var search = "mexican " + $("#searchFood").val();
    } else if (americanChk[0].checked) {
        var search = "american " + $("#searchFood").val();
    } else {
        var search = $("#searchFood").val();
    }
    console.log(JSON.stringify(search))
    event.preventDefault();
    apiCall(search);
});
$("#italian").click(function (){
    var search = "italian"
    console.log(search)
    event.preventDefault()
    apiCall(search);
});
$("#asian").click(function (){
    var search = "asian"
    console.log(search)
    event.preventDefault()
    apiCall(search);
});
$("#mexican").click(function (){
    var search = "mexican"
    console.log(search)
    event.preventDefault()
    apiCall(search);
});
$("#thai").click(function (){
    var search = "thai"
    console.log(search)
    event.preventDefault()
    apiCall(search);
});
console.log(random)
console.log(pickFood)
