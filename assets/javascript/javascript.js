
// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyArBLY0gPP8YyjMOKMDVMoaTbILXeggXV8",
//     authDomain: "project-1-88731.firebaseapp.com",
//     databaseURL: "https://project-1-88731.firebaseio.com",
//     projectId: "project-1-88731",
//     storageBucket: "project-1-88731.appspot.com",
//     messagingSenderId: "742279473370"
// };
// firebase.initializeApp(config);

// var database = firebase.database();

// var proxy = 'https://cors-anywhere.herokuapp.com/';
// var foods = ["steak", "fish", "chicken", "tacos", "rice", "potatos", "sushi", "apples"];
// var random = Math.floor(Math.random() * foods.length);
// var pickFood = foods[random];
// var ingredients = [];
// var ingredients = [];
// var searchTrack = [];
// var foodCount = 0;
// var ingredientsTrack1 = [];
// var ingredientsTrack2 = [];
// var ingredientsTrack3 = [];
// var ingredientsTrack4 = [];
// var ingredientsTrack5 = [];
// var ingredientsTrack6 = [];
// var pickFood = foods[random];
// var holder = [];

// API Call Critera
var counter;
var id = "15bdf952"
var appKey = "f46dd27595c9f290dd53bcdc138f4b79"
var queryURL;
var callMin = 0;
var callMax = 18;
var callFood = []
var callDiet = []
var callLabel = []

//FINAL API URL

//Content Counter for col-sm-6 every 2 gets a break
var divCounter = 0;

var typefood = ["italian", "asian", "mexican", "american"]
var diet = ["balanced", "high-fiber", "high-protein", "low-carb", "low-fat", "low-sodium"]
var foodlabel = [
    "alcohol-free", "celery-free", "crustacean-free", "dairy-free", "egg-free",
    "fish-free", "gluten-free", "kidney-friendly", "kosher", "low-potassium",
    "lupine-free", "mustard-free", "no-oil-added", "low-sugar", "paleo",
    "peanut-free", "pescatarian", "pork-free", "red-meat-free", "sesame-free",
    "shellfish-free", "soy-free", "sugar-conscious", "tree-nut-free", "vegan",
    "vegetarian", "wheat-free"]

function navSetup() {
    var navSetupCounter;

    typefood = typefood.sort();
    diet = diet.sort();
    foodlabel = foodlabel.sort();

    for (navSetupCounter = 0; navSetupCounter < typefood.length; navSetupCounter++) {
        $('.1st').append(`
        <div class="form-check">
        <input type="checkbox" class="form-check-input" value="${typefood[navSetupCounter]}" id="${typefood[navSetupCounter]}" onclick="typeoffood(${typefood[navSetupCounter]})">
        <label class="form-check-label" for="box1">${titleCase(typefood[navSetupCounter])}</label>
        </div>
        `)
    }
    $('.1st').append(`<div class="subFoot"></div>`)

    for (navSetupCounter = 0; navSetupCounter < diet.length; navSetupCounter++) {
        $('.2nd').append(`
        <div class="form-check">
        <input type="checkbox" class="form-check-input" value="${diet[navSetupCounter]}" id="${diet[navSetupCounter]}" onclick="dietSpecific('${diet[navSetupCounter]}')">
        <label class="form-check-label" for="box1">${titleCase(diet[navSetupCounter])}</label>
        </div>
        `)
    }
    $('.2nd').append(`<div class="subFoot"></div>`)

    for (navSetupCounter = 0; navSetupCounter < foodlabel.length; navSetupCounter++) {
        if (navSetupCounter < 6) {
            $('.3rd').append(`
            <div class="form-check">
            <input type="checkbox" class="form-check-input" value="${foodlabel[navSetupCounter]}" id="${foodlabel[navSetupCounter]}" onclick="healthLabel('${foodlabel[navSetupCounter]}')">
            <label class="form-check-label" for="box1">${titleCase(foodlabel[navSetupCounter])}</label>
            </div>
        `)
        } else {
            $('.3rd').append(`
            <div class="form-check hiddenHealth">
            <input type="checkbox" class="form-check-input" value="${foodlabel[navSetupCounter]}" id="${foodlabel[navSetupCounter]}" onclick="healthLabel('${foodlabel[navSetupCounter]}')">
            <label class="form-check-label" for="box1">${titleCase(foodlabel[navSetupCounter])}</label>
            </div>
            `)
        }
    }
    $('.3rd').append(`<div class="subFoot healthMore">SEE MORE</div>`)
}

