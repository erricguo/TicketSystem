<template>
    <div>
        <b-card-code title="案件列表">

            <b-button v-b-modal.modal-center @click="onNew" v-show="checkRole('add')">
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
                            <b-button v-show="checkRole('edit')" variant="gradient-primary" class="mr-50" @click="editRow(props)">
                                <feather-icon icon="Edit2Icon"
                                              class="mr-50" />
                                <span>編輯</span>
                            </b-button>
                            <b-button v-show="checkRole('handle')" variant="gradient-secondary" class="mr-50" @click="editRow(props)">
                                <feather-icon icon="Edit2Icon"
                                              class="mr-50" />
                                <span>接單</span>
                            </b-button>
                            <b-button v-show="checkRole('finish')" variant="gradient-success" class="mr-50" @click="editRow(props)">
                                <feather-icon icon="Edit2Icon"
                                              class="mr-50" />
                                <span>結案</span>
                            </b-button>
                            <b-button v-show="checkRole('delete')" variant="gradient-danger" @click="deleteRow(props)">
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
            <b-card-code title="新增案件">

                <b-form @submit="onSubmit" @reset="onReset">

                    <b-form-group id="input-group-1" label="單別" label-for="input-1">
                        <b-form-select id="input-1"
                                       v-model="modalform.ticketType"
                                       :options="selectType"
                                       required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="摘要" label-for="input-2">
                        <b-form-input id="input-2"
                                      v-model="modalform.summary"                                      
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-3" label="描述" label-for="input-3">
                        <b-form-input id="input-3"
                                      v-model="modalform.description"
                                      ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-4" label="建立者" label-for="input-4">
                        <b-form-input id="input-4"
                                      v-model="modalform.creator"
                                      required></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-5" label="狀態" label-for="input-5">
                        <b-form-select id="input-5"
                                       v-model="modalform.ticketStatus"
                                       :options="selectStatus"
                                       required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-6" label="嚴重性" label-for="input-6">
                        <b-form-select id="input-6"
                                       v-model="modalform.ticketSevere"
                                       :options="selectSevere"
                                       required></b-form-select>
                    </b-form-group>

                    <b-form-group id="input-group-7" label="優先程度" label-for="input-7">
                        <b-form-select id="input-7"
                                       v-model="modalform.ticketPriority"
                                       :options="selectPriority"
                                       required></b-form-select>
                    </b-form-group>
                </b-form>
            </b-card-code>
        </b-modal>

        <!--<b-modal v-model="editModalShow" centered @ok="onEdit">
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
        </b-modal>-->
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
                        label: '建立日期',
                        field: 'createDate',
                    },
                    {
                        label: '單別',
                        field: 'ticketType',
                        formatFn: this.formatType,
                    },
                    {
                        label: '摘要',
                        field: 'summary',
                    },
                    {
                        label: '描述',
                        field: 'description',
                    },
                    {
                        label: '建立者',
                        field: 'creator',
                    },
                    {
                        label: '狀態',
                        field: 'ticketStatus',
                        formatFn: this.formatStatus,
                    },
                    {
                        label: '嚴重性',
                        field: 'ticketSevere',
                        formatFn: this.formatSevere,
                    },
                    {
                        label: '優先程度',
                        field: 'ticketPriority',
                        formatFn: this.formatPriority,
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
                    //createDate:'',
                    ticketType: '',
                    summary:'',
                    description: '',
                    creator: '',
                    ticketStatus: '',
                    ticketSevere: '',
                    ticketPriority: '',
                },
                editModalform: {
                    //createDate: '',
                    ticketType: '',
                    summary: '',
                    description: '',
                    creator: '',
                    ticketStatus: '',
                    ticketSevere: '',
                    ticketPriority: '',
                },
                selectType: [],
                selectStatus: [],
                selectSevere: [],
                selectPriority: [],
                currentEditId:''
            }
        },
        created() {
            this.getTicketList()
        },
        methods: {            
            formatType(v) {
                var index = this.selectType.map(function (e) { return e.value; }).indexOf(v);                
                return this.selectType[index].text
            },
            formatStatus(v) {
                var index = this.selectStatus.map(function (e) { return e.value; }).indexOf(v);
                return this.selectStatus[index].text
            },
            formatSevere(v) {
                var index = this.selectSevere.map(function (e) { return e.value; }).indexOf(v);
                return this.selectSevere[index].text
            },
            formatPriority(v) {
                var index = this.selectPriority.map(function (e) { return e.value; }).indexOf(v);
                return this.selectPriority[index].text
            },
            getTicketList() {
                service.get('/api/Tickets')
                    .then(res => {
                        this.rows = res.data.tickets
                        res.data.selectType.forEach(v => {
                            this.selectType.push({
                                text: v.value,
                                value: v.tid.toString()
                            })
                        })
                        res.data.selectStatus.forEach(v => {
                            this.selectStatus.push({
                                text: v.value,
                                value: v.tid.toString()
                            })
                        })
                        res.data.selectSevere.forEach(v => {
                            this.selectSevere.push({
                                text: v.value,
                                value: v.tid.toString()
                            })
                        })
                        res.data.selectPriority.forEach(v => {
                            this.selectPriority.push({
                                text: v.value,
                                value: v.tid.toString()
                            })
                        })
                    })
                    .catch(e => { 'api/user error' })
            },
            onSubmit(event) {
                event.preventDefault()
                service.post('api/Tickets', this.modalform)
                    .then(res => {
                        this.modalShow = false;
                        this.onReset()
                        this.getTicketList()
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
            },
            deleteRow(params) {

            },
            onNew() {
                this.modalShow = !this.modalShow
                this.modalform.creator = store.state.claims.UserName
            },
            checkRole(e) {
                if (store.state.claims.RoleName.toUpperCase() == 'ADMINISTRATOR') return true;

                if (e == 'add') {
                    if (store.state.claims.RoleName.toUpperCase() == 'RD') {
                        return false;
                    }
                    return true;
                }
                else if (e == 'edit') {
                    if (store.state.claims.RoleName.toUpperCase() == 'RD') {
                        return false;
                    }
                    return true;
                } else if (e == 'delete') {
                    if (store.state.claims.RoleName.toUpperCase() == 'RD') {
                        return false;
                    }
                    return true;
                } else if (e == 'handle') {
                    if (store.state.claims.RoleName.toUpperCase() == 'RD') {
                        return true;
                    }
                    return false;
                } else if (e == 'finish') {
                    if (store.state.claims.RoleName.toUpperCase() == 'RD') {
                        return true;
                    }
                    return false;
                }
            }
        },
    }
</script>
