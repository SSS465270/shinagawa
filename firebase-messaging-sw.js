// FirebaseのCompat版SDKをService Worker内で読み込み
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// アプリの初期設定
firebase.initializeApp({
    apiKey: "AIzaSyA6Dbr9A6AUexhH-iCUr3lyiXx-2I5vpY8",
    authDomain: "chats-36528.firebaseapp.com",
    projectId: "chats-36528",
    storageBucket: "chats-36528.firebasestorage.app",
    messagingSenderId: "971663710322",
    appId: "1:971663710322:web:ebab63bd30840517a6caeb"
});

const messaging = firebase.messaging();

// バックグラウンドでの通知受信時の処理
messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title || 'Reach';
    const notificationOptions = {
        body: payload.notification.body || '新しいメッセージが届きました',
        icon: './Reach.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});