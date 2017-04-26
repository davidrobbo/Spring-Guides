<template>
  <div class="wrapper">
    <overlay></overlay>
    <header class="main-header">
      <a href="/" class="logo">
        <!-- mini logo for sidebar mini 40x50 pixels -->
        <span class="logo-mini">RoboCms</span>
        <!-- logo for regular state and mobile devices -->
        <div class="container logo-lg">
          <div class="pull-left image"></div>
          <div class="pull-left info">RoboCms</div>
        </div>
      </a>

      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="javascript:;" class="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Messages-->
            <li class="dropdown messages-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-envelope-o"></i>
                <span class="label label-success">{{ state.userInfo.messages | count }}</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have {{ state.userInfo.messages | count }} message(s)</li>
                <li v-if="state.userInfo.messages.length > 0">
                  <!-- inner menu: contains the messages -->
                  <ul class="menu">
                    <li><!-- start message -->
                      <a href="javascript:;">
                        <!-- Message title and timestamp -->
                        <h4>
                          Support Team
                          <small><i class="fa fa-clock-o"></i> 5 mins</small>
                        </h4>
                        <!-- The message -->
                        <p>Why not consider this a test message?</p>
                      </a>
                    </li>
                    <!-- end message -->
                  </ul>
                  <!-- /.menu -->
                </li>
                <li class="footer" v-if="state.userInfo.messages.length > 0"><a href="javascript:;">See All Messages</a></li>
              </ul>
            </li>
            <!-- /.messages-menu -->

            <!-- Notifications Menu -->
            <li class="dropdown notifications-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-bell-o"></i>
                <span class="label label-warning">{{ state.userInfo.notifications | count }}</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have {{ state.userInfo.notifications | count }} notification(s)</li>
                <li v-if="state.userInfo.notifications.length > 0">
                  <!-- Inner Menu: contains the notifications -->
                  <ul class="menu">
                    <li><!-- start notification -->
                      <a href="javascript:;">
                        <i class="fa fa-users text-aqua"></i> 5 new members joined today
                      </a>
                    </li>
                    <!-- end notification -->
                  </ul>
                </li>
                <li class="footer" v-if="state.userInfo.notifications.length > 0"><a href="javascript:;">View all</a></li>
              </ul>
            </li>

            <!-- Tasks Menu -->
            <li class="dropdown tasks-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-flag-o"></i>
                <span class="label label-danger">{{ state.userInfo.tasks | count }} </span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have {{ state.userInfo.tasks | count }}  task(s)</li>
                <li v-if="state.userInfo.tasks.length > 0">
                  <!-- Inner menu: contains the tasks -->
                  <ul class="menu">
                    <li><!-- Task item -->
                      <a href="javascript:;">
                        <!-- Task title and progress text -->
                        <h3>
                          Design some buttons
                          <small class="pull-right">20%</small>
                        </h3>
                        <!-- The progress bar -->
                        <div class="progress xs">
                          <!-- Change the css width attribute to simulate progress -->
                          <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only">20% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <!-- end task item -->
                  </ul>
                </li>
                <li class="footer" v-if="state.userInfo.tasks.length > 0">
                  <a href="javascript:;">View all tasks</a>
                </li>
              </ul>
            </li>

            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                <!-- The user image in the navbar-->
                <img v-bind:src=demo.avatar class="user-image" alt="User Image">
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <span class="hidden-xs">{{ demo.displayName }}</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">

      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">

        <!-- Sidebar user panel (optional) -->
        <div class="user-panel">
          <div class="pull-left image">

          </div>
          <div class="pull-left info">
            <div><p class="white">{{ demo.displayName }}</p></div>
            <a href="javascript:;"><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>

        <!-- search form (Optional) -->
        <form v-on:submit.prevent class="sidebar-form">
          <div class="input-group">
            <input type="text" name="search" id="search" class="search form-control" data-toggle="hideseek" placeholder="Search Menus" data-list=".sidebar-menu">
                <span class="input-group-btn">
                  <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                  </button>
                </span>
          </div>
        </form>
        <!-- /.search form -->

        <!-- Sidebar Menu -->
        <ul class="sidebar-menu">
          <li class="header">Dashboard</li>
          <li class="pageLink" v-on:click="toggleMenu">
            <router-link to="/admin">
              <i class="fa fa-desktop"></i>
              <span class="page">Dashboard</span>
            </router-link>
          </li>
          <li class="header">Pages</li>
          <li  v-if="!canOrderMenu" class="pageLink" v-on:click="toggleMenu" v-for="page in pages">
            <router-link :to="{ name: 'Page editor', params: { id: page.id } }">
              <i :class="'fa ' + page.icon"></i>
              <span class="page" v-text="page.name"></span>
            </router-link>
          </li>
          <drag v-if="canOrderMenu" @change="updatePages" class="pageLink" v-on:click="toggleMenu"  @start="drag=true" @end="drag=false" :options="options" :list="pages" :element="'li'" style="min-height:50px; min-width: 100%;">
            <router-link v-for="page in pages" :to="{ name: 'Page editor', params: { id: page.id } }">
              <i :class="'dragger fa ' + page.icon"></i>
              <span class="page" v-text="page.name"></span>
            </router-link>
          </drag>

          <li class="header">Contents</li>
          <li class="pageLink" v-on:click="toggleMenu">
            <router-link to="/admin/menus">
              <i class="fa fa-cog"></i>
              <span class="page">Menus</span>
            </router-link>
          </li>
          <li class="pageLink" v-on:click="toggleMenu">
            <router-link to="/admin/events">
              <i class="fa fa-cog"></i>
              <span class="page">Events</span>
            </router-link>
          </li>
          <li class="pageLink" v-on:click="toggleMenu">
            <router-link to="/admin/galleries">
              <i class="fa fa-cog"></i>
              <span class="page">Galleries</span>
            </router-link>
          </li>
          <li class="pageLink" v-on:click="toggleMenu">
            <router-link to="/admin/bookings">
              <i class="fa fa-cog"></i>
              <span class="page">Bookings</span>
            </router-link>
          </li>
          <li class="pageLink" v-on:click="toggleMenu">
            <router-link to="/admin/reviews">
              <i class="fa fa-cog"></i>
              <span class="page">Reviews</span>
            </router-link>
          </li>
          <li class="header">Settings</li>
          <li class="pageLink" v-on:click="toggleMenu">
            <router-link to="/admin/settings">
              <i class="fa fa-cog"></i>
              <span class="page">New Pages and Settings</span>
            </router-link>
          </li>
        </ul>
      </section>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          {{$route.name.toUpperCase() }}
          <small>{{ $route.meta.description }}</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="javascript:;"><i class="fa fa-home"></i>Home</a></li>
          <li class="active">{{$route.name.toUpperCase() }}</li>
        </ol>
      </section>
      <router-view></router-view>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
      <strong>Copyright &copy; {{year}} <a href="javascript:;">CoPilot</a>.</strong> All rights reserved.
    </footer>
  </div>
  <!-- ./wrapper -->
