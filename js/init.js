async function getData(url){
    try{
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(error)
    }
  }

//Stores data to display at more_info.html 
function moreInfo(index) {
  let data = JSON.stringify(searchData[index]);
  localStorage.setItem("more_info", data);
  window.location = 'more_info.html';
};

function checkExtension(filePaths){
  let htmlContent = "";

  for (let i = 0; i < filePaths.length; i++) {
    let path = filePaths[i];
    if (path.includes("mp4")){
      htmlContent = `
    <div class="ratio ratio-16x9">
      <video controls>
      <source src="${path}" type="video/mp4">
      Your browser does not support the video tag.
      </video>
    </div>
   `
    } 
    if (path.includes("jpg")){
      htmlContent = `<img src="${path}" class="img-fluid shadow-sm p-0 mb-3 border border-light bg-dark rounded more-info-img" alt="Image">`
    }
    if (path.includes("youtube")){
      htmlContent = `<div class="ratio ratio-4x3"><iframe src="${path}"></iframe></div>`
    } else if (path == undefined) {
      htmlContent = `<div class="text-light desc-text text-center m-4">Multimedia resource not available</div>`
    }
  } return htmlContent;
}