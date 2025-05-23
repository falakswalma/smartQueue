"use server";

import { prismaClient } from "@/lib/db";
import {
  AlarmClock,
  DollarSign,
  LayoutGrid,
  LucideIcon,
  Mail,
  Users,
} from "lucide-react";
import {
  getAppointments,
  getDoctorAppointments,
  getPatientAppointments,
} from "./appointments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getInboxMessages } from "./inbox";
import { getDoctors } from "./users";
import { getServices } from "./services";
export type DoctorAnalyticsProps = {
  title: string;
  count: number;
  icon: LucideIcon;
  unit: string;
  detailLink: string;
};
export async function getAdminAnalytics() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const appointments = (await getAppointments()).data || [];
    const doctors = (await getDoctors()) || [];
    const services = (await getServices()).data || [];
    const uniquePatientsMap = new Map();

    appointments.forEach((app) => {
      if (!uniquePatientsMap.has(app.patientId)) {
        uniquePatientsMap.set(app.patientId, {
          patientId: app.patientId,
          name: `${app.firstName} ${app.lastName}`,
          email: app.email,
          phone: app.phone,
          location: app.location,
          gender: app.gender,
          occupation: app.occupation,
          dob: app.dob,
        });
      }
    });
    const patients = Array.from(uniquePatientsMap.values());
    const messages = (await getInboxMessages(user!.id)).data || [];
    const analytics = [
      {
        title: "Services",
        count: doctors.length,
        icon: LayoutGrid,
        unit: "",
        detailLink: "/dashboard/doctors",
      },
      {
        title: "Clients",
        count: patients.length,
        icon: Users,
        unit: "",
        detailLink: "/dashboard/patients",
      },
      {
        title: "Appointments",
        count: appointments.length ?? 0,
        icon: AlarmClock,
        unit: "",
        detailLink: "/dashboard/appointments",
      },

      {
        title: "Services",
        count: services.length,
        icon: LayoutGrid,
        unit: "",
        detailLink: "/dashboard/services",
      },
    ];
    return analytics as DoctorAnalyticsProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getDoctorAnalytics() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const appointments =
      (await getDoctorAppointments(user?.id ?? "")).data || [];

    const uniquePatientsMap = new Map();

    appointments.forEach((app) => {
      if (!uniquePatientsMap.has(app.patientId)) {
        uniquePatientsMap.set(app.patientId, {
          patientId: app.patientId,
          name: `${app.firstName} ${app.lastName}`,
          email: app.email,
          phone: app.phone,
          location: app.location,
          gender: app.gender,
          occupation: app.occupation,
          dob: app.dob,
        });
      }
    });
    const patients = Array.from(uniquePatientsMap.values());
    const messages = (await getInboxMessages(user!.id)).data || [];
    const analytics = [
      {
        title: "Appointments",
        count: appointments.length ?? 0,
        icon: AlarmClock,
        unit: "",
        detailLink: "/dashboard/doctor/appointments",
      },
      {
        title: "Clients",
        count: patients.length,
        icon: Users,
        unit: "",
        detailLink: "/dashboard/doctor/patients",
      },
      {
        title: "Inbox",
        count: messages.length,
        icon: Mail,
        unit: "",
        detailLink: "/dashboard/doctor/inbox",
      },
    ];
    return analytics as DoctorAnalyticsProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getUserAnalytics() {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const appointments =
      (await getPatientAppointments(user?.id ?? "")).data || [];

    const uniquePatientsMap = new Map();

    appointments.forEach((app) => {
      if (!uniquePatientsMap.has(app.doctorId)) {
        uniquePatientsMap.set(app.doctorId, {
          doctorId: app.doctorId,
          name: `${app.firstName} ${app.lastName}`,
        });
      }
    });
    const doctors = Array.from(uniquePatientsMap.values());
    const messages = (await getInboxMessages(user!.id)).data || [];
    const analytics = [
      {
        title: "Appointments",
        count: appointments.length ?? 0,
        icon: AlarmClock,
        unit: "",
        detailLink: "/dashboard/user/appointments",
      },
      {
        title: "Businesses",
        count: doctors.length,
        icon: Users,
        unit: "",
        detailLink: "/dashboard/user/doctors",
      },
      {
        title: "Inbox",
        count: messages.length,
        icon: Mail,
        unit: "",
        detailLink: "/dashboard/user/inbox",
      },
    ];
    return analytics as DoctorAnalyticsProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getStats() {
  try {
    const serviceCount = await prismaClient.service.count();
    const doctorCount = await prismaClient.doctorProfile.count();
    // const appointmentCount = await prismaClient.app.count();
    const stats = {
      doctors: doctorCount.toString().padStart(2, "0"),
      patients: "00",
      appointments: "00",
      services: serviceCount.toString().padStart(2, "0"),
    };
    return stats;
  } catch (error) {
    console.log(error);
    return {
      doctors: null,
      patients: null,
      appointments: null,
      services: null,
    };
  }
}
