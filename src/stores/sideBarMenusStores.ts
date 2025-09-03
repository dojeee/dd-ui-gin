


import { defineStore } from "pinia";
import { ref } from "vue";



interface PersonalMenuItem {
    key: string;
    icon?: () => any;
    label: string;
    title: string;
    children?: PersonalMenuItem[]
}



const useSideBarMenusStores = defineStore('sideBarMenusStores', () => {




    // state
    let personalMenus = ref<PersonalMenuItem[]>([
        { key: "0", icon: () => import("@/assets/icons/user.svg"), label: "profile", title: "profile" },
    ]);


    //actions
    function setMenus(menus: PersonalMenuItem[]) {
        personalMenus.value.length = 0;
        personalMenus.value.push(...menus);
    }

    function addMenu(menu: PersonalMenuItem) {
        personalMenus.value.push(menu)
    }

    return {
        personalMenus,
        setMenus,
        addMenu
    }


})


export default useSideBarMenusStores