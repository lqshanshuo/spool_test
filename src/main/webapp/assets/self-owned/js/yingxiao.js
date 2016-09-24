function YingXiaoViewModel() {
    var self = this;
    self.code = ko.observable(1001);
    self.name = ko.observable("张三");
    self.level = ko.observable();
    self.total_income = ko.observable(0);                     //总收入=累计收入+其他收入，
    //累计收入=初佣+续期+训练津贴+增员奖+直接管理津贴+育成利益+经理津贴+增部利益+总监利益
    //其他收入=提供往年占总收入占比，计算公式如下（累计收入*对应占比）/（1-对应占比）
    self.other_income_percent = ko.observable(0);          //提供往年占总收入占比
    self.level_array = ko.observableArray(["一级", "二级", "三级"]);

    self.person = new Person();
    self.group = new Group();
    self.part = new Part();

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
    self.increasing_num = ko.observable(0);                 //个人增员
    self.outstanding_increasing_num = ko.observable(0);     //绩优增员
    self.diamonds_increasing_num = ko.observable(0);        //钻石增员
    self.standard_increasing_num = ko.observable(0);        //标准增员

    self.increasing_num = ko.computed(function () {         //个人增员
        var num = self.outstanding_increasing_num() + self.diamonds_increasing_num() + self.standard_increasing_num();
        num = num || 0;
        return num;
    }, this);


    self.caifu_premium = ko.observable(0);                  //财富天赢保费
    self.yingyue_premium = ko.observable(0);                //赢越人生保费
    self.shuangfu_premium = ko.observable(0);               //双福保费
    self.shuangzhi_premium = ko.observable(0);              //双智保费
    self.other_premium = ko.observable(0);                  //其他保费


//------------ 以下为计算部分，非输入区域 --------------------
    self.initial_commission = ko.observable(0);             //初佣 ： 财富天赢保费*6%+赢越人生保费*12%+双福保费*55%+双智保费*26%+其他保费*22%
    self.renewal_commission = ko.observable(0);             //续期 ： 历史数据，2016年初佣
    self.tainning_allowance = ko.observable(0);             //训练津贴 ：张家口、衡水、承德、邢台按照III类标准，其余按照II类标准，具体标准见训练津贴计算表
    self.increasing_num_bonus = ko.observable(0);           //增员奖 ： 绩优人力人数*6000*19%+钻石人力人数*3000*18%+标准人力人数*2000*18%

    self.initial_commission = ko.computed(function () {
        var commission = self.caifu_premium() * 0.06 + self.yingyue_premium() * 0.12 +
                self.shuangfu_premium() * 0.55 + self.shuangzhi_premium() * 0.26 +
                self.other_premium() * 0.22;
        var commission = commission || 0;
        return commission;
    }, this);


    self.increasing_num_bonus = ko.computed(function () {
        var bonus = self.outstanding_increasing_num() * 6000 * 0.19 +
                self.diamonds_increasing_num() * 3000 * 0.18 +
                self.standard_increasing_num() * 2000 * 0.18;
        var bonus = bonus || 0;
        return bonus;
    }, this);


}

