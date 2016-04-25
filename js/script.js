nv.addGraph(function() {
  var ntaChart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })    //Specify the data accessors.
      .y(function(d) { return d.value })
      .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
      .tooltips(false)        //Don't show tooltips
      .showValues(true)       //...instead, show the bar value right on top of each bar.
      // .transitionDuration(350)
      ;

  d3.select('#ntaChart svg')
      .datum(exampleData())
      .call(ntaChart);

  nv.utils.windowResize(ntaChart.update);

  return ntaChart;
});

  

  // var ntaChartData = [];
  // ntaChartData[0]={};

  // var ntaChart;
  // // var elaChart;

  // // var elaChartData = [];
  // // elaChartData[0]={};

  //    function updateChart(f){
       
  //       ntaChartData[0].key = "test";
  //       ntaChartData[0].values = 
  //         [
  //           { 
  //             "label" : "1" ,
  //             "value" : f._math1
  //           } , 
  //           { 
  //             "label" : "2" , 
  //             "value" : f._math2
  //           } , 
  //           { 
  //             "label" : "3" , 
  //             "value" : f._math3
  //           } , 
  //           { 
  //             "label" : "4" , 
  //             "value" : f._math4
  //           } 
  //         ]
        
  //       // elaChartData[0].key = "test";
  //       // elaChartData[0].values = 
  //       //   [
  //       //     { 
  //       //       "label" : "1" ,
  //       //       "value" : f._ela1
  //       //     } , 
  //       //     { 
  //       //       "label" : "2" , 
  //       //       "value" : f._ela2
  //       //     } , 
  //       //     { 
  //       //       "label" : "3" , 
  //       //       "value" : f._ela3
  //       //     } , 
  //       //     { 
  //       //       "label" : "4" , 
  //       //       "value" : f._ela4
  //       //     } 
  //       //   ]

  //      d3.select('#ntaChart svg')
  //     .datum(ntaChartData)
  //     .transition().duration(500)
  //     .call(ntaChart);

  //     // d3.select('#elaChart svg')
  //     // .datum(elaChartData)
  //     // .transition().duration(500)
  //     // .call(elaChart);

  //     }

//Each bar represents a single discrete quantity.
function exampleData() {
 return  [ 
    {
      key: "Cumulative Return",
      values: [
        { 
          "label" : "Top" ,
          "value" : -29.765957771107
        } , 
        { 
          "label" : "Second" , 
          "value" : 0
        } , 
        { 
          "label" : "Third" , 
          "value" : 32.807804682612
        } , 
        { 
          "label" : "Fourth" , 
          "value" : 196.45946739256
        } , 
        { 
          "label" : "Fifth" ,
          "value" : 0.19434030906893
        } 
      ]
    }
  ]

}