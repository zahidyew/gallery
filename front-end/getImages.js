const mainElem = document.getElementById("main");
const rowElem = document.getElementsByClassName("row");
const columnElem = document.getElementsByClassName("column");
const searchElem = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const nextBtn = document.getElementById("nextBtn");

var tag = "cats";
var page = 1;
var perPage = 30;
var orientation = "landscape";

searchBtn.addEventListener("click", () => {
   searchNewImages();
});

nextBtn.addEventListener("click", () => {
   loadMoreImages();
});

fetchImages(tag, page, perPage, orientation)

function fetchImages(tag, page, perPage, orientation) {
   fetch(`http://localhost:5000/api/getPhotos?tag=${tag}&page=${page}&perPage=${perPage}&orientation=${orientation}`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   })
      .then((response) => response.json())
      .then((data) => {
         console.log('Success:', data);
         const size = Object.keys(data.results).length

         for (let i = 0; i < size; i++) {
            displayImages(data.results[i], i);
         }
      })
      .catch((error) => {
         console.error('Error:', error);
      });
}

function displayImages(data, i) {
   const imageElem = document.createElement("img");
   imageElem.src = data.urls.regular + "&h=480";

   columnElem[i].appendChild(imageElem);

   imageElem.addEventListener("click", () => {
      window.open(data.urls.full);
   })
}

function searchNewImages() {
   page = 1;

   if (searchElem.value == "") {
      alert("Search box is empty.");
   }
   else if (searchElem.value == tag) {
      // nothing to do if its same. Don't waste bandwidth.
   }
   else {
      tag = searchElem.value;

      clearImages();
      fetchImages(tag, page, perPage, orientation)
   }
}

function loadMoreImages() {
   page = page + 1;

   clearImages();
   fetchImages(tag, page, perPage, orientation)
}

function clearImages() {
   let x = document.getElementsByTagName("img");
   let size = x.length;

   for (let i = 0; i < size; i++) {
      x[0].remove();
   }
}

document.addEventListener('keyup', () => {
   // ENTER key is pressed
   if (event.keyCode === 13) {
      searchNewImages();
   }
});


/* document.addEventListener('scroll', function () {
   //var element = event.target;
   if (mainElem.scrollTop + mainElem.offsetHeight === mainElem.scrollHeight) {
      console.log('scrolled');
   }

   //node.scrollTop + node.offsetHeight === node.scrollHeight
   //elem[0].scrollHeight - elem.scrollTop() == elem.outerHeight()
}); */


/*function displayImages(data, i) {
   const imageElem = document.createElement("img");
   imageElem.src = data.urls.regular + "&h=480";

   if (i < 3) {
      columnElem[i].appendChild(imageElem);
   }
   else { // dynamically add new div by cloning the "row div"
      if (i % 3 == 0) {
         const cloneRowElem = rowElem[0].cloneNode(true);
      }
      let r = i % 3;
      columnElem[r].appendChild(imageElem);
   }

   imageElem.addEventListener("click", () => {
      window.open(data.urls.full);
   })
}*/

