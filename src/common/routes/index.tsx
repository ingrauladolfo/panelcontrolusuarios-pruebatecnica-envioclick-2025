import { BrowserRouter } from 'react-router'
import { AppRouter } from './AppRouter'
import { Login } from '@/pages/Login'

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AppRouter />
            {/*  <Login /> */}
        </BrowserRouter>
    )
}
