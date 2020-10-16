<template>
      <section class="position-relative" style="overflow: hidden">
      <img
        class="position-absolute bg-layer2"
        src="../assets/img/parallax-layer2.png"
        alt=""
      />
      <img class="img-fluid" src="../assets/img/main-bg.png" alt="" />
      <div class="position-absolute home-slogan">
        <h1>I make website themes for you.</h1>
        <p class="home-description">
          Gorgeous designed for your store. Monthly Theme Added.
        </p>
        <p>
          <b-button variant="outline-primary" to="/products" size="lg"
            >Discover</b-button
          >
        </p>
      </div>
      <!-- <div class="home-slogan2 text-center mx-auto position-absolute">
        <strong>SIX YEARS Of WOW</strong> for going through in Shopify platform,
        listening all of customers’ desires as well as catching up the trends to
        combine everything what clients need.
      </div> -->
    </section>
</template>

<style lang="scss" scoped>
.bg-layer2 {
  top: 0%;
  left: 24%;
  transform: scale(1);
  z-index: -1;
}

.home-slogan {
  top: 31%;
  left: 4%;
}

.home-description {
  color: #8b919f;
  font-size: 24px;
}
.home-slogan2 {
  bottom: 50px;
  left: 25%;
  font-size: 24px;
  width: 60%;
}
.home-icon {
  width: 50px;
  height: 50px;
  line-height: 50px;
}
</style>
