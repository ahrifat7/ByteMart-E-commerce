import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

export const inngest = new Inngest({ id: "bytemart-next" });

// ✅ FIX: Move trigger to the second argument
export const syncUserCreation = inngest.createFunction(
  { id: 'sync-user-from-clerk' },           // 1. Config
  { event: 'clerk/user.created' },          // 2. Trigger
  async ({ event, step }) => {              // 3. Handler
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    
    const userData = {
      _id: id,
      email: email_addresses[0]?.email_address, // Added optional chaining for safety
      name: `${first_name || ''} ${last_name || ''}`,
      imageUrl: image_url
    };

    await connectDB();
    await User.create(userData);
  }
);

// ✅ FIX: Update User Function
export const syncUserUpdation = inngest.createFunction(
  { id: 'update-user-from-clerk' },
  { event: 'clerk/user.updated' },
  async ({ event, step }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;
    
    const userData = {
      email: email_addresses[0]?.email_address,
      name: `${first_name || ''} ${last_name || ''}`,
      imageUrl: image_url
    };

    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// ✅ FIX: Delete User Function
export const syncUserDeletion = inngest.createFunction(
  { id: 'delete-user-with-clerk' },
  { event: 'clerk/user.deleted' },
  async ({ event, step }) => {
    const { id } = event.data;

    await connectDB();
    await User.findByIdAndDelete(id);
  }
);