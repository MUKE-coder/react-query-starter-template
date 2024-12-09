"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function createContact(data: {
  name: string;
  email: string;
  phone: string;
  imageUrl?: string;
  notes?: string;
}) {
  try {
    const contact = await db.contact.create({
      data,
    });
    revalidatePath("/contacts");
    return { success: true, contact };
  } catch (error) {
    console.error("Failed to create contact:", error);
    return { success: false, error: "Failed to create contact" };
  }
}

export async function getContacts() {
  try {
    const contacts = await db.contact.findMany({
      orderBy: { name: "asc" },
    });
    return { success: true, contacts };
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return { success: false, error: "Failed to fetch contacts" };
  }
}

export async function getContactById(id: string) {
  try {
    const contact = await db.contact.findUnique({
      where: { id },
    });
    if (!contact) {
      return { success: false, error: "Contact not found" };
    }
    return { success: true, contact };
  } catch (error) {
    console.error("Failed to fetch contact:", error);
    return { success: false, error: "Failed to fetch contact" };
  }
}

export async function deleteContact(id: string) {
  try {
    await db.contact.delete({
      where: { id },
    });
    revalidatePath("/contacts");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete contact:", error);
    return { success: false, error: "Failed to delete contact" };
  }
}
