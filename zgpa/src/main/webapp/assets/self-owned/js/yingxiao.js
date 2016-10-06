function YingXiaoViewModel() {
    var self = this;
    self.userPOJO = ko.observable();
//    self.code = ko.observable(1001);
//    self.name = ko.observable("张三");
    self.level = ko.observable();
    self.begin_level = ko.observable();

    self.total_income = ko.observable(0); //总收入=累计收入+其他收入，
    //累计收入=初佣+续期+训练津贴+增员奖+直接管理津贴+育成利益+经理津贴+增部利益+总监利益
    //其他收入=提供往年占总收入占比，计算公式如下（累计收入*对应占比）/（1-对应占比）
    self.other_income_percent = ko.observable(0); //提供往年占总收入占比
    self.level_array = ko.observableArray(["00", "01", "02", "04", "05", "06", "08", "09", "10",
        "17", "31", "32", "33", "34", "D1", "D2", "D3"]);
//        self.level_array = ko.observableArray(["[00]", "[02]", "[03]", "[04]", "[05]", "[06]", "[07]", "[08]", "[09]", "[10]",
//        "[17]", "[31]", "[32]", "[33]", "[34]", "[D1]", "[D2]", "[D3]"]);


    self.person = new Person();
    self.group = new Group();
    self.part = new Part();
    self.isPersonDisplay = ko.observable(true);
    self.isGroupDisplay = ko.observable(false);
    self.isPartDisplay = ko.observable(false);
    self.level.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        var fresh_man_array = ["00", "01"];
        var group_permission = ["04", "05", "06"];
        var all_permission = ["08", "09", "10", "17", "D1", "D2", "D3"];
        self.isPersonDisplay = ko.observable(true);
        self.person.trainning_allowance(computeTrainingAllawance(self)); //训练津贴

        self.group.level_coefficient(computeManageAllawanceCoefficient(self));

        if ($.inArray(newValue, fresh_man_array) > -1) {
            console.log("fresh_man");
            self.person.is_increasing_num_display(false);
        } else {
            console.log("not fresh_man");
            self.person.is_increasing_num_display(true);
        }

        console.log("level =" + newValue)

        if ($.inArray(newValue, all_permission) > -1) {
            console.log("all");
            self.isGroupDisplay(true);
            self.isPartDisplay(true);
        } else if ($.inArray(newValue, group_permission) > -1) {
            console.log("group");
            self.isGroupDisplay(true);
            self.isPartDisplay(false);
        } else {
            console.log("person only");
            self.isGroupDisplay(false);
            self.isPartDisplay(false);
        }

    });
    self.userPOJO.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.other_income_percent(newValue.other_income_percent);
        self.person.renewal_commission(newValue.renewal_history); //续佣
        self.person.trainning_allowance(computeTrainingAllawance(self)); //训练津贴


        self.group.history_num_1(newValue.history_num_1); //历史数据1
        self.group.history_num_2(newValue.history_num_2); //历史数据2
        self.group.history_num_3(newValue.history_num_3); //历史数据3
        self.group.history_num_4(newValue.history_num_4); //历史数据4
        self.group.direct_group_num(newValue.direct_group_count); //直接小组数，历史数据获得
        self.group.indirect_group_num(newValue.indirect_group_count); //间接小组数，历史数据获得
