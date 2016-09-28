function QuTuoViewModel() {
    var self = this;
    self.code = ko.observable(1001);
    self.name = ko.observable("张三");

    self.userPOJO = ko.observable();

    self.level = ko.observable();
    self.level_array = ko.observableArray([
        "试用收展员", "收展员一级", "收展员二级", "收展员三级", "收展员四级",
        "收展员五级", "收展员六级", "收展员七级", "收展员八级",
        "展业区主任一级", "展业区主任二级", "展业区主任三级", "展业区主任四级",
        "展业区主任五级", "展业区主任六级", "展业区主任七级", "展业区主任八级",
        "高级展业处处经理", "展业课课长", "资深展业课课长", "展业处经理",
        "高级展业课课长", "区部经理", "资深展业处处经理"
    ]);





    self.total_income = ko.observable(0);

    self.other_income_percent = ko.observable(0);

    self.total_performance = ko.observable(0);                                  //总业绩



    self.person = new Person();

    self.qu = new Group("qu");
    self.ke = new Group("ke");
    self.chu = new Group("chu");

    self.level.subscribe(function () {
        self.person.initial_commission(getInitialCommission(self.level(), self.person.performance()));
    });

    self.other_income_percent.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        } else if (newValue >= 100) {
            newValue = 99;
        } else if (newValue < 0) {
            newValue = 0;
        }
        self.other_income_percent(newValue);
    });

    self.userPOJO.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        var renewal_commission = newValue.renewal_history || 0;
        var educate_benefits = newValue.educate_benefits || 0;
        var zengke_benefits = newValue.zengke_benefits || 0;
        var zengchu_benefits = newValue.zengchu_benefits || 0;
        var development_allowance = newValue.development_allowance || 0;

        self.person.renewal_commission(renewal_commission);
        self.qu.educate_benefits(educate_benefits);
        self.ke.zengke_benefits(zengke_benefits);
        self.chu.zengchu_benefits(zengchu_benefits);
        self.chu.development_allowance(development_allowance);

    });


}

