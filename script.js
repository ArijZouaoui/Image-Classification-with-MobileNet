let img, c, ctx, classifier;
const CHART = document.getElementById('chart');
CHART.height = 300;

function setup(){
    let canvas = createCanvas (500,440);
    canvas.parent('canvasDiv');
    img = createImg("./default-image.jpg", imageReady);
    img.hide();
    console.log("gonna load the mobilenet model");
    classifier = ml5.imageClassifier('MobileNet', modelLoaded);
 }

 
function modelLoaded() {
    console.log('Model Loaded!');
  }


function imageReady(){
     image (img, 0, 0, width, height);

   
 }
 
function onUpload(){
    var file = document.getElementById('image-selector').files[0];
    var reader  = new FileReader();
    reader.onload = function(e)  {
        img = createImg(e.target.result, imageReady);
       img.hide();
       
     }
     reader.readAsDataURL(file);
  
}


function onPredict() {
    classifier.predict(img, gotResults);

}


 function gotResults (error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        top3 = Array.from(results);
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
                    backgroundColor: ['#B0E0E6','#f5dcdc','#f1e588'],
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

   
