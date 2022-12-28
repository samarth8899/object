img="";
status="";
objects=[];
function preload()
{
    img=loadImage("dog_cat.jpg")
}
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}


    objectdetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status:detecting objects";



function modelloaded()
    {
        console.log("model is loaded");
        status=true;
    }
function draw()
{
    image(video,0,0,380,380);
    if(status!="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetector.detect(video,gotresults);
        for(var i=0; i<objects.length; i++)
        {
    
            document.getElementById("status").innerHTML="status:obejects detected";
            document.getElementById("number_of_objects").innerHTML="number of objects detected are: "+objects.length;
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+ " "+ percent + "%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width+15,objects[i].height+15)
        }
    }
}
function gotresults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {

        console.log(results);
        objects=results;
    }
    
}