<template>
    <b-card-code title="功能表管理">

        <b-button v-b-modal.modal-center @click="modalShow = !modalShow">
            <span>新增</span>
        </b-button>

        <!-- search input -->
        <div class="custom-search d-flex justify-content-end">
            <b-form-group>
                <div class="d-flex align-items-center">
                    <label class="mr-1" style="min-width: max-content;">查詢</label>
                    <b-form-input v-model="searchTerm"
                                  placeholder="Search"
                                  type="text"
                                  class="d-inline-block" />
                </div>
            </b-form-group>
        </div>

        <!-- table -->
        <vue-good-table :columns="columns"
                        :rows="rows"
                        :group-options="{
                            enabled: true,
                        collapsable: true
                          }"
                        :search-options="{
        enabled: true,
        externalQuery: searchTerm }"
                        :pagination-options="{
        enabled: true,
        perPage:pageLength
      }">
            <template slot="table-row"
                      slot-scope="props">

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

        <b-modal id="newRoleModal" v-model="modalShow" centered @ok="onSubmit">
            <b-card-code title="新增選單">
                <b-form>
                    <b-form-group id="input-group-5" label="層級" label-for="input-5">
                        <b-form-select id="input-5"
                                       v-model="modalform.ParentTid"
                                       :options="selectParent"
                                       required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-1" label="名稱" label-for="input-1">
                        <b-form-input id="input-1"
                                      v-model="modalform.Name"
                                      type="email"
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="資源路徑" label-for="input-2">
                        <b-form-input id="input-2"
                                      v-model="modalform.Url"
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="排序" label-for="input-2">
                        <b-form-input id="input-2"
                                      v-model="modalform.OrderRule"
                                      required></b-form-input>
                    </b-form-group>
                </b-form>
            </b-card-code>
        </b-modal>

        <b-modal id="editRoleModal" v-model="editModalShow" centered @ok="onEdit">
            <b-card-code title="修改角色">
                <b-form>
                    <b-form-group id="input-group-5" label="層級" label-for="input-5">
                        <b-form-select id="input-5"
                                       v-model="editModalform.ParentTid"
                                       :options="selectParent"
                                       required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-1" label="名稱" label-for="input-1">
                        <b-form-input id="input-1"
                                      v-model="editModalform.Name"
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="資源路徑" label-for="input-2">
                        <b-form-input id="input-2"
                                      v-model="editModalform.Url"
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="排序" label-for="input-2">
                        <b-form-input id="input-2"
                                      v-model="editModalform.OrderRule"
                                      required></b-form-input>
                    </b-form-group>

                </b-form>
            </b-card-code>
        </b-modal>

    </b-card-code>
</template>

<script>
    import BCardCode from '@core/components/b-card-code/BCardCode.vue'
    import {
        BButton, BAvatar, BBadge, BPagination, BForm, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem
    } from 'bootstrap-vue'
    import { VueGoodTable } from 'vue-good-table'
    import store from '@/store/index'
    import service from '../auth/request';
    require('@core/scss/vue/libs/vue-good-table.scss')

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
            BForm,
        },
        data() {
            return {
                pageLength: 10,
                dir: false,
                //codeBasic,
                columns: [
                    {
                        label: '名稱',
                        field: 'name',
                    },
                    {
                        label: '資源路徑',
                        field: 'url',
                    },
                    {
                        label: '排序',
                        field: 'orderRule',
                    },
                    {
                        label: '階層',
                        field: 'level',
                    },
                    {
                        label: '操作',
                        field: 'action',
                    },
                ],
                rows: [],
                searchTerm: '',
                childrenList: [],
                modalShow: false,
                editModalShow: false,
                modalform: {
                    ParentTid:'',
                    Name: '',
                    Url: '',
                    OrderRule: -1,
                    Level: '',
                },
                editModalform: {
                    Tid:'',
                    ParentTid:'',
                    Name: '',
                    Url: '',
                    OrderRule: -1,
                    Level: '',
                },
                selectParent: [{ text: '最上層', value: 0 },],
            }
        },
        computed: {

        },
        created() {
            this.getParentList()
            this.getMenuList()
        },
        methods: {
            getMenuList() {
                service.get('/api/Menus')
                    .then(res => {
                        this.rows = []

                        res.data.forEach(v => {
                            let menulist = []
                            
                            this.getChildren(v.children, menulist, v.tid)
                            this.rows.push({
                                tid: v.tid,
                                parentTid: v.parentTid,
                                name: v.name,
                                url: v.url,
                                orderRule: v.orderRule,
                                level: v.level,
                                children: menulist
                            })

                        })
                    })
                    .catch(e => { 'api/user error' })
            },
            getParentList() {
                service.get('/api/Menus/Parent')
                    .then(res => {                        
                        res.data.forEach((r) => {
                            this.selectParent.push({ value: r.tid, text: r.name })
                        });
                    })
                    .catch(e => { 'api/user error' })
            },
            getChildren(data, list, parentTid) {
                let list2 = []
                data.forEach(v => {
                    if (v.children.length > 0) {
                        this.getChildren(v.children, list2, v.tid)
                    }


                    if (list2.length <= 0) {
                        list.push({
                            tid: v.tid,
                            parentTid: parentTid,
                            name: v.name,
                            url: v.url,
                            orderRule: v.orderRule,
                            level: v.level,
                        })
                    } else {
                        list.push({
                            tid: v.tid,
                            parentTid: parentTid,
                            name: v.name,
                            url: v.url,
                            orderRule: v.orderRule,
                            level: v.level,
                            children: list2
                        })
                    }
                    list2 = []
                })
            },
            onSubmit(event) {
                event.preventDefault()
                service.post('/api/Menus', {
                    Name: this.modalform.Name,
                    Url: this.modalform.Url,
                    OrderRule: this.modalform.OrderRule*1,
                    ParentTid: this.modalform.ParentTid,
                })
                    .then(res => {
                        this.modalShow = false;
                        this.onReset()
                        //this.$swal.fire("訊息", "新增成功!", "success")
                        this.getMenuList()

                    })
                    .catch(e => { this.$swal.fire("錯誤", "新增失敗! 請稍後再試", "error") })
            },
            onEdit(event) {
                event.preventDefault()
                service.patch('/api/Menus/' + this.editModalform.Tid, {
                    Name: this.editModalform.Name,
                    Url: this.editModalform.Url,
                    OrderRule: this.editModalform.OrderRule*1,
                    ParentTid: this.editModalform.ParentTid,
                })
                    .then(res => {
                        this.editModalShow = false;
                        this.onReset()
                        //this.$swal.fire("訊息", "修改成功!", "success")
                        this.getMenuList()
                    })
                    .catch(e => { this.$swal.fire("錯誤", "新增失敗! 請稍後再試", "error") })
            },
            onReset() {
                this.modalform = this.$options.data().modalform
                this.editModalform = this.$options.data().editModalform
            },
            editRow(params) {                
                this.editModalShow = !this.editModalShow
                this.editModalform.Tid = params.row.tid
                this.editModalform.Name = params.row.name
                this.editModalform.Url = params.row.url
                this.editModalform.OrderRule = params.row.orderRule
                this.editModalform.ParentTid = params.row.parentTid
            },


        }
    }
</script>
