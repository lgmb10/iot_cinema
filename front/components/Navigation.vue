<template>
  <div>
    <header class="shrink-0 h-screen bg-slate-200 z-10 drop-shadow-md">
      <div class="flex flex-col justify-center items-start px-5">
        <div class="self-center flex items-center py-4">
          <img src="~/assets/images/logo.svg" alt="" class="block w-9 pr-1">
          <h1 class="text-3xl font-bold text-center text-sky-950 leading-none">
            CineSens
          </h1>
        </div>
        <nav class="pt-5">
          <ul class="flex flex-col gap-1">
            <li><NuxtLink to="/">Accueil</NuxtLink></li>
            <li><NuxtLink to="/movieRoom/1">Salle 1</NuxtLink></li>
            <li><NuxtLink to="/movieRoom/2">Salle 2</NuxtLink></li>
            <li><NuxtLink to="/movieRoom/3">Salle 3</NuxtLink></li>
          </ul>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped>
.nuxt-link-exact-active {
  font-weight: bold;
  @apply text-sky-800;
}

nav ul li{
  @apply text-sky-950;
  @apply text-lg;
}
</style>
