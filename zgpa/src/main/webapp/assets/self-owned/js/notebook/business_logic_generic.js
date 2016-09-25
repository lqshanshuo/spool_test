var switchBookmark_businessLogic = function(ni, bi, notebookListViewModel) {
  var notebook_index = 'notebookDIV' + ni;
  var bookmark_index = 'notebook' + ni + '_bookmark' + bi;
  var self = notebookListViewModel;
  $('#' + notebook_index + ' button.matrix_bookmark').removeClass('bookmark_active');
  $('#' + notebook_index + ' button.matrix_bookmark').removeClass('bookmark_normal');
  $('#' + notebook_index + ' button.matrix_bookmark').addClass('bookmark_normal');
  $('#' + bookmark_index).addClass('bookmark_active');
  $('#' + bookmark_index).removeClass('bookmark_normal');
  var original_bi = self.notebooks()[ni].console.currentBookmark();

  if (bi != original_bi) {
    self.notebooks()[ni].console.currentBookmark(bi);
    var cacheData = {
      'notebook_index': ni,
    };
    CachePOJO.businessPOJO = cacheData;
    self.notebooks()[ni].result.isDisplay_hive(false);
    self.notebooks()[ni].result.isDisplay_sql(false);
    self.notebooks()[ni].result.isDisplay_pig(false);
    self.notebooks()[ni].result.isDisplay_spark(false);
    self.notebooks()[ni].result.isDisplay_impala(false);
    self.notebooks()[ni].result.isDisplay_markdown(false);
    if (bi === 1) {
      self.notebooks()[ni].result.isDisplay_hive(true);
    }
    if (bi === 2) {
      self.notebooks()[ni].result.isDisplay_sql(true);
    }
    if (bi === 3) {
      self.notebooks()[ni].result.isDisplay_pig(true);
    }
    if (bi === 4) {
      self.notebooks()[ni].result.isDisplay_spark(true);
    }
    if (bi === 5) {
      self.notebooks()[ni].result.isDisplay_impala(true);
    }
    if (bi === 6) {
      self.notebooks()[ni].result.isDisplay_markdown(true);
    }
  }
};


var switchState_businessLogic = function(notebook, componentType) {
  if ('console' === componentType) {
    notebook.console.isDisplay(!notebook.console.isDisplay());
    return;
  }
  if ('result' === componentType) {
    notebook.result.isDisplay(!notebook.result.isDisplay());
    return;
  }
  if ('status' === componentType) {
    notebook.status.isDisplay(!notebook.status.isDisplay());
    return;
  }
  if ('chart' === componentType) {
    notebook.chartPanel.isDisplay(!notebook.chartPanel.isDisplay());
    return;
  }
};

var addNotebook_businessLogic = function(notebookListViewModel) {
  var self = notebookListViewModel;
  var notebook = new NotebookViewModel(null, false, true);
  self.notebooks.push(notebook);
  autosize($('textarea'));
  notebook_textarea_keyboard_event_listener(); // need to do this for setup new notebook feature
  var index = self.notebooks().length - 1;
  notebook.console.currentBookmark(1); //default bookmark as 1--hive
  notebook.result.isDisplay_hive(true); // default display hive result
};

var resetNotebook_businessLogic = function(notebookListViewModel) {
  var self = notebookListViewModel;
  self.notebooks.removeAll();
  self.addNotebook();
  self.chartPanel.charts.removeAll();
  self.chartPanel.isDisplay(false);
};



