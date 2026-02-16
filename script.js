// ১. লোডার (১-১০০%)
window.addEventListener('load', () => {
    let percent = document.getElementById('percent');
    let bar = document.getElementById('progress-bar');
    let count = 0;
    
    let interval = setInterval(() => {
        count++;
        percent.innerText = count + "%";
        bar.style.width = count + "%";
        
        if(count === 100) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('loader').style.display = 'none';
                reveal(); 
            }, 300); // লোডার শেষ হওয়ার পর লুকানোর সময়ও কমিয়ে ৩০০ করা হয়েছে
        }
    }, 10); // ২০ থেকে কমিয়ে ১০ করা হয়েছে, ফলে লোডিং দ্বিগুণ ফাস্ট হবে
});

// ২. সাইডবার টগল
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// ৩. স্মুথ স্ক্রলিং
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if(section) {
        section.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('sidebar').classList.remove('active');
    }
}

// ৪. অর্ডার ফরম
function openOrderForm(productName, price) {
    document.getElementById('orderModal').style.display = 'block';
    document.getElementById('selectedProduct').value = "Product: " + productName;
    document.getElementById('selectedPrice').value = "Price: " + price;
}

function closeOrderForm() {
    document.getElementById('orderModal').style.display = 'none';
}

// ৫. WhatsApp মেসেজ সেন্ডিং
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('userName').value;
    let phone = document.getElementById('userPhone').value;
    let address = document.getElementById('userAddress').value;
    let product = document.getElementById('selectedProduct').value;
    let price = document.getElementById('selectedPrice').value;
    let payment = document.getElementById('paymentMethod').value;

    let message = `New Order!%0AName: ${name}%0APhone: ${phone}%0AAddress: ${address}%0A${product}%0A${price}%0APayment: ${payment}`;
    
    document.getElementById('toast').classList.add('show');
    setTimeout(() => {
        window.open(`https://wa.me/8801302133194?text=${message}`, '_blank');
        document.getElementById('toast').classList.remove('show');
        closeOrderForm();
    }, 2000);
});

// ৬. প্রোডাক্ট সার্চ (নাম দিয়ে)
function searchProduct() {
    let input = document.getElementById('productSearch').value.toLowerCase();
    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        let title = card.querySelector('h3').innerText.toLowerCase();
        if (title.includes(input)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
}

// ৭. প্রোডাক্ট ফিল্টার (ক্যাটাগরি দিয়ে)
function filterProduct(category, btn) {
    let cards = document.querySelectorAll('.card');
    let buttons = document.querySelectorAll('.filter-btn');

    // বাটন এক্টিভ করা
    buttons.forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');

    // ফিল্টার লজিক
    cards.forEach(card => {
        let cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = "flex";
            card.classList.add('active'); // ফিল্টার করার পর রিভিল একটিভ করা
        } else {
            card.style.display = "none";
        }
    });
}

// ৮. রিভিল সিস্টেম (স্ক্রল এনিমেশন - বার বার কাজ করার জন্য)
function reveal() {
    let reveals = document.querySelectorAll(".reveal, .hero-content");
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementBottom = reveals[i].getBoundingClientRect().bottom;
        let elementVisible = 100;

        // যখন এলিমেন্টটি স্ক্রিনে প্রবেশ করবে
        if (elementTop < windowHeight - elementVisible && elementBottom > 0) {
            reveals[i].classList.add("active");
        } 
        // যখন এলিমেন্টটি স্ক্রিনের বাইরে চলে যাবে (উপরে বা নিচে)
        else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);


// ৯. থিম সুইচ
const checkbox = document.getElementById('checkbox');
checkbox.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');
    document.getElementById('theme-text').innerText = 
        document.body.classList.contains('light-mode') ? "Enable Dark Mode" : "Enable Light Mode";
});

// ১০. লাইটবক্স
function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    lightbox.style.display = "block";
    img.src = src;
}
function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
}

// ১১.--- Happy Customers (Testimonial Slider) লজিক ---
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');

function showNextTestimonial() {
    // বর্তমান স্লাইড থেকে active ক্লাস সরানো
    testimonials[currentTestimonial].classList.remove('active');
    
    // পরের স্লাইড ইনডেক্স সেট করা
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    
    // পরের স্লাইডে active ক্লাস যোগ করা
    testimonials[currentTestimonial].classList.add('active');
}

// প্রতি ৩ সেকেন্ড পরপর স্লাইড পরিবর্তন হবে
if(testimonials.length > 0) {
    setInterval(showNextTestimonial, 3000);
}

// --- FAQ (Accordion) লজিক ---
function toggleFAQ(element) {
    const accordionItem = element.parentElement;
    const content = accordionItem.querySelector('.accordion-content');
    
    // চেক করা হচ্ছে এটা কি অলরেডি ওপেন কি না
    const isOpen = accordionItem.classList.contains('open');
    
    // অন্য সব ওপেন থাকা FAQ বন্ধ করে দেওয়া (Optional)
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('open');
        item.querySelector('.accordion-content').style.display = "none";
    });

    // ক্লিক করা আইটেমটি টগল করা
    if (!isOpen) {
        accordionItem.classList.add('open');
        content.style.display = "block";
    } else {
        accordionItem.classList.remove('open');
        content.style.display = "none";
    }
}