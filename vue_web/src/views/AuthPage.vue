<template>
    <div class="WebName">ВИКЕНТЕВА.СРУ</div>
    
    <div class="Text">Добро пожаловать!</div>
    <div class="RegContainer">
        
        <div class="Text"  @click="fasle">Код группы:</div>
        <input type="text" id="GroupCode" maxlength = "5">
        <div id="StartButton" @click="handleClick">гоу гоу гоу</div>
        <!-- <router-link :to="'/MainPage'" :is="f" id="StartButton">гоу гоу гоу</router-link> -->
        <div id="InvalidCodeMessage">{{InvalidCode}}</div>
    </div>

</template>

<script>
import { useAppStore } from "../store/index.js"
// const validCode = false;
export default{
    data() {
        return {
            InvalidCode: ""
        }
    },
    methods: {
        handleClick(){
            this.InvalidCode = "";
            setTimeout(() => {
                if(useAppStore().isCodeValid(document.getElementById('GroupCode').value.toUpperCase())){
                    this.$router.push('/MainPage');
                }
                else{
                    this.InvalidCode = "Неверный код"
                }
            }, 20);
            
        },
        fasle(){
            this.InvalidCode = "";
        }
    }
}//
</script>

<style lang="scss" scoped>

.WebName{
    height: 150px;
    display: flex;
    align-items: center;
    place-content: center;
}
.Text{
    height: 50px;
    display: flex;
    align-items: center;
    place-content: center;
    font-weight: 650;
    font-size: 1.5rem;
    line-height: 2.5rem;
    color: #898989;
}
.RegContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 200px;
    width: 30%;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 20px;
    // border: 1px solid rgb(162, 162, 162);
    border-radius: 25px;
    background-color: #f4f4f4;
    -webkit-box-shadow: -1px 1px 10px 1px rgba(34, 60, 80, 0.28);
    -moz-box-shadow: -1px 1px 10px 1px rgba(34, 60, 80, 0.28);
    box-shadow: -1px 1px 10px 1px rgba(34, 60, 80, 0.28);
}
#GroupCode{
    height: 30px;
    width: 100px;
    border: 1px solid black;
    // position: fixed;
    // left: 50%;
    // transform: translate(-50%, 0);
    font-size: 18px;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 30px;
}
#StartButton{
    height: 30px;
    width: 100px;
    border: 1px solid black;
    margin: 4px;
    font-size: 18px;
    border-radius: 5px;
    background-color: #202020;
    color: #ffffff;
    transition:  0.1s;
    text-decoration: none;
    // align-items: center;
    // justify-content: center;
    place-content: center;
    text-align: center;
    user-select: none;
    &:hover{
            margin: 2px;
            border-color: #5b68c8;
            // color: #5b68c8;
            width: 104px;
            height: 34px;
            
        }
}
#InvalidCodeMessage{
    height: 20px;
    color: red;
    font-size: 0.9em;
    user-select: none;
}
</style>