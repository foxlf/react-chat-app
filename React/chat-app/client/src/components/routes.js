import Join from "./join/Join"
import Login from "./join/Login"
import Register from "./join/Register"
import Menu from "./Menu"
import Rooms from "./Rooms"

export const privateRoutes = [
    {path: '/chat/:roomId', Component: Rooms},
    {path: '/chat', Component: Menu}, 
]

export const publicRoutes = [
    {path: '/', Component: Join},
    {path: '/auth', Component: Login},
    {path: '/reg', Component: Register}
]