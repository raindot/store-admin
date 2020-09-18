<template>
  <div>
    <div class="container">
      <div class="position-relative">
        <div
          class="position-absolute"
          style="top:0; bottom:0; left:0; right:0; background-image: url(https://images.unsplash.com/photo-1519657635301-68bb60c798f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1346&q=80);
        background-position: center center; opacity: 1;"
        ></div>
        <div class="container d-flex flex-column" style="min-height: 100vh;">
          <nav class="navbar navbar-expand-lg navbar-light">
            <router-link to="/" class="navbar-brand">徜徉水族</router-link>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <router-link to="/" class="nav-item nav-link mr-4 active">
                  Home
                  <span class="sr-only">(current)</span>
                </router-link>
                <router-link to="/products" class="nav-item nav-link mr-4">Product</router-link>
                <!-- <router-link class="nav-item nav-link mr-4">Detail</router-link> -->
                <router-link to="/cart" class="nav-item nav-link">
                  <i class="fas fa-shopping-cart"></i>
                </router-link>
              </div>
            </div>
          </nav>
          <div class="row justify-content-center my-auto">
            <div class="col-md-4 text-center">
              <h2 class="text-light text-nowrap">打造你的水底小世界</h2>
              <p
                class="text-muted mb-0"
              >我們提供最高品質的水族用品</p>
              <button class="btn btn-dark rounded-0 mt-6">購物去</button>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row mt-5">
          <div class="col-md-4 mt-md-4">
            <div class="card border-0 mb-4">
              <img
                src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                class="card-img-top rounded-0"
                alt="..."
              />
              <div class="card-body text-center">
                <h4>Lorem ipsum</h4>
                <div class="d-flex justify-content-between">
                  <p class="card-text text-muted mb-0">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-md-4">
            <div class="card border-0 mb-4">
              <img
                src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                class="card-img-top rounded-0"
                alt="..."
              />
              <div class="card-body text-center">
                <h4>Lorem ipsum</h4>
                <div class="d-flex justify-content-between">
                  <p class="card-text text-muted mb-0">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mt-md-4">
            <div class="card border-0 mb-4">
              <img
                src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                class="card-img-top rounded-0"
                alt="..."
              />
              <div class="card-body text-center">
                <h4>Lorem ipsum</h4>
                <div class="d-flex justify-content-between">
                  <p class="card-text text-muted mb-0">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-light mt-5">
        <div class="container">
          <b-carousel
            id="carousel-1"
            :interval="4000"
            controls
            indicators
            background="#f2f2f2"
            img-width="1024"
            img-height="380"
            style="text-shadow: 1px 1px 2px #333;"
          >
            <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
                a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
              </div>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </div>
      <div class="container my-7">
        <div class="row">
          <div class="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
              alt
              class="img-fluid"
            />
          </div>
          <div class="col-md-4 m-auto text-center">
            <h4 class="mt-4">Lorem ipsum</h4>
            <p
              class="text-muted"
            >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
          </div>
        </div>
        <div class="row flex-row-reverse justify-content-between mt-4">
          <div class="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
              alt
              class="img-fluid"
            />
          </div>
          <div class="col-md-4 m-auto text-center">
            <h4 class="mt-4">Lorem ipsum</h4>
            <p
              class="text-muted"
            >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="footer bg-dark py-5">
      <div class="container">
        <div class="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
          <a class="text-white h4" href="./index.html">LOGO</a>
          <ul class="d-flex list-unstyled mb-0 h4">
            <li>
              <a href="#" class="text-white mx-3">
                <i class="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#" class="text-white mx-3">
                <i class="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#" class="text-white ml-3">
                <i class="fab fa-line"></i>
              </a>
            </li>
          </ul>
        </div>
        <div
          class="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white"
        >
          <div class="mb-md-0 mb-1">
            <p class="mb-0">02-3456-7890</p>
            <p class="mb-0">service@mail.com</p>
          </div>
          <p class="mb-0">© 2020 LOGO All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>
