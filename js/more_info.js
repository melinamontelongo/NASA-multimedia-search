let dataArray = [];
let storedCollection = [];
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
          <button class="btn btn-dark" id="addBtn">Add to my collection</button>
      </div>
 `
  document.getElementById("moreInfo").innerHTML += htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", ()=> { 
  data = JSON.parse(localStorage.getItem("moreInfo"));
  getData(data.href).then(data => {
      dataArray = data;
      show();
      let addBtn = document.getElementById("addBtn")
      addBtn.addEventListener("click", ()=>{
        addToCollection()
        window.location = "my_collection.html"
      })
  }) 

});

function addToCollection(){
      let newItem = data
      if (localStorage.getItem("myCollection")){
        storedCollection = JSON.parse(localStorage.getItem("myCollection"))
      }
      storedCollection.push(newItem)
      localStorage.setItem("myCollection", JSON.stringify(storedCollection))
}