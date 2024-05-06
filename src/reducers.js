import { createSlice, combineReducers } from "@reduxjs/toolkit";


const AuthSlice = createSlice({
    name: "Authentication",
    initialState: {
        isLoggedIn: false,
        accesstoken: null,
        refreshtoken: null,
        email: "",
        password: "",
    },
    reducers: {

        isAuthenticated: (state, action) => {

            state.isLoggedIn = action.payload

        },
        setAccessToken: (state, action) => {

            state.accesstoken = action.payload

        },
        setEmail: (state, action) => {

            state.email = action.payload

        },
        setPassword: (state, action) => {

            state.password = action.payload

        }


    }
});

const ProfileSlice = createSlice({

    name: "Profile",
    initialState: {
        user_id: "",
        username: "",
        email: "",
        phone_number: "",
        address: "",
        role: "",
        restaurant_id: "",
    },
    reducers: {

        setUserName: (state, action) => {

            state.username = action.payload

        },
        setEmailAddress: (state, action) => {

            state.email = action.payload

        },
        setPhoneNumber: (state, action) => {

            state.phone_number = action.payload

        },
        setAddress: (state, action) => {

            state.address = action.payload

        },
        setRole: (state, action) => {

            state.role = action.payload

        },
        setUserID: (state, action) => {

            state.user_id = action.payload

        },
        setRestaurantID: (state,action) =>{

            state.restaurant_id = action.payload

        }
    }

});

const NavSlice = createSlice({

    name: "Dashboard",
    initialState: {
        sidebarShow: true,
    },
    reducers: {

        setVissible: (state, action) => {


            state.sidebarShow = action.payload

        },
        setDisable: (state, action) => {

            state.sidebarShow = action.payload

        }


    }

})

const MenuSlice = createSlice({

    name: "Menu",
    initialState: {
        items: {},
        item_name: "",
        item_price: "",
        item_image: "",
    },
    reducers: {

        setItems: (state, action) => {

            state.items = action.payload

        },
        removeItem: (state, action) => {

            console.log(action.payload)

            delete state.items[action.payload]
        },
        setItemName: (state, action) => {

            state.item_name = action.payload
        },
        setItemPrice: (state, action) => {

            state.item_price = action.payload
        },
        setItemImage: (state, action) => {

            state.item_image = action.payload
        }

    }

})

const UsersSlice = createSlice({

    name: "Users",
    initialState: {
        all_users: {},
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        phone_number: "",



    },
    reducers: {

        setAllUsers: (state, action) => {

            state.all_users = action.payload

        },
        setAdminPhoneNumber: (state, action) => {

            state.phone_number = action.payload

        },
        setAdminUserName: (state, action) => {

            state.username = action.payload

        },
        setAdminEmail: (state, action) => {

            state.email = action.payload

        },
        setAdminPassword: (state, action) => {

            state.password = action.payload

        },
        setAdminConfirmPassword: (state, action) => {

            state.confirmpassword = action.payload

        },
        


    }

})

const orderSlice  = createSlice({

    name: "Orders",
    initialState: {
        orders: {},
        selected_order: null,
    },
    reducers: {

        setOrders: (state, action) =>{

            state.orders = action.payload

        },
        selectOrder: (state,action) =>{

            state.selected_order = action.payload

        }

        
    }


})

const RestaurantSlice = createSlice({

    name: "Restaurant",
    initialState: {
        restaurants: {},
        restaurant_name: "",
        description: "",
        file: "",
        phone_number: "",
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    },
    reducers: {

        setRestaurantName: (state, action) => {

            state.restaurant_name = action.payload

        },
        setDescription: (state, action) => {

            state.description = action.payload

        },
        setFile: (state, action) => {

            state.file = action.payload
        },
        setResPhoneNumber: (state, action) => {

            state.phone_number = action.payload
        },
        setResUserName: (state, action) => {

            state.username = action.payload
        },
        setRestaurants: (state, action) => {

            state.restaurants = action.payload

        },
        setResEmail: (state, action) => {

            state.email = action.payload

        },
        setResPassword: (state, action) => {

            state.password = action.payload

        },
        setConfirmPassword: (state, action) => {

            state.confirm_password = action.payload

        },
        resetForm: (state,action) => {

            state.username = ''
            state.restaurants = ''
            state.restaurant_name = ''
            state.phone_number = ''
            state.password = ''
            state.email = ''
            state.description = ''
            state.confirm_password = ''


        }

    }

})


const rootReducer = combineReducers({
    auth: AuthSlice.reducer,
    dashboard: NavSlice.reducer,
    menu: MenuSlice.reducer,
    profile: ProfileSlice.reducer,
    restaurant: RestaurantSlice.reducer,
    users: UsersSlice.reducer,
    orders: orderSlice.reducer,
});

export const { setOrders, selectOrder } = orderSlice.actions
export const { setVissible, setDisable } = NavSlice.actions
export const { isAuthenticated, setEmail, setPassword } = AuthSlice.actions
export const { setItems, removeItem, setItemName, setItemPrice, setItemImage } = MenuSlice.actions
export const { setUserName, setEmailAddress, setPhoneNumber, setAddress, setRole, setUserID, setRestaurantID } = ProfileSlice.actions
export const { resetForm,setRestaurants, setConfirmPassword, setResPhoneNumber, setFile, setDescription, setRestaurantName, setResPassword, setResEmail, setResUserName } = RestaurantSlice.actions
export const { setAdminPhoneNumber,setAllUsers, setAdminPassword, setAdminEmail, setAdminUserName, setAdminConfirmPassword } = UsersSlice.actions

export default rootReducer;




