<template>
  <div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/common";
.flex {
  display: flex;
}
.bt {
  justify-content: space-between;
}
a {
  text-decoration: none;
  color: #333;
}
* {
  margin: 0;
  padding: 0;
  // box-sizing: border-box;
}
</style>
