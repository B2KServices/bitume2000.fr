<template>
    <div class="nav">
        <nav>
            <h1>
                {{ actualSeason }}
            </h1>
            <div class="nav-menu">
                <ul>
                    <li>
                        <a>Accueil</a>
                    </li>
                    <li>
                        <a @click="GamesMenu=!GamesMenu">Jeux et Serveurs</a>
                        <ul v-if="GamesMenu">
                            <li><a>Jeux</a></li>
                            <li><a>Serveurs</a></li>
                        </ul>
                    </li>
                    <li>
                        <a @click="ArtMenu=!ArtMenu">Art</a>
                        <ul v-if="ArtMenu">
                            <li><a href="{{ path('app_default') }}">Dessin</a></li>
                            <li><a href="{{ path('app_default') }}">Musique</a></li>
                            <li><a href="{{ path('app_default') }}">Vidéo</a></li>
                            <li><a href="{{ path('app_default') }}">Photo</a></li>
                        </ul>
                    </li>
                    <li>
                        <a @click="SocialMenu=!SocialMenu">Social</a>
                        <ul v-if="SocialMenu">
                            <li><a href="{{ path('app_default') }}">Réseaux sociaux</a></li>
                            <li><a href="{{ path('app_default') }}">Relation</a></li>
                            <li><a href="{{ path('app_default') }}">Membres</a></li>
                        </ul>
                    </li>
                    <li>
                        <a>Autre</a>
                        <ul>
                            <li><a href="{{ path('app_default') }}">On Verra</a></li>
                        </ul>
                    </li>
                    <li>
                        <a @click="accountMenu=!accountMenu"> {{ username }}</a>
                        <ul v-if="accountMenu">
                            <li><a href="{{ path('app_default') }}">Mon compte</a></li>
                            <li><a href="{{ path('app_default') }}">Déconnexion</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script setup>
import axios from "axios";
import {ref} from "vue";

const GamesMenu = ref(false);
const ArtMenu = ref(false);
const SocialMenu = ref(false);
const accountMenu = ref(false);
const username = ref();

const actualSeason = ref();
getActualSeason();
getNameAccount();

function getActualSeason() {
    axios.get('https://api.bitume2000.fr/v2/general/season', {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            actualSeason.value = response.data.value;
        })
        .catch(error => {
            console.log(error);
        });
}

function hasToken()
{
    if (this === undefined)
        return false;
    if (this.$cookie === undefined)
        return false;
    const token = this.$cookie.get('token');
    if (token === null) {
        return false;
    }
    return true;
}

function getNameAccount()
{
    if (hasToken() === false)
    {
        username.value = "Compte";
        return;
    }
    const token = this.$cookie.get('token');
    axios
        .get("https://api.bitume2000.fr/v2/members/id", {
            authorization: "bearer " + token,
        })
        .then(response => {
            username.value = response.data;
        })
        .catch(error => {
            console.log(error);
            username.value = "Compte";
        });
}
</script>
