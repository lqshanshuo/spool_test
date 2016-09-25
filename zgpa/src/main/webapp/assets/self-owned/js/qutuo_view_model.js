function QuTuoViewModel() {
    var self = this;
    self.code = ko.observable(1001);
    self.name = ko.observable("张三");
    self.level = ko.observable();
    self.total_income = ko.observable(0);
    self.other_income_percent = ko.observable(45);
    self.level_array = ko.observableArray(["非优绩", "A1", "A2"]);

    self.person = new Person();

    self.zhangyequ = new Zhangyequ();
    self.zhangyeke = new Group();
    self.zhangyechu = new Group();
    self.zhangyequbu = new Group();

    self.other_income_percent.subscribe(function (newValue) {
        if (newValue == null || isNaN(newValue)) {
            newValue = 0;
        } else if (newValue >= 100) {
            newValue = 99;
        } else if (newValue < 0) {
            newValue = 0;
        }
        self.other_income_percent(newValue);
    });

}

function Person() {
    var self = this;
    self.last_performance_level = ko.observable();                              //上季度绩优档次
    self.performance_level_array = ko.observableArray(["非优绩", "A1", "A2"]);   //所有档次
    self.commission_coefficient = ko.observable(0.01);                          //佣金提取系数 数值？？
    self.total_performance = ko.observable(0);                                  //总业绩
    self.increasing_num = ko.observable(0);                                     //增援人数
    self.initial_commission = ko.observable(0);                                 //初佣
    self.tainning_allowance = ko.observable(0);                                 //训练津贴
    self.complete_allowance = ko.observable(0);                                 //达成津贴
    self.job_allowance = ko.observable(0);                                      //岗位津贴
    self.excess_bonus = ko.observable(0);                                       //展业超额奖金
    self.increasing_num_bonus = ko.observable(0);                               //增员奖金
    self.performance_allowance = ko.observable(0);                              //绩优津贴
    self.performance_coefficient = ko.observable(0.01);                         //提取比例  ?? 多少
    self.post_allowance = ko.observable(0);                                     //职务津贴

    self.sum = ko.computed(function () {
        var sum_tmp = self.initial_commission() + self.tainning_allowance() + self.complete_allowance() +
                self.job_allowance() + self.excess_bonus() + self.increasing_num_bonus() +
                self.performance_allowance() + self.post_allowance();
        sum_tmp = sum_tmp || 0;

        return sum_tmp;
    }, this);

    self.total_performance.subscribe(function (newValue) {
        if (newValue == null || isNaN(newValue)) {
            newValue = 0;
        }
        self.total_performance(newValue);

        self.initial_commission(newValue * self.commission_coefficient());
        self.performance_allowance(newValue * self.performance_coefficient());
    });

    self.increasing_num.subscribe(function (newValue) {
        if (newValue == null || isNaN(newValue)) {
            newValue = 0;
        }
        self.increasing_num(newValue);

        self.increasing_num_bonus(newValue * 14000 * 0.066);
    });





}




