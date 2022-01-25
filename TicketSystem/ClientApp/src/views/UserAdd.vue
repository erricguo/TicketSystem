<template>
    <b-card-code title="新增使用者">
        <b-modal v-if="modalShow">
            <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group id="input-group-1"
                              label="Email address:"
                              label-for="input-1"
                              description="We'll never share your email with anyone else.">
                    <b-form-input id="input-1"
                                  v-model="form.email"
                                  type="email"
                                  placeholder="Enter email"
                                  required></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                    <b-form-input id="input-2"
                                  v-model="form.name"
                                  placeholder="Enter name"
                                  required></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Food:" label-for="input-3">
                    <b-form-select id="input-3"
                                   v-model="form.food"
                                   :options="foods"
                                   required></b-form-select>
                </b-form-group>

                <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group v-model="form.checked"
                                           id="checkboxes-4"
                                           :aria-describedby="ariaDescribedby">
                        <b-form-checkbox value="me">Check me out</b-form-checkbox>
                        <b-form-checkbox value="that">Check that out</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>

                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
            <b-card class="mt-3" header="Form Data Result">
                <pre class="m-0">{{ form }}</pre>
            </b-card>
        </b-modal>
    </b-card-code>
</template>

<script>
    import BCardCode from '@core/components/b-card-code/BCardCode.vue'
    import {
        BButton, BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem,
    } from 'bootstrap-vue'
    import { VueGoodTable } from 'vue-good-table'
    import store from '@/store/index'
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
        },
        data() {
            return {
                form: {
                    email: '',
                    name: '',
                    food: null,
                    checked: []
                },
                foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
                show: false
            }
        },
        computed: {
            statusVariant() {
                const statusColor = {
                    /* eslint-disable key-spacing */
                    Current: 'light-primary',
                    Professional: 'light-success',
                    Rejected: 'light-danger',
                    Resigned: 'light-warning',
                    Applied: 'light-info',
                    /* eslint-enable key-spacing */
                }

                return status => statusColor[status]
            },
        },
    }</script>
