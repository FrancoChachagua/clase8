//Form uno (POST)
const $divPost = document.querySelector('#formPost')
const $formOne = document.querySelector('#addProducts')
const $fileOne = document.querySelector('#file')
const $viewsOne = document.getElementById('views')
const $imageOne = document.querySelector('#viewImage')
//Form dos (PUT)
const $divUpdate = document.querySelector('#formUpdate')
const $formDos = document.querySelector('#updateProducts')
const $fileTwo = document.querySelector('#fileTwo')
const $viewsTwo = document.getElementById('viewsTwo')
const $imageTwo = document.querySelector('#viewImageTwo')
//Form tres (DELETE)
const $divDelete = document.querySelector('#formDelete')
const $formThree = document.querySelector('#deleteProducts')
const $viewsThree = document.getElementById('viewsThree')
const $imageThree = document.querySelector('#viewThreeIdParams')
//Form cuatro (GET)
const $divRead = document.querySelector('#formGet')
const $formFour = document.querySelector('#showProducts')
const $viewsFour = document.getElementById('viewsFour')
const $imageFour = document.querySelector('#viewFourIdParams')
//Button (GET)
const $btnGetAll = document.querySelector('#showAllProducts')

// Añadiendo clases para ocultar estos divs
$viewsOne.classList.add('visibilityHidden');
$viewsTwo.classList.add('visibilityHidden');
$viewsThree.classList.add('visibilityHidden');
$viewsFour.classList.add('visibilityHidden');

function renderImage(formData, img) {
    const fileImg = formData.get('image');
    const image = URL.createObjectURL(fileImg);
    img.setAttribute('src', image)
}

// POST 

$fileOne.addEventListener('change', (e)=>{
    e.preventDefault();
    $viewsOne.classList.remove('visibilityHidden');
    const formData = new FormData($formOne);
    renderImage(formData, $imageOne);
})

$divPost.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData($formOne);
    fetch('http://localhost:8080/api/productos',{
        method:'POST',
        body:formData,
    })
    .then(alert(`Usted ha añadido un nuevo producto!`))
    .then(result =>{
        return result.json();
    }).then(json=>{
        console.log(json);
    })
})


//PUT

$fileTwo.addEventListener('change', (e)=>{
    e.preventDefault();
    $viewsTwo.classList.remove('visibilityHidden');
    const formData = new FormData($formDos);
    renderImage(formData,$imageTwo);
})

$divUpdate.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData($formDos);
    let paramsId = formData.get('paramsId');
    formData.delete('paramsId');
    fetch(`http://localhost:8080/api/productos/${paramsId}`,{
        method:'PUT',
        body:formData,
    }).then(alert(`Usted ha MODIFICADO el producto ${paramsId}`))
})


// DELETE

$divDelete.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData($formThree);
    let paramsId = formData.get('paramsId');
    $viewsThree.classList.remove('visibilityHidden');
    $imageThree.textContent = paramsId;
    fetch(`http://localhost:8080/api/productos/${paramsId}`,{
        method:'DELETE',
        body:formData,
    }).then(alert(`Usted ha BORRADO el producto ${paramsId}`))
})


// GET POR ID

$divRead.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData($formFour);
    let paramsId = formData.get('paramsId');
    $viewsFour.classList.remove('visibilityHidden');
    $imageFour.textContent = paramsId;
    fetch(`http://localhost:8080/api/productos/${paramsId}`,{
        method:'GET',
    })
    .then(res => res.json())
    .then(res => alert(`El producto seleccionado es: 
                        title: ${res.title},  
                        precio: ${res.price}, 
                        thumbnail: ${res.thumbnail}
                        `))
    .catch( err => console.error(err))
})


// GET ALL

$btnGetAll.addEventListener('click',(e)=>{
    e.preventDefault();
    fetch(`http://localhost:8080/api/productos/`,{
        method:'GET',
    })
    .then(alert('Observa la consola para ver todos los productos!'))
    .then(res => res.json())
    .then(res => console.log(res))
    .catch( err => console.error(err))
})