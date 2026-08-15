let cart = [];


// ===============================
// FORMAT RUPIAH
// ===============================

function formatRupiah(number) {

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);

}


// ===============================
// ADD TO CART
// ===============================

function addToCart(name, price) {

    cart.push({
        name: name,
        price: price
    });

    updateCart();

    alert(name + " berhasil ditambahkan ke keranjang!");
}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    cartCount.textContent = cart.length;


    cartItems.innerHTML = "";


    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="color:#777">
                Keranjang masih kosong.
            </p>
        `;

    }


    cart.forEach((item, index) => {

        total += item.price;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    <small>
                        ${formatRupiah(item.price)}
                    </small>

                </div>

                <button
                    onclick="removeFromCart(${index})"
                    style="
                        background:none;
                        border:none;
                        color:#ff5555;
                        cursor:pointer;
                    "
                >
                    Hapus
                </button>

            </div>

        `;

    });


    cartTotal.textContent =
        formatRupiah(total);
}


// ===============================
// REMOVE
// ===============================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ===============================
// OPEN CART
// ===============================

function openCart() {

    document
        .getElementById("cartModal")
        .classList.add("active");

    updateCart();

}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("active");

}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

    if (cart.length === 0) {

        alert("Keranjang masih kosong!");

        return;
    }


    let message =
        "Halo, saya ingin membeli:%0A%0A";


    let total = 0;


    cart.forEach((item) => {

        message +=
            "• " +
            item.name +
            " - " +
            formatRupiah(item.price) +
            "%0A";

        total += item.price;

    });


    message +=
        "%0ATotal: " +
        formatRupiah(total);


    // GANTI NOMOR INI
    const phone =
        "6280000000000";


    window.open(
        "https://wa.me/" +
        phone +
        "?text=" +
        message,
        "_blank"
    );

}


// ===============================
// FILTER PRODUCTS
// ===============================

function filterProducts(category) {

    const products =
        document.querySelectorAll(".product");


    products.forEach(product => {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });


    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ===============================
// CLOSE MODAL WHEN CLICK OUTSIDE
// ===============================

document
    .getElementById("cartModal")
    .addEventListener("click", function(e) {

        if (e.target === this) {
            closeCart();
        }

    });