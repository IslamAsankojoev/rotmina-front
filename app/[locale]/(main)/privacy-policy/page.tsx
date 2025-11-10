import React from 'react'

import { addLocaleToPath, Breadcrumbs, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale } from '@/src/shared/utils/locale'
import { cookies } from 'next/headers'

const PrivacyPolicy = async ({
  params,
}: {
  params: Promise<{ locale: string }>
}) => {
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .privacyPolicy || {
    home: 'HOME',
    privacyPolicy: 'Privacy Policy',
  }
  return (
    <>
     <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: t.home, href: addLocaleToPath('/', locale) },
            { title: t.privacyPolicy, href: addLocaleToPath('/privacy-policy', locale) },
          ]}
        />
      </div>
      <div className="container mt-8 mb-24 flex items-center justify-center">
        <div className="flex max-w-[800px] flex-col gap-4">
          <Typography
            variant="text_title"
            className="md:text-title text-mobile-title2 italic"
          >
            הצהרת נגישות
          </Typography>
          <Typography variant="text_main">
            חברת רותמינה הינה חברת אופנה המוכרת הלבשה המיוצרת בישראל מחויבים
            לאפשר חוויית גלישה נגישה ונוחה לכל לקוחותינו, כולל אנשים עם
            מוגבלויות. אנו רואים בנגישות ערך עליון ופועלים כדי להבטיח שכל אדם
            יוכל להשתמש באתר שלנו בצורה מיטבית, בהתאם לתקנות שוויון זכויות
            לאנשים עם מוגבלות (התאמות נגישות לשירות) התשע&quot;ג-2013 ולתקן
            הישראלי ברמת AA.
          </Typography>

          <Typography variant="text_main" className="my-6">
            התאמות הנגישות באתר:
          </Typography>

          <Typography variant="text_main">
            באתר בוצעו התאמות נגישות שונות, בהן:
            <br />
            - תמיכה בגלישה בכל הדפדפנים התקניים (Chrome, Firefox, Safari, Edge,
            Opera). <br />
            - ניווט נוח באמצעות מקלדת לחיצה על מקש &quot;TAB&quot; תעביר את הסמן
            לאלמנט הבא, ו-&quot;Enter&quot; יפעיל את הקישור. <br />
            - תוכן ברור, היררכי ומאורגן שימוש בכותרות, פסקאות ורשימות לסיוע
            בהתמצאות. <br />
            - טקסטים קריאים ושפה פשוטה. <br />
            - ניגודיות צבעים מותאמת לשיפור הקריאות עבור אנשים עם לקויות ראייה.{' '}
            <br />
            - תיאורים טקסטואליים (alt text) לתמונות ולרכיבים גרפיים. - התאמת
            האתר לשימוש ברזולוציות מסכים שונות (רספונסיביות). <br />
            - כפתורי שליטה להפעלת/עצירת גלריות וסרטונים. <br />
            - שימוש בטכנולוגיית ARIA לתמיכה בקוראי מסך. <br />
            - הנגשת תפריטים, טפסים ורכיבי ניווט נוספים. <br />
            <br />
            <br />
            התאמות נוספות למשתמשים עם לקויות ראייה ושמיעה:
            <br />
            - אפשרות להגדלת והקטנת גודל הטקסט באמצעות שימוש במקשי
            &quot;CTRL&quot; + &quot;+&quot; או &quot;CTRL&quot; +
            &quot;-&quot;.
            <br />
            - תמיכה בתוכנות קוראות מסך ותוכנות זיהוי קולי.
            <br />
            - האתר אינו כולל תוכן מרצד או מהבהב.
            <br />
            <br />
            <br />
            סייגים לנגישות
            <br />
            <Typography variant="text_main" className="my-6">
              אנו עושים מאמצים רבים להבטיח שכל דפי האתר יהיו מונגשים במלואם, אך
              ייתכן כי קיימים עמודים מסוימים או רכיבים שטרם הונגשו באופן מלא.
              כמו כן, ייתכן שבמודעות חיצוניות שהוטמעו באתר לא הושלמה ההנגשה
              במלואה.
            </Typography>
            <Typography variant="text_main" className="my-6">
              נתקלתם בבעיה
            </Typography>
            <Typography variant="text_main" className="my-6">
              אנחנו כאן כדי לעזור!
            </Typography>
            <Typography variant="text_main" className="my-6">
              אם נתקלתם בקושי בשימוש באתר או שיש לכם הצעה לשיפור, נשמח לשמוע מכם
              ולטפל בכך בהקדם. <br />
              📧 מייל: Brand@rotmina.com <br />
              📞 טלפון: ----------------- <br />
              🕐 שעות פעילות שירות הלקוחות: ימים א&apos;-ה&apos;, 10:00-16:00{' '}
              <br />
            </Typography>
            <Typography variant="text_main" className="my-6">
              בברכה, צוות רותמינה.
            </Typography>
          </Typography>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy
