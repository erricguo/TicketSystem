<template>
    <div>
        <b-card-code title="使用者列表">


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

        <b-modal v-model="modalShow" centered @ok="onSubmit">
            <b-card-code title="新增使用者">

                <b-form @submit="onSubmit" @reset="onReset">
                    <b-form-group id="input-group-2" label="Email" label-for="input-2">
                        <b-form-input id="input-2"
                                      v-model="modalform.Email"
                                      type="email"
                                      placeholder=""
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-1" label="帳號:" label-for="input-1">
                        <b-form-input id="input-1"
                                      v-model="modalform.Eid"
                                      placeholder=""
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="密碼" label-for="input-3">
                        <b-form-input id="input-3"
                                      v-model="modalform.Pwd"
                                      type="password"
                                      placeholder=""
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-4" label="姓名:" label-for="input-4">
                        <b-form-input id="input-4"
                                      v-model="modalform.UserName"
                                      placeholder=""
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-5" label="用戶角色:" label-for="input-5">
                        <b-form-select id="input-5"
                                       v-model="modalform.RoleTid"
                                       :options="selectRole"
                                       required></b-form-select>
                    </b-form-group>
                </b-form>
            </b-card-code>
        </b-modal>

        <b-modal v-model="editModalShow" centered @ok="onEdit">
            <b-card-code title="修改使用者">

                <b-form @reset="onReset">
                    <b-form-group id="input-group-2" label="Email" label-for="input-2">
                        <b-form-input id="input-2"
                                      v-model="editModalform.Email"
                                      type="email"
                                      placeholder=""
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-1" label="帳號:" label-for="input-1">
                        <b-form-input id="input-1"
                                      v-model="editModalform.Eid"
                                      placeholder=""
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="密碼" label-for="input-3">
                        <b-form-input id="input-3"
                                      v-model="editModalform.Pwd"
                                      type="password"
                                      placeholder=""
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-4" label="姓名:" label-for="input-4">
                        <b-form-input id="input-4"
                                      v-model="editModalform.UserName"
                                      placeholder=""
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-5" label="用戶角色:" label-for="input-5">
                        <b-form-select id="input-5"
                                       v-model="editModalform.RoleTid"
                                       :options="selectRole"
                                       required></b-form-select>
                    </b-form-group>
                </b-form>
            </b-card-code>
        </b-modal>
    </div>
</template>


    


<script>
    import BCardCode from '@core/components/b-card-code/BCardCode.vue'
    import {
        BButton, BAvatar, BBadge, BPagination, BForm, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
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
            BForm,
            BFormGroup,
            BFormInput,
            BFormSelect,
            BDropdown,
            BDropdownItem,
        },
        data() {
            return {
                pageLength: 10,                                
                columns: [
                    {
                        label: '帳號',
                        field: 'users.eid',
                    },
                    {
                        label: '姓名',
                        field: 'users.userName',
                    },
                    {
                        label: '角色',
                        field: 'roles.roleName',
                    },
                    {
                        label: '操作',
                        field: 'action',
                    },
                ],
                rows: [],
                searchTerm: '',
                modalShow: false,
                editModalShow: false,
                modalform: {
                    Eid:'',
                    Email: '',
                    Pwd:'',
                    UserName: '',
                    RoleTid: '',                    
                },
                editModalform: {
                    Tid: '',
                    Eid: '',
                    Email: '',
                    Pwd: '',
                    UserName: '',
                    RoleTid: ''
                },
                selectRole: [{ text: '請選擇角色', value: null },],
                currentEditId:''
            }
        },
        created() {
            this.getUserList()
        },
        methods: {
            getUserList() {
                service.get('/api/Users')
                    .then(res => {
                        this.rows = res.data.uvm
                        if (this.selectRole.length <= 1) {
                            res.data.roles.forEach((r) => {
                                this.selectRole.push({ value: r.tid, text: r.roleName })
                            });
                        }

                    })
                    .catch(e => { 'api/user error' })
            },
            onSubmit(event) {
                event.preventDefault()
                service.post('api/Users', this.modalform)
                    .then(res => {
                        this.modalShow = false;
                        this.onReset()
                        this.getUserList()
                        this.$swal.fire('提示', '新增成功!', 'success')
                        
                    }).catch(e => { 'api/user error' })
            },
            onEdit(event) {
                event.preventDefault()
                service.put('api/Users/' + this.editModalform.Tid, this.editModalform)
                    .then(res => {
                        this.editModalShow = false;
                        this.onReset()
                        this.getUserList()
                        //this.$swal.fire('提示', '新增成功!', 'success')

                    }).catch(e => { 'api/user error' })
            },
            onReset() {
                this.modalform = this.$options.data().modalform
            },
            editRow(params) {
                this.editModalShow = !this.editModalShow
                this.editModalform.Tid = params.row.users.tid
                this.editModalform.Eid = params.row.users.eid
                this.editModalform.UserName = params.row.users.userName
                this.editModalform.Email = params.row.users.email
                this.editModalform.RoleTid = params.row.users.roleTid
                this.editModalform.Pwd = params.row.users.pwd
            }
        }
    }
</script>
