<template>
    <div>
        <b-card-code title="角色列表">

            <b-button variant="gradient-secondary" v-b-modal.modal-center @click="modalShow = !modalShow" class="mr-1 mb-1">
                <span>新增</span>
            </b-button>

            <vue-good-table :columns="columns"
                            :rows="rows"
                            :pagination-options="{
                            enabled: true,
                            perPage:pageLength
                          }">

                <template slot="table-row"
                          slot-scope="props">

                    <!-- Column: Action -->
                    <span v-if="props.column.field === 'action'">
                        <span>
                            <b-button variant="gradient-primary" class="mr-50" @click="editRow(props)">
                                <feather-icon icon="Edit2Icon"
                                              class="mr-50" />
                                <span>編輯</span>
                            </b-button>
                            <b-button variant="gradient-danger">
                                <feather-icon icon="TrashIcon"
                                              class="mr-50" />
                                <span>刪除</span>
                            </b-button>
                        </span>
                    </span>

                    <!-- Column: Common -->
                    <span v-else>
                        {{ props.formattedRow[props.column.field] }}
                    </span>
                </template>

                <!-- pagination -->
                <template slot="pagination-bottom"
                          slot-scope="props">
                    <div class="d-flex justify-content-between flex-wrap">
                        <div class="d-flex align-items-center mb-0 mt-1">
                            <span class="text-nowrap ">
                                Showing 1 to
                            </span>
                            <b-form-select v-model="pageLength"
                                           :options="['10','20','50']"
                                           class="mx-1"
                                           @input="(value)=>props.perPageChanged({currentPerPage:value})" />
                            <span class="text-nowrap"> of {{ props.total }} entries </span>
                        </div>
                        <div>
                            <b-pagination :value="1"
                                          :total-rows="props.total"
                                          :per-page="pageLength"
                                          first-number
                                          last-number
                                          align="right"
                                          prev-class="prev-item"
                                          next-class="next-item"
                                          class="mt-1 mb-0"
                                          @input="(value)=>props.pageChanged({currentPage:value})">
                                <template #prev-text>
                                    <feather-icon icon="ChevronLeftIcon"
                                                  size="18" />
                                </template>
                                <template #next-text>
                                    <feather-icon icon="ChevronRightIcon"
                                                  size="18" />
                                </template>
                            </b-pagination>
                        </div>
                    </div>
                </template>
            </vue-good-table>
        </b-card-code>


        <b-modal id="newRoleModal" v-model="modalShow" centered @ok="onSubmit">
            <b-card-code title="新增角色">
                <b-form>
                    <b-form-group id="input-group-1"
                                  label="角色名稱"
                                  label-for="input-1">
                        <b-form-input id="input-1"
                                      v-model="modalform.RoleName"
                                      type="email"
                                      placeholder="請輸入角色名稱"
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="角色描述" label-for="input-2">
                        <b-form-input id="input-2"
                                      v-model="modalform.Description"
                                      placeholder="請輸入角色描述"
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="角色權限">
                        <treeselect :multiple="true"
                                    :options="roleActions"
                                    placeholder="選擇權限"
                                    v-model="modalform.ActionList" />
                    </b-form-group>
                </b-form>
            </b-card-code>
        </b-modal>

        <b-modal id="editRoleModal" v-model="editModalShow" centered @ok="onEdit">
            <b-card-code title="修改角色">
                <b-form>
                    <b-form-group id="input-group-1"
                                  label="角色名稱"
                                  label-for="input-1">
                        <b-form-input id="input-1"
                                      v-model="editModalform.RoleName"
                                      type="email"
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="角色描述" label-for="input-2">
                        <b-form-input id="input-2"
                                      v-model="editModalform.Description"
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="角色權限">
                        <treeselect :multiple="true"
                                    :options="roleActions"
                                    placeholder="選擇權限"
                                    v-model="editModalform.ActionList" />
                    </b-form-group>
                </b-form>
            </b-card-code>
        </b-modal>



    </div>
</template>