function Person() {
    var self = this;
    self.human_resource = ko.observable(0);                 //个人增员
    self.outstanding_human_resource = ko.observable(0);     //绩优增员
    self.diamonds_human_resource = ko.observable(0);        //钻石增员
    self.standard_human_resource = ko.observable(0);        //标准增员

    self.caifu_premium = ko.observable(0);                  //财富天赢保费
    self.yingyue_premium = ko.observable(0);                //赢越人生保费
    self.shuangfu_premium = ko.observable(0);               //双福保费
    self.shuangzhi_premium = ko.observable(0);              //双智保费
    self.other_premium = ko.observable(0);                  //其他保费

    self.performance = ko.observable(0);                    //新契约业绩

    self.initial_commission_coefficient = ko.observable(0);             //初佣 ： 根据个人职级（各职级标准见计算规则见PPT第2页）和所填写的产能进行计算。

    self.initial_commission = ko.observable(0);             //初佣 ： 根据个人职级（各职级标准见计算规则见PPT第2页）和所填写的产能进行计算。
    self.renewal_commission = ko.observable(0);             //续期 ： 
    self.trainning_allowance = ko.observable(0);            //训练津贴 ：
    self.increasing_num_bonus = ko.observable(0);           //增员奖 ： 

    self.job_allowance = ko.observable(0);                  //岗位津贴
    self.complete_allowance = ko.observable(0);             //达成津贴
    self.excess_bonus = ko.observable(0);                   //展业超额奖金

//function getInitialCommission(level, performance) {

//-------------------------去除小数 begin--------------------------------
    self.outstanding_human_resource.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.outstanding_human_resource(formatNumber(newValue, true, 0));
    });

    self.diamonds_human_resource.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.diamonds_human_resource(formatNumber(newValue, true, 0));
    });

    self.standard_human_resource.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.standard_human_resource(formatNumber(newValue, true, 0));
    });


    self.caifu_premium.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.caifu_premium(formatNumber(newValue, true));
    });

    self.yingyue_premium.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.yingyue_premium(formatNumber(newValue, true));
    });

    self.shuangfu_premium.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.shuangfu_premium(formatNumber(newValue, true));
    });

    self.shuangzhi_premium.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.shuangzhi_premium(formatNumber(newValue, true));
    });

    self.other_premium.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.other_premium(formatNumber(newValue, true));
    });

    self.performance.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        newValue = formatNumber(newValue, true, 0) || 0;

        if (quTuoViewModel) {
            self.initial_commission(getInitialCommission(quTuoViewModel.level(), newValue));
            self.trainning_allowance(getTrainningAllowance(quTuoViewModel.userPOJO().institution, quTuoViewModel.userPOJO().begin_time, newValue));
            self.excess_bonus(getExcessBonus(quTuoViewModel.level(), newValue));
            self.complete_allowance(getCompleteAllowance(quTuoViewModel.level(), newValue));

            quTuoViewModel.qu.performance(newValue);
            quTuoViewModel.ke.performance(newValue);
            quTuoViewModel.chu.performance(newValue);
        }
        self.performance(newValue);

    });


    self.initial_commission.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        var commission = formatNumber(newValue, true, 0);
        self.initial_commission(commission);
        if (quTuoViewModel) {
            quTuoViewModel.qu.initial_commission(commission);
            quTuoViewModel.ke.initial_commission(commission);
            quTuoViewModel.chu.initial_commission(commission);
        }
    });

    self.renewal_commission.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.renewal_commission(formatNumber(newValue, true));
    });

    self.trainning_allowance.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.trainning_allowance(formatNumber(newValue, true));
    });

    self.increasing_num_bonus.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.increasing_num_bonus(formatNumber(newValue, true));
    });

    self.job_allowance.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.job_allowance(formatNumber(newValue, true));
    });

    self.complete_allowance.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.complete_allowance(formatNumber(newValue, true));
    });

    self.excess_bonus.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.excess_bonus(formatNumber(newValue, true));
    });
//-------------------------去除小数 end --------------------------------





//-------------------------compute begin-------------------------------------


    self.human_resource = ko.computed(function () {         //个人增员

        var num = self.outstanding_human_resource() + self.diamonds_human_resource() + self.standard_human_resource();
        num = formatNumber(num, true, 0) || 0;
        return num;
    }, this);


    self.performance = ko.computed(function () {
        var performance = self.caifu_premium() + self.yingyue_premium() +
                self.shuangfu_premium() + self.shuangzhi_premium() +
                self.other_premium();

        var performance = formatNumber(performance, true, 0) || 0;

        if (quTuoViewModel) {
            self.initial_commission(getInitialCommission(quTuoViewModel.level(), performance));
            self.trainning_allowance(getTrainningAllowance(quTuoViewModel.userPOJO().institution, quTuoViewModel.userPOJO().begin_time, performance));
            self.excess_bonus(getExcessBonus(quTuoViewModel.level(), performance));
            self.complete_allowance(getCompleteAllowance(quTuoViewModel.level(), performance));

            quTuoViewModel.qu.performance(newValue);
            quTuoViewModel.ke.performance(newValue);
            quTuoViewModel.chu.performance(newValue);

        }
        return performance;

    }, this);


    self.job_allowance = ko.computed(function () {

    }, this);


    self.increasing_num_bonus = ko.computed(function () {

    }, this);


//------------------------compute end----------------------------------------



}

