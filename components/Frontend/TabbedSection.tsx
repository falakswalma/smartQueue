import React from "react";
import TabbedItems from "./TabbedItems";
import { getServices } from "@/actions/services";
import { getSpecialties } from "@/actions/specialities";
import { getSymptoms } from "@/actions/symptom";

const TabbedSection = async () => {
  const services = (await getServices()).data || [];
  const specialties = (await getSpecialties()).data || [];
  const symptoms = (await getSymptoms()).data || [];
  return (
    <section className="pb-12 pt-20 dark:bg-dark lg:py-[60px] ">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-20">
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px] scroll-m-20 pb-2 tracking-tight first:mt-0">
                Browse local businesses
              </h2>
              <p className="leading-7 [&:not(:first-child)]:mt-6text-base text-body-color dark:text-dark-6">
                Choose from salons, gyms, restaurants and more — all at everyday affordable
                prices. Book online today.
              </p>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="mx-auto max-w-6xl">
          <TabbedItems
            services={services}
            specialties={specialties}
            symptoms={symptoms}
          />
        </div>
      </div>
    </section>
  );
};

export default TabbedSection;
