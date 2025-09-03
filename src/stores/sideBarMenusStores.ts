


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
    let sideBarMenus = ref<PersonalMenuItem[]>([
        { key: "0", icon: () => { }, label: "profile", title: "profile" },
    ]);


    //actions
    function setMenus(menus: PersonalMenuItem[]) {
        sideBarMenus.value.length = 0;
        sideBarMenus.value.push(...menus);
    }

    function addMenu(menu: PersonalMenuItem) {
        sideBarMenus.value.push(menu)
    }

    return {
        sideBarMenus,
        setMenus,
        addMenu
    }


})


export default useSideBarMenusStores