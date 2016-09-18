var UserPOJO = UserPOJO || {};
UserPOJO = {
    user: undefined,
    getCurrentUser: function (successListener) {

        $.ajax({
            url: $.getRootPath() + '/api/account/current_user',
            data: {},
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                if (json.name === "EXCEPTION") {
//                    console.log(json.description);
                    $.publish("GET_USER_DETAIL_FAILED");
                    return;
                } else {
                    //JSON result should be like this:
                    // {"groups":["ROLE_SCRIPTER_PIG","ROLE_SCRIPTER_RDMS","ROLE_SCRIPTER_CLUSTER","ROLE_SCRIPTER_HDFS","ROLE_SCRIPTER_FILE","ROLE_SCRIPTER_CONFIG","ROLE_SCRIPTER_HIVE"],"lastTime":0,"logined":true,"userName":"ops"}
                    UserPOJO.user = json;
//                    console.log("Get response from server side for function[get user detail]:")
//                    console.log(UserPOJO.user);
                    if (typeof (successListener) != 'undefind' && successListener != null) {
                        $.publish(successListener, json);
                    } else {
                        $.publish("GET_USER_DETAIL_SUCCESS");
                    }
                }
            },
            error: function (xhr, status) {
                console.log('Sorry, there was a problem on page check status!');
                location.href = $.getRootPath() + "/login.html";
            },
            complete: function (xhr, status) {
            }
        });
    },
}


$(document).ready(function () {
    $('#navDIV').load($.getRootPath() + '/assets/self-owned/html/header.html');
    $('#footerDIV').load($.getRootPath() + '/assets/self-owned/html/footer.html');
    $('#carouseContentDIV').load($.getRootPath() + '/assets/self-owned/html/carouse.html');
    $('#commentsDIV').load($.getRootPath() + '/assets/self-owned/html/comments.html');
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
});
