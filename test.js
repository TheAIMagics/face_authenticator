let base64image;
let showSnippet = document.getElementById("showSnippet")
const fileUploadLimit = 1048576; // 1MB in bytes. Formula: 1MB = 1 * 1024 * 1024.
const localStorageKey = "images";
let imageData = [];

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



  // Add image to local storage.
function addImage(imageObj) {
    imageData.push(imageObj);
   
    localStorage.setItem(localStorageKey, JSON.stringify(imageData));
  }


  // Remove image from local storage by timestamp.
function removeImage(timestamp) {
    // Remove item by the timestamp.
    imageData = imageData.filter(img => img.timestamp !== timestamp);
  
    // Update local storage.
    localStorage.setItem(localStorageKey, JSON.stringify(imageData));
  }

  // Read image data stored in local storage.
function getImages() {
  const localStorageData = localStorage.getItem(localStorageKey);

  if (localStorageData !== null) {
    imageData = JSON.parse(localStorage.getItem(localStorageKey))

    console.log(imageData)

    for (let i = 0; i < imageData.length; i++) {
      renderImage(imageData[i]);
    }
  }
}

  function renderImage(imageObj) {
    if (imageObj.file_base64.length) {
      el = document.createElement('li');
      el.innerHTML = "<li><img src=\"" + imageObj.file_base64 + "\"  width=\"200\" /><br />" + "<br /><a href=\"#\" data-timestamp=\"" + imageObj.timestamp + "\" class=\"btn-delete\">Remove</a></li>"
      document.getElementById('image-collection').appendChild(el);
    }
  }

function take_snapshot() {
  document.getElementById('my_camera').classList.toggle("effect");
  //showSnippet.style.display = 'block'
  setTimeout(()=>  document.getElementById('my_camera').classList.toggle("effect"),400);
    // take snapshot and get image data
    Webcam.snap( function(data_uri) {
        // display results in page
       console.log(document.getElementById('image-collection').getElementsByTagName("li").length)
         let imageObj = {
            name: "image-" + (document.getElementById('image-collection').getElementsByTagName("li").length+1),
            timestamp: Date.now(),
            file_base64: data_uri.toString()
          };
          addImage(imageObj);
          renderImage(imageObj);
     } );
 }

 document.getElementById("showSnippet").addEventListener("click", ()=>{
  showSnippet.style.display = 'none'
  getImages();
 });

 function removeImage(timestamp) {
  // Remove item by the timestamp.
  imageData = imageData.filter(img => img.timestamp !== timestamp);

  // Update local storage.
  localStorage.setItem(localStorageKey, JSON.stringify(imageData));
}

 function deleteImageAction() {
  $(".btn-delete").on("click", function(e) {
    e.preventDefault();

    removeImage($(this).data("timestamp"));

    // Remove the HTML markup for this image.
    $(this).parent().remove();
  })
}

  document.addEventListener("DOMContentLoaded", () => {
    getImages();
    deleteImageAction();
    localStorage.clear();
  });

/*<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='/webcam.css') }}">
    <style>
#image-collection li {
  float: left;
  display: block;
  margin: 5px;
}
    </style>
</head>
<body onload="configure();">

    <div class="camera">
        <div id="my_camera" >

        </div>
        <div class="camera-button" >
            <ion-icon name="camera-outline" onClick="take_snapshot()" ></ion-icon>
        </div>
    </div>



    <div class="container">
   
        <div id="results" >

        </div>

        <ul id="image-collection">
        </ul>
    
        <br>
        
        <button type="button" id="showSnippet" >Show Snippet</button>
    </div>
    

    <script type="text/javascript" src="../static/assets/webcam.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" ></script>
    <script type="text/javascript" src="../static/webcam.js"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
</body>
</html>*/