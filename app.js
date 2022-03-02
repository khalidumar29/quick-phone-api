'use strict';
const showProduct = () => {
    const searchField = document.getElementById('search-fild').value;
    if (searchField !== '') {
        Setspiner('block');
    }
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            loadProduct(data.data);
        });
};
/** */
// const showProduct2 = () => {
//     const searchField = document.getElementById('search-fild').value;
//     if (searchField !== '') {
//         Setspiner('block');
//     }
//     const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
//     fetch(url)
//         .then((res) => res.json())
//         .then((data) => {
//             moreProductShow(data.data);
//         });
// };
/** Load Data Function */
const loadProduct = (products) => {
    const searchField = document.getElementById('search-fild').value;
    const parentCart = document.getElementById('parent-cart');
    parentCart.textContent = '';
    const filterdProducts = products.slice(0, 20);
    console.log(products);
    if (filterdProducts.length > 0) {
        const p = document.createElement('p');
        p.classList.add('error-p');
        p.innerText = `You Found ${filterdProducts.length} Results 😎`;
        parentCart.appendChild(p);
        for (const product of filterdProducts) {
            const div = document.createElement('div');
            div.classList.add('card', 'col-lg-3', 'mt-4');
            div.innerHTML = `
        <img src="${product.image}" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title"> ${product.brand} ${product.phone_name}</h5>
                            <p class="card-text">
                            Brand: ${product.brand}
                            </p>
                            <button onClick="details('${product.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                   More Details
                            </button>
                            <p></p>
                        </div>
        `;

            parentCart.appendChild(div);
        }
        if (parentCart !== null) {
            const extraProduct = document.getElementById('extra-product');
            extraProduct.innerHTML = `
            <div class="container mt-lg-2 mb-lg-2 d-flex justify-content-center">
                 <button
                        id="more-products"
                        onclick="moreProductShow()"
                        class="btn btn-primary"
                    >
                        See More <i class="fa-solid fa-angle-down"></i>
                    </button>
            </div>
            `;
        }
        Setspiner('none');
    } else if (searchField != '') {
        const p = document.createElement('p');
        p.classList.add('error-p');
        p.innerText = 'No Results Found 🥲';
        parentCart.appendChild(p);
    }
};

/** product details */
const details = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data);
            const modalBody = document.getElementById('modalBody');
            modalBody.textContent = '';
            const div = document.createElement('div');
            div.textContent = '';
            div.classList.add('row', 'align-items-lg-center');
            div.innerHTML = `
            <div class="col-lg-5 col-12 ms-lg-4">
                   <img src="${data.data.image}"/>
               </div>
            <div class="col-lg-6 col-12 pt-2">
              <p class="mb-0"><h6>${data.data.brand} ${data.data.name}</h6></p>
              <p class="mb-0">${data.data.releaseDate}</p>
              <h6>Main Features</h6>
              <p class="mb-0"><strong>Chipset:</strong> ${
                  data.data.mainFeatures.chipSet
              }</p>
              <p class="mb-0"><strong>Storage:</strong> ${
                  data.data.mainFeatures.storage
              }</p>

              <p class="mb-0"><strong>Display Size:</strong> ${
                  data.data.mainFeatures.displaySize
              }</p>
              <p class="mb-0"><strong>Sensor:</strong> ${data.data.mainFeatures.sensors.join(
                  ', '
              )}</p>
              <p class="mb-0"><strong>Bluetooth:</strong> ${
                  data.data.others == undefined
                      ? 'no data found'
                      : data.data.others.Bluetooth
              }</p>
              <p class="mb-0"><strong>Wifi:</strong> ${
                  data.data.others == undefined
                      ? 'no data found'
                      : data.data.others.WLAN
              }</p>
              <p class="mb-0"><strong>NFC:</strong> ${
                  data.data.others == undefined
                      ? 'no data found'
                      : data.data.others.NFC
              }</p>
             
            </div>
            `;
            modalBody.appendChild(div);
        });
};
/** spiner function */
const Setspiner = (style) => {
    document.getElementById('spiner').style.display = style;
};
/** Show Extra Products */
const moreProductShow = (products) => {
    console.log(products);
    const extraProductParentCart = document.getElementById('extra-product');
    // document.getElementById('more-products').style.display = 'none';
    const extraFilterProduct = products.slice(20, products.length);
    for (const product of extraFilterProduct) {
        const div = document.createElement('div');
        div.classList.add('card', 'col-lg-3', 'mt-4');
        div.innerHTML = `
             <img src="${product.image}" class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title"> ${product.brand} ${product.phone_name}</h5>
                            <p class="card-text">
                            Brand: ${product.brand}
                            </p>
                            <button onClick="details('${product.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                   More Details
                            </button>
                            <p></p>
                        </div>

        `;
        extraProductParentCart.appendChild(div);
    }
};
