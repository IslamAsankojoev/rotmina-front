import { cookies } from 'next/headers'

import EcoCurv from '@/public/assets/eco-curv.webp'
import EcoSheep from '@/public/assets/eco-sheep.webp'
import EcoImage from '@/public/assets/eco.webp'
import { Breadcrumbs, Typography } from '@/src/shared'
import { getDictionary } from '@/src/shared/utils/dictionaries'
import { getServerLocale, addLocaleToPath } from '@/src/shared/utils/locale'
import Image from 'next/image'

export default async function ECO({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const cookieStore = await cookies()
  const locale = await getServerLocale(params, cookieStore)
  const dictionary = await getDictionary(locale as 'en' | 'he')
  const isRTL = locale === 'he'
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .eco || {
    home: 'HOME',
    eco: 'ECO',
    title:
      'Rotmina was born from a passion for fashion,with deep respect and desire to harmonize with nature and life on Earth',
    animalWelfare: 'Animal Welfare',
    packaging: 'Packaging',
  }

  return (
    <>
      <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: t.home, href: addLocaleToPath('/', locale) },
            { title: t.eco, href: addLocaleToPath('/eco', locale) },
          ]}
        />
        <Typography variant="text_title" className="mb-4 italic hidden md:block">
          {t.title}
        </Typography>
        <Typography variant="text_mobile_title" className="italic block md:hidden">
          {t.title}
        </Typography>
      </div>
      <div className="relative h-[450px] w-full">
        <Image src={EcoImage} alt="eco-image" objectFit="cover" fill />
      </div>
      <div className="container mt-10">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12" dir='ltr'>
          <div className="flex-1 md:p-4">
            <Typography variant="text_title" dir={isRTL ? 'rtl' : 'ltr'}>{t.animalWelfare}</Typography>
            <Typography variant="text_main" className="my-4">
              <div
                data-layer="Text_main"
                className="TextMain justify-start self-stretch"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {t.animalWelfareIntro}
                  <br />
                  {t.animalWelfareAwareness}
                  <br />
                  {t.animalWelfareExploitation}
                  <br />
                  {t.animalWelfareReports}
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  {t.woolShearing}
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  {t.woolShearingDesc}
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  {t.skinningAlive}
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  {t.skinningAliveDesc}
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  {t.furSlaughter}
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  {t.furSlaughterDesc}
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  {t.silkBoiling}
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  {t.silkBoilingDesc}
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  {t.featherPlucking}
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  {t.featherPluckingDesc}
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  {t.exoticLeather}
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  {t.exoticLeatherDesc}
                  <br />
                  <br />
                  {t.animalWelfareGoal}
                </span>
              </div>
            </Typography>
          </div>
          <div className="flex min-h-full flex-1 items-center justify-center">
            <div className="relative h-full w-full">
              <Image
                src={EcoSheep}
                alt="product-image"
                fill
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-10">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12" dir='ltr'>
          <div className="flex min-h-full flex-1 items-center justify-center">
            <div className="relative h-full w-full">
              <Image src={EcoCurv} alt="product-image" fill objectFit="cover" />
            </div>
          </div>
          <div className="flex-1 md:p-4">
            <Typography variant="text_title" dir={isRTL ? 'rtl' : 'ltr'}>{t.packaging}</Typography>
            <Typography variant="text_main" className="my-4">
              <div className="Frame187 inline-flex flex-col items-center justify-center gap-2.5 self-stretch">
                <div className="TextMain justify-start self-stretch" dir={isRTL ? 'rtl' : 'ltr'}>
                  <span className="font-['Arima'] text-lg font-normal text-stone-900">
                    {t.packagingIntro}
                    <br />
                    {t.packagingExploration} <br />
                    {t.packagingValues}
                    <br />
                  </span>
                  <span className="font-['Inter'] text-lg font-bold text-stone-900">
                    {t.energySavings}
                  </span>
                  <span className="font-['Arima'] text-lg font-normal text-stone-900">
                    {t.energySavingsDesc}
                    <br />
                  </span>
                  <span className="font-['Inter'] text-lg font-bold text-stone-900">
                    {t.co2Reduction}
                  </span>
                  <span className="font-['Arima'] text-lg font-normal text-stone-900">
                    {t.co2ReductionDesc}
                    <br />
                  </span>
                  <span className="font-['Inter'] text-lg font-bold text-stone-900">
                    {t.naturalResources}
                  </span>
                  <span className="font-['Arima'] text-lg font-normal text-stone-900">
                    {' '}
                    {t.naturalResourcesDesc}
                    <br />
                  </span>
                  <span className="font-['Inter'] text-lg font-bold text-stone-900">
                    {t.wasteReduction}
                  </span>
                  <span className="font-['Arima'] text-lg font-normal text-stone-900">
                    {' '}
                    {t.wasteReductionDesc}
                    <br />
                    {t.packagingCommitment}
                    <br />
                    <br />
                  </span>
                  <span className="font-['Arima'] text-sm font-normal text-stone-900">
                    {t.packagingData}{' '}
                  </span>
                  <span className="font-['Arima'] text-sm font-normal text-stone-900">
                    {t.packagingOrganizations}
                  </span>
                </div>
              </div>
            </Typography>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  )
}