//        self.group.level_coefficient(computeManageAllawanceCoefficient(self));
//        computeManageAllawanceCoefficient(yingXiaoViewModel)

        self.part.history_num_3(newValue.history_num_3); //历史数据3
        self.part.history_num_4(newValue.history_num_4); //历史数据4
        self.part.subordinate_part_num(newValue.subordinate_part_num); //下辖部数量
    });

    self.other_income_percent.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        newValue = newValue.replace("%", "");
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

    self.is_increasing_num_display = ko.observable(false);      //是否显示个人增员规划
    self.human_resource = ko.observable(0);                                     //个人增员
    self.outstanding_human_resource = ko.observable();                          //绩优增员
    self.diamonds_human_resource = ko.observable();                             //钻石增员
    self.standard_human_resource = ko.observable();                             //标准增员

    self.caifu_premium = ko.observable();                                       //财富天赢保费
    self.yingyue_premium = ko.observable();                                    //赢越人生保费
    self.shuangfu_premium = ko.observable();                                   //双福保费
    self.shuangzhi_premium = ko.observable();                                  //双智保费
    self.other_premium = ko.observable();                                      //其他保费


    self.initial_commission = ko.observable(0);                                 //初佣 ： 财富天赢保费*6%+赢越人生保费*12%+双福保费*55%+双智保费*26%+其他保费*22%
    self.renewal_commission = ko.observable(0);                                 //续期 ： 历史数据，2016年初佣
    self.trainning_allowance = ko.observable(0);                                //训练津贴 ：张家口、衡水、承德、邢台按照III类标准，其余按照II类标准，具体标准见训练津贴计算表
    self.increasing_num_bonus = ko.observable(0);                               //增员奖 ： 绩优人力人数*6000*19%+钻石人力人数*3000*18%+标准人力人数*2000*18%


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
    self.human_resource = ko.computed(function () {         //个人增员
        var outstanding_human = self.outstanding_human_resource() || 0;
        var diamonds_human = self.diamonds_human_resource() || 0;
        var standard_human = self.standard_human_resource() || 0;

        var num = outstanding_human + diamonds_human + standard_human;
        num = formatNumber(num, true, 0) || 0;
        return num;
    }, this);
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
    self.initial_commission.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }

        var commission = formatNumber(newValue, true, 2);
        self.initial_commission(commission);
        if (yingXiaoViewModel) {
            yingXiaoViewModel.group.initial_commission(commission);
            yingXiaoViewModel.part.initial_commission(commission);
        }
        self.trainning_allowance(computeTrainingAllawance(yingXiaoViewModel)); //训练津贴
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

    self.initial_commission = ko.computed(function () {
        var caifu_premium = self.caifu_premium() || 0;
        var yingyue_premium = self.yingyue_premium() || 0;
        var shuangfu_premium = self.shuangfu_premium() || 0;
        var shuangzhi_premium = self.shuangzhi_premium() || 0;
        var other_premium = self.other_premium() || 0;

        var commission = caifu_premium * 0.06 + yingyue_premium * 0.12 +
                shuangfu_premium * 0.55 + shuangzhi_premium * 0.26 +
                other_premium * 0.22;
        var commission = formatNumber(commission, true, 2) || 0;
        if (yingXiaoViewModel) {
            yingXiaoViewModel.group.initial_commission(commission);
            yingXiaoViewModel.part.initial_commission(commission);
        }
        self.trainning_allowance(computeTrainingAllawance(yingXiaoViewModel)); //训练津贴

        return commission;
    }, this);
    self.increasing_num_bonus = ko.computed(function () {
        var outstanding_human_resource = self.outstanding_human_resource() || 0;
        var diamonds_human_resource = self.diamonds_human_resource() || 0;
        var standard_human_resource = self.standard_human_resource() || 0;


        var bonus = outstanding_human_resource * 6000 * 0.19 +
                diamonds_human_resource * 3000 * 0.18 +
                standard_human_resource * 2000 * 0.18;
        var bonus = formatNumber(bonus, true) || 0;
        return bonus;
    }, this);
}

function Group() {
    var self = this;
    self.human_resource = ko.observable(0); //小组规划人力
    self.outstanding_human_resource = ko.observable(); //绩优人力
    self.diamonds_human_resource = ko.observable(); //钻石人力
    self.standard_human_resource = ko.observable(); //标准人力

    self.initial_commission = ko.observable(0); //个人情况中的初佣

    self.direct_group_num = ko.observable(0); //直接小组数，历史数据获得
    self.indirect_group_num = ko.observable(0); //间接小组数，历史数据获得

    self.history_num_1 = ko.observable(0); //历史数据1
    self.history_num_2 = ko.observable(0); //历史数据2
    self.history_num_3 = ko.observable(0); //历史数据3
    self.history_num_4 = ko.observable(0); //历史数据4

    self.manage_allowance = ko.observable(0); //小组总FYC*对应分档系数（见管理津贴分档系数表）*115%
    self.educate_benefits = ko.observable(0); //育成利益
    self.FYC_group = ko.observable(0); //小组总FYC : 组情况中的（绩优人力人数*6000+钻石人力人数*3000+标准人力人数*2000）+个人情况中的初佣

    self.level_coefficient = ko.observable(0); //对应分档系数（见管理津贴分档系数表）




    self.human_resource.subscribe(function (newValue) {
        if (!newValue) {
            return;
        }
        self.human_resource(formatNumber(newValue, true));
    });
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


    self.human_resource = ko.computed(function () {
        var outstanding_human = self.outstanding_human_resource() || 0;
        var diamonds_human = self.diamonds_human_resource() || 0;
        var standard_human = self.standard_human_resource() || 0;

        var num = outstanding_human + diamonds_human + standard_human;
        num = formatNumber(num, true, 0) || 0;
        return num;

    }, this);

    self.FYC_group = ko.computed(function () {
        var outstanding_human = self.outstanding_human_resource() || 0;
        var diamonds_human = self.diamonds_human_resource() || 0;
        var standard_human = self.standard_human_resource() || 0;
        var initial_commission = self.initial_commission() || 0;


        var FYC = outstanding_human * 6000 +
                diamonds_human * 3000 +
                standard_human * 2000 +
                initial_commission;
        console.log("FYC_group change")
        FYC = formatNumber(FYC, true, 2) || 0;
        self.level_coefficient(computeManageAllawanceCoefficient(FYC, yingXiaoViewModel));
        return FYC;
    }, this);

    self.manage_allowance = ko.computed(function () {
//        console.log("self.FYC_group() = " + self.FYC_group());
//        console.log("self.level_coefficient() = " + self.level_coefficient());

        var allowance = self.FYC_group() * self.level_coefficient() * 1.15;
//        console.log("manage_allowance = " + allowance);
        allowance = formatNumber(allowance, true) || 0;
        return allowance;
    }, this);

    self.educate_benefits = ko.computed(function () {
        var benefits = self.direct_group_num() * self.history_num_1() +
                self.indirect_group_num() * self.history_num_2();
        benefits = formatNumber(benefits, true) || 0;
        return benefits;
    }, this);
}


