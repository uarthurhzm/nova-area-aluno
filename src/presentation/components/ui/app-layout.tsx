import { LoginService } from '@/domain/services/login-service';
import { Avatar, AvatarFallback, AvatarImage } from '@/presentation/components/ui/avatar';
import { Button } from '@/presentation/components/ui/button';
import HeaderButton from '@/presentation/components/ui/header-button';
import { useAuth } from '@/presentation/contexts/AuthContext';
import { removeLocalStorageItem } from '@/presentation/hooks/use-local-storage';
import { useTheme } from '@/presentation/hooks/use-theme';
import logo_mini from '@/shared/assets/images/logos/logo-azul-login.png';
import logo_dark from '@/shared/assets/images/logos/logo-header-dark.png';
import logo from '@/shared/assets/images/logos/logo-header-default.png';
import { HEADER_ITEMS } from '@/shared/constants/header-items';
import { ROUTES } from '@/shared/constants/router';
import { DoorOpen, Menu, Moon, Sun, Undo2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PWAInstallPrompt from './install-pwa-prompt';
import { Switch } from './switch';

export default function AppLayout({ title, goBackButton, children }: { title?: string, goBackButton?: boolean, children: React.ReactNode }) {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const isMobile = window.innerWidth <= 640;
    const { userData } = useAuth();
    const loginService = new LoginService();

    const handleMenuToggle = () => {
        setIsMenuToggled(!isMenuToggled);
    };

    if (!userData) {
        return null;
    }

    return (
        <div className="w-full h-full min-h-screen min-w-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-900 dark:to-black transition-colors duration-300">
            <div className="flex w-full h-full">
                {/* Aside - Sidebar Premium */}
                <div className={`${isMenuToggled ? 'flex' : 'hidden'} sm:flex min-h-screen h-full ${isMenuToggled && !isMobile ? 'w-24' : 'w-2xs'} max-w-3xs bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl flex-col gap-6 shadow-2xl transition-all duration-300 overflow-y-auto border-r border-gray-200/50 dark:border-gray-800/50`}>

                    {/* Logo Unilago com animação */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-600/20 dark:to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <img
                            src={isMenuToggled ? logo_mini : theme === 'light' ? logo_dark : logo}
                            alt="Logo Unilago"
                            className={`cursor-pointer p-2 transition-all duration-300 relative z-10 hover:scale-105 ${isMenuToggled ? !isMobile ? 'w-12 h-12 mx-auto' : 'w-24 h-24 mx-auto' : ''}`}
                            onClick={() => navigate(ROUTES.home)}
                        />
                    </div>

                    {/* Container do avatar e nome do usuário - Premium */}
                    <div className="cursor-pointer w-full relative h-full p-2" onClick={() => navigate(ROUTES.userInfo)}>
                        <div className={`flex px-3 w-full ${isMenuToggled ? 'justify-center' : ''}`}>
                            <div className="relative group">
                                {/* Glow effect no hover */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                                <Avatar className={`relative transition-all duration-300 ring-2 ring-gray-200 dark:ring-gray-800 group-hover:ring-blue-500 dark:group-hover:ring-blue-600 ${isMenuToggled && !isMobile ? 'w-8 h-8' : 'w-12 h-12'}`}>
                                    <AvatarImage src={`data:image/jpeg;base64,${userData.FOTO_ALUNO}`} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                                        {userData.NM_ALU?.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            {(!isMenuToggled || isMobile) && (
                                <div className="flex gap-1 flex-col justify-center max-w-full overflow-hidden ml-3">
                                    <p className='text-gray-900 dark:text-white text-sm font-bold break-words whitespace-normal truncate'>
                                        {userData.NM_ALU}
                                    </p>
                                    <p className='text-gray-600 dark:text-gray-400 text-xs break-words whitespace-normal truncate'>
                                        {userData.NM_CSO}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Menu Items com design premium */}
                    <div className='flex flex-col overflow-y-auto px-6 pb-6 gap-2'>
                        {HEADER_ITEMS.map((item, index) => (
                            <HeaderButton
                                key={index}
                                Icon={item.icon}
                                isActive={window.location.pathname.includes(item.route)}
                                onClick={() => navigate(item.route)}>
                                {(!isMenuToggled || isMobile) && item.name}
                            </HeaderButton>
                        ))}

                        {/* Divider com gradiente */}
                        <div className="mt-4 mb-4 h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>

                        {/* Botão Sair Premium */}
                        <Button
                            type='button'
                            className='h-12 justify-start bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-300 dark:text-white'
                            onClick={async () => {
                                await loginService.logout();
                                removeLocalStorageItem("rememberMe");
                                navigate(ROUTES.login)
                            }}>
                            <DoorOpen className="mr-2" />
                            {(!isMenuToggled || isMobile) && "Sair"}
                        </Button>
                    </div>
                </div>

                {/* Header e Main */}
                <div className="flex flex-col w-full h-screen max-h-screen overflow-hidden">
                    {/* Header Premium com glassmorphism */}
                    <div className="h-16 flex w-full items-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-2 justify-between shadow-lg flex-shrink-0 border-b border-gray-200/50 dark:border-gray-800/50">
                        <div className='flex items-center gap-4'>
                            <Button
                                variant={"ghost"}
                                size={"icon"}
                                onClick={handleMenuToggle}
                                className="hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-all duration-300">
                                <Menu className='text-gray-800 dark:text-white transition-colors' size={24} />
                            </Button>

                            {/* Theme Toggle Premium */}
                            <div className='flex items-center gap-2 px-3 py-2 rounded-full bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-gray-700/50 shadow-inner'>
                                <Sun className={`w-4 h-4 transition-all duration-300 text-yellow-500 scale-110 dark:text-gray-600 dark:scale-90`} />
                                <Switch
                                    checked={theme === "dark"}
                                    onCheckedChange={toggleTheme}
                                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                                />
                                <Moon className={`w-4 h-4 transition-all duration-300 'dark:text-blue-400 dark:scale-110' text-gray-200 scale-90`} />
                            </div>
                        </div>
                        {!!isMobile && !isMenuToggled && (
                            <img
                                src={logo_mini}
                                alt="Logo"
                                className="w-12 h-12 hover:scale-105 transition-transform duration-300"
                                onClick={() => navigate(ROUTES.home)}
                            />
                        )}
                    </div>

                    {/* Main Content com fundo premium */}
                    <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-black">
                        <div className='flex gap-4 items-center mb-6'>
                            {goBackButton && (
                                <Button
                                    size={"icon"}
                                    onClick={() => navigate(-1)}
                                    className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                                >
                                    <Undo2 className="text-gray-800 dark:text-white" />
                                </Button>
                            )}
                            {title && (
                                <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                                    {title}
                                </h1>
                            )}
                        </div>
                        {children}
                    </div>
                    <PWAInstallPrompt />
                </div>
            </div>
        </div>
    )
}