var imagesObject = [];
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
    // take snapshot and get image data
    Webcam.snap( function(data_uri) {
       // display results in page
       displayImgData(data_uri);
       addImage(data_uri)
     });
 }
 function addImage(imgData){
  imagesObject.push(imgData);
  displayNumberOfImgs();
  localStorage.setItem("images", JSON.stringify(imagesObject));
}

function displayImgData(imgData){
    var span = document.createElement('span');
    span.innerHTML = '<img class="thumb" src="' + imgData + '"/>';
    document.getElementById('list').insertBefore(span, null);
  }

function displayNumberOfImgs(){
  if(imagesObject.length > 0){

    document.getElementById("state").innerHTML = imagesObject.length + " image" + ((imagesObject.length > 1) ? "s" : "") + " stored in your browser";
    
    document.getElementById("deleteImgs").style.display = "inline";
    
  } else {
    document.getElementById("state").innerHTML = "No images stored in your browser.";
    document.getElementById("deleteImgs").style.display = "none";
  }
}

function deleteImages(){
  imagesObject = [];
  localStorage.removeItem("images");
  displayNumberOfImgs()
  document.getElementById('list').innerHTML = "";
}
document.getElementById('deleteImgs').addEventListener("click", deleteImages);
loadFromLocalStorage();