function Zhangyequ() {
    var self = this;
    self.human_resource = ko.observable();          //人力
    self.per_capita_achievement_history = ko.observable("37021");  //人均业绩历史值
    self.per_capita_achievement = ko.observable();  //人均业绩
    self.manage_allowance = ko.observable();        //管理津贴
    self.increasing_budget = ko.observable();       //增区拟算
    self.increasing_budget_history = ko.observable("33064");       //增区拟算里历史值

    self.guimo_coefficient = ko.observable(1);           //规模提奖系数
    self.renjunchanneng_coefficient = ko.observable(1);  //人均产能提奖系数
    self.huodonglv_coefficient = ko.observable(1.08);       //活动率提奖系数
    self.jixulv_coefficient = ko.observable(1.15);          //继续率调整比例

    self.human_resource.subscribe(function (newValue) {
        if (newValue == null || isNaN(newValue)) {
            newValue = 0;
        }
        self.human_resource(newValue);
    });

    self.per_capita_achievement.subscribe(function (newValue) {
        if (newValue == null || isNaN(newValue)) {
            newValue = 0;
        }
        self.per_capita_achievement(newValue);
    });

    self.increasing_budget.subscribe(function (newValue) {
        if (newValue == null || isNaN(newValue)) {
            newValue = 0;
        }
        self.increasing_budget(newValue);
    });



    self.manage_allowance = ko.computed(function () {
        var coefficient_1 = self.human_resource() * self.per_capita_achievement();
//        if (coefficient_1 > 1.07) {
//            coefficient_1 = 1.07;
//        }
        var allowance = coefficient_1 * self.guimo_coefficient() *
                self.renjunchanneng_coefficient() * self.huodonglv_coefficient() * self.jixulv_coefficient();
        allowance = allowance || 0;
        return allowance;
    }, this);

}



function Group() {
    var self = this;
    self.human_resource = ko.observable();          //人力
    self.per_capita_achievement = ko.observable();  //人均业绩
    self.per_capita_achievement_history = ko.observable("37045");  //人均业绩历史值
    self.manage_allowance = ko.observable();        //管理津贴
    self.increasing_budget = ko.observable();       //增区拟算
    self.increasing_budget_history = ko.observable("33066");       //增区拟算里历史值


    self.guimo_coefficient = ko.observable(1);           //规模提奖系数
    self.renjunchanneng_coefficient = ko.observable(1);  //人均产能提奖系数
    self.huodonglv_coefficient = ko.observable(1.08);       //活动率提奖系数
    self.jixulv_coefficient = ko.observable(1.15);          //继续率调整比例


    self.human_resource.subscribe(function (newValue) {
        if (newValue == null || isNaN(newValue)) {
            newValue = 0;
        }
        self.human_resource(newValue);
    });

    self.per_capita_achievement.subscribe(function (newValue) {
        if (newValue == null || isNaN(newValue)) {
            newValue = 0;
        }
        self.per_capita_achievement(newValue);
    });

    self.increasing_budget.subscribe(function (newValue) {
        if (newValue == null || isNaN(newValue)) {
            newValue = 0;
        }
        self.increasing_budget(newValue);
    });


    self.manage_allowance = ko.computed(function () {
        var allowance = self.human_resource() * self.per_capita_achievement() * self.guimo_coefficient() *
                self.renjunchanneng_coefficient() * self.huodonglv_coefficient();
        allowance = allowance || 0;
        return allowance;
    }, this);

}

//function Zhangyechu() {
//    var self = this;
//    self.human_resource = ko.observable();          //人力
//    self.per_capita_achievement = ko.observable();  //人均业绩
//    self.manage_allowance = ko.observable();        //管理津贴
//    self.increasing_budget = ko.observable();       //增区拟算
//
//    self.guimo_coefficient = ko.observable();           //规模提奖系数
//    self.renjunchanneng_coefficient = ko.observable();  //人均产能提奖系数
//    self.huodonglv_coefficient = ko.observable(1.08);       //活动率提奖系数
//    self.jixulv_coefficient = ko.observable(1.15);          //继续率调整比例
//
//
//}
//
//function Zhangyequbu() {
//    var self = this;
//    self.human_resource = ko.observable();          //人力
//    self.per_capita_achievement = ko.observable();  //人均业绩
//    self.manage_allowance = ko.observable();        //管理津贴
//    self.increasing_budget = ko.observable();       //增区拟算
//
//    self.guimo_coefficient = ko.observable();           //规模提奖系数
//    self.renjunchanneng_coefficient = ko.observable();  //人均产能提奖系数
//    self.huodonglv_coefficient = ko.observable(1.08);       //活动率提奖系数
//    self.jixulv_coefficient = ko.observable(1.15);          //继续率调整比例
//
//
//}