function contentSetup(counter, title, serve, calories, image, url, healthlabel, ingredient) {
    $('.searchContent').append(`
        <div class="col-sm-12 hiddenItem">
            <div class="col-sm-3"><img class="foodImg" src="${image}"></img></div>
                 <div class="col-sm-9">
                      <div class="contItem" id="target${counter}">
                      <div><h1>${title}</h1></div>
                      <div>Serving Size: ${serve}</div>
                      <div>Calories per Serving: ${calories}</div>
                      <div>Health Labels: ${healthlabel}</div>
                      <div><input class="contentBtn" type="submit" value="SEE FULL RECEIPE" onclick="window.open('${url}')"></input></div>
                      <div><input type="submit" value="OPEN INGREDIENTS LIST"></input></div>
                      <div>${ingredient}</div>
                 </div>
            </div>
        </div>
        `)
}

function apiCall(search) {

    $('.header').css("display", "none")

    queryURL = `https://api.edamam.com/search?q=${search}&app_id=${id}&app_key=${appKey}&from=${callMin}&to=${callMax}`

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // for (let w = 0; w < 6; w++) {
        //     holder.push(response.hits[w].recipe.ingredientLines);
        // }
        // for (let i = 0; i < 6; i++) {
        //     $("#target" + i).html("<div class = 'float-left'> Recipe: " + response.hits[i].recipe.label +
        //"<br> recipe URL: <a src=" + response.hits[i].recipe.url + ">" + response.hits[i].recipe.url + "</a><br> calories: " +
        // response.hits[i].recipe.calories + "<br> <img src=" + response.hits[i].recipe.image + "> <br><br> <div class
        // = 'float-left move' id='ing" + i + "' > ingredients: </div></div>");

        // }
        // for (let i = 0; i < 6; i++) {
        //     for (let w = 0; w < holder[i].length; w++) {
        //         $("#ing" + i).append("<br> " + holder[i][w] + "<br>");
        //     }
        // }

        $('.searchContent').empty() // clear the searchContent space before appending new information; on research/refine

        for (counter = 0; counter < response.hits.length; counter++) {
            var title = response.hits[counter].recipe.label
            var serve = response.hits[counter].recipe.yield
            var calories = Math.round(response.hits[counter].recipe.calories / serve)
            var image = response.hits[counter].recipe.image
            var url = response.hits[counter].recipe.url

            var ingredient;
            var healthlabel;

            for (ingCounter = 0; ingCounter < response.hits[counter].recipe.ingredientLines.length; ingCounter++) {
                if (ingredient == undefined) {
                    ingredient = `<small>${response.hits[counter].recipe.ingredientLines[ingCounter]}</small>`
                }
                else {
                    ingredient += `<small>${response.hits[counter].recipe.ingredientLines[ingCounter]}</small>`
                }
            }

            for (healthCounter = 0; healthCounter < response.hits[counter].recipe.healthLabels.length; healthCounter++) {
                if (healthlabel == undefined) {
                    healthlabel = `<small>${response.hits[counter].recipe.healthLabels[healthCounter]}</small>`
                }
                else {
                    healthlabel += `<small>${response.hits[counter].recipe.healthLabels[healthCounter]}</small>`
                }
            }
            contentSetup(counter, title, serve, calories, image, url, healthlabel, ingredient)
            healthlabel = undefined // Resetting healthLabel for next iteration of labels
            ingredient = undefined // Resetting ingredient for next iteration of labels
        }
        $('.searchContent').append(`<div class="col-sm-12 moreResult">SEE 6 MORE RESULTS</div>`)

    });
}


//NAVIGATION BAR SEE MORE
$('.3rd').on('click', '.healthMore', function () { //IMPORTANT FOR THIS; DYNAMICALLY CREATED ITEMS CAN NOT BE CALLED REGULARLY
    // event.preventDefault();

    var status = $(".subFoot.healthMore").text()
    if (status === 'SEE MORE') {
        $(".hiddenHealth").css("display", "block")
        $(".subFoot.healthMore").text("SEE LESS")
    } else {
        $(".hiddenHealth").css("display", "none")
        $(".subFoot.healthMore").text("SEE MORE")
    }
});

//CONTENT PAGE; OPEN INGREDIENT
$('body').on('click', '.ingredientBtn', function () { //IMPORTANT FOR THIS; DYNAMICALLY CREATED ITEMS CAN NOT BE CALLED REGULARLY
    event.preventDefault();
});

// SEE 6 MORE RESULTS
$('body').on('click', '.col-sm-12 .moreResult', function () {
    event.preventDefault();
    console.log("Clicked More Result")

    $('.searchContent .col-sm-12.hiddenItem:hidden').slice(0, 6).slideDown();
});

// var italianChk = $("#italianChk");
// var asianChk = $("#asainChk");
// var mexicanChk = $("#mexicanChk");
// var americanChk = $("#americanChk");

// $("#random").click(function () {
//     var search = foods[random];
//     random = Math.floor(Math.random() * foods.length);
//     console.log(search);
//     event.preventDefault();
//     apiCall(search);
// });

// var objSearch = {
//     food: search,
//     count: 0
// }

