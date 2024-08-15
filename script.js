let cart = [];
let medicines = []; // لتخزين معلومات الأدوية

function addToCart(medicineName, price, quantity, quantityType) {
    cart.push({ name: medicineName, price: price, quantity: quantity, quantityType: quantityType });
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = ''; // مسح العناصر الحالية

    cart.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price} جنيه - كمية: ${item.quantity} ${item.quantityType}`;
        cartItems.appendChild(listItem);
    });
}

function showAdminPanel() {
    const password = prompt('الرجاء إدخال كلمة المرور:');
    if (password === '10017980') {
        document.getElementById('admin-panel').style.display = 'block';
    } else {
        alert('كلمة المرور غير صحيحة!');
    }
}

function addMedicine() {
    const name = document.getElementById('medicine-name').value;
    const price = document.getElementById('medicine-price').value;
    const imageInput = document.getElementById('medicine-image');
    const imageFile = imageInput.files[0];

    if (name && price && imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageSrc = e.target.result;
            const newMedicineHTML = `
                <div class="medicine-item" id="medicine-${name}">
                    <img src="${imageSrc}" alt="${name}">
                    <h2>${name}</h2>
                    <p>السعر: ${price} جنيه</p>
                    <label for="quantity-${name}">الكمية المطلوبة:</label>
                    <input type="number" id="quantity-${name}" min="1" value="1">
                    <label for="quantity-type-${name}">نوع الكمية:</label>
                    <select id="quantity-type-${name}">
                        <option value="علبة">علبة</option>
                        <option value="شريط">شريط</option>
                        <option value="أمبول">أمبول</option>
                    </select>
                    <button onclick="addToCart('${name}', ${price}, document.getElementById('quantity-${name}').value, document.getElementById('quantity-type-${name}').value)">أضف إلى السلة</button>
                </div>
            `;
            document.getElementById('medicine-container').insertAdjacentHTML('beforeend', newMedicineHTML);
            medicines.push({ name, price, imageSrc }); // حفظ الأدوية
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert('يرجى ملء جميع الحقول.');
    }
}

function editMedicine() {
    const name = document.getElementById('edit-medicine-name').value;
    const newName = prompt('أدخل الاسم الجديد للدواء:');
    const newPrice = prompt('أدخل السعر الجديد للدواء:');

    if (name && newName && newPrice) {
        const medicineItem = document.getElementById(`medicine-${name}`);
        if (medicineItem) {
            const medicine = medicines.find(med => med.name === name);
            if (medicine) {
                medicine.name = newName;
                medicine.price = newPrice;

                medicineItem.querySelector('h2').textContent = newName;
                medicineItem.querySelector('p').textContent = `السعر: ${newPrice} جنيه`;
                alert('تم تعديل الدواء بنجاح.');
            } else {
                alert('الدواء غير موجود.');
            }
        } else {
            alert('الدواء غير موجود.');
        }
    } else {
        alert('يرجى ملء جميع الحقول.');
    }
}

function removeMedicine() {
    const name = document.getElementById('edit-medicine-name').value;

    if (name) {
        const medicineItem = document.getElementById(`medicine-${name}`);
        if (medicineItem) {
            medicineItem.remove();
            medicines = medicines.filter(med => med.name !== name); // إزالة الدواء من القائمة
            alert('تم حذف الدواء بنجاح.');
        } else {
            alert('الدواء غير موجود.');
        }
    } else {
        alert('يرجى إدخال اسم الدواء.');
    }
}
