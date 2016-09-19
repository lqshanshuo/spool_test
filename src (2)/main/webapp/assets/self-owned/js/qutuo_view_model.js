function QuTuoViewModel() {
    var self = this;
    self.code = ko.observable(1001);
    self.name = ko.observable("张三");
    self.level = ko.observable();
    self.total_income = ko.observable(10);
    self.other_income_percent = ko.observable("45%");
    self.level_array = ko.observableArray(["一级","二级","三级"]);

    self.person = new Person();
    
    self.zhangyequ = new Group();
    self.zhangyeke = new Group();
    self.zhangyechu = new Group();
    self.zhangyequbu = new Group();


}

function Person() {
    var self = this;
    self.last_performance_level = ko.observable();
    self.performance_level_array = ko.observableArray(["一级","二级","三级"]);
    self.total_performance = ko.observable(10000);
    self.increasing_num = ko.observable(8);
    self.initial_commission = ko.observable(10000);
    self.tainning_allowance = ko.observable(10000);
    self.complete_allowance = ko.observable(10000);
    self.post_allowance = ko.observable(10000);
    self.excess_bonus = ko.observable(10000);
    self.increasing_num_bonus = ko.observable(10000);
    self.performance_allowance = ko.observable(10000);
}

function Group() {
    var self = this;
    self.human_resource = ko.observable(5);
    self.per_capita_achievement = ko.observable(10000);
    self.manage_allowance = ko.observable(50000);
    self.increasing_budget = ko.observable(100000);
}