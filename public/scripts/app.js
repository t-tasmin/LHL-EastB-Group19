// Client facing scripts here
$(document).ready(() => {

    $('#mnenu_form').on('submit', (event) => {
        console.log(event);
    })

    $(document).on('click', () => {
        $('#err_msg').slideUp(1000);
    })


});