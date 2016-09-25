var ServerCUDPOJO = ServerCUDPOJO || {};
ServerCUDPOJO = {

    listener_service_error:"CUD_SERVER_FAILED_LISTENER",
    listener_response_error:"CUD_FAILED_LISTENER",
    listener_response_success:"CUD_SUCCESS_LISTENER",

    example_add_entity:{
      "className": "v2.service.generic.query.entity.ZEntity",
      "attributes":{
        "name":"DEMO_TEST_NAME",
        "category":"DEMO_CATEGORY",
        "description":"DEMO_DESCRIPTION"
      }
    },
    example_update_entity:{
      "className": "v2.service.generic.query.entity.ZEntity",
      "attributes":{
        "id":123,
        "name":"DEMO_TEST_NAME",
        "category":"DEMO_CATEGORY",
        "description":"DEMO_DESCRIPTION"
      }
    },
    example_remove_entity:{
      "className": "v2.service.generic.query.entity.ZEntity",
      "attributes":{
        "id":123
      }
    },
    example_add_action:function(){
      var data = {
          'queryJson': $.toJSON(ServerCUDPOJO.example_add_entity)
      };
      $.serverRequest($.getServerRoot() + '/service_generic_query/api/cud/add', data, ServerCUDPOJO.listener_response_success, ServerCUDPOJO.listener_response_error, ServerCUDPOJO.listener_service_error);
    },
    example_update_action:function(){
      var data = {
          'queryJson': $.toJSON(ServerCUDPOJO.example_update_entity)
      };
      $.serverRequest($.getServerRoot() + '/service_generic_query/api/cud/update', data, ServerCUDPOJO.listener_response_success, ServerCUDPOJO.listener_response_error, ServerCUDPOJO.listener_service_error);
    },
    example_remove_action:function(){
      var data = {
          'queryJson': $.toJSON(ServerCUDPOJO.example_remove_entity)
      };
      $.serverRequest($.getServerRoot() + '/service_generic_query/api/cud/remove', data, ServerCUDPOJO.listener_response_success, ServerCUDPOJO.listener_response_error, ServerCUDPOJO.listener_service_error);
    },
}


$.subscribe(ServerCUDPOJO.listener_response_success, listener_response_success_CUD);
$.subscribe(ServerCUDPOJO.listener_response_error, listener_response_error_CUD);
$.subscribe(ServerCUDPOJO.listener_service_error, listener_service_error_CUD);

function listener_response_success_CUD() {
  console.log("SERVER CUD OPERATION SUCCESSED!");
  if (arguments && arguments[1]) {
    console.log(arguments[1]);
  }
}

function listener_response_error_CUD() {
  console.log("SERVER CUD OPERATION FAILED!");
  if (arguments && arguments[1]) {
    console.log(arguments[1]);
  }
}

function listener_service_error_CUD() {
  console.log("SERVER CUD OPERATION ERROR [THE SERVICE HAS FATAL ERROR]!");
  if (arguments && arguments[1]) {
    console.log(arguments[1]);
  }}
