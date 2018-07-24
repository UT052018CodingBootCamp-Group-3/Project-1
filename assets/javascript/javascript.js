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

$('input[type=submit]').on("click", function () {
    event.preventDefault();
    console.log("Search Button Clicked")
    var output = $('input').val()
    console.log(output)
})

var food = []

function checkBox(box){
    var pass = box.checked
    if(pass)
    {
        console.log("Checked " + box.id);
    }
    else
    {
        console.log("UnChecked " + box.id);
    }
}

// function foodOption(type)
// {
//     food.push(type.id)
//     console.log(food)

//     $()
// }