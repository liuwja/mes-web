import Vue from 'vue'
import Router from 'vue-router'
import OrderList from "@/components/OrderList";
import Login from '@/Login'
import AssembleScan from "../components/AssembleScan";


Vue.use(Router)


const router = new Router({
        routes: [
            {
                path: '/orderList',
                name: 'orderList',
                component: OrderList
            },
            {
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/',
                name: '/',
                component: Login
            },
            {
                path: '/assembleScan',
                name: 'assembleScan',
                component: AssembleScan
            }
        ]
    }
)

export default router