let lana, c, ctx, classifier;
const CHART = document.getElementById('chart');
CHART.height = 300;

function setup(){
    let canvas = createCanvas (500,440);
    canvas.parent('canvasDiv');
    rawImage = document.getElementById('theImage', imageReady);
    lana = createImg("./default-image.jpg", imageReady);
    lana.hide();
    console.log("gonna load the mobilenet model");
    classifier = ml5.imageClassifier('MobileNet', modelLoaded);
 }

 
function modelLoaded() {
    console.log('Model Loaded!');
  }


function imageReady(){
     image (lana, 0, 0, width, height);

   
 }
 
function onUpload(){
    var file = document.getElementById('image-selector').files[0];
    var reader  = new FileReader();
    reader.onload = function(e)  {
        lana = createImg(e.target.result, imageReady);
       lana.hide();
       
     }
     reader.readAsDataURL(file);
  
}


function onPredict() {
    classifier.predict(lana, gotResults);

}


 function gotResults (error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        top3 = Array.from(results);
        console.log(top3);
        console.log(top3[0].label);
        var getLabels = _.pluck(top3, 'label');
        var getConfidence =  _.pluck(top3, 'confidence');
        
        for (var i=0; i<getConfidence.length; i++) {
            getConfidence[i] = (getConfidence[i]*100).toFixed(2);
        } 

        let barChart = new Chart(CHART, {
            type :'bar',
            data: {
                labels: getLabels,
                datasets: [
                {
                    label : 'Probability',
                    backgroundColor: ['red','#f5dcdc','#f1e588'],
                    data: getConfidence
                }
               ] 
            },
            options: {
                legend: { display: false },
                title: {
                  display: true,
                  text: 'Image Classification - MobileNet'
                }
              }
        }
        );
         
    }
}

   
