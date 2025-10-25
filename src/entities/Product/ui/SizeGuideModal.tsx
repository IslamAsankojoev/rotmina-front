'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/shadcn/components/ui/dialog'
import { Typography } from '@/src/shared'
import Image from 'next/image'
import BustImage from '@/public/assets/bust.webp'

export const SizeGuideModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="cursor-pointer uppercase">
          size guide
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-none">
        <DialogHeader>
          <div className="h-[600px] w-full overflow-y-scroll">
            <DialogDescription>
              <div className="flex flex-col gap-4">
                <Typography variant="text_main" className='font-bold'>How to Measure?</Typography>
                <br />
                <Typography variant="text_main" className='font-bold'>Bust</Typography>
                <Typography variant="text_main">
                  • Place the measuring tape around the widest part of your
                  bust. <br />
                  • Keep the tape horizontal (parallel to the floor), not too
                  loose and not too tight. <br />
                  • Make sure your shoulders remain relaxed as you breathe
                  comfortably. <br />
                </Typography>
                <Typography variant="text_main" className='font-bold'>Waist</Typography>
                <Typography variant="text_main">
                  • Place the measuring tape around the narrowest part of your
                  waist, usually just above the navel. <br />• Keep the tape
                  horizontal (parallel to the floor), not too loose and not too
                  tight.
                </Typography>
                <Typography variant="text_main" className='font-bold'>Hips</Typography>
                <Typography variant="text_main">
                  • Place the measuring tape around the widest part below your
                  pelvis, at the level of your buttocks. <br />
                  • Ensure the tape is horizontal (parallel to the floor), not
                  too loose and not too tight. <br />
                </Typography>

                <div className="flex">
                  <div className="flex-1 h-56 relative">
                    <Image src={BustImage.src} alt='bust' fill objectFit='cover' />
                  </div>
                  <div className="flex-1 w-1/2">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Size</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Bust</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Waist</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Hips</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 px-3 py-2 font-medium">XS</td>
                            <td className="border border-gray-300 px-3 py-2">88</td>
                            <td className="border border-gray-300 px-3 py-2">66</td>
                            <td className="border border-gray-300 px-3 py-2">95</td>
                          </tr>
                          <tr className="bg-gray-25">
                            <td className="border border-gray-300 px-3 py-2 font-medium">S</td>
                            <td className="border border-gray-300 px-3 py-2">84</td>
                            <td className="border border-gray-300 px-3 py-2">70</td>
                            <td className="border border-gray-300 px-3 py-2">99</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-3 py-2 font-medium">M</td>
                            <td className="border border-gray-300 px-3 py-2">88</td>
                            <td className="border border-gray-300 px-3 py-2">74</td>
                            <td className="border border-gray-300 px-3 py-2">103</td>
                          </tr>
                          <tr className="bg-gray-25">
                            <td className="border border-gray-300 px-3 py-2 font-medium">L</td>
                            <td className="border border-gray-300 px-3 py-2">92</td>
                            <td className="border border-gray-300 px-3 py-2">78</td>
                            <td className="border border-gray-300 px-3 py-2">107</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 px-3 py-2 font-medium">XL</td>
                            <td className="border border-gray-300 px-3 py-2">96</td>
                            <td className="border border-gray-300 px-3 py-2">82</td>
                            <td className="border border-gray-300 px-3 py-2">111</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
