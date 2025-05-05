import { getDoctors } from "@/actions/users";
import DoctorsList from "@/components/DoctorsList";
import Brands from "@/components/Frontend/Brands";
import Hero from "@/components/Frontend/Hero";
import MegaMenu from "@/components/Frontend/MegaMenu";
import TabbedSection from "@/components/Frontend/TabbedSection";
import React from "react";

export default async function Home() {
  const doctors = (await getDoctors()) || [];
  // console.log(doctors);
  const telhealthDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Telehealth visit"
  );
  const inpersonDoctors = doctors.filter(
    (doctor) => doctor.doctorProfile?.operationMode === "Visit a local business in person"
  );
  console.log(inpersonDoctors);
  return (
    <section className="">
      <Hero />
      <Brands />
      <TabbedSection />
      <DoctorsList doctors={telhealthDoctors} title="Online Appointment" />
      <DoctorsList
        className="bg-blue-50 dark:bg-slate-900 py-8 lg:py-24"
        title="Visit a local business in person"
        isInPerson={true}
        doctors={inpersonDoctors}
      />
    </section>
  );
}
