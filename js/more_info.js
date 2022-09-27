let dataArray = [];
let data;

function show() {

  let htmlContentToAppend = "";

  htmlContentToAppend += ` 

      <div class="col-12 text-center main-title mb-4">
          <h2>${data.data[0].title}</h2>
      </div>
      <div class="col-8">
          ${checkExtension(dataArray)}
      </div>
      <div class="col-4">
          <p>Date: ${data.data[0].date_created}</p>
          <p>NASA Center: ${data.data[0].center}</p>
          <p>Keywords: ${data.data[0].keywords}</p>
          <p>${data.data[0].description}</p>
      </div>
 `
  document.getElementById("moreInfo").innerHTML += htmlContentToAppend;
}

function checkExtension(filePathsArr){
  let htmlContent = "";

  for (let i = 0; i < filePathsArr.length; i++) {
    let path = filePathsArr[i];
    if (path.includes("mp4")){
      htmlContent = `
    <div class="ratio ratio-16x9">
      <video controls>
      <source src="${path}" type="video/mp4">
      Your browser does not support the video tag.
      </video>
    </div>
   `
   return htmlContent;
    } 
    else if (path.includes("jpg")){
      htmlContent = `<img src="${path}" class="img-fluid shadow-sm p-0 mb-3 border border-light bg-dark rounded more-info-img" alt="Image">`
      return htmlContent;
    }
  }
}


document.addEventListener("DOMContentLoaded", ()=> { 
  data = JSON.parse(localStorage.getItem("more_info"));
  getData(data.href).then(data => {
  
      dataArray = data;
      console.log(dataArray)
      show();
  }) 
});