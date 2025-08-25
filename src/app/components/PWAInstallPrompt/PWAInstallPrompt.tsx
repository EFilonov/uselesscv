'use client';

import { useEffect, useState } from 'react';

import './PWAInstallPrompt.css';

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;
}

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Проверка что приложение уже установлено
        setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

        // Проверка iOS
        setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

        // Обработчик события beforeinstallprompt (не работает на iOS Safari)
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowInstallPrompt(true);
        };

        // Обработчик установки приложения
        const appInstalledHandler = () => {
            setIsStandalone(true);
            setShowInstallPrompt(false);
        };

        window.addEventListener('beforeinstallprompt', handler);
        window.addEventListener('appinstalled', appInstalledHandler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('appinstalled', appInstalledHandler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setShowInstallPrompt(false);
        }
    };

    const handleDismiss = () => {
        setShowInstallPrompt(false);
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
    };

    // Не показывать если уже установлено
    if (isStandalone) {
        return null;
    }

    // Для iOS показываем специальную инструкцию
    if (isIOS && !isStandalone) {
        return (
            <div className='pwa-install-prompt pwa-ios-prompt'>
                <div className='pwa-prompt-content'>
                    <div className='pwa-prompt-icon'>📱</div>
                    <div className='pwa-prompt-text'>
                        <h3>Install Useless CV</h3>
                        <p>
                            To install this app on your iOS device, tap the share button{' '}
                            <span role='img' aria-label='share icon'>
                                ⎋
                            </span>{' '}
                            and then &ldquo;Add to Home Screen&rdquo;{' '}
                            <span role='img' aria-label='plus icon'>
                                ➕
                            </span>
                        </p>
                    </div>
                    <button onClick={handleDismiss} className='pwa-dismiss-btn'>
                        ✕
                    </button>
                </div>
            </div>
        );
    }

    // Для Android/Desktop показываем кнопку установки
    if (showInstallPrompt && deferredPrompt) {
        return (
            <div className='pwa-install-prompt'>
                <div className='pwa-prompt-content'>
                    <div className='pwa-prompt-icon'>📱</div>
                    <div className='pwa-prompt-text'>
                        <h3>Install Useless CV</h3>
                        <p>Install our app for faster access and better experience!</p>
                    </div>
                    <div className='pwa-prompt-buttons'>
                        <button onClick={handleInstall} className='pwa-install-btn'>
                            Install
                        </button>
                        <button onClick={handleDismiss} className='pwa-dismiss-btn'>
                            ✕
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