</template>

<script>
import faker from 'faker'
import overlay from './Overlay'
import drag from 'vuedraggable'
require('hideseek')

export default {
  name: 'Dash',
  components: {
    overlay: overlay,
    drag: drag
  },
  data: function () {
    return {
      section: 'Dash',
      me: '',
      error: '',
      api: {
        servers: {
          url: '', // Back end server
          result: []
        }
      },
      options: {
        group: 'sections',
        handle: '.dragger'
      }
    }
  },
  computed: {
    pages:{
     get() {
        return this.$store.getters.pages
     },
     set(pages) {
     }
    },
    settings() {
      return this.$store.getters.settings
    },
    canOrderMenu() {
      return this.$store.getters.canOrderMenu
    },
    canNestPages() {
      return this.$store.getters.canNestPages
    },
    store: function () {
      return this.$parent.$store
    },
    state: function () {
      return this.store.state
    },
    callAPI: function () {
      return this.$parent.callAPI
    },
    demo: function () {
      return {
        displayName: faker.name.findName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        randomCard: faker.helpers.createCard()
      }
    },
    year: function () {
      var y = new Date()
      return y.getFullYear()
    }
  },
  methods: {
    updatePages(){
        this.$store.dispatch('setPages', {pages:this.pages})
    },
    log(){
        console.log("HI")
    },
    changeloading: function () {
      this.store.commit('TOGGLE_SEARCHING')
    },
    toggleMenu: function (event) {
      // remove active from li
      window.$('li.pageLink').removeClass('active')

      // Add it to the item that was clicked
      event.toElement.parentElement.className = 'pageLink active'
    }
  },
  mounted() {
  }
}
</script>

<style>
.user-panel {
  height: 4em;
}
hr.visible-xs-block {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.17);
  height: 1px;
  border-color: transparent;
}
</style>
