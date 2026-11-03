// Firebase のバックグラウンドメッセージング用 Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// ご自身のプロジェクト設定
firebase.initializeApp({
    apiKey: "AIzaSyA6Dbr9A6AUexhH-iCUr3lyiXx-2I5vpY8",
    authDomain: "chats-36528.firebaseapp.com",
    projectId: "chats-36528",
    storageBucket: "chats-36528.firebasestorage.app",
    messagingSenderId: "971663710322",
    appId: "1:971663710322:web:ebab63bd30840517a6caeb"
});

const messaging = firebase.messaging();

// アプリがバックグラウンドにあるときの通知受信処理
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] バックグラウンドメッセージを受信しました:', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.ico'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});