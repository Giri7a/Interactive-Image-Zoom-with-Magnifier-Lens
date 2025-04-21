const lens = document.querySelector('.magnifier-lens');
const product_img = document.querySelector('.product-img img');
const magnified_img = document.querySelector('.magnified-img');

function magnify(product_img, magnified_img) {
    product_img.addEventListener('mousemove', moveLens);
    lens.addEventListener('mousemove', moveLens);
    lens.addEventListener('mouseout', leaveLens);
    product_img.addEventListener('mouseout', leaveLens);
}

function moveLens(e) {
    let x, y, cx, cy;

    // Position of the cursor
    const product_img_rect = product_img.getBoundingClientRect();
    x = e.pageX - product_img_rect.left - window.scrollX - (lens.offsetWidth / 2);
    y = e.pageY - product_img_rect.top - window.scrollY - (lens.offsetHeight / 2);

    let max_xpos = product_img_rect.width - lens.offsetWidth;
    let max_ypos = product_img_rect.height - lens.offsetHeight;

    // Adjust lens size if it's larger than the image
    if (lens.offsetHeight > product_img_rect.height) {
        lens.style.height = `${product_img_rect.height}px`;
    }
    if (lens.offsetWidth > product_img_rect.width) {
        lens.style.width = `${product_img_rect.width}px`;
    }

    if (x > max_xpos) x = max_xpos;
    if (x < 0) x = 0;

    if (y > max_ypos) y = max_ypos;
    if (y < 0) y = 0;
    

    lens.style.cssText = `top: ${y}px; left: ${x}px;`;

    // Calculate the magnified image and lens
    cx = magnified_img.offsetWidth / lens.offsetWidth;
    cy = magnified_img.offsetHeight / lens.offsetHeight;

    magnified_img.style.cssText = `
        background: url('${product_img.src}') 
        -${x * cx}px -${y * cy}px 
        no-repeat;
        background-size: ${product_img_rect.width * cx}px ${product_img_rect.height * cy}px;
    `;

    lens.classList.add('active');
    magnified_img.classList.add('active');
}

function leaveLens() {
    lens.classList.remove('active');
    magnified_img.classList.remove('active');
}

magnify(product_img, magnified_img);



