$.dispatchGenericResponse = function (responseJSON,listener_response_success, listener_response_error){
  listener_response_success = listener_response_success || "SERVER_RESPONSE_SUCCESS";
  listener_response_error = listener_response_error || "SERVER_RESPONSE_ERROR";
  if (responseJSON.hasError) {
    $.publish(listener_response_error, responseJSON);
  } else {
    $.publish(listener_response_success, responseJSON);
  }
}

$.serverRequest = function(request_url, request_data, listener_response_success, listener_response_error, listener_service_error, request_type, needWrap, addtion) {
  listener_response_success = listener_response_success || "SERVER_RESPONSE_SUCCESS";
  listener_response_error = listener_response_error || "SERVER_RESPONSE_ERROR";
  listener_service_error = listener_service_error || "SERVER_SERVICE_ERROR";
  if (!request_type) {
    request_type = 'POST';
  }
  $.ajax({
    url: request_url,
    data: request_data,
    type: request_type,
    contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    dataType: 'json',
    success: function(json) {
      if (json.hasError) {
        console.log("SERVER_REQUEST_ACTION get error: " + json.errorMessage);
        if (needWrap) {
          var wrapJson = {
            'response': json,
            'addtion': addtion
          }
          json = wrapJson;
        }
        $.publish(listener_response_error, json);
      } else {
        if (needWrap) {
          var wrapJson = {
            'response': json,
            'addtion': addtion
          }
          json = wrapJson;
        }
        $.publish(listener_response_success, json);
      }
    },
    error: function(xhr, status) {
      console.log('Sorry, there was a problem on SERVER_REQUEST_ACTION process!');
      if (needWrap) {
        var wrapJson = {
          'addtion': addtion
        }
        $.publish(listener_service_error,wrapJson);
      }else{
        $.publish(listener_service_error);
      }

    },
    complete: function(xhr, status) {}
  });
}

$.hasUrlParam = function(name) {
  var results = new RegExp('[\?&]' + name).exec(window.location.href);
  if (results == null) {
    return false;
  } else {
    return true;
  }
}
$.urlParamValue = function(name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results == null) {
    return null;
  } else {
    return results[1] || 0;
  }
}
$.getRootPath = function() {
  var strFullPath = window.document.location.href;
  var strPath = window.document.location.pathname;
  var pos = strFullPath.indexOf(strPath);
  var prePath = strFullPath.substring(0, pos);
  var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
  return (prePath + postPath);
}
$.getServerRoot = function() {
  var strFullPath = window.document.location.href;
  var strPath = window.document.location.pathname;
  var pos = strFullPath.indexOf(strPath);
  var prePath = strFullPath.substring(0, pos);
  return prePath;
}
$.loadContext = function(parentDivID, childPath) {
  $('#' + parentDivID).load($.getRootPath() + childPath);
}

function formatTimeSize(time) {
  var s = 1000;
  var min = 60 * 1000;
  var h = 60 * 60 * 1000;
  var d = 24 * 60 * 60 * 1000;
  if (time > s && time < min) {
    return (time / s).toFixed(1) + " s";
  } else if (time > min && time < h) {
    return (time / min).toFixed(1) + " min";
  } else if (time > h && time < d) {
    return (time / h).toFixed(1) + " h";
  } else if (time > d) {
    return (time / d).toFixed(1) + " d";
  } else {
    return time + " ms"
  }
}


function switch_div_display(div_id) {
  var current_state = $('#' + div_id).css('display');
  if ('none' == current_state) {
    $('#' + div_id).css('display', '');
  } else {
    $('#' + div_id).css('display', 'none');
  }
}
function show_div(div_id) {
  $('#' + div_id).css('display', '');
}
function hide_div(div_id) {
  $('#' + div_id).css('display', 'none');
}

