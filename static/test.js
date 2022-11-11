function configure(){
    Webcam.set(
      {
      
        width:500,
        height:450,
        dest_width: 500,
        dest_height: 450,
        image_format :'jpeg',
        jpeg_quality : 90
    })

    Webcam.attach("#my_camera");
}

function take_snapshot() {
    // play sound effect
    shutter.play();
 
    // take snapshot and get image data
    Webcam.snap( function(data_uri) {
       // display results in page
       document.getElementById('list').innerHTML = 
           '<img src="'+data_uri+'"/>';
     });
 }

function displayImgData(imgData){
    var span = document.createElement('span');
    span.innerHTML = '<img class="thumb" src="' + imgData + '"/>';
    document.getElementById('list').insertBefore(span, null);
  }