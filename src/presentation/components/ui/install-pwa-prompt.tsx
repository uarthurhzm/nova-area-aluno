import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Verificar se já está instalado
        const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;
        setIsStandalone(isStandaloneMode);

        // Debug: verificar se o evento está sendo registrado
        console.log('PWA: Registrando listener para beforeinstallprompt');

        const handler = (e: Event) => {
            console.log('PWA: beforeinstallprompt event fired');
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);

            // Só mostrar se não foi dispensado antes e não está instalado
            if (!localStorage.getItem('pwa-install-dismissed') && !isStandaloneMode) {
                setShowInstallPrompt(true);
            }
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Para iOS Safari - mostrar prompt manual após 30 segundos
        const iosTimer = setTimeout(() => {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            const isInStandaloneMode = (window.navigator as any).standalone;

            if (isIOS && !isInStandaloneMode && !localStorage.getItem('pwa-install-dismissed')) {
                console.log('PWA: Mostrando prompt iOS');
                setShowInstallPrompt(true);
            }
        }, 1000); // 1 segundo

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            clearTimeout(iosTimer);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) {
            // Para iOS, mostrar instruções manuais
            alert(`Para instalar:\n\n1. Toque em ⋮ \n2. Selecione "Adicionar à Tela de Início"`);
            return;
        }

        try {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('PWA: User choice:', outcome);

            if (outcome === 'accepted') {
                setDeferredPrompt(null);
                setShowInstallPrompt(false);
            }
        } catch (error) {
            console.error('PWA: Error during installation:', error);
        }
    };

    const handleDismiss = () => {
        setShowInstallPrompt(false);
        localStorage.setItem('pwa-install-dismissed', 'true');
        console.log('PWA: Install prompt dismissed');
    };

    // Debug: mostrar sempre em desenvolvimento
    const isDev = import.meta.env.DEV;

    // Não mostrar se já está instalado
    if (isStandalone) {
        return null;
    }

    // Em desenvolvimento, mostrar sempre (para teste)
    if (isDev && !localStorage.getItem('pwa-install-dismissed')) {
        return (
            <Card className="fixed bottom-24 left-4 right-4 z-50 shadow-2xl bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 md:left-auto md:right-4 md:w-96">
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Download className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">Instalar Área do Aluno</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Adicione à tela inicial para acesso rápido e melhor experiência
                            </p>
                            <p className="text-xs text-orange-500 dark:text-orange-400 mb-3 font-medium">
                                🚧 Modo desenvolvimento - Prompt sempre visível
                            </p>
                            <div className="flex gap-2">
                                <Button 
                                    size="sm" 
                                    onClick={handleInstall} 
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                                >
                                    Instalar
                                </Button>
                                <Button 
                                    size="sm" 
                                    variant="outline" 
                                    onClick={handleDismiss}
                                    className="border-gray-300 dark:border-gray-700"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    // Em produção, só mostrar se o evento foi disparado
    if (!showInstallPrompt) {
        return null;
    }

    return (
        <Card className="fixed bottom-24 left-4 right-4 z-50 shadow-2xl bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-gray-200/50 dark:border-gray-800/50 md:left-auto md:right-4 md:w-96">
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Download className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">Instalar Área do Aluno</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Adicione à tela inicial para acesso rápido e melhor experiência
                        </p>
                        <div className="flex gap-2">
                            <Button 
                                size="sm" 
                                onClick={handleInstall} 
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                            >
                                Instalar
                            </Button>
                            <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={handleDismiss}
                                className="border-gray-300 dark:border-gray-700"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}