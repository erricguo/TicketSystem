<template>
    <div>
        <b-card-code title="權限管理">

            <b-form>
                <b-form-group id="input-group-5" label="角色:" label-for="input-5">
                    <b-form-select id="input-5"
                                   v-model="RoleTid"
                                   :options="selectRole"
                                   required></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-3" label="按鈕權限">
                    <treeselect :multiple="true"
                                :options="commandList"
                                placeholder="選擇權限"
                                v-model="commandSelected" />
                </b-form-group>

                <div class="mt-4 mr-1">
                    <b-row class="justify-content-md-end">
                        <b-button variant="gradient-primary" class="mr-50" @click="onSave">
                            <feather-icon icon="SaveIcon"
                                          class="mr-50" />
                            <span>儲存</span>
                        </b-button>
                    </b-row>


                </div>
            </b-form>
        </b-card-code>

    </div>
</template>

<script>
    import BCardCode from '@core/components/b-card-code/BCardCode.vue'
    import {
        BButton, BAvatar, BBadge, BPagination, BForm, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BRow,
    } from 'bootstrap-vue'
    import Treeselect from '@riophae/vue-treeselect'
    import service from '../auth/request';
    require('@riophae/vue-treeselect/dist/vue-treeselect.min.css')
export default {
    components: {
        BCardCode,
        BButton,
        BAvatar,
        BBadge,
        BPagination,
        BForm,
        BFormGroup,
        BFormInput,
        BFormSelect,
        BDropdown,
        BDropdownItem,
        Treeselect,
        BRow,
        },
    data() {
        return {
            RoleTid: '',
            selectRole: [{ text: '請選擇角色', value: '' },],
            commandSelected:[],
            commandList: [],
        }
        },
        created() {
            this.GetRoleList()
            this.GetMenuList()
        },
        methods: {
            GetRoleList() {
                service.get('/api/Roles')
                    .then(res => {
                        res.data.forEach((r) => {
                            this.selectRole.push({ value: r.tid, text: r.roleName })
                        });
                    })
                    .catch(e => { 'api/user error' })
            },
            GetMenuList() {
                service.get('/api/PageActions')
                    .then(res => {
                        this.commandList = []


                        res.data.forEach(v => {
                            let menulist = []
                            if (v.children) {
                                this.getChildren(v.children, menulist)
                            }
                            this.commandList.push({
                                id: v.menuTid,
                                label: v.menuName,
                                children: menulist
                            })
                        })

                        var r = this.commandList
                        console.log(r)
                    })
                    .catch(e => { 'api/user error' })
            },
            getChildren(data, list) {
                let list2 = []
                data.forEach(v => {
                    if (v.children.length > 0) {
                        this.getChildren(v.children, list2)
                    }
                    if (list2.length <= 0) {
                        list.push({
                            id: JSON.stringify({
                                MenuTid: v.menuTid,
                                ActionId: v.tid
                            }),
                            label: v.actionName,
                        })
                    } else {
                        list.push({
                            id: JSON.stringify({
                                MenuTid: v.menuTid,
                                ActionId: v.tid
                            }),
                            label: v.actionName,
                            children: list2
                        })
                    }
                    list2 = []
                })
            },
            onSave() {
                this.commandSelected.forEach(x => {
                    if (x.includes('MenuTid')) {
                        var o = JSON.parse(x)

                    }
                })
            }
        }
}</script>

<style>
</style>