function Group(type) {
    var self = this;
    self.type = ko.onbservable(type);

    self.human_resource = ko.observable(0);                 //个人增员
    self.outstanding_human_resource = ko.observable();     //绩优增员
    self.diamonds_human_resource = ko.observable();        //钻石增员
    self.standard_human_resource = ko.observable();        //标准增员

    self.manage_allowance = ko.observable(0);               //管理津贴
//    self.initial_commission = ko.observable(0);             //初佣
    self.performance = ko.observable(0);                    //新契约业绩


    self.guimo_coefficient = ko.observable(1);              //规模提奖系数
    self.renjunchanneng_coefficient = ko.observable(0);     //人均产能提奖系数
    self.huodonglv_coefficient = ko.observable(1.08);       //活动率提奖系数

//---------------------各部分特殊的属性 begin-------------------------------------------
    self.educate_benefits = ko.observable(0);               //育成利益，仅对区有意义

    self.zengke_benefits = ko.observable(0);                //增课利益，仅对课有意义

    self.zengchu_benefits = ko.observable(0);               //增处利益，仅对部有意义
    self.development_allowance = ko.observable(0);          //区部发展津贴，仅对部有意义 
    self.jixulv_coefficient = ko.observable(1);             //继续率调整比例 ，仅对部有意义,其他应该为1
//---------------------各部分特殊的属性 end-------------------------------------------



//---------------------去掉小数 begin -------------------------------------------

    self.human_resource.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.human_resource(newValue);
    });

    self.performance.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }

        self.guimo_coefficient(getGuimoCoefficient(self.type, newValue));

    });

    self.outstanding_human_resource.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.outstanding_human_resource(newValue);
    });

    self.diamonds_human_resource.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.diamonds_human_resource(newValue);
    });

    self.standard_human_resource.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.standard_human_resource(newValue);
    });

    self.manage_allowance.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.manage_allowance(newValue);
    });

    self.educate_benefits.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.educate_benefits(newValue);
    });

    self.development_allowance.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.development_allowance(newValue);
    });

//---------------------去掉小数 end -------------------------------------------



//---------------------compute begin -----------------------------------------
    self.human_resource = ko.computed(function () {
        var num = self.outstanding_human_resource() + self.diamonds_human_resource() + self.standard_human_resource();
        num = formatNumber(num, true, 0) || 0;
        return num;
    }, this);



    self.manage_allowance = ko.computed(function () {
        var performance = self.performance || 0;                    //新契约业绩
        var guimo_coefficient = self.guimo_coefficient || 1;        //规模提奖系数
        var renjunchanneng_coefficient = self.renjunchanneng_coefficient || 0;//人均产能提奖系数
        var jixulv_coefficient = self.jixulv_coefficient || 1;      //继续率调整比例

        var coefficient1 = guimo_coefficient * renjunchanneng_coefficient;
        console.log("coefficient1 = " + coefficient1)
        if (coefficient1 > 0.07) {
            coefficient1 = 0.07;
        }

        var allowance = performance * coefficient1;
        if (self.type == "qu") {
            allowance = allowance * jixulv_coefficient;
        }

        allowance = formatNumber(allowance, true, 0) || 0;
        return allowance;
    }, this);


//---------------------compute end -----------------------------------------

}

//计算初佣
function getInitialCommission(level, performance) {
    var commission = 0;
    var type_1 = ["试用收展员"];
    var type_2 = ["收展员四级", "收展员五级", "收展员六级", "收展员七级", "收展员八级"];
    var type_3 = ["收展员三级"];
    var type_4 = ["收展员一级", "收展员二级"];
    var type_5 = [
        "展业区主任一级", "展业区主任二级", "展业区主任三级", "展业区主任四级",
        "展业区主任五级", "展业区主任六级", "展业区主任七级", "展业区主任八级",
        "高级展业处处经理", "展业课课长", "资深展业课课长", "展业处经理",
        "高级展业课课长", "区部经理", "资深展业处处经理"
    ];

    if ($.inArray(level, type_1) > -1) {
        if (performance > 7200) {
            commission = 7200 * 0.2 + (performance - 7200) * 0.25;
        } else {
            commission = performance * 0.2;
        }
    } else if ($.inArray(level, type_2) > -1) {
        commission = performance * 0.25;
    } else if ($.inArray(level, type_3) > -1) {
        commission = performance * 0.27;
    } else if ($.inArray(level, type_4) > -1) {
        commission = performance * 0.28;
    } else if ($.inArray(level, type_5) > -1) {
        commission = performance * 0.30;
    }

    return commission;
}