function Part() {
    var self = this;
    self.human_resource = ko.observable(0); //部门规划人力
    self.outstanding_human_resource = ko.observable(); //绩优人力
    self.diamonds_human_resource = ko.observable(); //钻石人力
    self.standard_human_resource = ko.observable(); //标准人力

    self.initial_commission = ko.observable(0); //个人情况中的初佣

    self.manager_allowance = ko.observable(0); //经理津贴：部门总FYC*对应分档系数（见经理津贴分档系数表）*110%
    self.increasing_part_benefits = ko.observable(0); //增部利益：下辖部数量*历史数据3
    self.director_benefits = ko.observable(0); //如业务人员为总监职级，则参考历史数据4，提高20%
    self.FYC_part = ko.observable(0); //部门总FYC=部情况中的（绩优人力人数*6000+钻石人力人数*3000+标准人力人数*2000）+个人情况中初佣

    self.level_coefficient = ko.observable(0); //对应分档系数（见经理津贴分档系数表）

    self.history_num_3 = ko.observable(0); //历史数据3
    self.history_num_4 = ko.observable(0); //历史数据4

    self.subordinate_part_num = ko.observable(0); //下辖部数量，通过数据库提供历史数据




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

    self.human_resource = ko.computed(function () {
        var outstanding_human = self.outstanding_human_resource() || 0;
        var diamonds_human = self.diamonds_human_resource() || 0;
        var standard_human = self.standard_human_resource() || 0;

        var num = outstanding_human + diamonds_human + standard_human;
        num = formatNumber(num, true, 0) || 0;
        return num;

    }, this);

    self.FYC_part = ko.computed(function () {
        var outstanding_human = self.outstanding_human_resource() || 0;
        var diamonds_human = self.diamonds_human_resource() || 0;
        var standard_human = self.standard_human_resource() || 0;
        var initial_commission = self.initial_commission() || 0;


        var FYC = outstanding_human * 6000 + diamonds_human * 3000 +
                standard_human * 2000 + initial_commission;

        FYC = formatNumber(FYC, true) || 0;
        self.level_coefficient(computeManagerCoefficient(FYC, yingXiaoViewModel));
        return FYC;
    }, this);

    self.manager_allowance = ko.computed(function () {
        var allowance = self.FYC_part() * self.level_coefficient() * 1.10;
        allowance = formatNumber(allowance, true) || 0;
        console.log("FYC_part:"+self.FYC_part())
        console.log("level_coefficient:"+self.level_coefficient())
        return allowance;
    }, this);

    self.increasing_part_benefits = ko.computed(function () {
        var benefits = self.subordinate_part_num() * self.history_num_3();
        benefits = formatNumber(benefits, true) || 0;
        return benefits;
    }, this);

    self.director_benefits = ko.computed(function () {
        var benefits = self.history_num_4() * 1.20;
        benefits = formatNumber(benefits, true) || 0;
        return benefits;
    }, this);
}


