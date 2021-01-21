import Vue from "vue";

// import Table from "@/components/Table";
// Vue.component("c-table", Table);

// import Icon from "@/components/Icon";
// Vue.component("Icon", Icon);

// import FormM from "@/components/FormModel";
// Vue.component("c-form-m", FormM);

// import Modal from "@/components/Modal";
// Vue.component("c-modal", Modal);

// import Button from "@/components/Button";
// Vue.component("c-button", Button);


import formModel from '@/components/FormModel'
Vue.component('c-form-model', formModel)

import Table from '@/components/Table'
Vue.component('c-table', Table)

import Pagination from '@/components/Pagination'
Vue.component('c-pagination', Pagination)