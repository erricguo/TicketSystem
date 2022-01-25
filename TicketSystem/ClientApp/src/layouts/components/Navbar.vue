<template>
    <div class="navbar-container d-flex content align-items-center">

        <!-- Nav Menu Toggler -->
        <ul class="nav navbar-nav d-xl-none">
            <li class="nav-item">
                <b-link class="nav-link"
                        @click="toggleVerticalMenuActive">
                    <feather-icon icon="MenuIcon"
                                  size="21" />
                </b-link>
            </li>
        </ul>

        <!-- Left Col -->
        <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
            <dark-Toggler class="d-none d-lg-block" />
        </div>

        <b-navbar-nav class="nav align-items-center ml-auto">
            <b-nav-item-dropdown right
                                 toggle-class="d-flex align-items-center dropdown-user-link"
                                 class="dropdown-user">
                <template #button-content>
                    <div class="d-sm-flex d-none user-nav">
                        <p class="user-name font-weight-bolder mb-0">
                            {{UserName}}
                        </p>
                        <span class="user-status">{{RoleName}}</span>
                    </div>
                    <b-avatar size="40"
                              variant="light-primary"
                              badge
                              :src="require('@/assets/images/avatars/13-small.png')"
                              class="badge-minimal"
                              badge-variant="success" />
                </template>

                <b-dropdown-item v-on:click="Logout" link-class="d-flex align-items-center">
                    <feather-icon size="16"
                                  icon="LogOutIcon"
                                  class="mr-50" />
                    <span>Logout</span>
                </b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </div>
</template>

<script>
    import {
        BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
    } from 'bootstrap-vue'
    import DarkToggler from '@core/layouts/components/app-navbar/components/DarkToggler.vue'
    import store from '@/store/index'
    import service from '@/auth/request';
    export default {
        components: {
            BLink,
            BNavbarNav,
            BNavItemDropdown,
            BDropdownItem,
            BDropdownDivider,
            BAvatar,

            // Navbar Components
            DarkToggler,
        },
        data() {
            return {
                UserName: store.state.claims.UserName,
                RoleName: store.state.claims.RoleName,
                
            }
        },

        methods: {
            Logout(_store) {
                store.state.claims = [];
                this.$router.push({
                    path: "/login",
                });

            }
        },
        props: {
            toggleVerticalMenuActive: {
                type: Function,
                default: () => { },
            },
        },

    }
</script>