$("#search").click(function () {
    event.preventDefault();

    var finalFood;
    var finalDiet;
    var finalLabel;

    search = document.getElementById("searchFood").value
    // console.log(search) // Working

    for (a = 0; a < callFood.length; a++) {
        if (finalFood == undefined) {
            finalFood = callFood[a]
            // console.log("if ran")
        }
        else {
            finalFood += "+" + callFood[a]
            // console.log("else ran")
        }
        // console.log(finalFood)
    }

    if ((search == "Keywords..." || search == undefined) && finalFood == undefined) {
        alert("You need to enter atleast a keyword or check a 'Type of Food' checkbox")
    } else if (finalFood == undefined) {
        apiCall(search) //individual testing call; need to move to end of function when done
    } else if (search == "Keywords..." || search == undefined) {
        // console.log("Will Run CheckBox Search")
        search = finalFood
        // console.log(search)
        apiCall(search) //individual testing call; need to move to end of function when done
    } else {
        search += "+" + finalFood //adding both search keyword and checkbox criteria
        // console.log(search)
        apiCall(search) //individual testing call; need to move to end of function when done
    }

    for (a = 0; a < callDiet.length; a++) {
        if (callDiet.length = 1) {
            finalDiet = callDiet
        }
        else {
            finalDiet += "+" + callDiet
        }
    }
    // console.log(finalDiet)
    // if(finalDiet == undefined){
    // }else{
    //     queryURL.append("hello")
    //     console.log(queryURL)
    // }

    // if (italianChk[0].checked) {
    //     var search = "italian " + $("#searchFood").val();
    // } else if (asianChk[0].checked) {
    //     var search = "asain " + $("#searchFood").val();
    // } else if (mexicanChk[0].checked) {
    //     var search = "mexican " + $("#searchFood").val();
    // } else if (americanChk[0].checked) {
    //     var search = "american " + $("#searchFood").val();
    // } else {
    //     var search = $("#searchFood").val();
    // }

    // if (!(searchTrack.includes(search))) {
    //     searchTrack.push(search);
    //     objSearch.count = 0;
    //     objSearch.count += 1;
    //     console.log(objSearch.count)
    //     database.ref().child(search).set({
    //         count: objSearch.count
    //     })
    // } else {
    //     objSearch.count += 1;
    //     database.ref(search).set({
    //         count: objSearch.count
    //     })
    // }

    // console.log(searchTrack);
    // console.log(JSON.stringify(search))
});

// $("#italian").click(function () {
//     var search = "italian"
//     console.log(search)
//     event.preventDefault()
//     apiCall(search);
// });

// $("#asian").click(function () {
//     var search = "asian"
//     console.log(search)
//     event.preventDefault()
//     apiCall(search);
// });

// $("#mexican").click(function () {
//     var search = "mexican"
//     console.log(search)
//     event.preventDefault()
//     apiCall(search);
// });

// $("#thai").click(function () {
//     var search = "thai"
//     console.log(search)
//     event.preventDefault()
//     apiCall(search);
// });

function dataWord(condition) { //NOT OUR CODE: BORROWED FROM ONLINE SOURCES
    $("[data-words]").attr("data-words", function (i, d) {
        var $self = $(this),
            $words = d.split("|"),
            tot = $words.length,
            c = 0;
        // CREATE SPANS INSIDE SPAN
        for (var i = 0; i < tot; i++) $self.append($('<span/>', { text: $words[i] }));
        // COLLECT WORDS AND HIDE
        $words = $self.find("span").hide();
        // ANIMATE AND LOOP
        (function loop() {
            $self.animate({ width: $words.eq(c).width() });
            $words.stop().fadeOut().eq(c).fadeIn().delay(1000).show(0, loop);
            c = ++c % tot;
            // console.log("Text Rotation") //Working
        }());
    });
}


function titleCase(str) {
    str = str.toLowerCase().split('-');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join('-');
}

function typeoffood(value) {
    var typecast = value.value
    if (callFood.includes(value.value)) {
        remove(callFood, typecast)
    }
    else {
        callFood.push(value.value)
    }
    console.log(callFood)
}

function dietSpecific(value) {
    // console.log(value)
    // console.log(document.getElementById(value).value)

    var typecast = document.getElementById(value).value
    if (callDiet.includes(typecast)) {
        remove(callDiet, typecast)
    }
    else {
        callDiet.push(typecast)
    }
    console.log(callDiet)
}

function healthLabel(value) {
    var typecast = document.getElementById(value).value
    if (callLabel.includes(typecast)) {
        remove(callLabel, typecast)
    }
    else {
        callLabel.push(typecast)
    }
    console.log(callLabel)
}

function remove(arr) { //Custom Remove Function for array
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}


// dataWord() // NEED THIS; RECOMMENT WHEN DONE
navSetup()
// apiCall("rice") // TESTING CALL WIHTOUT TYPING