<script>

    import BCardCode from '@core/components/b-card-code/BCardCode.vue'
    import {
        BButton, BAvatar, BBadge, BPagination, BForm, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem
    } from 'bootstrap-vue'
    import Treeselect from '@riophae/vue-treeselect'
    import { VueGoodTable } from 'vue-good-table'
    import store from '@/store/index'
    import service from '../auth/request';
    //import { swal } from 'vue/types/umd'
    import Swal from 'sweetalert2'
    require('@core/scss/vue/libs/vue-good-table.scss')
    require('@riophae/vue-treeselect/dist/vue-treeselect.min.css')

    export default {
        components: {
            BCardCode,
            VueGoodTable,
            BButton,
            BAvatar,
            BBadge,
            BPagination,
            BFormGroup,
            BFormInput,
            BFormSelect,
            BDropdown,
            BDropdownItem,
            Treeselect,
            BForm,
        },
        data() {
            return {
                roleActionsValues:[],
                roleActions: [],
                pageLength: 10,
                columns: [
                    {
                        label: '角色ID',
                        field: 'tid',
                    },
                    {
                        label: '角色名稱',
                        field: 'roleName',
                    },
                    {
                        label: '角色描述',
                        field: 'description',
                    },
                    {
                        label: '操作',
                        field: 'action',
                    }
                ],
                rows: [],
                modalShow: false,
                editModalShow: false,
                modalform: {
                    RoleName: '',
                    Description: '',
                    ActionList: []
                },
                editModalform: {
                    Tid:'',
                    RoleName: '',
                    Description: '',
                    ActionList: []
                },
                selectedRow:[]
            }
        },
        created() {
            this.GetRoleList()
            this.GetMenuList()
        },
        methods: {
            onSubmit(event) {
                event.preventDefault()
                service.post('/api/Roles', {
                    RoleName : this.modalform.RoleName,
                    Description: this.modalform.Description,
                    ActionList : JSON.stringify(this.modalform.ActionList)
                    })
                    .then(res => {
                        this.modalShow = false;
                        this.onReset()
                        //this.$swal.fire("訊息", "新增成功!", "success")
                        this.GetRoleList()                            
                 
                    })
                    .catch(e => { this.$swal.fire("錯誤", "新增失敗! 請稍後再試", "error") })
            },
            onEdit(event) {
                event.preventDefault()
                service.patch('/api/Roles/' + this.editModalform.Tid, {
                    RoleName: this.editModalform.RoleName,
                    Description: this.editModalform.Description,
                    ActionList: JSON.stringify(this.editModalform.ActionList)
                })
                    .then(res => {
                            this.editModalShow = false;
                            this.onReset()
                            //this.$swal.fire("訊息", "修改成功!", "success")
                            this.GetRoleList()
                    })
                    .catch(e => { this.$swal.fire("錯誤", "新增失敗! 請稍後再試", "error") })
            },
            GetRoleList() {
                service.get('/api/Roles')
                    .then(res => { this.rows = res.data })
                    .catch(e => { 'api/user error' })
            },
            GetMenuList() {
                service.get('/api/Menus')
                    .then(res => {
                        this.roleActions = []
                        
                        
                        res.data.forEach(v => {
                            let menulist = []
                            this.getChildren(v.children, menulist)
                            this.roleActions.push({
                                id: v.tid,
                                label: v.name,
                                children: menulist
                            })
                        })
                    })
                    .catch(e => { 'api/user error' })
            },
            onReset() {
                this.modalform = this.$options.data().modalform
                this.editModalform = this.$options.data().editModalform
            },
            getChildren(data, list) {
                let list2 = []
                data.forEach(v => {
                    if (v.children.length > 0) {
                        this.getChildren(v.children, list2)
                    }
                    if (list2.length <= 0) {
                        list.push({
                            id: v.tid,
                            label: v.name,                            
                        })
                    } else {
                        list.push({
                            id: v.tid,
                            label: v.name,
                            children: list2
                        })
                    }                   
                    list2 = []
                })                
            },
            onRowClick(params) {
                console.log(params)
            },
            editRow(params) {
                this.editModalShow = !this.editModalShow
                this.editModalform.Tid = params.row.tid
                this.editModalform.RoleName = params.row.roleName
                this.editModalform.Description = params.row.description
                this.editModalform.ActionList = JSON.parse(params.row.menuRights)
            }
        },

    }
</script>