//计算训练津贴
function getTrainningAllowance(institution, time, performance) {
    var allowance = 0;
    var time_arr = time.split("/") || [];
//    console.log("time_arr = " + time_arr);
    var month = Number(time_arr[0]) || 0;
    var year = Number(time_arr[2]) || 0;

    console.log("year = " + year);
    console.log("time = " + time);
    console.log("institution = " + institution);
    console.log("performance = " + performance);

    if (performance <= 0 || year != 2016) {
        return allowance;
    }



    if (institution != "秦皇岛") {
//        console.log("not 秦皇岛")
        if (month >= 1 && month <= 3) {
//            console.log("month >= 1 && month <= 3")

            if (performance < 1200) {
                allowance = 0;
            } else if (performance >= 1200 && performance < 2300) {
                allowance = 700;
            } else if (performance >= 2300 && performance < 5100) {
                allowance = 900;
            } else if (performance >= 5100 && performance < 10000) {
                allowance = 1400;
            } else if (performance >= 10000) {
                allowance = 2000;
            }
        } else if (month >= 4 && month <= 6) {
//            console.log("month >= 4 && month <= 6")

            if (performance < 1500) {
                allowance = 0;
            } else if (performance >= 1500 && performance < 2000) {
                allowance = 500;
            } else if (performance >= 2000 && performance < 5100) {
                allowance = 700;
            } else if (performance >= 5100 && performance < 10000) {
                allowance = 800;
            } else if (performance >= 10000) {
                allowance = 1200;
            }
        } else if (month >= 7 && month <= 12) {
//            console.log("month >= 7 && month <= 12")

            if (performance < 2000) {
                allowance = 0;
            } else if (performance >= 2000 && performance < 5100) {
                allowance = 700;
            } else if (performance >= 5100 && performance < 10000) {
                allowance = 800;
            } else if (performance >= 10000) {
                allowance = 1200;
            }
        }
    } else {
//        console.log(" 秦皇岛")

        if (month >= 1 && month <= 3) {
            if (performance < 1700) {
                allowance = 0;
            } else if (performance >= 1700 && performance < 2500) {
                allowance = 800;
            } else if (performance >= 2500 && performance < 5700) {
                allowance = 1100;
            } else if (performance >= 5700 && performance < 11000) {
                allowance = 1600;
            } else if (performance >= 10000) {
                allowance = 2400;
            }
        } else if (month >= 4 && month <= 6) {
            if (performance < 2000) {
                allowance = 0;
            } else if (performance >= 2000 && performance < 2500) {
                allowance = 600;
            } else if (performance >= 2500 && performance < 5700) {
                allowance = 800;
            } else if (performance >= 5700 && performance < 11000) {
                allowance = 1000;
            } else if (performance >= 11000) {
                allowance = 1500;
            }
        } else if (month >= 7 && month <= 12) {
            if (performance < 2500) {
                allowance = 0;
            } else if (performance >= 2500 && performance < 5700) {
                allowance = 800;
            } else if (performance >= 5700 && performance < 11000) {
                allowance = 1000;
            } else if (performance >= 11000) {
                allowance = 1500;
            }
        }
    }
    return allowance;

}

