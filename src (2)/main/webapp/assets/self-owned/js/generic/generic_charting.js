var labelStyle = {
  //color: 'white',
  fontWeight: 'bold',
  fontSize: '12'
};
var gridSupportArray = ['bar', 'line', 'scatter','area'];


var ChartPOJO = ChartPOJO || {};

ChartPOJO = {

  generateGridChart: function(chart_div_id, chart_type, chart_title, show_split_line, x_Axis_data, series_name, series_data) {
    var option_chart = {};

    // 初始化 Title:
    var title = {
      show: true,
      x: 'left',
      padding: [0, 0, 0, 20],
      textStyle: labelStyle,
      text: chart_title || "Untitled",
    };
    option_chart.title = title;

    //初始化 tooltip:
    var tooltip = {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c})"
    };
    option_chart.tooltip = tooltip;

    // 初始化 legend:
    var legend = {
      orient: 'vertical',
      // orient:'horizontal',
      // left: 'center',
      left: 'right',
      top: 'top',
      padding: [0, 20, 0, 0],
      data: [],
      textStyle: labelStyle
    };
    option_chart.legend = legend;
    option_chart.legend.data.push(series_name);

    // 初始化 toolbox:
    var toolbox = {
      show: true,
      orient: 'horizontal',

    }

    // 初始化 grid、x & y Axis
    if (gridSupportArray.indexOf(chart_type) > -1) {
      option_chart.grid = {
        left: '10%',
        right: '10%',
        // top:'10%',
        // bottom:'10%'

      };
      // 初始化 X 坐标轴
      option_chart.xAxis = {
        axisLabel: {
          // interval: 0, // 强制显示所有标签
          // rotate: -45,
          textStyle: labelStyle,
        },
        axisLine: {
          lineStyle: {
            //color: '#fff'
          }
        },
        splitLine: {
          show: show_split_line
        },
        data: x_Axis_data
      };
      option_chart.yAxis = {
        axisLabel: {
          rotate: 45,
          textStyle: labelStyle,
        },
        axisLine: {
          lineStyle: {
            //color: '#fff'
          }
        },
        splitLine: {
          show: show_split_line
        },
      };
    }

    // 初始化 dataZoom:
    // 默认只初始 X data zoom,因为 Y zoom发现样式有一些问题，尝试调整没有太好解决方案
    // data zoom 支持 slider和inside
    option_chart.dataZoom = [{
        type: 'slider',
        orient: 'horizontal',
        left: 'center',
        textStyle: labelStyle,
        start: 0,
        end: 100
      }, {
        type: 'inside',
        orient: 'horizontal',
        textStyle: labelStyle,
        start: 0,
        end: 100
      }
      // ,{
      //   type: 'slider',
      //   orient: 'vertical',
      //   // left: '95%',
      //   textStyle: labelStyle,
      //   start: 0,
      //   end: 100
      // }, {
      //   type: 'inside',
      //   orient: 'vertical',
      //   textStyle: labelStyle,
      //   start: 0,
      //   end: 100
      // }
    ];

    option_chart.series = [];
    var series_object = {
      name: series_name,
      type: chart_type,
      // stack: 'server',
      itemStyle: {
        normal: {
          //color: '#aa10c9',
        }
      },
      data: series_data
    };
    if(chart_type==='area'){
      // area acutal is a line chart and has area style fill
      series_object.areaStyle={normal: {}};
      series_object.type = 'line';
    }
    option_chart.series.push(series_object);

    var chart = echarts.init(document.getElementById(chart_div_id));



    // 使用刚指定的配置项和数据显示图表。
    chart.setOption(option_chart);
    return chart;
  },


  addSeries: function(chart, series_name, series_type, series_data) {
    var option = chart.getOption();

    var series_object = {
      name: series_name,
      type: series_type,
      data: series_data
    };
    if(series_type==='area'){
      // area acutal is a line chart and has area style fill
      series_object.areaStyle={normal: {}};
      series_object.type = 'line';
    }
    option.series.push(series_object);
    option.legend[0].data.push(series_name);

    chart.setOption(option);


    return chart;
  },

  removeSeries: function(chart, series_name) {
    var option = ClonePOJO.deepClone(chart.getOption());

    var tmp_series = [];
    var tmp_legends = [];
    $.each(option.series, function(index, series_object) {
      if (!(series_object && series_object.name == series_name)) {
        tmp_series.push(series_object);
      }
    });

    $.each(option.legend[0].data, function(index, legend_object) {

      if (!(legend_object && legend_object == series_name)) {
        tmp_legends.push(legend_object);
      }
    })
    option.series = tmp_series;
    option.legend[0].data = tmp_legends;

    chart.clear();

    chart.setOption(option);

    return chart;
  }
}
