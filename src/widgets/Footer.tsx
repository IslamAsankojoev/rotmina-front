import { Button } from '@/shadcn/components/ui/button'
import { Input } from '@/shadcn/components/ui/input'
import { Facebook, Instagram, Mail, Smartphone } from 'lucide-react'
import { Libre_Caslon_Text } from 'next/font/google'

import { Typography, leftMenu } from '../shared'

const libreCaslonText = Libre_Caslon_Text({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const Footer = () => {
  return (
    <footer className="bg-blackish py-16">
      <div className="container flex flex-col md:flex-row justify-between gap-6">
        <div className="flex flex-col gap-10">
          <div className="text-white">
            <div className="inline-flex flex-col items-center justify-center gap-2.5">
              <div
                className={`justify-start ${libreCaslonText.className} text-white`}
              >
                <Typography variant="text_mobile_title2" className='italic'>
                  Sign up for updates
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Input placeholder="Email" className="text-white" />
            <Button variant="minimal">SEND</Button>
          </div>
        </div>
        <div className="flex flex-col gap-10 w-full md:w-fit">
          <div className="flex gap-8 justify-between">
            <div className="flex flex-col gap-2">
              {leftMenu.splice(0, leftMenu.length - 1).map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="text-white hover:underline"
                >
                  <Typography variant="text_mini_footer">
                    {item.title}
                  </Typography>
                </a>
              ))}
              <a href={'/contact'} className="text-white hover:underline">
                <Typography variant="text_mini_footer">Contact</Typography>
              </a>
            </div>
            <div className="flex flex-col gap-2 text-white">
              <Typography variant="text_mini_footer">
                Terms of conditions
              </Typography>
              <Typography variant="text_mini_footer">Privacy Policy</Typography>
              <Typography variant="text_mini_footer">
                Shipping & Returns
              </Typography>
              <Typography variant="text_mini_footer">
                Payment & Delivery
              </Typography>
            </div>
          </div>
          <div className="flex justify-between gap-6">
            <div>
              <Instagram strokeWidth={0.75} size={35} color="white" />
            </div>
            <div>
              <Smartphone strokeWidth={0.75} size={35} color="white" />
            </div>
            <div>
              <Facebook strokeWidth={0.75} size={35} color="white" />
            </div>
            <div>
              <Mail strokeWidth={0.75} size={35} color="white" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