//计算超额奖金
function getExcessBonus(level, performance) {
    var bonus = 0;
    var duty_arr = {"试用收展员": 2000, "收展员八级": 2400, "收展员七级": 3000, "收展员六级": 4000, "收展员五级": 6000
        , "收展员四级": 8000, "收展员三级": 12000, "收展员二级": 18000, "收展员一级": 24000};
    var duty_performance = duty_arr[level] || -1;
    if (duty_performance <= 0 || performance <= duty_performance) {
        return bonus;
    }
    var bonus_rate = 0;

    var excess_rate = performance / duty_performance;

    var bonus_rate_table = [
        [0.03, 0.04, 0.06, 0.07, 0.08, 0.09, 0.11, 0.13, 0.14],
        [0.035, 0.045, 0.065, 0.075, 0.085, 0.095, 0.115, 0.135, 0.145],
        [0.04, 0.05, 0.07, 0.08, 0.09, 0.10, 0.12, 0.14, 0.15],
        [0.045, 0.055, 0.075, 0.085, 0.095, 0.105, 0.125, 0.145, 0.155],
        [0.05, 0.06, 0.08, 0.09, 0.10, 0.11, 0.13, 0.15, 0.16]
    ];


    var getX = function (excess_rate) {
        var x = -1;
        if (excess_rate >= 1.0 && excess_rate < 1.2) {
            x = 0;
        } else if (excess_rate >= 1.2 && excess_rate < 1.4) {
            x = 1;
        } else if (excess_rate >= 1.4 && excess_rate < 1.6) {
            x = 2;
        } else if (excess_rate >= 1.8 && excess_rate < 2.0) {
            x = 3;
        } else if (excess_rate >= 2.0) {
            x = 4;
        }
        return x;
    };

    var getY = function (level) {
        var y = -1;
        if (level == "试用收展员") {
            y = 0;
        } else if (level == "收展员八级") {
            y = 1;
        } else if (level == "收展员七级") {
            y = 2;
        } else if (level == "收展员六级") {
            y = 3;
        } else if (level == "收展员五级") {
            y = 4;
        } else if (level == "收展员四级") {
            y = 5;
        } else if (level == "收展员三级") {
            y = 6;
        } else if (level == "收展员二级") {
            y = 7;
        } else if (level == "收展员一级") {
            y = 8;
        }
        return y;
    };

    var x = getX(excess_rate);
    var y = getY(level);

    if (x < 0 || y < 0) {
        bonus_rate = 0;
    } else {
        bonus_rate = bonus_rate_table[x][y] || 0;
    }

    bonus = (performance - duty_performance) * bonus_rate;

    return bonus;
}

//计算达成奖金
function getCompleteAllowance(level, performance) {
    var allowance = 0;
    var duty_arr = {"收展员八级": 2400, "收展员七级": 3000, "收展员六级": 4000, "收展员五级": 6000
        , "收展员四级": 8000, "收展员三级": 12000, "收展员二级": 18000, "收展员一级": 24000};
    var duty_performance = duty_arr[level] || -1;
    if (duty_performance <= 0 || performance <= 0) {
        return allowance;
    }
//    var allowance_rate = 0;

    var rate = performance / duty_performance;

    var bonus_rate_table = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [70, 80, 100, 160, 210, 310, 470, 620],
        [90, 120, 160, 230, 310, 470, 700, 940],
        [130, 160, 210, 310, 420, 620, 940, 1250],
        [170, 210, 260, 390, 520, 780, 1170, 1560]
    ];


    var getX = function (rate) {
        var x = -1;
        if (rate >= 0.0 && rate < 0.4) {
            x = 0;
        } else if (rate >= 0.4 && rate < 0.6) {
            x = 1;
        } else if (rate >= 0.6 && rate < 0.8) {
            x = 2;
        } else if (rate >= 0.8 && rate < 1.0) {
            x = 3;
        } else if (rate >= 1.0) {
            x = 4;
        }
        return x;
    };

    var getY = function (level) {
        var y = -1;
        if (level == "收展员八级") {
            y = 0;
        } else if (level == "收展员七级") {
            y = 1;
        } else if (level == "收展员六级") {
            y = 2;
        } else if (level == "收展员五级") {
            y = 3;
        } else if (level == "收展员四级") {
            y = 4;
        } else if (level == "收展员三级") {
            y = 5;
        } else if (level == "收展员二级") {
            y = 6;
        } else if (level == "收展员一级") {
            y = 7;
        }
        return y;
    };

    var x = getX(rate);
    var y = getY(level);

    if (x < 0 || y < 0) {
        allowance = 0;
    } else {
        allowance = bonus_rate_table[x][y] || 0;
    }

    return allowance;
}

