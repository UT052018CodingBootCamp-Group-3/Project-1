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