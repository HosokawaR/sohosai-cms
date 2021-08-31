import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

type FirebaseAuthority = {
  admins: string[];
  auditors: string[];
};

type AuthorityClaims = {
  admin: boolean;
  auditor: boolean;
};

const grantAuthorityByEmail = async (
  email: string,
  customClaims: AuthorityClaims
) => {
  const user = await auth.getUserByEmail(email);
  await auth.setCustomUserClaims(user.uid, customClaims);
};

export const reflectAuthority = functions.https.onCall(async () => {
  try {
    const doc = await db.doc("system/authority").get();
    if (!doc.exists) {
      return { status: 500 , message: "権限設定ドキュメントを Firestore に設置したください。"};
    }
    const { admins, auditors } = doc.data() as FirebaseAuthority;
    const adminPromises = admins.map((email) =>
      grantAuthorityByEmail(email, { admin: true, auditor: true })
    );
    const auditorPromises = auditors.map((email) =>
      grantAuthorityByEmail(email, { admin: false, auditor: true })
    );
    await Promise.all([...adminPromises, ...auditorPromises]);
    return { status: 200, message: "全ての権限が更新されました。" };
  } catch (e) {
    return { status: 500, message: String(e) };
  }
});