function computeTrainingAllawance(yingXiaoViewModel) {
    if ((yingXiaoViewModel == null) || (yingXiaoViewModel.userPOJO == null)) {
        return 0;
    }
    var userPOJO = yingXiaoViewModel.userPOJO();
//    console.log("computeTrainingAllawance in");
    var type_3_are_arr = ["张家口", "衡水", "承德", "邢台"];
    var time = userPOJO.begin_time.split("/") || [];
    var FYC = yingXiaoViewModel.person.initial_commission();
    var trainning_allowance = 0;
    var year = Number(time[2]) || 0;
    var month = Number(time[0]) || 0;
//     if (((year != 2016) || (month == 1)) && (!(year == 2017 && month == 1))) {  //非2016，06年且非2017年1月                                                  //直接判断不是新人
// //        console.log("你的入职时间 没有对应的训练津贴")
//         return trainning_allowance;
//     }

  if (((year != 2016) || ( year == 2016 && month == 1))) {  //非2016，06年且非2017年1月                                                  //直接判断不是新人
    return trainning_allowance;
  }


    if ($.inArray(userPOJO.institution, type_3_are_arr) < 0) {                  //训练津贴对应2类
//        console.log("2 类");
//        console.log("FYC =" + FYC)

        if (yingXiaoViewModel.begin_level() == "01") {                                // 01职级2类
//            console.log("01");
            if ((month > 10 && month < 13) || month == 1) {                         //2016年 11-12月，或2017年1月
                if (FYC >= 500 && FYC < 800) {
                    trainning_allowance = 500;
                } else if (FYC >= 800 && FYC < 2000) {
                    trainning_allowance = 800;
                } else if (FYC >= 2000) {
                    trainning_allowance = 1100;
                }
            }
        } else if (yingXiaoViewModel.begin_level() == "00") {                         // 01职级2类
//            console.log("00")
//            console.log("FYC =" + FYC)

            if ((month > 10 && month < 13) || month == 1) {                 //2016年 11-12月，或2017年1月
                if (FYC >= 600 && FYC < 900) {
                    trainning_allowance = 800;
                } else if (FYC >= 900 && FYC < 2000) {
                    trainning_allowance = 1100;
                } else if (FYC >= 2000 && FYC < 4000) {
                    trainning_allowance = 1600;
                } else if (FYC >= 4000) {
                    trainning_allowance = 2400;
                }
            } else if (month > 1 && month < 11) {                           //2016年 2 - 10 月
                if (FYC >= 600 && FYC < 900) {
                    trainning_allowance = 0;
                } else if (FYC >= 900 && FYC < 2000) {
                    trainning_allowance = 800;
                } else if (FYC >= 2000 && FYC < 4000) {
                    trainning_allowance = 1000;
                } else if (FYC >= 4000) {
                    trainning_allowance = 1500;
                }
            }
        }
    }

    if ($.inArray(userPOJO.institution, type_3_are_arr) > -1) {                  //训练津贴对应3类
//        console.log("3 类");
        if (yingXiaoViewModel.begin_level() == "01") {                                // 00职级3类
//            console.log("01");
            if ((month > 10 && month < 13) || month == 1) {                         //2016年 11-12月，或2017年1月
                if (FYC >= 300 && FYC < 600) {
                    trainning_allowance = 400;
                } else if (FYC >= 600 && FYC < 1800) {
                    trainning_allowance = 600;
                } else if (FYC >= 1800) {
                    trainning_allowance = 800;
                }
            }
        } else if (yingXiaoViewModel.begin_level() == "00") {                         // 00职级3类
//            console.log("00")
//            console.log("FYC =" + FYC)
            if ((month > 10 && month < 13) || month == 1) {                 //2016年 11-12月，或2017年1月
                if (FYC >= 400 && FYC < 700) {
                    trainning_allowance = 700;
                } else if (FYC >= 700 && FYC < 800) {
                    trainning_allowance = 700;
                } else if (FYC >= 800 && FYC < 1800) {
                    trainning_allowance = 900;
                } else if (FYC >= 1800 && FYC < 3600) {
                    trainning_allowance = 1400;
                } else if (FYC >= 3600) {
                    trainning_allowance = 2000;
                }
            } else if (month > 1 && month < 11) {                           //2016年 2-10 月
                if (FYC >= 400 && FYC < 700) {
                    trainning_allowance = 0;
                } else if (FYC >= 700 && FYC < 800) {
                    trainning_allowance = 700;
                } else if (FYC >= 800 && FYC < 1800) {
                    trainning_allowance = 700;
                } else if (FYC >= 1800 && FYC < 3600) {
                    trainning_allowance = 800;
                } else if (FYC >= 3600) {
                    trainning_allowance = 1200;
                }
            }
        }
    }

    return trainning_allowance;
}


