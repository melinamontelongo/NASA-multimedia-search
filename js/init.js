async function getData(url){
    try{
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(error)
    }
  }