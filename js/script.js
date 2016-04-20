var map;
  var baseAPI = 'https://cwhong.cartodb.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM nycelementaryschoolscoresandzones WHERE cartodb_id = '

  var layerGroup = new L.LayerGroup();

  var mathChartData = [];
  mathChartData[0]={};

  var elaChartData = [];
  elaChartData[0]={};

  var mathChart, elaChart;

  function init(){
    // initiate leaflet map
    map = new L.Map('map', { 
      center: [40.7,-73.92],
      zoom: 11
    })
    L.tileLayer('https://dnv9my2eseobd.cloudfront.net/v3/cartodb.map-4xtxp73f/{z}/{x}/{y}.png', {
      attribution: 'Mapbox <a href="http://mapbox.com/about/maps" target="_blank">Terms &amp; Feedback</a>'
    }).addTo(map);
    var layerUrl = 'http://cwhong.cartodb.com/api/v2/viz/79590982-d725-11e4-9ae9-0e9d821ea90d/viz.json';
    var sublayers = [];




    var currentHover, newFeature = null;
    cartodb.createLayer(map, layerUrl)
      .addTo(map)
      .on('done', function(layer) {
        
        console.log("done");

        layer.getSubLayer(0).setInteraction(true);
        layer.on('featureOver', function(ev, pos, latlng, data){
          console.log("featureover");
          //check to see if it's the same feature so we don't waste an API call
          if(data.cartodb_id != currentHover) {
            layerGroup.clearLayers();
          
            $.getJSON(baseAPI + data.cartodb_id, function(res) {
          
              newFeature = L.geoJson(res,{
                style: {
                  "color": "#DCFF2E",
                  "weight": 5,
                  "opacity": 1
                }
              });
              layerGroup.addLayer(newFeature);
              layerGroup.addTo(map);
              updateSidebar(res.features[0].properties);
              updateChart(res.features[0].properties)

            })
            currentHover = data.cartodb_id;
          }
        })
        .on('featureOut', function(){
          layerGroup.clearLayers();
        })

        // // change the query for the first layer
        // var subLayerOptions = {
        //   sql: "SELECT * FROM ne_10m_populated_places_simple",
        //   cartocss: "#ne_10m_populated_places_simple{marker-fill: #F84F40; marker-width: 8; marker-line-color: white; marker-line-width: 2; marker-clip: false; marker-allow-overlap: true;}"
        // }
        // var sublayer = layer.getSubLayer(0);
        // sublayer.set(subLayerOptions);
        // sublayers.push(sublayer);

        $('#mathButton').click(function(){
          layer.getSubLayer(0).show();
          layer.getSubLayer(1).hide();
          $('.button').removeClass('selected');
          $(this).addClass('selected');
        });

        $('#elaButton').click(function(){
          layer.getSubLayer(0).hide();
          layer.getSubLayer(1).show();
          $('.button').removeClass('selected');
          $(this).addClass('selected');
        });


      })
      .on('error', function() {
        //log the error
      });
      }

      //from http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
      // String.prototype.toProperCase = function () {
      //   return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      // };

      function updateSidebar(f) {

        //first check if there is data
        if (f._school_na == null) {
          $('.noData').show();
          $('.mainSidebar').hide();
        } else { 
          $('.noData').hide();
          $('.mainSidebar').show();
        }


        $('.schoolName').text(function(){
          return f._school_na == null ? "N/A" : f._school_na;
        });

        $('#studentsTested').text(function(){
          return f._mathteste + "/" + f._elatested;      
        });

        $('.mathMean').text(roundToTenth(f._mathmean));
        $('.elaMean').text(roundToTenth(f._elamean));
      }

      function roundToTenth(num) {
        return Math.round( num * 10) / 10
      }

      function updateChart(f){
       
        mathChartData[0].key = "test";
        mathChartData[0].values = 
          [
            { 
              "label" : "1" ,
              "value" : f._math1
            } , 
            { 
              "label" : "2" , 
              "value" : f._math2
            } , 
            { 
              "label" : "3" , 
              "value" : f._math3
            } , 
            { 
              "label" : "4" , 
              "value" : f._math4
            } 
          ]
        
        elaChartData[0].key = "test";
        elaChartData[0].values = 
          [
            { 
              "label" : "1" ,
              "value" : f._ela1
            } , 
            { 
              "label" : "2" , 
              "value" : f._ela2
            } , 
            { 
              "label" : "3" , 
              "value" : f._ela3
            } , 
            { 
              "label" : "4" , 
              "value" : f._ela4
            } 
          ]

       d3.select('#mathChart svg')
      .datum(mathChartData)
      .transition().duration(500)
      .call(mathChart);

      d3.select('#elaChart svg')
      .datum(elaChartData)
      .transition().duration(500)
      .call(elaChart);

      }

//chart stuff
nv.addGraph(function() {
  mathChart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })    //Specify the data accessors.
      .y(function(d) { return d.value })
      //.staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
      .tooltips(false)        //Don't show tooltips
      .showValues(true)       //...instead, show the bar value right on top of each bar.
      .valueFormat(function(d){
        return Math.round(d * 10) / 10 + "%";
      })
      .width(222)
      .showYAxis(false)
      .margin({left:0,right:0})
      .color(['rgb(215,25,28)','rgb(253,174,97)','rgb(166,217,106)','rgb(26,150,65)']);
      ;

      mathChart.xAxis
      .axisLabel('Math')

     

  // d3.select('#chart svg')
  //     .datum(exampleData)
  //     .transition().duration(500)
  //     .call(chart);

  nv.utils.windowResize( mathChart.update);

  return mathChart;
});
//chart stuff
nv.addGraph(function() {
  elaChart = nv.models.discreteBarChart()
      .x(function(d) { return d.label })    //Specify the data accessors.
      .y(function(d) { return d.value })
      //.staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
      .tooltips(false)        //Don't show tooltips
      .showValues(true)       //...instead, show the bar value right on top of each bar.
      .valueFormat(function(d){
        return Math.round(d * 10) / 10 + "%";
      })
      .width(222)
      .showYAxis(false)
     
      .margin({left:0,right:0})
      .color(['rgb(215,25,28)','rgb(253,174,97)','rgb(166,217,106)','rgb(26,150,65)']);
      ;

      elaChart.xAxis
      .axisLabel('English Language Arts')

      

  // d3.select('#chart svg')
  //     .datum(exampleData)
  //     .transition().duration(500)
  //     .call(chart);

  nv.utils.windowResize( elaChart.update);

  return elaChart;
});

//Each bar represents a single discrete quantity.
function exampleData() {
 return  [ 
    {
      key: "Cumulative Return",
      values: [
        { 
          "label" : "1" ,
          "value" : 123
        } , 
        { 
          "label" : "2" , 
          "value" : 24
        } , 
        { 
          "label" : "3" , 
          "value" : 45
        } , 
        { 
          "label" : "4" , 
          "value" : 34
        } 
      ]
    }
  ]

}