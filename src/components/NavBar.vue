<template>
    <div class="nav">
        <nav>
            <div class="nav-header">
                <a href="#">
                    <i></i> {{ActualSeason}}
                </a>
            </div>
            <div class="nav-menu">
                <ul>
                    <li>
                        <a href="{{ path('app_default') }}" >Accueil</a>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" id="dropdown-jeux">Jeux et Serveurs</a>
                        <ul class="sub-menu dropdown-menu" aria-labelledby="dropdown-jeux">
                            <li><a href="{{ path('app_default') }}">Jeux</a></li>
                            <li><a href="#">Serveurs</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" id="dropdown-art">Art</a>
                        <ul class="sub-menu dropdown-menu" aria-labelledby="dropdown-art">
                            <li><a href="{{ path('app_default') }}">Dessin</a></li>
                            <li><a href="{{ path('app_default') }}">Musique</a></li>
                            <li><a href="{{ path('app_default') }}">Vidéo</a></li>
                            <li><a href="{{ path('app_default') }}">Photo</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" id="dropdown-social">Social</a>
                        <ul class="sub-menu dropdown-menu" aria-labelledby="dropdown-social">
                            <li><a href="{{ path('app_default') }}">Réseaux sociaux</a></li>
                            <li><a href="{{ path('app_default') }}">Relation</a></li>
                            <li><a href="{{ path('app_default') }}">Membres</a></li>
                        </ul>
                    </li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" id="dropdown-autre">Autre</a>
                        <ul class="sub-menu dropdown-menu" aria-labelledby="dropdown-autre">
                            <li><a href="{{ path('app_default') }}">On Verra</a></li>
                        </ul>
                    </li>
                    <li class="nav-account">
                        <a href="{{ path('app_default') }}"><i></i> Compte</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    data() {
        return {
            ActualSeason: "Bitume2000",
        };
    },
    mounted() {
        axios.get('https://api.bitume2000.fr/v1/general/season', {
            headers: {
                'token':'GuiMauve5237-RORO&GUIGUI-B2K-NEKISWAIN-38',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response.headers);
                this.ActualSeason = response.data.value;
            })
            .catch(error => {
                console.log(error);
            });

        // Ajouter le code suivant pour activer les menus déroulants
        const dropdownToggle = document.querySelectorAll('.dropdown-toggle');
        dropdownToggle.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const dropdownMenu = toggle.nextElementSibling;
                dropdownMenu.classList.toggle('show');
            });
        });

        // Fermer les menus déroulants lorsque l'utilisateur clique en dehors du menu
        window.addEventListener('click', (e) => {
            const dropdownMenus = document.querySelectorAll('.dropdown-menu');
            dropdownMenus.forEach(menu => {
                if (!menu.contains(e.target)) {
                    menu.classList.remove('show');
                }
            });
        });
    }
}
</script>


<style>
.nav {
    background-color: #333;
    overflow: hidden;
    font-size: 1.2rem;
    font-family: Arial, sans-serif;
}

.nav a {
    display: block;
    color: white;
    text-align: center;
    padding: 20px;
    text-decoration: none;
}

.nav a.active {
    background-color: #4CAF50;
}

.sub-menu {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    z-index: 1;
    background-color: #333;
    width: 200px;
}

.sub-menu.show {
    display: block;
}

.sub-menu:hover {
    display: block;
}

.sub-menu .sub-menu {
    left: 100%;
    top: 0;
}

.dropdown-menu li {
    list-style: none;
}

.dropdown-menu span {
    display: block;
    padding: 10px 20px;
    color: white;
    font-weight: bold;
}

.dropdown-menu i {
    margin-right: 5px;
}

.dropdown-menu li a.active {
    background-color: #4CAF50;
}

.nav-menu ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
}

.nav-menu li {
    position: relative;
}

.nav-menu a.dropdown-toggle {
    cursor: pointer;
}

.nav-menu li:hover > .sub-menu {
    display: block;
}

.nav-account a {
    display: flex;
    align-items: center;
}

.nav-account i {
    margin-right: 5px;
}

.nav-menu a:hover {
    background-color: #555;
}

.nav-menu .sub-menu a:hover {
    background-color: #444;
}

.nav-menu .sub-menu .sub-menu a:hover {
    background-color: #333;
}

</style>
