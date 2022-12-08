let collectionContainer = document.getElementById("collectionContainer");
let storedCollection = JSON.parse(localStorage.getItem("myCollection"));

function showCollection(){
    for (let i = 0; i < storedCollection.length; i++) {
        let item = storedCollection[i].data;
        let img = storedCollection[i].links
        collectionContainer.innerHTML += `
        <div class="col me-2"> 
        <div class="card text-light shadow-sm p-0 mb-3 bg-dark rounded"  style="width: 20rem; height: 20rem;">
            <div>  
              <img src="${img[0].href}" class="card-img-top" alt="${item[0].title}" data-index="${i}">
            </div>   
          <div class="card-body overflow-auto card-text">
              <h5 class="card-title">${item[0].title}</h5>
          </div>
          <div class="card-footer text-muted m-0 pb-0">
              ${item[0].date_created}</p>
            </div>
         </div>
      </div>  
        ` 
    }
}

document.addEventListener("DOMContentLoaded", showCollection);