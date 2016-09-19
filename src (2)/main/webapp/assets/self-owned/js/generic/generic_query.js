var ServerPagingQueryPOJO = ServerPagingQueryPOJO || {};
ServerPagingQueryPOJO = {
  listener_service_error:"SERVER_PAGING_QUERY_SERVER_FAILED_LISTENER",
  listener_response_error:"SERVER_PAGING_QUERY_FAILED_LISTENER",
  listener_response_success:"SERVER_PAGING_QUERY_SUCCESS_LISTENER",

  example_query_entity:{
    "className": "JobRecall",
    "aliasMap": {},
    "pageMaxSize": 10,
    "currentPageNumber": 1,
    "likeORMap": {},
    "eqMap": {},
    "inMap": {},
  },

  example_query_action:function(){
    var data = {
        'queryJson': $.toJSON(ServerPagingQueryPOJO.example_query_entity)
    };
    $.serverRequest($.getServerRoot() + '/service_generic_query/api/query', data, ServerPagingQueryPOJO.listener_response_success, ServerPagingQueryPOJO.listener_response_error, ServerPagingQueryPOJO.listener_service_error);
  },
}

$.subscribe(ServerPagingQueryPOJO.listener_response_success, listener_response_success_QUERY);
$.subscribe(ServerPagingQueryPOJO.listener_response_error, listener_response_error_QUERY);
$.subscribe(ServerPagingQueryPOJO.listener_service_error, listener_service_error_QUERY);

function listener_response_success_QUERY() {
  console.log("SERVER QUERY OPERATION SUCCESSED!");
  if (arguments && arguments[1]) {
    console.log(arguments[1]);
  }
}

function listener_response_error_QUERY() {
  console.log("SERVER QUERY OPERATION FAILED!");
  if (arguments && arguments[1]) {
    console.log(arguments[1]);
  }
}

function listener_service_error_QUERY() {
  console.log("SERVER QUERY OPERATION ERROR [THE SERVICE HAS FATAL ERROR]!");
  if (arguments && arguments[1]) {
    console.log(arguments[1]);
  }}

function ServerPagingViewModel() {

    var self = this;
    self.totalCounts = ko.observable();
    self.pageMaxSize = ko.observable(10);
    self.currentPageNumber = ko.observable(1);
    self.currentPageSize = ko.observable();
    self.searchKeyword = ko.observable();
    self.filterKeyword = ko.observable();
    self.serverData = null;
    self.viewData = ko.observableArray();
    self.columnNames = ko.observableArray();
    self.pagingSizeArray = ko.observableArray([10, 20, 50, 100]);
    self.entityClassName = ko.observable();
    self.hasServerResponse = ko.observable(false);

    self.pageMaxSize.subscribe(function (newValue) {
        if (self.retrieveData) {
            self.toPage(0);
        }
    });

    self.currentPageNumber.subscribe(function (newValue) {
      newValue = Number(newValue);
        if (!self.retrieveData) {
            return;
        }
        var cp = newValue;
        var tc = self.totalCounts();
        var pm = self.pageMaxSize();
        var tp = Math.ceil(tc / pm); // total page
        if (tp == 0 && cp == 1) {
            self.retrieveData();
        } else if (cp < 1) {
            self.currentPageNumber(1);
        } else if (cp > tp) {
            self.currentPageNumber(tp);
        } else {
            self.retrieveData();
        }
    });

    self.buildData = function (serverData) {
        self.serverData = serverData;
        self.hasServerResponse(true);
        self.viewData(serverData.result);
        self.totalCounts(self.serverData.totalCounts);
        self.pageMaxSize(self.serverData.pageMaxSize);
        self.currentPageNumber(self.serverData.currentPageNumber);
        self.currentPageSize(self.serverData.currentPageSize);
    };
    self.buildSearchData = function (serverData) {
        var transferData = DataTransferPOJO.serverJsonData2TableData(serverData.result);

        self.serverData = serverData;
        self.hasServerResponse(true);
        self.columnNames(transferData.header);
        self.viewData(transferData.result);
        self.totalCounts(self.serverData.totalCounts);
        self.pageMaxSize(self.serverData.pageMaxSize);
        self.currentPageNumber(self.serverData.currentPageNumber);
        self.currentPageSize(self.serverData.currentPageSize);
    };
    self.searchByKeyword = function () {
        if (self.retrieveData) {
            self.toPage(0);
        }
    };
    self.filterByKeyword = function (status) {
        self.filterKeyword(status);//store the chosen status
        if (self.retrieveData) {
            self.toPage(0);
        }
    };
    self.totalPage = function () {
        var tc = self.totalCounts();
        var pm = self.pageMaxSize();
        var tp = Math.ceil(tc / pm); // total page
        return tp;
    };
    self.toPage = function (pageNumber) {
        self.currentPageNumber(pageNumber);
//        console.log('navigate to the special page success...');
    };

}




function ResponseViewModel() {
  var self = this;
  self.styleClass = ko.observable("alert-success");
  self.resultVisible = ko.observable(false);
  self.resultTitle = ko.observable("Successed");
  self.resultSubTitle = ko.observable("[General Search]");
  self.resultContent = ko.observable("This is the result content...");

  self.errorResponse = function(content,title,subTitle) {
    self.response("alert-danger",content||"",title||'Error',subTitle||"");
  };

  self.correctResponse = function(content,title,subTitle) {
    self.response("alert-success",content||"",title||'Success',subTitle||"");
  };

  self.warningResponse = function(content,title,subTitle) {
    self.response("alert-warning",content||"",title||'Warning',subTitle||"");
  }

  self.response = function(response_level,content,title,subTitle) {
    self.styleClass(response_level);
    self.resultTitle(title);
    self.resultSubTitle(subTitle);
    self.resultContent(content);
    self.resultVisible(true);
  };

  self.reset = function(){
    self.resultVisible(false);
    self.resultTitle(":");
    self.resultSubTitle("");
    self.resultContent("");
  }
}