function computeManageAllawanceCoefficient(FYC, yingXiaoViewModel) {
    if (yingXiaoViewModel == null) {
        return 0;
    }


    var x = getXForManageAllawanceCoefficient(FYC);
    var y = getYForManageAllawanceCoefficient(yingXiaoViewModel.level());
//
//    console.log("computeManageAllawanceCoefficient in");
//    console.log("x = " + x);
//    console.log("y = " + y);



    var coefficient = 0;
    var coefficient_table = [
        [0.06, 0.06, 0.06, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07],
        [0.08, 0.09, 0.10, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11],
        [0.12, 0.13, 0.14, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15],
        [0.15, 0.16, 0.17, 0.19, 0.19, 0.19, 0.19, 0.19, 0.19],
        [0.18, 0.19, 0.20, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22],
        [0.21, 0.22, 0.23, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25]
    ];
    if (x < 0 || y < 0) {
        return coefficient;
    } else {
        coefficient = coefficient_table[x][y] || 0;
        return coefficient;
    }
}

function getXForManageAllawanceCoefficient(FYC_group) {

//    console.log("FYC_group = " + FYC_group);

    var x = -1;
    if (FYC_group < 4200) {
        x = 0;
    } else if (FYC_group >= 4200 && FYC_group < 7000) {
        x = 1;
    } else if (FYC_group >= 7000 && FYC_group < 15000) {
        x = 2;
    } else if (FYC_group >= 15000 && FYC_group < 30000) {
        x = 3;
    } else if (FYC_group >= 30000 && FYC_group < 50000) {
        x = 4;
    } else if (FYC_group >= 50000) {
        x = 5;
    }
    return x;
}

function getYForManageAllawanceCoefficient(level) {
    var y = -1;
//    console.log("level = " + level)
    switch (level) {
        case "04":
            y = 0;
            break
        case "05":
            y = 1;
            break;
        case "06":
            y = 2;
            break;
        case "08":
            y = 3;
            break;
        case "09":
            y = 4;
            break;
        case "10":
            y = 5;
            break;
        case "D1":
            y = 6;
            break;
        case "D2":
            y = 7;
            break;
        case "D3":
            y = 8;
            break
        default:
            y = -1;
    }
    return y;
}



function computeManagerCoefficient(FYC, yingXiaoViewModel) {
    if (yingXiaoViewModel == null) {
        return 0;
    }


    var x = getXForManagerCoefficient(FYC);
    var y = getYForManagerCoefficient(yingXiaoViewModel.level());

//    console.log("computeManagerCoefficient in");
//    console.log("x = " + x);
//    console.log("y = " + y);



    var coefficient = 0;
    var coefficient_table = [
        [0.015, 0.02, 0.025, 0.025, 0.025, 0.025],
        [0.025, 0.03, 0.035, 0.035, 0.035, 0.035],
        [0.03, 0.035, 0.04, 0.04, 0.04, 0.04],
        [0.035, 0.04, 0.045, 0.045, 0.045, 0.045],
        [0.04, 0.045, 0.05, 0.05, 0.05, 0.05],
        [0.045, 0.05, 0.055, 0.055, 0.055, 0.055],
    ];
    if (x < 0 || y < 0) {
        return coefficient;
    } else {
        coefficient = coefficient_table[x][y] || 0;
        return coefficient;
    }
}

function getXForManagerCoefficient(FYC_part) {

    console.log("FYC_part = " + FYC_part);

    var x = -1;
    if (FYC_part < 50400) {
        x = 0;
    } else if (FYC_part >= 50400 && FYC_part < 63000) {
        x = 1;
    } else if (FYC_part >= 63000 && FYC_part < 110000) {
        x = 2;
    } else if (FYC_part >= 110000 && FYC_part < 200000) {
        x = 3;
    } else if (FYC_part >= 200000 && FYC_part < 300000) {
        x = 4;
    } else if (FYC_part >= 300000) {
        x = 5;
    }
    return x;
}

function getYForManagerCoefficient(level) {
    var y = -1;
    switch (level) {
        case "08":
            y = 0;
            break
        case "09":
            y = 1;
            break;
        case "10":
            y = 2;
            break;
        case "D1":
            y = 3;
            break;
        case "D2":
            y = 4;
            break;
        case "D3":
            y = 5;
            break;
        default:
            y = -1;
    }
    return y;
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
//                console.log("222222222digit = " + digit)
                num = num.substring(0, num.indexOf("."));
            } else {
//                console.log("11111111digit = " + digit)
                num = num.substring(0, num.indexOf(".") + digit + 1);
            }

        }
    }

    return Number(num);
}
