import React from 'react'

import EcoCurv from '@/public/assets/eco-curv.webp'
import EcoSheep from '@/public/assets/eco-sheep.webp'
import EcoImage from '@/public/assets/eco.webp'
import { Breadcrumbs, Typography } from '@/src/shared'
import Image from 'next/image'

const ECO = () => {
  return (
    <>
      <div className="relative container flex w-full flex-col justify-end">
        <Breadcrumbs
          links={[
            { title: 'HOME', href: '/' },
            { title: 'ECO', href: '/eco' },
          ]}
        />
        <Typography variant="text_title" className="mb-4 italic hidden md:block">
          Rotmina was born from a passion for fashion,with deep respect and
          desire to harmonize with nature and life on Earth
        </Typography>
        <Typography variant="text_mobile_title" className="italic block md:hidden">
          Rotmina was born from a passion for fashion,with deep respect and
          desire to harmonize with nature and life on Earth
        </Typography>
      </div>
      <div className="relative h-[450px] w-full">
        <Image src={EcoImage} alt="eco-image" objectFit="cover" fill />
      </div>
      <div className="container mt-10">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex-1 md:p-4">
            <Typography variant="text_title">Animal Welfare</Typography>
            <Typography variant="text_main" className="my-4">
              <div
                data-layer="Text_main"
                className="TextMain justify-start self-stretch"
              >
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  As part of a complete holistic vegan approach, I do not use
                  fur, angora, silk, feathers, leather or wool.
                  <br />
                  In the past decade, there has been an increase in awareness of
                  the devastating effects of the fashion industry on animal
                  welfare.
                  <br />
                  Millions of animals, including cows, sheep, minks, rabbits,
                  goats, alligators, snakes, and more are exploited each year in
                  these industries.
                  <br />
                  According to reports from animal rights organizations such as
                  Peta, Four Pows International, and World Animal Protection,
                  the use of animals for industrial purposes involves:
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  Aggressive and rapid shearing of wool:
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  Which leads to injuries and severe pain in animals, often
                  causing torn skin and painful infections. These wounds are
                  frequently left untreated and can even result in death. Many
                  workers are paid per quantity, which encourages speed and
                  extreme carelessness.
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  Skinning animals while still alive:
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  A harmful, violent, and negligent practice, carried out to cut
                  costs on equipment and anesthetics. The goal is to shorten
                  processing time and preserve the skin’s quality by preventing
                  blemishes or tears. This action causes immense suffering and
                  violates the animals’ basic rights to welfare.
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  Systematic Slaughter of animals for their fur:
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  Millions of animals are confined in crowded conditions and
                  exploited for the production of clothing items made from their
                  fur, using cruel and brutal methods. Killing techniques
                  include suffocation, electrocution, neck-breaking, or gas
                  chambers. Often, the animals do not lose consciousness
                  immediately, resulting in prolonged and intense suffering.
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  Boiling Silkworms Alive to Extract Intact Silk Fibers:
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  Silkworms are bred in massive quantities, after spinning their
                  cocoons, the cocoons are placed in boiling water while the
                  larvae are still alive, This process is intended to make it
                  easier to unravel the silk threads in one continuous strand,
                  As a result, billions of silkworms are killed each year in a
                  painful process for the sake of textile production.
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  Live Plucking of Feathers from Birds:
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  Mostly targeting geese and ducks, this practice often carried
                  out while the animals are still alive is well documented in
                  the fashion and textile industries. It causes injuries,
                  infections, pain, and intense suffering. The birds are
                  restrained while their feathers are violently torn out to
                  maximize yield of soft down feathers, in some cases, the
                  plucking is repeated multiple times throughout the animal’s
                  life.
                  <br />
                </span>
                <span className="font-['Arima'] text-lg font-bold text-stone-900">
                  Farming Crocodiles, Snakes, and Lizards for Exotic Leathers:
                </span>
                <span className="font-['Arima'] text-lg font-normal text-stone-900">
                  {' '}
                  Millions of reptiles are kept in overcrowded, enclosed pools
                  under artificial conditions that severely violate their basic
                  needs. These environments cause extreme stress and abnormal
                  behaviors. The slaughter process involves brutal methods such
                  as shooting in the head or neck, stabbing the spine, or
                  electrocution. In some documented cases, animals remain
                  partially conscious during skinning, all for the sake of
                  producing “luxury fashion items”. This process inflicts
                  extreme suffering, pain, and unnecessary death.
                  <br />
                  <br />
                  My goal is to create a safe, respectful space - one that
                  causes no harm, suffering, or the slaughter of sentient
                  animals for personal gain. Transitioning to alternative,
                  animal-free materials helps reduce harm, supports the welfare
                  of animals worldwide and contributes to elevate the collective
                  frequency of planet Earth through conscious compassionate
                  choices.
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
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          <div className="flex min-h-full flex-1 items-center justify-center">
            <div className="relative h-full w-full">
              <Image src={EcoCurv} alt="product-image" fill objectFit="cover" />
            </div>
          </div>
          <div className="flex-1 md:p-4">
            <Typography variant="text_title">Packaging</Typography>
            <Typography variant="text_main" className="my-4">
              <div className="Frame187 inline-flex flex-col items-center justify-center gap-2.5 self-stretch">
                <div className="TextMain justify-start self-stretch">
                  <span className="font-['Arima'] text-lg font-normal text-stone-900">
                    Rotmina uses packaging made from recycled paper-from
                    shipping boxes and tags to brand bags and wrapping paper,
                    these choices stem from a recognition that packaging is not
                    merely a function of protecting the product, it is also an
                    expression of how I choose to operate in the world.
                    <br />
                    Through an ongoing personal exploration of questions around
                    sustainability, consumption, and environmental
                    responsibility. I choose to reduce the brand’s carbon
                    footprint, avoid excessive packaging, and opt for solutions
                    that fulfill their purpose efficiently with respect for the
                    resources our environment offers. <br />
                    These choices support my values and contribute to meaningful
                    environmental action:
                    <br />
                  </span>
                  <span className="font-['Inter'] text-lg font-bold text-stone-900">
                    Energy Savings
                  </span>
                  <span className="font-['Arima'] text-lg font-normal text-stone-900">
                    : The production of recycled paper requires approximately
                    30% - 50% less energy compared to virgin paper.
                    <br />
                  </span>
                  <span className="font-['Inter'] text-lg font-bold text-stone-900">
                    CO2 Emission Reduction
                  </span>
                  <span className="font-['Arima'] text-lg font-normal text-stone-900">
                    : Every ton of recycled paper produced helps reduce around
                    2.5 tons of CO2 emissions.
                    <br />
                  </span>
                  <span className="font-['Inter'] text-lg font-bold text-stone-900">
                    Preservation of Natural Resources:
                  </span>
                  <span className="font-['Arima'] text-lg font-normal text-stone-900">
                    {' '}
                    Using recycled paper supports forest conservation and
                    reduces the need for cutting down new trees.
                    <br />
                  </span>
                  <span className="font-['Inter'] text-lg font-bold text-stone-900">
                    Waste Reduction and Reuse:
                  </span>
                  <span className="font-['Arima'] text-lg font-normal text-stone-900">
                    {' '}
                    By using recycled packaging, we give existing materials a
                    second life, avoiding additional production that consumes
                    further resources. This in turn, reduces the amount of waste
                    sent to landfills and lessens the harmful emissions
                    impacting our environment.
                    <br />
                    Rotmina will continue to be attentive to the needs of the
                    environment and remain committed to constantly improving its
                    practices to prevent environmental harm. The brand will stay
                    mindful and committed to technological developments and
                    advancements in sustainability, always striving for new ways
                    to reduce its environmental impact and to be part of a
                    global solution.
                    <br />
                    <br />
                  </span>
                  <span className="font-['Arima'] text-sm font-normal text-stone-900">
                    The data is supported by reports from established
                    environmental organizations such as the:{' '}
                  </span>
                  <span className="font-['Arima'] text-sm font-bold text-stone-900">
                    Environmental Protection Agency (EPA), World Resources
                    Institute (WRI), both of which focus on sustainability,
                    emission reduction, and global waste reduction.
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

export default ECO
