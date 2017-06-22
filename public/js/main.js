$(document).ready(function(){
    $(".delete-toilet").on("click", (e) => {
        $target = $(e.target);
        const id = $target.attr("data-id");
        $.ajax({
            type: "DELETE",
            url: "/toilets/" + id,
            success: function(response){
                alert("Deleting Toilet");
                window.location.href = "/";
            },
            error: function(err){
                console.log(err);
            }
        })
    })
})