var run_businessLogic = function(currentData, currentIndex, notebookListViewModel) {
  var self = notebookListViewModel;
  console.log("The index [" + currentIndex + "] notebook has been clicked!");
  var notebook = self.notebooks()[currentIndex];
  notebook.alerts.resultVisible(false);
  notebook.status.currentStatus("RUNNING");
  notebook.status.currentStatusClass("fa fa-spinner fa-spin");
  notebook.status.progress(0);
  blockCheck(currentIndex);
  notebook.result.isDisplay(false);

  var bi = notebook.console.currentBookmark(); // bookmark index
  if (bi === 1) {
    //hive business logic
    if (hive_mock_data) {
      var tableModel = notebook.result.result_hive.vm_server;
      tableModel.pageMaxSize(5);
      tableModel.buildData(hive_mock_data.result);
      tableModel.columnNames(hive_mock_data.header);
      tableModel.buildView();
      notebook.result.result_hive.vm_server_has_result(true);
    }
  }
  if (bi === 2) {
    //sql business logic
  }
  if (bi === 3) {
    //pig business logic
  }
  if (bi === 4) {
    //spark business logic
  }
  if (bi === 5) {
    //impala business logic
  }
  if (bi === 6) {
    var markdown_result = getMarkdownContext('notebookTextArea' + currentIndex);
    notebook.result.result_markdown.data(markdown_result);
    console.log(markdown_result);
  }



  retrieveData_mock(notebook, currentIndex);
}


var notebook_textarea_keyboard_event_listener = function() {
  $("textarea").keypress(function(event) {
    if (event.keyCode == 13 && event.shiftKey) {
      var dom_element_id = $(document.activeElement).attr('id');
      if (dom_element_id && dom_element_id.indexOf('notebookTextArea') == 0) {
        var runButton_id = dom_element_id.replace('TextArea', 'RunButton');
        $('#' + runButton_id).click();
      }
    }
  });
}

var blockCheck = function(currentIndex) {
  var notebook = notebookListViewModel.notebooks()[currentIndex];

  if (notebook.status.currentStatus() === 'RUNNING') {
    $('#notebookDIV' + currentIndex).block({
      message: null
    });
  } else {
    $('#notebookDIV' + currentIndex).unblock();
  }
}

var mock_count = 0; // used for mock up
var retrieveData_mock = function(currentNotebook, currentIndex) {
  mock_count++;
  if (mock_count % 4 == 1) {
    console.log('request action invoked[request_success]');
    $.serverRequest($.getRootPath() + '/api/mock/success', null, "SUCCESS_LISTENER", "FAILED_LISTENER", "SERVER_FAILED_LISTENER", 'GET', true, currentIndex);
  } else if (mock_count % 4 == 2) {
    console.log('request action invoked[request_warning]');
    if (notebookListViewModel) {
      var notebook = notebookListViewModel.notebooks()[currentIndex];

      setTimeout(function() {
        notebook.alerts.warningResponse("This is Mock Client Error!", "Be Careful!", "Please read the message below:");
        notebook.status.currentStatus("SERVICE ERROR");
        notebook.status.currentStatusClass("fa fa-exclamation");
        notebook.status.progress(100);
        blockCheck(currentIndex);
      }, 1000);
    }
  } else if (mock_count % 4 == 3) {
    console.log('request action invoked[request_error]');
    $.serverRequest($.getRootPath() + '/api/mock/service_error', null, "SUCCESS_LISTENER", "FAILED_LISTENER", "SERVER_FAILED_LISTENER", 'GET', true, currentIndex);
  } else if (mock_count % 4 == 0) {
    console.log('request action invoked[request_exception]');
    $.serverRequest($.getRootPath() + '/api/mock/server_error', null, "SUCCESS_LISTENER", "FAILED_LISTENER", "SERVER_FAILED_LISTENER", 'GET', true, currentIndex);
  }
}



// *******Server Side Retrieve Data Listener JS Code*******
$.subscribe("SUCCESS_LISTENER", successListener);
$.subscribe("FAILED_LISTENER", failedListener);
$.subscribe("SERVER_FAILED_LISTENER", failedServiceListener);

function failedServiceListener() {

  var request_notebook_index = arguments[1].addtion;
  if (notebookListViewModel) {
    var notebook = notebookListViewModel.notebooks()[request_notebook_index];


    setTimeout(function() {
      notebook.alerts.errorResponse("Catch Fatal Exception From Server!", "Fatal Exception!", "Please read the message below:");
      notebook.status.currentStatus("SERVER ERROR");
      notebook.status.currentStatusClass("fa fa-exclamation");
      notebook.status.progress(100);
      blockCheck(request_notebook_index);
    }, 1000);
  }
  console.log("request_notebook_index is:" + request_notebook_index);
}

