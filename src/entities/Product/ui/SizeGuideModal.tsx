'use client'

import BustImageEN from '@/public/assets/bust.webp'
import BustImageHE from '@/public/assets/bust-he.jpg'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/shadcn/components/ui/dialog'
import { Typography, useDictionary, useLocale } from '@/src/shared'
import Image from 'next/image'

export const SizeGuideModal = () => {
  const { dictionary } = useDictionary()
  const { locale, isRTL } = useLocale()
  const t = (dictionary as unknown as Record<string, Record<string, string>>)
    .sizeGuide || {
    title: 'Size Guide',
    howToMeasure: 'How to Measure?',
    bust: 'Bust',
    bustInstructions: '• Place the measuring tape around the widest part of your bust.\n• Keep the tape horizontal (parallel to the floor), not too loose and not too tight.\n• Make sure your shoulders remain relaxed as you breathe comfortably.',
    waist: 'Waist',
    waistInstructions: '• Place the measuring tape around the narrowest part of your waist, usually just above the navel.\n• Keep the tape horizontal (parallel to the floor), not too loose and not too tight.',
    hips: 'Hips',
    hipsInstructions: '• Place the measuring tape around the widest part below your pelvis, at the level of your buttocks.\n• Ensure the tape is horizontal (parallel to the floor), not too loose and not too tight.',
    size: 'Size',
    bustLabel: 'Bust',
    waistLabel: 'Waist',
    hipsLabel: 'Hips',
  }
  const BustImage = locale === 'he' ? BustImageHE : BustImageEN
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer uppercase">{t.title}</button>
      </DialogTrigger>
      <DialogContent className="rounded-none" dir={isRTL ? 'rtl' : 'ltr'}>
        <DialogHeader>
          <div className="scrollbar-hide h-[600px] w-full overflow-y-scroll">
            <div className="flex flex-col gap-4 text-left text-black">
              <Typography variant="text_main" className="font-bold">
                {t.howToMeasure}
              </Typography>
              <br />
              <Typography variant="text_main" className="font-bold">
                {t.bust}
              </Typography>
              <Typography variant="text_main" className="whitespace-pre-line">
                {t.bustInstructions}
              </Typography>
              <Typography variant="text_main" className="font-bold">
                {t.waist}
              </Typography>
              <Typography variant="text_main" className="whitespace-pre-line">
                {t.waistInstructions}
              </Typography>
              <Typography variant="text_main" className="font-bold">
                {t.hips}
              </Typography>
              <Typography variant="text_main" className="whitespace-pre-line">
                {t.hipsInstructions}
              </Typography>

              <div className="flex flex-col gap-8 md:flex-row md:gap-0">
                <div className="relative order-2 min-h-56 w-full flex-1 md:order-1 md:w-1/2">
                  <Image
                    src={BustImage.src}
                    alt="bust"
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="order-1 w-full flex-1 md:order-2 md:w-1/2">
                  <div className="scrollbar-hide w-full overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                            {t.size}
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                            {t.bustLabel}
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                            {t.waistLabel}
                          </th>
                          <th className="border border-gray-300 px-3 py-2 text-left font-semibold">
                            {t.hipsLabel}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-medium">
                            XS
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            88
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            66
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            95
                          </td>
                        </tr>
                        <tr className="bg-gray-25">
                          <td className="border border-gray-300 px-3 py-2 font-medium">
                            S
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            84
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            70
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            99
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-medium">
                            M
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            88
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            74
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            103
                          </td>
                        </tr>
                        <tr className="bg-gray-25">
                          <td className="border border-gray-300 px-3 py-2 font-medium">
                            L
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            92
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            78
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            107
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-3 py-2 font-medium">
                            XL
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            96
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            82
                          </td>
                          <td className="border border-gray-300 px-3 py-2">
                            111
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
