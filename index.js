var productnameinput=document.getElementById("productname"); 
var productpriceinput=document.getElementById("productprice"); 
var productcategoryinput=document.getElementById("productcategory"); 
var productdescribtioninput=document.getElementById("productdescribtion"); 
var productimageinput=document.getElementById("productimage"); 
var productcontainerelement=document.getElementById("productcontainerelement");
var addproductbutton=document.getElementById("addproductbutton");
var updateproductbutton=document.getElementById("updateproductbutton");

var updatedproductindex;
var productlist=[]
if(localStorage.getItem("ourproducts")!=null){
    productlist =JSON.parse(localStorage.getItem("ourproducts"));
    console.log( productlist);
    displayproducts(productlist);
}

function deleteproduct(deletedindex){
productlist.splice(deletedindex,1);
localStorage.setItem("ourproducts",JSON.stringify(productlist))
displayproducts(productlist);

}
function searchbyproductname(term){

    var filteredproduct = [];

    for(var i=0;i<productlist.length;i++){
        if(productlist[i].productname.includes(term)==true){
 
            filteredproduct.push(productlist[i]);
            
        }
    }
    console.log(filteredproduct)
    displayproducts(filteredproduct)
}

 function addproduct(){
var product={
productname:productnameinput.value,
productprice:productpriceinput.value,
productcategory:productcategoryinput.value,
productdescription:productdescribtioninput.value,
productimage:productimageinput.files[0].name,



}
productlist.push(product)
localStorage.setItem("ourproducts",JSON.stringify(productlist));
displayproducts(productlist);
resetproductsinput()

 }

 function resetproductsinput(){
    productnameinput.value="";
productpriceinput.value="";
productcategoryinput.value=" choose ypur category";
productdescribtioninput.value="";
 }
 function displayproducts(arr) {
    var containerelement=``
for(var i=0; i<arr.length;i++ ){
    containerelement+=`<div  class="col">
      <div class="border shadow-sm p-2">
     <div class="productimage mb-5">   <img src="./images/${arr[i].productimage}" class="w-100 h-100 object-fit-contain" alt=""></div>
        <h3 class="fs-5">${arr[i].productname}</h3>
        <p class="fs-6 text-secondary">${arr[i].productdescription}</p>
        <p> <span class=" fw-bolder">category:</span>${arr[i].productcategory}</p>
     <div class="d-flex justify-content-between pe-3">
      <p class=" fw-bolder">${arr[i].productprice}</p>
<div ><i onclick="deleteproduct(${i})" class="fa-solid fa-trash-can text-danger fa-shake"></i>
  <i onclick="moveproductdetailstoinput(${i})" class="fa-solid fa-pen-to-square text-success"></i></div>
     </div>
      </div>
    </div>`

}
productcontainerelement.innerHTML=containerelement;
 }
function moveproductdetailstoinput(index){
    productnameinput.value=productlist[index].productname
    productpriceinput.value=productlist[index].productprice
    productcategoryinput.value=productlist[index].productcategory
    productdescribtioninput.value=productlist[index].productdescription
    addproductbutton.classList.replace('d-block','d-none')
    updateproductbutton.classList.replace('d-none','d-block');
    updatedproductindex=index;

   
}
function updateproducts(){
    productlist[updatedproductindex].productname=productnameinput.value;
    productlist[updatedproductindex].productprice=productpriceinput.value;
    productlist[updatedproductindex].productdescription=productdescribtioninput.value;
    productlist[updatedproductindex].productcategory=productcategoryinput.value;
    console.log(productimageinput.files);
    
    if(productimageinput!=undefined){
        productlist[updatedproductindex].productimage=productimageinput.files[0].name;
    }
    displayproducts(productlist);
    localStorage.setItem('ourproducts',JSON.stringify(productlist))
  resetproductsinput();

  addproductbutton.classList.replace('d-none','d-block')
  updateproductbutton.classList.replace('d-block','d-none');
}