function failedListener() {
  if (arguments && arguments[1]) {
    var errorMessage = arguments[1].errorMessage;
    var request_notebook_index = arguments[1].addtion;
    if (notebookListViewModel) {
      var notebook = notebookListViewModel.notebooks()[request_notebook_index];

      setTimeout(function() {
        notebook.alerts.errorResponse(errorMessage, "Server Service Error!", "Please read the message below:");
        notebook.status.currentStatus("SERVICE ERROR");
        notebook.status.currentStatusClass("fa fa-exclamation");
        notebook.status.progress(100);
        blockCheck(request_notebook_index);
      }, 1000);
    }
    console.log("request_notebook_index is:" + request_notebook_index);
    console.log("response context is:" + JSON.stringify(arguments[1].response));
  }
}

function successListener() {
  if (arguments && arguments[1]) {
    var request_notebook_index = arguments[1].addtion;

    if (notebookListViewModel) {
      var notebook = notebookListViewModel.notebooks()[request_notebook_index];


      setTimeout(function() {
        notebook.alerts.correctResponse("Return Mock Success Response", "Successed!", "Congratulations!");
        notebook.status.currentStatus("FINISHED");
        notebook.status.currentStatusClass("fa fa-check");
        notebook.status.progress(100);
        blockCheck(request_notebook_index);
        notebook.result.isDisplay(true);
      }, 1000);
    }
    console.log("request_notebook_index is:" + request_notebook_index);
    console.log("response context is:" + JSON.stringify(arguments[1].response));
  }
}


var download_businessLogic = function(headers, data, type, notebook) {
  if (headers && data) {
    download(headers, data, type);
  } else {
    notebook.alerts.warningResponse("当前没有合适下载的数据结果", "提示:", "[导出/下载数据]");
  }

}



var prepare_analyze_businessLogic = function(headers, data, notebook) {
  if (headers && data) {
    headers = headers.filter(UtilPOJO.removeEmptyChars);
    // do something...
    var pojo = {
      'headers': headers,
      'data': data,
      'notebook': notebook
    }
    ModalUtil.popup_modal_with_businessPOJO('数据统计分析设置', '/prototype_scripter_notebook_modal_analyze.html', pojo);
  } else {
    notebook.alerts.warningResponse("当前没有合适分析的数据结果", "提示:", "[分析数据]");
  }
}



$.subscribe("NOTEBOOK_ANALYZE_EVENT", listener_NOTEBOOK_ANALYZE_EVENT);

function listener_NOTEBOOK_ANALYZE_EVENT() {
  if (arguments && arguments[1]) {
    console.log("Catch event [NOTEBOOK_ANALYZE_EVENT] and the response data are:");
    console.log(arguments[1]);
    var notebook = arguments[1].notebook;
    var tableData = arguments[1].tableData;
    var bookmark = notebook.console.currentBookmark();
    if (bookmark == 1) {
      analyze_result_display_businessLogic_hive(tableData, notebook);
    }

    ModalUtil.modal_close('popupModalPro');
  }

}






//---------------------------------mock zone-------------------------------------------
var hive_mock_data = null;
var initialize_hive_mock_data = function() {
  $.ajax({
    url: $.getRootPath() + "/assets/self-owned/data/server_mock_data.json",
    type: 'GET',
    dataType: 'json',
    success: function(json) {
      var serverData = json;
      hive_mock_data = DataTransferPOJO.serverJsonData2TableData(serverData);
    },
    error: function(xhr, status) {
      console.log('Sorry, there was a problem on SERVER_REQUEST_ACTION process!');
    },
    complete: function(xhr, status) {}
  });
}

initialize_hive_mock_data();




// Function for serialize the notebook page model to savable data
var export_notebook_mock = function() {
  var result = {};

  var serialize_notebook_mock_data = serialize_notebook_mock();

  result = serialize_notebook_mock_data;
  console.log("The export notebook mock data is:");
  console.log(result);
  return result;
}

