// Client facing scripts here
/*
$(document).ready(function(){
  
  $("form").submit(function(){
    let item_Name = [];        // The food items customer selects from menu view
    let number_of_Items = []; // The number of each food item

    $.each($("input[name='itemName']:checked"), function(){
      item_Name.push($(this).val());
      
    });

    $.each($("input[type='text']"), function(){
        if ($(this).val()!==""){
        number_of_Items.push($(this).val()); 
    }



  }) 
  console.log(item_Name);
  console.log(number_of_Items);
  
  let order ={}; 
  for (let i in item_Name)
  {
     order[item_Name[i]] = number_of_Items[i];
  }

  console.log(order);
  alert(order);

  
  /*
  $.ajax({
    url: '/',
    data: order,
    dataType: 'xml',
    complete : function(){
        alert(this.url)
    },
    success: function(xml){
    }
});*/

/*
$.post("/", formValues, function(data){
  $.get("/", function(data){
  

});
});


});// End of form submit

});// End of document ready


*/

// $('#mnenu_form').on('submit', (event) => {
//   if (!$('#phone').val().length === 0 ) {
//       event.preventDefault
//   }
// })

$(document).on('click', () => {
  $('#err_msg').slideUp(1000);
})

// $('#name-form').on('click', (event) => {
//   if ($('#phone').val().length === 0) {
//     event.preventDefault();
//   } else {
//     order_checkout.push({'phone': $('#phone').val()});
//   }
// })
