    var productNameInput = document.getElementById("productNameInput");
    var productPriceInput = document.getElementById("productPriceInput");
    var productCategoryInput = document.getElementById("productCategoryInput");
    var productDescInput = document.getElementById("productDescInput");
    var productImage = document.getElementById("productImage");
    var imagePreview = document.getElementById('imagePreview');
    var addBtn = document.getElementById("addBtn");
    var searchInput = document.getElementById("searchInput");
    var productNameAlert = document.getElementById("productNameAlert");
    var productPriceAlert = document.getElementById("productPriceAlert");
    var productCategoryAlert =document.getElementById("productCategoryAlert");
    var productDescAlert = document.getElementById("productDescAlert");
    var productImageAlert = document.getElementById("productImageAlert")
    var arrProduct = JSON.parse(localStorage.getItem("arrProduct")) ?? [];
    display();
    var updateMood = false;
    var maineIndex ;
    
addBtn.addEventListener("click", function () {
    addProduct()
})
document.addEventListener("keypress", function(event) {
  if (event.key === "Enter" && validation()) {
        event.preventDefault();
        addProduct();
    }
});

function addProduct(){
    productValidate()
    if (validation()  ) {
        if (!updateMood) {
        arrProduct.push( getProduct());
        }else{
            update(getProduct());
        }
            change();
            clear();
        }  
    }

function display() {
    var searchTerm = searchInput.value.toLowerCase();
    var stack=""
    for (var i = 0; i < arrProduct.length; i++) {
        if (arrProduct[i].name.toLowerCase().includes(searchTerm) ||
            arrProduct[i].price.toString().includes(searchTerm) ||
            arrProduct[i].category.toLowerCase().includes(searchTerm) ||
            arrProduct[i].desc.toLowerCase().includes(searchTerm)) {
        stack  +=   `<tr>
            <td> ${i} </td>
            <td>${arrProduct[i].name}</td>
            <td>${arrProduct[i].price}</td>
            <td>${arrProduct[i].category}</td>
            <td>${arrProduct[i].desc}</td>
            <td class="image"><img src="${arrProduct[i].image}" alt="productImage" style="max-width: 100px;"></td>
            <td><button onclick="semiUpdate(${i})"  class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
            </tr>`
    }}
document.getElementById("tableBody").innerHTML= stack;
}
        function clear() {
            productNameInput.value ="";
            productPriceInput.value ="";
            productCategoryInput.value="";
            productDescInput.value="";
            productImage.value ="";
            clearErrors()
        }
        function change() {
            localStorage.setItem("arrProduct",JSON.stringify(arrProduct))
            display();
        }
        function deleteProduct(index) {
            arrProduct.splice(index,1)
            change()
            clear()
            addBtn.innerHTML="Add Product";
            updateMood =false;
        }
        function semiUpdate(index) {
            clearErrors()
            updateMood=true
            maineIndex =index;
            addBtn.innerHTML="Update";
            productNameInput.value = arrProduct[index].name
            productPriceInput.value =  arrProduct[index].price
            productCategoryInput.value =  arrProduct[index].category
            productDescInput.value =  arrProduct[index].desc
            productImage.value = arrProduct[index].image;
            
        }
        function clearErrors() {
            productNameAlert.classList.add("d-none");
            productPriceAlert.classList.add("d-none");
            productCategoryAlert.classList.add("d-none");
            productDescAlert.classList.add("d-none");
            productImageAlert.classList.add("d-none");
        }
        function update(Product) {
            arrProduct.splice(maineIndex,1,Product)
            // arrProduct[maineIndex]= Product;
            addBtn.innerHTML="Add Product";
            updateMood =false;
        }
        function getProduct() {
            var Product ={
            name : productNameInput.value,
            price : productPriceInput.value,
            category : productCategoryInput.value,
            desc : productDescInput.value,
            image: productImage.files.length > 0 ? imagePreview.src : arrProduct[maineIndex].image,
        }
        return Product;
        }
    function validation() {
        return /^[A-Z][\w ]{2,19}$/.test(productNameInput.value)
        &&/^[1-9][0-9]*$/.test(productPriceInput.value) 
        && productCategoryInput.value !== ""
        && productDescInput.value !== ""
        && productImage.value !== ""
    }

    function productValidate() {
    if (/^[A-Z][\w ]{2,19}$/.test(productNameInput.value)) {
        productNameAlert.classList.add("d-none")
    }else{
        productNameAlert.classList.remove("d-none")
    }
    if (/^[1-9][0-9]*$/.test(productPriceInput.value)) {
        productPriceAlert.classList.add("d-none")
    }else{
        productPriceAlert.classList.remove("d-none")
    }
    if (productCategoryInput.value !=="") {
        productCategoryAlert.classList.add("d-none")
    }else{
        productCategoryAlert.classList.remove("d-none")
    }
    if (productDescInput.value !=="") {
        productDescAlert.classList.add("d-none")
    }else{
        productDescAlert.classList.remove("d-none")
    }
    if (productImage.value !=="") {
        productImageAlert.classList.add("d-none")
    }else{
        productImageAlert.classList.remove("d-none")
    }
}
productImage.addEventListener('change', function () {
    imagePreview.src = window.URL.createObjectURL(this.files[0]); 
});