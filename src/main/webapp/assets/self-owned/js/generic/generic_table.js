function DataModel(data, isChecked, isDisplay) {
    var self = this;
    self.data = data;
    self.isChecked = ko.observable(isChecked);
    self.isDisplay = ko.observable(isDisplay);
}



function ListViewModel() {
    var self = this;
    self.totalCounts = ko.observable();
    self.pageMaxSize = ko.observable(10);
    self.currentPageNumber = ko.observable();
    self.currentPageSize = ko.observable();
    self.searchKeyword = ko.observable();
    self.serverData = null;
    self.originalData = ko.observableArray();
    self.viewData = ko.observableArray();
    self.columnNames = ko.observableArray();
    self.pagingSizeArray = ko.observableArray([5,10, 20, 50, 100]);

    self.isSelectCurrentPage = ko.observable();
    self.isSelectAllPage = ko.observable();

    self.isSelectCurrentPageFile = ko.observable();
    self.isSelectAllPageFile = ko.observable();

    self.hasResult = ko.observable(false);

    self.searchField = ko.observable();


    self.pageMaxSize.subscribe(function (newValue) {
        self.buildView();
    });

    self.currentPageNumber.subscribe(function (newValue) {
        newValue = Number(newValue);
        self.toPage(newValue);
    });

    self.isSelectCurrentPage.subscribe(function (newValue) {
        var start = (self.currentPageNumber() - 1) * self.pageMaxSize();
        var end = self.currentPageNumber() * self.pageMaxSize() - 1 > self.totalCounts() ? self.totalCounts() : self.currentPageNumber() * self.pageMaxSize() - 1;
        var type = newValue ? 'select' : 'unselect';
        self.switchPageView(self.viewData(), start, end, type);
    });

    self.isSelectAllPage.subscribe(function (newValue) {
        var start = 0;
        var end = self.viewData().length;
        var type = newValue ? 'select' : 'unselect';
        self.switchPageView(self.viewData(), start, end, type);
    });

    self.isSelectCurrentPageFile.subscribe(function (newValue) {
        var start = (self.currentPageNumber() - 1) * self.pageMaxSize();
        var end = self.currentPageNumber() * self.pageMaxSize() - 1 > self.totalCounts() ? self.totalCounts() : self.currentPageNumber() * self.pageMaxSize() - 1;
        var type = newValue ? 'select' : 'unselect';
        self.switchPageViewFile(self.viewData(), start, end, type);
    });

    self.isSelectAllPageFile.subscribe(function (newValue) {
        var start = 0;
        var end = self.viewData().length;
        var type = newValue ? 'select' : 'unselect';
        self.switchPageViewFile(self.viewData(), start, end, type);
    });

    self.getSelectedData = function () {
        var result = [];
        for (var i = 0; i < self.viewData().length; i++) {
            if (self.viewData()[i].isChecked()) {
                result.push(self.viewData()[i].data);
            }
        }
        return result;
    };

    self.totalSelected = ko.computed(function () {
        var total = 0;
        for (var i = 0; i < self.viewData().length; i++) {
            if (self.viewData()[i].isChecked()) {
                total++;
            }
        }
        return total;
    });

    self.checkListener = function (current) {
        current.isChecked(!current.isChecked());
    };
    self.reset = function(){
        self.isSelectCurrentPage(false);
        self.isSelectAllPage(false);
        self.isSelectCurrentPageFile(false);
        self.isSelectAllPageFile(false);
    };
    self.buildData = function (serverData) {
        //build data from server
        self.reset();
        var tmp = [];
        $.each(serverData, function (idx, val) {
            tmp.push(new DataModel(val, false, false));
        });
        self.originalData(tmp);
        self.serverData = serverData;
        self.hasResult(true);
    };

    self.buildView = function () {
        //build the view data
        var keyword = self.searchKeyword();
        var pageSize = self.pageMaxSize();
        var currentPageNumber = 1;

        var tmp = [];
        $.each(self.originalData(), function (idx, val) {
            var jsonData = val.data;
            if (keyword && keyword.length > 0) {
                if (self.searchField()){
                    $.each(self.searchField(), function (key,value){
                        if(jsonData[value].toString().indexOf(keyword) >= 0){
                            tmp.push(new DataModel(jsonData, false, false));
                            return false;
                        }
                    })
                }else{
                    $.each(jsonData, function (key, value) {
                        if (value.toString().indexOf(keyword) >= 0) {
                            tmp.push(new DataModel(jsonData, false, false));
                            return false;
                        }
                    })
                }
            } else {
                tmp.push(new DataModel(jsonData, false, false));
            }

        });

        $.each(tmp, function (idx, val) {
            if (idx < pageSize) {
                val.isDisplay(true);
            } else {
                val.isDisplay(false);
            }
        });

        self.viewData(tmp);

        self.totalCounts(self.viewData().length);
        self.toPage(1);
    }

    self.totalPage = function () {
        var tc = self.totalCounts();
        var pm = self.pageMaxSize();
        var tp = Math.ceil(tc / pm); // total page
        return tp;
    }

    self.toPage = function (pageNumber) {
        var cp = pageNumber;
        var tc = self.totalCounts();
        var pm = self.pageMaxSize();
        var tp = Math.ceil(tc / pm); // total page
        if (tp == 0 || cp < 1) {
            cp = 1;
        } else if (cp > tp) {
            cp = tp;
        }
        self.currentPageNumber(cp);
        self.switchPageView(self.viewData(), (cp - 1) * pm, cp * pm - 1 > tc ? tc : cp * pm - 1, 'display');
        console.log('navigate to the special page success...');
    };

    // 分页更新页面视图元素函数，逻辑如下：
    // data为表中所有数据，它包含的isDisplay属性控制是否在界面显示
    // 对data进行loop，将索引从first到last之间的元素设置为显示，其余设置为不显示
    self.switchPageView = function (data, first, last, type) {
        for (var i = 0; i < data.length; i++) {
            var element = data[i];
            if (i >= first && i <= last) {
                if (type == 'display') {
                    element.isDisplay(true);
                } else if (type == 'select') {
                    element.isChecked(true);
                } else if (type == 'unselect') {
                    element.isChecked(false);
                }
            } else {
                if (type == 'display') {
                    element.isDisplay(false);
                }
            }
        }
    };

    self.switchPageViewFile = function (data, first, last, type) {
        for (var i = 0; i < data.length; i++) {
            var element = data[i];
            if (i >= first && i <= last) {
                if (type == 'display') {
                    element.isDisplay(true);
                } else if (type == 'select' && data[i].data.type == 'FILE') {
                    element.isChecked(true);
                } else if (type == 'unselect') {
                    element.isChecked(false);
                }
            } else {
                if (type == 'display') {
                    element.isDisplay(false);
                }
            }
        }
    };
}
