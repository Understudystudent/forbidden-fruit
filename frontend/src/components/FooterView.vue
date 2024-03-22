<template>
    <footer class="footer">
        <div class="footer-left" @click="redirectToHomePage">
            <h2 class="forbidden-logo" @mouseover="pointEffect" @mouseleave="removePointEffect">Forbidden</h2>
            <p class="tagline">Unveil Your Desires</p>
        </div>
        <div class="footer-middle">
            <ul class="footer-nav">
                <ul class="list-inline mb-0">
                    <li class="list-inline-item"><a href="https://twitter.com/"><i class="bi bi-twitter" style="color: white;"></i></a></li>
                    <li class="list-inline-item"><a href="https://www.facebook.com/"><i class="bi bi-facebook" style="color: white;"></i></a></li>
                    <li class="list-inline-item"><a href="https://za.pinterest.com/"><i class="bi bi-pinterest" style="color: white;"></i></a></li>
                    <li class="list-inline-item"><a href="https://www.tiktok.com/en/"><i class="bi bi-tiktok" style="color: white;"></i></a></li>
                    <li class="list-inline-item"><a href="https://www.instagram.com/"><i class="bi bi-instagram" style="color: white;"></i></a></li>
                </ul>
            </ul>
        </div>
        <div class="footer-right" @click="redirectToHomePage">
            <ul class="social-links">
                <li v-for="(icon, index) in socialIcons" :key="index" @mouseover="pointEffect" @mouseleave="removePointEffect">
                    <b-icon :icon="icon.icon" class="social-link" style="color: white;"></b-icon>
                </li>
            </ul>
        </div>
        <div class="copyright" @mouseover="pointEffect" @mouseleave="removePointEffect">
            <p @click="redirectToHomePage">&copy; <span>{{ currentYear }}</span> Forbidden. All rights reserved.</p>
        </div>
    </footer>
</template>

<script>
import { useRouter } from "vue-router"; 

export default {
    name: "FooterPage",
    setup() {
        const router = useRouter(); 
        
        const redirectToHomePage = () => {
            router.push({ name: "home" }); 
        };

        const socialIcons = []; // Define socialIcons data here
        
        // Define pointEffect and removePointEffect methods
        const pointEffect = (event) => {
            event.target.style.cursor = "pointer";
            event.target.style.textDecoration = "underline";
            if (event.target.tagName === "SPAN") {
                event.target.parentNode.style.color = "red";
            }
        };

        const removePointEffect = (event) => {
            event.target.style.cursor = "default";
            event.target.style.textDecoration = "none";
            if (event.target.tagName === "SPAN") {
                event.target.parentNode.style.color = "white";
            }
        };

        return {
            redirectToHomePage,
            socialIcons,
            currentYear: new Date().getFullYear(),
            pointEffect,
            removePointEffect
        };
    }
};
</script>

<style>
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000000;
    color: #ffffff;
    padding: 20px;
    position: relative;
}

.forbidden-logo {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #ffffff;
    transition: color 0.3s; 
}

.forbidden-logo:hover {
    color: red; 
}

.tagline {
    font-size: 14px;
}

.footer-nav {
    list-style-type: none;
    padding: 0;
}

.footer-link {
    color: #ffffff;
    text-decoration: none;
    margin-right: 20px;
    font-size: 16px;
}

.footer-link:hover {
    text-decoration: underline;
}

.social-links {
    list-style-type: none;
    padding: 0;
}

.social-link {
    text-decoration: none;
    margin-right: 10px;
    font-size: 20px;
}

.copyright {
    font-size: 10px;
    text-align: right;
    position: absolute;
    bottom: 5px;
    right: 20px;
}
</style>
