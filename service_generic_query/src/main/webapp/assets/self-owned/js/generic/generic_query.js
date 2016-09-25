var ServerPagingQueryPOJO = ServerPagingQueryPOJO || {};
ServerPagingQueryPOJO = {
    queryPOJO: {
        "className": "",
        "pageMaxSize": 10,
        "currentPageNumber": 1
    },
    requestPOJO: {
        url: $.getServerRoot() + '/service_generic_query/api/query',
        data: {
            'queryJson': ''
        },
        method: 'POST',
        successListener: "PAGING_SEARCH_SUCCESS"
    },
    search: function (queryPOJO, successListener) {
        var PagingRequest = ClonePOJO.shallowClone(ServerPagingQueryPOJO.requestPOJO);
        $(PagingRequest).attr("data", {
            'queryJson': $.toJSON(queryPOJO)
        });
        PagingRequest.successListener = successListener;
        var successListener = PagingRequest.successListener;
        $.ajax({
            url: PagingRequest.url,
            data: PagingRequest.data,
            type: PagingRequest.method,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json',
            success: function (json) {
                // console.log(json);
                if (json.hasError) {
                    console.log("Request get error: " + json.errorMessage);
                    $.publish("PAGING_SEARCH_FAILED",json);
                } else {
                    $.publish(successListener, json);
                }
            },
            error: function (xhr, status) {
                console.log('Sorry, there was a problem on pagingSearch process!');
            },
            complete: function (xhr, status) {
            }
        });
    }
}


function ServerPagingViewModel() {

    var self = this;
    self.totalCounts = ko.observable();
    self.pageMaxSize = ko.observable();
    self.currentPageNumber = ko.observable(1);
    self.currentPageSize = ko.observable();
    self.searchKeyword = ko.observable();
    self.filterKeyword = ko.observable();
    self.serverData = null;
    self.viewData = ko.observableArray();
    self.columnNames = ko.observableArray();
    self.pagingSizeArray = ko.observableArray([10, 20, 50, 100]);
    self.entityClassName = ko.observable();
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
        self.viewData(serverData.result);
        self.totalCounts(self.serverData.totalCounts);
        self.pageMaxSize(self.serverData.pageMaxSize);
        self.currentPageNumber(self.serverData.currentPageNumber);
        self.currentPageSize(self.serverData.currentPageSize);
    };
    self.buildSearchData = function (serverData) {
        var transferData = DataTransferPOJO.serverJsonData2TableData(serverData.result);

        self.serverData = serverData;
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

  self.errorResponse = function(content) {
    self.styleClass("alert-danger");
    self.resultTitle("Error:");
    self.resultSubTitle("");
    self.resultContent(content);
    self.resultVisible(true);
  };

  self.correctResponse = function(content) {
    self.styleClass("alert-success");
    self.resultTitle("Successed:");
    self.resultSubTitle("");
    self.resultContent(content);
    self.resultVisible(true);
  }

  self.reset = function(){
    self.resultVisible(false);
    self.resultTitle(":");
    self.resultSubTitle("");
    self.resultContent("");
  }
}