//计算岗位/职务津贴
function getJobAllowance(level, performance) {
    var allowance = 0;
    var allowanceArray = [
        {"level": "收展员八级", "standard": 500, "allowance": 120},
        {"level": "收展员七级", "standard": 500, "allowance": 150},
        {"level": "收展员六级", "standard": 500, "allowance": 300},
        {"level": "收展员五级", "standard": 600, "allowance": 400},
        {"level": "收展员四级", "standard": 800, "allowance": 500},
        {"level": "收展员三级", "standard": 1200, "allowance": 700},
        {"level": "收展员二级", "standard": 1800, "allowance": 1000},
        {"level": "收展员一级", "standard": 2400, "allowance": 1200},
        {"level": "区主任八级", "standard": 0, "allowance": 600},
        {"level": "区主任七级", "standard": 0, "allowance": 800},
        {"level": "区主任六级", "standard": 0, "allowance": 1000},
        {"level": "区主任五级", "standard": 0, "allowance": 1200},
        {"level": "区主任四级", "standard": 0, "allowance": 1400},
        {"level": "区主任三级", "standard": 0, "allowance": 1600},
        {"level": "区主任二级", "standard": 0, "allowance": 1800},
        {"level": "区主任一级", "standard": 0, "allowance": 2000},
        {"level": "课长", "standard": 0, "allowance": 2000},
        {"level": "高级课长", "standard": 0, "allowance": 3000},
        {"level": "资深课长", "standard": 0, "allowance": 4000},
        {"level": "处经理", "standard": 0, "allowance": 7000},
        {"level": "高级处经理", "standard": 0, "allowance": 8000},
        {"level": "资深处经理", "standard": 0, "allowance": 9000},
        {"level": "区部经理", "standard": 0, "allowance": 12000},
        {"level": "高级区部经理", "standard": 0, "allowance": 14000},
        {"level": "资深区部经理", "standard": 0, "allowance": 16000},
    ];

    var quZhuRenArray = ["区主任八级", "区主任八级", "区主任八级", "区主任八级",
        "区主任八级", "区主任八级", "区主任八级", "区主任八级"];

    var quZhuRenStandardArray = [
        {"区主任八级": 20000},
        {"区主任七级": 30000},
        {"区主任六级": 40000},
        {"区主任五级": 50000},
        {"区主任四级": 60000},
        {"区主任三级": 70000},
        {"区主任二级": 80000},
        {"区主任一级": 90000},
    ]

    for (var i in allowanceArray) {
        if (allowanceArray[i].level == level) {
            console.log("get job allowance hit level = " + level);
            if (performance >= allowanceArray[i].standard) {
                console.log("达到标准");
                allowance = allowanceArray[i].allowance;

                //如果是区主任，计算责任额达成率
                if ($.inArray(level, quZhuRenArray) > -1) {
                    console.log("区主任")
                    var standard = quZhuRenStandardArray[level];
                    if (standard && standard > 0) {
                        var rate = performance / standard;
                        if (rate < 70) {
                            console.log("区主任 责任额未到 70%");
                            allowance = allowance * 0.8;
                        }
                    }
                }
            }
        }
    }

    return allowance;
}

