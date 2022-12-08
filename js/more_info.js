let storedCollection = [];

let infoData, fullSizeImg, thumbnailImg;

function showData(data, img) {
  let htmlContentToAppend = "";
  htmlContentToAppend += ` 
      <div class="col-12 text-center main-title mb-4">
          <h2>${data.data[0].title}</h2>
      </div>
      <div class="col-md-8">
      <img src="${img[0]}" class="img-fluid more-info-img" alt="${data.data[0].title}">
      </div>
      <div class="col-md-4">
          <p>Date: ${data.data[0].date_created}</p>
          <p>NASA Center: ${data.data[0].center}</p>
          <p>Keywords: ${data.data[0].keywords}</p>
          <p>${data.data[0].description}</p>
          <button class="btn btn-dark" id="addBtn">Add to my collection</button>
      </div>
 `
  document.getElementById("moreInfo").innerHTML += htmlContentToAppend;
}

 function addToCollection(){
  let newItem = infoData;
  if (localStorage.getItem("myCollection")){
    storedCollection = JSON.parse(localStorage.getItem("myCollection"))
  }
  storedCollection.push(newItem);
  localStorage.setItem("myCollection", JSON.stringify(storedCollection));
} 

document.addEventListener("DOMContentLoaded", ()=> { 
  let nasaID = JSON.parse(localStorage.getItem("nasaID"));
  getData(IMAGES_URL + nasaID).then(data => {
      infoData = data.collection.items[0];
      let imgData = infoData.href;
      getData(imgData).then(data =>{
        imgData = data
        console.log(infoData, imgData)
        showData(infoData, imgData);
        let addBtn = document.getElementById("addBtn")
        addBtn.addEventListener("click", ()=>{
          addToCollection();
          window.location = "my_collection.html"
        }) 
      })
  }) 

});

