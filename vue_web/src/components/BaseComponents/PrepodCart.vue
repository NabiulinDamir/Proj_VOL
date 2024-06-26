<template>
    <div class='Cart'>

        <div class="Container-Up">
            <div class="info">{{PrepodInfo}}</div>
            <div class="img" ><img src="/src/ico/VOL.png" alt="ошибка"></div>
        </div>

        <div class="Container-Bottom">
            Номер: 99-9999-999-9
            <hr class="line">
            Почта: vecenteva@gmail.com
            <hr class="line">
            Информация 1
            <hr class="line">
            Информация 2
            <hr class="line">
            <div id="login">
                Войти
            </div>

        

        </div>
    </div>



</template>

<script setup>
var PrepodInfo = "Викентева Ольга Леонидовна\nДолжность: преподаватель";




</script>

<style lang="scss" scoped>
    .Cart{
        width: 250px;
        height: 60px;
        border: 1px solid black;
        // display: flex;
        overflow: hidden;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background-color: rgb(140, 140, 140);
        font-size: 0.8em;
        transition: 200ms;
        &:hover{
            height: 220px;
            
            .Container-Up{
                border-bottom: 1px solid black;
            }
        }
    }
    .Container-Up{
        width: 100%;
        height: 59px;
        display: flex;
        overflow: hidden;
        
    }
    .Container-Bottom{
        padding: 10px;
    }
    .line{
        // margin-bottom: 10px;
        height: 1px;
        background-color: #2424249a;
        // color: aqua;
        border: 0px;
    }
    .info{
        width: 100%;
        height: 58px;
        overflow: hidden;
        
        display: flex;
        align-items: center;
        padding-left: 4px;
        font-family: "Geneva", sans-serif;
    }
    .img{
        // aspect-ratio: 1/1;
        height: 58px;
        display: flex;
        border-left: 1px solid black;
        
    }
    #login{
        width: 70px;
        height: 20px;
        display: flex;
        // border-radius: 12px;
        border: 1px;
        background-color: #202020;
        color: #ffffff;
        transition:  0.2s;
        font-weight: bold;
        place-content: center;
        align-items: center;
        // text-decoration: none;
        user-select: none;
        &:hover{
            
            border:1px solid #b5b5b5;
            
            
            
        }
    }



</style>