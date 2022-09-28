const IMAGES_URL = "https://images-api.nasa.gov/search?q=";
const APOD_URL = "https://api.nasa.gov/planetary/apod?api_key=iJ06LyjQvV4NQ9JoplcVlqdHOqWBSodZ9ceuIPAa";

let searchData = [];
let apodBtn = document.getElementById("btnApod");
let searchBtn = document.getElementById("btnBuscar");
let dataContainer = document.getElementById("contenedor");

//Shows data from Images and Video NASA API
function showData() {
  let contentToAppend = "";
  for (i = 0; i < searchData.length; i++) {
    let data = searchData[i];
    if (data.links != undefined) {
      contentToAppend += `
    <div class="col me-2"> 
      <div class="card text-light shadow-sm p-0 mb-3 bg-dark rounded" style="width: 20rem; height: 20rem;">
          <div>  
            <img onclick="moreInfo('${i}')" src="${data.links[0].href}" class="card-img-top" alt="${data.data[0].title}">
          </div>   
        <div class="card-body overflow-auto card-text">
            <h5 class="card-title">${data.data[0].title}</h5>
            <p class="card-text">${data.data[0].description}
        </div>
        <div class="card-footer text-muted m-0 pb-0">
            ${data.data[0].date_created}</p>
          </div>
       </div>
    </div>  
      `
    }
  }
  dataContainer.innerHTML = contentToAppend;
}

//Stores data to display at more_info.html 
function moreInfo(index) {
  let data = JSON.stringify(searchData[index]);
  localStorage.setItem("more_info", data);
  window.location = 'more_info.html';
};

//Returns the html content depending on source of image/video
function apod(data){
  let htmlContent = "";
  if (data.includes("jpg")){
    htmlContent = `<img id="apod" class="img-fluid" src="${data}" alt="Astronomy Picture of the Day">`
  }
  if (data.includes("mp4")){
    htmlContent = `  <div class="ratio ratio-4x3">
    <video controls>
    <source src="${data}" type="video/mp4">
    Your browser does not support the video tag.
    </video>
  </div>`
  }
  if (data.includes("youtube")){
    htmlContent = `<div class="ratio ratio-4x3"><iframe src="${data}"></iframe></div>`
  } else if (data == undefined){
    htmlContent = `<div class="text-light desc-text text-center m-4">Multimedia resource not available</div>`
  }
  return htmlContent;
}

//Adds following listeners when document is loaded
document.addEventListener("DOMContentLoaded", ()=> {

  //To search NASA images and videos (Images and Video Library API)
  searchBtn.addEventListener("click", ()=> {
    let searchQuery = document.getElementById("inputBuscar").value;
    if (searchQuery !== ""){
      getData(IMAGES_URL + searchQuery).then(data => {
      searchData = data.collection.items;
      showData();
      document.getElementById("inputBuscar").value = "";
    })

  }
});

  //To see Astronomy Picture of the Day (APOD API)
  apodBtn.addEventListener("click", ()=> 
      getData(APOD_URL).then(data => {
        dataContainer.innerHTML = `
          <div class="col-12 text-center text-light main-title mb-4">
            <h2>Astronomy Picture of the Day</h2>
            <p><strong>${data.date}</strong></p>
          </div>
          <div class="col-lg-6 shadow-sm p-0 mb-3 border border-light bg-dark rounded">
            ${apod(data.url)}
          </div>
          <div class="col-lg-6 text-light desc-text">
            <h5>${data.title}</h5>
            <p>${data.explanation}</p>
          </div>
        `;
    }))
});



