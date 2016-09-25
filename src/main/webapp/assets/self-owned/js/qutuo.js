function QuTuoViewModel() {
    var self = this;
    self.code = ko.observable(1001);
    self.name = ko.observable("张三");
    self.level = ko.observable();
    self.level_array = ko.observableArray(["非优绩", "A1", "A2"]);
    self.total_income = ko.observable(0);

    self.other_income_percent = ko.observable(0);
    
    self.total_performance = ko.observable(0);                                  //总业绩



    self.person = new Person();

    self.qu = new Group();
    self.ke = new Group();
    self.chu = new Group();


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


    self.initial_commission = ko.observable(0);             //初佣 ： 根据个人职级（各职级标准见计算规则见PPT第2页）和所填写的产能进行计算。
    self.renewal_commission = ko.observable(0);             //续期 ： 
    self.tainning_allowance = ko.observable(0);             //训练津贴 ：
    self.increasing_num_bonus = ko.observable(0);           //增员奖 ： 

    self.job_allowance = ko.observable(0);                  //岗位津贴
    self.complete_allowance = ko.observable(0);             //达成津贴
    self.excess_bonus = ko.observable(0);                   //展业超额奖金


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



    self.initial_commission.subscribe(function (newValue) {
        var commission = formatNumber(newValue, true, 2);
        self.initial_commission(commission);
        if (quTuoViewModel) {
            quTuoViewModel.group.initial_commission(commission);
            quTuoViewModel.part.initial_commission(commission);
        }
    });

    self.renewal_commission.subscribe(function (newValue) {
        self.renewal_commission(formatNumber(newValue, true));
    });

    self.tainning_allowance.subscribe(function (newValue) {
        self.tainning_allowance(formatNumber(newValue, true));
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

    self.initial_commission = ko.computed(function () {
        var commission = self.caifu_premium() * 0.06 + self.yingyue_premium() * 0.12 +
                self.shuangfu_premium() * 0.55 + self.shuangzhi_premium() * 0.26 +
                self.other_premium() * 0.22;
        var commission = formatNumber(commission, true, 2) || 0;
        if (quTuoViewModel) {
            quTuoViewModel.group.initial_commission(commission);
            quTuoViewModel.part.initial_commission(commission);
        }

        return commission;

    }, this);

    self.job_allowance = ko.computed(function () {

    }, this);

    self.renewal_commission = ko.computed(function () {

    }, this);

    self.tainning_allowance = ko.computed(function () {

    }, this);

    self.increasing_num_bonus = ko.computed(function () {

    }, this);

    self.complete_allowance = ko.computed(function () {

    }, this);

    self.excess_bonus = ko.computed(function () {

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