function Group() {
    var self = this;
    self.human_resource = ko.observable(0);                 //小组规划人力
    self.outstanding_human_resource = ko.observable(0);     //绩优人力
    self.diamonds_human_resource = ko.observable(0);        //钻石人力
    self.standard_human_resource = ko.observable(0);        //标准人力

    self.initial_commission = ko.observable(0);             //个人情况中的初佣

    self.direct_group_num = ko.observable(0);               //直接小组数，历史数据获得
    self.indirect_group_num = ko.observable(0);             //间接小组数，历史数据获得

    self.history_num_1 = ko.observable(0);               //历史数据1
    self.history_num_2 = ko.observable(0);               //历史数据2
    self.history_num_3 = ko.observable(0);               //历史数据3
    self.history_num_4 = ko.observable(0);               //历史数据4

//------------TODO-----------------------
    self.level_coefficient = ko.observable(1);          //对应分档系数（见管理津贴分档系数表）

//-------------- 以下为计算得出，非输入-----------------
    self.human_resource = ko.computed(function () {
        var num = self.outstanding_human_resource() + self.diamonds_human_resource() + self.standard_human_resource();
        num = num || 0;
        return num;
    }, this);

    self.manage_allowance = ko.observable(0);   //小组总FYC*对应分档系数（见管理津贴分档系数表）*115% 
    self.educate_benefits = ko.observable(0);   //育成利益
    self.FYC_group = ko.observable(0);          //小组总FYC : 组情况中的（绩优人力人数*6000+钻石人力人数*3000+标准人力人数*2000）+个人情况中的初佣


    self.FYC_group = ko.computed(function () {
        var FYC = self.outstanding_human_resource() * 6000 +
                self.diamonds_human_resource() * 3000 +
                self.standard_human_resource() * 2000 +
                self.initial_commission();

        FYC = FYC || 0;
        return FYC;
    }, this);


//------------------ TODO ------------------------------
    self.manage_allowance = ko.computed(function () {
        //TODO
//        self.FYC_group() * 对应分档系数（见管理津贴分档系数表）* 1.15;
        var allowance = self.FYC_group() * self.level_coefficient() * 1.15;
        allowance = allowance || 0;
        return allowance;
    }, this);

//------------------------------------------------------



    self.educate_benefits = ko.computed(function () {
        var benefits = self.direct_group_num() * self.history_num_1() +
                self.indirect_group_num() * self.history_num_2();

        benefits = benefits || 0;
        return benefits;
    }, this);
}


function Part() {
    var self = this;
    self.human_resource = ko.observable(0);                 //部门规划人力
    self.outstanding_human_resource = ko.observable(0);     //绩优人力
    self.diamonds_human_resource = ko.observable(0);        //钻石人力
    self.standard_human_resource = ko.observable(0);        //标准人力

    self.initial_commission = ko.observable(0);             //个人情况中的初佣

    self.human_resource = ko.computed(function () {
        var num = self.outstanding_human_resource() + self.diamonds_human_resource() + self.standard_human_resource();
        num = num || 0;
        return num;
    }, this);

    self.manager_allowance = ko.observable(0);              //经理津贴：部门总FYC*对应分档系数（见经理津贴分档系数表）*110%
    self.increasing_part_benefits = ko.observable(0);       //增部利益：下辖部数量*历史数据3
    self.director_benefits = ko.observable(0);              //如业务人员为总监职级，则参考历史数据4，提高20%
    self.FYC_part = ko.observable(0);                       //部门总FYC=部情况中的（绩优人力人数*6000+钻石人力人数*3000+标准人力人数*2000）+个人情况中初佣

    self.level_coefficient = ko.observable(1);              //对应分档系数（见经理津贴分档系数表）

    self.history_num_3 = ko.observable(0);                  //历史数据3
    self.history_num_4 = ko.observable(0);                  //历史数据4

    self.subordinate_part_num = ko.observable(0);           //下辖部数量，通过数据库提供历史数据

    self.FYC_part = ko.computed(function () {
        var FYC = self.outstanding_human_resource() * 6000 +
                self.diamonds_human_resource() * 3000 +
                self.standard_human_resource() * 2000 +
                self.initial_commission();

        FYC = FYC || 0;
        return FYC;
    }, this);

//------------------ TODO ------------------------------
    self.manager_allowance = ko.computed(function () {
        //TODO
//        self.FYC_part() * 部门总FYC*对应分档系数（见经理津贴分档系数表）*110%
        var allowance = self.FYC_part() * self.level_coefficient() * 1.10;
        allowance = allowance || 0;
        return allowance;
    }, this);

//------------------------------------------------------


    self.increasing_part_benefits = ko.computed(function () {
        var benefits = self.subordinate_part_num() * self.history_num_3();
        benefits = benefits || 0;
        return benefits;
    }, this);

    self.director_benefits = ko.computed(function () {
        var benefits = self.history_num_4() * 1.20;
        benefits = benefits || 0;
        return benefits;
    }, this);

}

