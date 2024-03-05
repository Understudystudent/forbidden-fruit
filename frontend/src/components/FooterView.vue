<template>
    <div class="container-fluid bg-black">
        <div class="row">
            <p class="lead">
                <b class="bold-text text-white">- Code by Carl&copy;</b>
                <span class="text-white">{{ currYear }} -</span>
            </p>
        </div>
        
        <div class="text text-black">
            <a href="https://github.com/CodeBroke33/" target="_blank">
        <i class="bi bi-github text-white" style="font-size: -1rem; margin-right: 1rem;"></i>
      </a>
      <a href="https://github.com/yourgithubusername" target="_blank">
        <i class="bi bi-linkedin text-white" style="font-size: -1rem; margin-right: 1rem;"></i>
      </a>
      <a href="https://github.com/yourgithubusername" target="_blank">
        <i class="bi bi-slack text-white" style="font-size: -1rem; margin-right: 1rem;"></i>
      </a>
        </div>
       
    </div>
</template>

<script>
    export default {
        data() {
            return{
                currYear: new Date().getFullYear()
            }
        }
    }
</script>

<style scoped>
.bold-text {
  font-weight: bold;
  color: black;
}

span {
    color: black;
    font-weight: bold;
}

.lead {
    font-family: Righteous;
}



</style>
