<template>
    <div>
        <input type="text" v-model="username">
        <input type="text" v-model="userPsw">
        {{ username }} {{ userPsw }}
        <button @click="login">login</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {

    data() {
        return {
            username: '111',
            userPsw: '222',
        }
    },
methods: {
    login() {
        axios.post('https://fakestoreapi.com/auth/login',{
                username: "this.username",
                password: "this.userPsw"
        })
            .then(res=>console.log(res))
     }
},
}
</script>