var UtilPOJO = UtilPOJO || {};
UtilPOJO = {

  arrEmpty: function(file) {
    if (file == null || file.length == 0) {
      return true;
    }
    return false;
  },
  cutString: function(str, length) {
    if (str == null || str.length == null) {
      return "";
    }
    if (str.length > length) {
      str = str.substr(0, length) + "...";
    }
    return str;
  },
  //Util function for remove the empty chart from array
  //Example: [1,2,'',3,4,'5','',7,8].filter(UtilPOJO.removeEmptyChars)
  removeEmptyChars: function(element, index, array) {
    return (element !== "");
  },

  replaceNullToEmpty: function(arr) {
    var result = [];
    $.each(arr, function(index, value) {
      if (!value || value == "null") {
        value = "";
      }
      result.push(value);
    });
    return result;
    // var result = JSON.stringify(data).replace(/null/gi, "");
    // return result;
  },

  //Util function for transfer undefined object as empty string for fetch value
  //Example: var a; UtilPOJO.getValue(a);
  getValue: function(input) {
    if (typeof(input) === 'undefined') {
      return '';
    } else {
      return input;
    }
  },
  encode: function(obj) {
    // return obj.replace(/[^\u0000-\u00FF]/g, function ($0) { return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;") });
    return escape(obj);
  },
  decode: function(obj) {
    // return unescape(obj.replace(/&#x/g, '%u').replace(/;/g, ''));
    return unescape(obj);
  },

  //Util for format time
  //Example:
  // 1: UtilPOJO.formatTime(1458185053699) result: "2016-03-17 11:24:13 699"
  // 2: UtilPOJO.formatTime(1458185053699,'yyyy-MM-dd') result: "2016-03-17"
  formatTime: function(input, format) {

    var date = new Date();
    date.setTime(input);
    format = format ? format : "yyyy-MM-dd hh:mm:ss S";
    return date.Format(format);
  }
}

Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
var ClonePOJO = ClonePOJO || {};
ClonePOJO = {
  shallowClone: function(oldObject) {
    return jQuery.extend({}, oldObject);
  },
  deepClone: function(oldObject) {
    return jQuery.extend(true, {}, oldObject);
  }
};

var LoaderUtil = LoaderUtil || {};
LoaderUtil = {
  loaderComponent: '<div class="loader-container text-center color-white"><div><i class="fa fa-spinner fa-pulse fa-3x"></i></div><div>Loading</div></div>',
  addMask: function(div_id) {
    if (!$('#' + div_id).hasClass('loader')) {
      $('#' + div_id).addClass('loader');
    }
  },
  removeMask: function(div_id) {
    if ($('#' + div_id).hasClass('loader')) {
      $('#' + div_id).removeClass('loader');
    }
  },
  addLoader: function(div_id) {
    if (!$('#' + div_id).find('.loader-container').length) {
      var $loader = $(LoaderUtil.loaderComponent);
      $loader.appendTo('#' + div_id);
    }
    LoaderUtil.addMask(div_id);
  },
  removeLoader: function(div_id) {
    var $loaderComponents = $('#' + div_id).find('.loader-container');
    $loaderComponents.remove();
  },
  add: function(div_id) {
    LoaderUtil.addLoader(div_id);
  },
  remove: function(div_id) {
    LoaderUtil.removeMask(div_id);
  }

}


var activeBookmark2 = function(parent_div_id, div_id, fn) {
  event.preventDefault();
  $('#parent_div_id button.matrix_bookmark').removeClass('bookmark_active');
  $('#parent_div_id button.matrix_bookmark').removeClass('bookmark_normal');
  $('#parent_div_id button.matrix_bookmark').addClass('bookmark_normal');
  $('#' + div_id).addClass('bookmark_active');
  $('#' + div_id).removeClass('bookmark_normal');

  if (fn && $.isFunction(fn)) {
    fn();
  }
}

var activeBookmark = function(div_id, fn) {
  event.preventDefault();
  $('button.matrix_bookmark').removeClass('bookmark_active');
  $('button.matrix_bookmark').removeClass('bookmark_normal');
  $('button.matrix_bookmark').addClass('bookmark_normal');
  $('#' + div_id).addClass('bookmark_active');
  $('#' + div_id).removeClass('bookmark_normal');

  if (fn && $.isFunction(fn)) {
    fn();
  }
}


function toMarkdown(input_id,output_id){
  var context = getMarkdownContext(input_id);
  var output = document.getElementById(output_id);
  output.innerHTML = context;
}

function getMarkdownContext(input_id){
  var input = document.getElementById(input_id);
  return markdown.toHTML(input.value);
}

function Highlight_Editor(input, preview) {
  this.update = function() {
    preview.innerHTML = input.value;
  };
  input.editor = this;
  this.update();
}


function ensureTemplates(list,templateFolder) {
  var loadedTemplates = [];
  templateFolder = templateFolder || "ko-templates/";
  ko.utils.arrayForEach(list, function(name) {
    $.get(templateFolder + name + ".html", function(template) {
      $("body").append("<script id=\"" + name + "\" type=\"text/html\">" + template + "<\/script>");
      loadedTemplates.push(name);
      if (list.length === loadedTemplates.length) {
        $.publish("MATRIX_TEMPLATES_LOAD_FINISHED");
      }
    });
  });
}
