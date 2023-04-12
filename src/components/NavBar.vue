<template>
  <div class="nav">
  <nav>
	  <div>
		  <a>
			  <i></i>
			  Saison Actuelle
		  </a>
		    <ul class="dropdown-menu">
			    <li>
				    <a href="{{ path('app_default') }}">²
					    <i></i>
					    Accueil
				    </a>
			    </li>
			    <li>
				    <span>
					    <i></i>
					    Jeux et Serveurs
				    </span>
				  <ul class="sub-menu">
					  <li>
						  <a href="{{ path('app_default') }}">
							  Jeux
						  </a>
					  </li>
					<li>
						<a href="bonjour">
							Serveurs
						</a>
					</li>
				</ul>
			</li>
			<li>
				<span>
					<i></i>
					Art
				</span>
				<ul class="sub-menu">
					<li>
						<a href="{{ path('app_default') }}">
							Dessin
						</a>
					</li>
					<li>
						<a href="{{ path('app_default') }}">
							Musique
						</a>
					</li>
					<li>
						<a href="{{ path('app_default') }}">
							Vidéo
						</a>
					</li>
					<li>
						<a href="{{ path('app_default') }}">
							Photo
						</a>
					</li>
				</ul>
			</li>
			<li>
				<span>
					<i></i>
					Social
				</span>
				<ul class="sub-menu">
					<li>
						<a href="{{ path('app_default') }}">
							Réseaux sociaux
						</a>
					</li>
					<li>
						<a href="{{ path('app_default') }}">
							Relation
						</a>
					</li>
					<li>
						<a href="{{ path('app_default') }}">
							Membres
						</a>
					</li>
				</ul>
			</li>
			<li>
				<span>
					<i></i>
					Autre
				</span>
				<ul class="sub-menu">
					<li>
						<a href="{{ path('app_default') }}">
							On Verra
						</a>
					</li>
				</ul>
			</li>
			<a href="{{ path('app_default') }}">
				<i></i>
				Compte
			</a>
		</ul>
	</div>
</nav>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
