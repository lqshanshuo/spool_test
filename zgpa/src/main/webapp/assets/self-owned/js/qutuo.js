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

    self.qu = new Group();
    self.ke = new Group();
    self.chu = new Group();

    self.level.subscribe(function () {
        self.person.initial_commission(getInitialCommission(self.level(), self.person.performance()));
    });

    self.other_income_percent.subscribe(function (newValue) {
        if (newValue === null || isNaN(newValue)) {
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
    self.trainning_allowance = ko.observable(0);             //训练津贴 ：
    self.increasing_num_bonus = ko.observable(0);           //增员奖 ： 

    self.job_allowance = ko.observable(0);                  //岗位津贴
    self.complete_allowance = ko.observable(0);             //达成津贴
    self.excess_bonus = ko.observable(0);                   //展业超额奖金

//function getInitialCommission(level, performance) {

//-------------------------去除小数 begin--------------------------------
    self.outstanding_human_resource.subscribe(function (newValue) {
        self.outstanding_human_resource(formatNumber(newValue, true, 0));
    });

    self.diamonds_human_resource.subscribe(function (newValue) {
        self.diamonds_human_resource(formatNumber(newValue, true, 0));
    });

    self.standard_human_resource.subscribe(function (newValue) {
        self.standard_human_resource(formatNumber(newValue, true, 0));
    });


    self.caifu_premium.subscribe(function (newValue) {
        self.caifu_premium(formatNumber(newValue, true));
    });

    self.yingyue_premium.subscribe(function (newValue) {
        self.yingyue_premium(formatNumber(newValue, true));
    });

    self.shuangfu_premium.subscribe(function (newValue) {
        self.shuangfu_premium(formatNumber(newValue, true));
    });

    self.shuangzhi_premium.subscribe(function (newValue) {
        self.shuangzhi_premium(formatNumber(newValue, true));
    });

    self.other_premium.subscribe(function (newValue) {
        self.other_premium(formatNumber(newValue, true));
    });

    self.performance.subscribe(function (newValue) {
        newValue = formatNumber(newValue, true, 0);
//        var commission = self.performance() * self.initial_commission_coefficient();
//        self.initial_commission();
        if (quTuoViewModel) {
            self.initial_commission(getInitialCommission(quTuoViewModel.level(), newValue));
            self.trainning_allowance(getTrainningAllowance(quTuoViewModel.userPOJO().institution, quTuoViewModel.userPOJO().begin_time, newValue));
            self.excess_bonus(getExcessBonus(quTuoViewModel.level(), newValue));
            self.complete_allowance(getCompleteAllowance(quTuoViewModel.level(), newValue));

        }
        self.performance(newValue);

    });


    self.initial_commission.subscribe(function (newValue) {
        var commission = formatNumber(newValue, true, 0);
        self.initial_commission(commission);
        if (quTuoViewModel) {
            quTuoViewModel.qu.initial_commission(commission);
            quTuoViewModel.ke.initial_commission(commission);
            quTuoViewModel.chu.initial_commission(commission);
        }
    });

    self.renewal_commission.subscribe(function (newValue) {
        self.renewal_commission(formatNumber(newValue, true));
    });

    self.trainning_allowance.subscribe(function (newValue) {
        self.trainning_allowance(formatNumber(newValue, true));
    });

    self.increasing_num_bonus.subscribe(function (newValue) {
        self.increasing_num_bonus(formatNumber(newValue, true));
    });

    self.job_allowance.subscribe(function (newValue) {
        self.job_allowance(formatNumber(newValue, true));
    });

    self.complete_allowance.subscribe(function (newValue) {
        self.complete_allowance(formatNumber(newValue, true));
    });

    self.excess_bonus.subscribe(function (newValue) {
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

        }
        return performance;

    }, this);


    self.job_allowance = ko.computed(function () {

    }, this);

    self.renewal_commission = ko.computed(function () {

    }, this);

    self.increasing_num_bonus = ko.computed(function () {

    }, this);


//------------------------compute end----------------------------------------



}

function Group() {
    var self = this;
    self.human_resource = ko.observable(0);                 //个人增员
    self.outstanding_human_resource = ko.observable(0);     //绩优增员
    self.diamonds_human_resource = ko.observable(0);        //钻石增员
    self.standard_human_resource = ko.observable(0);        //标准增员

    self.manage_allowance = ko.observable(0);               //管理津贴
    self.initial_commission = ko.observable(0);             //初佣



    self.guimo_coefficient = ko.observable(1);              //规模提奖系数
    self.renjunchanneng_coefficient = ko.observable(1);     //人均产能提奖系数
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
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.human_resource(newValue);
    });

    self.outstanding_human_resource.subscribe(function (newValue) {
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.outstanding_human_resource(newValue);
    });

    self.diamonds_human_resource.subscribe(function (newValue) {
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.diamonds_human_resource(newValue);
    });

    self.standard_human_resource.subscribe(function (newValue) {
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.standard_human_resource(newValue);
    });

    self.manage_allowance.subscribe(function (newValue) {
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.manage_allowance(newValue);
    });

    self.educate_benefits.subscribe(function (newValue) {
        if (newValue === null || isNaN(newValue)) {
            newValue = 0;
        }
        self.educate_benefits(newValue);
    });

    self.development_allowance.subscribe(function (newValue) {
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
        //TODO
    }, this);

    self.educate_benefits = ko.computed(function () {
        //TODO
    }, this);

    self.development_allowance = ko.computed(function () {
        //TODO
    }, this);

//---------------------compute end -----------------------------------------

}

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