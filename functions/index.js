const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.sendPushNotification = functions.firestore
    .document("messages/{roomId}/chats/{msgId}")
    .onCreate(async (snap, context) => {
      const message = snap.data();
      if (!message) {
        console.log("No data associated with the event");
        return;
      }
      const roomId = context.params.roomId;

      const roomDoc = await db.collection("dms").doc(roomId).get();
      if (!roomDoc.exists) return;
      const members = roomDoc.data().members || [];
      const recipientId = members.find(
          (id) => id !== message.senderId,
      );

      if (!recipientId) return;

      const userQuery = await db.collection("users")
          .where("loginId", "==", recipientId)
          .get();
      if (userQuery.empty) {
        console.log("宛先のユーザーが見つかりません:", recipientId);
        return;
      }

      const recipientData = userQuery.docs[0].data();
      const fcmToken = recipientData.fcmToken;

      if (!fcmToken) {
        console.log("宛先のFCMトークンが登録されていません:", recipientId);
        return;
      }

      const textBody = message.text ?
        (message.text.length > 30 ?
          message.text.substring(0, 30) + "..." :
          message.text) :
        "[ファイルが送信されました]";

      const payload = {
        token: fcmToken,
        notification: {
          title: `${message.senderName} からの新着メッセージ`,
          body: textBody,
        },
      };

      try {
        await admin.messaging().send(payload);
        console.log("プッシュ通知の送信に成功しました！");
      } catch (error) {
        console.error("プッシュ通知の送信に失敗しました:", error);
      }
    });