//计算规模系数
function getGuimoCoefficient(type, performance) {
    var coefficient = 1;

    var quCoefficientArray = [1, 1.2, 1.35, 1.4, 1.45, 1.5, 1.55, 1.6, 1.65, 1.7, 1.75];
    var quPerformanceArray = [0, 12000, 18000, 24000, 36000, 48000, 72000, 96000, 120000, 180000, 240000, Infinity];

    var keCoefficientArray = [1, 1.25, 1.45, 1.54, 1.55, 1.60, 1.70, 1.72, 1.74, 1.75, 1.78, 1.80];
    var kePerformanceArray = [0, 35000, 60000, 85000, 110000, 135000, 160000, 185000, 300000, 450000, 600000, 750000, Infinity];

    var chuCoefficientArray = [1.025, 1.225, 1.275, 1.400, 1.500, 1.675, 1.775, 1.800, 1.825, 1.850, 1.875, 1.900];
    var chuPerformanceArray = [0, 100000, 200000, 300000, 400000, 500000, 750000, 1000000, 1500000, 2000000, 2500000, 3000000, Infinity];


    var coefficientTable = [
        {"type": "qu", "coefficientArray": quCoefficientArray, "performanceArray": quPerformanceArray},
        {"type": "ke", "coefficientArray": keCoefficientArray, "performanceArray": kePerformanceArray},
        {"type": "chu", "coefficientArray": chuCoefficientArray, "performanceArray": chuPerformanceArray}
    ];

    var coefficientArray;
    var performanceArray;
    for (var n in coefficientTable) {
        if (coefficientTable[n].type == type) {
            coefficientArray = coefficientTable[n].coefficientArray;
            performanceArray = coefficientTable[n].performanceArray;
            break;
        }
    }

    if (!coefficientArray || !performanceArray) {
        return coefficient;
    }




    for (var i = 0; i < performanceArray.length - 1; i++) {
        if (performance >= performanceArray[i] && performance < performanceArray[i + 1]) {
            console.log("performanceArray[i] = " + performanceArray[i]);
            console.log("performanceArray[i +1]  = " + performanceArray[i + 1]);

            coefficient = coefficientArray[i];
        }
    }

    return coefficient;

}

//计算人均产能提奖系数
function getRenjunchannengCoefficient(type, channeng) {
    var coefficient = 1;

    var quCoefficientArray = [0, 0.015, 0.02, 0.0313, 0.0338, 0.0358, 0.0378, 0.0388, 0.0393, 0.0398, 0.0403, 0.0408];
    var quChannengArray = [0, 1500, 2250, 2750, 3250, 3750, 4250, 5250, 7250, 9250, 12500, 16000, Infinity];

    var keCoefficientArray = [0, 0.007, 0.01, 0.0135, 0.0150, 0.0155, 0.0160, 0.0170, 0.01775, 0.0185, 0.01875, 0.019];
    var keChannengArray = [0, 1500, 2250, 2750, 3250, 3750, 4250, 5250, 7250, 9250, 12500, 16000, Infinity];

    var chuCoefficientArray = [0, 0.00420, 0.0044, 0.0055, 0.0060, 0.00625, 0.00650, 0.00675, 0.0070, 0.00725, 0.00750, 0.00775];
    var chuChannengArray = [0, 1500, 2250, 2750, 3250, 3750, 4250, 5250, 7250, 9250, 12500, 16000, Infinity];


    var coefficientTable = [
        {"type": "qu", "coefficientArray": quCoefficientArray, "channengArray": quChannengArray},
        {"type": "ke", "coefficientArray": keCoefficientArray, "channengArray": keChannengArray},
        {"type": "chu", "coefficientArray": chuCoefficientArray, "channengArray": chuChannengArray}
    ];

    var coefficientArray;
    var channengArray;
    for (var n in coefficientTable) {
        if (coefficientTable[n].type == type) {
            coefficientArray = coefficientTable[n].coefficientArray;
            channengArray = coefficientTable[n].channengArray;
            break;
        }
    }

    if (!coefficientArray || !channengArray) {
        return coefficient;
    }




    for (var i = 0; i < channengArray.length - 1; i++) {
        if (channeng >= channengArray[i] && channeng < channengArray[i + 1]) {
            console.log("channengArray[i] = " + channengArray[i]);
            console.log("channengArray[i +1]  = " + channengArray[i + 1]);

            coefficient = coefficientArray[i];
        }
    }

    return coefficient;

}

//去小数
function formatNumber(num, rounding, digit) {
    digit = digit || 0;
    if (num === null || isNaN(num)) {
        num = 0;
    }

    if (rounding) {             //取两位小数
        num = num + "";
        if (num.indexOf(".") > 0) {
            if (digit == 0) {
                num = num.substring(0, num.indexOf("."));
            } else {
                num = num.substring(0, num.indexOf(".") + digit + 1);
            }

        }
    }

    return Number(num);
}