var serialize_notebook_mock = function() {

  var notebook_1 = {
    console: {
      inputContent: '#Note: \n This is serialize data from export notebook mock function...',
      isDisplay: true,
      isBlocking: false,
      currentBookmark: 1
    },
    result: {
      isDisplay: true,
      isDisplay_hive: true,
      isDisplay_sql: false,
      isDisplay_pig: false,
      isDisplay_spark: false,
      isDisplay_impala: false,
      isDisplay_markdown: false,
      result_hive: {
        vm_server: {
          serverData: [
            [1, "bill", "male", 32, "bill@matrix.com", 13912738475],
            [2, "amanda", "female", 32, "amanda@matrix.com", 13912738475],
            [3, "carina", "female", 32, "carina@matrix.com", 13912738475],
            [4, "tom", "male", 32, "tom@matrix.com", 13912738475],
            [5, "frank", "male", 32, "frank@matrix.com", 13912738475],
            [6, "willy", "male", 32, "willy@matrix.com", 13912738475],
            [7, "bill2", "female", 32, "bill@matrix.com", 13912738475],
            [8, "bill3", "male", 32, "bill@matrix.com", 13912738475],
            [9, "bill4", "male", 32, "bill@matrix.com", 13912738475],
            [10, "bill5", "female", 32, "bill@matrix.com", 13912738475],
            [11, "bill6", "male", 32, "bill@matrix.com", 13912738475],
            [12, "bill7", "male", 32, "bill@matrix.com", 13912738475],
            [13, "bill8", "male", 32, "bill@matrix.com", 13912738475],
            [14, "frank1", "female", 32, "bill@matrix.com", 13912738475],
            [15, "frank2", "male", 32, "bill@matrix.com", 13912738475],
            [16, "frank3", "male", 32, "bill@matrix.com", 13912738475],
            [17, "frank4", "male", 32, "bill@matrix.com", 13912738475],
            [18, "frank5", "female", 32, "bill@matrix.com", 13912738475],
            [19, "frank", "male", 32, "bill@matrix.com", 13912738475],
            [20, "bill3", "male", 32, "bill@matrix.com", 13912738475],
            [21, "bill2", "male", 32, "bill@matrix.com", 13912738475],
            [22, "bill1", "male", 32, "bill@matrix.com", 13912738475],
            [23, "bill6", "male", 32, "bill@matrix.com", 13912738475],
            [24, "bill8", "male", 32, "bill@matrix.com", 13912738475],
            [25, "bill", "male", 32, "bill@matrix.com", 13912738475]
          ],
          columnNames: ["id", "name", "sex", "age", "email", "phone"]
        },
        vm_server_has_result: true,

        vm_analyze: {
          serverData: [
            ["bill@matrix.com", 2, 0, 0, 0, 1, 0, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 20],
            ["amanda@matrix.com", 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            ["carina@matrix.com", 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            ["tom@matrix.com", 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            ["frank@matrix.com", 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            ["willy@matrix.com", 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            ["Total", 2, 1, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 25]
          ],
          columnNames: ["", "bill", "amanda", "carina", "tom", "frank", "willy", "bill2", "bill3", "bill4", "bill5", "bill6", "bill7", "bill8", "frank1", "frank2", "frank3", "frank4", "frank5", "bill1", "Total"]
        },
        vm_analyze_has_result: true
      },
      result_sql: {},
      result_pig: {},
      result_spark: {},
      result_impala: {},
      result_markdown: {}
    },
    status: {
      currentStatus: 'READY',
      currentStatusClass: 'fa fa-plug',
      progress: 0,
      isDisplay: true
    },
    alerts: {
      styleClass: "alert-success",
      resultVisible: false,
      resultTitle: "Successed",
      resultSubTitle: "[General Search]",
      resultContent: "This is the result content..."
    }
  };
  var notebook_2 = {
    console: {
      inputContent: '#Note: \n This is serialize data from export notebook mock function...',
      isDisplay: true,
      isBlocking: false,
      currentBookmark: 1
    },
    result: {
      isDisplay: true,
      isDisplay_hive: true,
      isDisplay_sql: false,
      isDisplay_pig: false,
      isDisplay_spark: false,
      isDisplay_impala: false,
      isDisplay_markdown: false,
      result_hive: {
        vm_server: {
          serverData: [
            [1, "bill", "male", 32, "bill@matrix.com", 13912738475],
            [2, "amanda", "female", 32, "amanda@matrix.com", 13912738475],
            [3, "carina", "female", 32, "carina@matrix.com", 13912738475],
            [4, "tom", "male", 32, "tom@matrix.com", 13912738475],
            [5, "frank", "male", 32, "frank@matrix.com", 13912738475],
            [6, "willy", "male", 32, "willy@matrix.com", 13912738475],
            [7, "bill2", "female", 32, "bill@matrix.com", 13912738475],
            [8, "bill3", "male", 32, "bill@matrix.com", 13912738475],
            [9, "bill4", "male", 32, "bill@matrix.com", 13912738475],
            [10, "bill5", "female", 32, "bill@matrix.com", 13912738475],
            [11, "bill6", "male", 32, "bill@matrix.com", 13912738475],
            [12, "bill7", "male", 32, "bill@matrix.com", 13912738475],
            [13, "bill8", "male", 32, "bill@matrix.com", 13912738475],
            [14, "frank1", "female", 32, "bill@matrix.com", 13912738475],
            [15, "frank2", "male", 32, "bill@matrix.com", 13912738475],
            [16, "frank3", "male", 32, "bill@matrix.com", 13912738475],
            [17, "frank4", "male", 32, "bill@matrix.com", 13912738475],
            [18, "frank5", "female", 32, "bill@matrix.com", 13912738475],
            [19, "frank", "male", 32, "bill@matrix.com", 13912738475],
            [20, "bill3", "male", 32, "bill@matrix.com", 13912738475],
            [21, "bill2", "male", 32, "bill@matrix.com", 13912738475],
            [22, "bill1", "male", 32, "bill@matrix.com", 13912738475],
            [23, "bill6", "male", 32, "bill@matrix.com", 13912738475],
            [24, "bill8", "male", 32, "bill@matrix.com", 13912738475],
            [25, "bill", "male", 32, "bill@matrix.com", 13912738475]
          ],
          columnNames: ["id", "name", "sex", "age", "email", "phone"]
        },
        vm_server_has_result: true,

        vm_analyze: {
          serverData: [
            ["bill@matrix.com", 2, 0, 0, 0, 1, 0, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 20],
            ["amanda@matrix.com", 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            ["carina@matrix.com", 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            ["tom@matrix.com", 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            ["frank@matrix.com", 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            ["willy@matrix.com", 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            ["Total", 2, 1, 1, 1, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 25]
          ],
          columnNames: ["", "bill", "amanda", "carina", "tom", "frank", "willy", "bill2", "bill3", "bill4", "bill5", "bill6", "bill7", "bill8", "frank1", "frank2", "frank3", "frank4", "frank5", "bill1", "Total"]
        },
        vm_analyze_has_result: true
      },
      result_sql: {},
      result_pig: {},
      result_spark: {},
      result_impala: {},
      result_markdown: {}
    },
    status: {
      currentStatus: 'READY',
      currentStatusClass: 'fa fa-plug',
      progress: 0,
      isDisplay: true
    },
    alerts: {
      styleClass: "alert-success",
      resultVisible: false,
      resultTitle: "Successed",
      resultSubTitle: "[General Search]",
      resultContent: "This is the result content..."
    }
  };
  var notebookPage = {
    chartPanel: {

    },
    notebooks: [
      notebook_1, notebook_2
    ]
  };


  return JSON.stringify(notebookPage);
}

// Function for deserialize the notebook page from saved data
var import_notebook_mock = function(inputData) {
  if (inputData == null) {
    inputData = export_notebook_mock();
    inputData = $.parseJSON(inputData);
  }
  var viewModel = deserialize_notebook_mock(inputData);
  ko.cleanNode($('#contentDIV')[0]);
  ko.applyBindings(viewModel, document.getElementById('contentDIV'));
}

var deserialize_notebook_mock = function(inputData) {
  var viewModel = new NotebookListViewModel();
  load_chartPanel(viewModel, inputData);
  load_notebooks(viewModel, inputData);
  return viewModel;
}

var load_chartPanel = function(viewModel, inputData) {

}
var load_notebooks = function(viewModel, inputData) {
  $.each(inputData.notebooks, function(idx, notebook) {
    console.log(notebook);
    var notebookViewModel = new NotebookViewModel(null, false, true);
    //load console
    notebookViewModel.console.inputContent(notebook.console.inputContent);
    notebookViewModel.console.isDisplay(notebook.console.isDisplay);
    notebookViewModel.console.isBlocking(notebook.console.isBlocking);
    notebookViewModel.console.currentBookmark(notebook.console.currentBookmark);
    //load StatusViewModel
    notebookViewModel.status.currentStatus(notebook.status.currentStatus);
    notebookViewModel.status.currentStatusClass(notebook.status.currentStatusClass);
    notebookViewModel.status.progress(notebook.status.progress);
    notebookViewModel.status.isDisplay(notebook.status.isDisplay);
    //load alert
    notebookViewModel.alerts.styleClass(notebook.alerts.styleClass);
    notebookViewModel.alerts.resultVisible(notebook.alerts.resultVisible);
    notebookViewModel.alerts.resultTitle(notebook.alerts.resultTitle);
    notebookViewModel.alerts.resultSubTitle(notebook.alerts.resultSubTitle);
    notebookViewModel.alerts.resultContent(notebook.alerts.resultContent);
    //load result
    notebookViewModel.result.isDisplay(notebook.result.isDisplay);
    notebookViewModel.result.isDisplay_hive(notebook.result.isDisplay_hive);
    notebookViewModel.result.isDisplay_sql(notebook.result.isDisplay_sql);
    notebookViewModel.result.isDisplay_pig(notebook.result.isDisplay_pig);
    notebookViewModel.result.isDisplay_spark(notebook.result.isDisplay_spark);
    notebookViewModel.result.isDisplay_impala(notebook.result.isDisplay_impala);
    notebookViewModel.result.isDisplay_markdown(notebook.result.isDisplay_markdown);

    if(notebook.console.currentBookmark==1){
      //fulfill hive
      notebookViewModel.result.result_hive.vm_server_has_result(notebook.result.result_hive.vm_server_has_result);
      notebookViewModel.result.result_hive.vm_server.pageMaxSize(10);
      notebookViewModel.result.result_hive.vm_server.buildData(notebook.result.result_hive.vm_server.serverData);
      notebookViewModel.result.result_hive.vm_server.columnNames(notebook.result.result_hive.vm_server.serverData.columnNames);
      notebookViewModel.result.result_hive.vm_server.buildView();

      notebookViewModel.result.result_hive.vm_analyze_has_result(notebook.result.result_hive.vm_analyze_has_result);
      notebookViewModel.result.result_hive.vm_analyze.pageMaxSize(10);
      notebookViewModel.result.result_hive.vm_analyze.buildData(notebook.result.result_hive.vm_analyze.serverData);
      notebookViewModel.result.result_hive.vm_analyze.columnNames(notebook.result.result_hive.vm_analyze.serverData.columnNames);
      notebookViewModel.result.result_hive.vm_analyze.buildView();

    }else if(notebook.console.currentBookmark==2){
      //fulfill sql
    }else if(notebook.console.currentBookmark==3){
      //fulfill pig
    }else if(notebook.console.currentBookmark==4){
      //fulfill spark
    }else if(notebook.console.currentBookmark==5){
      //fulfill impala
    }else if(notebook.console.currentBookmark==6){
      //fulfill markdown
    }else if(notebook.console.currentBookmark==7){
      //fulfill machine learning
    }


    viewModel.notebooks.push(notebookViewModel);
  });
}
